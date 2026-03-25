# Phase 6: Case Studies Page - Research

**Researched:** 2026-03-25
**Domain:** Astro 5 static page with TypeScript data file, Tailwind v4, brand-consistent card layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Case study content: Claude writes 4 realistic placeholder case studies — one per key industry (healthcare, real estate, tech support, customer support)
- User replaces with real client data before launch
- Each card must show: industry, company name/description, challenge, role type, and a key measurable outcome (per CASE-02)
- Hero: Same teal-to-navy gradient pattern as other inner pages (About Us, Why Us, Contact). Consistent brand treatment.
- Bottom CTA: Reuse existing CtaBanner component — change text to direct visitors to Contact Us page
- Page route: `/case-studies`

### Claude's Discretion
- Hero headline and subtitle text
- Card visual styling (shadows, borders, hover effects)
- Exact grid breakpoints and spacing
- Whether outcome stat gets special visual treatment (large number, accent color, etc.)
- Mobile card stacking behavior
- Card detail level — summary card or detailed card with paragraph, pick best density for a B2B recruitment site
- Grid layout — 2x2, single row, or list — pick best arrangement for 4 cards
- Industry tag style — colored pill tag or icon + text, pick best brand-consistent treatment
- Outcome types — pick the most compelling metric per industry (time savings, cost savings, growth, etc.)
- Company names — real-sounding names or anonymous, whichever looks most professional

### Deferred Ideas (OUT OF SCOPE)
- Individual case study detail pages — if needed, add as future phase
- Adding case studies link to main navigation — evaluate during Brand & SEO phase
- Client testimonial quotes within case studies — could enhance credibility, future consideration
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CASE-01 | Case studies listing page with cards — client name/industry, challenge, result summary | Astro page file pattern established in contact.astro and about.astro; card grid established in Differentiators.astro |
| CASE-02 | Each case study card shows: industry, role type, a key measurable outcome (e.g., "Saved 20 hours/week") | TypeScript interface design; outcome stat visual treatment in card markup |
| CASE-03 | Case studies data stored in src/data/caseStudies.ts for easy updates via Claude | Identical pattern to homeContent.ts, aboutContent.ts, whyUsContent.ts, contactContent.ts |
| CASE-04 | CTA at bottom of page linking to Contact Us | CtaBanner.astro exists but is hardcoded to Calendly — needs adjustment or direct CTA section |
</phase_requirements>

---

## Summary

Phase 6 builds a single static listing page (`/case-studies`) using the fully established Astro 5 + Tailwind v4 stack. All patterns are already proven across five prior phases — this phase is an assembly task with creative card design decisions, not an infrastructure task. The only new work is: designing the `CaseStudy` TypeScript interface, writing 4 placeholder case studies, composing a `CaseStudiesHero.astro`, building a `CaseStudiesGrid.astro` card component, and wiring it all together in `src/pages/case-studies.astro`.

The hero pattern is fully established (clone `WhyUsHero.astro` or `ContactHero.astro`). The data file pattern is fully established (clone `whyUsContent.ts` structure). The grid card pattern is well-referenced in `Differentiators.astro` (2-col/3-col responsive grid, rounded-2xl cards, gray-50 background, navy icon containers). The key design decisions are card density and outcome stat treatment — research and precedent from B2B sites favor a medium-density card that surfaces the stat prominently in teal/yellow accent.

The one dependency to check is `CtaBanner.astro`: it is hardcoded with a photo, pricing text, and a Calendly link. Rather than contorting CtaBanner with props, the planner should create a simple, direct CTA section inline in the page or as a new slim `ContactCta.astro` component that links to `/contact`. This avoids complexity and keeps CtaBanner's visual identity intact.

**Primary recommendation:** Build `CaseStudiesHero.astro` (clone of ContactHero), `src/data/caseStudies.ts` with a typed interface, `CaseStudiesGrid.astro` rendering a 2-column responsive grid, and a bottom CTA section pointing to `/contact` — all in one plan wave.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x (project) | Static page generation, component isolation | Already installed, all pages use this |
| Tailwind CSS | v4 (project) | Utility classes, brand tokens via @theme | Already configured in global.css |
| TypeScript | Project baseline | Typed data interfaces, compile-time safety | All data files use TypeScript interfaces |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Heroicons (inline SVG) | n/a (SVG paths) | Industry icons on cards | Used in every data file — industry icons already drawn in homeContent.ts |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static TS data file | Astro Content Collections | Content Collections are appropriate for markdown-heavy blog/article use cases — overkill for 4 structured records |
| Inline CTA section | Reusing CtaBanner | CtaBanner has hardcoded photo + pricing + Calendly link; adapting it adds props complexity for marginal reuse benefit |

**Installation:** No new packages required. All dependencies already installed.

---

## Architecture Patterns

### Recommended File Structure for This Phase
```
src/
├── data/
│   └── caseStudies.ts       # NEW — CaseStudy interface + exported array of 4 studies
├── components/
│   ├── CaseStudiesHero.astro # NEW — teal-to-navy gradient hero (clone of ContactHero pattern)
│   ├── CaseStudiesGrid.astro # NEW — 2-col responsive grid of case study cards
│   └── CaseStudiesCta.astro  # NEW — slim Contact Us CTA (or inline in page)
└── pages/
    └── case-studies.astro    # NEW — page assembly file, route /case-studies
```

### Pattern 1: TypeScript Data File
**What:** Export a typed interface and an array of objects. Components import and iterate.
**When to use:** Any repeating structured content — every prior page uses this exact pattern.
**Example:**
```typescript
// src/data/caseStudies.ts
// Source: established project pattern (homeContent.ts, whyUsContent.ts, etc.)

export interface CaseStudy {
  id: string;                  // slug-safe identifier, e.g. "healthcare-va"
  industry: string;            // e.g. "Healthcare"
  companyName: string;         // e.g. "Meridian Medical Group" or "Anonymous – Healthcare"
  roleType: string;            // e.g. "Medical Administrative VA"
  challenge: string;           // 1-2 sentence description of the business problem
  outcome: string;             // 1-2 sentence description of the result
  outcomeStat: string;         // Short metric, e.g. "Saved 25 hrs/week"
  iconPath: string;            // SVG d-attribute for 24x24 industry icon
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'healthcare-admin',
    industry: 'Healthcare',
    companyName: 'Meridian Medical Group',
    roleType: 'Medical Administrative VA',
    challenge: 'Overloaded front-desk staff spent 30+ hours per week on appointment scheduling, insurance verification, and patient follow-up calls — pulling clinical staff away from patient care.',
    outcome: 'A dedicated WorkWiser VA took over all scheduling and follow-up coordination, freeing the clinical team to focus on patients and reducing no-show rates by 40%.',
    outcomeStat: 'Saved 30 hrs/week',
    iconPath: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  },
  // ... 3 more
];
```

### Pattern 2: Astro Page Assembly
**What:** Page file imports components, passes no per-component data (data is imported inside component).
**When to use:** All inner pages — established in about.astro, why-us.astro, contact.astro.
**Example:**
```astro
---
// src/pages/case-studies.astro
// Source: established project pattern (contact.astro, about.astro)
import BaseLayout from '../layouts/BaseLayout.astro';
import CaseStudiesHero from '../components/CaseStudiesHero.astro';
import CaseStudiesGrid from '../components/CaseStudiesGrid.astro';
import CaseStudiesCta from '../components/CaseStudiesCta.astro';
---
<BaseLayout
  title="Case Studies - WorkWiser"
  description="See how WorkWiser virtual assistants have delivered measurable results for clients in healthcare, real estate, tech support, and customer support."
>
  <CaseStudiesHero />
  <CaseStudiesGrid />
  <CaseStudiesCta />
</BaseLayout>
```

### Pattern 3: Hero Section (Gradient + W-Arrow Watermark)
**What:** Full-width teal-to-navy gradient section with the W-arrow SVG as a right-side watermark at 10% opacity, centered text, and a yellow CTA button.
**When to use:** All inner page heroes — confirmed in WhyUsHero.astro and ContactHero.astro.
**Example:**
```astro
<!-- Source: WhyUsHero.astro / ContactHero.astro — direct clone with new text -->
<section class="relative overflow-hidden bg-gradient-to-br from-teal via-blue to-navy py-24 md:py-32">
  <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none" aria-hidden="true">
    <!-- W-arrow SVG watermark (verbatim from existing heroes) -->
  </div>
  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
      Real Results from <span class="text-yellow">Real Clients</span>
    </h1>
    <p class="mt-6 text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
      See how WorkWiser virtual assistants have helped businesses across industries save time, cut costs, and grow faster.
    </p>
  </div>
</section>
```

### Pattern 4: Card Grid
**What:** Responsive grid using `grid-cols-1 md:grid-cols-2` for 4 cards (2x2 on desktop, stacked on mobile). Cards use `rounded-2xl`, subtle shadow, white background.
**When to use:** 4 cards — 2x2 is the optimal layout (ServicesGrid uses 3-col for 6 items; 2-col works better for 4 with richer card content).
**Example:**
```astro
<!-- Source: Differentiators.astro pattern adapted for case studies -->
<section class="bg-white py-16 md:py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-8">
      {caseStudies.map((study) => (
        <article class="flex flex-col p-6 lg:p-8 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow">
          <!-- Industry pill tag -->
          <!-- Company + role header -->
          <!-- Challenge paragraph -->
          <!-- Outcome stat (visually prominent) -->
          <!-- Outcome summary -->
        </article>
      ))}
    </div>
  </div>
</section>
```

### Anti-Patterns to Avoid
- **Using CtaBanner directly with props:** CtaBanner is hardcoded (photo, pricing, Calendly). Don't hack it — create a slim CTA section that links to `/contact`.
- **Content Collections for 4 records:** Astro Content Collections require `.md`/`.mdx` files and schema config — unnecessary overhead for a small fixed data set.
- **Three-column grid for 4 cards:** Results in an orphaned single card on the last row. Use 2-column for 4 cards.
- **Linking to Calendly from CTA banner:** The case studies page goal is to route to the Contact Us page, not bypass it. CASE-04 specifies "Contact Us" — link to `/contact`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive grid | Custom flexbox/float layout | Tailwind `grid md:grid-cols-2` | Already used in Differentiators, ServicesGrid; grid handles gap, wrap, alignment |
| Brand tokens | Hardcoded hex values | Tailwind brand classes (`text-navy`, `bg-teal`, `text-yellow`) | All tokens defined in `@theme {}` in global.css — use class names |
| Icon rendering | Custom SVG component | Inline SVG with `d={study.iconPath}` | Every existing card component uses this exact pattern |
| Count-up animation | Custom scroll listener | Not needed for this page | Case studies don't require animated stats — static display is correct |

**Key insight:** Phase 6 has no new infrastructure. Every pattern has a working, tested implementation to copy from.

---

## Common Pitfalls

### Pitfall 1: CtaBanner Reuse Mismatch
**What goes wrong:** Plan tries to import CtaBanner and override its content. CtaBanner has hardcoded photo URL, pricing text, and Calendly JS popup — these are baked into markup, not props.
**Why it happens:** CONTEXT.md says "Reuse existing CtaBanner component" but on closer inspection, CtaBanner is tightly coupled to home page pricing/conversion content.
**How to avoid:** Create a new slim `CaseStudiesCta.astro` or inline a simple CTA section in the page. Use `bg-gradient-to-br from-navy via-navy to-blue` + yellow button linking to `/contact`. This is simpler, faster, and avoids introducing conditional rendering complexity into CtaBanner.
**Warning signs:** If the plan imports CtaBanner and mentions props like `ctaText` or `ctaHref` — those props don't exist on the component.

### Pitfall 2: Missing `article` Semantics on Cards
**What goes wrong:** Cards rendered as generic `<div>` elements miss semantic markup opportunity for content that represents standalone case study records.
**Why it happens:** Prior card components (Differentiators) use `<div>` — but those are feature/service descriptions, not records.
**How to avoid:** Wrap each case study card in an `<article>` element. This is correct semantic HTML for a self-contained piece of content.

### Pitfall 3: Outcome Stat Gets Lost Visually
**What goes wrong:** The key measurable outcome (CASE-02 requirement) renders as plain body text with no visual hierarchy — users miss the most persuasive element.
**Why it happens:** Developer treats `outcomeStat` as just another text field.
**How to avoid:** Give `outcomeStat` special visual treatment — large text (text-3xl), teal or yellow accent color (`text-teal` or `text-yellow`), font-heading bold. This is Claude's Discretion per CONTEXT.md.

### Pitfall 4: Industry Tag Not Visually Distinct
**What goes wrong:** Industry label renders as plain text and doesn't read as a category tag — loses the scannable benefit of tagging.
**Why it happens:** Forgetting to style the industry field as a pill/badge.
**How to avoid:** Use a pill tag: `inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full`. This uses the teal brand color without requiring new CSS, and matches B2B SaaS conventions.

### Pitfall 5: Route Mismatch
**What goes wrong:** Page file named `case-studies.astro` but nav or CTA links to `/case_studies` or `/case-study`.
**Why it happens:** Inconsistent naming.
**How to avoid:** File is `src/pages/case-studies.astro` → route is `/case-studies`. All internal links must use `/case-studies` (with hyphen). The CTA at the bottom of the page goes to `/contact` (not back to case-studies).

---

## Code Examples

Verified patterns from existing project source files:

### Industry Pill Tag (new, recommended)
```html
<!-- Brand-consistent teal pill — no new CSS needed -->
<span class="inline-block bg-teal/10 text-teal text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
  {study.industry}
</span>
```

### Outcome Stat (prominent visual treatment)
```html
<!-- Large accent stat — Claude's Discretion per CONTEXT.md -->
<p class="text-3xl font-heading font-bold text-teal mt-4">
  {study.outcomeStat}
</p>
```

### Slim Contact CTA (replaces CtaBanner for this page)
```astro
<!-- src/components/CaseStudiesCta.astro -->
<!-- Source: pattern derived from WhyUsHero CTA button + navy gradient from CtaBanner -->
<section class="bg-gradient-to-br from-navy via-navy to-blue py-16 md:py-20">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl md:text-4xl font-heading font-bold text-white">
      Ready to get started?
    </h2>
    <p class="mt-4 text-white/80 text-lg">
      Tell us about your business and let's find the right virtual assistant for your team.
    </p>
    <div class="mt-8">
      <a
        href="/contact"
        class="inline-block bg-yellow text-navy font-heading font-bold px-7 py-3.5 rounded-full hover:bg-yellow/90 transition-colors"
      >
        Contact Us
      </a>
    </div>
  </div>
</section>
```

### Card Structure (semantic article with all CASE-02 fields)
```astro
<!-- Source: adapted from Differentiators.astro card pattern -->
<article class="flex flex-col p-6 lg:p-8 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow">
  <!-- Industry pill + role type -->
  <div class="flex items-center gap-2 mb-3 flex-wrap">
    <span class="inline-block bg-teal/10 text-teal text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
      {study.industry}
    </span>
    <span class="text-gray-500 text-xs">{study.roleType}</span>
  </div>

  <!-- Company name -->
  <h3 class="text-lg font-heading font-bold text-navy mb-1">
    {study.companyName}
  </h3>

  <!-- Outcome stat (prominent) -->
  <p class="text-3xl font-heading font-bold text-teal my-3">
    {study.outcomeStat}
  </p>

  <!-- Challenge -->
  <p class="text-gray-600 text-sm leading-relaxed mb-3">
    <span class="font-semibold text-navy">Challenge:</span> {study.challenge}
  </p>

  <!-- Outcome -->
  <p class="text-gray-600 text-sm leading-relaxed">
    <span class="font-semibold text-navy">Result:</span> {study.outcome}
  </p>
</article>
```

---

## Recommended Case Study Content

Four placeholder case studies — one per required industry. Outcomes chosen for maximum B2B credibility.

### Healthcare — Medical Administrative VA
- **Company:** Meridian Medical Group (real-sounding private practice name)
- **Challenge:** Front-desk staff overwhelmed with scheduling, insurance verification, and patient follow-up — consuming 30+ hours/week of clinical time
- **Outcome:** WorkWiser VA absorbed all scheduling and follow-up; no-show rate fell 40%, clinical staff reclaimed 30 hours/week
- **Stat:** "Saved 30 hrs/week"
- **Role:** Medical Administrative VA

### Real Estate — Transaction Coordinator VA
- **Company:** Bayside Property Group (real-sounding boutique brokerage)
- **Challenge:** Solo agent closing 15+ deals/month drowning in paperwork — missing deadlines, losing leads to slow follow-up
- **Outcome:** WorkWiser VA handled all transaction coordination and CRM updates; agent increased close rate 25% without hiring in-house staff
- **Stat:** "25% more closes"
- **Role:** Real Estate Transaction VA

### Tech Support — Level 1 Help Desk VA
- **Company:** ClearPath Technologies (mid-size SaaS)
- **Challenge:** Engineering team fielding 200+ repetitive Level 1 support tickets/week, pulling developers away from product work
- **Outcome:** WorkWiser VA team handled Level 1 triage and resolution, escalating only 12% of tickets; engineering reclaimed 20 hours/week per developer
- **Stat:** "88% tickets resolved"
- **Role:** Level 1 Tech Support VA

### Customer Support — Client Success VA
- **Company:** Nexus Logistics Co. (supply chain/operations firm)
- **Challenge:** Customer satisfaction scores declining due to slow response times — average first response taking 6+ hours
- **Outcome:** WorkWiser VAs reduced average first response to under 45 minutes; CSAT scores improved from 71% to 94% within 60 days
- **Stat:** "CSAT: 71% → 94%"
- **Role:** Customer Support VA

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Astro Content Collections for any data | Static TS data files for small structured sets | Astro 2+ | Content Collections add overhead (schema, mdx) not justified for 4 fixed records |
| Tailwind `@apply` for custom components | Direct utility classes | Tailwind v4 | @apply still works but utility-first in markup is the v4 recommended pattern |
| Global CSS for component styles | Astro's scoped `<style>` or Tailwind utilities | Astro 1+ | All existing project components use Tailwind utilities, no component-scoped CSS |

---

## Open Questions

1. **CtaBanner reuse fidelity**
   - What we know: CONTEXT.md says "Reuse existing CtaBanner component — change text to direct visitors to Contact Us page"
   - What's unclear: CtaBanner has no props for text/link — it's a hardcoded component with photo, pricing, and Calendly JS
   - Recommendation: Create a new `CaseStudiesCta.astro` that visually matches CtaBanner's navy gradient aesthetic while linking to `/contact`. This is simpler and avoids props complexity. Document the decision in SUMMARY.md.

2. **Navigation link timing**
   - What we know: CONTEXT.md defers adding case-studies nav link to the Brand & SEO phase
   - What's unclear: Should Phase 6 add the nav link as a bonus or strictly follow the deferral?
   - Recommendation: Strictly defer per CONTEXT.md. The page is fully discoverable via the CTA from other pages. Adding nav changes Header.astro scope and risks nav regression testing.

---

## Validation Architecture

nyquist_validation is enabled (config.json `workflow.nyquist_validation: true`).

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — Astro project uses no automated test framework |
| Config file | none |
| Quick run command | `npx astro build` (build-time type checking) |
| Full suite command | `npx astro build && npx astro preview` (manual visual check) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CASE-01 | `/case-studies` route renders 4 cards with client name, industry, challenge, result | smoke | `npx astro build` (build fails if TypeScript errors or missing imports) | ❌ Wave 0 |
| CASE-02 | Each card displays industry, role type, and measurable outcome | smoke | `npx astro build` | ❌ Wave 0 |
| CASE-03 | `src/data/caseStudies.ts` exists, exports typed interface + array | build | `npx astro build` (TypeScript compilation) | ❌ Wave 0 |
| CASE-04 | CTA at page bottom links to `/contact` | manual | Visual check in browser; inspect `href="/contact"` in built HTML | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx astro build` — catches TypeScript errors, missing imports, broken component props
- **Per wave merge:** `npx astro build` + open browser at `http://localhost:4321/case-studies`
- **Phase gate:** Visual inspection of all 4 cards + CTA link before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] No automated test framework — validation is build + visual for this phase
- [ ] `src/data/caseStudies.ts` — does not exist, Wave 0 task creates it
- [ ] `src/components/CaseStudiesHero.astro` — does not exist, Wave 0 task creates it
- [ ] `src/components/CaseStudiesGrid.astro` — does not exist, Wave 0 task creates it
- [ ] `src/pages/case-studies.astro` — does not exist, Wave 0 task creates it

---

## Sources

### Primary (HIGH confidence)
- Direct file inspection: `src/components/WhyUsHero.astro` — hero gradient pattern confirmed
- Direct file inspection: `src/components/ContactHero.astro` — hero pattern (second example) confirmed
- Direct file inspection: `src/components/CtaBanner.astro` — hardcoded component structure confirmed
- Direct file inspection: `src/components/Differentiators.astro` — card grid pattern confirmed
- Direct file inspection: `src/components/ServicesGrid.astro` — 3-col card grid reference confirmed
- Direct file inspection: `src/data/homeContent.ts`, `aboutContent.ts`, `whyUsContent.ts`, `contactContent.ts` — data file pattern confirmed
- Direct file inspection: `src/styles/global.css` — brand tokens confirmed (navy, blue, teal, teal-light, yellow)
- Direct file inspection: `src/components/Header.astro` — nav links array, no Case Studies link currently

### Secondary (MEDIUM confidence)
- B2B website card design conventions — outcome stat visual prominence supported by standard conversion design patterns (large number, accent color)
- Semantic HTML best practice — `<article>` for self-contained content records (MDN HTML spec)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries and versions confirmed from existing project files
- Architecture: HIGH — all patterns directly confirmed from existing component and data file source
- Content recommendations: HIGH (structure) / MEDIUM (copy) — placeholder copy is Claude-authored creative content
- Pitfalls: HIGH — CtaBanner limitation confirmed by reading actual component source; others derived from direct code analysis

**Research date:** 2026-03-25
**Valid until:** 2026-05-25 (stable Astro 5 + Tailwind v4 ecosystem; no fast-moving dependencies in scope)
