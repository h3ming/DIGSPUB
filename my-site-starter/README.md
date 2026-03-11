# My Site Starter — SvelteKit Personal Site

## What's Inside

This is a starter template for YOUR personal/brand site. It has three pages:

| File | URL | What it does |
|------|-----|-------------|
| `routes/+layout.svelte` | *(every page)* | Nav bar + footer wrapper |
| `routes/+page.svelte` | `/` | Home page with greeting + bio toggle |
| `routes/about/+page.svelte` | `/about` | About page with skills list |
| `routes/projects/+page.svelte` | `/projects` | Project cards with expand/collapse |

All pages use **plain CSS** (no extra libraries needed) and **Svelte 5** syntax (`$state`, `$derived`, `$props`).

---

## Setup Instructions

### Step 1: Create a new SvelteKit project

Open your terminal in VS Code and run:

```bash
pnpm dlx sv create my-site
```

When prompted, choose:
- **Template:** SvelteKit minimal
- **Type checking:** Yes, using TypeScript syntax
- **Additional options:** prettier, eslint (you can skip tailwindcss for now)

Then:

```bash
cd my-site
pnpm install
```

### Step 2: Copy these starter files

**Delete** the default home page that SvelteKit created:

```bash
rm src/routes/+page.svelte
```

**Copy** the `routes/` folder from this zip INTO `src/routes/`:

```bash
cp -r routes/* src/routes/
```

### Step 3: Run your site

```bash
pnpm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

You should see your site with a nav bar, home page, and working links!

---

## ⚠️ TROUBLESHOOTING

### "404 Not Found" when loading the page

**Most likely cause:** Files didn't copy correctly.

Check your file structure:
```bash
ls src/routes/
```

You MUST see:
```
+layout.svelte
+page.svelte
about/
projects/
```

If you see `routes/` as a folder inside `src/routes/`, you have a nesting problem:
```bash
# Fix nested routes/routes/ issue:
cp -r src/routes/routes/* src/routes/
rm -rf src/routes/routes/
```

### Files are missing the "+" prefix

SvelteKit REQUIRES the `+` at the start of `+page.svelte` and `+layout.svelte`. If your files are named `page.svelte` (no plus), rename them:

```bash
cd src/routes
mv page.svelte +page.svelte
mv layout.svelte +layout.svelte
cd about && mv page.svelte +page.svelte && cd ..
cd projects && mv page.svelte +page.svelte && cd ..
```

### "Port already in use"

Another dev server is running. Either:
- Close the other terminal running `pnpm run dev`
- Or use a different port: `pnpm run dev -- --port 5174`

### Changes not showing up

- Save the file (Ctrl+S / Cmd+S)
- The page should update automatically (hot reload)
- If not, stop the server (Ctrl+C) and restart: `pnpm run dev`

---

## How to Add a New Page

1. Create a new folder in `src/routes/`:
   ```bash
   mkdir src/routes/contact
   ```

2. Create `+page.svelte` inside it:
   ```bash
   touch src/routes/contact/+page.svelte
   ```

3. Edit the file — start with:
   ```svelte
   <h1>Contact Me</h1>
   <p>Your content here!</p>
   ```

4. Add a link in `+layout.svelte`:
   ```html
   <a href="/contact">Contact</a>
   ```

5. Visit http://localhost:5173/contact — it works!

---

## Svelte 5 Quick Reference

| Concept | Svelte 5 | Python Equivalent |
|---------|----------|-------------------|
| Reactive variable | `let x = $state(0)` | *(no equivalent — imagine a variable that auto-updates all displays)* |
| Computed value | `let total = $derived(a + b)` | `@property` that auto-recalculates |
| Receive props | `let { children } = $props()` | `def __init__(self, **kwargs)` |
| Loop in HTML | `{#each items as item}` | `for item in items:` |
| Conditional HTML | `{#if condition}...{/if}` | `if condition:` |
| Display variable | `{variable}` | `f"{variable}"` |
| Two-way binding | `bind:value={x}` | *(no equivalent)* |
| Handle click | `onclick={myFunction}` | `button.configure(command=my_function)` |

---

## Next Steps

- [ ] Replace "My Name" with YOUR name in `+layout.svelte`
- [ ] Customize the home page greeting and bio
- [ ] Fill in your real info on the About page
- [ ] Replace placeholder projects with your actual work
- [ ] Add more pages (contact, blog, resume, etc.)
- [ ] Experiment with the CSS to make it YOUR style
