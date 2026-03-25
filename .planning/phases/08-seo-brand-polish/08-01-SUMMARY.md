---
phase: 08-seo-brand-polish
plan: 01
subsystem: ui
tags: [seo, open-graph, twitter-card, favicon, meta-tags, astro]

# Dependency graph
requires:
  - phase: 07-careers-page
    provides: BaseLayout.astro with title/description props already wired to all 6 pages
provides:
  - Open Graph meta tags (og:title, og:description, og:image, og:url, og:type) on every page
  - Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image) on every page
  - Canonical link tag on every page
  - Real WorkWiser W-arrow favicon (navy background, white paths) replacing placeholder text "W"
affects: [09-final-polish, social-sharing, seo-audit]

# Tech tracking
tech-stack:
  added: []
  patterns: [Astro.site for absolute OG image URL, Astro.url.href for canonical and og:url]

key-files:
  created: []
  modified:
    - src/layouts/BaseLayout.astro
    - public/favicon.svg

key-decisions:
  - "Use Astro.site ?? Astro.url as base for og:image and twitter:image absolute URLs (Astro.site is set in astro.config.mjs)"
  - "Place OG/Twitter tags after meta description, before link rel=icon — clean logical grouping"
  - "Favicon uses transform scale(0.0503) with translate(2,3) to fit 556px source into 28px content area with 2px side padding and 3px top padding"

patterns-established:
  - "OG image pattern: new URL('/images/hero.jpg', Astro.site ?? Astro.url).href — absolute URL via configured site"
  - "Canonical pattern: <link rel=canonical href={Astro.url.href} /> — dynamic per-page URL"

requirements-completed: [SEO-01, SEO-02, SEO-05]

# Metrics
duration: 8min
completed: 2026-03-25
---

# Phase 8 Plan 01: SEO + Brand Polish — OG Tags and Favicon Summary

**Open Graph and Twitter Card meta tags added to BaseLayout serving all 6 pages, and placeholder text favicon replaced with real W-arrow brand icon on navy background**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-25T17:10:00Z
- **Completed:** 2026-03-25T17:18:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- All 6 pages now output og:title, og:description, og:image, og:url, og:type meta tags via BaseLayout inheritance
- All 6 pages now output twitter:card, twitter:title, twitter:description, twitter:image meta tags
- Canonical link tag added to every page using Astro.url.href for per-page URL
- OG image resolves to absolute URL `https://rococo-faun-f7353a.netlify.app/images/hero.jpg` via Astro.site
- public/favicon.svg now renders the real W-arrow brand icon (W letterform + paper airplane arrow paths) on navy #003c64 background — placeholder `<text>W</text>` removed

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Open Graph and Twitter Card meta tags to BaseLayout.astro** - `c6abb3d` (feat)
2. **Task 2: Replace placeholder favicon with real W-arrow SVG on navy background** - `70e9b6c` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `src/layouts/BaseLayout.astro` - Added 10 OG/Twitter meta tags and canonical link in head section
- `public/favicon.svg` - Replaced 4-line placeholder with real 9-line SVG embedding W-arrow brand paths

## Decisions Made
- `astro.config.mjs` already had `site: 'https://rococo-faun-f7353a.netlify.app'` set — no change needed; Astro.site resolves correctly
- OG title format `${title} | WorkWiser` matches the existing `<title>` tag format — consistent branding
- Favicon scale factor 0.0503 (28/556.27) with translate(2,3) centers the icon with 2px side padding and 3px top padding — verified visually correct

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — build passed on first attempt after both changes. All 6 pages confirmed to contain og:title in built dist/ HTML.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Social sharing metadata is complete: LinkedIn/Twitter previews will show correct title, description, and hero image for any WorkWiser page
- Favicon brand icon is live: browser tabs will show W-arrow on navy instead of plain text "W"
- SEO-01 (unique meta per page), SEO-02 (Open Graph), and SEO-05 (favicon) requirements are all closed
- Ready for plan 08-02 (component brand polish) and any remaining SEO verification

---
*Phase: 08-seo-brand-polish*
*Completed: 2026-03-25*
