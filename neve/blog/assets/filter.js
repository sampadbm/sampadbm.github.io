/**
 * Modular Filtering System
 * Provides reusable filtering functionality with URL parameter support
 */

class FilterManager {
    constructor(config = {}) {
        this.config = {
            urlPrefix: config.urlPrefix || 'filter_',
            onFilterChange: config.onFilterChange || (() => {}),
            ...config
        };

        this.filters = {};
        this.activeFilters = this.loadFiltersFromURL();
    }

    /**
     * Load filter values from URL parameters
     */
    loadFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const filters = {};

        for (const [key, value] of urlParams.entries()) {
            if (key.startsWith(this.config.urlPrefix)) {
                const filterName = key.replace(this.config.urlPrefix, '');
                // Support comma-separated values for multiple selections
                filters[filterName] = value.includes(',') ? value.split(',') : [value];
            }
        }

        return filters;
    }

    /**
     * Update URL with current filter state
     */
    updateURL() {
        const urlParams = new URLSearchParams(window.location.search);

        // Remove old filter parameters
        const keysToDelete = [];
        for (const key of urlParams.keys()) {
            if (key.startsWith(this.config.urlPrefix)) {
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach(key => urlParams.delete(key));

        // Add current filters
        Object.entries(this.activeFilters).forEach(([key, value]) => {
            if (value && Array.isArray(value) && value.length > 0) {
                // Convert array to comma-separated string
                urlParams.set(this.config.urlPrefix + key, value.join(','));
            }
        });

        // Update URL without page reload
        const newURL = urlParams.toString()
            ? `${window.location.pathname}?${urlParams.toString()}`
            : window.location.pathname;

        window.history.pushState({}, '', newURL);
    }

    /**
     * Extract unique filter options from data
     * @param {Array} data - Array of items to extract options from
     * @param {Object} fieldMap - Map of filter names to field paths
     * @returns {Object} - Object containing arrays of unique options for each filter
     */
    extractFilterOptions(data, fieldMap) {
        const options = {};

        Object.entries(fieldMap).forEach(([filterName, fieldPath]) => {
            const uniqueValues = new Set();

            data.forEach(item => {
                const value = this.getNestedValue(item, fieldPath);

                if (value !== null && value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(v => uniqueValues.add(v));
                    } else {
                        uniqueValues.add(value);
                    }
                }
            });

            options[filterName] = Array.from(uniqueValues).sort();
        });

        return options;
    }

    /**
     * Get nested value from object using dot notation
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) =>
            current?.[key], obj);
    }

    /**
     * Build filter checkbox group HTML
     * @param {string} filterName - Name of the filter
     * @param {Array} options - Array of option values
     * @param {string} label - Display label for the filter
     * @returns {string} - HTML string for the filter checkbox group
     */
    buildFilterCheckboxGroup(filterName, options, label) {
        const currentValues = this.activeFilters[filterName] || [];
        const limitDisplay = options.length > 5; // Show expand button if more than 5 options
        const visibleCount = 5;

        return `
            <div class="filter-group" data-filter-type="${filterName}">
                <div class="filter-header">
                    <span class="filter-label">${label}</span>
                    ${limitDisplay ? `<button type="button" class="filter-toggle" data-filter="${filterName}">▼</button>` : ''}
                </div>
                <div class="filter-options" data-filter-options="${filterName}">
                    ${options.map((opt, index) => {
                        const isChecked = currentValues.includes(String(opt));
                        const optId = `filter-${filterName}-${this.escapeHtml(opt).replace(/\s+/g, '-')}`;
                        const isHidden = limitDisplay && index >= visibleCount ? 'hidden' : '';
                        return `
                            <label class="filter-checkbox-label ${isHidden}" data-filter-item="${filterName}">
                                <input
                                    type="checkbox"
                                    class="filter-checkbox"
                                    data-filter="${filterName}"
                                    value="${this.escapeHtml(opt)}"
                                    id="${optId}"
                                    ${isChecked ? 'checked' : ''}
                                >
                                <span>${this.escapeHtml(opt)}</span>
                            </label>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Build complete filter bar HTML
     * @param {Object} filterOptions - Object with filter names as keys and option arrays as values
     * @param {Object} labels - Display labels for each filter
     * @returns {string} - Complete filter bar HTML
     */
    buildFilterBar(filterOptions, labels) {
        const checkboxGroups = Object.entries(filterOptions)
            .map(([filterName, options]) =>
                this.buildFilterCheckboxGroup(filterName, options, labels[filterName] || filterName)
            )
            .join('');

        return `
            <div class="filter-bar">
                ${checkboxGroups}
                <button id="clear-filters" class="filter-clear-btn">Clear All</button>
            </div>
        `;
    }

    /**
     * Attach event listeners to filter UI elements
     * @param {string} containerSelector - CSS selector for the filter container
     */
    attachEventListeners(containerSelector = '.filter-bar') {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Handle filter checkbox changes
        container.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const filterName = e.target.dataset.filter;
                const value = e.target.value;
                const isChecked = e.target.checked;

                if (!this.activeFilters[filterName]) {
                    this.activeFilters[filterName] = [];
                }

                if (isChecked) {
                    // Add value to filter array
                    if (!this.activeFilters[filterName].includes(value)) {
                        this.activeFilters[filterName].push(value);
                    }
                } else {
                    // Remove value from filter array
                    this.activeFilters[filterName] = this.activeFilters[filterName].filter(v => v !== value);

                    // Remove filter if empty
                    if (this.activeFilters[filterName].length === 0) {
                        delete this.activeFilters[filterName];
                    }
                }

                this.updateURL();
                this.config.onFilterChange(this.activeFilters);
            });
        });

        // Handle toggle buttons for collapsible groups
        container.querySelectorAll('.filter-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const filterName = e.target.dataset.filter;
                const hiddenItems = container.querySelectorAll(`[data-filter-item="${filterName}"].hidden`);
                const isExpanded = e.target.textContent === '▲';

                if (isExpanded) {
                    // Collapse: hide items again
                    hiddenItems.forEach(item => item.classList.add('hidden'));
                    e.target.textContent = '▼';
                } else {
                    // Expand: show all hidden items
                    hiddenItems.forEach(item => item.classList.remove('hidden'));
                    e.target.textContent = '▲';
                }
            });
        });

        // Handle clear button
        const clearButton = container.querySelector('#clear-filters');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.clearFilters();
                this.updateURL();
                this.config.onFilterChange(this.activeFilters);
            });
        }
    }

    /**
     * Apply filters to data array
     * @param {Array} data - Array of items to filter
     * @param {Object} fieldMap - Map of filter names to field paths
     * @returns {Array} - Filtered data array
     */
    applyFilters(data, fieldMap) {
        if (Object.keys(this.activeFilters).length === 0) {
            return data;
        }

        return data.filter(item => {
            // AND logic between different filters
            return Object.entries(this.activeFilters).every(([filterName, filterValues]) => {
                const fieldPath = fieldMap[filterName];
                if (!fieldPath) return true;

                const itemValue = this.getNestedValue(item, fieldPath);

                if (itemValue === null || itemValue === undefined) {
                    return false;
                }

                // OR logic within the same filter (match any of the selected values)
                return filterValues.some(filterValue => {
                    // Handle array values (like categories or tags)
                    if (Array.isArray(itemValue)) {
                        return itemValue.some(v => String(v) === filterValue);
                    }

                    return String(itemValue) === filterValue;
                });
            });
        });
    }

    /**
     * Clear all active filters
     */
    clearFilters() {
        this.activeFilters = {};

        // Uncheck all checkboxes
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    /**
     * Get current active filters
     */
    getActiveFilters() {
        return { ...this.activeFilters };
    }

    /**
     * Set filters programmatically
     */
    setFilters(filters) {
        this.activeFilters = { ...filters };
        this.updateURL();

        // Update UI checkboxes
        Object.entries(filters).forEach(([filterName, values]) => {
            const checkboxes = document.querySelectorAll(`[data-filter="${filterName}"]`);
            checkboxes.forEach(checkbox => {
                checkbox.checked = values.includes(checkbox.value);
            });
        });
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export for use in other modules
window.FilterManager = FilterManager;
