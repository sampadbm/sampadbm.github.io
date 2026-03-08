/**
 * Post page - loads and renders a single blog post
 */

/**
 * Get post file path from URL query parameter
 */
function getPostFile() {
    const params = new URLSearchParams(window.location.search);
    return params.get('file');
}

/**
 * Render LaTeX in an element using KaTeX auto-render
 */
function renderMath(element) {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(element, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ],
            throwOnError: false,
            errorColor: '#cc0000'
        });
    }
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format tags for display
 */
function formatTags(tags) {
    if (!tags) return '';
    const tagArray = Array.isArray(tags) ? tags : [tags];
    return tagArray.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
}

/**
 * Process images to add figure/figcaption wrappers
 */
function processImages(html) {
    return html.replace(/<img([^>]*)alt="([^"]*)"([^>]*)>/gi, (match, before, altText, after) => {
        const posMatch = altText.match(/^(left|right):\s*(.*)$/i);

        if (posMatch) {
            const position = posMatch[1].toLowerCase();
            const caption = posMatch[2];
            const imgTag = `<img${before}alt="${caption}"${after}>`;
            return `<figure class="float-${position}">${imgTag}<figcaption>${caption}</figcaption></figure>`;
        } else if (altText) {
            const imgTag = `<img${before}alt="${altText}"${after}>`;
            return `<figure>${imgTag}<figcaption>${altText}</figcaption></figure>`;
        }

        return match;
    });
}

/**
 * Generate table of contents from headings
 */
function generateTOC() {
    const content = document.getElementById('post-content');
    const tocList = document.getElementById('toc-list');
    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (headings.length === 0) {
        document.getElementById('sidebar-toc').style.display = 'none';
        return;
    }

    tocList.innerHTML = '';

    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const li = document.createElement('li');
        li.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        // Keep original text with LaTeX delimiters
        link.textContent = heading.textContent;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        li.appendChild(link);
        tocList.appendChild(li);
    });

    // Render LaTeX in TOC
    renderMath(tocList);
}

/**
 * Parse frontmatter from markdown text
 */
function parseFrontmatter(markdownText) {
    const match = markdownText.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) {
        return { meta: {}, content: markdownText };
    }
    const meta = jsyaml.load(match[1]);
    return { meta, content: match[2] };
}

/**
 * Load and render the post
 */
async function loadPost() {
    const file = getPostFile();

    if (!file) {
        document.getElementById('post-title').textContent = 'No post specified';
        document.getElementById('post-content').innerHTML =
            '<p>No post file specified. <a href="index.html">Go back to blog</a></p>';
        return;
    }

    try {
        // Load markdown file directly
        const mdResponse = await fetch(file, { cache: 'no-cache' });
        if (!mdResponse.ok) {
            throw new Error(`Failed to load ${file}`);
        }
        const markdownText = await mdResponse.text();

        // Parse frontmatter and content
        const { meta, content } = parseFrontmatter(markdownText);

        // Handle date (could be Date object or string from YAML)
        let dateStr = meta.date;
        if (meta.date instanceof Date) {
            const y = meta.date.getUTCFullYear();
            const m = String(meta.date.getUTCMonth() + 1).padStart(2, '0');
            const d = String(meta.date.getUTCDate()).padStart(2, '0');
            dateStr = `${y}-${m}-${d}`;
        } else {
            dateStr = String(meta.date || '');
        }

        // Update page title
        document.title = `${meta.title || 'Untitled'} - Sampad's Blog`;

        // Update post title
        document.getElementById('post-title').textContent = meta.title || 'Untitled';

        // Update metadata (inline format: "March 7, 2026 | math, linear-algebra")
        const metadataDiv = document.getElementById('post-metadata');
        const parts = [];
        if (dateStr) parts.push(formatDate(dateStr));
        if (meta.tags && meta.tags.length) {
            parts.push(meta.tags.map(t => escapeHtml(t)).join(', '));
        }
        metadataDiv.innerHTML = parts.join(' | ');

        // Update summary if exists
        const summaryDiv = document.getElementById('post-summary');
        const summaryText = meta.summary || '';
        if (summaryText) {
            summaryDiv.innerHTML = `<p>${escapeHtml(summaryText)}</p>`;
            renderMath(summaryDiv);
        } else {
            summaryDiv.style.display = 'none';
        }

        // Render markdown
        const html = processImages(marked.parse(content));
        document.getElementById('post-content').innerHTML = html;

        // Generate TOC BEFORE KaTeX renders (to get clean text)
        generateTOC();

        // Render LaTeX
        renderMath(document.getElementById('post-content'));

    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('post-title').textContent = 'Error loading post';
        document.getElementById('post-content').innerHTML =
            `<p style="color: #cc0000;">Error loading post: ${escapeHtml(error.message)}</p>
             <p><a href="index.html">Go back to blog</a></p>`;
    }
}

/* =====================================================
   STYLE SWITCHER - Keyboard shortcuts to toggle styles
   ===================================================== */

const STYLES = {
    align: ['left', 'center', 'justify'],
    layout: ['no-sidebar', 'sidebar-left', 'sidebar-right'],
    theme: ['light', 'dim', 'dark', 'sepia']
};

let currentStyles = {
    align: 'left',
    layout: 'sidebar-right',
    theme: 'light'
};

/**
 * Load style preferences from URL parameters
 */
function loadStylesFromURL() {
    const params = new URLSearchParams(window.location.search);

    const align = params.get('align');
    const layout = params.get('layout');
    const theme = params.get('theme');

    if (align && STYLES.align.includes(align)) currentStyles.align = align;
    if (layout && STYLES.layout.includes(layout)) currentStyles.layout = layout;
    if (theme && STYLES.theme.includes(theme)) currentStyles.theme = theme;

    applyStyles();
}

/**
 * Cycle through style options
 */
function cycleStyle(type) {
    const options = STYLES[type];
    let current = options.indexOf(currentStyles[type]);
    // If current value not found, start from beginning
    if (current === -1) current = 0;
    const next = (current + 1) % options.length;
    currentStyles[type] = options[next];
    applyStyles();
    updateURL();
    console.log(`${type}: ${options[current]} → ${options[next]}`);
}

/**
 * Apply current styles to the page
 */
function applyStyles() {
    const body = document.body;

    // Collect classes to remove first (can't modify while iterating)
    const toRemove = [];
    body.classList.forEach(cls => {
        if (cls.startsWith('align-') || cls.startsWith('layout-') || cls.startsWith('theme-')) {
            toRemove.push(cls);
        }
    });

    // Remove old classes
    toRemove.forEach(cls => body.classList.remove(cls));

    // Add new style classes
    body.classList.add(`align-${currentStyles.align}`);
    body.classList.add(`layout-${currentStyles.layout}`);
    body.classList.add(`theme-${currentStyles.theme}`);
}

/**
 * Update URL with current style parameters
 */
function updateURL() {
    const params = new URLSearchParams(window.location.search);
    params.set('align', currentStyles.align);
    params.set('layout', currentStyles.layout);
    params.set('theme', currentStyles.theme);
    history.replaceState(null, '', `?${params}`);
}

/**
 * Keyboard shortcuts for style switching
 */
document.addEventListener('keyup', (e) => {
    // Ignore if typing in input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Ignore if modifier keys are pressed (browser shortcuts)
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    const key = e.key.toLowerCase();

    if (key === 'a') {
        cycleStyle('align');
    } else if (key === 'l') {
        cycleStyle('layout');
    } else if (key === 't') {
        cycleStyle('theme');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStylesFromURL();
    loadPost();
});
