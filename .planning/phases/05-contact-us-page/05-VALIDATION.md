---
phase: 5
slug: contact-us-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Astro static site (build verification + manual browser testing) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~15 seconds (build) |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + visual check at localhost:4321/contact
- **Before `/gsd:verify-work`:** Full build green + all 7 requirements manually verified on Netlify preview URL
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | CONT-01 | smoke + visual | `npm run build` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | CONT-05 | visual | `npm run build` | ❌ W0 | ⬜ pending |
| 05-01-03 | 01 | 1 | CONT-07 | visual | `npm run build` | ❌ W0 | ⬜ pending |
| 05-01-04 | 01 | 1 | CONT-06 | manual | browser click test | ❌ W0 | ⬜ pending |
| 05-02-01 | 02 | 2 | CONT-02 | manual | browser form test | ❌ W0 | ⬜ pending |
| 05-02-02 | 02 | 2 | CONT-03 | integration | Netlify preview deploy | ❌ W0 | ⬜ pending |
| 05-02-03 | 02 | 2 | CONT-04 | integration | Zapier trigger test | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/pages/contact.astro` — covers CONT-01 through CONT-07 (page doesn't exist yet)
- [ ] `src/data/contactContent.ts` — content data file
- [ ] `src/components/ContactHero.astro` — hero component
- [ ] `src/components/ContactForm.astro` — form with Netlify Forms integration

*(All gaps expected — Phase 5 creates from scratch)*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero gradient matches brand | CONT-01 | Visual design match | Compare with About/Why Us hero style |
| Form validation shows inline errors | CONT-02 | Browser JS interaction | Submit empty form, verify error messages below Email + Location |
| Netlify Forms email notification | CONT-03 | External service | Deploy to Netlify preview, submit form, check info@workwiser.io inbox |
| Zapier → Google Sheets row | CONT-04 | External service | Submit on Netlify preview, check designated Google Sheet |
| Stats count-up animation | CONT-05 | Visual animation | Scroll to sidebar, verify numbers animate |
| Calendly popup opens | CONT-06 | Browser JS interaction | Click "Book a Free Consultation", verify Calendly overlay |
| Phone + email displayed | CONT-07 | Visual check | Verify (302) 257-5427 and info@workwiser.io visible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
