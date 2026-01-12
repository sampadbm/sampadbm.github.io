// Store readings globally for filtering
let allReadingsData = [];
let filterManager = null;

async function loadReadings() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let dbFiles;

        if (urlParams.has('db')) {
            // Use explicitly provided databases
            const dbParam = urlParams.get('db');
            dbFiles = dbParam.split(',').map(f => f.trim());
        } else {
            // Load databases from config file
            try {
                const configResponse = await fetch('config.yml');
                const configText = await configResponse.text();
                const config = jsyaml.load(configText);
                dbFiles = config.databases || ['db/articles.yml'];
            } catch (error) {
                console.error('Error loading config, using default:', error);
                dbFiles = ['db/articles.yml'];
            }
        }

        // Fetch all databases
        allReadingsData = [];
        for (const dbFile of dbFiles) {
            try {
                const response = await fetch(dbFile);
                const yamlText = await response.text();
                const data = jsyaml.load(yamlText);

                // Extract just the filename from the path
                const dbName = dbFile.split('/').pop().replace('.yml', '');

                // Add source database to each reading
                if (data.readings) {
                    data.readings.forEach(reading => {
                        reading._source = dbName;
                    });
                    allReadingsData.push(...data.readings);
                }
            } catch (error) {
                console.error(`Error loading ${dbFile}:`, error);
            }
        }

        // Initialize filters
        initializeFilters();

        // Display readings (with filters applied if any)
        displayFilteredReadings();
    } catch (error) {
        console.error('Error loading readings:', error);
        document.getElementById('readings-container').innerHTML =
            '<p style="color: #888; font-style: italic;">Error loading reading journal entries.</p>';
    }
}

function initializeFilters() {
    // Initialize filter manager
    filterManager = new FilterManager({
        urlPrefix: 'filter_',
        onFilterChange: () => {
            displayFilteredReadings();
        }
    });

    // Define field mapping for filters
    const fieldMap = {
        db: '_source',
        year: 'year',
        category: 'category',
        tags: 'tags'
    };

    // Extract filter options from data
    const filterOptions = filterManager.extractFilterOptions(allReadingsData, fieldMap);

    // Build filter bar HTML
    const filterLabels = {
        db: 'Database',
        year: 'Year',
        category: 'Category',
        tags: 'Tags'
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

function showFilters() {
    const filterContainer = document.getElementById('filter-container');
    const toggleBtn = document.getElementById('filter-toggle-btn');

    if (filterContainer && toggleBtn) {
        filterContainer.classList.remove('hidden');
        toggleBtn.classList.add('active');
        toggleBtn.querySelector('.filter-toggle-text').textContent = 'Hide Filters';
    }
}

function displayFilteredReadings() {
    // Define field mapping for filters
    const fieldMap = {
        db: '_source',
        year: 'year',
        category: 'category',
        tags: 'tags'
    };

    // Apply filters
    const filteredReadings = filterManager.applyFilters(allReadingsData, fieldMap);

    // Display filtered readings
    displayReadings(filteredReadings);
}

function displayReadings(readings) {
    const container = document.getElementById('readings-container');

    if (!readings || readings.length === 0) {
        container.innerHTML = '<p style="color: #888; font-style: italic;">No entries yet.</p>';
        return;
    }

    // Sort by date (newest first)
    readings.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });

    container.innerHTML = readings.map(reading => `
        <article class="reading-entry">
            <div class="metadata">
                <div class="metadata-item">
                    <span class="metadata-label">Date</span>
                    <span class="metadata-value">${formatDate(reading.date)}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">${Array.isArray(reading.category) ? 'Categories' : 'Category'}</span>
                    <span class="metadata-value">${formatCategory(reading.category)}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Author</span>
                    <span class="metadata-value">${reading.author}</span>
                </div>
                ${reading.year ? `<div class="metadata-item"><span class="metadata-label">Year</span><span class="metadata-value">${reading.year}</span></div>` : ''}
                ${reading.tags ? `<div class="metadata-item"><span class="metadata-label">Tags</span><span class="metadata-value tags">${formatTags(reading.tags)}</span></div>` : ''}
                ${reading._source ? `<div class="metadata-item"><span class="metadata-label">DB</span><span class="metadata-value">${reading._source}</span></div>` : ''}
            </div>
            <div class="content">
                <h2 class="reading-title">
                    <a href="${reading.url}" target="_blank" rel="noopener noreferrer">${reading.title}</a>
                </h2>
                ${reading.notes ? `<div class="reading-notes">${processImages(marked.parse(reading.notes))}</div>` : ''}
            </div>
        </article>
    `).join('');
}

function processImages(html) {
    // Mark images that will be processed to avoid double-wrapping
    const processed = new Set();

    // Process ALL images with alt text in one pass
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

function formatCategory(category) {
    if (Array.isArray(category)) {
        return category.join(', ');
    }
    return category;
}

function formatTags(tags) {
    if (!tags) return '';
    const tagArray = Array.isArray(tags) ? tags : [tags];
    return tagArray.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Filter toggle functionality
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

document.addEventListener('DOMContentLoaded', () => {
    loadReadings();
    initializeFilterToggle();
});
