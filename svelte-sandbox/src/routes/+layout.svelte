<!--
  +layout.svelte — THE LAYOUT FILE (Feature #7)
  
  THIS IS THE BIG WIN OF SVELTEKIT:
  This file wraps EVERY page in your app. The nav bar is defined ONCE here
  and automatically appears on every route. Compare this to the Vanilla JS
  version where we copy-pasted the <nav> into EVERY .html file.
  
  If you add a new page, the nav is already there. No copy-pasting.
  
  Python comparison: Think of this like a base template in Flask/Jinja2:
    {% extends "base.html" %}
  Except in Svelte, it's automatic — every +page.svelte inside this
  folder (and subfolders) gets wrapped by this layout.
  
  The {@render children()} slot is where each page's content appears.
  It's like Jinja2's {% block content %}{% endblock %}.
-->

<!--
  ╔═══════════════════════════════════════════════════════════════╗
  ║  TAILWIND CSS — COMMENTED OUT                                ║
  ║                                                              ║
  ║  In SvelteKit, Tailwind is installed during project creation:║
  ║    pnpm dlx sv create my-app                                 ║
  ║    → Select "tailwindcss" when prompted for add-ons          ║
  ║                                                              ║
  ║  Or add to an existing project:                               ║
  ║    pnpm install -D tailwindcss @tailwindcss/vite             ║
  ║    Then add the plugin to vite.config.js and import           ║
  ║    tailwindcss in your app.css.                               ║
  ║                                                              ║
  ║  Once installed, you use Tailwind classes directly in your   ║
  ║  .svelte templates — NO <style> block needed for most things.║
  ╚═══════════════════════════════════════════════════════════════╝

  WITH TAILWIND, this layout file would look like:
  ──────────────────────────────────────────────────

  <script>
    let { children } = $props();
  </script>

  <nav class="bg-slate-800 px-6 py-3 flex flex-wrap gap-x-4 gap-y-1 items-center">
    <a href="/" class="text-slate-100 font-bold text-lg mr-4 no-underline">
      🧪 Svelte Sandbox
    </a>
    <a href="/" class="text-slate-400 no-underline px-3 py-1 rounded-md text-sm
                       hover:bg-slate-700 hover:text-slate-100 transition-colors">
      Home
    </a>
    <a href="/basics" class="text-slate-400 no-underline px-3 py-1 rounded-md text-sm
                             hover:bg-slate-700 hover:text-slate-100 transition-colors">
      Basics
    </a>
    ... (same pattern for all links)
  </nav>

  <main class="max-w-4xl mx-auto my-8 px-6">
    {@render children()}
  </main>

  Notice: NO <style> block at all! The Tailwind utility classes replace it.

  TRADE-OFFS:
    ✅ Consistent design system — spacing, colors, typography all standardized
    ✅ No CSS class name collisions (utilities are predefined)
    ✅ Rapid prototyping — no switching between HTML and CSS files
    ✅ Tailwind's dark mode, responsive design built-in (e.g. "md:flex lg:grid")
    ❌ HTML gets verbose — lots of classes on every element
    ❌ Custom designs need @apply or arbitrary values like "bg-[#1e293b]"
    ❌ Learning curve for the utility class names (though your editor helps)

  WHEN TO USE WHICH:
    - Small projects / learning → Custom CSS (like we're doing now)
    - Professional apps / teams → Tailwind (industry standard)
    - Design systems → Tailwind + component libraries like shadcn-svelte
-->

<script>
  // $props() receives special props from SvelteKit.
  // "children" is the content of whatever page is currently active.
  let { children } = $props();
</script>

<!-- 
  Navigation Bar 
  In Vanilla JS: copied into every .html file
  In Svelte: defined ONCE here, appears everywhere
  
  Note the links use href="/route" (not "file.html") because
  SvelteKit uses file-based routing — folder names = URLs.
-->
<nav>
  <a href="/" class="brand">🧪 Svelte Sandbox</a>
  <a href="/">Home</a>
  <a href="/basics">Basics</a>
  <a href="/search">Search</a>
  <a href="/weather">Weather</a>
  <a href="/map">Map</a>
  <a href="/validation">Validation</a>
  <a href="/comments">Comments</a>
  <a href="/login">Login</a>
</nav>

<!-- This is where the current page's content renders -->
<main>
  {@render children()}
</main>

<!--
  SCOPED STYLES:
  These styles ONLY affect elements in THIS file.
  The <nav> styles here won't leak into child pages.
  This is HUGE — in Vanilla JS, all CSS is global and
  can accidentally affect elements you didn't intend.
-->
<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :global(body) {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #1e293b;
    background-color: #f8fafc;
  }

  nav {
    background-color: #1e293b;
    padding: 0.75rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
    align-items: center;
  }

  nav a {
    color: #94a3b8;
    text-decoration: none;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: background-color 0.2s, color 0.2s;
  }

  nav a:hover {
    background-color: #334155;
    color: #f1f5f9;
  }

  .brand {
    color: #f1f5f9 !important;
    font-weight: 700;
    font-size: 1.1rem;
    margin-right: 1rem;
  }

  main {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1.5rem;
  }
</style>
