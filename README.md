# Buyer & Sell — Private Client Playbook

A responsive training site for the workflows behind exceptional real-estate service. The playbook guides the team through six phases and fourteen modules, with shared Google Drive resources, practical run-throughs, checklists, and progress saved locally on the current device.

The interface pairs an editorial, luxury-inspired visual system with an accessible, no-build static app. No login or dependencies are required.

## Run it

- **Fastest:** open `index.html` in a browser.
- **Or serve it:**
  ```bash
  python3 -m http.server 4173 --bind 0.0.0.0
  # or: npx serve
  ```
- **Deploy anywhere:** it's a plain static site — GitHub Pages, Netlify, S3, etc.

## Customising content

Everything text-related lives in **`content.js`**:

- Edit each module's `summary`, `steps` and `checks` there — the site regenerates from it automatically.
- Each module has a `drive` field. Paste that module's own Drive **subfolder** URL into it and its “Open module folder” button deep-links straight to that folder. Leave it empty to open the root training folder.

## Accessibility

- Semantic landmarks, skip link, one `h1` per view, `aria-current` navigation, and live-region announcements for progress and search.
- Keyboard: `N`/`P` next/previous module, `D` dashboard, `/` search, `Esc` closes the mobile module drawer.
- Light/dark themes (follows system, toggle in header), high-contrast focus rings, reduced-motion support, and a print stylesheet.
- Progress and theme preferences are stored on this device only.

## Structure

| File / folder            | Purpose                                                   |
| ------------------------ | --------------------------------------------------------- |
| `index.html`             | Page shell, landmarks, theme bootstrap                    |
| `styles.css`             | Design system, layouts, responsive states, themes, print |
| `content.js`             | Course data: phases, 14 modules, Drive links               |
| `app.js`                 | Hash router, progress, checklists, search, keyboard        |
| `assets/favicon.svg`     | Buyer & Sell house mark                                    |
| `assets/residence-hero.jpg` | Editorial hero photograph                                |
