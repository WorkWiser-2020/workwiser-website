---
phase: 05-contact-us-page
plan: "01"
subsystem: contact-page
tags: [contact, data-layer, hero, sidebar, calendly, count-up]
dependency_graph:
  requires: []
  provides: [contactContent.ts, ContactHero.astro, ContactSidebar.astro, BaseLayout-head-slot]
  affects: [05-02-contact-form]
tech_stack:
  added: []
  patterns: [TypeScript data layer, IntersectionObserver count-up, Calendly popup widget]
key_files:
  created:
    - src/data/contactContent.ts
    - src/components/ContactHero.astro
    - src/components/ContactSidebar.astro
  modified:
    - src/layouts/BaseLayout.astro
decisions:
  - "ContactSidebar count-up script copied verbatim from StatsBar.astro — same selectors and easing guarantee consistent animation behavior site-wide"
  - "BaseLayout head slot placed just before </head> — allows Calendly widget.js injection on contact page only without polluting other pages"
  - "Sidebar cards use white/teal-tinted backgrounds with rounded-2xl and subtle borders — matches site card pattern and works on light page background"
metrics:
  duration_minutes: 2
  completed_date: "2026-03-23"
  tasks_completed: 2
  files_created: 3
  files_modified: 1
requirements_satisfied:
  - CONT-01
  - CONT-05
  - CONT-06
  - CONT-07
---

# Phase 5 Plan 01: Contact Data Layer + Hero + Sidebar Summary

**One-liner:** Contact data layer (contactContent.ts) with typed stats/form-fields, teal-to-navy gradient hero, and vertical sidebar with count-up stats, phone/email links, and Calendly popup booking card.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Data file + BaseLayout head slot | ebec762 | src/data/contactContent.ts, src/layouts/BaseLayout.astro |
| 2 | ContactHero + ContactSidebar components | 0cc52a1 | src/components/ContactHero.astro, src/components/ContactSidebar.astro |

## What Was Built

### contactContent.ts
- `ContactStat` interface and `contactStats` array (4 items: 100+ Clients, 300+ Projects, 10+ Years, 150 Team)
- `contactInfo` object with phone, email, and calendlyUrl
- `FormField` interface and `formFields` array (7 items) — consumed by Plan 02 form component
- Required fields: email and location only; all others optional; message field uses textarea type

### BaseLayout.astro
- Added `<slot name="head" />` just before `</head>` — enables page-specific script injection (used by contact.astro for Calendly widget.js)

### ContactHero.astro
- Clones WhyUsHero.astro exactly: teal-to-navy gradient, W-arrow SVG watermark at opacity-10
- H1: "Let's meet!" — no yellow span (simpler than Why Us)
- Subtitle: "Drop a line or give us a call" in text-white/80
- Yellow CTA: "Book a Free Consultation" linking to Calendly URL with target="_blank" rel="noopener"

### ContactSidebar.astro
- **Section A — Stats:** 4 stats with data-count/data-suffix attributes; IntersectionObserver count-up script copied verbatim from StatsBar.astro (same easing, 1500ms duration, 0.3 threshold)
- **Section B — Contact Info:** Phone (302) 257-5427 and email info@workwiser.io with phone/email SVG icons, wrapped in tel:/mailto: anchor tags, teal icon circles with hover state
- **Section C — Calendly Card:** Compact teal-tinted card with "Book a Free Consultation" heading, brief copy, and button with Calendly.initPopupWidget() onclick

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] src/data/contactContent.ts exists and exports 3 named exports
- [x] src/layouts/BaseLayout.astro contains `<slot name="head" />`
- [x] src/components/ContactHero.astro exists with gradient + W-arrow pattern
- [x] src/components/ContactSidebar.astro exists with data-count attributes, IntersectionObserver, phone/email links, Calendly.initPopupWidget
- [x] Build passes with zero errors (3 pages built in 1.83s)
- [x] Commits ebec762 and 0cc52a1 exist

## Self-Check: PASSED
