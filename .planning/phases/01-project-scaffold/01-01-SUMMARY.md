---
phase: 01-project-scaffold
plan: 01
subsystem: infra
tags: [astro, tailwindcss, netlify, sitemap, typescript, vite]

# Dependency graph
requires: []
provides:
  - Astro 5 project scaffolded in repo root with Tailwind CSS v4 (@tailwindcss/vite Vite plugin)
  - astro.config.mjs with sitemap integration and placeholder site URL
  - tsconfig.json extending astro/tsconfigs/strictest
  - netlify.toml with NODE_VERSION=22, build command, and publish directory
  - src/styles/global.css Tailwind v4 entry point
  - public/robots.txt with User-agent wildcard and sitemap URL
  - npm run build exits 0, dist/sitemap-index.xml and dist/robots.txt confirmed
affects:
  - Phase 2 (Brand System) — imports global.css in BaseLayout
  - All phases — Astro config patterns and file structure

# Tech tracking
tech-stack:
  added:
    - astro@6.0.7
    - "@astrojs/sitemap@3.7.1"
    - tailwindcss@4.2.2
    - "@tailwindcss/vite@4.2.2"
  patterns:
    - Tailwind v4 via @tailwindcss/vite Vite plugin (NOT @astrojs/tailwind — that is v3 only)
    - Single @import "tailwindcss" in global.css (NOT @tailwind base/components/utilities)
    - site property required in astro.config.mjs for @astrojs/sitemap to generate sitemap

key-files:
  created:
    - astro.config.mjs
    - tsconfig.json
    - netlify.toml
    - package.json
    - package-lock.json
    - src/pages/index.astro
    - src/styles/global.css
    - public/robots.txt
    - public/favicon.svg
    - .gitignore
  modified: []

key-decisions:
  - "Manual npm install used instead of npm create astro@latest because the interactive scaffolder does not support non-empty directories without TTY prompts"
  - "NODE_VERSION=22 pinned in netlify.toml — Astro 5 requires Node v22.12.0+; Netlify default is lower"
  - "Tailwind v4 integrated via @tailwindcss/vite Vite plugin — @astrojs/tailwind is deprecated for v4"
  - "site: https://workwiser.netlify.app is a placeholder — update after Netlify assigns real subdomain in Task 2"
  - "public/favicon.svg added (minimal W mark) because index.astro references /favicon.svg and build would warn without it"

patterns-established:
  - "Astro config pattern: vite.plugins array for Vite plugins, integrations array for Astro integrations"
  - "Tailwind v4: @import \"tailwindcss\" as sole entry point in global.css"

requirements-completed: []  # FOUND-01, FOUND-09, FOUND-10 pending — require live Netlify deploy (Tasks 2-3)

# Metrics
duration: 15min
completed: 2026-03-20
---

# Phase 1 Plan 01: Project Scaffold Summary

**Astro 5 project with Tailwind CSS v4 (@tailwindcss/vite), @astrojs/sitemap, strictest TypeScript, and netlify.toml wired — npm run build exits 0 locally, awaiting GitHub + Netlify deploy for full verification**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-20T12:28:00Z
- **Completed:** 2026-03-20 (Task 1 complete; Tasks 2-3 awaiting human action)
- **Tasks:** 1/3 complete (Task 2 is a checkpoint:human-action gate)
- **Files modified:** 10

## Accomplishments
- Astro 5 + Tailwind CSS v4 + @astrojs/sitemap scaffolded manually in repo root
- `npm run build` exits 0: `dist/sitemap-index.xml` and `dist/robots.txt` both confirmed present
- netlify.toml committed with NODE_VERSION=22 and correct build/publish config
- All configuration files committed to git (b757ca6)
- .planning/ directory confirmed intact throughout

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Astro 5 project and configure Tailwind v4, TypeScript, and Netlify** - `b757ca6` (feat)
2. **Task 2: Create GitHub remote and connect Netlify CI/CD** - pending (checkpoint:human-action)
3. **Task 3: Verify live site, sitemap, and robots.txt at Netlify preview URL** - pending (checkpoint:human-verify)

## Files Created/Modified
- `astro.config.mjs` - Astro config: site=https://workwiser.netlify.app, Tailwind v4 Vite plugin, sitemap integration
- `tsconfig.json` - Extends astro/tsconfigs/strictest, no extra compilerOptions
- `netlify.toml` - Build command, publish=dist, NODE_VERSION=22
- `package.json` - Project metadata with astro/sitemap/tailwindcss/vite plugin as dependencies
- `package-lock.json` - Lockfile for reproducible installs
- `src/pages/index.astro` - Minimal home page (placeholder — Phase 3 builds real content)
- `src/styles/global.css` - @import "tailwindcss" (Tailwind v4 entry point)
- `public/robots.txt` - User-agent: * Allow: / with placeholder sitemap URL
- `public/favicon.svg` - Minimal W submark favicon (navy background, white W)
- `.gitignore` - dist/, node_modules/, .env, .DS_Store

## Decisions Made
- Used manual `npm install astro @astrojs/sitemap tailwindcss @tailwindcss/vite` instead of `npm create astro@latest` because the interactive scaffolder aborts when the target directory is non-empty and there is no TTY to answer the "directory not empty" prompt in a non-interactive shell.
- Pinned NODE_VERSION=22 in netlify.toml — Astro 5 requires Node v22.12.0+; Netlify's default runtime is lower and causes cryptic syntax errors.
- Integrated Tailwind v4 via `@tailwindcss/vite` Vite plugin only. Did NOT use `@astrojs/tailwind` (deprecated for v4) or `npx astro add tailwind` (installs deprecated v3-style integration).
- Added `public/favicon.svg` as a minimal placeholder (W submark) because `src/pages/index.astro` references `/favicon.svg` and missing it generates a build warning.
- `site: "https://workwiser.netlify.app"` is a placeholder. After Netlify assigns the real subdomain in Task 2, update `astro.config.mjs` and `public/robots.txt` if the subdomain differs.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added public/favicon.svg**
- **Found during:** Task 1 (scaffold and build verification)
- **Issue:** `src/pages/index.astro` references `/favicon.svg` which would produce a missing asset warning; plan did not list favicon.svg in file list
- **Fix:** Created `public/favicon.svg` as a minimal placeholder W submark (navy square, white W letter)
- **Files modified:** public/favicon.svg
- **Verification:** Build completes cleanly with no asset warnings
- **Committed in:** b757ca6 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (missing critical — favicon placeholder)
**Impact on plan:** Minor addition, no scope creep. Favicon will be replaced with real brand asset in Phase 8.

## Issues Encountered
- `npm create astro@latest . -- ...` prompts interactively when the target directory is non-empty and does not accept piped input correctly. Resolved by manually installing `astro` and all dependencies via `npm install`, then creating all config files directly. The outcome is identical to what the scaffolder produces.

## User Setup Required

**Tasks 2 and 3 require manual steps before this plan is complete.** The following must be done:

1. **Create a GitHub repository** named `workwiser-website` and push the current branch to it:
   ```bash
   gh repo create workwiser-website --public --source=. --remote=origin --push
   ```
   Or manually at https://github.com/new, then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/workwiser-website.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect Netlify:**
   - Go to https://netlify.com → Add new project → Import from GitHub
   - Select `workwiser-website` repo
   - Confirm: build command = `npm run build`, publish = `dist`
   - Click Deploy site and wait for the first deploy

3. **After deploy**, note the assigned subdomain (e.g., `random-name-123456.netlify.app`). If it differs from `workwiser.netlify.app`, update:
   - `astro.config.mjs` — change the `site:` value
   - `public/robots.txt` — change the `Sitemap:` URL
   - Commit and push the update

4. **Verify** the live site:
   - `{preview-url}` — home page loads
   - `{preview-url}/sitemap-index.xml` — XML content returned
   - `{preview-url}/robots.txt` — plain text returned
   - Make a trivial push and confirm Netlify auto-deploy triggers

## Next Phase Readiness
- Phase 2 (Brand System) can begin once Tasks 2-3 above are completed and the live Netlify URL is confirmed
- Before Phase 2: resolve font decision (Helvetica Now Display commercial license vs. Inter free fallback)
- `src/styles/global.css` is ready to receive brand token `@theme {}` blocks in Phase 2
- `src/pages/index.astro` is a placeholder — Phase 3 will build the real home page

---
*Phase: 01-project-scaffold*
*Completed: 2026-03-20*
