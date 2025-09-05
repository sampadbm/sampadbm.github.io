# Repository Guidelines

## Project Structure & Module Organization
- `index.html` → symlink to the shared Remark template (`__blog/remark.html`).
- `index.md` → entry markdown rendered by Remark (one slide per decade).
- `src/timeline.md` → source timeline items (per decade).
- `src/videos.md` → curated videos (mapped into decade slides).
- `slides.md` → legacy deck (reference only).
- `res/` → images and assets referenced by slides (use relative paths like `res/...`).

## Build, Test, and Development Commands
- Local preview (recommended):
  - From repo root: `python3 -m http.server 8000`
  - Open `http://localhost:8000/blog/ml-overview/` (fetch for `index.md` requires HTTP).
- Quick refresh: edit `index.md` (or `src/*`) and reload the browser.

## Coding Style & Naming Conventions
- Markdown-first; separate slides with `---`.
- Per‑slide props at top (e.g., `class: center middle`).
- Headings: `## {Decade}: {Short Title}`; section labels like `Videos:` under bullets.
- Images: relative paths, include widths when helpful (e.g., `width="60%"`).
- Math: KaTeX supported via `$...$` / `$$...$$`; diagrams via `<pre class="mermaid">`.
- Avoid `exclude: true` for hiding; it is not enforced by the template.

## Testing Guidelines
- Visual check: load locally, verify slide order, layout, and links.
- Math/diagram check: ensure KaTeX renders and Mermaid diagrams appear on the right slide.
- Links: verify external videos open and images resolve (404‑free).

## Commit & Pull Request Guidelines
- Commits: concise, imperative; scope prefixes encouraged (e.g., `slides: add 2000s videos`).
- PRs: include
  - Summary of changes and rationale.
  - Affected files (e.g., `index.md`, `src/timeline.md`).
  - Screenshots/GIFs of key slides.
  - Any navigation or template changes.

## Agent‑Specific Instructions (Maintenance Tips)
- When updating decades, first edit `src/timeline.md` and `src/videos.md`, then mirror changes into `index.md`.
- Keep `index.md` as the single rendered source; do not remove the `index.html` symlink.
- If adding assets, place them in `res/` and use relative links.
