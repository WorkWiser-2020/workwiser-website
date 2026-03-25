---
phase: 6
slug: case-studies-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Astro static site (build verification + manual browser testing) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + visual check at localhost:4321/case-studies
- **Before `/gsd:verify-work`:** Full build green + visual inspection of all 4 cards + CTA link
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | CASE-03 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 06-01-02 | 01 | 1 | CASE-01, CASE-02 | smoke + visual | `npm run build` | ❌ W0 | ⬜ pending |
| 06-01-03 | 01 | 1 | CASE-04 | visual | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/data/caseStudies.ts` — typed data file with 4 case studies
- [ ] `src/components/CaseStudiesHero.astro` — gradient hero component
- [ ] `src/components/CaseStudiesGrid.astro` — card grid component
- [ ] `src/pages/case-studies.astro` — page composition

*(All gaps expected — Phase 6 creates from scratch)*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Cards show industry, challenge, outcome | CASE-01, CASE-02 | Visual layout check | Verify all 4 cards render with correct data |
| Brand consistency (navy/teal palette) | CASE-01 | Visual design | Compare styling with other inner pages |
| CTA links to /contact | CASE-04 | Link destination | Click CTA, verify navigation to contact page |
| Mobile responsive stacking | CASE-01 | Visual layout | Resize to <768px, verify cards stack |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
