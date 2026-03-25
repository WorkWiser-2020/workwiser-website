---
phase: 07-careers-page
plan: 02
subsystem: docs
tags: [zapier, netlify-forms, google-sheets, careers, setup-guide]

# Dependency graph
requires:
  - phase: 07-careers-page
    plan: 01
    provides: CareersForm with name="careers" Netlify Forms registration, 8 field IDs
  - phase: 05-contact-us-page
    provides: ZAPIER-SETUP-GUIDE.md structure and writing style reference

provides:
  - CAREERS-ZAPIER-SETUP-GUIDE.md for setting up careers application pipeline
  - Step-by-step Netlify email notification config (recruitment@workwiser.io)
  - Step-by-step Zapier Zap config (careers form -> Website Applications tab)

affects:
  - None — documentation artifact only; no code changes

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Zapier Netlify trigger scoped to specific form name (not "All forms") keeps careers and contact pipelines isolated

key-files:
  created:
    - .planning/phases/07-careers-page/CAREERS-ZAPIER-SETUP-GUIDE.md
  modified: []

key-decisions:
  - "Guide scopes Zapier trigger to form name 'careers' (not 'All forms') — isolates job applications from client contact submissions"
  - "Prerequisites section instructs user to create 'Website Applications' tab before Zap setup — prevents tab-not-visible issue at Zapier auth time"
  - "Email recipient is recruitment@workwiser.io (not info@workwiser.io) — correct routing for job applications"

requirements-completed: [CAREER-03, CAREER-04]

# Metrics
duration: 5min
completed: 2026-03-25
---

# Phase 7 Plan 02: Careers Zapier Setup Guide Summary

**Step-by-step Zapier + Netlify setup guide routing careers applications to recruitment@workwiser.io email and the "Website Applications" Google Sheet tab, scoped to the 'careers' form name to keep job applications isolated from client contact submissions**

## Performance

- **Duration:** 5 min
- **Completed:** 2026-03-25
- **Tasks:** 1 of 1 complete
- **Files created:** 1

## Accomplishments

- CAREERS-ZAPIER-SETUP-GUIDE.md written following Phase 5 guide structure and plain numbered-step style
- Prerequisites section instructs user to create "Website Applications" tab before Zap setup (critical ordering requirement)
- Part 1: Netlify email notifications configured to `recruitment@workwiser.io` for form `careers`
- Part 2: Zapier Zap scoped to `careers` form (not "All forms") with 8-field mapping table matching careersContent.ts field IDs exactly
- Troubleshooting section covers tab-not-visible pitfall and "All forms" mixing pitfall from RESEARCH.md

## Task Commits

1. **Task 1: Write CAREERS-ZAPIER-SETUP-GUIDE.md** - `180aeb3` (feat)

## Files Created

- `.planning/phases/07-careers-page/CAREERS-ZAPIER-SETUP-GUIDE.md` - Full setup guide with prerequisites, Part 1 (Netlify email), Part 2 (Zapier), and troubleshooting

## Decisions Made

- Guide scopes Zapier trigger to form name `careers` (not "All forms") — keeps job applications separate from client enquiries in both Netlify and Zapier
- Prerequisites section placed before both Part 1 and Part 2 — "Website Applications" tab must exist before Zapier auth reads worksheet list
- Email recipient `recruitment@workwiser.io` used throughout (not `info@workwiser.io`) — correct destination for HR routing
- Field mapping table uses exact IDs from careersContent.ts: `fullName`, `email`, `phone`, `location`, `role`, `experience`, `linkedin`, `coverMessage`

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None — the guide is a complete, actionable document. No placeholder content or TODOs remain.

## User Setup Required

Follow CAREERS-ZAPIER-SETUP-GUIDE.md after deploying the site to Netlify:
1. Create "Website Applications" tab in the existing recruitment Google Sheet with 8 column headers
2. Part 1: Add Netlify email notification (careers form → recruitment@workwiser.io)
3. Part 2: Create Zapier Zap (Netlify "careers" form → "Website Applications" tab)

## Self-Check: PASSED

- `.planning/phases/07-careers-page/CAREERS-ZAPIER-SETUP-GUIDE.md` — FOUND
- Commit `180aeb3` — FOUND (feat(07-02): add careers Zapier + Netlify setup guide)
- Contains "recruitment@workwiser.io" — YES (2 occurrences)
- Contains "Website Applications" — YES (9 occurrences)
- Contains form name "careers" — YES (8 occurrences)
- All 8 field IDs in mapping table — YES (fullName, email, phone, location, role, experience, linkedin, coverMessage)
- Troubleshooting covers tab-not-visible and "All forms" pitfalls — YES
