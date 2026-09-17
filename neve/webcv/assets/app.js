(() => {
    const dataRoot = new URL('../../', document.currentScript.src);
    const isResume = document.body.dataset.view === 'resume';
    const content = document.getElementById('cv-content');
    const printButton = document.getElementById('print-button');
    const escape = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
    const inline = (value) => window.marked.parseInline(String(value ?? ''));
    const link = (url, label, className = '') => `<a href="${escape(url)}"${className ? ` class="${className}"` : ''}>${escape(label)}</a>`;
    const bullets = (items) => items.length ? `<ul class="entry-bullets">${items.map(item => `<li>${inline(item)}</li>`).join('')}</ul>` : '';
    // A missing/blank summary falls back to the detailed text, never hides an entry.
    const shortDescription = (entry) => typeof entry.short_description === 'string'
        ? entry.short_description.trim() : '';
    const shortValue = (entry, key, fallback) => typeof entry[key] === 'string' && entry[key].trim()
        ? entry[key].trim() : fallback;
    const descriptionText = (entry, fallback) => shortDescription(entry) || fallback.filter(Boolean).join(' ');

    function denseEntry({ title, fullTitle = title, meta = [], description = '', url = '', links = [], id = '' }) {
        return `<article class="entry dense-entry"${id ? ` data-entry-id="${escape(id)}"` : ''}>
            <div class="entry-line"><h3 title="${escape(fullTitle)}">${url ? link(url, title) : escape(title)}</h3>${meta.filter(Boolean).map(value => ` <span class="inline-meta">· ${escape(value)}</span>`).join('')}${links.length ? ` <span class="inline-links">${links.map(item => link(item.url, item.label)).join(' · ')}</span>` : ''}${description ? ` <span class="inline-description">— ${inline(description)}</span>` : ''}</div>
        </article>`;
    }

    function formatDate(value) {
        if (!value) return '';
        const text = value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
        const match = text.match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);
        if (!match) return text;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[Number(match[2]) - 1]} ${match[1]}`;
    }

    function entryHeading(title, dates = '', subtitle = '', titleUrl = '') {
        return `<div class="entry-heading"><h3>${titleUrl ? link(titleUrl, title) : escape(title)}</h3>${dates ? `<span class="entry-date">${escape(dates)}</span>` : ''}</div>${subtitle ? `<p class="entry-subtitle">${escape(subtitle)}</p>` : ''}`;
    }

    function renderEntries(entries) {
        if (isResume) {
            let previousGroup = '';
            return entries.map(entry => {
                const group = entry.resume_group || '';
                const heading = group && group !== previousGroup ? `<p class="group-label">${escape(group)}</p>` : '';
                previousGroup = group;
                return heading + denseEntry({
                    id: entry.id,
                    title: entry.title,
                    meta: [shortValue(entry, 'short_subtitle', entry.subtitle), entry.dates, ...(entry.short_notes || entry.notes || [])],
                    url: entry.url, links: entry.links,
                    description: descriptionText(entry, [entry.intro, ...(entry.bullets || []), ...(entry.additional_bullets || []), entry.context])
                });
            }).join('');
        }
        return entries.map(entry => {
            const items = entry.bullets || [];
            const notes = entry.notes || [];
            return `<article class="entry">
                ${entryHeading(entry.title, entry.dates, entry.subtitle, entry.url)}
                ${notes.map(note => `<p class="entry-note">${escape(note)}</p>`).join('')}
                ${entry.intro ? `<p class="entry-note">${inline(entry.intro)}</p>` : ''}
                ${bullets(items)}
                ${entry.links?.length ? `<p class="entry-links">${entry.links.map(item => link(item.url, item.label)).join('')}</p>` : ''}
                ${entry.context ? `<details class="project-context"><summary>Project context</summary><p>${inline(entry.context)}</p></details>` : ''}
                ${entry.additional_bullets?.length ? `<details class="project-context"><summary>Additional contributions</summary>${bullets(entry.additional_bullets)}</details>` : ''}
            </article>`;
        }).join('');
    }

    function renderEducation(profile) {
        return (profile.education || []).map(institution => {
            const details = institution;
            const notes = [
                details.advisor ? `Advisor: ${details.advisor}` : '',
                details.lab ? `Lab: ${details.lab}` : '',
                details.gpa ? `GPA: ${details.gpa}` : ''
            ].filter(Boolean);
            if (isResume) {
                return `<article class="entry education-entry"><div class="entry-line"><h3>${escape(institution.label)}</h3> <span class="inline-meta">· ${escape(details.degree || institution.detail)} · ${escape(details.dates)}</span></div>${notes.length ? `<p class="entry-note">${notes.map(escape).join(' · ')}</p>` : ''}</article>`;
            }
            return `<article class="entry compact-entry">${entryHeading(institution.label, details.dates, details.degree || institution.detail)}${notes.map(note => `<p class="entry-note">${escape(note)}</p>`).join('')}</article>`;
        }).join('');
    }

    function renderTeaching(courses, sharedSummary = '') {
        if (isResume) {
            const groups = new Map();
            courses.forEach(course => {
                const institution = course.institution || '';
                if (!groups.has(institution)) groups.set(institution, []);
                groups.get(institution).push(course);
            });
            const tables = [...groups].map(([institution, appointments]) => {
                const byCourse = new Map();
                appointments.forEach(course => {
                    // Include title in the key so reused course codes are not conflated.
                    const key = JSON.stringify([course.course_code, course.course_title]);
                    if (!byCourse.has(key)) byCourse.set(key, []);
                    byCourse.get(key).push(course);
                });
                const rows = [...byCourse.values()].map(roles => `<tbody>${roles.map((course, index) => {
                    const label = `${course.course_code}: ${course.course_title}`;
                    const title = course.course_url ? link(course.course_url, label) : escape(label);
                    return `<tr class="teaching-appointment" data-course="${escape(course.course_code)}" data-course-label="${escape(label)}">
                        ${index === 0 ? `<th scope="rowgroup" rowspan="${roles.length}">${title}</th>` : ''}
                        <td class="appointment"><span class="teaching-role">${escape(course.role)}</span> · <span class="teaching-semesters">${escape(course.semesters)}</span></td>
                        <td class="instructors">${escape(String(course.instructors || '').replace(/\s*\|\s*/g, '; '))}</td>
                    </tr>`;
                }).join('')}</tbody>`).join('');
                // Identical descriptions for different appointments of a course appear once.
                const highlights = [...byCourse.values()].map(roles => {
                    const descriptions = [...new Set(roles.map(course => descriptionText(course, course.responsibilities || [])).filter(Boolean))];
                    return descriptions.length ? `<span class="teaching-highlight"><strong>${escape(roles[0].course_code)}:</strong> ${descriptions.map(inline).join(' ')}</span>` : '';
                }).filter(Boolean);
                return `<div class="teaching-group"><table class="teaching-table"><caption>${escape(institution || 'Teaching appointments')}</caption><colgroup><col class="course-column"><col class="appointment-column"><col class="instructor-column"></colgroup><thead><tr><th scope="col">Course</th><th scope="col">Role & semesters</th><th scope="col">Instructors</th></tr></thead>${rows}</table>${highlights.length ? `<p class="teaching-highlights">${highlights.join(' ')}</p>` : ''}</div>`;
            }).join('');
            return (sharedSummary ? `<p class="teaching-summary">${inline(sharedSummary)}</p>` : '') + tables;
        }
        return courses.map(course => {
            const duties = course.responsibilities || [];
            const instructors = String(course.instructors || '').replace(/\s*\|\s*/g, '; ');
            const multipleInstructors = /;|,\s*Prof\./.test(instructors);
            // Highlight contributions rather than repeating routine duties for every course.
            const selected = duties.filter(item => /designed|created|developed|sole TA|guest lectures|led tutorials/i.test(item)).slice(0, 2);
            const remaining = duties.filter(item => !selected.includes(item));
            return `<article class="entry compact-entry">
                ${entryHeading(`${course.course_code}: ${course.course_title}`, course.semesters, `${course.role} · ${course.institution}`, course.course_url)}
                <p class="entry-note">Instructor${multipleInstructors ? 's' : ''}: ${escape(instructors)}</p>
                ${bullets(selected)}
                ${remaining.length ? `<details class="all-responsibilities"><summary>Additional responsibilities</summary>${bullets(remaining)}</details>` : ''}
            </article>`;
        }).join('');
    }

    function renderMentoring(entries) {
        if (isResume) return entries.map(entry => denseEntry({
            title: entry.role,
            meta: [entry.institution, entry.dates],
            description: descriptionText(entry, entry.responsibilities || [])
        })).join('');
        return entries.map(entry => `<article class="entry compact-entry">${entryHeading(entry.role.replace(/\s*\|\s*/g, ' · '), entry.dates, entry.institution)}${bullets(entry.responsibilities || [])}</article>`).join('');
    }

    function renderCitation(publication) {
            let text = typeof publication === 'string' ? publication : publication.text || '';
            // Preserve equal-contribution asterisks while emphasizing this CV's author.
            text = text.replace(/\*S\. Mohanty\*/g, '**S. Mohanty**');
            text = text.replace(/([A-Za-z])\*(?=[,;])/g, '$1\\*');
            text = text.replace(/(?<!\*)S\. Mohanty(?!\*\*)/g, '**S. Mohanty**');
            if (!isResume) {
                text = text.replace(/"([^"]+)"/, '**“$1”**');
                return `${inline(text)}${publication.link ? ` ${link(publication.link, 'Read', 'publication-link')}` : ''}`;
            }
            // Keep the entire citation, linking only its title when a URL exists.
            const quoted = text.match(/"([^"]+)"/);
            if (!quoted) return `${inline(text)}${publication.link ? ` ${link(publication.link, 'Read')}` : ''}`;
            return inline(text.slice(0, quoted.index)) + (publication.link ? link(publication.link, `“${quoted[1]}”`) : escape(`“${quoted[1]}”`)) + inline(text.slice(quoted.index + quoted[0].length));
    }

    function renderPublications(publications) {
        return `<ol class="citation-list">${publications.map(publication => `<li>${renderCitation(publication)}</li>`).join('')}</ol>`;
    }

    function renderPatents(patents, publications) {
        if (!isResume) return renderEntries(patents);
        return patents.map(patent => {
            const citation = patent.publication_id && publications.find(pub => pub.id === patent.publication_id);
            if (!citation) return renderEntries([patent]);
            return `<article class="entry patent-entry" data-publication-id="${escape(patent.publication_id)}"><p>${renderCitation(citation)} <span class="inline-meta">${escape(patent.subtitle)}</span></p></article>`;
        }).join('');
    }

    function renderTalks(talks) {
        if (isResume) return talks.map(talk => denseEntry({
            // Formal titles and venues are shared verbatim by both views.
            title: talk.title,
            meta: [talk.prefix, talk.venue, formatDate(talk.date)]
        })).join('');
        return talks.map(talk => `<article class="entry compact-entry">${entryHeading(talk.title, formatDate(talk.date), [talk.prefix, talk.venue].filter(Boolean).join(' · '))}</article>`).join('');
    }

    function renderService(service) {
        if (isResume) return `<ul class="compact-list">${service.map(item => `<li>${typeof item === 'string' ? inline(item) : `<strong>${escape(item.role)}</strong> · ${item.url ? link(item.url, item.venue) : escape(item.venue)} · ${escape(item.year)}`}</li>`).join('')}</ul>`;
        return service.map(item => typeof item === 'string'
            ? `<p>${inline(item)}</p>`
            : `<article class="entry compact-entry">${entryHeading(item.venue, item.year, item.role, item.url)}</article>`).join('');
    }

    function renderAwards(awards) {
        if (isResume) return awards.map(award => denseEntry({
            title: award.title, meta: [award.venue, award.dates],
            description: descriptionText(award, [award.description])
        })).join('');
        return awards.map(award => `<article class="entry compact-entry">${entryHeading(award.title, award.dates, award.venue)}<p class="entry-note">${escape(award.description)}</p></article>`).join('');
    }

    function renderSkills(skills) {
        return `<dl class="skill-list">${skills.map(skill => `<div class="skill-row"><dt>${escape(skill.label)}</dt><dd>${escape(skill.items.join(', '))}</dd></div>`).join('')}</dl>`;
    }

    function renderCoursework(courses) {
        const groups = new Map();
        courses.forEach(course => {
            const name = course.department || 'Other';
            if (!groups.has(name)) groups.set(name, []);
            groups.get(name).push(course);
        });
        if (isResume) {
            return `<div class="coursework-compact">${[...groups].map(([name, items]) => `<div class="coursework-group"><h3>${escape(name)}</h3><ul class="inline-course-list" role="list">${items.map(course => `<li><strong>${escape(course.code)}</strong> ${escape(course.title)}</li>`).join('')}</ul></div>`).join('')}</div>`;
        }
        return `<table class="coursework-table" aria-labelledby="coursework-heading">
            <colgroup><col class="department-column"><col></colgroup>
            <thead><tr><th scope="col">Department</th><th scope="col">Courses</th></tr></thead>
            <tbody>${[...groups].map(([name, items]) => `<tr><th scope="row">${escape(name)}</th><td><ul class="inline-course-list" role="list">${items.map(course => `<li><strong>${escape(course.code)}</strong> ${escape(course.title)}</li>`).join('')}</ul></td></tr>`).join('')}</tbody>
        </table>`;
    }

    function renderHeader(profile, cv) {
        const contact = cv.contact || {};
        const links = profile.links || [];
        const email = links.find(item => item.label === 'Email');
        const github = links.find(item => item.label === 'GitHub');
        const linkedin = links.find(item => item.label === 'LinkedIn');
        const contacts = [
            email ? link(email.url, email.url.replace(/^mailto:/, '')) : '',
            contact.phone ? link(`tel:${contact.phone}`, contact.phone) : '',
            escape(contact.location || ''),
            contact.website ? link(contact.website, contact.website.replace(/^https?:\/\//, '').replace(/\/$/, '')) : '',
            github ? link(github.url, 'GitHub') : '',
            linkedin ? link(linkedin.url, 'LinkedIn') : ''
        ].filter(Boolean);
        document.getElementById('document-header').innerHTML = `
            <p class="document-kind">${isResume ? 'Resume · Concise curriculum vitae' : 'Curriculum vitae'}</p>
            <h1>${escape(profile.name || 'Sampad Bhusan Mohanty')}</h1>
            <p class="profile-role">${escape(profile.title)} · ${escape(profile.affiliation)}</p>
            <ul class="contact-list" aria-label="Contact information">${contacts.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    const openedForPrint = new Set();
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('.all-responsibilities:not([open])').forEach(details => {
            openedForPrint.add(details);
            details.open = true;
        });
    });
    window.addEventListener('afterprint', () => {
        openedForPrint.forEach(details => { details.open = false; });
        openedForPrint.clear();
    });
    printButton.addEventListener('click', () => window.print());

    async function init() {
        if (!window.jsyaml || !window.marked) {
            content.innerHTML = '<p class="load-error" role="alert">The document could not load its display libraries. Check your connection and refresh this page.</p>';
            content.setAttribute('aria-busy', 'false');
            return;
        }
        const files = ['profile', 'cv', 'publications', 'teaching', 'mentoring', 'talks', 'services', 'coursework'];
        const results = await Promise.allSettled(files.map(async name => {
            const response = await fetch(new URL(`data/${name}.yml`, dataRoot), { cache: 'no-store' });
            if (!response.ok) throw new Error(`Unable to load ${name}`);
            return window.jsyaml.load(await response.text()) || {};
        }));
        const data = {};
        const failed = new Set();
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') Object.assign(data, result.value);
            else { failed.add(files[index]); console.error(result.reason); }
        });
        const profile = data.profile || {};
        const cv = data;
        renderHeader(profile, cv);
        const sectionData = [];
        function section(id, title, dependencies, render) {
            const missing = dependencies.some(name => failed.has(name));
            const html = missing ? '<p class="load-error" role="alert">This section could not load. Please refresh to try again.</p>' : render();
            if (!html) return;
            sectionData.push({ id, title, html });
        }
        section('education', 'Education', ['profile'], () => renderEducation(profile));
        section('research', 'Research experience', ['cv'], () => renderEntries(cv.research || []));
        const patentIds = new Set((cv.patents || []).map(patent => patent.publication_id).filter(Boolean));
        section('publications', 'Publications', ['publications'], () => renderPublications((cv.publications || []).filter(pub => !isResume || !pub.id || !patentIds.has(pub.id))));
        section('teaching', 'Teaching', ['teaching'], () => renderTeaching(cv.teaching || [], cv.teaching_summary));
        section('mentoring', 'Mentoring', ['mentoring'], () => renderMentoring(cv.mentoring || []));
        section('industry', 'Industry experience', ['cv'], () => renderEntries(cv.industry || []));
        section('patents', 'Patents', ['cv'], () => renderPatents(cv.patents || [], cv.publications || []));
        section('talks', 'Talks, presentations & demos', ['talks'], () => renderTalks(cv.talks || []));
        section('service', 'Professional service', ['services'], () => renderService(cv.services || cv.service || []));
        section('awards', 'Honors & awards', ['cv'], () => renderAwards(cv.awards || []));
        section('skills', 'Technical skills', ['cv'], () => renderSkills(cv.skills || []));
        section('coursework', 'Selected coursework', ['coursework'], () => renderCoursework(cv.coursework || []));
        section('community', 'Leadership & community', ['cv'], () => renderEntries(cv.community || []));
        content.innerHTML = sectionData.map(({ id, title, html }) => `<section class="cv-section" id="${id}" aria-labelledby="${id}-heading"><h2 id="${id}-heading">${title}</h2>${html}</section>`).join('');
        document.getElementById('section-nav').innerHTML = sectionData.map(({ id, title }) => link(`#${id}`, title)).join('');
        const lastUpdated = formatDate(profile.last_updated);
        document.getElementById('cv-footer').innerHTML = lastUpdated ? `<p>Last updated: ${escape(lastUpdated)}</p>` : '';
        // A partially loaded document should not be exported as a complete CV.
        printButton.disabled = failed.size > 0;
        printButton.title = failed.size ? 'Refresh to load all sections before printing' : '';
        document.title = `${profile.name || 'Sampad Bhusan Mohanty'} — ${isResume ? 'Resume' : 'CV'}`;
        content.setAttribute('aria-busy', 'false');
        window.cvReady = true;
        window.dispatchEvent(new Event('cv-ready'));
    }
    init().catch(error => {
        console.error(error);
        content.innerHTML = '<p class="load-error" role="alert">The document could not be displayed. Please refresh to try again.</p>';
        content.setAttribute('aria-busy', 'false');
    });
})();
