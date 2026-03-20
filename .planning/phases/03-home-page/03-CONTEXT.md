# Phase 3: Home Page - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Full home page with all sections: hero, stats bar, services/industries grid, value propositions, 5-step process, and testimonials. Prospective clients land here, immediately understand what WorkWiser does, see credible social proof, and have a clear path to book a call. No other pages are built here — only the home page content within the existing BaseLayout shell.

</domain>

<decisions>
## Implementation Decisions

### Hero section
- **Photo:** Use a professional stock photo for now — will be replaced with a real team photo before launch
- **Background:** Claude's Discretion — pick the best hero treatment based on the brand (gradient, solid, or photo-based)
- **Headline:** "We are your Trusted Partners" (H1), "More than a Virtual Assistant agency" (subtitle)
- **Body copy:** Claude drafts professional copy based on requirements
- **CTA buttons:** Claude's Discretion — single yellow "Start delegating" CTA to Calendly, or add a secondary outline button
- **Dot grid pattern:** Claude's Discretion — decide if dot grid works in hero or better in other sections

### Stats bar
- **Numbers:** 300+ Completed Projects, 100+ Satisfied Clients, 10+ Years Experience, 150 Team Members (use for now, user will confirm exact numbers before launch)
- **Animation:** Count-up animation from 0 when section scrolls into view (using IntersectionObserver)
- **Background:** Teal (#26aeb4) with white text

### Services/Industries grid
- **Cards:** 6 cards — Customer Support, Real Estate, Healthcare, Tech Support, Sales, Legal
- **Card detail:** Title + icon + short description (1-2 sentences per service)
- **Link:** "Explore all Roles" link at bottom of section

### Value propositions
- **Heading:** "Grow your vision with talented virtual assistants"
- **Items:** Simplified Hiring, IRS Compliance, Full Contract Management, Customized Roles, Bilingual Talent, Flexible Payroll Options
- **Detail level:** Each with an icon and description

### Process steps
- **Steps:** 5-step flow — Understanding Your Needs → Pre-Qualified Candidates → Client Selection → Quick Onboarding → Boost Productivity
- **Visual:** Numbered steps with connecting flow/arrows

### Testimonials
- **Content:** Placeholder testimonials — Claude creates realistic-sounding placeholders; user replaces with real ones before launch
- **Count:** 3 testimonial cards
- **Card format:** Circular avatar placeholder (initials), quote text, name, and title/company
- **Section heading:** "Real Results Delivered By WorkWiser VA's"

### Section ordering
- Claude's Discretion — pick the best conversion-optimized order for the 6 sections

### Data architecture
- **All text content stored in `src/data/homeContent.ts`** — service descriptions, value prop details, process steps, testimonials, stats numbers
- Easy to update via Claude later without touching component code

### Claude's Discretion
- Hero background treatment (gradient, solid navy, or photo-based with overlay)
- Hero CTA count (single vs primary + secondary)
- Dot grid placement on home page
- Section ordering on the page
- Service card icon choices
- Value prop icon choices
- Process section visual treatment (arrows, numbers, timeline)
- Spacing between sections
- Any additional CTA sections between major sections

</decisions>

<specifics>
## Specific Ideas

- The old WordPress site had stats that showed "0+" because JavaScript wasn't loading correctly — the count-up animation must work reliably (use IntersectionObserver, not scroll event listeners)
- Requirements specify exact copy for headlines, subtitle, and section headers — use these verbatim
- "Explore all Roles" link in services section — this can link to a future Services/Roles page or to the Contact page for now
- Stock photo for hero should depict a professional virtual assistant or remote team — not generic corporate stock

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/layouts/BaseLayout.astro` — Page shell with Header, Footer, font preloads, SEO meta (title, description props)
- `src/components/Header.astro` — Sticky nav with desktop links and mobile slide-out (already has yellow CTA to Calendly)
- `src/components/Footer.astro` — 3-column footer with contact info and social icons
- `src/styles/global.css` — Brand tokens in `@theme {}`: `--color-navy`, `--color-blue`, `--color-teal`, `--color-teal-light`, `--color-yellow`, `--font-heading`, `--font-body`

### Established Patterns
- Astro components in `src/components/`
- Tailwind v4 utility classes via `@theme {}` tokens (e.g., `bg-navy`, `text-teal`, `font-heading`)
- Astro 6 fonts API for font loading (Open Sauce One 700/800, Inter 400/500)
- Vanilla JS in `<script>` tags for client-side behavior (used in Header hamburger toggle)

### Integration Points
- `src/pages/index.astro` — Currently a placeholder wrapped in BaseLayout. Phase 3 replaces the placeholder content with all home page sections.
- No `src/data/` directory exists yet — Phase 3 creates it with `homeContent.ts`

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-home-page*
*Context gathered: 2026-03-20*
