# neve

Personal website for Sampy — blog, CV, digest, and diary.

No build step. All static files served directly. Data lives in YAML, content in markdown.

## Structure

The site is five independent sub-sites sharing a common stack and design language. Each has its own `index.html`, `assets/`, and data layer.

```
neve/
├── index.html              # Academic homepage — loads all content from data/*.yml
├── data/                   # YAML data files (single source of truth for homepage)
│   ├── profile.yml         # Name, title, links, education, experience
│   ├── publications.yml
│   ├── research.yml
│   ├── talks.yml
│   ├── teaching.yml
│   ├── news.yml
│   ├── services.yml
│   └── coursework.yml
├── assets/                 # Homepage assets (app.js, styles.css, print.css)
│
├── blog/                   # Technical blog (markdown posts, KaTeX math, Vega-Lite charts)
│   ├── index.html
│   ├── config.yml          # Auto-generated post index (run blog/scripts/generate-config.sh)
│   ├── posts/              # Markdown files organized in topic subdirectories
│   │   ├── math/linear-algebra/
│   │   ├── math/optimization/
│   │   ├── reference/      # Living documents: glossary, bookmarks, ideas, wishlist
│   │   └── terminal/
│   ├── assets/             # Blog-specific JS/CSS
│   └── scripts/generate-config.sh
│
├── diary/                  # Personal journal with mood tracking and photo media
│   ├── index.html
│   ├── config.yml          # Auto-generated entry index (run diary/scripts/generate-config.sh)
│   ├── entries/            # Markdown files named YYYY-MM-DD-slug.md
│   ├── media/              # Images organized by year/event
│   ├── assets/             # Diary-specific JS/CSS
│   └── scripts/generate-config.sh
│
├── digest/                 # Reading journal (papers, books, articles, music, videos)
│   ├── index.html
│   ├── config.yml          # Lists which db/*.yml files to load by default
│   ├── db/                 # YAML databases — add entries, refresh browser
│   │   ├── articles.yml
│   │   ├── papers.yml
│   │   ├── books.yml
│   │   ├── music.yml
│   │   ├── videos.yml
│   │   └── thesis.yml
│   └── assets/             # Digest JS/CSS including modular filter.js
│
├── webcv/                  # Full academic CV and concise research resume
│   ├── index.html
│   ├── resume.html
│   └── assets/             # Shared renderer and responsive/print styles
│
├── siteutils/              # Shared utilities (used by blog and diary)
│   ├── modal-filter.js     # Modal filter UI triggered by `f` key
│   └── modal-filter.css
│
├── certificates/           # Certificate PDFs
├── plans/                  # Implementation plans for upcoming features
├── update-date.sh          # Updates last_updated in data/profile.yml
└── claude.md               # Project documentation for AI assistants
```

### Content workflow

All three content sub-sites follow the same pattern:

| Sub-site | Add content | Rebuild index | Refresh |
|----------|-------------|---------------|---------|
| Homepage | Edit `data/*.yml` | — | Done |
| Blog | Add `blog/posts/**/*.md` | `./blog/scripts/generate-config.sh` | Done |
| Diary | Add `diary/entries/YYYY-MM-DD-slug.md` | `./diary/scripts/generate-config.sh` | Done |
| Digest | Edit `digest/db/*.yml` | — | Done |

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

Full academic CV at `webcv/index.html` and a concise version at
`webcv/resume.html`. Both display every entry from the same YAML files, in the same
section order. The resume shortens descriptions, not the list of accomplishments.
Use **Print / Save PDF**
to export either view; print styles remove navigation and backgrounds, and include
all teaching responsibilities in the full CV.

- `data/profile.yml`: name, title, links, and education (including degree, dates, GPA, advisor, and lab).
- `data/cv.yml`: contact details, research/industry contributions, patents, awards, skills, and community activities.
- Existing `data/publications.yml`, `teaching.yml`, `mentoring.yml`, `talks.yml`,
  `services.yml`, and `coursework.yml`: shared section entries.

Research and industry entries in `cv.yml` have a stable `id`, `title`, `dates`,
optional `subtitle`/`notes`/`links`, and Markdown `bullets`. Optional `context` and
`additional_bullets` are expandable on screen and omitted from print. Teaching highlights are selected from
the existing responsibilities; remaining duties stay available in an expandable list.

Add an optional Markdown `short_description` to a research, industry, community,
teaching, mentoring, or award entry to control its resume wording. Existing `bullets`,
`responsibilities`, and `description` fields remain the detailed version for the CV;
there is no need to maintain a second copy of titles, dates, roles, or links.

```yaml
- id: project-name
  title: Project Name
  dates: '2026'
  short_description: A concise account of the work and its result.
  bullets:
    - Detailed contribution and supporting evidence.
    - Another contribution, method, or result.
```

If `short_description` is missing or blank, the resume renders the detailed text
as a paragraph. New entries appear in **both views automatically**; there are no
selection lists or bullet limits. Short descriptions are authored text, so update
them alongside the detailed wording when facts change.

Titles, role/program names, and talk venues are taken verbatim from the same fields
in both views. Do not replace formal titles with paraphrases. Optional
`short_subtitle` and `short_notes` fields abbreviate descriptive metadata without
changing its meaning; full wording remains in the CV. `short_notes: []`
explicitly omits notes already covered by the description. Missing or
blank short subtitles fall back to full values. Consecutive entries with the
same optional `resume_group` share one institutional heading.

See [the grounding audit](docs/cv-grounding-audit.md) for the source of each entry,
verified corrections, and unresolved claims. Existing repository wording is a
record of a claim, not independent confirmation. New summaries must preserve
qualifiers and distinguish investigation, implementation, and demonstrated results.

All publication citations retain their full authors and titles; paper titles link
directly to the source. To avoid listing a patent twice in the resume, a patent's
`publication_id` may reference the `id` of its citation in `publications.yml`.
That complete citation then appears in the patent section, alongside the patent
metadata. Unlinked publications and patents always render normally.

Resume teaching appointments use a table grouped by institution and course, with
each role, semester, instructor, and course link retained. Repeated course names
share a cell; identical short descriptions are printed once per course. Optional
`teaching_summary` in `teaching.yml` describes shared duties once, while each
course's `short_description` provides its specific contributions. On mobile the
table becomes a stacked list. Education and other resume sections use compact
inline entries; the full CV keeps its expanded presentation.
The full CV presents coursework in a two-column table with one row per department
and semicolon-separated courses. It stacks by department on mobile and retains
the table layout in print. The resume uses comma-separated lists by department.
Both layouts retain every course code and title from `data/coursework.yml`.
Education, mentoring, patents, talks, service, awards, skill
groups, and community entries are included in both views. The resume's page count
is determined by its content rather than a fixed two-page limit.

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
