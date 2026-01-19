# Sampy's Logs

A minimalist, academic-style web-based reading journal with advanced filtering, pure CSS styling, and markdown support.

## Features

### Clean, Academic Design
- Elegant calligraphic header (Cormorant Garamond italic)
- Two-column layout: 30% metadata sidebar, 70% content
- Serif typography (Georgia) for content
- Minimalist borders and spacing
- Fully viewport-relative responsive design
- Optimized for all screen sizes (mobile to ultra-wide)

### Advanced Filtering System

Filter your readings with a powerful, modular filtering interface:

**Features:**
- **Multiple selection**: Use checkboxes to select multiple values per filter
- **Four filter types**: Database, Year, Category, and Tags
- **Hidden by default**: Clean interface with "Show Filters" toggle button
- **Single-column layout**: Each filter option on its own line for clarity
- **URL parameter support**: Shareable filtered views via URL
- **AND/OR logic**: Multiple selections within a filter use OR logic; different filters use AND logic

**Example usage:**

- **Select multiple tags** (OR logic within same filter):
  - `curiosity` OR
  - `ideas` OR
  - `philosophy-of-science`

- **Combine different filters** (AND logic between filters):
  - Category: `Philosophy` AND
  - Year: `1939`

- **Share filtered views via URL**:
  ```
  ?filter_category=Philosophy,Science&filter_year=1939,2017
  ```

**Modular design:**
The filtering system is completely decoupled in `assets/filter.js` and can be easily reused in other pages or projects.

### Database Structure

Readings are stored in YAML files with the following structure:

```yaml
readings:
  - date: 2026-01-11
    category: [Education, Philosophy, Science]  # Single or multiple categories
    author: Abraham Flexner
    title: The Usefulness of Useless Knowledge
    url: https://www.ias.edu/sites/default/files/library/UsefulnessHarpers.pdf
    year: 1939  # Optional publication year
    tags: [curiosity, ideas, academic-freedom]  # Optional tags
    notes: |
      Your notes here with full **markdown** support.
```

### Supported Fields

- **date** (required) - Date in YYYY-MM-DD format
- **category** (required) - Single category or array of categories
- **author** (required) - Author name(s)
- **title** (required) - Title of the work
- **url** (required) - Link to the source
- **year** (optional) - Publication year
- **tags** (optional) - Array of tags for categorization
- **notes** (optional) - Markdown-formatted notes

### Markdown Support in Notes

Notes are parsed as markdown with support for:

- **Bold** using `**text**`
- *Italic* using `*text*`
- [Links](url) using `[text](url)`
- Inline code using `` `code` ``
- Code blocks using triple backticks
- Bullet lists using `-` or `*`
- Numbered lists using `1.`, `2.`, etc.
- Blockquotes using `>`
- Multiple paragraphs (separate with blank lines)

### Image Embedding

Images can be embedded in notes with automatic captions:

**Regular centered image:**
```markdown
![Caption text](image-url.jpg)
```

**Float image left (text wraps on right):**
```markdown
![left: Caption text](image-url.jpg)
```

**Float image right (text wraps on left):**
```markdown
![right: Caption text](image-url.jpg)
```

Images automatically:
- Display captions from alt text
- Have subtle borders and rounded corners
- Scale responsively using viewport units (30vw for floated images, 50vw for regular)
- Adapt to screen size (larger on mobile: 80-90vw)
- Align properly with surrounding text

### Multiple Database Files

Organize your readings across multiple YAML files:

```
readjnl/
├── config.yml        # Configuration file listing databases to load
└── db/
    ├── articles.yml      # Articles reading journal
    ├── papers.yml        # Academic papers
    ├── books.yml         # Books
    └── archive-2025.yml  # Archived readings
```

#### Configuration File

Edit `config.yml` to specify which databases to load by default:

```yaml
databases:
  - db/articles.yml
  - db/papers.yml
  - db/books.yml
```

When you visit `http://localhost:8000/` without any parameters, all databases listed in `config.yml` are loaded automatically. This means you can add new YAML files without modifying any source code - just add them to the config file.

#### Manual Override

You can override the config by using URL parameters:

**Single database:**
- Papers only: `http://localhost:8000/?db=db/papers.yml`
- Books only: `http://localhost:8000/?db=db/books.yml`

**Multiple databases (comma-separated):**
- Papers and books: `http://localhost:8000/?db=db/papers.yml,db/books.yml`
- Custom selection: `http://localhost:8000/?db=db/articles.yml,db/archive-2025.yml`

#### When loading multiple databases:
- Readings from all databases are merged and displayed together
- Sorted by date (newest first)
- A "DB" field appears in the metadata sidebar showing the source database name
- Each entry shows which database file it came from (e.g., "articles", "papers", "books")

## File Structure

```
readjnl/
├── index.html           # Main HTML file
├── config.yml           # Configuration listing databases to load
├── assets/
│   ├── app.js          # JavaScript for YAML parsing and rendering
│   ├── filter.js       # Modular filtering system
│   └── styles.css      # Pure CSS styling
├── db/
│   ├── articles.yml    # Articles database
│   ├── papers.yml      # Papers database
│   └── *.yml           # Additional databases
└── README.md           # This file
```

## Libraries and Architecture

### External Libraries (CDN)

**js-yaml (14KB gzipped)**
- Industry-standard YAML parser for JavaScript
- Zero dependencies, well-maintained and secure
- Used for parsing YAML database files

**marked.js (31KB gzipped)**
- Lightweight, fast markdown parser
- Supports CommonMark specification
- Used for rendering notes with markdown

**Cormorant Garamond (Google Fonts)**
- Elegant calligraphic serif font
- Used for the header title

### Custom Modules

**filter.js** - Modular filtering system
- Fully decoupled and reusable
- Handles URL parameters, UI updates, and data filtering
- Supports multiple selection with checkbox groups
- Clean single-column layout for readability
- Can be dropped into other projects

## Usage

### Running Locally

You need to serve the files through a web server (due to CORS restrictions):

**Using Python:**
```bash
cd readjnl
python3 -m http.server 8000
```

**Using PHP:**
```bash
cd readjnl
php -S localhost:8000
```

**Using Node.js:**
```bash
cd readjnl
npx http-server -p 8000
```

Then visit `http://localhost:8000` in your browser.

### Adding New Entries

Edit your YAML database file (e.g., `db/articles.yml`):

```yaml
readings:
  - date: 2026-01-11
    category: Philosophy
    author: Plato
    title: The Republic
    url: https://example.com/republic
    tags: [justice, ideal-state, philosophy]
    notes: |
      Plato's dialogue on **justice** and the ideal state.

      Key concepts:
      - The allegory of the cave
      - Philosopher kings
      - Theory of forms
```

Save the file and refresh the browser.

### Using Filters

**Accessing filters:**
1. Click the "Show Filters" button below the header
2. The filter panel expands with four filter groups

**Filtering readings:**
1. Check one or more boxes in any filter group
2. Readings update in real-time
3. Combine multiple filters for precise results
4. Click "Clear All" to reset all filters

**URL parameters:**

Filters automatically update the URL, making filtered views shareable:

- **Single filter:**
  ```
  ?filter_category=Philosophy
  ```

- **Multiple values in one filter:**
  ```
  ?filter_tags=curiosity,ideas,academic-freedom
  ```

- **Combined filters:**
  ```
  ?filter_category=Science&filter_year=2017
  ```

**Filter visibility:**
- Filters are hidden by default for a clean interface
- If you visit a URL with filter parameters, filters automatically expand
- Toggle visibility anytime with the "Show/Hide Filters" button

### Creating New Databases

1. Create a new YAML file in the `db/` directory:
   ```bash
   cp db/articles.yml db/books.yml
   ```

2. Edit the file and add your readings

3. Add it to `config.yml` to load it by default:
   ```yaml
   databases:
     - db/articles.yml
     - db/papers.yml
     - db/books.yml  # Your new database
   ```

4. Refresh the browser - your new database will be loaded automatically

Alternatively, access it directly via URL parameter without adding to config:
```
http://localhost:8000/?db=db/books.yml
```

## Styling

All styling is in pure CSS (`assets/styles.css`). No inline styles or CSS frameworks.

**Key style elements:**
- **Typography**:
  - Header: Cormorant Garamond (Google Fonts) - elegant calligraphic italic
  - Content: Georgia serif for academic feel
- **Layout**: Fully viewport-relative units (vw) for true responsiveness
- **Colors**: Muted palette (#555, #888, #ddd, #e5e5e5) for minimal distraction
- **Borders**: Subtle 1px borders for clean separation
- **Spacing**: Viewport-relative padding and margins
- **Responsive breakpoints**:
  - Desktop: 90vw container
  - Tablet (≤768px): 95vw container
  - Mobile (≤480px): 98vw container
- **Filter UI**: Hidden by default, single-column layout for easy scanning

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript (async/await, arrow functions, classes)
- CSS Flexbox and Grid
- CSS viewport units (vw, vh)
- Fetch API
- URLSearchParams
- History API (pushState for URL updates)

**External dependencies:**
- Google Fonts (Cormorant Garamond)
- jsDelivr CDN (js-yaml, marked.js)

Tested on Firefox, Chrome, Safari, and Edge.

## License

Free to use and modify as needed.
