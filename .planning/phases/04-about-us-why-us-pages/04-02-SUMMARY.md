---
phase: 04-about-us-why-us-pages
plan: 02
subsystem: content-pages
tags: [why-us, faq-accordion, differentiators, recruitment-process, shared-component]
dependency_graph:
  requires: [src/data/whyUsContent.ts, src/components/StrategicLocation.astro, src/layouts/BaseLayout.astro]
  provides: [src/pages/why-us.astro, src/components/WhyUsHero.astro, src/components/Differentiators.astro, src/components/RecruitmentProcess.astro, src/components/FaqAccordion.astro]
  affects: []
tech_stack:
  added: []
  patterns: [astro-component-composition, vanilla-js-accordion, aria-expanded-accessibility, inline-svg-dot-pattern, tailwind-v4-utilities]
key_files:
  created:
    - src/components/WhyUsHero.astro
    - src/components/Differentiators.astro
    - src/components/RecruitmentProcess.astro
    - src/components/FaqAccordion.astro
    - src/pages/why-us.astro
    - public/images/recruitment-professional.jpg
  modified: []
decisions:
  - "FAQ accordion uses Tailwind hidden class for instant toggle (no animation) — per RESEARCH recommendation and avoids transition pitfalls"
  - "First FAQ item starts open by default to prime user engagement before interaction"
  - "RecruitmentProcess uses inline SVG dot-grid pattern via CSS <pattern> element — cleaner than repeating circle elements"
  - "Numbered circles for recruitment steps (not icons) — clarity over decoration for ordered process"
metrics:
  duration: "2 min"
  completed_date: "2026-03-23"
  tasks_completed: 2
  files_created: 6
---

# Phase 4 Plan 02: Why Us Page Summary

**One-liner:** Full /why-us page with 5 sections (gradient hero with yellow "your best" text, 3x2 differentiator cards, dot-grid recruitment process with stock photo, accessible vanilla-JS FAQ accordion, shared StrategicLocation component), building clean alongside index and about.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Build Why Us section components and download stock photo | e0486b1 | WhyUsHero.astro, Differentiators.astro, RecruitmentProcess.astro, FaqAccordion.astro, recruitment-professional.jpg |
| 2 | Compose why-us.astro page and verify full build | 01189ca | why-us.astro |

## What Was Built

### Components

**WhyUsHero.astro** — `bg-gradient-to-br from-teal via-blue to-navy`, identical gradient to AboutHero, W-arrow watermark at 10% opacity. `<h1>` reads "WorkWiser is your best option" with `<span class="text-yellow">your best</span>`. Yellow "Start today" CTA → `calendly.com/workwiser-info/ceo-client` with `rel="noopener"`. Includes subtitle paragraph for context.

**Differentiators.astro** — `bg-white` background with centered section heading "Why Choose WorkWiser". `grid md:grid-cols-2 lg:grid-cols-3 gap-8` responsive layout. Each card: `w-14 h-14 rounded-xl bg-navy flex items-center justify-center` icon container with white SVG icon, `font-heading font-bold` title, gray description text. Maps over `differentiators` array from `whyUsContent.ts`.

**RecruitmentProcess.astro** — `bg-gray-50` with inline SVG `<pattern>` dot-grid overlay (teal circles at 30% opacity). `md:grid md:grid-cols-2 gap-12 items-center` split layout. Left: gradient text heading + `<ol>` with navy numbered circles for each of the 8 `recruitmentSteps`. Right: stock photo with absolute `bg-blue rounded-2xl` decorative shape offset behind it. Maps over `recruitmentSteps` from `whyUsContent.ts`.

**FaqAccordion.astro** — `bg-white`, `md:grid-cols-[1fr_2fr]` layout with gradient heading "Frequently asked questions" on left, accordion on right. Each item: `<button class="faq-trigger">` with `aria-expanded`, question text, chevron SVG with `rotate-180` transition. Answer `<div class="faq-answer">` starts with `hidden` class (except first item which starts open). Vanilla JS `<script>` tag: `querySelectorAll('.faq-trigger')` → click toggles `aria-expanded`, toggles `hidden` on next sibling, toggles `rotate-180` on chevron. Maps over `faqs` from `whyUsContent.ts`.

**`src/pages/why-us.astro`** — Exact composition pattern from plan: BaseLayout + 5 sections in order. `StrategicLocation` reused from Plan 01 with zero duplication.

### Stock Photo

`public/images/recruitment-professional.jpg` — Professional with headset downloaded from Unsplash (107KB local file). Used in RecruitmentProcess right column.

## Build Result

```
3 page(s) built in 1.16s
- /index.html
- /about/index.html
- /why-us/index.html
Exit code: 0 (zero errors)
```

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| src/pages/why-us.astro | FOUND |
| src/components/WhyUsHero.astro | FOUND |
| src/components/Differentiators.astro | FOUND |
| src/components/RecruitmentProcess.astro | FOUND |
| src/components/FaqAccordion.astro | FOUND |
| public/images/recruitment-professional.jpg | FOUND |
| aria-expanded in FaqAccordion.astro | 5 occurrences |
| Calendly links in WhyUsHero + StrategicLocation | FOUND |
| StrategicLocation imported in why-us.astro | FOUND |
| commit e0486b1 | FOUND |
| commit 01189ca | FOUND |
| npm run build exit code | 0 |
