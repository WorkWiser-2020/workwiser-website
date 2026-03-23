---
phase: 04-about-us-why-us-pages
plan: 01
subsystem: content-pages
tags: [about-us, content, components, data-layer, stock-photos]
dependency_graph:
  requires: [src/layouts/BaseLayout.astro, src/styles/global.css, src/components/CtaBanner.astro]
  provides: [src/pages/about.astro, src/components/StrategicLocation.astro, src/data/aboutContent.ts, src/data/whyUsContent.ts]
  affects: [src/pages/why-us.astro]
tech_stack:
  added: []
  patterns: [astro-component-composition, typed-data-files, tailwind-v4-utilities, inline-svg-dot-grid]
key_files:
  created:
    - src/data/aboutContent.ts
    - src/data/whyUsContent.ts
    - src/components/AboutHero.astro
    - src/components/VisionMission.astro
    - src/components/CoreValues.astro
    - src/components/OurStory.astro
    - src/components/TeamGrid.astro
    - src/components/StrategicLocation.astro
    - src/pages/about.astro
    - public/images/team/placeholder-1.jpg
    - public/images/team/placeholder-2.jpg
    - public/images/team/placeholder-3.jpg
    - public/images/team/placeholder-4.jpg
    - public/images/about-values.jpg
  modified: []
decisions:
  - "Selected 6 core values (Integrity, Excellence, Collaboration, Innovation, Dedication, Passion) from combined Canva + requirements sets"
  - "CoreValues uses hidden/md:grid dual rendering for desktop 3-col / mobile stacked layout without JS"
  - "Yellow dots highlight Central America region on dot-grid SVG map to visually anchor WorkWiser's location"
  - "OurStory gradient heading uses inline-block wrapper to prevent text-transparent on block elements breaking layout"
  - "StrategicLocation imports from aboutContent.ts — if whyUsContent.ts later needs different copy, add optional prop override"
metrics:
  duration: "20 min"
  completed_date: "2026-03-23"
  tasks_completed: 2
  files_created: 14
---

# Phase 4 Plan 01: About Us Page Summary

**One-liner:** Full /about page with 6 brand-accurate sections, typed data layer (aboutContent.ts + whyUsContent.ts), shared StrategicLocation component with hand-authored dot-grid Americas SVG, and 5 local Unsplash stock photos.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create data files and download stock photos | 14a73d2 | aboutContent.ts, whyUsContent.ts, 5 images |
| 2 | Build About Us section components and compose about.astro | 481ff8c | 6 components, about.astro |

## What Was Built

### Data Layer

**`src/data/aboutContent.ts`** exports:
- `vision` — heading + text
- `mission` — heading + text + `boldPhrases[]` for `<strong>` rendering
- `coreValues` — 6 values (Integrity, Excellence, Collaboration, Innovation, Dedication, Passion), each with title, description, Heroicons SVG path
- `ourStory` — heading + 3 polished company history paragraphs (Sept 2020 founding, 150+ team, win-win ethos)
- `teamMembers` — 4 placeholder entries pointing to local `/images/team/` files
- `strategicLocation` — heading + description about Central American nearshore talent

**`src/data/whyUsContent.ts`** exports:
- `differentiators` — 6 items (Tailored Approach, Extensive Expertise, Thorough Screening Process, Confidentiality and Privacy, Continuous Support, Time and Cost Efficiency), each with professional description + Heroicons SVG path
- `recruitmentSteps` — 8 string steps matching Canva bullet points
- `faqs` — 8 WorkWiser-specific Q&As (no Virtual Latinos references); covers VA definition, screening process, industries, time to start, time zones, billing, scaling, satisfaction guarantee

### Components

**AboutHero.astro** — `bg-gradient-to-br from-teal via-blue to-navy`, W-arrow watermark at 10% opacity, centered white h1, yellow rounded-full "Start today" CTA → Calendly.

**VisionMission.astro** — `bg-teal-light`, two rows with heading left + white rounded-2xl card right, `set:html` for bold key phrases in Mission text.

**CoreValues.astro** — `bg-gradient-to-br from-teal via-teal to-blue`, W-arrow watermark, 3-column desktop layout (3 values | center photo | 3 values), stacked mobile layout with photo between value groups. Each value has circular `bg-navy` icon container.

**OurStory.astro** — `bg-white`, `max-w-3xl mx-auto`, gradient text heading using `bg-clip-text text-transparent inline-block` (per Pitfall 2 fix), 3 paragraphs.

**TeamGrid.astro** — `bg-gray-50`, `grid grid-cols-2 md:grid-cols-4`, `aspect-square object-cover rounded-xl` photos with SVG fallback on error, placeholder note at bottom.

**StrategicLocation.astro** — `bg-gradient-to-br from-navy via-navy to-blue`, text + CTA left, hand-authored dot-grid SVG right (~180 circles tracing North + Central + South America outlines). Central America dots are yellow-colored to highlight WorkWiser's talent region. `width="100%" class="max-w-lg"` for responsive scaling (per Pitfall 6).

**`src/pages/about.astro`** — BaseLayout wrapper with all 6 sections in order.

### Stock Photos

All 5 photos downloaded from Unsplash to local `public/images/`:
- `team/placeholder-1.jpg` through `placeholder-4.jpg` — professional headshots
- `about-values.jpg` — team collaboration scene

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

All files verified present on disk. Both task commits confirmed in git log.

| Check | Result |
|-------|--------|
| src/data/aboutContent.ts | FOUND |
| src/data/whyUsContent.ts | FOUND |
| src/components/StrategicLocation.astro | FOUND |
| src/pages/about.astro | FOUND |
| public/images/team/placeholder-1.jpg | FOUND |
| commit 14a73d2 | FOUND |
| commit 481ff8c | FOUND |
