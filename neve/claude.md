# Project Documentation: Sampad's Academic Website

## Overview

This is a personal academic website for Sampad Bhusan Mohanty, PhD Candidate at USC. The project follows a minimalist, data-driven architecture with zero build steps, using vanilla HTML/CSS/JavaScript and YAML-based content management.

## Project Philosophy

- **No frameworks**: Pure vanilla JS, HTML5, CSS3
- **No build step**: Works natively in browser
- **Data as Code**: All content in YAML files
- **Minimalist design**: Academic aesthetic with serif typography
- **Performance-first**: Zero bloat, fast loading

## Folder Structure

```
neve/
├── index.html              # Main landing page (academic homepage)
├── assets/                 # Main site assets
│   ├── app.js             # Core JavaScript (YAML parsing, rendering)
│   ├── styles.css         # Main site styles
│   ├── print.css          # Print-specific styles
│   └── profile/           # Profile photos and documents
├── data/                   # YAML data files (single source of truth)
│   ├── profile.yml        # Personal info, education, experience
│   ├── publications.yml   # Publications list
│   ├── research.yml       # Research projects
│   ├── talks.yml          # Talks and presentations
│   ├── news.yml           # News updates
│   └── services.yml       # Service activities
├── diary/                  # Personal diary subproject
│   ├── index.html         # Diary viewer
│   ├── config.yml         # Auto-generated list of entries
│   ├── entries/           # Markdown diary entries (YYYY-MM-DD-title.md)
│   ├── media/             # Images and media for entries
│   ├── assets/            # Diary-specific JS/CSS
│   └── scripts/           # Utility scripts (generate-config.sh)
├── digest/                 # Reading journal subproject
│   ├── index.html         # Reading journal viewer
│   ├── config.yml         # Database configuration
│   ├── db/                # YAML databases (articles.yml, papers.yml)
│   ├── assets/            # Digest-specific JS/CSS
│   │   ├── app.js
│   │   ├── filter.js      # Modular filtering system
│   │   └── styles.css
│   └── README.md          # Detailed documentation
├── webcv/                  # Web CV
│   └── index.html
├── letters/                # Empty folder (future use)
├── update-date.sh          # Utility script to update last_updated date
├── idea.md                 # Original design proposal
└── idea_claude.md          # Extended ideas
```

## Architecture

### Main Site (Root)

**Technology Stack:**
- HTML5 semantic structure
- Vanilla CSS3 (Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- YAML for data (`js-yaml` library via CDN)
- Markdown support (`marked.js` library via CDN)
- Typography: Cormorant Garamond (headers), EB Garamond (body)

**Layout:**
- Two-column layout: sidebar (profile) + main content
- Sidebar: Profile photo, contact links, education, experience
- Main: Research, publications, teaching, news

**Key Files:**
- `index.html`: Minimal skeleton with two containers (#sidebar, #content)
- `assets/app.js`: Fetches YAML data, renders sections dynamically
- `data/*.yml`: All content lives here

**Data Flow:**
1. Browser loads `index.html`
2. `app.js` fetches YAML files from `data/` folder
3. Parses YAML using `js-yaml`
4. Dynamically renders sidebar and content sections
5. Markdown in YAML fields is parsed using `marked.js`

### Diary Subproject

**Purpose:** Personal journal/diary with markdown entries

**Key Features:**
- Markdown entries with frontmatter
- Media support (images)
- Auto-generated config
- Filtering and search

**Workflow:**
1. Add new entry: `diary/entries/YYYY-MM-DD-title.md`
2. Run `./diary/scripts/generate-config.sh` to update `config.yml`
3. Refresh browser

**Entry Format:**
```markdown
---
title: Entry Title
date: 2026-01-15
tags: [tag1, tag2]
---

Entry content with **markdown** support.

![Caption](../media/2026/folder/image.jpg)
```

### Digest Subproject

**Purpose:** Reading journal with advanced filtering

**Key Features:**
- Multiple YAML databases (articles.yml, papers.yml)
- Advanced filtering by category, year, tags, database
- URL parameter support for shareable filtered views
- Markdown notes support
- Image embedding in notes

**Database Format (YAML):**
```yaml
readings:
  - date: 2026-01-11
    category: [Philosophy, Science]
    author: Author Name
    title: Work Title
    url: https://link.to/source
    year: 2025
    tags: [tag1, tag2]
    notes: |
      Markdown notes here...
```

**Filtering:**
- Checkbox-based multi-select filters
- AND logic between different filters
- OR logic within same filter type
- URL parameters: `?filter_category=Science&filter_tags=ai,ml`

## Typography & Design

**Fonts:**
- Headers: Cormorant Garamond (Google Fonts) - elegant serif
- Body: EB Garamond / Georgia - academic readability
- Monospace: Default system font

**Colors:**
- Minimalist palette: #555, #888, #ddd, #e5e5e5
- Black text on white background
- Subtle borders (1px)

**Responsive:**
- Desktop: 90vw container
- Tablet (≤768px): 95vw
- Mobile (≤480px): 98vw
- Viewport-relative units throughout

## Development Workflow

### Adding Content

**Main Site:**
1. Edit relevant YAML file in `data/`
2. Refresh browser (no build step!)

**Diary:**
1. Create `diary/entries/YYYY-MM-DD-title.md`
2. Add media to `diary/media/YYYY/folder/`
3. Run `./diary/scripts/generate-config.sh`
4. Refresh browser

**Digest:**
1. Edit `digest/db/articles.yml` (or other database)
2. Refresh browser

### Testing Locally

Serve via HTTP server (required for CORS):

```bash
# Python
python3 -m http.server 8000

# PHP
php -S localhost:8000

# Node
npx http-server -p 8000
```

Visit `http://localhost:8000`

### Updating Last Modified Date

Run `./update-date.sh` to update `last_updated` field in `data/profile.yml`

## Git Workflow

**Current Branch:** main
**Main Branch:** main

**Pre-commit Hook:**
Located at `.git/hooks/pre-commit` - automatically runs checks before commits

**Commit Style:**
Based on recent commits, use concise imperative messages:
- "date_fixed"
- "diary_update"
- "udpate" (note: watch for typos)

## Key Conventions

1. **No Build Step**: Everything runs in browser, no compilation
2. **Data as Source of Truth**: Content lives in YAML, not HTML
3. **Vanilla Everything**: No frameworks, no dependencies (except CDN libraries)
4. **Markdown Support**: Use markdown for rich text in YAML
5. **Responsive Units**: Use vw/vh for viewport-relative sizing
6. **Semantic HTML**: Use proper HTML5 semantic tags
7. **Accessibility**: Include ARIA labels, skip-to-content links

## External Dependencies (CDN)

All loaded from CDN (no npm, no package.json):

- `js-yaml` (v4): YAML parsing
- `marked.js` (v11.1.1): Markdown rendering
- Google Fonts: Cormorant Garamond, EB Garamond

## Browser Compatibility

**Requirements:**
- ES6+ support (async/await, arrow functions, classes)
- CSS Grid & Flexbox
- Fetch API
- URLSearchParams
- History API (pushState)

**Tested:** Firefox, Chrome, Safari, Edge

## Important Files to Know

**Configuration:**
- `data/profile.yml` - Personal info (name, title, links, education)
- `digest/config.yml` - Which databases to load in digest
- `diary/config.yml` - Auto-generated list of diary entries

**Core Logic:**
- `assets/app.js` - Main site rendering
- `diary/assets/app.js` - Diary rendering
- `digest/assets/app.js` - Digest rendering
- `digest/assets/filter.js` - Modular filtering system (reusable)

**Utilities:**
- `update-date.sh` - Update last modified date
- `diary/scripts/generate-config.sh` - Regenerate diary config

## Future Plans (from idea.md)

- Blog integration (posts/ directory with .md files or blog.yml)
- Route handler in app.js for blog view
- Maintain sidebar while swapping main content

## Notes for AI Assistants

When working with this codebase:

1. **Never add build tools** - keep it vanilla
2. **Edit YAML, not HTML** - content lives in data/
3. **Preserve minimalism** - no extra features unless requested
4. **Maintain consistency** - follow existing patterns
5. **Test changes** - always verify in browser with local server
6. **Respect the architecture** - data-driven, zero-bloat
7. **Check responsive design** - test on different viewport sizes
8. **Validate YAML** - ensure proper syntax in data files
9. **Use existing libraries** - js-yaml and marked.js already loaded
10. **Keep it simple** - the goal is maintainability and performance

## Contact

**Owner:** Sampad Bhusan Mohanty
**Email:** sbmohant@usc.edu
**GitHub:** neveisa
**LinkedIn:** https://www.linkedin.com/in/sampad-mohanty-946a82264/
