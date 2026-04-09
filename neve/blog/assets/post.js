/**
 * Post page - loads and renders a single blog post
 * Requires: utils.js
 */

/**
 * Get post file path from URL query parameter
 */
function getPostFile() {
    const params = new URLSearchParams(window.location.search);
    return params.get('file');
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

    // Find the minimum heading level used
    let minLevel = 6;
    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level < minLevel) minLevel = level;
    });

    // Track counters at each depth level
    const counters = [0, 0, 0, 0, 0, 0];
    tocList.innerHTML = '';

    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const level = parseInt(heading.tagName.charAt(1));
        const depth = level - minLevel;

        // Update counters
        counters[depth]++;
        // Reset deeper counters when going to a shallower level
        for (let i = depth + 1; i < counters.length; i++) {
            counters[i] = 0;
        }

        // Build hierarchical number string
        const numberParts = counters.slice(0, depth + 1);
        const numberStr = numberParts.join('.');

        const li = document.createElement('li');
        li.className = 'toc-item';
        li.dataset.depth = depth;

        const numberSpan = document.createElement('span');
        numberSpan.className = 'toc-number';
        numberSpan.textContent = numberStr + '.';

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;

        // Add number to the heading in the post content
        const headingNumber = document.createElement('span');
        headingNumber.className = 'heading-number';
        headingNumber.textContent = numberStr + '. ';
        heading.prepend(headingNumber);

        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        li.appendChild(numberSpan);
        li.appendChild(link);
        tocList.appendChild(li);

    });

    // Render LaTeX in TOC
    renderMath(tocList);
}

/**
 * Protect math blocks from markdown parsing.
 * Replaces $$...$$ and $...$ with placeholders so marked.js
 * won't insert <p> tags inside multi-line math.
 */
function protectMath(text) {
    const mathBlocks = [];
    text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
        mathBlocks.push(match);
        return `%%MATH_BLOCK_${mathBlocks.length - 1}%%`;
    });
    text = text.replace(/\$([^\n$]+?)\$/g, (match) => {
        mathBlocks.push(match);
        return `%%MATH_BLOCK_${mathBlocks.length - 1}%%`;
    });
    return { text, mathBlocks };
}

function restoreMath(html, mathBlocks) {
    return html.replace(/%%MATH_BLOCK_(\d+)%%/g, (_, i) => mathBlocks[parseInt(i)]);
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
 * Dynamically load a script from a URL, resolving when loaded
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
    });
}

/**
 * Load Vega-Lite stack and register the marked extension.
 * Called only when the post contains ```vegalite blocks.
 */
async function enableVegalite() {
    await loadScript('https://cdn.jsdelivr.net/npm/vega@5');
    await loadScript('https://cdn.jsdelivr.net/npm/vega-lite@5');
    await loadScript('https://cdn.jsdelivr.net/npm/vega-embed@6');

    marked.use({
        extensions: [{
            name: 'vegalite',
            level: 'block',
            start(src) { return src.indexOf('```vegalite'); },
            tokenizer(src) {
                const match = src.match(/^```vegalite\n([\s\S]*?)```/);
                if (!match) return;
                return { type: 'vegalite', raw: match[0], text: match[1] };
            },
            renderer(token) {
                const id = `vegalite-${Math.random().toString(36).slice(2)}`;
                const observer = new MutationObserver(() => {
                    const el = document.getElementById(id);
                    if (el) {
                        observer.disconnect();
                        vegaEmbed(el, jsyaml.load(token.text));
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
                return `<div id="${id}"></div>`;
            }
        }]
    });
}

/**
 * Register the ```readings extension for dynamically loading YAML reading lists.
 * Usage in markdown:
 *   ```readings
 *   source: posts/reference/reading-wishlist/wishlist.yml
 *   ```
 */
function enableReadings() {
    marked.use({
        extensions: [{
            name: 'readings',
            level: 'block',
            start(src) { return src.indexOf('```readings'); },
            tokenizer(src) {
                const match = src.match(/^```readings\n([\s\S]*?)```/);
                if (!match) return;
                return { type: 'readings', raw: match[0], text: match[1] };
            },
            renderer(token) {
                const config = jsyaml.load(token.text);
                const source = config.source;
                const id = `readings-${Math.random().toString(36).slice(2)}`;

                // Load and render asynchronously after DOM insertion
                const observer = new MutationObserver(() => {
                    const el = document.getElementById(id);
                    if (el) {
                        observer.disconnect();
                        loadReadingsTable(el, source);
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });

                return `<div id="${id}" class="readings-container"><p style="color: #888; font-style: italic;">Loading readings...</p></div>`;
            }
        }]
    });
}

/**
 * Fetch a YAML readings file and render it as a filterable table
 */
async function loadReadingsTable(container, source) {
    try {
        const response = await fetch(source, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`Failed to load ${source}`);
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        const readings = data.readings || [];

        if (readings.length === 0) {
            container.innerHTML = '<p style="color: #888; font-style: italic;">No entries.</p>';
            return;
        }

        // Sort by year descending, then author
        readings.sort((a, b) => (b.year || 0) - (a.year || 0) || (a.author || '').localeCompare(b.author || ''));

        // Collect all unique categories and types (from tags like "paper", "book", etc.)
        const allCategories = new Set();
        const allTypes = new Set();
        const typeKeywords = ['paper', 'book', 'article', 'thesis', 'survey', 'textbook'];

        readings.forEach(r => {
            if (r.category) {
                (Array.isArray(r.category) ? r.category : [r.category]).forEach(c => allCategories.add(c));
            }
            if (r.tags) {
                r.tags.forEach(t => {
                    if (typeKeywords.includes(t)) allTypes.add(t);
                });
            }
        });

        // Build filter + search bar
        const filterId = `filter-${container.id}`;
        const searchId = `search-${container.id}`;

        let filterHTML = `<div class="readings-toolbar">`;
        filterHTML += `<input type="text" id="${searchId}" class="readings-search" placeholder="Search title or author..." />`;

        if (allTypes.size > 1) {
            filterHTML += `<div class="readings-filter-group"><span class="readings-filter-label">Type:</span>`;
            for (const type of [...allTypes].sort()) {
                filterHTML += `<label class="readings-filter-option"><input type="checkbox" data-filter-type="type" value="${escapeHtml(type)}" checked /> ${escapeHtml(type)}</label>`;
            }
            filterHTML += `</div>`;
        }

        if (allCategories.size > 1) {
            filterHTML += `<div class="readings-filter-group"><span class="readings-filter-label">Category:</span>`;
            for (const cat of [...allCategories].sort()) {
                filterHTML += `<label class="readings-filter-option"><input type="checkbox" data-filter-type="category" value="${escapeHtml(cat)}" checked /> ${escapeHtml(cat)}</label>`;
            }
            filterHTML += `</div>`;
        }

        filterHTML += `</div>`;

        // Build table
        const tableId = `table-${container.id}`;
        let tableHTML = `<table class="readings-table" id="${tableId}">`;
        tableHTML += `<thead><tr>
            <th class="col-title">Title</th>
            <th class="col-author">Author</th>
            <th class="col-year">Year</th>
            <th class="col-categories">Categories</th>
            <th class="col-tags">Tags</th>
        </tr></thead><tbody>`;

        readings.forEach((r, i) => {
            const cats = Array.isArray(r.category) ? r.category : (r.category ? [r.category] : []);
            const tags = r.tags || [];
            const displayTags = tags.filter(t => !typeKeywords.includes(t) && t !== 'wishlist' && t !== 'ee592');
            const types = tags.filter(t => typeKeywords.includes(t));

            tableHTML += `<tr data-index="${i}"
                data-categories="${escapeHtml(cats.join(',').toLowerCase())}"
                data-types="${escapeHtml(types.join(',').toLowerCase())}"
                data-search="${escapeHtml((r.title + ' ' + (r.author || '')).toLowerCase())}">
                <td class="col-title">${r.url ? `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.title)}</a>` : escapeHtml(r.title)}</td>
                <td class="col-author">${escapeHtml(r.author || '')}</td>
                <td class="col-year">${r.year || ''}</td>
                <td class="col-categories">${cats.map(c => `<span class="readings-cat">${escapeHtml(c)}</span>`).join('')}</td>
                <td class="col-tags">${displayTags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</td>
            </tr>`;
        });

        tableHTML += `</tbody></table>`;
        tableHTML += `<div class="readings-count"><span id="count-${container.id}">${readings.length}</span> entries</div>`;

        container.innerHTML = filterHTML + tableHTML;

        // Wire up filtering
        const searchInput = document.getElementById(searchId);
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const rows = container.querySelectorAll('tbody tr');
        const countEl = document.getElementById(`count-${container.id}`);

        function applyFilters() {
            const query = searchInput.value.toLowerCase();

            // Gather checked values per filter type
            const checkedTypes = new Set();
            const checkedCats = new Set();
            container.querySelectorAll('input[data-filter-type="type"]:checked').forEach(cb => checkedTypes.add(cb.value.toLowerCase()));
            container.querySelectorAll('input[data-filter-type="category"]:checked').forEach(cb => checkedCats.add(cb.value.toLowerCase()));

            let visible = 0;
            rows.forEach(row => {
                const searchText = row.dataset.search;
                const rowTypes = row.dataset.types.split(',').filter(Boolean);
                const rowCats = row.dataset.categories.split(',').filter(Boolean);

                const matchesSearch = !query || searchText.includes(query);
                const matchesType = checkedTypes.size === 0 || rowTypes.length === 0 || rowTypes.some(t => checkedTypes.has(t));
                const matchesCat = checkedCats.size === 0 || rowCats.length === 0 || rowCats.some(c => checkedCats.has(c));

                const show = matchesSearch && matchesType && matchesCat;
                row.style.display = show ? '' : 'none';
                if (show) visible++;
            });
            countEl.textContent = visible;
        }

        searchInput.addEventListener('input', applyFilters);
        checkboxes.forEach(cb => cb.addEventListener('change', applyFilters));

    } catch (error) {
        console.error('Error loading readings:', error);
        container.innerHTML = `<p style="color: #cc0000;">Error loading readings: ${escapeHtml(error.message)}</p>`;
    }
}

/**
 * Register the ```bookmarks extension for dynamically loading YAML bookmark lists.
 * Renders bookmarks grouped by category with search filtering.
 */
function enableBookmarks() {
    marked.use({
        extensions: [{
            name: 'bookmarks',
            level: 'block',
            start(src) { return src.indexOf('```bookmarks'); },
            tokenizer(src) {
                const match = src.match(/^```bookmarks\n([\s\S]*?)```/);
                if (!match) return;
                return { type: 'bookmarks', raw: match[0], text: match[1] };
            },
            renderer(token) {
                const config = jsyaml.load(token.text);
                const source = config.source;
                const id = `bookmarks-${Math.random().toString(36).slice(2)}`;

                const observer = new MutationObserver(() => {
                    const el = document.getElementById(id);
                    if (el) {
                        observer.disconnect();
                        loadBookmarksView(el, source);
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });

                return `<div id="${id}" class="bookmarks-container"><p style="color: #888; font-style: italic;">Loading bookmarks...</p></div>`;
            }
        }]
    });
}

/**
 * Fetch a YAML bookmarks file and render grouped by category
 */
async function loadBookmarksView(container, source) {
    try {
        const response = await fetch(source, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`Failed to load ${source}`);
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        const bookmarks = data.bookmarks || [];

        if (bookmarks.length === 0) {
            container.innerHTML = '<p style="color: #888; font-style: italic;">No bookmarks yet.</p>';
            return;
        }

        // Group by category
        const groups = {};
        bookmarks.forEach(b => {
            const cat = b.category || 'Uncategorized';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(b);
        });

        // Sort categories alphabetically, each group by title
        const sortedCats = Object.keys(groups).sort();
        sortedCats.forEach(cat => groups[cat].sort((a, b) => (a.title || '').localeCompare(b.title || '')));

        // Search bar
        const searchId = `search-${container.id}`;
        let html = `<div class="bookmarks-toolbar">`;
        html += `<input type="text" id="${searchId}" class="readings-search" placeholder="Search bookmarks..." />`;
        html += `<span class="readings-count"><span id="count-${container.id}">${bookmarks.length}</span> bookmarks</span>`;
        html += `</div>`;

        // Render grouped list
        sortedCats.forEach(cat => {
            html += `<div class="bookmarks-group" data-category="${escapeHtml(cat.toLowerCase())}">`;
            html += `<h4 class="bookmarks-category">${escapeHtml(cat)}</h4>`;
            html += `<ul class="bookmarks-list">`;
            groups[cat].forEach(b => {
                const tags = b.tags || [];
                const searchData = [b.title, b.description, cat, ...tags].join(' ').toLowerCase();
                html += `<li class="bookmark-item" data-search="${escapeHtml(searchData)}">`;
                html += `<a href="${escapeHtml(b.url)}" target="_blank" rel="noopener noreferrer" class="bookmark-link">${escapeHtml(b.title)}</a>`;
                if (b.description) {
                    html += ` <span class="bookmark-desc">— ${escapeHtml(b.description)}</span>`;
                }
                if (tags.length) {
                    html += ` <span class="bookmark-tags">${tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</span>`;
                }
                html += `</li>`;
            });
            html += `</ul></div>`;
        });

        container.innerHTML = html;

        // Wire up search
        const searchInput = document.getElementById(searchId);
        const items = container.querySelectorAll('.bookmark-item');
        const groupEls = container.querySelectorAll('.bookmarks-group');
        const countEl = document.getElementById(`count-${container.id}`);

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            let visible = 0;

            items.forEach(item => {
                const match = !query || item.dataset.search.includes(query);
                item.style.display = match ? '' : 'none';
                if (match) visible++;
            });

            // Hide empty category groups
            groupEls.forEach(group => {
                const hasVisible = group.querySelector('.bookmark-item:not([style*="display: none"])');
                group.style.display = hasVisible ? '' : 'none';
            });

            countEl.textContent = visible;
        });

    } catch (error) {
        console.error('Error loading bookmarks:', error);
        container.innerHTML = `<p style="color: #cc0000;">Error loading bookmarks: ${escapeHtml(error.message)}</p>`;
    }
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
        const dateStr = normalizeDateFromYAML(meta.date);

        // Update page title
        document.title = `${meta.title || 'Untitled'} - Sampy's Blog`;

        // Update post title
        document.getElementById('post-title').textContent = meta.title || 'Untitled';

        // Update author
        const authorDiv = document.getElementById('post-author');
        const authors = meta.authors
            ? (Array.isArray(meta.authors) ? meta.authors : [meta.authors])
            : [];
        if (authors.length) {
            authorDiv.textContent = authors.join(', ');
        } else {
            authorDiv.style.display = 'none';
        }

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

        // Load Vega-Lite plugin on demand if the post uses it
        if (content.includes('```vegalite')) {
            await enableVegalite();
        }

        // Load readings plugin on demand if the post uses it
        if (content.includes('```readings')) {
            enableReadings();
        }

        // Load bookmarks plugin on demand if the post uses it
        if (content.includes('```bookmarks')) {
            enableBookmarks();
        }

        // Render markdown
        const { text: safeContent, mathBlocks } = protectMath(content);
        const html = restoreMath(processImages(marked.parse(safeContent)), mathBlocks);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initStyleSwitcher(['align', 'layout', 'theme']);
    loadPost();

    // Update back link to preserve style params
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.href = buildBlogUrl('index.html');
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = buildBlogUrl('index.html');
        });
        onStyleChangeCallbacks.push(() => {
            backLink.href = buildBlogUrl('index.html');
        });
    }

    // 'b' key to go back to blog listing
    document.addEventListener('keyup', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key.toLowerCase() === 'b') {
            window.location.href = buildBlogUrl('index.html');
        }
    });
});
