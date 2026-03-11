# Vanilla JS Sandbox — DIGpub 2026

Open **any page** with Live Server in VS Code. No build step required.

## Pages & Features

| Page              | Features                                    |
|-------------------|---------------------------------------------|
| `index.html`      | 1: let/variables, 2: DOM updates, 3: images, 4: toggle button, 5: inputs, 6: forms |
| `gallery.html`    | 3 & 8: Image gallery with alt-text search   |
| `forms.html`      | 11: Validation (5 fields + password strength), 10: Login (simulated) |
| `api.html`        | 9a: Weather (Open-Meteo), 9b: Map (Leaflet) |
| `comments.html`   | 12: Comments with UUID hash IDs             |

## Svelte Comparison

Every feature on every page is also implemented in the **Svelte Sandbox**.
Open both side by side to see the difference:

- **Vanilla JS**: `document.getElementById()` → manual `.textContent` / `.innerHTML` / `.classList.toggle()`
- **Svelte**: change a variable → template auto-updates

The vanilla version consolidates into 5 pages (with copy-pasted nav bars).
The Svelte version splits into 8+ routes (with one shared layout).
This structural difference itself teaches why frameworks exist.

## Setup

1. Open this folder in VS Code
2. Install the **Live Server** extension (if not already)
3. Right-click any `.html` file → **Open with Live Server**
4. Browse between pages using the nav bar

## Data Parity

Both versions use identical:
- Image data (8 images, same seeds/sizes/alt texts)
- City list (6 cities, same coordinates)
- Weather API (Open-Meteo, same parameters)
- Map center (41.88, -87.63 — Chicago)
- Validation rules (same regex, same field set)
- Comment structure (crypto.randomUUID(), same layout)
