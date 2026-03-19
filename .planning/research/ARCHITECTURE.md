# Architecture Patterns

**Project:** WorkWiser Marketing Website
**Domain:** BPO / virtual staffing marketing site (Astro + Tailwind CSS)
**Researched:** 2026-03-19
**Confidence:** HIGH (Astro architecture is stable and well-documented; patterns below reflect Astro v4/v5 conventions)

---

## Recommended Architecture

A static Astro site with a single shared layout, page-level routing via the file system, reusable UI components, and content centralized in TypeScript data files. No CMS, no database, no server runtime. All pages build to plain HTML at deploy time.

```
workwiser-site/
├── public/
│   ├── images/           # All images (logo, team photos, client logos, case study photos)
│   ├── fonts/            # Self-hosted brand fonts (if any)
│   └── favicon.ico
│
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro       # Single shared layout (head, nav, footer, slots)
│   │
│   ├── components/
│   │   ├── global/
│   │   │   ├── Header.astro       # Navigation bar + mobile hamburger
│   │   │   └── Footer.astro       # Footer links, social icons, copyright
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.astro         # Headline, subhead, CTA buttons
│   │   │   ├── StatsBar.astro     # Animated counters (clients, years, etc.)
│   │   │   ├── ServicesGrid.astro # Preview cards linking to Services page
│   │   │   ├── WhyUs.astro        # Value propositions / differentiators
│   │   │   └── CalendlyBanner.astro  # Book-a-call CTA strip
│   │   │
│   │   ├── services/
│   │   │   └── ServiceCard.astro  # Reusable card: icon, title, description, CTA
│   │   │
│   │   ├── about/
│   │   │   ├── StorySection.astro # Company origin and mission
│   │   │   └── TeamGrid.astro     # Team member cards
│   │   │
│   │   ├── case-studies/
│   │   │   └── CaseStudyCard.astro  # Client name, challenge, result, stat
│   │   │
│   │   ├── shared/
│   │   │   ├── SectionHeader.astro  # Reusable section title + subtitle block
│   │   │   ├── Button.astro         # Primary / secondary button variants
│   │   │   ├── TestimonialsSlider.astro  # Quote carousel (used on Home + Case Studies)
│   │   │   └── ContactForm.astro    # Contact form (used on Home + Contact page)
│   │   │
│   │   └── forms/
│   │       └── JobApplicationForm.astro  # Separate form for agent applicants
│   │
│   ├── pages/
│   │   ├── index.astro            # Home
│   │   ├── services.astro         # Services
│   │   ├── about.astro            # About / Team
│   │   ├── case-studies.astro     # Case Studies
│   │   ├── careers.astro          # Job application form page
│   │   └── 404.astro              # Custom not-found page
│   │
│   ├── data/
│   │   ├── services.ts            # Array of service objects (title, icon, description, slug)
│   │   ├── team.ts                # Array of team member objects (name, role, photo, bio)
│   │   ├── caseStudies.ts         # Array of case study objects (client, challenge, result, stats)
│   │   ├── testimonials.ts        # Array of testimonial objects (quote, name, company)
│   │   └── siteConfig.ts          # Global config: site name, tagline, phone, email, Calendly URL, social links
│   │
│   └── styles/
│       └── global.css             # Tailwind base imports + any global CSS custom properties
│
├── astro.config.mjs               # Astro config
├── tailwind.config.mjs            # Tailwind config (colors, fonts from brand guide)
├── tsconfig.json
└── package.json
```

---

## Component Boundaries

| Component | Responsibility | Receives Data From | Communicates With |
|-----------|---------------|-------------------|-------------------|
| `BaseLayout.astro` | HTML shell, `<head>`, nav, footer, page slots | Props: `title`, `description`, `ogImage` | Header, Footer |
| `Header.astro` | Top nav bar, mobile menu toggle | `siteConfig.ts` (nav links, logo) | None |
| `Footer.astro` | Footer links, social icons, copyright | `siteConfig.ts` | None |
| `Hero.astro` | Page hero: headline, subhead, CTA | Props from page or inline copy | Button.astro, Calendly URL |
| `StatsBar.astro` | Animated stat counters (clients, hours, etc.) | Inline or data prop | None |
| `ServicesGrid.astro` | 3-4 service preview cards on Home page | `services.ts` (first N items) | ServiceCard.astro |
| `ServiceCard.astro` | Single service: icon, title, blurb, CTA link | Props from parent | None |
| `WhyUs.astro` | Differentiator list/grid | Inline or props | SectionHeader.astro |
| `CalendlyBanner.astro` | CTA strip with Calendly link | `siteConfig.ts` (Calendly URL) | None |
| `TestimonialsSlider.astro` | Rotating testimonial quotes | `testimonials.ts` | None |
| `StorySection.astro` | Company narrative, mission statement | Inline copy | None |
| `TeamGrid.astro` | Grid of team member cards | `team.ts` | None |
| `CaseStudyCard.astro` | Single case study: challenge, result, stat | Props from parent | None |
| `ContactForm.astro` | Email + Google Sheets form via Formspree | `siteConfig.ts` (Formspree endpoint) | External: Formspree |
| `JobApplicationForm.astro` | Separate agent application form | `siteConfig.ts` (Formspree endpoint) | External: Formspree |
| `SectionHeader.astro` | Reusable heading + subtitle block | Props: `title`, `subtitle` | None |
| `Button.astro` | Styled CTA button | Props: `href`, `variant`, `label` | None |

---

## Data Flow

```
siteConfig.ts ──► Header, Footer, CalendlyBanner, ContactForm, JobApplicationForm
services.ts   ──► ServicesGrid (Home) ──► ServiceCard
              ──► services.astro (full list)
team.ts       ──► TeamGrid ──► about.astro
caseStudies.ts──► CaseStudyCard ──► case-studies.astro
testimonials.ts─► TestimonialsSlider ──► index.astro, case-studies.astro

User fills form ──► Formspree ──► Email notification + Google Sheets record
User clicks Calendly link ──► calendly.com/workwiser-info/ceo-client (external)
```

---

## Shared Layout Pattern

Every page uses `BaseLayout.astro` with props for per-page SEO:

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="WorkWiser | Bilingual Virtual Staffing from $9/hr"
  description="US-registered BPO placing bilingual remote staff..."
  ogImage="/images/og-home.jpg"
>
  <Hero />
  <StatsBar />
  <ServicesGrid />
  ...
</BaseLayout>
```

`BaseLayout.astro` contains the `<head>` block, font links, Tailwind base styles, Header, Footer, and a `<slot />` for page content. This is the single source of truth for all HTML shell markup — change it once, all pages update.

---

## SEO Meta Tags Approach

All SEO meta lives in `BaseLayout.astro`. Each page passes its own `title`, `description`, and optionally `ogImage`. Default fallbacks live in `siteConfig.ts`.

```astro
---
// src/layouts/BaseLayout.astro
const {
  title = siteConfig.defaultTitle,
  description = siteConfig.defaultDescription,
  ogImage = '/images/og-default.jpg'
} = Astro.props;
---
<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={Astro.url.href} />
</head>
```

**Confidence: HIGH** — This is the documented Astro pattern for per-page SEO.

---

## Content Organization Approach

**Principle: copy that changes belongs in data files; structural markup belongs in components.**

| Content Type | Location | Who edits it |
|--------------|----------|--------------|
| Site name, tagline, phone, email, social links | `src/data/siteConfig.ts` | Claude Code (owner describes, Claude edits) |
| Services (names, descriptions, icons) | `src/data/services.ts` | Claude Code |
| Team members (name, role, bio, photo) | `src/data/team.ts` | Claude Code |
| Case studies (client, results, stats) | `src/data/caseStudies.ts` | Claude Code |
| Testimonials (quote, name, company) | `src/data/testimonials.ts` | Claude Code |
| Hero headline / page copy | Inline in component props or directly in page `.astro` file | Claude Code |
| Images | `public/images/` | Owner drops files in; Claude updates references |
| Form endpoints (Formspree IDs) | `src/data/siteConfig.ts` | Claude Code (one-time setup) |

This separation means the owner can say "update the case study for Acme Corp — new result is 40% cost reduction" and Claude edits exactly one file (`caseStudies.ts`) without touching any layout or markup.

---

## Page Routing

Astro uses file-based routing. Each `.astro` file in `src/pages/` becomes a route automatically.

| File | URL | Content |
|------|-----|---------|
| `src/pages/index.astro` | `/` | Home — Hero, Stats, Service previews, Why Us, Testimonials, Calendly CTA |
| `src/pages/services.astro` | `/services` | Full service catalog using `services.ts` |
| `src/pages/about.astro` | `/about` | Company story + team grid |
| `src/pages/case-studies.astro` | `/case-studies` | All case study cards + testimonials |
| `src/pages/careers.astro` | `/careers` | Job application form only |
| `src/pages/404.astro` | `/404` | Custom not-found page |

No dynamic routing (`[slug].astro`) is needed in v1. Services are all listed on one page. If individual case study pages are added later, the pattern extends naturally.

---

## Patterns to Follow

### Pattern 1: Data-Driven Sections
Keep repeating content (services, team, testimonials) in typed TypeScript arrays. Components loop over the array to render cards. Adding a new service = add one object to the array; no component editing needed.

```typescript
// src/data/services.ts
export const services = [
  {
    id: 'customer-service',
    title: 'Customer Service',
    description: 'Bilingual agents handling inbound support...',
    icon: 'headset',
    hourlyRate: '$9/hr',
  },
  // ...
];
```

### Pattern 2: Props-First Components
Components receive all variable content via props, with no hardcoded copy inside components. Makes components reusable and content findable in one place.

### Pattern 3: Single Layout for All Pages
One `BaseLayout.astro` wraps every page. Never duplicate `<head>`, `<header>`, or `<footer>` markup across pages. Structural changes (add a nav item, update footer) happen in exactly one file.

### Pattern 4: Tailwind Config as Brand Token Store
The `tailwind.config.mjs` extends theme with WorkWiser brand colors, fonts, and spacing. Components reference `text-brand-blue` rather than hardcoded hex values. Rebranding = edit one config file.

```js
// tailwind.config.mjs
theme: {
  extend: {
    colors: {
      brand: {
        blue: '#1E3A5F',  // example — use actual brand values
        accent: '#F59E0B',
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    }
  }
}
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Hardcoded Copy Inside Components
**What goes wrong:** Changing the hero headline requires editing a component file, which risks breaking layout accidentally.
**Instead:** Pass copy as props from the page file, or pull from a data file.

### Anti-Pattern 2: Multiple Layouts
**What goes wrong:** Duplicated `<head>` blocks get out of sync; SEO changes must be made in multiple places.
**Instead:** One `BaseLayout.astro` always. Variant layouts (e.g., a landing page without nav) use layout composition with named slots.

### Anti-Pattern 3: Inline Styles Instead of Tailwind Classes
**What goes wrong:** Brand colors drift; hard to scan, hard to update.
**Instead:** Define brand tokens in `tailwind.config.mjs`; use utility classes everywhere.

### Anti-Pattern 4: Images Imported Into Components
**What goes wrong:** Images become tightly coupled to component code. Swapping a team photo means editing a component.
**Instead:** Store image paths as strings in data files (`team.ts`). Components reference `member.photo` and render `<img src={member.photo} />`. Owner drops new images in `public/images/`; Claude updates the path string.

### Anti-Pattern 5: One Giant Page File
**What goes wrong:** `index.astro` becomes hundreds of lines of interleaved markup and logic; hard to navigate, hard to maintain.
**Instead:** Each visual section is its own component. `index.astro` is a clean composition of named section components.

---

## Suggested Build Order

Dependencies flow from foundational to specific. Build in this order to avoid blocking:

| Stage | What to Build | Why This Order |
|-------|--------------|----------------|
| 1 | Project scaffold: Astro install, Tailwind config, brand tokens, `public/images/` | Everything depends on this |
| 2 | `BaseLayout.astro` with `<head>`, Header, Footer slots | All pages depend on layout before they can render correctly |
| 3 | `Header.astro` + `Footer.astro` (static, wired to `siteConfig.ts`) | Required by layout; shared by all pages |
| 4 | Data files: `siteConfig.ts`, `services.ts`, `team.ts`, `caseStudies.ts`, `testimonials.ts` | Components in Stage 5 import from these |
| 5 | Shared components: `SectionHeader.astro`, `Button.astro` | Used by nearly every section component |
| 6 | Home page sections: Hero, StatsBar, ServicesGrid, WhyUs, CalendlyBanner, TestimonialsSlider | Home is the highest-priority page |
| 7 | `index.astro` (compose Home sections) | All Home section components must exist first |
| 8 | `ServiceCard.astro` + `services.astro` | Services page depends on card component and data |
| 9 | `about.astro` with StorySection + TeamGrid | Depends on `team.ts` |
| 10 | `CaseStudyCard.astro` + `case-studies.astro` | Depends on `caseStudies.ts` |
| 11 | `ContactForm.astro` (Formspree integration) | Forms need Formspree account set up first |
| 12 | `JobApplicationForm.astro` + `careers.astro` | Same pattern as contact form; build after contact form proven |
| 13 | `404.astro` | Low priority; quick to build |
| 14 | Netlify deploy, domain connection, form testing | Everything must exist before this |

---

## Scalability Considerations

| Concern | v1 (launch) | v2 (future) |
|---------|-------------|-------------|
| New service added | Edit `services.ts` — one line | Same |
| New team member | Edit `team.ts` — one object | Same |
| New case study | Edit `caseStudies.ts` — one object | Same |
| Individual case study pages | Not needed — one page for all | Add `[slug].astro` dynamic route |
| Blog / content marketing | Out of scope | Astro's Content Collections feature handles this natively |
| Client portal | Out of scope | Separate app; link from nav |
| Job board with live listings | Out of scope | Astro can fetch from an external API at build time or use Astro Islands for client-side fetch |

---

## Content Update Workflow for Non-Developer Owner

The owner uses Claude Code as the update mechanism. The file structure above is designed to make that frictionless:

**To update site contact info or Calendly link:**
"Claude, update the phone number in siteConfig.ts to +1-555-NEW-NUM"
→ Claude edits `src/data/siteConfig.ts` — one file, propagates everywhere.

**To add a new service:**
"Claude, add a new service called 'Bookkeeping' — it's for small business owners who need monthly financial management. Starting at $11/hr."
→ Claude adds one object to `src/data/services.ts`. Done.

**To add a case study:**
"Claude, add a case study for TechCorp — they reduced support costs by 35% in 3 months."
→ Claude adds one object to `src/data/caseStudies.ts`.

**To swap a team photo:**
Owner drops new image into `public/images/team/`. Claude updates the `photo` field in `team.ts`.

**To change hero headline:**
"Claude, update the hero headline to 'Bilingual Staff from $9/hr — Hire in 48 Hours'"
→ Claude edits the prop value in `src/pages/index.astro` or the relevant component.

No page structure, no layout, no CSS architecture needs to change for any of the above.

---

## Sources

- Astro v4/v5 official documentation (project structure, layouts, routing) — HIGH confidence; stable patterns unchanged since Astro v2
- Astro file-based routing: `src/pages/` convention is a first-class Astro feature, not a community pattern
- Formspree + static site form pattern: MEDIUM confidence (current as of 2025; verify Formspree free tier limits at implementation time)
- Tailwind config-as-token-store: HIGH confidence; standard practice documented in Tailwind CSS docs
- Data file separation pattern: HIGH confidence; recommended Astro pattern for content-heavy static sites before adding Content Collections
