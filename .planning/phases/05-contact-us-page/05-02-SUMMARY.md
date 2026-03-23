---
phase: 05-contact-us-page
plan: "02"
subsystem: ui
tags: [astro, netlify-forms, calendly, tailwind, contact-form, zapier]

# Dependency graph
requires:
  - phase: 05-contact-us-page/05-01
    provides: contactContent.ts data layer, ContactHero, ContactSidebar, BaseLayout head slot

provides:
  - ContactForm.astro with Netlify Forms AJAX submission, inline validation, fade-to-success UX
  - contact.astro page composing hero + two-column form/sidebar layout
  - Calendly popup widget loaded only on contact page via head slot
  - ZAPIER-SETUP-GUIDE.md with step-by-step Netlify email + Zapier/Google Sheets setup

affects:
  - 06-case-studies-page (can reference contact page as secondary CTA)
  - deployment (Netlify Forms must be enabled after first deploy)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Netlify Forms AJAX submission via fetch with application/x-www-form-urlencoded encoding
    - Inline client-side validation using ValidityState API (blur + submit)
    - Fade-out form → fade-in success message on successful submission
    - Page-scoped external scripts via BaseLayout head slot with is:inline

key-files:
  created:
    - src/components/ContactForm.astro
    - src/pages/contact.astro
    - .planning/phases/05-contact-us-page/ZAPIER-SETUP-GUIDE.md
  modified:
    - src/components/ContactHero.astro (hero CTA updated to Calendly popup)

key-decisions:
  - "Netlify Forms AJAX: FormData cast via 'as unknown as Record<string, string>' to URLSearchParams to avoid TypeScript build errors with strict mode"
  - "Hero CTA uses Calendly popup (Calendly.initPopupWidget) instead of direct link — matches sidebar book-a-call button behavior"

patterns-established:
  - "Netlify Forms AJAX pattern: hidden form-name field + honeypot + fetch POST with URL-encoded body"
  - "Page-scoped external CDN scripts injected via <Fragment slot='head'> with is:inline"

requirements-completed: [CONT-02, CONT-03, CONT-04]

# Metrics
duration: 30min
completed: 2026-03-23
---

# Phase 5 Plan 02: Contact Us Page Summary

**Netlify Forms AJAX contact form with inline validation and fade-to-success UX, composed into a responsive two-column hero+form+sidebar contact page with Calendly popup and Zapier setup guide**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-03-23
- **Completed:** 2026-03-23
- **Tasks:** 2 (1 auto + 1 checkpoint)
- **Files modified:** 4

## Accomplishments

- ContactForm.astro renders all 7 fields from contactContent.ts with Netlify Forms attributes, honeypot, AJAX fetch submission, and inline ValidityState validation on blur and submit
- contact.astro composes hero + two-column grid (form 2/3, sidebar 1/3) with Calendly widget.js loaded only on this page via BaseLayout head slot
- ZAPIER-SETUP-GUIDE.md documents complete Netlify email notification setup and Zapier → Google Sheets field mapping for the contact pipeline
- Hero CTA fixed post-checkpoint to use Calendly popup (consistent with sidebar book-a-call button)

## Task Commits

Each task was committed atomically:

1. **Task 1: ContactForm + contact.astro + Zapier guide** - `51e31c4` (feat)
2. **Task 1 follow-up: Hero CTA Calendly popup fix** - `1c05dcd` (fix)
3. **Task 2: Visual checkpoint** - approved by user (no code commit)

## Files Created/Modified

- `src/components/ContactForm.astro` - 7-field Netlify Forms AJAX form with inline validation and fade-to-success message
- `src/pages/contact.astro` - Contact page composing ContactHero, ContactForm, ContactSidebar in two-column layout; loads Calendly widget via head slot
- `.planning/phases/05-contact-us-page/ZAPIER-SETUP-GUIDE.md` - Step-by-step Netlify email notification + Zapier/Google Sheets integration guide
- `src/components/ContactHero.astro` - Hero CTA updated to use Calendly popup widget

## Decisions Made

- **Netlify Forms FormData cast:** `new URLSearchParams(new FormData(form) as unknown as Record<string, string>)` — documented pitfall from RESEARCH; required for TypeScript strict mode build compatibility.
- **Hero CTA → Calendly popup:** Post-checkpoint fix to align hero "Book a Free Call" CTA with sidebar behavior (both now use `Calendly.initPopupWidget`), giving consistent UX across the page.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Hero CTA used direct Calendly link instead of popup**
- **Found during:** Task 2 (visual verification checkpoint)
- **Issue:** ContactHero's "Book a Free Call" button navigated to calendly.com directly in a new tab rather than opening the Calendly popup widget already loaded on the page
- **Fix:** Updated ContactHero.astro hero CTA to call `Calendly.initPopupWidget({ url: '...' })` matching the sidebar's book-a-call behavior
- **Files modified:** src/components/ContactHero.astro
- **Verification:** Build passed, user approved visual checkpoint
- **Committed in:** `1c05dcd`

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Fix required for consistent Calendly UX across hero and sidebar CTAs. No scope creep.

## Issues Encountered

None beyond the hero CTA fix above.

## User Setup Required

**External services require manual configuration after deploy.**

### Netlify Forms (required for contact form to work)
1. Deploy the site to Netlify (first deploy registers the form automatically)
2. Go to Netlify dashboard → Site → Forms — verify "contact" form appears
3. Go to Site → Integrations → Emails & Webhooks → Add notification
4. Set: Form = "contact", Event = "New submission", Recipient = info@workwiser.io

### Zapier → Google Sheets (optional, for lead logging)
See `.planning/phases/05-contact-us-page/ZAPIER-SETUP-GUIDE.md` for full step-by-step instructions.

## Next Phase Readiness

- Contact page fully built and user-approved — primary conversion path (contact form) is complete
- Netlify Forms requires post-deploy dashboard activation (noted as blocker in STATE.md)
- Phase 6 (Case Studies) can proceed; contact page is available as a secondary CTA target

---
*Phase: 05-contact-us-page*
*Completed: 2026-03-23*
