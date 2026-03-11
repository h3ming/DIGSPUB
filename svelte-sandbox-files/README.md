# Svelte Sandbox Files — DIGpub 2026

## SETUP INSTRUCTIONS

### Step 1: Create a new SvelteKit project
```bash
pnpm dlx sv create svelte-sandbox
```
When prompted, choose:
- Template: **SvelteKit minimal**
- Type checking: **Yes, using TypeScript syntax**
- Add-ons: Select **tailwindcss** (spacebar), then Enter

### Step 2: Enter the project and install dependencies
```bash
cd svelte-sandbox
pnpm install
```

### Step 3: Copy these files into the project
**Delete the default page first:**
```bash
rm src/routes/+page.svelte
```

**Then copy EVERYTHING from this zip's `routes/` folder into `src/routes/`:**
- On Mac/Linux: `cp -r routes/* src/routes/`
- On Windows: drag and drop the contents of `routes/` into `src/routes/`

Your `src/routes/` folder should now contain:
```
src/routes/
├── +layout.svelte
├── +page.svelte
├── basics/
│   └── +page.svelte
├── comments/
│   └── +page.svelte
├── login/
│   └── +page.svelte
├── map/
│   └── +page.svelte
├── search/
│   └── +page.svelte
├── validation/
│   └── +page.svelte
└── weather/
    └── +page.svelte
```

### Step 4: Start the dev server
```bash
pnpm run dev
```

### Step 5: Open in browser
Go to **http://localhost:5173**

---

## Troubleshooting

**"Cannot find module" errors:** Run `pnpm install` again

**Blank page:** Make sure you copied +layout.svelte (it contains the nav bar)

**Styles missing:** Make sure you selected tailwindcss during project creation
