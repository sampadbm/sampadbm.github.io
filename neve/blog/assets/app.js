// Store all posts globally for filtering
let allPostsData = [];
let treeData = [];
let filterManager = null;

// Cache for loaded post content
const contentCache = {};

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
 * Extract folder path from post file path
 */
function getPostFolder(postPath) {
    const withoutPrefix = postPath.replace(/^posts\//, '');
    const parts = withoutPrefix.split('/');
    if (parts.length === 1) {
        return '';
    }
    return parts.slice(0, -1).join('/');
}

/**
 * Count total posts in a tree node (recursively)
 */
function countPostsInNode(node) {
    let count = 0;
    if (node.posts) count += node.posts.length;
    if (node.children) {
        for (const child of node.children) {
            count += countPostsInNode(child);
        }
    }
    return count;
}

/**
 * Build tree HTML from tree structure
 */
function buildTreeHTML(nodes, level = 0) {
    if (!nodes || nodes.length === 0) return '';

    return nodes.map(node => {
        if (node.post) {
            const post = allPostsData.find(p => p.file === node.post);
            const title = post?.title || node.post.split('/').pop().replace('.md', '');
            const postId = post ? generatePostId(post) : '';
            return `<div class="tree-post" data-file="${escapeHtml(node.post)}" data-post-id="${postId}">
                <span class="tree-post-icon">📄</span>
                <span class="tree-post-title">${escapeHtml(title)}</span>
            </div>`;
        } else if (node.name) {
            const postCount = countPostsInNode(node);
            let childNodes = [];
            if (node.children) childNodes = childNodes.concat(node.children);
            if (node.posts) childNodes = childNodes.concat(node.posts.map(p => ({ post: p })));
            const childrenHTML = buildTreeHTML(childNodes, level + 1);

            return `
                <div class="tree-folder collapsed" data-folder="${escapeHtml(node.name)}">
                    <div class="tree-folder-header">
                        <span class="tree-toggle">▶</span>
                        <span class="tree-folder-icon">📁</span>
                        <span class="tree-folder-name">${escapeHtml(node.name)}</span>
                        <span class="tree-count">(${postCount})</span>
                    </div>
                    <div class="tree-children hidden">${childrenHTML}</div>
                </div>
            `;
        }
        return '';
    }).join('');
}

/**
 * Generate a unique post ID from post data
 */
function generatePostId(post) {
    return post.date + '-' + (post.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
}

/**
 * Render the folder tree
 */
function renderTree() {
    const container = document.getElementById('tree-container');
    if (!container || !treeData || treeData.length === 0) {
        if (container) container.innerHTML = '';
        return;
    }

    const treeHTML = buildTreeHTML(treeData);
    container.innerHTML = `
        <div class="tree-header">
            <span class="tree-title">Browse by Folder</span>
        </div>
        <div class="tree-content">${treeHTML}</div>
    `;

    attachTreeHandlers();
}

/**
 * Attach event handlers to tree elements
 */
function attachTreeHandlers() {
    document.querySelectorAll('.tree-folder-header').forEach(header => {
        header.addEventListener('click', () => {
            const folder = header.closest('.tree-folder');
            const children = folder.querySelector('.tree-children');
            const toggle = header.querySelector('.tree-toggle');

            if (folder.classList.contains('collapsed')) {
                folder.classList.remove('collapsed');
                children.classList.remove('hidden');
                toggle.textContent = '▼';
            } else {
                folder.classList.add('collapsed');
                children.classList.add('hidden');
                toggle.textContent = '▶';
            }
        });
    });

    document.querySelectorAll('.tree-post').forEach(postEl => {
        postEl.addEventListener('click', () => {
            const postId = postEl.dataset.postId;
            if (postId) {
                const target = document.getElementById(postId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    target.classList.add('highlighted');
                    setTimeout(() => target.classList.remove('highlighted'), 2000);
                }
            }
        });
    });
}

/**
 * Load posts metadata from config (no file fetching needed)
 */
async function loadPosts() {
    try {
        const configResponse = await fetch('config.yml');
        if (!configResponse.ok) {
            throw new Error(`Config not found: ${configResponse.status}`);
        }

        const configText = await configResponse.text();
        const config = jsyaml.load(configText);
        treeData = config.tree || [];

        // Posts now include metadata directly from config
        const postsConfig = config.posts || [];

        // Skip drafts unless explicitly showing them
        const urlParams = new URLSearchParams(window.location.search);
        const showDrafts = urlParams.has('showDrafts');

        allPostsData = postsConfig
            .filter(post => !post.draft || showDrafts)
            .map(post => {
                // Handle date as Date object or string
                let dateStr = post.date;
                if (post.date instanceof Date) {
                    const y = post.date.getUTCFullYear();
                    const m = String(post.date.getUTCMonth() + 1).padStart(2, '0');
                    const d = String(post.date.getUTCDate()).padStart(2, '0');
                    dateStr = `${y}-${m}-${d}`;
                } else {
                    dateStr = String(post.date);
                }

                return {
                    ...post,
                    date: dateStr,
                    folder: getPostFolder(post.file),
                    year: dateStr.split('-')[0],
                    formattedDate: formatDate(dateStr)
                };
            });

        // Render tree
        renderTree();

        // Initialize filters
        initializeFilters();

        // Display posts
        displayFilteredPosts();

    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('posts-container').innerHTML =
            '<p style="color: #888; font-style: italic;">Error loading blog posts. Run scripts/generate-config.sh to generate config.</p>';
    }
}

/**
 * Initialize filter system
 */
function initializeFilters() {
    filterManager = new FilterManager({
        urlPrefix: 'filter_',
        onFilterChange: () => displayFilteredPosts()
    });

    const fieldMap = { year: 'year', tags: 'tags', folder: 'folder' };
    const filterOptions = filterManager.extractFilterOptions(allPostsData, fieldMap);
    const filterLabels = { year: 'Year', tags: 'Tags', folder: 'Folder' };
    const filterBarHTML = filterManager.buildFilterBar(filterOptions, filterLabels);

    const filterContainer = document.getElementById('filter-container');
    filterContainer.innerHTML = filterBarHTML;
    filterManager.attachEventListeners();

    if (Object.keys(filterManager.getActiveFilters()).length > 0) {
        showFilters();
    }
}

/**
 * Show filter interface
 */
function showFilters() {
    const filterContainer = document.getElementById('filter-container');
    const toggleBtn = document.getElementById('filter-toggle-btn');

    if (filterContainer && toggleBtn) {
        filterContainer.classList.remove('hidden');
        toggleBtn.classList.add('active');
        toggleBtn.querySelector('.filter-toggle-text').textContent = 'Hide Filters';
    }
}

/**
 * Apply filters and display posts
 */
function displayFilteredPosts() {
    const fieldMap = { year: 'year', tags: 'tags', folder: 'folder' };
    const filteredPosts = filterManager.applyFilters(allPostsData, fieldMap);
    displayPosts(filteredPosts);
}

/**
 * Display posts in the DOM (using metadata only - no content fetched yet)
 */
function displayPosts(posts) {
    const container = document.getElementById('posts-container');

    if (!posts || posts.length === 0) {
        container.innerHTML = '<p style="color: #888; font-style: italic;">No posts found.</p>';
        return;
    }

    // Sort by date (newest first)
    posts.sort((a, b) => b.date.localeCompare(a.date));

    container.innerHTML = posts.map(post => {
        const postId = generatePostId(post);
        const permalink = `#${postId}`;
        const previewText = post.summary || post.preview || '';

        return `
        <article class="blog-post" id="${postId}" data-file="${escapeHtml(post.file)}">
            <div class="metadata">
                <div class="metadata-item">
                    <span class="metadata-label">Date</span>
                    <span class="metadata-value">${post.formattedDate}</span>
                </div>
                ${post.folder ? `
                <div class="metadata-item">
                    <span class="metadata-label">Folder</span>
                    <span class="metadata-value folder-path">${escapeHtml(post.folder)}</span>
                </div>
                ` : ''}
                ${post.tags && post.tags.length ? `
                <div class="metadata-item">
                    <span class="metadata-label">Tags</span>
                    <span class="metadata-value tags">${formatTags(post.tags)}</span>
                </div>
                ` : ''}
            </div>
            <div class="content">
                <div class="post-header">
                    <h2 class="post-title">${escapeHtml(post.title)}</h2>
                    <a href="${permalink}" class="permalink" aria-label="Permalink to this post" title="Link to this post">🔗</a>
                </div>
                ${previewText ? `
                <div class="post-preview"><p>${escapeHtml(previewText)}</p></div>
                ` : ''}
                <button class="toggle-content-btn" aria-expanded="false" aria-label="Expand post content">
                    <span class="toggle-icon">▼</span>
                    <span class="toggle-text">Read more</span>
                </button>
                <div class="post-content collapsed">
                    <div class="loading-indicator">Loading...</div>
                </div>
            </div>
        </article>
        `;
    }).join('');

    // Render LaTeX in previews
    document.querySelectorAll('.post-preview').forEach(el => renderMath(el));

    // Auto-scroll to post if hash is present
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.classList.add('highlighted');
                setTimeout(() => target.classList.remove('highlighted'), 2000);
            }
        }, 100);
    }

    attachContentToggleHandlers();
}

/**
 * Fetch and render full post content (lazy loading)
 */
async function loadPostContent(article) {
    const file = article.dataset.file;
    const contentDiv = article.querySelector('.post-content');

    // Check cache first
    if (contentCache[file]) {
        contentDiv.innerHTML = contentCache[file];
        renderMath(contentDiv);
        return;
    }

    try {
        const response = await fetch(file);
        const markdownText = await response.text();

        // Extract content (after frontmatter)
        const match = markdownText.match(/^---\s*\n[\s\S]*?\n---\s*\n([\s\S]*)$/);
        const content = match ? match[1] : markdownText;

        // Render markdown
        const html = processImages(marked.parse(content));

        // Cache and display
        contentCache[file] = html;
        contentDiv.innerHTML = html;
        renderMath(contentDiv);

    } catch (error) {
        console.error(`Error loading ${file}:`, error);
        contentDiv.innerHTML = '<p style="color: #cc0000;">Error loading content.</p>';
    }
}

/**
 * Attach event handlers to content toggle buttons
 */
function attachContentToggleHandlers() {
    document.querySelectorAll('.toggle-content-btn').forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();

            const button = this;
            const article = button.closest('article');
            if (!article) return;

            const content = article.querySelector('.post-content');
            if (!content) return;

            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                content.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
                button.querySelector('.toggle-text').textContent = 'Read more';
                button.querySelector('.toggle-icon').textContent = '▼';
            } else {
                // Load content if not already loaded
                if (content.querySelector('.loading-indicator')) {
                    await loadPostContent(article);
                }

                content.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
                button.querySelector('.toggle-text').textContent = 'Hide';
                button.querySelector('.toggle-icon').textContent = '▲';
            }
        });
    });
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
 * Format tags for display
 */
function formatTags(tags) {
    if (!tags) return '';
    const tagArray = Array.isArray(tags) ? tags : [tags];
    return tagArray.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
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
 * Filter toggle functionality
 */
function initializeFilterToggle() {
    const toggleBtn = document.getElementById('filter-toggle-btn');
    const filterContainer = document.getElementById('filter-container');

    if (toggleBtn && filterContainer) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = filterContainer.classList.contains('hidden');

            if (isHidden) {
                filterContainer.classList.remove('hidden');
                toggleBtn.classList.add('active');
                toggleBtn.querySelector('.filter-toggle-text').textContent = 'Hide Filters';
            } else {
                filterContainer.classList.add('hidden');
                toggleBtn.classList.remove('active');
                toggleBtn.querySelector('.filter-toggle-text').textContent = 'Show Filters';
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    initializeFilterToggle();
});
