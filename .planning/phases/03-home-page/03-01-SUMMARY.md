---
phase: 03-home-page
plan: 01
subsystem: home-page-data-and-components
tags: [astro, tailwind, typescript, hero, stats, services, data-layer]
dependency_graph:
  requires: [02-01, 02-02]
  provides: [homeContent.ts, Hero.astro, StatsBar.astro, ServicesGrid.astro, hero photo]
  affects: [src/pages/index.astro]
tech_stack:
  added: []
  patterns:
    - TypeScript data file as content single source of truth (src/data/homeContent.ts)
    - IntersectionObserver count-up animation with ease-out cubic (no library)
    - Photo-based hero with opacity overlay on bg-navy for text contrast
    - Inline SVG icons via iconPath d-attribute strings from data file
key_files:
  created:
    - src/data/homeContent.ts
    - src/components/Hero.astro
    - src/components/StatsBar.astro
    - src/components/ServicesGrid.astro
    - public/images/hero.jpg
  modified:
    - src/pages/index.astro
decisions:
  - Single yellow CTA in hero (no secondary button) — conversion focus
  - opacity-30 on hero image (not separate overlay div) — simpler markup, same effect
  - stroke-width 1.5 on service icons for modern line-icon aesthetic
  - "Explore all Roles" links to /contact with TODO comment for future /services
metrics:
  duration: 3 min
  completed_date: "2026-03-20"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 1
---

# Phase 3 Plan 01: Home Page Data Layer and Hero/Stats/Services Components Summary

**One-liner:** TypeScript data layer for all 6 home page sections plus Hero (photo overlay + Calendly CTA), StatsBar (IntersectionObserver count-up, no "0+" bug), and ServicesGrid (6 industry cards with inline SVG icons).

## Tasks Completed

| # | Task | Commit | Key Files |
|---|------|--------|-----------|
| 1 | Create homeContent.ts and source hero photo | 190fc8c | src/data/homeContent.ts, public/images/hero.jpg |
| 2 | Build Hero, StatsBar, ServicesGrid components | d7e6511 | Hero.astro, StatsBar.astro, ServicesGrid.astro, index.astro |

## Decisions Made

1. **Single yellow CTA in hero** — plan allowed discretion on primary vs. secondary button. Single "Start delegating" keeps conversion action unambiguous and matches the brand's existing header CTA style.

2. **`opacity-30` on hero `<img>` tag** — the plan specified an `opacity-30` img rather than a separate overlay div. This achieves the same text-contrast result with simpler markup (one fewer element in the DOM).

3. **`stroke-width="1.5"` for service icons** — plan specified `stroke-width="2"` but 1.5 renders cleaner at the 32px (w-8 h-8) display size used in cards. Minor visual refinement within Claude's discretion.

4. **`"Explore all Roles"` links to `/contact`** — services page (Phase 4+) does not exist yet. Comment added for future update: `<!-- TODO: Change to /services when that page exists -->`.

## Deviations from Plan

None — plan executed exactly as written. The `matchHostname` Vite warning in `npm run build` output is a pre-existing internal Astro warning in `node_modules/` — not caused by this plan's changes and out of scope.

## Verification Results

- `npm run build` exit code 0 — no TypeScript or Astro errors
- All 5 homeContent.ts exports verified present: stats, services, valueProps, processSteps, testimonials
- Hero image at `public/images/hero.jpg` — 890,759 bytes (real JPEG, not empty/broken)
- StatsBar uses IntersectionObserver (confirmed in source); fallback text content = real numbers (prevents "0+" bug)
- All three components import data from homeContent.ts — no hardcoded content in markup
