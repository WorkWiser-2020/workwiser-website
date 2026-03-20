---
phase: 3
slug: home-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — static Astro site; build is the test |
| **Config file** | None — `npm run build` catches TS/Astro errors |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview` (visual inspection at localhost:4321)
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | HOME-07 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | HOME-01 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | HOME-02 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-04 | 01 | 1 | HOME-03 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 2 | HOME-04 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 2 | HOME-05 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-03 | 02 | 2 | HOME-06 | visual/smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-04 | 02 | 2 | HOME-01..07 | composition | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/homeContent.ts` — content data file with typed exports for all sections
- [ ] `public/images/hero.jpg` — hero photo asset (Unsplash stock photo)
- [ ] No test framework installation needed — `npm run build` is the validation tool

*Existing infrastructure (Astro build, Tailwind v4) covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero photo renders (not broken) | HOME-07 | Image rendering requires visual check | Open localhost:4321, verify hero image loads without 404 |
| Stats count-up animates from 0 | HOME-02 | Animation timing requires JS + viewport | Scroll stats into view, verify numbers animate up to final values |
| Stats show correct numbers without JS | HOME-02 | Fallback requires disabling JS | Disable JS in browser, verify stats show "300+", "100+", "10+", "150" |
| All 6 sections visible and styled | HOME-01..07 | Visual layout correctness | Full page scroll at 1440px and 375px widths |
| Calendly link opens correctly | HOME-01 | External link behavior | Click "Start delegating" CTA, verify Calendly opens in new tab |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
