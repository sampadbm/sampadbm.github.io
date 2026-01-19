---
date: 2026-01-01
title: Diary Entry Documentation
summary: Complete guide to all available metadata fields and features for diary entries. Use this as a reference when creating new entries.
tags: [documentation, reference, guide]
mood: calm
location: Documentation
weather: Clear
images:
  - https://picsum.photos/id/1/400/300
---

This entry documents all available features and metadata fields for diary entries.

## Required Fields

**date** (YYYY-MM-DD format)
- The date of the entry **in the local timezone** (not UTC)
- Must be in `YYYY-MM-DD` format (e.g., `2026-01-01`)
- Used for sorting, filtering, and permalinks
- Day of week is automatically calculated and displayed (e.g., "January 1, 2026 | Saturday")
- Works with `time` and `timezone` fields to form a complete local timestamp
- Example: `date: 2026-01-09` means January 9th in the timezone you specify
- Example: `date: 2026-01-01`

## Optional Metadata Fields

### title
- Custom title for the entry
- If not provided, the formatted date is used as the title
- Example: `title: My First Day`

### summary
- Brief overview of the entry content
- Supports full markdown formatting (bold, italic, links, etc.)
- Displayed in a styled box above the content
- If not provided, the first paragraph is shown as preview
- Example: `summary: A reflection on starting something new.`

### tags
- Array of tags for categorization
- Used for filtering entries
- Example: `tags: [personal, work, travel]`

### mood
- Current emotional state(s)
- Can be a single mood or array of multiple moods
- Displayed with color-coded styling
- Available moods: happy, reflective, anxious, hopeful, grateful, excited, calm, tired
- Used for filtering and monthly mood visualization
- Example (single): `mood: hopeful`
- Example (multiple): `mood: [excited, grateful]`

### location
- Where the entry was written
- Example: `location: Home`

### weather
- Weather conditions when writing
- Example: `weather: Sunny, 72°F`

### time
- Time when the entry was written (local to the timezone)
- Any format you prefer (12-hour or 24-hour)
- Displayed alongside the date
- **Important**: Both the date and time are local to the timezone specified
- Example: `time: 10:30 PM` or `time: 22:30` or `time: 10:30am`

### timezone
- Timezone for the complete timestamp (date + time)
- Both the `date` and `time` fields are interpreted in this timezone
- Displayed after the time to indicate which timezone the entire entry refers to
- Useful for tracking entries across different locations
- **Example**: `date: 2026-01-09`, `time: 8:30 PM`, `timezone: PST` means January 9, 2026 at 8:30 PM Pacific Standard Time
- Example formats: `timezone: PST` or `timezone: UTC+5:30` or `timezone: America/Los_Angeles`

### images
- Array of image URLs
- Displayed as thumbnails in metadata section
- Example:
```yaml
images:
  - https://example.com/image1.jpg
  - https://example.com/image2.jpg
```

### draft
- Boolean flag to hide entry from display
- Useful for work-in-progress entries
- To show drafts, add `?showDrafts` to URL
- Example: `draft: true`

## Content Features

### Markdown Support
The entry content supports full markdown:
- **Bold text** with `**text**`
- *Italic text* with `*text*`
- `Inline code` with backticks
- [Links](https://example.com) with `[text](url)`
- Headings with `#`, `##`, `###`
- Lists (ordered and unordered)
- Blockquotes with `>`
- Code blocks with triple backticks

### Images in Content
Images in the content can have captions and positioning:

```markdown
![Caption text](image-url)
![left: Left-aligned caption](image-url)
![right: Right-aligned caption](image-url)
```

### Collapsible Content
- If a summary is provided: entire content is collapsible
- If no summary: first paragraph shown, rest is collapsible
- "Read more" / "Hide" button for toggling

## Display Features

### Date Display
- Date is shown with automatically calculated day of week
- Format: "Month Day, Year | DayOfWeek" (e.g., "January 1, 2026 | Saturday")
- If `time` is provided: "Month Day, Year | DayOfWeek | Time" (e.g., "January 9, 2026 | Thursday | 8:30 PM PST")
- Timezone is appended after time if both are present
- **Important**: The entire timestamp (date, day, time) is in the local timezone specified
- Day of week is automatically derived from the `date` field
- Example: "January 9, 2026 | Thursday | 8:30 PM PST" means everything is in PST

### Reading Time
- Automatically calculated based on word count
- Assumes 200 words per minute reading speed

### Permalinks
- Each entry has a permalink based on its date
- Format: `#YYYY-MM-DD`
- Clicking the 🔗 icon copies/navigates to permalink

### Filtering
Entries can be filtered by:
- **Year**: Filter by year of entry
- **Month**: Filter by specific month
- **Tags**: Filter by one or more tags
- **Mood**: Filter by emotional state

Filters are URL-based and shareable.

### Statistics
The diary displays:
- Total entry count
- Entries this year/month
- Top 5 most-used tags
- Mood distribution
- Monthly breakdown with mood colors

## File Naming Convention

Entry files should be named: `YYYY-MM-DD-slug.md`

Examples:
- `2026-01-01-new-year.md`
- `2026-12-25-christmas.md`
- `2026-06-15-summer-thoughts.md`

## Configuration

After adding new entries, regenerate the config:

```bash
./scripts/generate-config.sh
```

This script:
- Validates frontmatter
- Checks required fields
- Generates `config.yml` with all entries
- Provides warnings for missing optional fields

## Best Practices

1. **Always use YYYY-MM-DD date format** - Required for proper sorting
2. **Write meaningful summaries** - Helps readers decide what to read
3. **Use consistent tags** - Makes filtering more effective
4. **Add mood when relevant** - Creates interesting visualizations
5. **Break content into sections** - Use headings for better structure
6. **One entry per day** - Use the same date file for multiple updates

## Example Entry

```yaml
# Frontmatter
date: 2026-01-15
title: A Productive Day
summary: Accomplished many tasks and felt great about the progress made on various projects.
tags: [productivity, work, achievement]
mood: [excited, grateful]
location: Home Office
weather: Partly cloudy, 68°F
time: 10:30 PM
timezone: PST
```

```markdown
# Content
Today was exceptionally productive. I managed to complete three major tasks that had been on my list for weeks.

## What I Accomplished

- Finished the project proposal
- Reviewed and merged 5 pull requests
- Wrote documentation for the new feature

## Reflections

The key to today's success was starting early and maintaining focus. I'm learning that small, consistent efforts compound over time.
```

---

*This documentation entry demonstrates all available features. Refer to it when creating new diary entries.*
