# Phase 4: About Us + Why Us Pages - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Two content pages: About Us (company story, mission, vision, values, team, strategic location) and Why Us (differentiators, recruitment process, FAQ, strategic location). Both follow Canva mockup designs closely. No forms or integrations — pure content pages within the existing BaseLayout shell.

</domain>

<decisions>
## Implementation Decisions

### About Us page sections (in order from Canva)
- **Hero:** Teal-to-blue gradient background, centered white text: "We are passionate about bringing together the right talent and the right opportunities to create successful partnerships!", yellow "Start today" CTA linking to Calendly
- **Vision & Mission:** Light teal background, two rows — heading on left ("Our vision" / "Our mission"), description in a light blue/gray rounded card on right with bold key phrases. Use Canva copy as starting point, polish grammar and flow.
- **Core Values:** Teal gradient background with W-arrow brand element as subtle watermark. Center photo (stock — two professionals collaborating). 4 values with circular navy icons arranged around the photo. **Combine requirements + Canva values** into final set (merge Integrity, Collaboration, Excellence, Innovation with Passion to help others, Drive to growth, Exceptional attitude, Dedication to WorkWiser movement — Claude selects best 4-6 from both sets)
- **Our Story:** Light background, centered heading "Our Story" in gradient text. Three paragraphs of company history (launched Sept 2020, grown to 150+ team members). **Polish the Canva text** — improve grammar and flow while preserving key facts and bold phrases.
- **Team section:** Placeholder grid structure — build the layout with placeholder names/photos/titles that user replaces with real team info before launch. Use Unsplash stock photos as placeholders.
- **Strategic Location:** Blue gradient background with dot-grid SVG map of the Americas (Claude creates the SVG). Text about Central American agents covering North American time zones.

### Why Us page sections (in order from Canva)
- **Hero:** Teal-to-blue gradient, "WorkWiser is your best option" with "your best" in yellow, yellow "Start today" CTA
- **6 Differentiators:** Light background, 3x2 grid with navy icons in rounded square containers, title, and paragraph description. Use the Canva copy for differentiator descriptions (Tailored Approach, Continuous Support, Extensive Expertise, Time and Cost Efficiency, Confidentiality and Privacy, Thorough Screening Process). Claude writes professional descriptions.
- **Recruitment Process:** Light background with dot grid pattern. Split layout — heading "WorkWiser's top-notch recruitment process" + 8 bullet points on left, stock photo of professional with headset on right with blue shape background behind photo. Bullet points: Client consultation, Job analysis and position profiling, Candidate sourcing, Screening and presentation, Skill assessment and testing, Candidate presentation, Client interviews, Client management.
- **FAQ:** Accordion-style, heading "Frequently asked questions" on left (gradient text), expandable questions on right. **Claude writes WorkWiser-specific FAQ questions and answers** (replace Virtual Latinos placeholder). Claude decides the count based on common prospect questions.
- **Strategic Location:** Same section as About Us — reusable component. Appears on both pages.

### Shared patterns
- Both hero sections use the same teal-to-blue gradient treatment
- Strategic Location section is a shared component used on both pages
- Data files: `src/data/aboutContent.ts` and `src/data/whyUsContent.ts` following the homeContent.ts pattern

### Claude's Discretion
- Final core values selection (best 4-6 from combined requirements + Canva sets)
- Core values icon choices
- FAQ question count and content (write WorkWiser-specific Q&As)
- Why Us differentiator description copy (professional, polished)
- "Our Story" text polishing (improve flow while preserving facts)
- Team placeholder count and layout (grid dimensions)
- Exact dot-grid Americas map SVG design
- Spacing between sections
- Whether recruitment process bullets use icons or simple dots

</decisions>

<specifics>
## Specific Ideas

- The Canva FAQ section was copied from Virtual Latinos — all references to "Virtual Latinos" must be replaced with WorkWiser-specific content
- The "Our Story" text in Canva mentions specific facts: launched September 2020, started with one VA, grown to 150+ team members, win-win environment for businesses and workers
- Core Values section in Canva shows a photo of two people doing a high-five with the W-arrow brand element as a watermark behind them — replicate this visual treatment
- The dot-grid map shows North and Central America made of dots — this is a unique brand element worth getting right
- Headings use a gradient text treatment (teal-to-navy) matching the brand colors — not plain solid color
- The "Strategic Location" section appears on BOTH About Us and Why Us pages — build as a reusable component

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/layouts/BaseLayout.astro` — Page shell with Header, Footer, font preloads, SEO meta
- `src/components/Header.astro` — Sticky nav with desktop links and mobile slide-out (active page highlighting needed)
- `src/components/Footer.astro` — Navy footer with contact info and social icons
- `src/components/Hero.astro` — Home page hero (split layout) — new hero components needed for these pages (centered text, gradient bg)
- `src/components/CtaBanner.astro` — Has the W-arrow brand element SVG pattern — can reference for Strategic Location
- `src/styles/global.css` — Brand tokens: `--color-navy`, `--color-blue`, `--color-teal`, `--color-teal-light`, `--color-yellow`, `--font-heading`, `--font-body`

### Established Patterns
- Astro components in `src/components/`
- Tailwind v4 utility classes via `@theme {}` tokens
- Data files in `src/data/` (TypeScript with exported typed arrays/objects)
- Vanilla JS in `<script>` tags for client-side behavior (FAQ accordion will need this)
- Unsplash stock photos in `public/images/`

### Integration Points
- `src/pages/about.astro` — Does not exist yet, Phase 4 creates it
- `src/pages/why-us.astro` — Does not exist yet, Phase 4 creates it
- Header nav links already point to `/about` and `/why-us` — pages need to exist at those paths

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-about-us-why-us-pages*
*Context gathered: 2026-03-23*
