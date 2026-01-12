# Portfolio Landing Page: Claude's Design Proposal
**Date:** 2026-01-11
**Goal:** Create a unique, minimalist, maintainable portfolio for recruiters that is future-proof for interactive plots and advanced features.

---

## Executive Summary

This proposal enhances your existing idea.md with recruiter-focused improvements while maintaining minimalist principles. The design combines a classic sidebar with modern card-based content, supports future interactive visualizations, and keeps the data-as-code philosophy.

**Key Philosophy:** "Sophisticated simplicity"—looks effortless but every detail is intentional.

---

## Analysis of Current Idea (idea.md)

### Strengths ✅
- Data-as-code (YAML) approach is brilliant for maintainability
- No build step philosophy keeps things simple
- Typography choices (Cormorant Garamond, EB Garamond) are sophisticated
- Semantic HTML structure
- Proven minimalist aesthetic from webjnl

### Gaps for Recruiter Portfolio ❌
- Classic sidebar layout is common in academia but not unique
- Text-heavy with no visual hierarchy for impact
- Publications-first instead of projects-first (recruiters care more about what you built)
- No space for interactive demonstrations
- Missing: skills showcase, project thumbnails, visual storytelling
- No metrics or impact indicators

---

## Recommended Layout: Hybrid Sidebar + Modular Content

### Full Layout Diagram

```text
+----------------------+-------------------------------------------------------+
|                      |                                                       |
|   [ PROFILE PHOTO ]  |   SAMPAD BHUSAN MOHANTY             [CV] [→ Contact] |
|   (Circle/Rounded)   |                                                       |
|                      |   "Bridging the gap between missing data and          |
|   ABOUT              |    reliable inference in autonomous networks."        |
|   PhD Candidate      |                                                       |
|   @ USC (2026)       |   PhD @ USC • 12 Publications • 150+ Citations        |
|                      |   ───────────────────────────────────────────────     |
|   [ ICONS ]          |                                                       |
|   ✉ 📚 💻 🔗        |   WHAT I DO                                           |
|                      |   ┌──────────┐  ┌──────────┐  ┌──────────┐          |
|   EXPERTISE          |   │ RESEARCH │  │  BUILD   │  │  TEACH   │          |
|   • ML/AI            |   │ ML for   │  │ Systems  │  │ CS Ed    │          |
|   • IoT Systems      |   │ Networks │  │ at Scale │  │ Tools    │          |
|   • Edge Computing   |   └──────────┘  └──────────┘  └──────────┘          |
|                      |                                                       |
|   NAVIGATION         |   FEATURED WORK                                       |
|   → Research         |   ┌─────────────────────────────────────────────┐   |
|   → Publications     |   │ [THUMB]  SATORIS (2025)              ⭐ NEW │   |
|   → Teaching         |   │          Novel tensor imputation...          │   |
|   → Blog             |   │          #AI #Systems #IoT                   │   |
|                      |   │          IEEE Access • 15 citations          │   |
|   [ NEWS ]           |   │          [PDF] [Code] [→ Live Demo]          │   |
|   Timeline View:     |   └─────────────────────────────────────────────┘   |
|                      |                                                       |
|   2026-01  ●        |   RESEARCH PROJECTS                                   |
|   Paper accepted     |   ┌──────────┐  ┌──────────┐  ┌──────────┐          |
|   at SIGCSE '26      |   │ [Card]   │  │ [Card]   │  │ [Card]   │          |
|            │         |   │ Project  │  │ Project  │  │ Project  │          |
|   2025-12  ●        |   │ Title    │  │ Title    │  │ Title    │          |
|   Invited talk       |   │ Tags     │  │ Tags     │  │ Tags     │          |
|   at WiSe            |   │ Links    │  │ Links    │  │ Links    │          |
|                      |   └──────────┘  └──────────┘  └──────────┘          |
|   [ DOWNLOAD CV ]    |                                                       |
|   (Prominent button) |   RESEARCH IMPACT (Interactive)                       |
|                      |   [D3 Timeline: Publications over time]               |
|                      |   2016 ●───●───●──●────●──●── 2026                   |
|                      |                                                       |
|                      |   PUBLICATIONS                                        |
|                      |   2025: Paper 1 • Paper 2                             |
|                      |   2024: Paper 3 • Paper 4                             |
|                      |   [See all publications →]                            |
|                      |                                                       |
+----------------------+-------------------------------------------------------+
```

### Why This Layout Works

1. **First 5 Seconds**: Recruiter sees name, hook, metrics, and best work immediately
2. **Unique**: Hybrid sidebar + card grid is professional but modern
3. **Scannable**: Clear visual hierarchy guides the eye
4. **Flexible**: Each card is a container—can hold text, images, plots, iframes
5. **Mobile-Friendly**: Sidebar collapses, cards stack beautifully
6. **Academic + Tech**: Balances publications (academia) with demos (industry)

---

## Specific Improvements (10 Key Enhancements)

### 1. Hero Enhancement (Top of Main Area)

**Current:** Just name + tagline
**Improved:** Add metrics and stronger hook

```html
<header class="hero">
  <h1>SAMPAD BHUSAN MOHANTY</h1>
  <p class="hook">"Bridging the gap between missing data and reliable inference in autonomous networks."</p>
  <div class="hero-meta">
    <span>PhD Candidate @ USC</span>
    <span>•</span>
    <span>12 Publications</span>
    <span>•</span>
    <span>150+ Citations</span>
  </div>
  <div class="hero-actions">
    <a href="/webcv/index.html" class="btn-primary">Download CV</a>
    <a href="#contact" class="btn-secondary">Contact Me</a>
  </div>
</header>
```

**CSS:**
```css
.hero {
  text-align: center;
  padding: 3rem 0;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 3rem;
}

.hero h1 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.hero .hook {
  font-size: 1.2rem;
  font-style: italic;
  color: #555;
  max-width: 600px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}

.hero-meta {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary {
  background: #1a1a1a;
  color: #fff;
  padding: 0.75rem 2rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #333;
}

.btn-secondary {
  background: transparent;
  color: #1a1a1a;
  padding: 0.75rem 2rem;
  text-decoration: none;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #1a1a1a;
  color: #fff;
}
```

**Why:** Recruiters need instant credibility. Metrics like publication count and citations build trust immediately.

---

### 2. Sidebar Optimization

**Improved Sidebar Structure:**

```html
<aside class="sidebar">
  <div class="sidebar-photo">
    <img src="/assets/profile.jpg" alt="Sampad Bhusan Mohanty">
  </div>

  <div class="sidebar-section">
    <h3>About</h3>
    <p>PhD Candidate<br>USC (Expected 2026)</p>
  </div>

  <div class="sidebar-section">
    <h3>Connect</h3>
    <div class="social-icons">
      <a href="mailto:sampad@usc.edu" title="Email">✉</a>
      <a href="https://github.com/sampadbm" title="GitHub">💻</a>
      <a href="https://scholar.google.com/..." title="Scholar">📚</a>
      <a href="https://linkedin.com/in/..." title="LinkedIn">🔗</a>
    </div>
  </div>

  <div class="sidebar-section">
    <h3>Expertise</h3>
    <ul class="expertise-list">
      <li>Machine Learning</li>
      <li>IoT Systems</li>
      <li>Edge Computing</li>
      <li>Network Science</li>
    </ul>
  </div>

  <nav class="sidebar-section">
    <h3>Navigation</h3>
    <ul class="nav-list">
      <li><a href="#research">→ Research</a></li>
      <li><a href="#publications">→ Publications</a></li>
      <li><a href="#teaching">→ Teaching</a></li>
      <li><a href="#blog">→ Blog</a></li>
    </ul>
  </nav>

  <div class="sidebar-section">
    <h3>News</h3>
    <div class="timeline">
      <div class="timeline-item">
        <span class="timeline-date">Jan '26</span>
        <p>Paper accepted at SIGCSE '26</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-date">Dec '25</span>
        <p>Invited talk at WiSe Conference</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-date">Sep '25</span>
        <p>Started PhD at USC</p>
      </div>
    </div>
  </div>

  <div class="sidebar-cta">
    <a href="/webcv/index.html" class="btn-cv">Download CV</a>
  </div>
</aside>
```

**CSS:**
```css
.sidebar {
  position: sticky;
  top: 2rem;
  width: 280px;
  padding: 2rem;
  background: #fefefe;
  border-right: 1px solid #e0e0e0;
  height: fit-content;
}

.sidebar-photo img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 2rem;
  border: 3px solid #e0e0e0;
}

.sidebar-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar-section:last-of-type {
  border-bottom: none;
}

.sidebar-section h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.social-icons {
  display: flex;
  gap: 0.75rem;
  font-size: 1.5rem;
}

.social-icons a {
  text-decoration: none;
  transition: transform 0.2s;
}

.social-icons a:hover {
  transform: scale(1.2);
}

.expertise-list, .nav-list {
  list-style: none;
  padding: 0;
}

.expertise-list li, .nav-list li {
  padding: 0.3rem 0;
  font-size: 0.9rem;
  color: #555;
}

.nav-list a {
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-list a:hover {
  color: #555;
}

.timeline-item {
  margin-bottom: 1rem;
}

.timeline-date {
  font-size: 0.85rem;
  color: #888;
  font-weight: 600;
}

.timeline-item p {
  font-size: 0.9rem;
  color: #555;
  margin: 0.25rem 0 0 0;
  line-height: 1.4;
}

.btn-cv {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: #1a1a1a;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-cv:hover {
  background: #333;
}
```

**Benefits:**
- Sidebar becomes true navigation hub
- Skills visible immediately (recruiter scan)
- News feels more compact with timeline design
- Strong CTA at bottom
- Self-contained, scrollable on long pages

---

### 3. Research Cards with Visual Hierarchy

**Card Structure:**

```html
<div class="card card-research">
  <div class="card-badges">
    <span class="badge badge-new">⭐ NEW</span>
    <span class="badge badge-featured">🏆 FEATURED</span>
  </div>

  <div class="card-thumbnail">
    <img src="/assets/satoris-thumb.png" alt="SATORIS Framework">
  </div>

  <div class="card-content">
    <h3 class="card-title">SATORIS: A Unified Framework for Traffic Imputation</h3>
    <p class="card-description">Novel tensor-based methods for missing data imputation in IoT networks...</p>

    <div class="card-tags">
      <span class="tag tag-ai">AI/ML</span>
      <span class="tag tag-systems">Systems</span>
      <span class="tag tag-iot">IoT</span>
    </div>

    <div class="card-meta">
      <span class="venue">IEEE Access 2025</span>
      <span>•</span>
      <span class="citations">15 citations</span>
    </div>

    <div class="card-actions">
      <a href="#" class="card-link">PDF</a>
      <a href="#" class="card-link">Code</a>
      <a href="#" class="card-link card-link-primary">→ Live Demo</a>
    </div>
  </div>
</div>
```

**CSS:**
```css
.card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #ccc;
}

.card-badges {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: #f0f0f0;
  font-weight: 600;
}

.badge-new {
  background: #fff3cd;
  color: #856404;
}

.badge-featured {
  background: #d4edda;
  color: #155724;
}

.card-thumbnail {
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 4px;
  background: #f8f8f8;
}

.card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover .card-thumbnail img {
  transform: scale(1.05);
}

.card-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
  line-height: 1.3;
}

.card-description {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: #f0f0f0;
  color: #555;
  font-weight: 500;
}

.tag-ai {
  background: #e3f2fd;
  color: #1565c0;
}

.tag-systems {
  background: #f3e5f5;
  color: #6a1b9a;
}

.tag-iot {
  background: #e8f5e9;
  color: #2e7d32;
}

.card-meta {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1rem;
}

.card-actions {
  display: flex;
  gap: 1rem;
}

.card-link {
  font-size: 0.9rem;
  color: #1a1a1a;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.card-link:hover {
  border-bottom-color: #1a1a1a;
}

.card-link-primary {
  font-weight: 600;
  color: #1565c0;
}

.card-link-primary:hover {
  border-bottom-color: #1565c0;
}
```

---

### 4. "What I Do" Section

**HTML:**
```html
<section class="what-i-do">
  <h2>What I Do</h2>
  <div class="activities-grid">
    <div class="activity-card">
      <div class="activity-icon">🔬</div>
      <h3>Research</h3>
      <p>ML for Networks</p>
    </div>
    <div class="activity-card">
      <div class="activity-icon">⚙️</div>
      <h3>Build</h3>
      <p>Systems at Scale</p>
    </div>
    <div class="activity-card">
      <div class="activity-icon">🎓</div>
      <h3>Teach</h3>
      <p>CS Education Tools</p>
    </div>
  </div>
</section>
```

**CSS:**
```css
.what-i-do {
  margin-bottom: 4rem;
}

.what-i-do h2 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-align: center;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.activity-card {
  text-align: center;
  padding: 2rem;
  background: #fafafa;
  border-radius: 8px;
  transition: background 0.2s;
}

.activity-card:hover {
  background: #f0f0f0;
}

.activity-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.activity-card h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.activity-card p {
  font-size: 0.95rem;
  color: #666;
}
```

**Why:** Recruiters need to quickly understand what you **do**, not just what you've published. This gives them the elevator pitch in visual form.

---

### 5. Smart Content Organization

**Section Hierarchy:**

```html
<main class="main-content">
  <!-- Hero (from #1) -->

  <!-- What I Do (from #4) -->

  <section id="featured" class="featured-work">
    <h2>Featured Work</h2>
    <!-- 1-2 large cards with demos/videos -->
  </section>

  <section id="research" class="research-projects">
    <h2>Research Projects</h2>
    <div class="projects-grid">
      <!-- Cards with papers, filterable by tag -->
    </div>
  </section>

  <section id="experience" class="industry-experience">
    <h2>Industry Experience</h2>
    <!-- Cards with company logos, if applicable -->
  </section>

  <section id="tools" class="open-source">
    <h2>Tools & Open Source</h2>
    <!-- Side projects, GitHub stars, downloads -->
  </section>

  <section id="impact" class="research-impact">
    <h2>Research Impact</h2>
    <!-- Interactive D3 timeline or plot -->
  </section>

  <section id="publications" class="publications">
    <h2>Publications</h2>
    <!-- Collapsible list or "See All" link -->
  </section>

  <section id="teaching" class="teaching">
    <h2>Teaching</h2>
    <!-- Courses, materials -->
  </section>
</main>
```

**CSS Grid for Projects:**
```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Featured work gets larger cards */
.featured-work .card {
  grid-column: span 2;
  grid-row: span 2;
}
```

**Benefit:** Shows breadth beyond just academic work. Recruiters see you as a builder, not just a researcher.

---

### 6. Mobile-First Responsive Sidebar

**CSS:**
```css
/* Desktop */
.layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

/* Tablet */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 240px 1fr;
    gap: 2rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -100%;
    width: 280px;
    height: 100vh;
    background: #fff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: left 0.3s;
    z-index: 1000;
    overflow-y: auto;
  }

  .sidebar.open {
    left: 0;
  }

  .hamburger-menu {
    position: fixed;
    top: 1rem;
    left: 1rem;
    display: block;
    width: 40px;
    height: 40px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    z-index: 999;
    font-size: 1.5rem;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 999;
  }

  .overlay.visible {
    display: block;
  }
}
```

**JavaScript:**
```javascript
// Mobile sidebar toggle
const hamburger = document.querySelector('.hamburger-menu');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

hamburger?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('visible');
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
});
```

---

### 7. Interactive Plot Placeholder

**Example 1: D3 Publication Timeline**

```html
<section class="research-impact">
  <h2>Research Impact</h2>
  <div id="publication-timeline" class="interactive-chart"></div>
</section>
```

**JavaScript (using D3.js from CDN):**
```javascript
async function renderPublicationTimeline(publications) {
  // Load D3 only when needed
  if (typeof d3 === 'undefined') {
    await import('https://cdn.jsdelivr.net/npm/d3@7/+esm');
  }

  const container = d3.select('#publication-timeline');
  const width = container.node().offsetWidth;
  const height = 300;

  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);

  // Group publications by year
  const pubsByYear = d3.rollup(
    publications,
    v => v.length,
    d => d.year
  );

  const data = Array.from(pubsByYear, ([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  // Scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([50, width - 50]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height - 50, 50]);

  // Line
  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.count))
    .curve(d3.curveMonotoneX);

  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#1565c0')
    .attr('stroke-width', 2)
    .attr('d', line);

  // Points
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.year))
    .attr('cy', d => yScale(d.count))
    .attr('r', 5)
    .attr('fill', '#1565c0')
    .on('mouseover', function(event, d) {
      d3.select(this).attr('r', 8);
      // Show tooltip
    })
    .on('mouseout', function() {
      d3.select(this).attr('r', 5);
    });

  // Axes
  svg.append('g')
    .attr('transform', `translate(0, ${height - 50})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

  svg.append('g')
    .attr('transform', `translate(50, 0)`)
    .call(d3.axisLeft(yScale));
}
```

**Example 2: Embedded Demo**

```html
<div class="card card-demo">
  <h3>SATORIS Live Demo</h3>
  <iframe
    src="/demos/satoris/index.html"
    width="100%"
    height="500px"
    frameborder="0"
    loading="lazy">
  </iframe>
  <p>Interactive visualization of traffic imputation algorithm</p>
</div>
```

**Implementation Strategy:**
- Load D3.js/Plotly only when section is in viewport (Intersection Observer)
- Fallback to static image if JavaScript disabled
- Use data from YAML to generate plots dynamically

---

### 8. Better "Latest Updates" Timeline

**HTML:**
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <span class="timeline-date">January 2026</span>
      <h4>Paper Accepted at SIGCSE '26</h4>
      <p>"LEAP: Live Experiments as a Pedagogy"</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <span class="timeline-date">December 2025</span>
      <h4>Invited Talk</h4>
      <p>WiSe Conference: "Challenges in Autonomous Networks"</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <span class="timeline-date">September 2025</span>
      <h4>Started PhD at USC</h4>
      <p>Computer Science Department</p>
    </div>
  </div>
</div>
```

**CSS:**
```css
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2.4rem;
  top: 0.3rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #1a1a1a;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #e0e0e0;
}

.timeline-date {
  font-size: 0.85rem;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-item h4 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.25rem 0;
}

.timeline-item p {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}
```

---

### 9. Subtle Animations (Minimalist Motion)

**CSS:**
```css
/* Card hover effects */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Image zoom on hover */
.card-thumbnail {
  overflow: hidden;
}

.card-thumbnail img {
  transition: transform 0.4s ease-out;
}

.card:hover .card-thumbnail img {
  transform: scale(1.05);
}

/* Link underline animation */
.card-link {
  position: relative;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.card-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease-out;
}

.card-link:hover::after {
  width: 100%;
}

/* Fade-in on scroll (optional) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card.fade-in {
  animation: fadeInUp 0.6s ease-out;
}
```

**JavaScript (Intersection Observer for scroll animations):**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
  observer.observe(card);
});
```

**Principle:** Motion should be subtle, purposeful, never distracting. Use for:
- Hover feedback (cards lifting)
- Image reveals (zoom on hover)
- Scroll-triggered fades (optional, keep minimal)

---

### 10. Future-Proofing: Component Architecture

**Enhanced YAML Schema:**

```yaml
# data.yml

profile:
  name: Sampad Bhusan Mohanty
  title: PhD Candidate in Computer Science
  affiliation: University of Southern California
  expected_graduation: 2026
  hook: "Bridging the gap between missing data and reliable inference in autonomous networks."
  contact:
    email: sampad@usc.edu
    github: sampadbm
    scholar: https://scholar.google.com/...
    linkedin: https://linkedin.com/in/...
  metrics:
    publications: 12
    citations: 150
  links:
    cv: /webcv/index.html
    resume: /assets/resume.pdf

# What I Do section
activities:
  - title: Research
    icon: "🔬"
    description: ML for Networks
  - title: Build
    icon: "⚙️"
    description: Systems at Scale
  - title: Teach
    icon: "🎓"
    description: CS Education Tools

# Expertise for sidebar
expertise:
  - Machine Learning
  - IoT Systems
  - Edge Computing
  - Network Science
  - Data Imputation

# Skills with categories
skills:
  - category: "AI/ML"
    items: ["Reinforcement Learning", "Computer Vision", "NLP", "Tensor Methods"]
  - category: "Systems"
    items: ["Distributed Systems", "IoT", "Edge Computing", "Cloud Architecture"]
  - category: "Tools"
    items: ["Python", "PyTorch", "TensorFlow", "Docker", "Kubernetes"]

# Featured work (top showcase)
featured:
  - id: satoris
    type: project
    title: "SATORIS: Unified Traffic Imputation Framework"
    description: "Novel tensor-based methods for missing data imputation in IoT networks with 40% improvement over baselines."
    thumbnail: /assets/satoris-thumb.png
    tags: ["AI/ML", "Systems", "IoT"]
    year: 2025
    venue: "IEEE Access"
    citations: 15
    badges: ["new", "featured"]
    links:
      paper: https://ieeexplore.ieee.org/...
      code: https://github.com/sampadbm/satoris
      demo: /demos/satoris/
      slides: /assets/satoris-slides.pdf
    interactive: true  # Trigger special rendering
    demo_config:
      type: iframe
      src: /demos/satoris/index.html
      height: 500

# Research projects
projects:
  - title: "LEAP: Live Experiments as a Pedagogy"
    type: research
    year: 2026
    thumbnail: /assets/leap-thumb.png
    description: "Interactive platform for teaching CS concepts through live experimentation."
    tags: ["Education", "Systems"]
    venue: "SIGCSE 2026"
    status: "accepted"
    badges: ["new"]
    links:
      paper: "#"
      code: "#"

  - title: "Network Topology Inference"
    type: research
    year: 2024
    thumbnail: /assets/topology-thumb.png
    description: "Machine learning approach to infer network topology from traffic patterns."
    tags: ["AI/ML", "Networks"]
    venue: "ICC 2024"
    citations: 8
    links:
      paper: "#"
      code: "#"

# Industry experience (if applicable)
experience:
  - company: "Google"
    role: "Research Intern"
    period: "Summer 2024"
    logo: /assets/logos/google.png
    description: "Worked on large-scale ML systems for network optimization."
    tags: ["ML", "Systems"]

# Open source / tools
tools:
  - title: "WebJNL"
    description: "Minimalist web-based reading journal with YAML backend"
    thumbnail: /assets/webjnl-thumb.png
    tags: ["Web", "Tools"]
    links:
      demo: /tools/webjnl/
      code: https://github.com/...
    stats:
      stars: 45
      downloads: "1.2k"

# Publications (traditional academic list)
publications:
  - title: "SATORIS: A Unified Framework for Traffic Imputation in Sparse Networks"
    authors: "S. Mohanty, M. Kiamari, F. Bai, B. Krishnamachari"
    venue: "IEEE Access"
    year: 2025
    type: "journal"
    links:
      pdf: "#"
      code: "#"
      slides: "#"

  - title: "Another Important Paper"
    authors: "S. Mohanty, et al."
    venue: "Conference Name"
    year: 2024
    type: "conference"
    links:
      pdf: "#"

# News / Updates
news:
  - date: 2026-01-11
    title: "Paper Accepted at SIGCSE '26"
    description: "LEAP: Live Experiments as a Pedagogy"
    link: "#"

  - date: 2025-12-15
    title: "Invited Talk at WiSe Conference"
    description: "Challenges in Autonomous Networks"
    link: "#"

  - date: 2025-09-01
    title: "Started PhD at USC"
    description: "Computer Science Department"

# Teaching
teaching:
  - course: "CSCI 201: Principles of Software Development"
    role: "Teaching Assistant"
    semester: "Fall 2025"
    institution: "USC"
    description: "Led discussion sections and graded assignments for 150 students."

  - course: "CSCI 104: Data Structures and OOP"
    role: "Course Producer"
    semester: "Spring 2025"
    institution: "USC"

# Interactive components configuration
interactive:
  - id: publication-timeline
    type: d3_chart
    dataSource: publications
    chartType: timeline
    config:
      xAxis: year
      yAxis: count
      groupBy: year

  - id: citation-graph
    type: plotly
    dataSource: publications
    chartType: bar
    config:
      x: year
      y: citations

# Page sections order (defines layout)
sections:
  - id: hero
    component: hero

  - id: what-i-do
    component: activities_grid

  - id: featured
    title: "Featured Work"
    component: featured_cards
    dataSource: featured

  - id: research
    title: "Research Projects"
    component: project_grid
    dataSource: projects
    filterable: true

  - id: experience
    title: "Industry Experience"
    component: experience_cards
    dataSource: experience

  - id: tools
    title: "Tools & Open Source"
    component: tool_cards
    dataSource: tools

  - id: impact
    title: "Research Impact"
    component: interactive_plot
    dataSource: interactive
    plotId: publication-timeline

  - id: publications
    title: "Publications"
    component: publication_list
    dataSource: publications
    collapsible: true
    limit: 5

  - id: teaching
    title: "Teaching"
    component: teaching_list
    dataSource: teaching
```

**Modular Renderer (app.js):**

```javascript
// Component registry
const componentRenderers = {
  hero: renderHero,
  activities_grid: renderActivities,
  featured_cards: renderFeatured,
  project_grid: renderProjectGrid,
  experience_cards: renderExperience,
  tool_cards: renderTools,
  interactive_plot: renderInteractivePlot,
  publication_list: renderPublications,
  teaching_list: renderTeaching
};

// Main render function
async function renderPage(data) {
  const main = document.querySelector('.main-content');

  for (const section of data.sections) {
    const renderer = componentRenderers[section.component];
    if (!renderer) {
      console.warn(`No renderer for component: ${section.component}`);
      continue;
    }

    // Get data for this section
    const sectionData = section.dataSource
      ? data[section.dataSource]
      : null;

    // Render component
    const html = await renderer(sectionData, section);

    // Create section element
    const sectionEl = document.createElement('section');
    sectionEl.id = section.id;
    sectionEl.className = section.component;

    if (section.title) {
      sectionEl.innerHTML = `<h2>${section.title}</h2>`;
    }

    sectionEl.innerHTML += html;
    main.appendChild(sectionEl);

    // Mount interactive components
    if (section.component === 'interactive_plot') {
      mountInteractive(section, data);
    }
  }
}

// Example component renderers
function renderHero(data, config) {
  const profile = data;
  return `
    <div class="hero">
      <h1>${profile.name}</h1>
      <p class="hook">${profile.hook}</p>
      <div class="hero-meta">
        <span>${profile.title} @ ${profile.affiliation}</span>
        <span>•</span>
        <span>${profile.metrics.publications} Publications</span>
        <span>•</span>
        <span>${profile.metrics.citations}+ Citations</span>
      </div>
      <div class="hero-actions">
        <a href="${profile.links.cv}" class="btn-primary">Download CV</a>
        <a href="mailto:${profile.contact.email}" class="btn-secondary">Contact Me</a>
      </div>
    </div>
  `;
}

function renderProjectGrid(projects, config) {
  let html = '<div class="projects-grid">';

  for (const project of projects) {
    const badges = project.badges?.map(b =>
      `<span class="badge badge-${b}">${getBadgeIcon(b)} ${b.toUpperCase()}</span>`
    ).join('') || '';

    const tags = project.tags?.map(t =>
      `<span class="tag tag-${t.toLowerCase().replace(/\//g, '-')}">${t}</span>`
    ).join('') || '';

    const links = Object.entries(project.links || {}).map(([key, url]) =>
      `<a href="${url}" class="card-link">${key.toUpperCase()}</a>`
    ).join('');

    html += `
      <div class="card card-research" data-tags="${project.tags?.join(',') || ''}">
        ${badges ? `<div class="card-badges">${badges}</div>` : ''}
        ${project.thumbnail ? `
          <div class="card-thumbnail">
            <img src="${project.thumbnail}" alt="${project.title}">
          </div>
        ` : ''}
        <div class="card-content">
          <h3 class="card-title">${project.title}</h3>
          <p class="card-description">${project.description}</p>
          ${tags ? `<div class="card-tags">${tags}</div>` : ''}
          ${project.venue ? `
            <div class="card-meta">
              <span class="venue">${project.venue} ${project.year}</span>
              ${project.citations ? `<span>•</span><span>${project.citations} citations</span>` : ''}
            </div>
          ` : ''}
          ${links ? `<div class="card-actions">${links}</div>` : ''}
        </div>
      </div>
    `;
  }

  html += '</div>';

  // Add filtering UI if enabled
  if (config.filterable) {
    const allTags = [...new Set(projects.flatMap(p => p.tags || []))];
    html = renderFilterUI(allTags) + html;
  }

  return html;
}

function renderFilterUI(tags) {
  return `
    <div class="filter-container">
      <button class="filter-toggle">Filter by Tag ▼</button>
      <div class="filter-options" style="display: none;">
        ${tags.map(tag => `
          <label class="filter-option">
            <input type="checkbox" value="${tag}" class="tag-filter">
            ${tag}
          </label>
        `).join('')}
      </div>
    </div>
  `;
}

async function mountInteractive(section, data) {
  const plotConfig = data.interactive.find(i => i.id === section.plotId);
  if (!plotConfig) return;

  if (plotConfig.type === 'd3_chart') {
    await renderD3Chart(plotConfig, data[plotConfig.dataSource]);
  } else if (plotConfig.type === 'plotly') {
    await renderPlotlyChart(plotConfig, data[plotConfig.dataSource]);
  }
}

// Utility functions
function getBadgeIcon(badge) {
  const icons = {
    new: '⭐',
    featured: '🏆',
    best: '🥇'
  };
  return icons[badge] || '';
}

// Load and render
async function init() {
  const response = await fetch('/data.yml');
  const yamlText = await response.text();
  const data = jsyaml.load(yamlText);

  await renderPage(data);
  initializeFilters();
  initializeAnimations();
}

document.addEventListener('DOMContentLoaded', init);
```

**Benefits of This Architecture:**

1. **Data-Driven**: All content in YAML, no code changes needed
2. **Modular**: Each component is independent
3. **Extensible**: Add new components by registering renderers
4. **Future-Proof**: Can add interactive plots, embed tools, etc.
5. **No Build Step**: Works directly in browser (development)
6. **Build-Ready**: Can add Vite/Webpack later for production optimization

---

## Summary: Comparison Table

| Element | Original Idea | Enhanced Proposal |
|---------|--------------|-------------------|
| **Layout** | Classic sidebar | Hybrid sidebar + card grid |
| **Hero** | Name + tagline | + Metrics (pubs, citations) |
| **Sidebar** | Photo, Education, News | + Skills, Navigation, Timeline, CTA |
| **Content Priority** | Publications first | Projects & demos first |
| **Visual Elements** | Text-heavy | Thumbnails, badges, tags |
| **Sections** | Generic "Research" | Featured, Research, Experience, Tools |
| **Updates** | Bullet list | Timeline with markers |
| **Mobile** | Not specified | Collapsible sidebar, responsive grid |
| **Interactive** | None planned | D3 plots, embedded demos |
| **Filtering** | None | Tag filtering (reuse webjnl system) |
| **Animations** | None | Subtle hover effects, scroll reveals |
| **YAML Schema** | Basic | Comprehensive with metadata |
| **Components** | Monolithic | Modular renderer system |

---

## The Unique Factor

**What makes this portfolio stand out to recruiters:**

1. **Academic + Builder Identity**: Shows research credibility AND ability to ship working demos
2. **Visual Storytelling**: Thumbnails, interactive plots, live demos (not just PDF links)
3. **Scannable in 30 Seconds**: Clear hierarchy, metrics upfront, visual cards
4. **Performance**: Fast load, no framework bloat, progressive enhancement
5. **Consistent Brand**: Same typography and minimalist aesthetic across all tools (webjnl, webcv, main site)
6. **Maintainable**: Update YAML files, not code
7. **Future-Proof**: Component system allows adding D3, Plotly, or custom visualizations without refactoring

**Philosophy: "Sophisticated Simplicity"**
- Every pixel is intentional
- Motion is purposeful, not flashy
- Content-first, no distractions
- Fast and accessible
- Easy to maintain

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Create base HTML structure with sidebar + main grid
- [ ] Implement responsive CSS Grid layout
- [ ] Style hero section with metrics
- [ ] Build enhanced sidebar with navigation
- [ ] Add mobile hamburger menu

### Phase 2: Content (Week 2)
- [ ] Design extended YAML schema
- [ ] Migrate existing content to new schema
- [ ] Build card component styles
- [ ] Implement "What I Do" section
- [ ] Add project cards with thumbnails

### Phase 3: Interactivity (Week 3)
- [ ] Set up modular component renderer
- [ ] Add tag filtering system (reuse webjnl)
- [ ] Implement scroll animations (Intersection Observer)
- [ ] Add hover effects and transitions

### Phase 4: Advanced (Week 4)
- [ ] Create first D3.js visualization (publication timeline)
- [ ] Embed interactive demo (if available)
- [ ] Add lazy loading for images and plots
- [ ] Optimize for performance (lighthouse score)

### Phase 5: Polish (Week 5)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility audit (WCAG compliance)
- [ ] SEO optimization
- [ ] Deploy and iterate

---

## Technical Specifications

### File Structure
```
/neve/
├── index.html              # Main landing page
├── data.yml                # All content (profile, projects, pubs, etc.)
├── assets/
│   ├── app.js             # Component renderer + init
│   ├── styles.css         # All styles (modular sections)
│   ├── filters.js         # Tag filtering (from webjnl)
│   ├── animations.js      # Scroll animations
│   └── plots.js           # D3/Plotly loaders
├── demos/                  # Interactive demos
│   └── satoris/
│       └── index.html
├── tools/                  # Tools/projects
│   └── webjnl/
└── webcv/                  # Existing CV
```

### Dependencies (CDN)
```html
<!-- YAML parser -->
<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>

<!-- Markdown parser (if needed for descriptions) -->
<script src="https://cdn.jsdelivr.net/npm/marked@9/marked.min.js"></script>

<!-- D3.js (load dynamically when needed) -->
<script type="module">
  // Loaded only when interactive section is in viewport
  if (document.querySelector('#publication-timeline')) {
    import('https://cdn.jsdelivr.net/npm/d3@7/+esm');
  }
</script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=EB+Garamond&display=swap" rel="stylesheet">
```

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Lighthouse Score**: > 95
- **Total JS Bundle**: < 50KB (excluding D3 if not loaded)
- **Total CSS**: < 30KB
- **Images**: WebP format, lazy loaded

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Future Enhancements (Beyond MVP)

### When You Need Them
1. **Build System** (Vite): Only when bundle size becomes an issue
2. **CMS Integration**: If non-technical collaborators need to edit
3. **Search**: If publications/projects exceed 30 items
4. **Dark Mode**: User preference (simple CSS variables toggle)
5. **Analytics**: Track which projects recruiters view most
6. **Contact Form**: Instead of mailto link (use Netlify Forms or similar)
7. **Blog Migration**: Integrate existing blog with same aesthetic

### Keeping It Minimal
- Don't add features "just in case"
- Every addition must solve a real problem
- Performance > features
- Maintainability > automation

---

## Questions & Answers

**Q: Why card grid instead of traditional academic list?**
A: Recruiters scan visually. Cards with thumbnails convey more information faster than text lists.

**Q: Won't D3.js bloat the page?**
A: Only load when the interactive section is in viewport (lazy loading). Rest of site works without it.

**Q: How to keep data.yml maintainable as it grows?**
A: Split into multiple files (profile.yml, projects.yml, pubs.yml) and load all in app.js.

**Q: What if I want to add a blog later?**
A: Use the same component system. Add `blog_posts` to YAML or read from `/blog/*.md` files.

**Q: How to handle lots of publications?**
A: Show top 5, add "See All Publications" link to separate page, or implement collapsible sections.

**Q: Mobile performance?**
A: Lazy load images, defer D3, use CSS Grid native stacking. Test on real devices.

---

## Closing Thoughts

This design gives you:
- **A unique portfolio** that stands out from typical academic pages
- **Maintainability** through YAML-driven content
- **Future-proofing** with modular components
- **Performance** with no framework overhead
- **Flexibility** to add interactive demos as you build them

**The minimalist philosophy stays intact:**
- No unnecessary animations
- Clean typography
- White space
- Fast load times
- Content-first approach

**But you gain recruiter appeal:**
- Visual hierarchy
- Project showcases
- Interactive demonstrations
- Clear skills and impact

Start with the foundation (Phase 1), then iterate. You can launch with static content and add interactivity later. The component architecture supports growth without refactoring.

---

**Next Steps:**
1. Review this proposal
2. Decide which enhancements to prioritize
3. Start with HTML/CSS structure
4. Migrate content to extended YAML schema
5. Build component renderer
6. Add one interactive element as proof-of-concept
7. Iterate based on feedback

Let me know which parts you want to implement first!
