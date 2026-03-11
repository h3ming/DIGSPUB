<!--
  projects/+page.svelte — Your PROJECTS page (route: /projects)
  
  This page shows off work you've done. Right now it has placeholder
  projects — replace them with YOUR actual work as the course continues.

  KEY SVELTE 5 CONCEPTS USED HERE:
  - $state()   → reactive array of project objects
  - {#each}    → renders a card for each project
  - {#if}      → conditional rendering (shows/hides details)
  - Event handling with onclick

  This page demonstrates a common web pattern:
  an ARRAY of DATA → rendered as a LIST of CARDS.
  You'll use this pattern constantly in web development.
-->
<script>
	// import { setUncaughtExceptionCaptureCallback } from "process";

  // ============================================
  // PROJECT DATA
  // ============================================
  // An array of objects — each object is one project.
  // Python comparison: a list of dictionaries.
  //   projects = [
  //     {"title": "...", "description": "...", "tags": [...]},
  //     ...
  //   ]
  //
  // CUSTOMIZE: Replace these with your actual projects!

  const renders = [
  {src: "/Renders/antfire.gif", description: "2023. The Radiant Sun. Playing with particle animation."},
  {src: "/Renders/chicagodog.gif", description: "2025. Inspired by heated debates on hot dog ontology. Trying out this cel shader setup."},
  {src: "/Renders/cgfinal.mp4", 
  description: "2024. My final project for Computer Graphics. I implented a loop division algorithm and b-spline colour interpolation using Python and Blender. Originally, I wanted to implement a bump map for the creature to explode at the end but ran out of time. This project was a bit painful."},
  {src: "/Renders/froggy_chair2.gif", description: "2022. Start of trying out rotating animations."},
  {src: "/Renders/oranges.png", description: "2023. Experimenting with low-poly styles. This was before I figured out how to make my colours look better."},
  {src: "/Renders/roomFront.png", description: "2023. Originally made to experiment with ThreeJS. "},
  {src: "/Renders/pochita.gif", description: "2023. Also before I figured out how to make colours look better. I have a better render of this somewhere but I can't find it right now..."}];

  let currentRender = $state(null);
    
  function randomizeRender() {
    if (currentRender) {
      currentRender = null;
    } else {
      currentRender = renders[Math.floor(Math.random() * renders.length)];
      // Automatically scroll down
      setTimeout(() => {
      document.getElementById("render-display")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 10);
    }
  }

  function isGif(src) {
    return src.endsWith(".gif");
  }

  function isImage(src) {
  return src.endsWith(".png") || src.endsWith(".jpg") || src.endsWith(".jpeg");
}

  let projects = $state([
    {
      id: 1,
      title: "Finger World",
      description: "A basic HTML site for my cat.",
      tags: ["HTML", "CSS"],
      date: "January 2026",
      link: "/FingerWorld/index.html",
      expanded: false
    },
    {
      id: 2,
      title: "Blender Renders",
      description: "Low-stake forays into the world of 3D modelling and animations with Blender. Click to see a random Blender model.",
      tags: ["Blender", "3D", "Animation"],
      date: "Various",
      expanded: false
    },
    {
      id: 3,
      title: "API Playground",
      description: "Ongoing explorations of various APIs.",
      tags: ["API", "TypeScript"],
      date: "March 2026",
      link: "/playground",
      expanded: false
    },
  ]);

  // $derived() — count updates automatically when projects array changes
  let projectCount = $derived(projects.length);

  // ============================================
  // TOGGLE DETAILS — shows/hides project description
  // ============================================
  // function toggleProject(id) {
  //   // .map() creates a new array with the modification
  //   // Python comparison:
  //   //   projects = [{**p, "expanded": not p["expanded"]}
  //   //               if p["id"] == id else p
  //   //               for p in projects]
  //   projects = projects.map(p =>
  //     p.id === id ? { ...p, expanded: !p.expanded } : p
  //   );
  // }
</script>

<h1 class="text-amber-300">Projects</h1>
<p class="subtitle">
  {projectCount} projects archived so far.
</p>

<div class="projects-grid">
  <!--
    {#each} with a KEY — the (project.id) part.
    The key tells Svelte which item is which, so it can
    efficiently update only what changed (not re-render everything).
    
    Python comparison:
      for project in projects:
          render_card(project)
  -->
  
  {#each projects as project (project.id)}
    <div class="project-card">
      <div class="card-header">
        <h2>{project.title}</h2>
        <span class="date">{project.date}</span>
      </div>

      <!-- Tags rendered with a nested {#each} -->
      <div class="tags">
        {#each project.tags as tag (tag)}
          <span class="tag">{tag}</span>
        {/each}
      </div>

      <p class="description">{project.description}</p>
      <!--
        {#if} — only shows description when expanded is true.
        Clicking the button toggles it.
      -->
      <!-- {#if project.expanded}
        <p class="description">{project.description}</p>
      {/if}

      <button
        class="toggle-btn"
        onclick={() => toggleProject(project.id)}
      >
        {project.expanded ? "Show Less" : "Show More"}
      </button> -->

      {#if project.link}
        <a href={project.link} target="_blank" class="text-[#8b0000] text-sm hover:underline">
        View Project
        </a>
      {/if}

      {#if project.id === 2}
        <button
          class="border border-gray-300 text-gray-500 px-3 py-1.5 rounded text-sm hover:border-[#8b0000] hover:text-[#8b0000] transition-colors cursor-pointer"
          onclick={randomizeRender}>
          {currentRender ? "Hide Render" : "Show Random Render"}
        </button>

        {#if currentRender}
          <div id="render-display" class="mt-3">
            {#if isGif(currentRender.src) || isImage(currentRender.src)}
              <img src={currentRender.src} alt="Blender render" class="max-h-[60vh] w-auto rounded-md mb-2" />
            {:else}
              <video autoplay muted loop playsinline class="max-h-[60vh] w-auto rounded-md mb-2">
                <source src={currentRender.src} type="video/mp4" />
              </video>
            {/if}
            <p class="text-gray-500 text-sm">{currentRender.description}</p>
          </div>
        {/if}
      {/if}
    </div>
  {/each}
</div>

<style>
  h1 {
    margin-bottom: 0.25rem;
  }

  .subtitle {
    color: #666;
    margin-bottom: 2rem;
  }

  /* Grid layout for project cards */
  .projects-grid {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .project-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1.5rem;
    transition: box-shadow 0.2s;
  }

  .project-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  .card-header h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  .date {
    color: #888;
    font-size: 0.85rem;
    white-space: nowrap;
    margin-left: 1rem;
  }

  /* Tags — pill-shaped labels */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }

  .tag {
    background: #f0e8e0;
    color: #6b4c3b;
    padding: 0.2rem 0.65rem;
    border-radius: 12px;
    font-size: 0.8rem;
  }

  .description {
    color: #444;
    line-height: 1.6;
    margin-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
  }

  .toggle-btn {
    background: none;
    border: 1px solid #ccc;
    color: #555;
    padding: 0.35rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    font-family: inherit;
  }

  .toggle-btn:hover {
    border-color: #8b0000;
    color: #8b0000;
  }
</style>
