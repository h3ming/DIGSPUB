<!--
  /search — Image Gallery with Alt Text Search (Feature #8)
  
  COMPARE TO: search.html + search.js in the Vanilla JS version.
  
  The Svelte version is DRAMATICALLY simpler:
    Vanilla JS: addEventListener + loop through DOM + toggle CSS classes
    Svelte:     $derived() computes filtered list + {#each} renders it
  
  This is where frameworks really shine — filtering and rendering lists.
-->

<script>
  // Image data — same as the Vanilla JS version
  const images = [
    { id: 1, src: 'https://picsum.photos/seed/cat1/300/200',    alt: 'Orange tabby cat sleeping on a windowsill' },
    { id: 2, src: 'https://picsum.photos/seed/mount1/300/200',  alt: 'Snow-capped mountain with pine trees' },
    { id: 3, src: 'https://picsum.photos/seed/city1/300/200',   alt: 'City skyline at sunset with skyscrapers' },
    { id: 4, src: 'https://picsum.photos/seed/food1/300/200',   alt: 'Fresh pasta with tomato sauce and basil' },
    { id: 5, src: 'https://picsum.photos/seed/dog1/300/200',    alt: 'Golden retriever playing in a park' },
    { id: 6, src: 'https://picsum.photos/seed/ocean1/300/200',  alt: 'Ocean waves crashing on a rocky beach' },
    { id: 7, src: 'https://picsum.photos/seed/cat2/300/200',    alt: 'Black cat sitting on a stack of books' },
    { id: 8, src: 'https://picsum.photos/seed/food2/300/200',   alt: 'Colorful fruit bowl with tropical food items' },
  ];

  // Search term — bound to the input via bind:value
  let searchTerm = $state('');

  // ============================================================
  // $derived() — Svelte's computed/reactive value
  //
  // This automatically recalculates whenever searchTerm changes.
  // No event listeners. No manual DOM updates. No loop through elements.
  //
  // Python equivalent:
  //   @property
  //   def filtered_images(self):
  //       return [img for img in self.images 
  //               if self.search_term.lower() in img['alt'].lower()]
  //
  // Vanilla JS equivalent (from search.js):
  //   searchBar.addEventListener('input', () => {
  //       const query = searchBar.value.toLowerCase();
  //       cards.forEach(card => {
  //           if (card.dataset.alt.includes(query)) {
  //               card.classList.remove('hidden');
  //           } else {
  //               card.classList.add('hidden');
  //           }
  //       });
  //   });
  //
  // Look how much simpler the $derived version is:
  // ============================================================
  let filteredImages = $derived(
    images.filter(img => 
      img.alt.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
</script>


<h1>Image Search by Alt Text (Feature 8)</h1>
<p>Type in the search bar to filter images. This uses <code>$derived</code> for automatic filtering.</p>

<div class="form-group">
  <label for="searchBar">🔍 Search images:</label>
  <!-- bind:value={searchTerm} — as you type, searchTerm updates,
       which triggers $derived to recalculate filteredImages,
       which triggers {#each} to re-render the grid.
       All automatic. All reactive. -->
  <input type="search" id="searchBar" placeholder="Try: cat, mountain, city, food..." bind:value={searchTerm}>
</div>

<!-- filteredImages.length updates automatically too -->
<p>Showing {filteredImages.length} of {images.length} images</p>

<!-- 
  {#each filteredImages as img (img.id)} 
  
  This is Svelte's loop. It renders one block for each item in the array.
  The (img.id) part is a "key" — it helps Svelte efficiently update the 
  list when items are added/removed/reordered.
  
  Compare to Vanilla JS where we had to:
    1. createElement for each card
    2. Set innerHTML with template literals
    3. appendChild to the gallery
    4. On search: loop through ALL elements and toggle .hidden class
  
  In Python terms, {#each} is like a Jinja2 {% for %} loop,
  except it automatically re-runs when the data changes.
-->
<div class="image-grid">
  {#each filteredImages as img (img.id)}
    <div class="image-card">
      <img src={img.src} alt={img.alt} loading="lazy">
      <div class="caption">{img.alt}</div>
    </div>
  {/each}
</div>

<!-- Conditional rendering: show a message when no results -->
{#if filteredImages.length === 0}
  <p class="no-results">No images match "{searchTerm}". Try a different search term.</p>
{/if}

<div class="compare-note">
  <strong>Line count comparison:</strong> The Vanilla JS search.js is ~60 lines with 
  manual DOM manipulation. The Svelte version above is ~15 lines of logic + template. 
  Same functionality, dramatically less code.
</div>


<style>
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #0f172a; }
  p { margin-bottom: 0.75rem; }
  code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: "Consolas", monospace; }
  .form-group { margin-bottom: 1rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; font-size: 0.9rem; }
  input { width: 100%; padding: 0.5rem 0.75rem; border: 2px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; font-family: inherit; }
  input:focus { outline: none; border-color: #3b82f6; }
  .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0; }
  .image-card { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
  .image-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .image-card img { width: 100%; height: 150px; object-fit: cover; display: block; }
  .caption { padding: 0.5rem 0.75rem; font-size: 0.85rem; color: #475569; background: white; }
  .no-results { text-align: center; color: #94a3b8; font-style: italic; padding: 2rem 0; }
  .compare-note { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 0.75rem 1rem; margin: 1rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; }
  .compare-note strong { color: #1d4ed8; }
</style>
