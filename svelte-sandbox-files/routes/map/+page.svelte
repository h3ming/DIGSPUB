<!--
  /map — Interactive Leaflet Map (Feature #9b)
  
  COMPARE TO: map.html + map.js in the Vanilla JS version.
  
  KEY SVELTE CONCEPT: onMount()
  
  Leaflet needs a DOM element (<div id="map">) to exist before it can
  initialize. In Vanilla JS, we solve this by loading the script at the
  bottom of the page. In Svelte, we use onMount() — a lifecycle function
  that runs AFTER the component's HTML has been added to the page.
  
  Python comparison: onMount is like __init__ but for the DOM.
  It runs once when the component first appears on screen.
  
  NOTE: We load Leaflet's CSS and JS from a CDN using <svelte:head>.
  This is Svelte's way of adding things to the <head> of the page.
-->

<script>
  import { onMount } from 'svelte';

  let markerCount = $state(0);
  let mapInstance;
  let markers = [];

  // ============================================================
  // onMount() — runs ONCE after the component is added to the DOM.
  //
  // Why not just put this code at the top of <script>?
  // Because the <div id="map"> doesn't exist yet when <script> runs!
  // onMount waits until the HTML is rendered, then runs.
  //
  // In Vanilla JS, we solved this by putting <script> at the bottom
  // of the HTML file, or using DOMContentLoaded event.
  //
  // onMount can return a cleanup function (like componentWillUnmount
  // in React) that runs when the component is removed from the page.
  // ============================================================
  onMount(() => {
    // --- Same Leaflet code as the Vanilla JS version! ---
    // L is the global Leaflet object (loaded via CDN in <svelte:head>)
    
    mapInstance = L.map('map').setView([41.88, -87.63], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);

    // Default marker
    const defaultMarker = L.marker([41.88, -87.63])
      .bindPopup('<strong>University of Chicago area</strong><br>Our starting point!')
      .addTo(mapInstance);
    markers.push(defaultMarker);
    markerCount = markers.length;

    // Click-to-add markers
    mapInstance.on('click', (event) => {
      const { lat, lng } = event.latlng;
      const marker = L.marker([lat, lng])
        .bindPopup(`📍 Lat: ${lat.toFixed(4)}, Lon: ${lng.toFixed(4)}`)
        .addTo(mapInstance);
      markers.push(marker);
      markerCount = markers.length;  // Just set the variable — Svelte updates the display
    });

    // Cleanup function: runs when navigating away from this page
    return () => {
      mapInstance.remove();
    };
  });

  function clearMarkers() {
    markers.forEach(m => m.removeFrom(mapInstance));
    markers = [];
    markerCount = 0;
  }
</script>

<!-- 
  <svelte:head> lets you add elements to the page's <head>.
  We use it to load Leaflet's CSS and JS from a CDN.
  This is like adding <link> and <script> tags in the <head> of an HTML file.
-->
<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</svelte:head>

<h1>Interactive Map (Feature 9b — API Call)</h1>
<p><strong>Leaflet.js</strong> + <strong>OpenStreetMap</strong> — free, no API key. Click to drop markers!</p>

<div id="map"></div>

<p class="mt-1">Markers placed: {markerCount}</p>
<button class="secondary" onclick={clearMarkers}>Clear All Markers</button>

<div class="compare-note">
  <strong>Key takeaway:</strong> The Leaflet code is nearly identical between 
  Vanilla JS and Svelte. The framework doesn't change how third-party libraries 
  work — it just changes how you manage the surrounding state (like the marker count) 
  and where you put initialization code (onMount vs. script-at-bottom-of-page).
</div>


<style>
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #0f172a; }
  p { margin-bottom: 0.75rem; }
  #map { height: 400px; width: 100%; border-radius: 8px; border: 2px solid #e2e8f0; }
  button { background-color: #3b82f6; color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-size: 0.95rem; cursor: pointer; }
  .secondary { background-color: #64748b; }
  .secondary:hover { background-color: #475569; }
  .mt-1 { margin-top: 0.5rem; }
  .compare-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; }
  .compare-note strong { color: #1d4ed8; }
</style>
