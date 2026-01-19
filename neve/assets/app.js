(function () {
    const sidebarEl = document.getElementById("sidebar");
    const contentEl = document.getElementById("content");

    if (window.marked) {
        const renderer = new window.marked.Renderer();
        const originalImage = renderer.image.bind(renderer);
        renderer.image = function(href, title, text) {
            const html = originalImage(href, title, text);
            return html.replace('<img', '<img loading="lazy"');
        };
        window.marked.setOptions({
            breaks: true,
            renderer: renderer
        });
    }

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text || "";
        return div.innerHTML;
    }

    function formatNewsDate(dateValue) {
        if (!dateValue) return "";
        if (dateValue instanceof Date && !Number.isNaN(dateValue.valueOf())) {
            return dateValue.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });
        }
        if (typeof dateValue !== "string") return escapeHtml(String(dateValue));

        const isoDayMatch = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        const isoMonthMatch = dateValue.match(/^(\d{4})-(\d{2})$/);
        const match = isoDayMatch || isoMonthMatch;
        if (match) {
            const year = Number(match[1]);
            const monthIndex = Number(match[2]) - 1;
            const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            const month = monthNames[monthIndex];
            if (month) return `${month} ${year}`;
        }

        return escapeHtml(dateValue);
    }

    function getLinkIcon(iconName, label) {
        // Icon library - centralized icon definitions
        const icons = {
            email:
                '<path d="M2 5.75C2 4.78 2.78 4 3.75 4h16.5C21.22 4 22 4.78 22 5.75v12.5c0 .97-.78 1.75-1.75 1.75H3.75C2.78 20 2 19.22 2 18.25V5.75zm1.75-.25 7.94 5.1a1.25 1.25 0 0 0 1.62 0l7.94-5.1H3.75z"></path>',
            github:
                '<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.11.8-.25.8-.57v-2.02c-3.28.71-3.97-1.4-3.97-1.4-.54-1.36-1.32-1.72-1.32-1.72-1.07-.74.08-.72.08-.72 1.19.08 1.81 1.22 1.81 1.22 1.05 1.8 2.75 1.28 3.42.98.11-.77.41-1.28.74-1.58-2.62-.3-5.37-1.31-5.37-5.82 0-1.28.46-2.32 1.22-3.14-.12-.3-.53-1.5.12-3.14 0 0 .99-.32 3.24 1.2a11.2 11.2 0 0 1 5.9 0c2.25-1.52 3.24-1.2 3.24-1.2.65 1.64.24 2.84.12 3.14.76.82 1.22 1.86 1.22 3.14 0 4.52-2.76 5.52-5.4 5.82.42.36.8 1.08.8 2.19v3.24c0 .32.22.69.8.57A11.5 11.5 0 0 0 12 .5z"></path>',
            linkedin:
                '<path d="M20.45 20.45h-3.54v-5.53c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93v5.62H9.41V9h3.39v1.56h.05c.47-.88 1.62-1.8 3.34-1.8 3.57 0 4.23 2.35 4.23 5.4v6.29zM5.34 7.43a2.05 2.05 0 1 1 0-4.1 2.05 2.05 0 0 1 0 4.1zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"></path>',
            scholar:
                '<path d="M12 3 1 7l11 4 9-3.27V17h2V7L12 3zm-7 7.3V15c0 2.2 3.13 4 7 4s7-1.8 7-4v-4.7l-7 2.56-7-2.56z"></path>',
            website:
                '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.93 9h-3.19a15.7 15.7 0 0 0-1.22-5.04A8.02 8.02 0 0 1 19.93 11zM12 4a13.8 13.8 0 0 1 2.08 6H9.92A13.8 13.8 0 0 1 12 4zm-3.52 1.96A15.7 15.7 0 0 0 7.26 11H4.07a8.02 8.02 0 0 1 4.41-5.04zM4.07 13h3.19a15.7 15.7 0 0 0 1.22 5.04A8.02 8.02 0 0 1 4.07 13zm7.93 7a13.8 13.8 0 0 1-2.08-6h4.16A13.8 13.8 0 0 1 12 20zm3.52-1.96A15.7 15.7 0 0 0 16.74 13h3.19a8.02 8.02 0 0 1-4.41 5.04z"></path>',
            cv:
                '<path d="M6 2h8l4 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V7h3.5L13 3.5zM7 11h10v1.5H7V11zm0 4h10v1.5H7V15zm0 4h6v1.5H7V19z"></path>',
            pdf:
                '<path d="M6 2h8l4 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V7h3.5L13 3.5zM8 11h8v1.5H8V11zm0 3.5h8V16H8v-1.5zm0 3.5h5v1.5H8V18z"></path>',
            code:
                '<path d="m8.7 16.7-1.4 1.4L2.2 13l5.1-5.1 1.4 1.4L5 13l3.7 3.7zm6.6 0L19 13l-3.7-3.7 1.4-1.4L21.8 13l-5.1 5.1-1.4-1.4z"></path>',
            slides:
                '<path d="M4 4h16v2H4V4zm2 4h12v10H6V8zm-2 12h16v2H4v-2z"></path>',
            demo:
                '<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H13l2 3H9l2-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm7 4 5 3-5 3V8z"></path>',
            paper:
                '<path d="M6 2h8l4 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V7h3.5L13 3.5zM8 11h8v1.5H8V11zm0 3.5h8V16H8v-1.5zm0 3.5h5v1.5H8V18z"></path>',
            journal:
                '<path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm1 2v16h10V4H7zm2 3h6v1.5H9V7zm0 3h6v1.5H9v-1.5zm0 3h4v1.5H9V13z"></path>',
            // Default fallback icon for unknown links
            link:
                '<path d="M10.5 17a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 10.5 6H14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-3.5zm-3-5a1.5 1.5 0 0 0 1.5 1.5h8A1.5 1.5 0 0 0 18.5 12v-1.5A1.5 1.5 0 0 0 17 9H9a1.5 1.5 0 0 0-1.5 1.5V12z"></path>',
        };

        // Priority: explicit iconName > label-based lookup > default
        let path;
        if (iconName && icons[iconName.toLowerCase()]) {
            path = icons[iconName.toLowerCase()];
        } else if (label && icons[label.toLowerCase()]) {
            path = icons[label.toLowerCase()];
        } else {
            path = icons.link; // Default fallback
        }

        if (!path) return "";
        return `
            <span class="link-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" focusable="false">
                    ${path}
                </svg>
            </span>
        `;
    }

    function renderLinks(links) {
        if (!links || !links.length) return "";
        return links
            .map((link) => {
                const label = escapeHtml(link.label);
                const url = escapeHtml(link.url);
                const icon = getLinkIcon(link.icon, link.label);
                const external = url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';
                return `<a href="${url}" ${external}>${icon}${label}</a>`;
            })
            .join("");
    }

    function renderIconLinks(links) {
        if (!links || !links.length) return "";
        return links
            .map((link) => {
                const label = escapeHtml(link.label);
                const url = escapeHtml(link.url);
                const icon = getLinkIcon(link.icon, link.label);
                const iconMarkup = icon || `<span class="link-icon">${label[0] || "•"}</span>`;
                const external = url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';
                return `<a href="${url}" ${external} aria-label="${label}">${iconMarkup}</a>`;
            })
            .join("");
    }

    function renderList(items) {
        if (!items || !items.length) return "";
        const listItems = items
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("");
        return `<ul class="list">${listItems}</ul>`;
    }

    function renderEducation(items) {
        if (!items || !items.length) return "";
        const listItems = items
            .map((item) => {
                const label = escapeHtml(item.label || "");
                const detail = escapeHtml(item.detail || "");
                return `<li><strong>${label}</strong><div class="small">${detail}</div></li>`;
            })
            .join("");
        return `<ul class="list">${listItems}</ul>`;
    }

    function renderNews(items) {
        if (!items || !items.length) return "";
        const listItems = items
            .map((item) => {
                const date = formatNewsDate(item.date);
                const text = escapeHtml(item.text || "");
                const datePrefix = date ? `<span class="news-date">${date}</span>` : "";
                return `<li>${datePrefix}<span class="news-sep">—</span><span class="news-text">${text}</span></li>`;
            })
            .join("");
        return `<ul class="list">${listItems}</ul>`;
    }

    function renderSelectedResearch(items) {
        if (!items || !items.length) return "";
        return items
            .map((item) => {
                const title = escapeHtml(item.title || "");
                const year = escapeHtml(item.year || "");
                const description = item.description || "";
                const descriptionHtml = window.marked
                    ? window.marked.parse(description, { breaks: true })
                    : `<p>${escapeHtml(description).replace(/\n/g, "<br>")}</p>`;
                const links = renderIconLinks(item.links || []);
                const titleLine = year
                    ? `${title} &nbsp;|&nbsp; <span class="research-year">${year}</span>`
                    : title;
                return `
                    <div class="research-item">
                        <div class="research-title-row">
                            <div class="research-title">${titleLine}</div>
                            <div class="research-links">${links}</div>
                        </div>
                        <div class="research-description">${descriptionHtml}</div>
                    </div>
                `;
            })
            .join("");
    }

    function renderUpdates(items) {
        if (!items || !items.length) return "";
        const listItems = items
            .map((item) => {
                const date = formatNewsDate(item.date);
                const text = item.text
                    ? escapeHtml(item.text)
                    : [item.title, item.description].filter(Boolean).map(escapeHtml).join(" - ");
                const datePrefix = date ? `<span class="small">${date}</span> ` : "";
                return `<li>${datePrefix}${text}</li>`;
            })
            .join("");
        return `<ul class="list update-list">${listItems}</ul>`;
    }

    function renderService(items) {
        if (!items || !items.length) return "";
        const listItems = items
            .map((item) => {
                const role = escapeHtml(item.role || "");
                const venue = escapeHtml(item.venue || "");
                const year = formatNewsDate(item.year);
                const text = [role, venue].filter(Boolean).join(", ");
                const datePrefix = year ? `<span class="news-date">${year}</span>` : "";
                return `<li>${datePrefix}<span class="news-sep">—</span><span class="news-text">${text}</span></li>`;
            })
            .join("");
        return `<ul class="list">${listItems}</ul>`;
    }

    function renderPublications(items) {
        if (!items || !items.length) return "";
        const listItems = items
            .map((item) => {
                // Handle both string format and object format { text, link }
                const text = typeof item === 'string' ? item : (item.text || '');
                const link = typeof item === 'object' ? item.link : null;

                let textHtml;
                if (window.marked) {
                    textHtml = window.marked.parseInline(String(text));
                } else {
                    textHtml = escapeHtml(String(text));
                }

                // Add link icon if link exists
                if (link) {
                    const linkIcon = getLinkIcon('paper', null);
                    const external = link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';
                    return `<li><a href="${escapeHtml(link)}" ${external} class="paper-link" aria-label="View paper">${linkIcon}</a>${textHtml}</li>`;
                }

                return `<li>${textHtml}</li>`;
            })
            .join("");
        return `<ul class="list">${listItems}</ul>`;
    }

    function renderTalks(items) {
        if (!items || !items.length) return "";
        const listItems = items
            .map((item) => {
                const prefix = item.prefix ? `${escapeHtml(item.prefix)}, ` : "";
                const title = escapeHtml(item.title || "");
                const venue = escapeHtml(item.venue || "");
                const date = formatNewsDate(item.date);
                const parts = [prefix + title, venue].filter(Boolean).join(", ");
                const tail = date ? ` | ${date}` : "";
                return `<li>${parts}${tail}</li>`;
            })
            .join("");
        return `<ul class="list">${listItems}</ul>`;
    }

    function renderSidebar(data) {
        const profile = data.profile || {};
        const photo = profile.photo
            ? `<img class="profile-photo" src="${escapeHtml(profile.photo)}" alt="${escapeHtml(profile.name || "Profile photo")}" />`
            : "";

        const links = renderLinks(profile.links || []);
        const news = renderNews(data.news || []);
        const service = renderService(data.services || data.service || []);

        sidebarEl.innerHTML = `
            <div class="section">
                ${photo}
                <div class="meta-label">${escapeHtml(profile.title || "")}</div>
                <div>${escapeHtml(profile.affiliation || "")}</div>
            </div>
            <div class="section">
                <div class="meta-label">Connect</div>
                <div class="link-row">${links}</div>
            </div>
            <div class="section">
                <div class="meta-label">News</div>
                ${news}
            </div>
            <div class="section">
                <div class="meta-label">Prof. Services</div>
                ${service}
            </div>
        `;
    }

    function renderContent(data) {
        const profile = data.profile || {};
        const keywords = (profile.keywords || []).map(escapeHtml).join(", ");
        const photo = profile.photo
            ? `<img class="profile-photo" src="${escapeHtml(profile.photo)}" alt="${escapeHtml(profile.name || "Profile photo")}" loading="lazy" />`
            : "";
        const links = renderLinks(profile.links || []);
        const education = renderEducation(profile.education || []);
        const experience = renderEducation(profile.experience || []);
        const news = renderNews(data.news || []);
        const service = renderService(data.services || data.service || []);

        contentEl.innerHTML = `
            <section id="main-content" class="section profile-header">
                ${photo}
                <div class="profile-info">
                    <h1>${escapeHtml(profile.name || "")}</h1>
                    <div class="meta-label">${escapeHtml(profile.title || "")}</div>
                    <div class="affiliation">${escapeHtml(profile.affiliation || "")}</div>
                    <div class="link-row" role="navigation" aria-label="Contact links">${links}</div>
                </div>
            </section>
            <section class="section" aria-labelledby="research-interests-heading">
                <div class="hero">
                    <h2 id="research-interests-heading">Research Interests</h2>
                    <p class="keywords">${keywords ? `${keywords}` : ""}</p>
                </div>
            </section>
            <section class="section" aria-labelledby="education-heading">
                <h2 id="education-heading">Education</h2>
                ${education}
            </section>
            <section class="section" aria-labelledby="experience-heading">
                <h2 id="experience-heading">Research Experience</h2>
                ${experience}
            </section>
            <section class="section" aria-labelledby="updates-heading">
                <h2 id="updates-heading">Updates</h2>
                ${news}
            </section>
            <section class="section" aria-labelledby="services-heading">
                <h2 id="services-heading">Professional Services</h2>
                ${service}
            </section>
            <section class="section" aria-labelledby="selected-research-heading">
                <h2 id="selected-research-heading">Selected Research</h2>
                ${renderSelectedResearch(data.selected_research || [])}
            </section>
            <section class="section" aria-labelledby="talks-heading">
                <h2 id="talks-heading">Talks</h2>
                ${renderTalks(data.talks || [])}
            </section>
            <section class="section" aria-labelledby="publications-heading">
                <h2 id="publications-heading">Publications</h2>
                ${renderPublications(data.publications || [])}
            </section>
            <footer class="site-footer">
                <p>Last updated: ${profile.last_updated ? formatNewsDate(profile.last_updated) : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </footer>
        `;
    }

    async function init() {
        try {
            const sources = [
                "data/profile.yml",
                "data/news.yml",
                "data/research.yml",
                "data/publications.yml",
                "data/talks.yml",
                "data/services.yml",
            ];
            const parts = await Promise.all(
                sources.map(async (path) => {
                    const response = await fetch(path, { cache: "no-store" });
                    const text = await response.text();
                    return window.jsyaml.load(text);
                })
            );
            const data = Object.assign({}, ...parts);
            renderContent(data || {});
        } catch (error) {
            contentEl.innerHTML = "<p>Failed to load data.</p>";
        }
    }

    init();
})();
