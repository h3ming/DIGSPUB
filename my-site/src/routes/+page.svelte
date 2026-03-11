<!--
  +page.svelte — Your HOME PAGE (the root route: /)
  
  This is what visitors see first. It should introduce YOU
  and give people a reason to explore the rest of your site.

  KEY SVELTE 5 CONCEPTS USED HERE:
  - $state()  → creates a reactive variable (updates the page when it changes)
  - {variable} → displays a variable's value in HTML (like f-strings in Python)
  - onclick    → runs a function when something is clicked

  CUSTOMIZE: Replace ALL the placeholder text with your own content!
-->
<script>
  // ============================================
  // REACTIVE STATE — $state() makes variables "live"
  // ============================================
  // When these change, the HTML updates AUTOMATICALLY.
  // No document.getElementById needed!
  // Python comparison: imagine if changing a variable
  // instantly updated every print() that used it.

  let greeting = $state("hello, I'm");
  let showBio = $state(false);

  // A regular variable (not reactive — fine for static data)
  const name = "Heming";
  const tagline = "Student · Developer · Media Theorist";

  const ascii_name = `
░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓██████████████▓▒░░▒▓█▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
░▒▓████████▓▒░▒▓██████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒▒▓███▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░  
                                                                                
                                                                                
                                   `;


  // ============================================
  // FUNCTIONS — same as JavaScript, but Svelte
  // re-renders automatically when $state changes
  // ============================================
  function toggleBio() {
    // This ONE LINE updates the variable AND the page.
    // In vanilla JS you'd also need:
    //   document.getElementById('bio').style.display = ...
    //   document.getElementById('btn').textContent = ...
    // Svelte handles all of that for you.
    showBio = !showBio;
  }
</script>


<div class="relative min-h-screen" >
  <!-- Video background -->
  <video
    autoplay
    muted
    loop
    playsinline
    class="fixed inset-0 w-[95vw] h-[98vh] object-fill -z-10 object-[99%_5%]"
  >
    <source src="/bghead.mp4" type="video/mp4" /> 
  </video>
<section class="hero">
  <!-- {variable} inserts the value — like Python's f"{variable}" -->
  <h1 class="font-mono text-white">{greeting}</h1>
  <pre class="font-mono text-xs md:text-sm lg:text-base text-white whitespace-pre leading-none">
    {ascii_name}
  </pre>
  <!-- <p class="name"></p> -->
  <p class="tagline">{tagline}</p>

  <!--
    BUTTON with onclick
    When clicked, toggleBio() runs → showBio changes →
    the {#if} block below updates automatically
  -->
  <button onclick={toggleBio} class="font-mono">
    {showBio ? "Hide Bio" : "Info"}
  </button>
</section>

<!--
  CONDITIONAL RENDERING: {#if ...}
  This block only shows when showBio is true.
  Python comparison: like an if statement, but for HTML.
  
  In vanilla JS you'd use:
    element.style.display = showBio ? 'block' : 'none';
  In Svelte, the HTML literally appears/disappears.
-->
{#if showBio}
  <section class="bio-section">
    <h2 class="font-mono text-red-800">It's me!</h2>
    <p>
      <!-- CUSTOMIZE: Write 2-3 sentences about yourself -->
      I'm a student at the University of Chicago studying Digital Humanities.
      I'm interested in interface design and media theory and this site showcases
      my work in web development.
    </p>
  </section>
{/if}

<section class="quick-links">
  <!-- <h2 class="text-center">Explore</h2> -->
  <div class="card-row">
    <!--
      These are simple "cards" linking to your other pages.
      Each one is just an <a> tag styled as a box.
      Add more cards as you add more pages to your site!
    -->
    <a href="/about" class="card">
      <h3>About Me</h3>
      <p>Some information about myself.</p>
    </a>
    <a href="/projects" class="card">
      <h3>Projects</h3>
      <p>Work I've done in this course and beyond.</p>
    </a>
  </div>
</section>
</div>

<style>
  /* ============================
     HOME PAGE STYLES
     
     All styles here are SCOPED to this page only.
     They won't affect other pages. This is a Svelte
     feature — no class name collisions!
     ============================ */
  

  .hero {
    text-align: center;
    padding: 3rem 0 2rem;
  }

  .hero h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  .name {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0.25rem 0;
  }

  .tagline {
    /* color: #d6d6d6; */
    color: white;
    font-weight: bolder;
    font-family:'Courier New', Courier, monospace;
    margin-bottom: 1.5rem;
  }

  button {
    background-color: #8b0000;
    color: white;
    border: none;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
  }

  button:hover {
    background-color: #6b0000;
  }

  /* Bio section — appears when showBio is true */
  .bio-section {
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 6px;
    margin: 1.5rem 0;
    border-left: 4px solid #0f3076;
  }

  .bio-section h2 {
    margin-top: 0;
  }

  /* Card links */
  .quick-links {
    margin-top: 2.5rem;
  }

  .card-row {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .card {
    flex: 1;
    min-width: 200px;
    background: rgb(223, 223, 223);
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.2s;
  }

  .card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    text-decoration: none;
  }

  .card h3 {
    margin: 0 0 0.5rem;
    color: #8b0000;
  }

  .card p {
    margin: 0;
    color: #555;
    font-size: 0.95rem;
  }
</style>
