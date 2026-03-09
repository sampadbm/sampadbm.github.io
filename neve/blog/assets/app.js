/**
 * Blog listing page - displays all posts with filtering
 * Requires: utils.js, filter.js
 */

// Store all posts globally for filtering
let allPostsData = [];
let treeData = [];
let filterManager = null;

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
 * Generate a unique post ID from post data
 */
function generatePostId(post) {
    return post.date + '-' + (post.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
}

/**
 * Build simple HTML tree from tree structure
 */
function buildSimpleTree(nodes) {
    if (!nodes || nodes.length === 0) return '';

    return nodes.map(node => {
        if (node.post) {
            const post = allPostsData.find(p => p.file === node.post);
            const title = post?.title || node.post.split('/').pop().replace('.md', '');
            return `<li class="tree-item tree-post" data-file="${escapeHtml(node.post)}">${escapeHtml(title)}</li>`;
        } else if (node.name) {
            let children = [];
            if (node.children) children = children.concat(node.children);
            if (node.posts) children = children.concat(node.posts.map(p => ({ post: p })));
            const childrenHTML = buildSimpleTree(children);
            return `
                <li class="tree-item tree-folder">
                    <span class="tree-folder-toggle">+</span>
                    <span class="tree-folder-name">${escapeHtml(node.name)}</span>
                    <ul class="tree-children hidden">${childrenHTML}</ul>
                </li>
            `;
        }
        return '';
    }).join('');
}

/**
 * Render the folder tree as simple text
 */
function renderTree() {
    const container = document.getElementById('tree-container');
    if (!container || !treeData || treeData.length === 0) {
        if (container) container.innerHTML = '';
        return;
    }

    const treeHTML = buildSimpleTree(treeData);
    container.innerHTML = `<ul class="tree-root">${treeHTML}</ul>`;

    // Attach click handlers for folders
    container.querySelectorAll('.tree-folder-toggle, .tree-folder-name').forEach(el => {
        el.addEventListener('click', (e) => {
            const folder = e.target.closest('.tree-folder');
            const children = folder.querySelector('.tree-children');
            const toggle = folder.querySelector('.tree-folder-toggle');
            if (children.classList.contains('hidden')) {
                children.classList.remove('hidden');
                toggle.textContent = '−';
            } else {
                children.classList.add('hidden');
                toggle.textContent = '+';
            }
        });
    });

    // Attach click handlers for posts
    container.querySelectorAll('.tree-post').forEach(el => {
        el.addEventListener('click', () => {
            const file = el.dataset.file;
            if (file) {
                window.location.href = buildBlogUrl('post.html', file);
            }
        });
    });
}

/**
 * Load posts metadata from config (no file fetching needed)
 */
async function loadPosts() {
    try {
        const configResponse = await fetch('config.yml', { cache: 'no-cache' });
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
                const dateStr = normalizeDateFromYAML(post.date);
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

    const fieldMap = { year: 'year', tags: 'tags' };
    const filterOptions = filterManager.extractFilterOptions(allPostsData, fieldMap);
    const filterLabels = { year: 'Year', tags: 'Tags' };
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
    const fieldMap = { year: 'year', tags: 'tags' };
    const filteredPosts = filterManager.applyFilters(allPostsData, fieldMap);
    displayPosts(filteredPosts);
}

/**
 * Generate post URL for linking to individual post page
 */
function getPostUrl(post) {
    return buildBlogUrl('post.html', post.file);
}

/**
 * Display posts in the DOM (using metadata only)
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
        const postUrl = getPostUrl(post);
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
                <a href="${postUrl}" class="post-title-link">
                    <h2 class="post-title">${escapeHtml(post.title)}</h2>
                </a>
                ${previewText ? `
                <div class="post-preview"><p>${escapeHtml(previewText)}</p></div>
                ` : ''}
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

/**
 * Tree overlay toggle functionality
 */
function initializeTreeOverlay() {
    const overlay = document.getElementById('tree-overlay');
    const backdrop = overlay?.querySelector('.tree-overlay-backdrop');

    if (!overlay) return;

    function showOverlay() {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function hideOverlay() {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function toggleOverlay() {
        if (overlay.classList.contains('hidden')) {
            showOverlay();
        } else {
            hideOverlay();
        }
    }

    // Keyboard: 'f' to toggle, Escape to close
    document.addEventListener('keyup', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'f' || e.key === 'F') {
            toggleOverlay();
        } else if (e.key === 'Escape') {
            hideOverlay();
        }
    });

    // Click backdrop to close
    if (backdrop) {
        backdrop.addEventListener('click', hideOverlay);
    }

    // Close overlay when clicking a post link
    overlay.addEventListener('click', (e) => {
        if (e.target.closest('.tree-post')) {
            hideOverlay();
        }
    });

    // Click hint to open overlay
    const hint = document.getElementById('folder-hint');
    if (hint) {
        hint.addEventListener('click', showOverlay);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initStyleSwitcher(['theme']);
    loadPosts();
    initializeFilterToggle();
    initializeTreeOverlay();
});
