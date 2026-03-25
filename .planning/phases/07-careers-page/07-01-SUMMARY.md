---
phase: 07-careers-page
plan: 01
subsystem: ui
tags: [astro, tailwind, netlify-forms, careers, forms, typescript]

# Dependency graph
requires:
  - phase: 05-contact-us-page
    provides: ContactForm AJAX pattern (cloned for CareersForm), Netlify Forms approach
  - phase: 02-brand-system
    provides: gradient hero pattern, Footer navLinks structure, color tokens

provides:
  - Careers page at /careers with applicant-focused content
  - CareersHero component with badge pill and gradient hero (no Calendly)
  - CareersForm component with 8 fields, select support, blur validation, fade-to-success
  - careersContent.ts as typed data source (CareersFormField interface, all exports)
  - Footer Quick Links entry for /careers
affects:
  - 07-careers-page (subsequent plans — Zapier/form pipeline integration)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - CareersFormField interface extends FormField concept with 'select' | 'tel' | 'url' type support
    - HTMLSelectElement widened into TypeScript querySelectorAll union for select blur validation
    - careersContent.ts data-driven rendering pattern (same approach as contactContent.ts)

key-files:
  created:
    - src/data/careersContent.ts
    - src/components/CareersHero.astro
    - src/components/CareersForm.astro
    - src/pages/careers.astro
  modified:
    - src/components/Footer.astro

key-decisions:
  - "CareersForm uses form name 'careers' — separate Netlify Forms bucket from 'contact'"
  - "validateField and querySelectorAll widened to include HTMLSelectElement — required for select blur validation"
  - "CareersHero Apply Now CTA links to #careers-form anchor (smooth scroll within page, no external dependency)"
  - "section id=careers-form added on careers.astro to allow Apply Now CTA anchor link to work"

patterns-established:
  - "Select rendering: both half-width and full-width grid branches must include the select branch"
  - "CareersFormField.half: true pairs fullName+email and phone+location for 2-column layout"

requirements-completed: [CAREER-01, CAREER-02, CAREER-05]

# Metrics
duration: 4min
completed: 2026-03-25
---

# Phase 7 Plan 01: Careers Page Summary

**Careers page at /careers with Netlify Forms AJAX (name="careers"), 8-field application form with select dropdowns and blur validation, and footer Quick Links entry**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-25T10:22:46Z
- **Completed:** 2026-03-25T10:26:02Z
- **Tasks:** 2 of 2 auto tasks complete (checkpoint:human-verify pending)
- **Files modified:** 5

## Accomplishments
- careersContent.ts created as typed data layer with CareersFormField interface, hero text, 8 form fields, role/experience dropdowns, and 3 benefit strings
- CareersForm with full select field rendering, widened TypeScript union for HTMLSelectElement blur validation, and Netlify Forms AJAX (form name "careers")
- /careers page composes hero + "Why Work With WorkWiser?" benefits section + application form
- Footer Quick Links updated with "Join Our Team" -> /careers

## Task Commits

Each task was committed atomically:

1. **Task 1: Create careersContent.ts data file** - `0a04ef9` (feat)
2. **Task 2: Build CareersHero, CareersForm, careers.astro + update Footer** - `3617d30` (feat)

**Plan metadata:** (pending — after checkpoint approval)

## Files Created/Modified
- `src/data/careersContent.ts` - CareersFormField interface, careersHero, roleOptions, experienceOptions, careersFormFields (8 fields), careersBenefits
- `src/components/CareersHero.astro` - Gradient hero with "Now Hiring" badge, applicant-focused headline, Apply Now CTA linking to #careers-form
- `src/components/CareersForm.astro` - Netlify Forms AJAX (name=careers), select rendering for half + full width, HTMLSelectElement validation, fade-to-success
- `src/pages/careers.astro` - /careers page assembling hero + benefits + form
- `src/components/Footer.astro` - Added { href: '/careers', label: 'Join Our Team' } to navLinks

## Decisions Made
- CareersForm uses `name="careers"` — keeps job applications separate from client contact submissions in Netlify's forms bucket
- TypeScript union widened to `HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement` in both `validateField` and `querySelectorAll` — ensures select dropdowns receive blur validation and are included in form-submit validation sweep
- CareersHero "Apply Now" CTA uses `href="#careers-form"` anchor link (page-internal scroll) instead of a Calendly popup — Calendly JS is only loaded on contact.astro per Phase 5 architectural decision
- `id="careers-form"` added to the application form `<section>` in careers.astro to enable the hero CTA anchor scroll target

## Deviations from Plan

None - plan executed exactly as written.

One minor addition: added `id="careers-form"` to the form section in careers.astro to wire up the "Apply Now" CTA anchor in CareersHero — this is a necessary detail the plan implied but didn't explicitly state.

## Issues Encountered
- `npx astro check` produced a Go WASM OOM error unrelated to our files (pre-existing language server issue in this environment). Used `npx astro build` as the verification gate instead — build passed cleanly with zero errors.

## Known Stubs
None — all 8 form fields render with real data from careersContent.ts. No placeholder values flow to UI rendering.

## User Setup Required
None at this stage. Zapier/form pipeline wiring for the "careers" Netlify Forms bucket is a separate concern (future plan in Phase 7).

## Next Phase Readiness
- /careers page is live in the build output
- Netlify will auto-detect the `name="careers"` form on first deploy
- Zapier automation to route career applications to email + Google Sheets is the next step
- Checkpoint: user must visually verify the page, hero copy, dropdowns, validation behavior, and footer link

---
*Phase: 07-careers-page*
*Completed: 2026-03-25*
