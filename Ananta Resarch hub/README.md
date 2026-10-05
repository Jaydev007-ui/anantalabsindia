# Ananta Labs Research & Innovation Hub

> **Research. Engineer. Innovate.**  
> *Exploring ideas. Engineering solutions. Documenting innovation.*

Official digital R&D and knowledge platform for **Ananta Labs India**.

---

## 1. Executive Summary & Purpose

The **Ananta Labs Research & Innovation Hub** is an engineering-first digital institution designed to showcase Ananta Labs' original inventions, experimental data, physical prototypes, and mathematical tools.

- **Primary URL Deployment Target:** `anantalabsindia.org/research`
- **Target Audience:** Engineers, researchers, university faculties, municipal corporations, startups, investors, and industrial technology partners.
- **Model:** Not a third-party submission journal. Ananta Labs publishes, controls, and validates all core research content.

---

## 2. Technology Stack

- **Core Framework:** React 19 + TypeScript (Strict typing for all research schemas)
- **Bundler & Build Tool:** Vite 8 (Sub-second HMR and production builds with Rollup code-splitting)
- **Styling System:** Tailwind CSS v4 (Modern CSS-first architecture with custom CAD grids and responsive dark palette)
- **Mathematical Typography:** KaTeX (Instant, accessible LaTeX rendering for engineering equations)
- **Icons & Visuals:** Lucide React + HTML5 Interactive Canvas for geometric CAD simulations
- **Routing:** React Router v7 configured for base path `/research` with root fallback
- **State & Persistence:** LocalStorage-backed CMS store with complete JSON export and restore capabilities

---

## 3. Site Map & Route Hierarchy

| Route | View Name | Purpose |
|---|---|---|
| `/research` | **Homepage** | Hero visual, dynamic statistics, featured research, areas overview, tools preview |
| `/research/projects` | **Research Registry** | Searchable directory of all projects with area, status, and year filters |
| `/research/project/:slug` | **Research Project Document** | Structured scientific paper: abstract, methodology, metrics, citations, PDF download |
| `/research/areas` | **Research Areas** | Expandable taxonomy: AI, Mechanical, Healthcare, Industry 4.0, IoT, Sustainable |
| `/research/archive` | **Research Archive** | Chronological index organized by publication year (2026, 2025, 2024...) |
| `/research/explainers` | **Research Explained** | High-traffic technical primers (YOLO, Computer Vision, Heat Sinks, Industry 4.0) |
| `/research/explainer/:slug` | **Primer Detail** | Deep educational article with mathematical formulations and internal project links |
| `/research/tools` | **Engineering Tools** | Suite of 10 client-side calculators (Torque, Reynolds, Thermal Resistance, etc.) |
| `/research/tools/:slug` | **Calculator Runner** | Interactive input sliders, instant calculation, governing formula, and assumptions |
| `/research/knowledge-base` | **Knowledge Base** | Encyclopedia entries detailing definitions, key concepts, advantages, and limits |
| `/research/knowledge-base/:slug`| **Knowledge Topic** | Full technical encyclopedia entry |
| `/research/experiments` | **Experiments Hub** | Empirical studies: equipment lists, variables, procedures, and interactive graphs |
| `/research/experiments/:slug` | **Experiment Detail** | Complete laboratory log with interactive data point exploration and sensor readings |
| `/research/briefs` | **Research Briefs** | 3-minute executive summaries of original discoveries |
| `/research/briefs/:slug` | **Brief Detail** | Key finding, why it matters, and technical insight |
| `/research/trends` | **Technology Trends** | Rigorous horizon scans distinguishing external trends from internal R&D |
| `/research/researchers` | **Researchers Directory**| Profiles of lead inventors and engineering fellows |
| `/research/researcher/:slug` | **Researcher Profile** | Jaydev Zala and fellows with ORCID, Google Scholar, patents, and project links |
| `/research/timeline` | **R&D Timeline** | Interactive chronological roadmap from 2023 through 2026 |
| `/research/search` | **Search Hub** | Global multi-entity search engine with live keyboard shortcut (`Ctrl+K`) |
| `/research/about` | **About Our Research** | Institutional vision, lab facilities, and reproducibility policies |
| `/research/philosophy` | **Research Philosophy** | The 4 engineering tenets and first-principles methodology |
| `/research/contact` | **Contact & Collaborate**| Lead capture for joint R&D, bespoke engineering, and IP licensing |
| `/research/ethics` | **Research Ethics** | Data integrity, medical cadaveric guidelines, and citizen privacy rules |
| `/research/corrections` | **Correction Policy** | Transparent errata protocol and reporting process |
| `/research/privacy` | **Privacy Policy** | Client-side privacy and data handling disclosures |
| `/research/terms` | **Terms of Use** | IP ownership, copyright, and academic citation formats |
| `/research/admin` | **Admin CMS Portal** | Content creation, live statistics management, lead viewer, and JSON sync |

---

## 4. How to Run Locally

### Prerequisites
- Node.js LTS (v20 or v24)
- npm or pnpm

### Development Server
```bash
npm install
npm run dev
```
Visit `http://localhost:5173/research` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 5. Deployment Under `anantalabsindia.org/research`

### Option A: Reverse Proxy (Nginx)
If your primary website is running on Nginx and the research hub is served via a Node container or static directory:

```nginx
# Under server block for anantalabsindia.org:
location /research {
    alias /var/www/ananta-research-hub/dist;
    index index.html;
    try_files $uri $uri/ /research/index.html;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

### Option B: Cloudflare Pages / Vercel / Netlify
1. Set the root build command to `npm run build`.
2. Set output directory to `dist`.
3. Configure `_redirects` or `vercel.json` rewrites:
```json
{
  "rewrites": [{ "source": "/research/(.*)", "destination": "/index.html" }]
}
```

---

## 6. Admin Portal & CMS Access

- Navigate to `/research/admin`.
- Default Development PIN: `ananta2026` (or `admin`).
- Features available:
  - Add & edit research projects (abstract, methodology, metrics, status, patents).
  - Edit dynamic homepage statistics (projects, patents, researchers, studies).
  - View inbound collaboration leads submitted through platform CTAs.
  - Export complete platform content as a single JSON file.
  - Import JSON to synchronize or restore across environments.
