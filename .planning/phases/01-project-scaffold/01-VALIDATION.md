---
phase: 1
slug: project-scaffold
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — greenfield project; no test framework exists yet |
| **Config file** | None — Wave 0 creates none for this phase |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` + manual URL verification |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + local server check (`npm run preview`)
- **Before `/gsd:verify-work`:** Full suite must be green + live URL accessible in browser with `/sitemap.xml` and `/robots.txt` returning 200

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | smoke | `npm run build` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-10 | smoke | `npm run build && ls dist/sitemap-index.xml dist/robots.txt` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 2 | FOUND-09 | manual | n/a — browser verification | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- No test infrastructure exists — this phase is the bootstrap
- `npm run build` is the de facto smoke test for all scaffold tasks
- Manual browser verification required for FOUND-09 (live Netlify URL, no automated URL testing in this phase)

*The "test" for this phase is a successful Netlify deploy with accessible URLs — no unit test framework is appropriate for a pure infrastructure scaffold.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Site accessible at `*.netlify.app` | FOUND-09 | Requires live Netlify deploy + browser | Open the Netlify preview URL in a browser — page should load without errors |
| `/sitemap.xml` returns 200 | FOUND-10 | Requires live Netlify deploy | Navigate to `{preview-url}/sitemap-index.xml` — should show XML content |
| `/robots.txt` returns 200 | FOUND-10 | Requires live Netlify deploy | Navigate to `{preview-url}/robots.txt` — should show text content |
| Netlify auto-deploys on push | FOUND-09 | Requires git push + Netlify dashboard check | Push a commit to GitHub, verify Netlify dashboard shows a triggered build |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
