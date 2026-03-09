/**
 * Shared utilities for blog pages
 */

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
 * Format date for display (YYYY-MM-DD -> "Month Day, Year")
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
 * Supports "left: caption" or "right: caption" for floating images
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
 * Build a URL from params, keeping file path unencoded
 */
function buildUrlWithParams(page, params) {
    const copy = new URLSearchParams(params);
    const file = copy.get('file');
    copy.delete('file');
    const qs = copy.toString();
    if (file) {
        return `${page}?file=${file}${qs ? '&' + qs : ''}`;
    }
    return qs ? `${page}?${qs}` : page;
}

/**
 * Build a blog URL preserving current params, optionally overriding file
 */
function buildBlogUrl(page, file) {
    const params = new URLSearchParams(window.location.search);
    if (file) params.set('file', file);
    else params.delete('file');
    return buildUrlWithParams(page, params);
}

/**
 * Normalize date from YAML (handles Date objects and strings)
 */
function normalizeDateFromYAML(date) {
    if (date instanceof Date) {
        const y = date.getUTCFullYear();
        const m = String(date.getUTCMonth() + 1).padStart(2, '0');
        const d = String(date.getUTCDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    return String(date || '');
}

/* =====================================================
   STYLE SWITCHER - Keyboard shortcuts to toggle styles
   ===================================================== */

const STYLE_OPTIONS = {
    align: ['left', 'center', 'justify'],
    layout: ['no-sidebar', 'sidebar-left', 'sidebar-right'],
    theme: ['light', 'dim', 'dark', 'sepia']
};

const STYLE_DEFAULTS = {
    align: 'left',
    layout: 'sidebar-right',
    theme: 'light'
};

// Current style state
let currentStyles = { ...STYLE_DEFAULTS };

// Which style types are enabled for this page
let enabledStyleTypes = [];

// Callbacks to run after a style change (e.g. to refresh hrefs)
let onStyleChangeCallbacks = [];

/**
 * Initialize style switcher with specified style types
 * @param {string[]} types - Array of style types to enable (e.g., ['theme'] or ['align', 'layout', 'theme'])
 */
function initStyleSwitcher(types) {
    enabledStyleTypes = types;
    loadStylesFromURL();
    setupStyleKeyboardShortcuts();
}

/**
 * Load style preferences from URL parameters
 */
function loadStylesFromURL() {
    const params = new URLSearchParams(window.location.search);

    enabledStyleTypes.forEach(type => {
        const value = params.get(type);
        if (value && STYLE_OPTIONS[type].includes(value)) {
            currentStyles[type] = value;
        }
    });

    applyStyles();
}

/**
 * Cycle through style options for a given type
 */
function cycleStyle(type) {
    if (!enabledStyleTypes.includes(type)) return;

    const options = STYLE_OPTIONS[type];
    let current = options.indexOf(currentStyles[type]);
    if (current === -1) current = 0;
    const next = (current + 1) % options.length;
    currentStyles[type] = options[next];
    applyStyles();
    updateStyleURL();
    onStyleChangeCallbacks.forEach(cb => cb());
    console.log(`${type}: ${options[current]} → ${options[next]}`);
}

/**
 * Apply current styles to the page
 */
function applyStyles() {
    const body = document.body;

    // Remove old style classes
    const toRemove = [];
    body.classList.forEach(cls => {
        if (cls.startsWith('align-') || cls.startsWith('layout-') || cls.startsWith('theme-')) {
            toRemove.push(cls);
        }
    });
    toRemove.forEach(cls => body.classList.remove(cls));

    // Add new style classes for enabled types
    enabledStyleTypes.forEach(type => {
        body.classList.add(`${type}-${currentStyles[type]}`);
    });
}

/**
 * Update URL with current style parameters
 */
function updateStyleURL() {
    const params = new URLSearchParams(window.location.search);
    enabledStyleTypes.forEach(type => params.set(type, currentStyles[type]));
    history.replaceState(null, '', buildUrlWithParams('', params));
}

/**
 * Setup keyboard shortcuts for style switching
 */
function setupStyleKeyboardShortcuts() {
    document.addEventListener('keyup', (e) => {
        // Ignore if typing in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // Ignore if modifier keys are pressed
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        const key = e.key.toLowerCase();

        if (key === 'a' && enabledStyleTypes.includes('align')) {
            cycleStyle('align');
        } else if (key === 'l' && enabledStyleTypes.includes('layout')) {
            cycleStyle('layout');
        } else if (key === 't' && enabledStyleTypes.includes('theme')) {
            cycleStyle('theme');
        }
    });
}
