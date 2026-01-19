// Store all entries globally for filtering
let allEntriesData = [];
let filterManager = null;

/**
 * Parse markdown file with YAML frontmatter
 */
function parseMarkdownWithFrontmatter(markdownText) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdownText.match(frontmatterRegex);

    if (match) {
        const yamlText = match[1];
        const content = match[2];

        try {
            const frontmatter = jsyaml.load(yamlText);
            return { frontmatter, content };
        } catch (error) {
            console.error('Error parsing frontmatter:', error);
            return { frontmatter: {}, content: markdownText };
        }
    }

    return { frontmatter: {}, content: markdownText };
}

/**
 * Load diary entries from config
 */
async function loadEntries() {
    try {
        // Load config file
        const configResponse = await fetch('config.yml');
        if (!configResponse.ok) {
            throw new Error(`Config not found: ${configResponse.status}`);
        }

        const configText = await configResponse.text();
        const config = jsyaml.load(configText);
        const entryFiles = config.entries || [];

        // Fetch all entry files
        allEntriesData = [];
        for (const entryFile of entryFiles) {
            try {
                const response = await fetch(entryFile);
                const markdownText = await response.text();
                const { frontmatter, content } = parseMarkdownWithFrontmatter(markdownText);

                // Validate required fields
                if (!frontmatter.date) {
                    console.warn(`Entry ${entryFile} missing required 'date' field`);
                    continue;
                }

                // Skip drafts unless explicitly showing them
                const urlParams = new URLSearchParams(window.location.search);
                const showDrafts = urlParams.has('showDrafts');
                if (frontmatter.draft && !showDrafts) {
                    console.info(`Skipping draft: ${entryFile}`);
                    continue;
                }

                // Convert date to string if it's a Date object (YAML parser auto-converts)
                let dateString = frontmatter.date;
                if (frontmatter.date instanceof Date) {
                    // Use UTC methods to avoid timezone conversion
                    const year = frontmatter.date.getUTCFullYear();
                    const month = String(frontmatter.date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(frontmatter.date.getUTCDate()).padStart(2, '0');
                    dateString = `${year}-${month}-${day}`;
                } else {
                    dateString = String(frontmatter.date);
                }

                // Validate and parse date (YYYY-MM-DD)
                const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                if (!dateMatch) {
                    console.error(`Invalid date in ${entryFile}: ${frontmatter.date}`);
                    continue;
                }

                // Parse date manually to avoid timezone issues
                const [, yearStr, monthStr, dayStr] = dateMatch;
                const year = parseInt(yearStr, 10);
                const month = parseInt(monthStr, 10);
                const day = parseInt(dayStr, 10);
                const entryDate = new Date(year, month - 1, day); // month is 0-indexed

                if (isNaN(entryDate.getTime())) {
                    console.error(`Invalid date in ${entryFile}: ${frontmatter.date}`);
                    continue;
                }

                // Use normalized date string as ISO date
                const isoDate = dateString;

                // Augment with derived fields
                const entry = {
                    ...frontmatter,
                    date: isoDate,
                    content: content,
                    _file: entryFile,
                    year: entryDate.getFullYear().toString(),
                    month: entryDate.toLocaleDateString('en-US', { month: 'long' }),
                    dayOfWeek: entryDate.toLocaleDateString('en-US', { weekday: 'long' }),
                    formattedDate: formatDate(dateString),
                    // Default title to date if not provided
                    title: frontmatter.title || formatDate(dateString)
                };

                allEntriesData.push(entry);
            } catch (error) {
                console.error(`Error loading ${entryFile}:`, error);
            }
        }

        // Initialize filters
        initializeFilters();

        // Display statistics
        displayStatistics();

        // Display year statistics bar
        displayYearStatisticsBar();

        // Display entries (with filters applied if any)
        displayFilteredEntries();

    } catch (error) {
        console.error('Error loading diary entries:', error);
        document.getElementById('entries-container').innerHTML =
            '<p style="color: #888; font-style: italic;">Error loading diary entries. Run scripts/generate-config.sh to generate config.</p>';
    }
}

/**
 * Initialize filter system
 */
function initializeFilters() {
    filterManager = new FilterManager({
        urlPrefix: 'filter_',
        onFilterChange: () => {
            displayFilteredEntries();
        }
    });

    // Define field mapping for filters
    const fieldMap = {
        year: 'year',
        month: 'month',
        tags: 'tags',
        mood: 'mood'
    };

    // Extract filter options from data
    const filterOptions = filterManager.extractFilterOptions(allEntriesData, fieldMap);

    // Build filter bar HTML
    const filterLabels = {
        year: 'Year',
        month: 'Month',
        tags: 'Tags',
        mood: 'Mood'
    };

    const filterBarHTML = filterManager.buildFilterBar(filterOptions, filterLabels);

    // Inject filter bar into the page
    const filterContainer = document.getElementById('filter-container');
    filterContainer.innerHTML = filterBarHTML;

    // Attach event listeners
    filterManager.attachEventListeners();

    // If there are active filters from URL, show the filter bar
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
 * Generate and display statistics dashboard
 */
function displayStatistics() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer || allEntriesData.length === 0) return;

    // Calculate statistics
    const totalEntries = allEntriesData.length;

    // Count by year
    const entriesByYear = {};
    allEntriesData.forEach(entry => {
        entriesByYear[entry.year] = (entriesByYear[entry.year] || 0) + 1;
    });
    const currentYear = new Date().getFullYear().toString();
    const currentYearCount = entriesByYear[currentYear] || 0;

    // Count by month (current month)
    const now = new Date();
    const currentMonth = now.toLocaleDateString('en-US', { month: 'long' });
    const currentMonthYear = `${currentMonth} ${currentYear}`;
    const currentMonthCount = allEntriesData.filter(entry => {
        return entry.month === currentMonth && entry.year === currentYear;
    }).length;

    // Count by mood
    const moodCounts = {};
    allEntriesData.forEach(entry => {
        if (entry.mood) {
            const moods = Array.isArray(entry.mood) ? entry.mood : [entry.mood];
            moods.forEach(mood => {
                moodCounts[mood] = (moodCounts[mood] || 0) + 1;
            });
        }
    });

    // Count tags
    const tagCounts = {};
    allEntriesData.forEach(entry => {
        if (entry.tags) {
            const tags = Array.isArray(entry.tags) ? entry.tags : [entry.tags];
            tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });

    // Get top 5 tags
    const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag, count]) => `<span class="stat-tag">${escapeHtml(tag)} (${count})</span>`)
        .join('');

    // Get mood distribution
    const moodDistribution = Object.entries(moodCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([mood, count]) => `<span class="stat-mood mood-value ${mood.toLowerCase()}">${escapeHtml(mood)} (${count})</span>`)
        .join('');

    // Build statistics HTML
    const statsHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${totalEntries}</div>
                <div class="stat-label">Total Entries</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${currentYearCount}</div>
                <div class="stat-label">This Year (${currentYear})</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${currentMonthCount}</div>
                <div class="stat-label">This Month (${currentMonth})</div>
            </div>
            ${topTags ? `
            <div class="stat-card stat-card-wide">
                <div class="stat-label">Top Tags</div>
                <div class="stat-tags">${topTags}</div>
            </div>
            ` : ''}
            ${moodDistribution ? `
            <div class="stat-card stat-card-wide">
                <div class="stat-label">Mood Distribution</div>
                <div class="stat-moods">${moodDistribution}</div>
            </div>
            ` : ''}
        </div>
    `;

    statsContainer.innerHTML = statsHTML;
    statsContainer.classList.remove('hidden');
}

/**
 * Display year statistics bar
 */
function displayYearStatisticsBar() {
    const barContainer = document.getElementById('year-stats-bar');
    if (!barContainer || allEntriesData.length === 0) return;

    // Get all years with entries
    const years = [...new Set(allEntriesData.map(e => e.year))].sort();
    const currentYear = new Date().getFullYear().toString();
    const selectedYear = years.includes(currentYear) ? currentYear : years[years.length - 1];

    // Count entries by month for selected year
    const monthCounts = Array(12).fill(0);
    const monthMoods = Array(12).fill(null).map(() => []);

    allEntriesData.forEach(entry => {
        if (entry.year === selectedYear) {
            // Parse date manually to avoid timezone issues
            const [year, month, day] = entry.date.split('-').map(num => parseInt(num, 10));
            const monthIndex = month - 1; // month is 0-indexed
            monthCounts[monthIndex]++;
            if (entry.mood) {
                const moods = Array.isArray(entry.mood) ? entry.mood : [entry.mood];
                moods.forEach(mood => monthMoods[monthIndex].push(mood));
            }
        }
    });

    const totalEntries = monthCounts.reduce((sum, count) => sum + count, 0);
    const monthInitials = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    // Get dominant mood for each month
    const monthDominantMoods = monthMoods.map(moods => {
        if (moods.length === 0) return null;
        const moodCounts = {};
        moods.forEach(mood => {
            moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        });
        return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];
    });

    // Build counts display
    const countsHTML = monthCounts.map((count, idx) => {
        const displayCount = count > 0 ? count : '';
        return `<span class="month-count" data-month="${idx}">${displayCount}</span>`;
    }).join('');

    // Build month initials
    const initialsHTML = monthInitials.map((initial, idx) => {
        return `<span class="month-initial" data-month="${idx}">${initial}</span>`;
    }).join('');

    // Build year navigation
    const currentYearIndex = years.indexOf(selectedYear);
    const prevYear = currentYearIndex > 0 ? years[currentYearIndex - 1] : null;
    const nextYear = currentYearIndex < years.length - 1 ? years[currentYearIndex + 1] : null;

    const prevButton = prevYear ? `<button class="year-nav" data-year="${prevYear}">◄ ${prevYear}</button>` : '<span class="year-nav-disabled">◄</span>';
    const nextButton = nextYear ? `<button class="year-nav" data-year="${nextYear}">${nextYear} ►</button>` : '<span class="year-nav-disabled">►</span>';

    barContainer.innerHTML = `
        <div class="year-bar-content">
            <div class="year-bar-left">
                <span class="year-label">${selectedYear}:</span>
                <span class="year-total">(${totalEntries} total)</span>
            </div>
            <div class="year-bar-right">
                ${prevButton}
                <span class="current-year">${selectedYear}</span>
                ${nextButton}
            </div>
        </div>
        <div class="year-month-grid">
            <div class="year-bar-months">${initialsHTML}</div>
            <div class="year-counts">${countsHTML}</div>
        </div>
    `;

    barContainer.classList.remove('hidden');

    // Attach click handlers
    attachYearBarHandlers();
}

/**
 * Attach event handlers to year bar elements
 */
function attachYearBarHandlers() {
    const barContainer = document.getElementById('year-stats-bar');
    if (!barContainer) return;

    // Month click to filter
    barContainer.querySelectorAll('.month-count, .month-initial').forEach(el => {
        el.addEventListener('click', (e) => {
            const monthIndex = parseInt(e.target.dataset.month);
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];
            const monthName = monthNames[monthIndex];

            // Set filter to this month
            if (filterManager) {
                filterManager.setFilters({ month: [monthName] });
                filterManager.updateURL();
                displayFilteredEntries();

                // Show filters if hidden
                showFilters();
            }
        });
    });

    // Year navigation
    barContainer.querySelectorAll('.year-nav').forEach(button => {
        button.addEventListener('click', (e) => {
            // For now, just log - full year switching would require reloading with different data
            console.log('Year navigation clicked:', e.target.dataset.year);
            // TODO: Implement year switching
        });
    });
}

/**
 * Apply filters and display entries
 */
function displayFilteredEntries() {
    const fieldMap = {
        year: 'year',
        month: 'month',
        tags: 'tags',
        mood: 'mood'
    };

    const filteredEntries = filterManager.applyFilters(allEntriesData, fieldMap);
    displayEntries(filteredEntries);
}

/**
 * Extract first paragraph from markdown content
 */
function extractFirstParagraph(markdownContent) {
    // Remove frontmatter if present
    const contentOnly = markdownContent.replace(/^---[\s\S]*?---\s*/m, '').trim();

    // Split by double newlines to get paragraphs
    const paragraphs = contentOnly.split(/\n\n+/);

    // Find first non-heading, non-empty paragraph
    for (const para of paragraphs) {
        const trimmed = para.trim();
        // Skip headings, empty lines, and lists
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*')) {
            return trimmed;
        }
    }

    return '';
}

/**
 * Get content after first paragraph
 */
function getContentAfterFirstParagraph(markdownContent) {
    // Remove frontmatter if present
    const contentOnly = markdownContent.replace(/^---[\s\S]*?---\s*/m, '').trim();

    // Find first paragraph
    const firstPara = extractFirstParagraph(contentOnly);
    if (!firstPara) return contentOnly;

    // Return everything after the first paragraph
    const index = contentOnly.indexOf(firstPara);
    if (index === -1) return contentOnly;

    return contentOnly.substring(index + firstPara.length).trim();
}

/**
 * Display entries in the DOM
 */
function displayEntries(entries) {
    const container = document.getElementById('entries-container');

    if (!entries || entries.length === 0) {
        container.innerHTML = '<p style="color: #888; font-style: italic;">No entries yet.</p>';
        return;
    }

    // Sort by date (newest first) - ISO date strings can be compared directly
    entries.sort((a, b) => {
        return b.date.localeCompare(a.date);
    });

    container.innerHTML = entries.map(entry => {
        const entryId = entry.date;
        const permalink = `#${entryId}`;
        const readingTime = calculateReadingTime(entry.content);

        // Determine what to show as preview and what to collapse
        const hasSummary = !!entry.summary;
        let previewContent = '';
        let collapsibleContent = '';

        if (hasSummary) {
            // Show summary, collapse all content
            collapsibleContent = entry.content;
        } else {
            // Show first paragraph, collapse rest
            const firstPara = extractFirstParagraph(entry.content);
            const restContent = getContentAfterFirstParagraph(entry.content);
            previewContent = firstPara;
            collapsibleContent = restContent;
        }

        return `
        <article class="reading-entry" id="${entryId}">
            <div class="metadata">
                <div class="metadata-item">
                    <span class="metadata-label">Date</span>
                    <span class="metadata-value">${entry.formattedDate} <span class="date-separator">|</span> ${entry.dayOfWeek}${entry.time ? ` <span class="date-separator">|</span> ${escapeHtml(entry.time)}` : ''}${entry.timezone ? ` ${escapeHtml(entry.timezone)}` : ''}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Reading time</span>
                    <span class="metadata-value">${readingTime} min read</span>
                </div>
                ${entry.tags ? `
                <div class="metadata-item">
                    <span class="metadata-label">Tags</span>
                    <span class="metadata-value tags">${formatTags(entry.tags)}</span>
                </div>
                ` : ''}
                ${entry.mood ? `
                <div class="metadata-item mood">
                    <span class="metadata-label">Mood</span>
                    <span class="metadata-value moods">${formatMoods(entry.mood)}</span>
                </div>
                ` : ''}
                ${entry.location ? `
                <div class="metadata-item">
                    <span class="metadata-label">Location</span>
                    <span class="metadata-value">${escapeHtml(entry.location)}</span>
                </div>
                ` : ''}
                ${entry.weather ? `
                <div class="metadata-item">
                    <span class="metadata-label">Weather</span>
                    <span class="metadata-value">${escapeHtml(entry.weather)}</span>
                </div>
                ` : ''}
                ${entry.images ? `
                <div class="metadata-item metadata-images">
                    <span class="metadata-label">Images</span>
                    <div class="metadata-image-grid">
                        ${formatImages(entry.images)}
                    </div>
                </div>
                ` : ''}
            </div>
            <div class="content">
                <div class="entry-header">
                    ${entry.title !== entry.formattedDate ? `
                    <h2 class="entry-title">${escapeHtml(entry.title)}</h2>
                    ` : ''}
                    <a href="${permalink}" class="permalink" aria-label="Permalink to this entry" title="Link to this entry">🔗</a>
                </div>
                ${hasSummary ? `
                <div class="entry-summary">
                    <span class="summary-label">Summary</span>
                    <div class="summary-content">${marked.parse(entry.summary)}</div>
                </div>
                ` : ''}
                ${!hasSummary && previewContent ? `
                <div class="entry-preview">${marked.parse(previewContent)}</div>
                ` : ''}
                ${collapsibleContent ? `
                <button class="toggle-content-btn" aria-expanded="false" aria-label="Expand entry content">
                    <span class="toggle-icon">▼</span>
                    <span class="toggle-text">Read more</span>
                </button>
                <div class="entry-content collapsed">${processImages(marked.parse(collapsibleContent))}</div>
                ` : ''}
            </div>
        </article>
        `;
    }).join('');

    // Auto-scroll to entry if hash is present
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

    // Attach toggle functionality to all content toggle buttons
    attachContentToggleHandlers();
}

/**
 * Attach event handlers to content toggle buttons
 */
function attachContentToggleHandlers() {
    document.querySelectorAll('.toggle-content-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const article = e.target.closest('article');
            const content = article.querySelector('.entry-content');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Collapse
                content.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
                button.querySelector('.toggle-text').textContent = 'Read more';
            } else {
                // Expand
                content.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
                button.querySelector('.toggle-text').textContent = 'Hide';
            }
        });
    });
}

/**
 * Process images to add figure/figcaption wrappers
 * Supports: ![caption](url), ![left: caption](url), ![right: caption](url)
 */
function processImages(html) {
    return html.replace(/<img([^>]*)alt="([^"]*)"([^>]*)>/gi, (match, before, altText, after) => {
        // Check for left/right positioning
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
 * Format moods for display
 */
function formatMoods(moods) {
    if (!moods) return '';
    const moodArray = Array.isArray(moods) ? moods : [moods];
    return moodArray.map(mood => {
        const moodClass = mood.toLowerCase().replace(/\s+/g, '-');
        return `<span class="mood-value ${moodClass}">${escapeHtml(mood)}</span>`;
    }).join('');
}

/**
 * Format images for metadata display
 */
function formatImages(images) {
    if (!images) return '';
    const imageArray = Array.isArray(images) ? images : [images];
    return imageArray.map(img => {
        const imgPath = escapeHtml(img);
        return `<a href="${imgPath}" target="_blank" class="metadata-image-link">
            <img src="${imgPath}" alt="Entry image" class="metadata-image-thumbnail" loading="lazy">
        </a>`;
    }).join('');
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    // Parse YYYY-MM-DD manually to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
function calculateReadingTime(content) {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
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
    loadEntries();
    initializeFilterToggle();
});
