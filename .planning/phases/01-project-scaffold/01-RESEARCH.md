# Phase 1: Project Scaffold - Research

**Researched:** 2026-03-20
**Domain:** Astro 5, Tailwind CSS v4, Netlify CI/CD, GitHub setup
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Astro project initialized in the **repo root** — not a subdirectory
- `.planning/` stays alongside the Astro files at the root level
- Use the **minimal template** (`--template minimal`) — one empty `index.astro`, no example content to clean up
- **npm** — ships with Node.js, zero extra setup, universally familiar
- Deploy method: **GitHub → Netlify CI/CD** — every push to main triggers an automatic deploy
- User has **neither a GitHub remote nor a Netlify account yet** — both need to be created as part of this phase
- Netlify configuration committed as a **`netlify.toml` file** in the repo root
- netlify.toml must declare: build command (`npm run build`), publish directory (`dist`), and Node version
- Use **strictest** tsconfig — maximum type safety

### Claude's Discretion
- Exact Astro integration packages included at scaffold time (e.g., @astrojs/tailwind, @astrojs/sitemap)
- Specific Node version pinned in netlify.toml
- `.gitignore` contents

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Astro 5 project scaffolded with Tailwind CSS v4 and Netlify configuration | Astro CLI flags + Tailwind v4 Vite plugin + netlify.toml template documented below |
| FOUND-09 | Netlify deploy pipeline live — site accessible at a Netlify preview URL before domain cutover | GitHub → Netlify import flow documented; no adapter needed for static sites |
| FOUND-10 | Sitemap and robots.txt generated automatically by Astro | `@astrojs/sitemap` auto-generates `sitemap-index.xml`; `robots.txt` served from `public/` |
</phase_requirements>

---

## Summary

Phase 1 is a pure infrastructure phase: scaffold an Astro 5 project, configure Tailwind CSS v4, wire up GitHub and Netlify CI/CD, add sitemap generation, and create a static `robots.txt`. The goal is a passing `npm run build` and a live `*.netlify.app` URL — no design, no content.

The Astro + Tailwind v4 integration changed significantly between Tailwind v3 and v4. The old `@astrojs/tailwind` integration package is deprecated; the new approach uses `@tailwindcss/vite` as a Vite plugin directly in `astro.config.mjs`. All research has verified this current approach from the official Tailwind docs.

The `@astrojs/sitemap` integration handles sitemap generation automatically at build time, but robots.txt is a separate concern — the simplest approach for a static site is a hand-written `public/robots.txt` file. No extra packages are required for robots.txt if content is static.

**Primary recommendation:** Scaffold with `npm create astro@latest` using the `--template minimal --typescript strictest` flags, add Tailwind via `@tailwindcss/vite`, add `@astrojs/sitemap`, and connect to Netlify via the GitHub import flow with a committed `netlify.toml`.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 5.x (latest) | Static site framework | Locked decision; no-JS default, excellent DX |
| tailwindcss | 4.x (latest) | Utility CSS framework | Locked decision; v4 is current major |
| @tailwindcss/vite | 4.x (latest) | Vite plugin for Tailwind v4 | Official Tailwind-recommended integration method for Astro |
| @astrojs/sitemap | latest | Auto-generate sitemap.xml at build | Official Astro integration; zero config for static sites |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| typescript | bundled with Astro | Type safety | Always — Astro installs it automatically |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@tailwindcss/vite` | `@astrojs/tailwind` | `@astrojs/tailwind` is DEPRECATED for Tailwind v4 — do not use |
| Static `public/robots.txt` | `src/pages/robots.txt.ts` dynamic endpoint | Dynamic endpoint allows embedding site URL from config; static file is simpler and sufficient for this phase |
| `netlify.toml` | Netlify UI config only | `netlify.toml` keeps config in version control — locked decision |

**Installation (after scaffold):**
```bash
npm install tailwindcss @tailwindcss/vite
npx astro add sitemap
```

---

## Architecture Patterns

### Recommended Project Structure (after scaffold)
```
/                          # repo root (Astro project lives here)
├── .planning/             # GSD planning docs — must remain intact
├── public/
│   └── robots.txt         # static robots.txt — served as-is
├── src/
│   ├── pages/
│   │   └── index.astro    # minimal template: one empty page
│   └── styles/
│       └── global.css     # Tailwind import goes here
├── astro.config.mjs       # Astro + Tailwind + sitemap config
├── tsconfig.json          # extends astro/tsconfigs/strictest
├── netlify.toml           # build command, publish dir, Node version
├── package.json           # workwiser-website
└── .gitignore
```

### Pattern 1: Tailwind v4 via Vite Plugin
**What:** Import `@tailwindcss/vite` as a Vite plugin in `astro.config.mjs`; create a global CSS file with `@import "tailwindcss"`; import that CSS once in a layout.
**When to use:** Every Astro + Tailwind v4 project — this is the only supported approach.
**Example:**
```typescript
// astro.config.mjs
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://workwiser.netlify.app", // placeholder until real domain
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/installation/framework-guides/astro */
@import "tailwindcss";
```

### Pattern 2: Strictest TypeScript
**What:** `tsconfig.json` extends `astro/tsconfigs/strictest`, which adds nine extra compiler checks beyond `strict`.
**When to use:** Always — locked decision.
**Example:**
```json
// tsconfig.json
// Source: https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/strictest.json
{
  "extends": "astro/tsconfigs/strictest"
}
```

The `strictest` preset enables: `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noImplicitOverride`, `noFallthroughCasesInSwitch`, `allowUnreachableCode: false`, `allowUnusedLabels: false`.

### Pattern 3: netlify.toml Configuration
**What:** Committed TOML file declares build settings and Node version so Netlify never uses wrong defaults.
**When to use:** Always for Astro static sites on Netlify — locked decision.
**Example:**
```toml
# netlify.toml
# Source: https://docs.astro.build/en/guides/deploy/netlify/
[build]
  command   = "npm run build"
  publish   = "dist"

[build.environment]
  NODE_VERSION = "22"
```

Node version note: Astro 5 requires Node v22.12.0 or higher (per official Astro deploy docs). Pinning `22` in `netlify.toml` picks up the latest LTS in the 22.x line.

### Pattern 4: Static robots.txt
**What:** Plain text file placed in `public/` — Astro copies it verbatim to `dist/` at build time.
**When to use:** When robots.txt content is static (no dynamic values needed). Sufficient for this phase.
**Example:**
```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://workwiser.netlify.app/sitemap-index.xml
```

Note: The Sitemap URL in robots.txt must be updated when the real domain is connected in Phase 9. For now the Netlify preview URL is the placeholder.

### Anti-Patterns to Avoid
- **Using `@astrojs/tailwind`:** This integration is deprecated for Tailwind v4. Guides older than mid-2024 reference it — skip them.
- **No `site` property in astro.config:** `@astrojs/sitemap` silently skips sitemap generation if `site` is not set. Always define it, even with a placeholder URL.
- **Initializing a new git repo inside the existing repo:** The repo already exists locally. Only add a GitHub remote — do not run `git init` again.
- **Renaming `src/pages/`:** Astro uses this directory name as a convention. Renaming breaks file-based routing.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom script building sitemap XML | `@astrojs/sitemap` | Handles pagination, `changefreq`, `lastmod`, filtering — edge cases compound quickly |
| Tailwind v4 CSS processing | Manual PostCSS pipeline | `@tailwindcss/vite` plugin | The Vite plugin is the official path; manual PostCSS with Tailwind v4 has incompatibilities |
| TypeScript strictness config | Custom `compilerOptions` block | `"extends": "astro/tsconfigs/strictest"` | Astro's preset is maintained and tested against Astro's type system |

**Key insight:** All three problems above have well-maintained official solutions. Custom implementations create maintenance debt before the project has any content.

---

## Common Pitfalls

### Pitfall 1: Missing `site` in astro.config Breaks Sitemap
**What goes wrong:** `@astrojs/sitemap` requires the `site` property to be set in `astro.config.mjs`. If missing, the integration silently produces no sitemap, and the build still passes — you only discover the problem when you check the output.
**Why it happens:** The integration cannot know the canonical domain without being told.
**How to avoid:** Set `site: "https://workwiser.netlify.app"` (placeholder) in `astro.config.mjs` at scaffold time.
**Warning signs:** `dist/` contains no `sitemap-index.xml` after `npm run build`.

### Pitfall 2: Wrong Node Version on Netlify
**What goes wrong:** Netlify's default Node version may be lower than what Astro 5 requires (v22.12.0+). Builds fail with cryptic syntax errors like `SyntaxError: Unexpected token 'with'`.
**Why it happens:** Netlify doesn't auto-detect the required Node version without explicit configuration.
**How to avoid:** Commit `NODE_VERSION = "22"` in `netlify.toml` `[build.environment]` section.
**Warning signs:** Build succeeds locally but fails on Netlify with a Node syntax error.

### Pitfall 3: Using the Deprecated `@astrojs/tailwind` Integration
**What goes wrong:** Installing `@astrojs/tailwind` with Tailwind v4 causes conflicts. The integration was designed for Tailwind v3.
**Why it happens:** Many tutorials and Stack Overflow answers still reference the old integration.
**How to avoid:** Use `@tailwindcss/vite` as a Vite plugin. Do not install `@astrojs/tailwind`.
**Warning signs:** Build errors mentioning Tailwind config resolution, or Tailwind classes not applying.

### Pitfall 4: `.planning/` Directory Lost During Scaffold
**What goes wrong:** If `npm create astro@latest` is run in the repo root with a template that initializes its own git or overwrites files, the `.planning/` directory could be affected.
**Why it happens:** Some scaffold commands use `--force` or overwrite existing files.
**How to avoid:** Run the scaffold command without the `--force` flag. Verify `.planning/` exists before and after scaffolding.
**Warning signs:** `.planning/` missing after scaffold completes.

### Pitfall 5: Astro Config File Extension Mismatch
**What goes wrong:** TypeScript strict mode expects imports to have explicit file extensions or correct module resolution. Mismatches between `.mjs`, `.ts`, and `.js` config file extensions cause type errors.
**Why it happens:** Astro supports multiple config file extensions; mixing them confuses TypeScript.
**How to avoid:** Use `astro.config.mjs` (the default) and do not mix extensions. The minimal template generates this correctly.
**Warning signs:** TypeScript errors in the config file itself at startup.

---

## Code Examples

Verified patterns from official sources:

### Create Astro Project (Minimal, Strictest TypeScript)
```bash
# Source: https://docs.astro.build/en/install-and-setup/
# Run from the repo root — installs into the current directory
npm create astro@latest . -- --template minimal --typescript strictest --no-git --skip-houston
```

Flags explained:
- `.` — scaffold into current directory (repo root)
- `--template minimal` — one empty index.astro, no example content
- `--typescript strictest` — configures tsconfig.json to extend `astro/tsconfigs/strictest`
- `--no-git` — skip git init (repo already exists)
- `--skip-houston` — skip the animated mascot intro

### Install Tailwind v4
```bash
# Source: https://tailwindcss.com/docs/installation/framework-guides/astro
npm install tailwindcss @tailwindcss/vite
```

### Add Sitemap Integration
```bash
# Source: https://docs.astro.build/en/guides/integrations-guide/sitemap/
npx astro add sitemap
```

This command auto-patches `astro.config.mjs` to import and register the sitemap integration.

### Full astro.config.mjs After Setup
```typescript
// Source: official Tailwind docs + Astro sitemap docs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://workwiser.netlify.app",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Standard .gitignore for Astro
```
# Source: Astro default scaffold output
dist/
.output/
node_modules/
.env
.env.*
!.env.example
.DS_Store
```

### Connect Existing Local Repo to GitHub (using GitHub CLI)
```bash
# Source: https://cli.github.com/manual/gh_repo_create
# Requires gh CLI to be installed and authenticated
gh repo create workwiser-website --public --source=. --remote=origin --push
```

Or manually:
```bash
git remote add origin https://github.com/YOUR_USERNAME/workwiser-website.git
git branch -M main
git push -u origin main
```

### Netlify Import Flow (UI steps — no CLI needed)
1. Sign up at netlify.com
2. "Add new project" → "Import an existing project"
3. Choose GitHub → authorize Netlify GitHub App
4. Select `workwiser-website` repository
5. Netlify auto-detects Astro — confirm build command `npm run build` and publish dir `dist`
6. Click Deploy — first deploy runs automatically

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/tailwind` integration | `@tailwindcss/vite` Vite plugin | Tailwind v4 release (early 2025) | Old integration is deprecated and incompatible with v4 |
| `tailwind.config.js` | CSS `@theme {}` block in global.css | Tailwind v4 | Config-as-CSS replaces config-as-JS for most customization |
| `npx astro add tailwind` | Manual install of `@tailwindcss/vite` | Tailwind v4 | `astro add tailwind` may still install v3-style integration — verify |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Deprecated — targets Tailwind v3. Do not install.
- `tailwind.config.js`: Not needed for Tailwind v4 basic use. Brand tokens go in `@theme {}` in CSS (Phase 2 concern).

---

## Open Questions

1. **Netlify preview URL for the `site` property**
   - What we know: `@astrojs/sitemap` requires a `site` URL; the Netlify URL is not known until after the first deploy
   - What's unclear: Whether the Netlify URL will be stable (it is — Netlify assigns a consistent `*.netlify.app` subdomain at site creation time, before first deploy)
   - Recommendation: Set a placeholder like `https://workwiser.netlify.app` at scaffold time; update after Netlify site is created and the real subdomain is assigned. The sitemap URL in `robots.txt` needs the same update.

2. **`npx astro add sitemap` behavior vs manual install**
   - What we know: The command auto-patches `astro.config.mjs`
   - What's unclear: Whether it correctly preserves the `vite.plugins` block already added for Tailwind
   - Recommendation: Run `astro add sitemap` AFTER configuring Tailwind, then verify `astro.config.mjs` still contains both the Vite plugin and the sitemap integration.

3. **Node version: exact pin vs major-only**
   - What we know: Astro 5 requires v22.12.0+; Netlify accepts `"22"` as a major version pin
   - What's unclear: Whether pinning to `"22"` is preferable to `"22.12.0"` (major pin gets security patches automatically)
   - Recommendation: Use `NODE_VERSION = "22"` (major only) for automatic patch updates within the LTS line.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None — greenfield project; no test framework exists yet |
| Config file | None — Wave 0 creates none for this phase |
| Quick run command | `npm run build` (build smoke test) |
| Full suite command | `npm run build` + manual URL verification |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | `npm run build` completes with no errors | smoke | `npm run build` | ❌ Wave 0 — project does not exist yet |
| FOUND-09 | Site accessible at `*.netlify.app` URL | manual | n/a — requires browser verification | ❌ Wave 0 |
| FOUND-10 | `/sitemap.xml` and `/robots.txt` reachable at preview URL | smoke + manual | `npm run build && ls dist/sitemap-index.xml dist/robots.txt` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` — zero tolerance for build failures
- **Per wave merge:** `npm run build` + local server check (`npm run preview`)
- **Phase gate:** Live URL accessible in browser, `/sitemap.xml` and `/robots.txt` return 200 before moving to Phase 2

### Wave 0 Gaps
- [ ] No test infrastructure exists — this phase is the bootstrap; the "test" is a successful Netlify deploy
- [ ] `npm run build` is the de facto smoke test for all scaffold tasks
- [ ] Manual browser verification required for FOUND-09 (no automated URL testing in this phase)

*(No unit test framework is appropriate for this phase — it is purely infrastructure. Testing is: build passes locally, deploy succeeds on Netlify, URLs respond.)*

---

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS official Astro integration guide](https://tailwindcss.com/docs/installation/framework-guides/astro) — Tailwind v4 + `@tailwindcss/vite` setup steps
- [Astro sitemap integration docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — `@astrojs/sitemap` install and `site` requirement
- [Astro Netlify deploy guide](https://docs.astro.build/en/guides/deploy/netlify/) — `netlify.toml` template, Node version requirement (v22.12.0+)
- [Astro TypeScript docs](https://docs.astro.build/en/guides/typescript/) — three tsconfig presets (base, strict, strictest)
- [Astro strictest.json on GitHub](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/strictest.json) — exact compiler options in the `strictest` preset
- [GitHub Docs — adding locally hosted code](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github) — connecting existing local repo to GitHub

### Secondary (MEDIUM confidence)
- [Astro install and setup docs](https://docs.astro.build/en/install-and-setup/) — `npm create astro@latest` command and flags
- [Netlify build dependencies docs](https://docs.netlify.com/build/configure-builds/manage-dependencies/) — `NODE_VERSION` env variable in `netlify.toml`
- [Netlify add new project docs](https://docs.netlify.com/start/add-new-project/) — GitHub import flow

### Tertiary (LOW confidence — community sources, not officially verified)
- [Astro build failures guide (Dec 2025)](https://eastondev.com/blog/en/posts/dev/20251203-astro-build-failures-guide/) — Node version and dependency pitfalls (matches official docs, elevated confidence)
- [create-astro CLI flags (GitHub issue #8543)](https://github.com/withastro/astro/issues/8543) — `--typescript strictest` flag behavior

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified against official Tailwind and Astro docs
- Architecture: HIGH — config examples sourced directly from official docs
- Pitfalls: HIGH — Node version and sitemap `site` pitfalls verified against official requirements; Tailwind deprecation confirmed by official Tailwind docs
- GitHub/Netlify flow: MEDIUM — steps verified against official Netlify and GitHub docs, but exact UI flow may differ slightly as both services update their UIs

**Research date:** 2026-03-20
**Valid until:** 2026-06-20 (90 days — Astro and Tailwind v4 are in active development; verify integration approach before use if significant time has passed)
