/**
 * Universal Modal Filtering System
 * 
 * Injects a modal UI automatically and provides filtering tools based on URL parameters.
 */

class ModalFilterManager {
    constructor(config = {}) {
        this.config = {
            urlPrefix: config.urlPrefix || 'filter_',
            onFilterChange: config.onFilterChange || (() => {}),
            title: config.title || 'Filters',
            ...config
        };

        this.filters = {};
        this.activeFilters = this.loadFiltersFromURL();
        
        this.injectModalUI();
        this.modal = document.getElementById('universal-modal-filter');
    }

    loadFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const filters = {};

        for (const [key, value] of urlParams.entries()) {
            if (key.startsWith(this.config.urlPrefix)) {
                const filterName = key.replace(this.config.urlPrefix, '');
                filters[filterName] = value.includes(',') ? value.split(',') : [value];
            }
        }
        return filters;
    }

    updateURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const keysToDelete = [];
        
        for (const key of urlParams.keys()) {
            if (key.startsWith(this.config.urlPrefix)) {
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach(key => urlParams.delete(key));

        Object.entries(this.activeFilters).forEach(([key, value]) => {
            if (value && Array.isArray(value) && value.length > 0) {
                urlParams.set(this.config.urlPrefix + key, value.join(','));
            }
        });

        const newURL = urlParams.toString()
            ? `${window.location.pathname}?${urlParams.toString()}`
            : window.location.pathname;

        window.history.pushState({}, '', newURL);
    }

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

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    injectModalUI() {
        if (document.getElementById('universal-modal-filter')) return;

        const overlay = document.createElement('div');
        overlay.id = 'universal-modal-filter';
        overlay.className = 'modal-filter-overlay';
        
        overlay.innerHTML = `
            <div class="modal-filter-content" role="dialog" aria-modal="true" aria-labelledby="modal-filter-title">
                <div class="modal-filter-header">
                    <h2 id="modal-filter-title" class="modal-filter-title">${this.config.title}</h2>
                    <button class="modal-filter-close" aria-label="Close filters">&times;</button>
                </div>
                <div class="modal-filter-body" id="modal-filter-body-container">
                    <!-- Filters injected here -->
                </div>
                <div class="modal-filter-footer">
                    <button id="modal-filter-clear" class="modal-filter-clear-btn">Clear All Filters</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector('.modal-filter-close').addEventListener('click', () => this.close());
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ignore if typing in an input/textarea
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
                return;
            }

            const isOpen = this.modal && this.modal.classList.contains('active');

            // Escape to close
            if (e.key === 'Escape' && isOpen) {
                this.close();
                return;
            }

            // 'f', '/', or 'Ctrl+K' / 'Cmd+K' to open
            if (!isOpen) {
                if ((e.key === 'f' || e.key === '/') && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.open();
                } else if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    this.open();
                }
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    buildFilterCheckboxGroup(filterName, options, label) {
        const currentValues = this.activeFilters[filterName] || [];
        const limitDisplay = options.length > 5;

        return `
            <div class="modal-filter-group" data-filter-type="${filterName}">
                <div class="modal-filter-group-header">
                    <span class="modal-filter-label">${label}</span>
                    ${limitDisplay ? `<button type="button" class="modal-filter-toggle-btn" data-filter="${filterName}">▼</button>` : ''}
                </div>
                <div class="modal-filter-options ${limitDisplay ? 'collapsed' : ''}" data-filter-options="${filterName}">
                    ${options.map(opt => {
                        const isChecked = currentValues.includes(String(opt));
                        const optId = `filter-${filterName}-${this.escapeHtml(opt).replace(/\\s+/g, '-')}`;
                        return `
                            <label class="modal-filter-checkbox-label">
                                <input
                                    type="checkbox"
                                    class="modal-filter-checkbox"
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

    buildFilterBar(filterOptions, labels) {
        const checkboxGroups = Object.entries(filterOptions)
            .map(([filterName, options]) =>
                this.buildFilterCheckboxGroup(filterName, options, labels[filterName] || filterName)
            )
            .join('');

        const container = document.getElementById('modal-filter-body-container');
        if (container) {
            container.innerHTML = `<div class="modal-filter-bar">${checkboxGroups}</div>`;
        }
        
        return container ? container.innerHTML : '';
    }

    attachEventListeners() {
        const container = this.modal;
        if (!container) return;

        container.addEventListener('change', (e) => {
            if (e.target.classList.contains('modal-filter-checkbox')) {
                const filterName = e.target.dataset.filter;
                const value = e.target.value;
                const isChecked = e.target.checked;

                if (!this.activeFilters[filterName]) {
                    this.activeFilters[filterName] = [];
                }

                if (isChecked) {
                    if (!this.activeFilters[filterName].includes(value)) {
                        this.activeFilters[filterName].push(value);
                    }
                } else {
                    this.activeFilters[filterName] = this.activeFilters[filterName].filter(v => v !== value);
                    if (this.activeFilters[filterName].length === 0) {
                        delete this.activeFilters[filterName];
                    }
                }

                this.updateURL();
                this.config.onFilterChange(this.activeFilters);
            }
        });

        container.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.modal-filter-toggle-btn');
            if (toggleBtn) {
                const filterName = toggleBtn.dataset.filter;
                const optionsContainer = container.querySelector(`[data-filter-options="${filterName}"]`);
                if (optionsContainer) {
                    optionsContainer.classList.toggle('collapsed');
                    toggleBtn.textContent = optionsContainer.classList.contains('collapsed') ? '▼' : '▲';
                }
            }
            
            const clearBtn = e.target.closest('#modal-filter-clear');
            if (clearBtn) {
                this.clearFilters();
                this.updateURL();
                this.config.onFilterChange(this.activeFilters);
            }
        });
    }

    applyFilters(data, fieldMap) {
        if (Object.keys(this.activeFilters).length === 0) {
            return data;
        }

        return data.filter(item => {
            return Object.entries(this.activeFilters).every(([filterName, filterValues]) => {
                const fieldPath = fieldMap[filterName];
                if (!fieldPath) return true;

                const itemValue = this.getNestedValue(item, fieldPath);
                if (itemValue === null || itemValue === undefined) {
                    return false;
                }

                return filterValues.some(filterValue => {
                    if (Array.isArray(itemValue)) {
                        return itemValue.some(v => String(v) === filterValue);
                    }
                    return String(itemValue) === filterValue;
                });
            });
        });
    }

    clearFilters() {
        this.activeFilters = {};
        this.modal.querySelectorAll('.modal-filter-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    getActiveFilters() {
        return { ...this.activeFilters };
    }

    setFilters(filters) {
        this.activeFilters = { ...filters };
        this.updateURL();
        
        Object.entries(filters).forEach(([filterName, values]) => {
            const checkboxes = this.modal.querySelectorAll(`[data-filter="${filterName}"]`);
            checkboxes.forEach(checkbox => {
                checkbox.checked = values.includes(checkbox.value);
            });
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

window.ModalFilterManager = ModalFilterManager;
