# Phase 6: Case Studies Page - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Listing page showing client case studies as cards. Data lives in a TypeScript file for easy updates. No Canva mockup exists — design follows brand guidelines. No individual case study detail pages — cards show all info directly.

</domain>

<decisions>
## Implementation Decisions

### Case study content
- Claude writes 4 realistic placeholder case studies — one per key industry (healthcare, real estate, tech support, customer support)
- User replaces with real client data before launch
- Outcome types: Claude's Discretion — pick the most compelling metric per industry (time savings, cost savings, growth, etc.)
- Company names: Claude's Discretion — real-sounding names or anonymous, whichever looks most professional

### Card design & layout
- Card detail level: Claude's Discretion — summary card or detailed card with paragraph, pick best density for a B2B recruitment site
- Grid layout: Claude's Discretion — 2x2, single row, or list — pick best arrangement for 4 cards
- Industry tag style: Claude's Discretion — colored pill tag or icon + text, pick best brand-consistent treatment
- Each card must show: industry, company name/description, challenge, role type, and a key measurable outcome (per CASE-02)

### Page structure
- Hero: Same teal-to-navy gradient pattern as other inner pages (About Us, Why Us, Contact). Consistent brand treatment.
- Bottom CTA: Reuse existing CtaBanner component — change text to direct visitors to Contact Us page
- Page route: `/case-studies`

### Claude's Discretion
- Hero headline and subtitle text
- Card visual styling (shadows, borders, hover effects)
- Exact grid breakpoints and spacing
- Whether outcome stat gets special visual treatment (large number, accent color, etc.)
- Mobile card stacking behavior

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `CtaBanner.astro`: Navy gradient CTA section with W-arrow watermark and yellow button — reuse for bottom CTA
- `ServicesGrid.astro`: 6-card grid pattern with icons — reference for card grid layout
- `Differentiators.astro`: 3x2 card grid — another card pattern reference
- `WhyUsHero.astro` / `ContactHero.astro`: Gradient hero pattern to clone for consistency

### Established Patterns
- TypeScript data files in `src/data/` with typed interfaces and exported arrays
- Tailwind v4 utility classes with brand tokens (navy, teal, blue, yellow)
- Card patterns use rounded corners, subtle shadows, white backgrounds

### Integration Points
- `src/pages/case-studies.astro` — new page file, auto-routes to `/case-studies`
- `src/data/caseStudies.ts` — new data file (required by CASE-03)
- Header nav may need a link to Case Studies (currently: Home, About Us, Why Us, Contact)
- CtaBanner can be imported directly with custom text/CTA props or slot content

</code_context>

<specifics>
## Specific Ideas

- No Canva design reference exists — Claude has full creative freedom within brand guidelines
- Case studies should feel credible and specific (not generic marketing fluff)
- 4 industries to cover: healthcare, real estate, tech support, customer support

</specifics>

<deferred>
## Deferred Ideas

- Individual case study detail pages — if needed, add as future phase
- Adding case studies link to main navigation — evaluate during Brand & SEO phase
- Client testimonial quotes within case studies — could enhance credibility, future consideration

</deferred>

---

*Phase: 06-case-studies-page*
*Context gathered: 2026-03-25*
