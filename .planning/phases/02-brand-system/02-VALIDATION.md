---
phase: 02
slug: brand-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Build pipeline (npm run build) + manual browser inspection |
| **Config file** | astro.config.mjs (existing) |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview`
- **Before `/gsd:verify-work`:** Full suite must be green + manual browser check at 375px / 768px / 1280px
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | FOUND-02 | Build + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | FOUND-03 | Build + manual browser | `npm run build` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | FOUND-04 | Build + manual browser | `npm run build` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | FOUND-05 | Build + manual | `npm run build` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | FOUND-06 | Manual browser ≥768px | `npm run dev` + visual | ❌ W0 | ⬜ pending |
| 02-02-03 | 02 | 1 | FOUND-07 | Manual browser | `npm run dev` + visual | ❌ W0 | ⬜ pending |
| 02-02-04 | 02 | 1 | FOUND-08 | Manual browser (devtools) | `npm run dev` + visual | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] No test files exist yet — this phase creates visual components best validated manually
- [ ] `npm run build` acts as the automated gate; it must pass clean before each commit
- [ ] Manual browser checklist: run `npm run preview` and verify each component at 375px / 768px / 1280px viewport widths

*Existing infrastructure covers automated build verification. Visual validation is manual.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Brand colors render correctly | FOUND-02 | Visual validation — colors must look right, not just compile | Inspect elements in devtools, verify computed color values |
| Open Sauce One loads for headings | FOUND-03 | Font rendering is visual | Check devtools → Computed → font-family on h1-h6 |
| Inter loads for body text | FOUND-04 | Font rendering is visual | Check devtools → Computed → font-family on p/body |
| Desktop nav shows horizontal links | FOUND-06 | Layout is visual at ≥768px | Resize browser to 1280px, verify horizontal nav visible |
| Footer shows all required content | FOUND-07 | Content presence is visual | Scroll to footer, verify logo, email, phone, social links |
| Mobile responsive layout | FOUND-08 | Responsive behavior is visual | Toggle devtools device toolbar, check 375px and 768px |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
