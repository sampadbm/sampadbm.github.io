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
        if (meta.author) {
            authorDiv.textContent = meta.author;
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
