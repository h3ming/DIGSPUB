<!--
  +page.svelte — HOME PAGE (root route: /)
  
  In SvelteKit, this file at src/routes/+page.svelte becomes the "/" URL.
  Each subfolder with a +page.svelte becomes its own route:
    src/routes/basics/+page.svelte  →  /basics
    src/routes/weather/+page.svelte →  /weather
  
  No <html>, <head>, or <body> tags needed — the layout handles that.
  This file is JUST the page content.
-->

<h1>Svelte Sandbox</h1>
<p>
  This project demonstrates common web features built with 
  <strong>SvelteKit</strong>. Compare each page to the Vanilla JS version 
  to see how Svelte changes the way you write the same features.
</p>

<div class="compare-note">
  <strong>Key differences from Vanilla JS:</strong> No separate .js files. 
  No copy-pasted nav bars. No <code>document.getElementById()</code>. 
  Each page is a single <code>.svelte</code> file with HTML, CSS, and 
  JavaScript together. Change a variable → the page updates automatically.
</div>

<h2>What's on Each Page</h2>

<div class="card"><h3>📝 Basics</h3><p>Variables, reactivity, images, buttons, inputs, and forms.</p></div>
<div class="card"><h3>🔍 Search</h3><p>Image gallery with search filtering using $derived.</p></div>
<div class="card"><h3>🌤️ Weather</h3><p>Weather widget calling the Open-Meteo API.</p></div>
<div class="card"><h3>🗺️ Map</h3><p>Interactive Leaflet map with click-to-add markers.</p></div>
<div class="card"><h3>✅ Validation</h3><p>Real-time form validation with reactive error messages.</p></div>
<div class="card"><h3>💬 Comments</h3><p>Comments section with random hash IDs.</p></div>
<div class="card"><h3>🔒 Login</h3><p>Login form structure (commented out auth logic).</p></div>

<h2>File Structure</h2>
<pre>
src/routes/
├── +layout.svelte      ← Nav bar (wraps ALL pages — defined ONCE)
├── +page.svelte        ← You are here (home: /)
├── basics/
│   └── +page.svelte    ← /basics
├── search/
│   └── +page.svelte    ← /search
├── weather/
│   └── +page.svelte    ← /weather
├── map/
│   └── +page.svelte    ← /map
├── validation/
│   └── +page.svelte    ← /validation
├── comments/
│   └── +page.svelte    ← /comments
└── login/
    └── +page.svelte    ← /login
</pre>

<div class="compare-note">
  <strong>Notice:</strong> No style.css file shared across pages! Each 
  .svelte file has its own &lt;style&gt; block. Styles are scoped — they 
  can't accidentally break other pages. Global styles (like the body font) 
  go in +layout.svelte using <code>:global()</code>.
</div>

<style>
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #0f172a; }
  h2 { font-size: 1.3rem; margin: 1.5rem 0 0.5rem; color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.25rem; }
  p { margin-bottom: 0.75rem; }
  pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; font-size: 0.85rem; overflow-x: auto; margin: 0.75rem 0; }
  code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: "Consolas", monospace; font-size: 0.88rem; }
  .card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  .card h3 { margin-bottom: 0.25rem; }
  .compare-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; }
  .compare-note strong { color: #1d4ed8; }
</style>
