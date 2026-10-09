# Buyer & Sell Playbook

A training/learning site for our operational workflows. It turns the
[“Training Videos and Templates” Drive folder](https://drive.google.com/drive/folders/1JD8dnZ1RQs5So590tUph-8zIykh7oxIu?usp=sharing)
into a guided playbook: six phases, fourteen modules, each with a run-through,
a tick-off checklist and saved progress. No login, no build, no dependencies.

## Run it

- **Fastest:** just open `index.html` in a browser.
- **Or serve it:**
  ```bash
  python3 -m http.server 4173 --bind 0.0.0.0
  # or: npx serve
  ```
- **Deploy anywhere:** it's a plain static site — GitHub Pages, Netlify, S3, etc.

## Customising content

Everything text-related lives in **`content.js`**:

- Edit each module's `summary`, `steps` and `checks` there — the site
  regenerates from it automatically.
- Each module has a `drive` field. Paste that module's own Drive **subfolder**
  URL into it and its “Open module folder” button deep-links straight to that
  folder. Left empty, the button opens the root training folder.

## Accessibility

- Semantic landmarks, skip link, single `h1` per view, `aria-current` nav,
  live-region announcements for progress and search.
- Keyboard: `N`/`P` next/previous module, `D` dashboard, `/` search,
  `Esc` closes the mobile module drawer.
- Light/dark themes (follows system, toggle in header), high-contrast focus
  rings, `prefers-reduced-motion` support, print stylesheet for handouts.

## Structure

| File           | Purpose                                             |
| -------------- | --------------------------------------------------- |
| `index.html`   | Page shell: landmarks, skip link, theme bootstrap   |
| `styles.css`   | Design system: tokens, layout, themes, print        |
| `content.js`   | Course data: phases, 14 modules, Drive links        |
| `app.js`       | Hash router, progress, checklists, search, keys     |
| `assets/`      | Favicon                                             |
