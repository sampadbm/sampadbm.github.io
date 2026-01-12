# Academic Landing Page: Design Proposal

## 1. Vision
A minimalist, data-driven, academic landing page that serves as a professional front-face. The architecture prioritizes performance, zero-bloat, and ease of maintenance via a "Data-as-Code" approach.

## 2. Technical Stack
- **Structure:** Semantic HTML5 (Skeleton only).
- **Styling:** Vanilla CSS3 (CSS Grid & Flexbox). No frameworks.
- **Content:** YAML (`data.yml`) for structured data; Markdown support for descriptions/notes.
- **Logic:** Vanilla JavaScript (Fetch API + `js-yaml` + `marked.js`).
- **Typography:** 
    - Headers: *Cormorant Garamond* (Serif, Elegant).
    - Body: *EB Garamond* or *Georgia* (Academic, Readable).

## 3. Architecture
- **No Build Step:** Works natively in the browser.
- **Single Source of Truth:** All content resides in `data.yml`.
- **Extensible:** Future blog integration requires only a new YAML key and a rendering function in `app.js`.

## 4. Layout (Option: Classic Academic Hybrid)

```text
+----------------------+-------------------------------------------------------+
|                      |                                                       |
|   [ PROFILE PHOTO ]  |   SAMPAD BHUSAN MOHANTY                               |
|                      |   PhD Candidate @ USC                                 |
|   Bio Sidebar        |                                                       |
|   (Sticky/Fixed)     |   "Research statement / Hero hook goes here."         |
|                      |                                                       |
|   - Contact Info     |   -------------------------------------------------   |
|   - Social Links     |                                                       |
|   - Education        |   SELECTED RESEARCH                                   |
|                      |   [ Card-style entry with thumbnail + links ]         |
|   NEWS / UPDATES     |                                                       |
|   - Jan '26: ...     |   PUBLICATIONS                                        |
|   - Sep '25: ...     |   [ Traditional academic list, sorted by year ]       |
|                      |                                                       |
|   [ CV BUTTON ]      |   EXPERIENCE                                          |
|                      |   [ High-level summary of research & industry ]       |
|                      |                                                       |
|                      |   TEACHING                                            |
|                      |   ...                                                 |
|                      |                                                       |
+----------------------+-------------------------------------------------------+
```

## 5. Maintenance Workflow
To update the site, the user only modifies `data.yml`:
```yaml
profile:
  name: Sampad Bhusan Mohanty
  title: PhD Candidate in Computer Science
  statement: "I build robust learning systems..."

news:
  - date: 2026-01-11
    text: "Website redesigned for minimalism."

publications:
  - title: "SATORIS: A Unified Framework..."
    authors: "S. Mohanty, M. Kiamari, F. Bai, B. Krishnamachari"
    venue: "IEEE Access"
    year: 2025
    links:
      pdf: "#"
      code: "#"
```

## 6. Future-Proofing (Blog)
The blog will be integrated by adding a `posts/` directory with `.md` files or a `blog.yml`. The `app.js` will be updated with a simple route handler to swap the "Main Content" area with the blog view, maintaining the minimalist sidebar.
