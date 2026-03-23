---
phase: 4
slug: about-us-why-us-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Astro static site (build verification) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + visual spot-check at localhost
- **Before `/gsd:verify-work`:** Full build must be green + visual sign-off on both pages
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | ABOUT-01 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | ABOUT-02 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | ABOUT-03 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 04-01-04 | 01 | 1 | ABOUT-04 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 04-01-05 | 01 | 1 | ABOUT-05 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 04-01-06 | 01 | 1 | ABOUT-06 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | WHY-01 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 1 | WHY-02 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 04-02-03 | 02 | 1 | WHY-03 | smoke | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/pages/about.astro` — covers ABOUT-01 through ABOUT-06 (page doesn't exist yet)
- [ ] `src/pages/why-us.astro` — covers WHY-01 through WHY-03 (page doesn't exist yet)
- [ ] `src/data/aboutContent.ts` — content data file
- [ ] `src/data/whyUsContent.ts` — content data file
- [ ] `src/components/StrategicLocation.astro` — shared component

*(All gaps are expected — Phase 4 creates all of these from scratch)*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero gradient background matches Canva mockup | ABOUT-01 | Visual design match | Compare rendered hero at localhost with Canva reference |
| Core values layout with icons | ABOUT-05 | Visual layout check | Verify 4 values displayed with correct icons and descriptions |
| Six differentiator cards grid layout | WHY-02 | Visual layout check | Verify 6 cards in correct grid with icons and descriptions |
| "Start today" CTA links correctly | WHY-03 | Link destination check | Click CTA, verify navigation to Calendly or contact page |
| W-arrow watermark renders on teal backgrounds | ABOUT-01 | Visual opacity tuning | Check watermark visibility on gradient backgrounds |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
