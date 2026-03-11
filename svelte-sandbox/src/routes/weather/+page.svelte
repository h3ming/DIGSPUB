<!--
  /weather — Weather Widget API Call (Feature #9a)
  
  COMPARE TO: weather.html + weather.js in the Vanilla JS version.
  
  The fetch() call is IDENTICAL — JavaScript's fetch API works the same
  in Svelte and Vanilla JS. What changes is how you display the results:
    Vanilla: element.textContent = temp;  element.classList.remove('hidden');
    Svelte:  temp = data.temperature;  (template auto-updates with {#if} and {temp})
-->

<script>
  // Reactive state variables
  let selectedCity = $state('41.88,-87.63');
  let weather = $state(null);    // null = no data yet
  let loading = $state(false);
  let error = $state(null);
  let apiUrl = $state('');

  // City options — same as Vanilla version
  const cities = [
    { value: '41.88,-87.63', label: 'Chicago, IL' },
    { value: '40.71,-74.01', label: 'New York, NY' },
    { value: '34.05,-118.24', label: 'Los Angeles, CA' },
    { value: '51.51,-0.13', label: 'London, UK' },
    { value: '35.68,139.69', label: 'Tokyo, Japan' },
    { value: '-33.87,151.21', label: 'Sydney, Australia' },
  ];

  // Weather code descriptions
  const weatherCodes = {
    0: '☀️ Clear sky', 1: '🌤️ Mainly clear', 2: '⛅ Partly cloudy',
    3: '☁️ Overcast', 45: '🌫️ Foggy', 51: '🌧️ Light drizzle',
    61: '🌧️ Slight rain', 63: '🌧️ Moderate rain', 65: '🌧️ Heavy rain',
    71: '🌨️ Slight snow', 73: '🌨️ Moderate snow', 75: '🌨️ Heavy snow',
    80: '🌦️ Rain showers', 95: '⛈️ Thunderstorm',
  };

  // ============================================================
  // The fetch call — IDENTICAL to the Vanilla JS version!
  // 
  // async/await works the same way regardless of framework.
  // The only difference: instead of manually updating DOM elements,
  // we just set our $state variables and the template re-renders.
  // ============================================================
  async function fetchWeather() {
    const [lat, lon] = selectedCity.split(',');
    const cityLabel = cities.find(c => c.value === selectedCity)?.label;

    const url = `https://api.open-meteo.com/v1/forecast`
      + `?latitude=${lat}&longitude=${lon}`
      + `&current=temperature_2m,weathercode,windspeed_10m`
      + `&temperature_unit=fahrenheit&windspeed_unit=mph`;
    
    apiUrl = url;
    loading = true;      // In Vanilla: loadingEl.classList.remove('hidden')
    weather = null;      // In Vanilla: widgetEl.classList.add('hidden')
    error = null;        // In Vanilla: errorEl.classList.add('hidden')

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      // Just set the state — the template handles the rest!
      weather = {
        city: cityLabel,
        temp: Math.round(data.current.temperature_2m),
        condition: weatherCodes[data.current.weathercode] || `Code: ${data.current.weathercode}`,
        wind: data.current.windspeed_10m,
      };
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
    // Compare this to weather.js where we had to:
    //   document.getElementById('weatherCity').textContent = cityName;
    //   document.getElementById('weatherTemp').textContent = `${temp}°F`;
    //   document.getElementById('weatherWidget').classList.remove('hidden');
    //   document.getElementById('loadingMsg').classList.add('hidden');
    // None of that is needed in Svelte!
  }
</script>


<h1>Weather Widget (Feature 9a — API Call)</h1>
<p>Calls the <strong>Open-Meteo API</strong> — free, no API key needed.</p>

<div class="form-group">
  <label for="citySelect">Choose a city:</label>
  <!-- bind:value on a <select> works just like on an <input> -->
  <select id="citySelect" bind:value={selectedCity}>
    {#each cities as city}
      <option value={city.value}>{city.label}</option>
    {/each}
  </select>
</div>
<button onclick={fetchWeather}>Get Weather</button>

<!-- 
  CONDITIONAL RENDERING with {#if}
  
  Vanilla JS: element.classList.add('hidden') / .remove('hidden')
  Svelte:     {#if condition}...{/if}
  
  Much cleaner — the element simply doesn't exist in the DOM when 
  the condition is false. No hidden CSS class needed.
-->

{#if loading}
  <p class="mt-1">⏳ Fetching weather data...</p>
{/if}

{#if weather}
  <div class="weather-display mt-1">
    <p class="condition">{weather.city}</p>
    <p class="temp">{weather.temp}°F</p>
    <p class="condition">{weather.condition}</p>
    <p class="wind">Wind: {weather.wind} mph</p>
  </div>
{/if}

{#if error}
  <div class="error-box mt-1">
    <p>Failed to fetch weather: {error}</p>
  </div>
{/if}

{#if apiUrl}
  <div class="card mt-2">
    <h3>API URL Being Called:</h3>
    <pre>{apiUrl}</pre>
    <p class="hint">Try pasting this URL in your browser to see the raw JSON!</p>
  </div>
{/if}

<div class="compare-note">
  <strong>The fetch() call is the same!</strong> The API interaction is identical 
  JavaScript. What Svelte simplifies is the display logic — no getElementById, 
  no classList toggling, no manual textContent updates. Just set variables.
</div>


<style>
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #0f172a; }
  h3 { margin-bottom: 0.25rem; }
  p { margin-bottom: 0.75rem; }
  code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: "Consolas", monospace; }
  pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; font-size: 0.85rem; overflow-x: auto; word-break: break-all; white-space: pre-wrap; }
  .form-group { margin-bottom: 1rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
  select { width: 100%; padding: 0.5rem 0.75rem; border: 2px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; }
  button { background-color: #3b82f6; color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-size: 0.95rem; cursor: pointer; }
  button:hover { background-color: #2563eb; }
  .weather-display { text-align: center; padding: 2rem; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border-radius: 12px; }
  .temp { font-size: 3.5rem; font-weight: 700; }
  .condition { font-size: 1.2rem; opacity: 0.9; }
  .wind { font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem; }
  .error-box { padding: 1rem; border: 1px solid #ef4444; border-radius: 8px; color: #ef4444; background: white; }
  .card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; }
  .hint { font-size: 0.85rem; color: #64748b; margin-bottom: 0; }
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .compare-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; }
  .compare-note strong { color: #1d4ed8; }
</style>
