# Phase 3: Home Page - Research

**Researched:** 2026-03-20
**Domain:** Astro 6 component composition, Tailwind v4, IntersectionObserver animations, TypeScript data files
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Hero photo:** Stock photo for now (professional VA/remote team) — user replaces before launch
- **Headline:** "We are your Trusted Partners" (H1), "More than a Virtual Assistant agency" (subtitle) — verbatim
- **CTA:** Yellow "Start delegating" button linking to Calendly (calendly.com/workwiser-info/ceo-client)
- **Stats numbers:** 300+ Completed Projects, 100+ Satisfied Clients, 10+ Years Experience, 150 Team Members
- **Stats animation:** Count-up from 0 using IntersectionObserver (NOT scroll event listeners)
- **Stats background:** Teal (#26aeb4) with white text
- **Services cards:** 6 cards — Customer Support, Real Estate, Healthcare, Tech Support, Sales, Legal
- **Services card detail:** Title + icon + 1-2 sentence description
- **Services link:** "Explore all Roles" at bottom of section
- **Value props heading:** "Grow your vision with talented virtual assistants"
- **Value prop items:** Simplified Hiring, IRS Compliance, Full Contract Management, Customized Roles, Bilingual Talent, Flexible Payroll Options — each with icon + description
- **Process steps:** 5 steps — Understanding Your Needs → Pre-Qualified Candidates → Client Selection → Quick Onboarding → Boost Productivity — numbered with connecting flow
- **Testimonials heading:** "Real Results Delivered By WorkWiser VA's"
- **Testimonials:** 3 placeholder cards — circular avatar (initials), quote, name, title/company
- **Data architecture:** All text content in `src/data/homeContent.ts` — one file for all section content

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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Hero section — subtitle + H1 + body copy + yellow CTA + Calendly link | Hero component pattern, photo placement, Tailwind v4 overlay technique |
| HOME-02 | Stats bar — 4 numbers correctly rendered (not "0+") with count-up animation | IntersectionObserver API pattern, Astro `<script>` tag for vanilla JS |
| HOME-03 | Services/industries section — 6 cards + "Explore all Roles" link | Tailwind v4 responsive grid, SVG icon inline pattern |
| HOME-04 | Value propositions section — 6 differentiators with icons + descriptions | Same grid pattern; icon library or inline SVG choices |
| HOME-05 | 5-step process section — numbered steps with visual flow | CSS counter or manual numbering; connector line technique |
| HOME-06 | Testimonials section — heading + 3 cards with avatar, quote, name, title | Card layout, initials avatar with CSS, accessible blockquote markup |
| HOME-07 | Hero uses real photo (not broken/missing image) | Astro image handling, public/ asset placement, stock photo sources |

</phase_requirements>

---

## Summary

Phase 3 is a content-heavy static rendering task — no external APIs, no dynamic data, no new npm packages required. The stack is already proven: Astro 6 + Tailwind CSS v4 + vanilla JS in `<script>` tags. All six sections are well-defined with locked copy and structure decisions from the context session.

The single highest-risk item is the count-up animation for HOME-02. The old WordPress site showed "0+" because JS wasn't loading or was using scroll listeners that fired too late. IntersectionObserver is the reliable, modern solution — it fires when the element enters the viewport regardless of scroll speed, and it only fires once (using `unobserve` after trigger). This pattern is well-established and requires zero libraries.

The `src/data/homeContent.ts` data file is a clean architectural choice for this project. It centralises all content so the site owner can ask Claude to update copy without touching component markup. The pattern is: export typed const arrays/objects, import them in section components, map over them to render cards.

**Primary recommendation:** Build each section as its own `.astro` component, pull all content from `homeContent.ts`, compose them in `src/pages/index.astro`. Use IntersectionObserver in a `<script>` tag inside `StatsBar.astro` for the count-up. Source hero photo from Unsplash (free, no attribution required for web use).

---

## Standard Stack

### Core (already installed — no new packages needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^6.0.7 | Page/component framework | Already installed; static output |
| tailwindcss | ^4.2.2 | Utility CSS via @tailwindcss/vite | Already installed; brand tokens in @theme |
| @tailwindcss/vite | ^4.2.2 | Vite plugin for Tailwind v4 | Already installed |

### No New Packages Required

All Phase 3 functionality is achievable with the current stack:
- Count-up animation: vanilla JS + IntersectionObserver (browser native, no library)
- Icons: inline SVG elements (no icon library needed; reduces bundle size)
- Hero image: placed in `public/` folder (Astro serves it directly)

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG icons | Heroicons/Phosphor npm package | Package adds installation step; inline SVG is simpler for 12 icons in a static site |
| Vanilla JS count-up | GSAP / CountUp.js library | Library adds ~30KB for a trivial effect; IntersectionObserver is 15 lines of code |
| Unsplash for hero photo | Pexels, Pixabay | All are free; Unsplash has best professional quality for VA/remote work imagery |

**Installation:** No new packages needed.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── Header.astro        # (exists — do not modify)
│   ├── Footer.astro        # (exists — do not modify)
│   ├── Hero.astro          # new — hero section with photo, headline, CTA
│   ├── StatsBar.astro      # new — 4 stats with count-up animation
│   ├── ServicesGrid.astro  # new — 6 service cards
│   ├── ValueProps.astro    # new — 6 value proposition items
│   ├── ProcessSteps.astro  # new — 5-step numbered process
│   └── Testimonials.astro  # new — 3 testimonial cards
├── data/
│   └── homeContent.ts      # new — all home page content
├── layouts/
│   └── BaseLayout.astro    # (exists — do not modify)
├── pages/
│   └── index.astro         # replace placeholder with section imports
└── styles/
    └── global.css          # (exists — do not modify)
```

### Pattern 1: TypeScript Data File

**What:** Export typed arrays of content objects from `src/data/homeContent.ts`. Import in components.
**When to use:** Any section with repeated card content (services, value props, process steps, testimonials).

```typescript
// src/data/homeContent.ts
export interface ServiceCard {
  title: string;
  description: string;
  icon: string; // SVG path string or icon key
}

export const services: ServiceCard[] = [
  {
    title: 'Customer Support',
    description: 'Professional agents who represent your brand with care and expertise.',
    icon: '...',
  },
  // ...
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 300, suffix: '+', label: 'Completed Projects' },
  { value: 100, suffix: '+', label: 'Satisfied Clients' },
  { value: 10,  suffix: '+', label: 'Years Experience' },
  { value: 150, suffix: '',  label: 'Team Members' },
];
```

### Pattern 2: Astro Component Consuming Data

**What:** Import typed data in Astro frontmatter, render with map in template.
**When to use:** Every section component that uses homeContent.ts data.

```astro
---
// src/components/ServicesGrid.astro
import { services } from '../data/homeContent.ts';
---
<section class="py-16 lg:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map(service => (
        <div class="rounded-xl p-6 bg-teal-light border border-teal/20">
          <!-- icon + title + description -->
        </div>
      ))}
    </div>
  </div>
</section>
```

### Pattern 3: IntersectionObserver Count-Up Animation

**What:** Vanilla JS in Astro `<script>` tag. Observe the stats section. On intersection, animate each number from 0 to its target over ~1.5 seconds. Call `unobserve` immediately after firing so it only runs once.
**When to use:** StatsBar.astro only.
**Why IntersectionObserver not scroll events:** Scroll events fire continuously and require debouncing; IntersectionObserver fires exactly once when element enters viewport, even if user scrolls fast. This was the specific failure on the old WordPress site.

```astro
<!-- Inside StatsBar.astro -->
<script>
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target as HTMLElement;
      const target = parseInt(el.dataset.count ?? '0', 10);
      const suffix = el.dataset.suffix ?? '';
      const duration = 1500; // ms
      const start = performance.now();

      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el); // fire only once
    });
  }, { threshold: 0.3 }); // trigger when 30% visible

  counters.forEach(el => observer.observe(el));
</script>
```

HTML pairing:
```html
<span data-count="300" data-suffix="+" class="stat-number">300+</span>
```

The default text content (`300+`) ensures the number shows correctly even if JavaScript is disabled or blocked — this directly prevents the "0+" bug.

### Pattern 4: index.astro Section Composition

**What:** Import all section components in index.astro frontmatter, place them in order.
**When to use:** `src/pages/index.astro` — the final composition step.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import StatsBar from '../components/StatsBar.astro';
import ServicesGrid from '../components/ServicesGrid.astro';
import ValueProps from '../components/ValueProps.astro';
import ProcessSteps from '../components/ProcessSteps.astro';
import Testimonials from '../components/Testimonials.astro';
---
<BaseLayout title="Home" description="...">
  <Hero />
  <StatsBar />
  <ServicesGrid />
  <ValueProps />
  <ProcessSteps />
  <Testimonials />
</BaseLayout>
```

### Pattern 5: Hero Photo with Overlay

**What:** Place stock photo in `public/images/hero.jpg`. Use as CSS background-image or `<img>` tag. For photo-based hero, apply a dark overlay with a semi-transparent div to ensure text remains readable over the image.

```astro
<!-- Photo-based hero with overlay approach -->
<section class="relative min-h-[600px] flex items-center overflow-hidden">
  <img
    src="/images/hero.jpg"
    alt="WorkWiser virtual assistant team"
    class="absolute inset-0 w-full h-full object-cover"
  />
  <div class="absolute inset-0 bg-navy/70"></div>
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- content -->
  </div>
</section>
```

Alternatively, for a gradient/solid navy hero with a photo on the right (split layout — good for conversion), no overlay is needed — photo is contained in a right-side column.

### Anti-Patterns to Avoid

- **Scroll event count-up:** Using `window.addEventListener('scroll', ...)` for animation triggers fires continuously, requires debouncing, and can miss the moment if user scrolls fast. Use IntersectionObserver exclusively.
- **Hardcoded content in components:** Putting stat numbers, service names, or process step copy directly in `.astro` markup instead of `homeContent.ts` makes future updates require component edits. All content goes in the data file.
- **`<img>` without dimensions for hero:** Setting no `width`/`height` on the hero image causes layout shift (CLS). Always set explicit or `style="width:100%"` with aspect-ratio.
- **Astro `<script>` without type safety:** Use `document.querySelectorAll<HTMLElement>` generics to avoid TypeScript errors in Astro's script processing.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Count-up animation easing | Custom cubic-bezier math from scratch | The 15-line pattern above | Ease-out cubic is proven UX; custom easing math has precision bugs |
| Icon system | Custom SVG component abstraction | Inline SVG directly in each card | 12 icons total — abstraction adds complexity with no benefit at this scale |
| Responsive grid | Custom CSS grid media queries | Tailwind `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | Brand tokens already active; Tailwind handles breakpoints correctly |
| Image optimization | Custom image processing | Place JPG in `public/`; Astro serves it as-is | Astro's `<Image>` component is for src/ assets; for `public/` a plain `<img>` is correct |

---

## Common Pitfalls

### Pitfall 1: Stats Show "0+" (the old WordPress bug)
**What goes wrong:** JavaScript animation starts from 0 but the script either never fires, fires before DOM is ready, or the element is not yet in the viewport when the scroll listener checks.
**Why it happens:** Scroll event listeners check position at the moment of scroll, not entry. If the page loads with the stats section already visible (short viewport), the scroll event never fires.
**How to avoid:** Use IntersectionObserver with `threshold: 0.3`. Set the default text content of each `[data-count]` element to the final value (e.g., `300+`) so even without JS the correct number shows. The animation overrides this only when JS runs successfully.
**Warning signs:** Testing only by scrolling slowly. Always test by loading the page with stats already in viewport.

### Pitfall 2: Tailwind v4 Custom Color Classes Not Working
**What goes wrong:** Using `bg-navy` or `text-teal` in a new component file and seeing no styling applied.
**Why it happens:** Tailwind v4 scans files for class usage at build time. If the file extension isn't covered by the default scan glob, classes may not be included.
**How to avoid:** All `.astro` files in `src/` are scanned by default with `@tailwindcss/vite`. Verify the class exists in `global.css` `@theme {}`. Use exact token names: `navy`, `blue`, `teal`, `teal-light`, `yellow`.
**Warning signs:** Styles work in existing components but not new ones — check for typos in class names first.

### Pitfall 3: Hero Image 404
**What goes wrong:** Hero image renders as broken image icon.
**Why it happens:** Photo placed in wrong directory, wrong path, or wrong filename casing (Linux is case-sensitive on Netlify even if Windows is not).
**How to avoid:** Place photo at `public/images/hero.jpg` (create `images/` subdirectory). Reference as `/images/hero.jpg` (leading slash, lowercase). Test on local dev before commit.
**Warning signs:** Image loads locally on Windows but 404s on Netlify — always use lowercase filenames.

### Pitfall 4: IntersectionObserver Type Errors in Astro
**What goes wrong:** TypeScript errors in `<script>` tags when accessing `dataset` properties.
**Why it happens:** `querySelectorAll` returns `NodeList<Element>` and `dataset` is only on `HTMLElement`.
**How to avoid:** Use `querySelectorAll<HTMLElement>('[data-count]')` generic. Cast `entry.target as HTMLElement` when accessing dataset.

### Pitfall 5: Section Ordering Affects Conversion
**What goes wrong:** Poor ordering reduces CTA clicks.
**Why it happens:** Hero is always first (non-negotiable). After hero, stats establish credibility before explaining services. Value props answer "why WorkWiser" after the user knows what services exist.
**Recommended order (conversion-optimized):**
1. Hero (what we do + CTA)
2. Stats (credibility proof)
3. Services (what roles we fill)
4. Value Props (why choose us)
5. Process (how it works)
6. Testimonials (social proof to close)

This order follows the AIDA model: Attention (hero) → Interest (stats + services) → Desire (value props + process) → Action (testimonials + final CTA).

---

## Code Examples

### Hero Section Structure (photo with overlay, recommended)

```astro
---
// src/components/Hero.astro
---
<section class="relative min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden bg-navy">
  <img
    src="/images/hero.jpg"
    alt="WorkWiser virtual assistant professional"
    class="absolute inset-0 w-full h-full object-cover opacity-30"
    width="1920"
    height="1080"
  />
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <p class="text-yellow font-heading font-bold text-sm uppercase tracking-widest mb-3">
      More than a Virtual Assistant agency
    </p>
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight max-w-2xl">
      We are your Trusted Partners
    </h1>
    <p class="mt-6 text-lg text-white/80 max-w-xl">
      <!-- Claude drafts professional body copy -->
    </p>
    <div class="mt-8 flex flex-wrap gap-4">
      <a
        href="https://calendly.com/workwiser-info/ceo-client"
        class="bg-yellow text-navy font-heading font-bold px-7 py-3.5 rounded-md hover:bg-yellow/90 transition-colors"
        target="_blank"
        rel="noopener"
      >
        Start delegating
      </a>
    </div>
  </div>
</section>
```

### Stats Bar with Count-Up

```astro
---
// src/components/StatsBar.astro
import { stats } from '../data/homeContent.ts';
---
<section class="bg-teal py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      {stats.map(stat => (
        <div>
          <p class="text-3xl md:text-4xl font-heading font-bold text-white">
            <span data-count={stat.value} data-suffix={stat.suffix}>
              {stat.value}{stat.suffix}
            </span>
          </p>
          <p class="mt-1 text-white/80 text-sm font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      const target = parseInt(el.dataset.count ?? '0', 10);
      const suffix = el.dataset.suffix ?? '';
      const duration = 1500;
      const start = performance.now();
      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });
  counters.forEach(el => observer.observe(el));
</script>
```

### Testimonial Card with Initials Avatar

```astro
<!-- Inside Testimonials.astro map -->
<figure class="bg-white rounded-xl shadow-sm border border-navy/10 p-6">
  <blockquote class="text-navy/80 text-sm leading-relaxed">
    "{testimonial.quote}"
  </blockquote>
  <figcaption class="mt-4 flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-heading font-bold text-sm">
      {testimonial.initials}
    </div>
    <div>
      <p class="font-heading font-bold text-navy text-sm">{testimonial.name}</p>
      <p class="text-navy/60 text-xs">{testimonial.title}</p>
    </div>
  </figcaption>
</figure>
```

### homeContent.ts Full Structure

```typescript
// src/data/homeContent.ts

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  iconPath: string; // SVG d= path string
}

export interface ValueProp {
  title: string;
  description: string;
  iconPath: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  initials: string;
}

export const stats: Stat[] = [ /* 4 items */ ];
export const services: ServiceCard[] = [ /* 6 items */ ];
export const valueProps: ValueProp[] = [ /* 6 items */ ];
export const processSteps: ProcessStep[] = [ /* 5 items */ ];
export const testimonials: Testimonial[] = [ /* 3 items */ ];
```

---

## Hero Photo Sourcing

**Source:** Unsplash (unsplash.com) — free for commercial use, no attribution required.
**Search terms that yield relevant results:**
- "virtual assistant remote work" — professional person at desk with laptop
- "customer service professional" — clear, friendly face, professional setting
- "remote team meeting" — if a group shot is preferred

**Recommended:** Search for a single professional at a clean desk, good lighting, neutral or warm background. Avoid overly corporate/stock-photo-cliché poses. Download at 1920px wide minimum.

**File placement:** `public/images/hero.jpg` (create the `images/` subdirectory inside `public/`).

Note from STATE.md blocker: "Hero photo must be a real person/team photo — confirm asset is available before Phase 3." Using Unsplash for now satisfies HOME-07 (real photo, not broken/missing). User replaces before launch.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Scroll event for animation trigger | IntersectionObserver | ~2018 (widespread support ~2020) | Reliable firing, runs once, no debounce needed |
| Separate CSS file per component | Tailwind v4 utility classes in markup | Tailwind v4 released 2024 | No context switching; brand tokens via @theme |
| Astro.glob() for data | Direct TypeScript imports from src/data/ | Astro 2+ | Type-safe, IDE autocomplete, simpler |
| `@astrojs/image` for optimization | `<Image>` from `astro:assets` or plain `<img>` for public/ | Astro 3 | `public/` files don't need Astro optimization pipeline |

**Deprecated/outdated:**
- `@astrojs/tailwind` integration: deprecated for Tailwind v4 — this project correctly uses `@tailwindcss/vite` directly
- `window.onscroll` for count-up: the old WordPress approach — replaced by IntersectionObserver

---

## Open Questions

1. **Dot grid pattern placement**
   - What we know: Brand uses a dot grid texture; it appears in some sections on the Canva design
   - What's unclear: No Canva design exists for the home page — exact placement is Claude's discretion
   - Recommendation: Apply as a subtle CSS background-image (radial-gradient dots) on 1-2 sections for texture variety; avoid overuse

2. **"Explore all Roles" link destination**
   - What we know: Services page does not exist yet (Phase 4+ scope)
   - What's unclear: Should it link to Contact or be a dead anchor for now?
   - Recommendation: Link to `/contact` for now with anchor text "Explore all Roles" — keeps the CTA functional without requiring a future page. Note in component comment that it should change to `/services` when that page is built.

3. **Hero CTA: single or double**
   - What we know: Context marks this as Claude's discretion
   - What's unclear: Whether a secondary "Learn more" / "See how it works" button adds value
   - Recommendation: Single yellow "Start delegating" CTA. A second outline button pointing to `#process` or `#services` is common in VA/staffing sites but adds visual complexity. Keep hero focused on the primary conversion action.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — this is a static Astro site with no test runner |
| Config file | None — see Wave 0 |
| Quick run command | `npm run build` (build-time TypeScript errors caught here) |
| Full suite command | `npm run build && npm run preview` (visual inspection at localhost:4321) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HOME-01 | Hero renders with headline, subtitle, CTA button linking to Calendly | Visual / smoke | `npm run build` (no TS errors) | ❌ Wave 0 |
| HOME-02 | Stats bar shows 300+, 100+, 10+, 150 (not 0+); count-up fires | Visual smoke | `npm run build` | ❌ Wave 0 |
| HOME-03 | 6 service cards render; "Explore all Roles" link present | Visual / smoke | `npm run build` | ❌ Wave 0 |
| HOME-04 | 6 value prop items render with icons and descriptions | Visual / smoke | `npm run build` | ❌ Wave 0 |
| HOME-05 | 5 process steps render in order with numbers | Visual / smoke | `npm run build` | ❌ Wave 0 |
| HOME-06 | 3 testimonial cards render with quote, name, title | Visual / smoke | `npm run build` | ❌ Wave 0 |
| HOME-07 | Hero image renders (not broken 404) | Visual / smoke | Manual check at dev server | ❌ Wave 0 |

**Note:** HOME-01 through HOME-06 are all static rendering requirements. The automated command (`npm run build`) catches TypeScript errors and missing imports. Visual correctness requires human inspection at the dev server — there is no automated pixel-checking setup in this project. This is appropriate for a static marketing site at this scale.

The count-up animation (HOME-02) requires testing with JS enabled AND with the stats section initially in viewport (short/wide viewport) — the IntersectionObserver approach handles both cases.

### Sampling Rate

- **Per task commit:** `npm run build` (confirms no TypeScript/Astro errors)
- **Per wave merge:** `npm run build && npm run dev` — visually verify all 6 sections at localhost:4321
- **Phase gate:** All 6 sections visually correct + count-up working before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/data/homeContent.ts` — content data file (created in plan 03-01 Wave 0)
- [ ] `public/images/hero.jpg` — hero photo asset (sourced from Unsplash, placed in Wave 0 of 03-01)
- [ ] No test framework installation needed — `npm run build` is the validation tool for this phase

---

## Sources

### Primary (HIGH confidence)

- Astro 6 documentation — `<script>` tags in components, TypeScript support, `public/` asset handling
- MDN Web Docs — IntersectionObserver API (browser-native, no library)
- Tailwind CSS v4 documentation — `@theme {}` custom properties, responsive grid utilities

### Secondary (MEDIUM confidence)

- Unsplash license terms — verified free for commercial use, no attribution required
- AIDA conversion model for section ordering — well-established marketing framework

### Tertiary (LOW confidence)

- Dot grid CSS technique via radial-gradient — common pattern, not verified against a specific authoritative source

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages already installed and proven in Phase 2
- Architecture: HIGH — Astro component patterns are well-established; data file pattern is standard TypeScript
- IntersectionObserver count-up: HIGH — browser-native API, MDN-documented, directly solves the stated "0+" bug
- Pitfalls: HIGH — HOME-02 pitfall directly documented in project context; others from established Astro/Tailwind patterns
- Hero photo sourcing: MEDIUM — Unsplash license verified; specific image availability depends on search

**Research date:** 2026-03-20
**Valid until:** 2026-06-20 (stable stack — Astro 6, Tailwind v4, all established APIs)
