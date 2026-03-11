<script>
  // ============================================
  // MOON DATA
  // ============================================

  let moonData = $state(null);
  let loading = $state(true);
  let error = $state(null);

  // Lunar cycle math (no API needed)
  function getLunarAge() {
    const knownNewMoon = new Date("2000-01-06T18:14:00Z");
    const lunarCycle = 29.53058867;
    const now = new Date();
    const daysSince = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
    const age = daysSince % lunarCycle;
    return age < 0 ? age + lunarCycle : age;
  }

  function getPhaseInfo(age) {
    const cycle = 29.53058867;
    const illumination = Math.round((1 - Math.cos((2 * Math.PI * age) / cycle)) / 2 * 100);

    let phase, emoji;
    if (age < 1.85) { phase = "New Moon"; emoji = "🌑"; }
    else if (age < 7.38) { phase = "Waxing Crescent"; emoji = "🌒"; }
    else if (age < 9.22) { phase = "First Quarter"; emoji = "🌓"; }
    else if (age < 14.77) { phase = "Waxing Gibbous"; emoji = "🌔"; }
    else if (age < 16.61) { phase = "Full Moon"; emoji = "🌕"; }
    else if (age < 22.15) { phase = "Waning Gibbous"; emoji = "🌖"; }
    else if (age < 23.99) { phase = "Last Quarter"; emoji = "🌗"; }
    else if (age < 29.53) { phase = "Waning Crescent"; emoji = "🌘"; }
    else { phase = "New Moon"; emoji = "🌑"; }

    const daysToFull = age < 14.77
      ? Math.ceil(14.77 - age)
      : Math.ceil(cycle - age + 14.77);

    const daysToNew = age < 29.53
      ? Math.ceil(cycle - age)
      : 0;

    return { phase, emoji, illumination, daysToFull, daysToNew };
  }

  function formatTime(utcTime) {
    if (!utcTime || utcTime === "1970-01-01T00:00:01+00:00") return "Below horizon";
    return new Date(utcTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  async function fetchMoonData() {
    try {
      loading = true;

      // Get user location
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = pos.coords;

      // Fetch moonrise/moonset from Sunrise-Sunset API
      const res = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
      );
      const data = await res.json();

      const age = getLunarAge();
      const phaseInfo = getPhaseInfo(age);

      moonData = {
        ...phaseInfo,
        moonrise: formatTime(data.results.moonrise),
        moonset: formatTime(data.results.moonset),
        age: age.toFixed(1),
      };
    } catch (e) {
      error = "Could not retrieve moon data. Please allow location access.";
    } finally {
      loading = false;
    }
  }

  // CSS moon illustration based on phase
  function getMoonStyle(age) {
    const cycle = 29.53058867;
    const progress = age / cycle;
    if (progress < 0.03 || progress > 0.97) return { left: "none", right: "none", bg: "#111" };
    if (progress < 0.25) {
      const t = progress / 0.25;
      return { type: "waxing", t };
    }
    if (progress < 0.5) {
      const t = (progress - 0.25) / 0.25;
      return { type: "waxingGibbous", t };
    }
    if (progress < 0.53) return { type: "full" };
    if (progress < 0.75) {
      const t = (progress - 0.5) / 0.25;
      return { type: "waning", t };
    }
    const t = (progress - 0.75) / 0.25;
    return { type: "waningCrescent", t };
  }

  fetchMoonData();
</script>

<div class="min-h-screen bg-[#050810] text-gray-200 font-mono px-6 py-12 flex flex-col items-center">

  <h1 class="text-3xl tracking-widest uppercase text-gray-400 mb-1">Lunar Watch</h1>
  <p class="text-gray-600 text-sm mb-12 tracking-wider">tonight's moon</p>

  {#if loading}
    <p class="text-gray-500 animate-pulse">Consulting the cosmos...</p>

  {:else if error}
    <p class="text-red-400">{error}</p>

  {:else if moonData}

    <!-- Moon illustration -->
    <div class="relative w-48 h-48 rounded-full mb-10"
      style="background: radial-gradient(circle at 35% 35%, #d4c97a, #8a7e3a, #3a3520);
             box-shadow: 0 0 60px 10px rgba(212, 201, 122, 0.15);">

      <!-- Shadow overlay to simulate phase -->
      {#if moonData.illumination < 99}
        <div class="absolute inset-0 rounded-full overflow-hidden">
          {#if moonData.age <= 14.77}
            <!-- Waxing: shadow on left -->
            <div class="absolute inset-0 rounded-full bg-[#050810]"
              style="clip-path: ellipse({Math.max(5, 50 - moonData.illumination / 2)}% 50% at 25% 50%)">
            </div>
          {:else}
            <!-- Waning: shadow on right -->
            <div class="absolute inset-0 rounded-full bg-[#050810]"
              style="clip-path: ellipse({Math.max(5, 50 - moonData.illumination / 2)}% 50% at 75% 50%)">
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Phase name + emoji -->
    <div class="text-center mb-10">
      <p class="text-4xl mb-2">{moonData.emoji}</p>
      <h2 class="text-2xl tracking-widest text-yellow-100">{moonData.phase}</h2>
      <p class="text-gray-500 text-sm mt-1">Day {moonData.age} of 29.5</p>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-2 gap-px bg-gray-800 border border-gray-800 rounded-lg overflow-hidden w-full max-w-sm mb-8">
      <div class="bg-[#0a0d18] p-5">
        <p class="text-gray-500 text-xs tracking-widest uppercase mb-1">Illumination</p>
        <p class="text-2xl text-yellow-200">{moonData.illumination}%</p>
      </div>
      <div class="bg-[#0a0d18] p-5">
        <p class="text-gray-500 text-xs tracking-widest uppercase mb-1">Moonrise</p>
        <p class="text-2xl text-yellow-200">{moonData.moonrise}</p>
      </div>
      <div class="bg-[#0a0d18] p-5">
        <p class="text-gray-500 text-xs tracking-widest uppercase mb-1">Moonset</p>
        <p class="text-2xl text-yellow-200">{moonData.moonset}</p>
      </div>
      <div class="bg-[#0a0d18] p-5">
        <p class="text-gray-500 text-xs tracking-widest uppercase mb-1">Full Moon In</p>
        <p class="text-2xl text-yellow-200">{moonData.daysToFull}d</p>
      </div>
    </div>

    <!-- New moon countdown -->
    <p class="text-gray-600 text-sm tracking-wider">
      New moon in <span class="text-gray-400">{moonData.daysToNew} days</span>
    </p>

  {/if}
</div>