---
phase: 7
slug: careers-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-25
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Astro build check only |
| **Config file** | none |
| **Quick run command** | `npx astro check` |
| **Full suite command** | `npx astro build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx astro check`
- **After every plan wave:** Run `npx astro build`
- **Before `/gsd:verify-work`:** Full build must be green with zero TypeScript errors
- **Max feedback latency:** ~15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | CAREER-02 | smoke | `npx astro check` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | CAREER-01 | smoke | `npx astro check` | ❌ W0 | ⬜ pending |
| 07-01-03 | 01 | 1 | CAREER-03 | smoke | `npx astro build` | ❌ W0 | ⬜ pending |
| 07-01-04 | 01 | 1 | CAREER-05 | smoke | `npx astro build` | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 2 | CAREER-04 | manual | Netlify preview + Zapier test | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements — no test files to create
- Confirm `npx astro check` passes before starting Phase 7 tasks

*Wave 0 is a pre-flight check only, not new test files.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Form submission sends email to recruitment@workwiser.io | CAREER-03 | Netlify email delivery cannot be verified by build output | Submit form on Netlify preview; check recruitment@workwiser.io inbox |
| Form submission creates row in "Website Applications" tab | CAREER-04 | Zapier trigger is an external service | Run Zapier test step; confirm row appears in Google Sheet tab |
| Inline validation fires on blur for required fields | CAREER-02 | JS interaction — not verifiable by static build | Manually tab through form, leave required fields empty, check error text |
| Success message fades in after submit | CAREER-02 | JS animation — not verifiable by build | Submit form; confirm form fades out and success message fades in |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
