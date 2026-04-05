# neve

Personal website for Sampy — blog, CV, digest, and diary.

No build step. All static files served directly. Data lives in YAML, content in markdown.

## Structure

```
neve/
├── index.html     Homepage / profile (loads data from data/*.yml)
├── blog/          Blog with markdown posts, LaTeX math, and inline charts
├── webcv/         Online CV / resume
├── digest/        Reading journal and media collection (papers, books, articles, music, videos)
├── diary/         Personal diary / journal with photo entries
├── data/          YAML data files (profile, publications, talks, teaching, research, etc.)
├── assets/        Homepage assets (app.js, styles.css, print.css)
├── siteutils/     Shared utilities across sections (modal filter)
├── certificates/  Certificate files
└── plans/         Implementation plans for upcoming features
```

## Blog

Posts live in `blog/posts/` as markdown files with YAML frontmatter:

```yaml
---
title: My Post
date: 2026-03-29
tags: [math, linear-algebra]
summary: A short description.
---
```

### Features

- **LaTeX math** — `$inline$` and `$$display$$` via KaTeX
- **Hierarchical heading numbers** — auto-generated in post content and TOC sidebar
- **Table of contents** — sidebar with smooth-scroll navigation, configurable position (left/right/hidden) via `l` key
- **Image figures** — `![caption](url)` wraps in `<figure>/<figcaption>`, supports `![left: caption](url)` and `![right: caption](url)` for floating images
- **Style switcher** — keyboard shortcuts to cycle alignment (`a`), layout (`l`), and theme (`t` — light/dim/dark/sepia)
- **Folder tree** — left sidebar browses posts by directory
- **Filter** — `f` key opens a modal filter to search/filter posts
- **Vega-Lite charts** — inline interactive charts, auto-detected and loaded on demand (see below)

### Vega-Lite Charts

Write a fenced code block with the `vegalite` language tag. The Vega-Lite spec can be JSON or YAML (js-yaml handles both). The vega stack (~1.4MB) is only loaded when a post contains a vegalite block.

~~~markdown
```vegalite
mark: line
data:
  sequence:
    start: -10
    stop: 10
    step: 0.1
    as: x
transform:
  - calculate: "sin(datum.x)"
    as: y
encoding:
  x:
    field: x
    type: quantitative
  y:
    field: y
    type: quantitative
```
~~~

## Homepage

Profile page rendered from `data/*.yml` files (profile, publications, talks, teaching, research, services, news). Sidebar with photo, main content area. Has a print stylesheet (`assets/print.css`).

## Digest

Reading journal and media collection. Entries stored in YAML files under `digest/db/` (articles, papers, books, thesis, music, videos, wishlist). Features:

- **Multiple databases** — configured in `digest/config.yml`, merged and sorted by date
- **Advanced filtering** — filter by database, year, category, and tags (checkbox UI, URL-shareable)
- **Markdown notes** — each entry can have rich-text notes
- **Image embedding** — regular, float-left, and float-right figures in notes

See `digest/README.md` for full documentation.

## Diary

Personal journal with markdown entries and photo media. Entries listed in `diary/config.yml`, stored as markdown files in `diary/entries/` with associated media in `diary/media/`.

## Web CV

Online resume at `webcv/index.html` with a downloadable PDF (`webcv/Resume.pdf`).

## Shared Utilities

`siteutils/` contains reusable components shared across sections:
- **modal-filter** — modal popup filter UI triggered by `f` key, used by blog and digest

## Stack

- [marked.js](https://github.com/markedjs/marked) v11.1.1 — markdown parsing (client-side)
- [KaTeX](https://katex.org/) v0.16.11 — LaTeX rendering (blog)
- [js-yaml](https://github.com/nodeca/js-yaml) v4.1.0 — YAML parsing (frontmatter, data files, vegalite specs)
- [Vega-Lite](https://vega.github.io/vega-lite/) v5 — declarative charts (loaded on demand in blog)
- Cormorant Garamond / EB Garamond — typography (Google Fonts)
- No build step — all static files served directly
