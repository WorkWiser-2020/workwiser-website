# Phase 4: About Us + Why Us Pages - Research

**Researched:** 2026-03-23
**Domain:** Astro 6 static content pages — multi-section layouts, accordion JavaScript, reusable components, SVG illustration
**Confidence:** HIGH (all findings verified against existing codebase — no new libraries required)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**About Us page sections (in order from Canva):**
- Hero: Teal-to-blue gradient background, centered white text: "We are passionate about bringing together the right talent and the right opportunities to create successful partnerships!", yellow "Start today" CTA linking to Calendly
- Vision & Mission: Light teal background, two rows — heading on left ("Our vision" / "Our mission"), description in a light blue/gray rounded card on right with bold key phrases. Use Canva copy as starting point, polish grammar and flow.
- Core Values: Teal gradient background with W-arrow brand element as subtle watermark. Center photo (stock — two professionals collaborating). 4 values with circular navy icons arranged around the photo. Combine requirements + Canva values into final set (merge Integrity, Collaboration, Excellence, Innovation with Passion to help others, Drive to growth, Exceptional attitude, Dedication to WorkWiser movement — Claude selects best 4-6 from both sets)
- Our Story: Light background, centered heading "Our Story" in gradient text. Three paragraphs of company history (launched Sept 2020, grown to 150+ team members). Polish the Canva text — improve grammar and flow while preserving key facts and bold phrases.
- Team section: Placeholder grid structure — build the layout with placeholder names/photos/titles that user replaces with real team info before launch. Use Unsplash stock photos as placeholders.
- Strategic Location: Blue gradient background with dot-grid SVG map of the Americas (Claude creates the SVG). Text about Central American agents covering North American time zones.

**Why Us page sections (in order from Canva):**
- Hero: Teal-to-blue gradient, "WorkWiser is your best option" with "your best" in yellow, yellow "Start today" CTA
- 6 Differentiators: Light background, 3x2 grid with navy icons in rounded square containers, title, and paragraph description. Use the Canva copy for differentiator descriptions (Tailored Approach, Continuous Support, Extensive Expertise, Time and Cost Efficiency, Confidentiality and Privacy, Thorough Screening Process). Claude writes professional descriptions.
- Recruitment Process: Light background with dot grid pattern. Split layout — heading "WorkWiser's top-notch recruitment process" + 8 bullet points on left, stock photo of professional with headset on right with blue shape background behind photo. Bullet points: Client consultation, Job analysis and position profiling, Candidate sourcing, Screening and presentation, Skill assessment and testing, Candidate presentation, Client interviews, Client management.
- FAQ: Accordion-style, heading "Frequently asked questions" on left (gradient text), expandable questions on right. Claude writes WorkWiser-specific FAQ questions and answers (replace Virtual Latinos placeholder). Claude decides the count based on common prospect questions.
- Strategic Location: Same section as About Us — reusable component. Appears on both pages.

**Shared patterns:**
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ABOUT-01 | Hero consistent with brand (blue gradient background, navigation) | Centered-hero pattern documented; existing gradient classes confirmed |
| ABOUT-02 | Mission statement — "Create opportunities for businesses and talented professionals alike" | Content placed in aboutContent.ts; no special pattern needed |
| ABOUT-03 | Vision section — "To connect exceptional talent with extraordinary opportunities, empowering individuals and organizations to achieve their full potential" | Vision & Mission two-row layout pattern documented |
| ABOUT-04 | Mission section — "To be the preferred recruitment partner, known for our outstanding service, unwavering commitment, and transformative solutions" | Same Vision & Mission component, second row |
| ABOUT-05 | Core values section — Integrity, Collaboration, Excellence, Innovation with descriptions | Icon-around-photo layout pattern; W-arrow watermark reuse from CtaBanner confirmed |
| ABOUT-06 | Team section (if team photos are available to provide) | Placeholder grid pattern with Unsplash photos; easy swap when real photos arrive |
| WHY-01 | Hero — "WorkWiser is your best option" with brand styling | Centered-hero variant; "your best" in yellow span confirmed |
| WHY-02 | Six differentiators with icons and descriptions | 3x2 grid pattern; icon SVG path approach matches existing homeContent.ts services pattern |
| WHY-03 | CTA section — "Start today" button linking to contact or Calendly | Standard yellow CTA button pattern; Calendly link established |
</phase_requirements>

---

## Summary

Phase 4 builds two pure content pages — About Us and Why Us — within the already-established Astro 6 + Tailwind v4 codebase. No new libraries are needed: all patterns exist in the current code (gradient sections, W-arrow watermark, yellow CTAs, TypeScript data files, vanilla JS for interactive behavior). The main implementation work is layout composition, content writing, and two net-new interactive elements: an FAQ accordion and a dot-grid Americas SVG map.

The biggest complexity points are (1) the Core Values section which requires a photo-plus-floating-icons layout, (2) the custom SVG dot-grid map, and (3) the FAQ accordion requiring vanilla JS `<script>` in the Astro component. All other sections follow established section patterns already proven in Phase 3.

The Strategic Location component is shared between both pages and should be built as a standalone `src/components/StrategicLocation.astro` to avoid duplication.

**Primary recommendation:** Follow the exact homeContent.ts → page component pipeline. Build data files first, then section components, then compose the page files. Tackle the FAQ accordion and SVG map as discrete, contained tasks.

---

## Standard Stack

### Core (already installed — no new packages needed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^6.0.7 | Static page framework | Already in use |
| tailwindcss | ^4.2.2 | Utility styling via `@theme {}` tokens | Already in use |
| @tailwindcss/vite | ^4.2.2 | Tailwind v4 Vite plugin | Already in use |

### No New Dependencies
This phase requires zero new npm packages. All interactive behavior (accordion) uses vanilla JS in Astro `<script>` tags, consistent with the existing Header.astro pattern.

**Installation:**
```bash
# Nothing to install — all dependencies already present
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── data/
│   ├── homeContent.ts          # EXISTS — reference pattern
│   ├── aboutContent.ts         # NEW — About Us content/types
│   └── whyUsContent.ts         # NEW — Why Us content/types
├── components/
│   ├── about/
│   │   ├── AboutHero.astro     # Centered gradient hero
│   │   ├── VisionMission.astro # Two-row teal card layout
│   │   ├── CoreValues.astro    # Photo + floating icons
│   │   ├── OurStory.astro      # Light bg, gradient heading
│   │   └── TeamGrid.astro      # Placeholder team grid
│   ├── why-us/
│   │   ├── WhyUsHero.astro     # Centered gradient hero (yellow text variant)
│   │   ├── Differentiators.astro # 3x2 icon grid
│   │   ├── RecruitmentProcess.astro # Split layout + bullets
│   │   └── FaqAccordion.astro  # Accordion with vanilla JS
│   └── StrategicLocation.astro # SHARED — dot-grid SVG map
└── pages/
    ├── about.astro             # NEW — composes About Us components
    └── why-us.astro            # NEW — composes Why Us components
```

Note: Subdirectories `about/` and `why-us/` are optional — components can live flat in `src/components/` if preferred. Flat is simpler and consistent with Phase 3 (all home components are flat). The planner should choose based on whether co-location adds clarity.

### Pattern 1: Centered Hero (new variant — both pages)
**What:** Full-width gradient section with centered text, not the split layout used on the home page
**When to use:** Interior content pages where a photo is not the primary focal point
**Example:**
```astro
<!-- AboutHero.astro — teal-to-blue gradient, centered content -->
<section class="relative overflow-hidden bg-gradient-to-br from-teal via-blue to-navy py-24 md:py-32">
  <!-- W-arrow watermark (reuse CtaBanner SVG paths) -->
  <div class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
    <svg class="w-[600px] h-[600px] text-white" viewBox="0 0 556.27 519.13" fill="currentColor" aria-hidden="true">
      <!-- same path data as CtaBanner.astro -->
    </svg>
  </div>
  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
      We are passionate about bringing together...
    </h1>
    <div class="mt-8">
      <a href="https://calendly.com/workwiser-info/ceo-client"
         class="inline-block bg-yellow text-navy font-heading font-bold px-7 py-3.5 rounded-full hover:bg-yellow/90 transition-colors"
         target="_blank" rel="noopener">
        Start today
      </a>
    </div>
  </div>
</section>
```

### Pattern 2: Data File (follow homeContent.ts exactly)
**What:** TypeScript file with exported interfaces and arrays; imported into Astro components
**When to use:** All content that can change without touching markup
**Example:**
```typescript
// src/data/aboutContent.ts
export interface CoreValue {
  title: string;
  description: string;
  iconPath: string; // SVG `d` attribute, 24×24 viewBox
}

export const coreValues: CoreValue[] = [
  {
    title: 'Integrity',
    description: 'We operate with honesty and transparency...',
    iconPath: 'M9 12.75L11.25 15 15 9.75M21 12...',
  },
  // ...
];
```

### Pattern 3: Vanilla JS Accordion (FAQ)
**What:** `<script>` tag inside the Astro component handling open/close toggle
**When to use:** Any client-side interactivity — consistent with Header.astro's mobile menu JS
**Example:**
```astro
<!-- FaqAccordion.astro -->
<section>
  <div id="faq-list">
    {faqs.map((faq, i) => (
      <div class="faq-item border-b border-navy/10">
        <button
          class="faq-trigger w-full text-left py-5 flex justify-between items-center font-heading font-bold"
          aria-expanded="false"
          data-index={i}
        >
          {faq.question}
          <svg class="faq-icon w-5 h-5 transition-transform" ...chevron... />
        </button>
        <div class="faq-answer hidden px-0 pb-5 text-navy/80">
          {faq.answer}
        </div>
      </div>
    ))}
  </div>
</section>

<script>
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling as HTMLElement;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.classList.toggle('hidden');
      btn.querySelector('.faq-icon')?.classList.toggle('rotate-180');
    });
  });
</script>
```

### Pattern 4: Gradient Text Headings
**What:** CSS `bg-clip-text` with a teal-to-navy gradient on section headings
**When to use:** Section headings on light backgrounds (Our Story, FAQ heading)
**Example:**
```astro
<h2 class="bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent font-heading font-bold text-4xl">
  Our Story
</h2>
```

### Pattern 5: Shared Component Import
**What:** StrategicLocation.astro imported into both `about.astro` and `why-us.astro` pages
**When to use:** Any section that appears on multiple pages identically
**Example:**
```astro
<!-- about.astro and why-us.astro both import: -->
import StrategicLocation from '../components/StrategicLocation.astro';
```

### Anti-Patterns to Avoid
- **Inline SVG data duplicated across files:** The W-arrow SVG paths already exist in `Hero.astro` and `CtaBanner.astro`. Copy the path strings when needed — do not diverge or simplify them.
- **CSS `@apply` for one-off styles:** Phase 3 uses Tailwind utilities directly in templates. Keep the same approach — no new `@layer components` blocks.
- **External accordion library:** The existing JS pattern in Header.astro is sufficient. Don't add Alpine.js or similar for a single accordion.
- **`aria-expanded` on the wrapper, not the button:** The `aria-expanded` attribute must be on the `<button>` element to be accessible, as shown in Header.astro.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Americas dot-grid map | Interactive map library | Inline SVG (hand-crafted grid of `<circle>` elements) | No interactivity needed — static visual only. SVG is the right tool. |
| Accordion animation | CSS transition library | `hidden` class toggle + CSS `rotate-180` on chevron | Matches existing Header pattern; zero dependencies |
| Stock photos | Custom photography | Unsplash URLs or downloaded images in `public/images/` | Consistent with Hero.astro and CtaBanner.astro approach |
| Icon set library | Heroicons npm package | Inline SVG `d` attribute strings in data files | Matches existing pattern in homeContent.ts `services` array |

**Key insight:** This phase is content-heavy, not technically complex. The patterns are all established. The implementation risk is in getting the visual layout right (Core Values floating icons, dot-grid map) — not in technical choices.

---

## Common Pitfalls

### Pitfall 1: Teal gradient direction
**What goes wrong:** `from-teal to-blue` produces a horizontal gradient; Canva mockup uses a diagonal teal-to-blue-to-navy flow
**Why it happens:** Default Tailwind gradient is left-to-right
**How to avoid:** Use `bg-gradient-to-br from-teal via-blue to-navy` for the hero sections
**Warning signs:** Hero background looks flat or wrong direction compared to home page

### Pitfall 2: `text-transparent` without `bg-clip-text`
**What goes wrong:** Gradient text heading appears invisible
**Why it happens:** `bg-clip-text` and `text-transparent` must both be applied together
**How to avoid:** Always pair: `bg-gradient-to-r from-teal to-navy bg-clip-text text-transparent`
**Warning signs:** Heading disappears on the page

### Pitfall 3: FAQ accordion `hidden` vs `display:none` conflict
**What goes wrong:** Toggling `hidden` class doesn't animate (no height transition possible with `display:none`)
**Why it happens:** Tailwind's `hidden` sets `display: none` — no smooth transition
**How to avoid:** For Phase 4, an instant show/hide (no animation) is acceptable and matches the Header.astro pattern. If smooth animation is desired, use `max-height` transition instead of `hidden`. Keep it simple unless user specifically requests animation.
**Warning signs:** Accordion works but user asks for "smoother" open/close

### Pitfall 4: About page active nav state
**What goes wrong:** Header nav doesn't highlight "About Us" or "Why Us" as active
**Why it happens:** Header.astro renders nav links without checking `Astro.url`
**How to avoid:** This is a known gap noted in the CONTEXT.md. Phase 4 does not need to fix this — it's a Phase 8 (SEO + Brand Polish) concern. Do not block the plan on active nav highlighting.
**Warning signs:** Reviewer asks "why isn't About Us bold in the nav?" — answer: deferred to Phase 8.

### Pitfall 5: Team placeholder photos 404
**What goes wrong:** Unsplash CDN photos embedded as src attributes fail in production due to referrer/hotlink policies
**Why it happens:** Some Unsplash delivery URLs require direct download
**How to avoid:** Download placeholder photos to `public/images/team/` rather than hotlinking from Unsplash. Same pattern as `hero.jpg` and `cta-person.jpg`.
**Warning signs:** Images show broken icon in Netlify preview

### Pitfall 6: Dot-grid SVG map scaling on mobile
**What goes wrong:** SVG map overflows its container on small screens
**Why it happens:** Fixed SVG dimensions without `viewBox` or responsive wrapper
**How to avoid:** Always set `viewBox` and use `width="100%" class="max-w-lg"` pattern. No hardcoded pixel widths on SVG elements.

---

## Code Examples

Verified patterns from existing codebase:

### Gradient background section (from CtaBanner.astro)
```astro
<section class="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-blue">
```
For teal hero variant: replace `from-navy via-navy to-blue` with `from-teal via-blue to-navy`

### W-arrow watermark (from CtaBanner.astro — copy path data verbatim)
```astro
<div class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none">
  <svg class="w-[500px] h-[500px] text-yellow" viewBox="0 0 556.27 519.13" fill="currentColor" aria-hidden="true">
    <path d="M458.7,158.04c-1.3-6.04-2.59-12.08-3.88-18.12..."/>
    <path d="M485.55,44.22l-160.25,88.43..."/>
  </svg>
</div>
```
For Core Values watermark: reduce opacity to `opacity-10` or `opacity-15` on teal bg. For hero watermark: use `text-white` at `opacity-10`.

### Yellow CTA button (from Hero.astro)
```astro
<a
  href="https://calendly.com/workwiser-info/ceo-client"
  class="inline-block bg-yellow text-navy font-heading font-bold px-7 py-3.5 rounded-full hover:bg-yellow/90 transition-colors"
  target="_blank"
  rel="noopener"
>
  Start today
</a>
```

### Icon in rounded square container (adapted from homeContent.ts + ServicesGrid pattern)
```astro
<!-- Navy rounded-square icon container for differentiators -->
<div class="w-14 h-14 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
  <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d={item.iconPath} />
  </svg>
</div>
```

### Brand color tokens (from global.css — confirmed)
```css
--color-navy:       #003c64;
--color-blue:       #0072c9;
--color-teal:       #26aeb4;
--color-teal-light: #effefe;
--color-yellow:     #f3f145;
```
Tailwind usage: `bg-navy`, `text-teal`, `bg-teal-light`, `text-yellow`, `border-blue`, etc.

### Page composition pattern (from index.astro)
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import AboutHero from '../components/AboutHero.astro';
// ... other imports
---
<BaseLayout
  title="About Us — WorkWiser"
  description="Learn about WorkWiser's mission, values, and the team..."
>
  <AboutHero />
  <!-- ... other sections -->
</BaseLayout>
```

### Dot-grid SVG map approach
```astro
<!-- Inline SVG of dots forming North + Central America outline -->
<!-- Use a grid of <circle> elements with r="3" cx/cy spaced 12px apart -->
<!-- Dots that fall within the landmass shape are rendered; others hidden -->
<!-- viewBox="0 0 480 400" — landscape orientation -->
<svg viewBox="0 0 480 400" width="100%" class="max-w-2xl mx-auto" aria-hidden="true">
  <!-- Teal colored dots at strategic coordinates representing the Americas -->
  <circle cx="120" cy="80" r="3" fill="currentColor" />
  <!-- ... grid of ~200 dots tracing landmass outline -->
</svg>
```
The exact dot coordinates should be authored by Claude during implementation — create a recognizable outline of North America + Central America using a dot grid on an approximate 12px spacing.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin only | Tailwind v4 release | Do NOT use `@astrojs/tailwind` — it's deprecated for v4 |
| Astro 5 font loading via npm | Astro 6 native `Font` component + `fontProviders.fontsource()` | Astro 6 | Font preloading already handled in BaseLayout.astro — nothing new needed |
| Separate CSS files per component | Tailwind utilities in template + `@theme {}` tokens | This project's convention | Stick to utilities; no scoped `<style>` blocks unless unavoidable |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Replaced by `@tailwindcss/vite` in this project. Never add it.
- `Astro.glob()`: Replaced by `import.meta.glob()` in Astro 3+. Not relevant here since data is TypeScript files, not markdown.

---

## Open Questions

1. **W-arrow watermark opacity on teal background**
   - What we know: On navy (dark) backgrounds, the watermark uses `opacity-80` with yellow color (CtaBanner). On blue backgrounds it uses `opacity-10` with white (Hero).
   - What's unclear: Teal backgrounds (Core Values section) — what opacity looks right?
   - Recommendation: Use `opacity-10` to `opacity-15` with white color. Adjust visually during implementation.

2. **Calendly vs. /contact as CTA destination for "Start today" buttons**
   - What we know: Hero CTA links to Calendly. WHY-03 says "linking to contact or Calendly".
   - What's unclear: User preference for these interior pages.
   - Recommendation: Use Calendly link (`https://calendly.com/workwiser-info/ceo-client`) consistently — it's the established conversion action. Contact page (Phase 5) isn't built yet.

3. **Core Values layout — icons "arranged around" the photo**
   - What we know: Canva shows a circular arrangement around a center photo.
   - What's unclear: Whether this should be CSS absolute positioning or a CSS grid with a center image.
   - Recommendation: CSS Grid approach — a 3x3 grid where corners hold values and center holds photo — is more responsive than absolute positioning. Planner should note this as discretionary implementation detail.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — this is an Astro static site project |
| Config file | No test config present |
| Quick run command | `npm run build` (verifies Astro compilation with zero TS errors) |
| Full suite command | `npm run build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ABOUT-01 | About page renders hero with gradient background | smoke | `npm run build` | ❌ Wave 0 (page doesn't exist yet) |
| ABOUT-02 | Mission statement text present | smoke | `npm run build` | ❌ Wave 0 |
| ABOUT-03 | Vision text present | smoke | `npm run build` | ❌ Wave 0 |
| ABOUT-04 | Mission section text present | smoke | `npm run build` | ❌ Wave 0 |
| ABOUT-05 | Core values section renders 4 values | smoke | `npm run build` | ❌ Wave 0 |
| ABOUT-06 | Team grid renders placeholder cards | smoke | `npm run build` | ❌ Wave 0 |
| WHY-01 | Why Us page renders with correct hero text | smoke | `npm run build` | ❌ Wave 0 |
| WHY-02 | Six differentiator cards rendered in grid | smoke | `npm run build` | ❌ Wave 0 |
| WHY-03 | "Start today" CTA present and linked | smoke | `npm run build` | ❌ Wave 0 |

**Note on validation:** Because this project has no test framework, the primary verification mechanism is:
1. `npm run build` — confirms zero TypeScript errors and successful Astro compilation
2. Visual inspection at `npm run dev` or Netlify preview — confirms layout, content, and interactivity

### Sampling Rate
- **Per task commit:** `npm run build` (zero errors = green)
- **Per wave merge:** `npm run build` + visual spot-check at localhost
- **Phase gate:** Full `npm run build` green + visual sign-off on both pages before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/pages/about.astro` — covers ABOUT-01 through ABOUT-06 (page doesn't exist yet)
- [ ] `src/pages/why-us.astro` — covers WHY-01 through WHY-03 (page doesn't exist yet)
- [ ] `src/data/aboutContent.ts` — content data file
- [ ] `src/data/whyUsContent.ts` — content data file
- [ ] `src/components/StrategicLocation.astro` — shared component

*(All gaps are expected — Phase 4 creates all of these from scratch)*

---

## Sources

### Primary (HIGH confidence)
- `src/data/homeContent.ts` — TypeScript data file pattern (interface definitions, exported arrays)
- `src/components/CtaBanner.astro` — W-arrow SVG paths (exact path data), gradient background classes, yellow CTA button pattern
- `src/components/Hero.astro` — Gradient section pattern, watermark approach, CTA button
- `src/components/Header.astro` — Vanilla JS `<script>` accordion/toggle pattern, `aria-expanded` usage
- `src/styles/global.css` — All brand color tokens and font variables (confirmed exact values)
- `astro.config.mjs` — Astro 6.0.7, no sitemap/fonts changes needed
- `package.json` — Confirmed zero additional dependencies needed

### Secondary (MEDIUM confidence)
- Astro 6 documentation pattern: page files in `src/pages/` automatically become routes at their filename
- Tailwind v4 `bg-clip-text text-transparent` gradient text: standard utility approach, confirmed available in v4

### Tertiary (LOW confidence)
- Dot-grid SVG map implementation: No reference implementation exists in the codebase — Claude must author the SVG coordinate set during implementation. The approach (inline SVG of circle elements) is sound but the exact coordinates require authoring work.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — entire stack confirmed from package.json and existing source files
- Architecture: HIGH — all patterns traced to existing working code in the repository
- Pitfalls: HIGH — derived from direct code inspection (gradient directions, HTML structure, existing JS patterns)
- Dot-grid SVG: LOW — no prior art in codebase; requires authoring during implementation

**Research date:** 2026-03-23
**Valid until:** 2026-06-23 (stable tech — Astro 6 + Tailwind v4 are not fast-moving at patch level)
