# Phase 1: Project Scaffold - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Initialize an Astro 5 + Tailwind CSS v4 project, connect it to Netlify via GitHub CI/CD, and get a working preview URL. No design, no content — pure infrastructure. Success is: push to git → Netlify deploy succeeds → site accessible at a `*.netlify.app` URL with `/sitemap.xml` and `/robots.txt` reachable.

</domain>

<decisions>
## Implementation Decisions

### Project location
- Astro project initialized in the **repo root** — not a subdirectory
- `.planning/` stays alongside the Astro files at the root level
- Use the **minimal template** (`--template minimal`) — one empty `index.astro`, no example content to clean up

### Package manager
- **npm** — ships with Node.js, zero extra setup, universally familiar
- No lockfile migration or extra install steps needed

### Netlify connection
- Deploy method: **GitHub → Netlify CI/CD** — every push to main triggers an automatic deploy
- User has **neither a GitHub remote nor a Netlify account yet** — both need to be created as part of this phase
- Netlify configuration committed as a **`netlify.toml` file** in the repo root (not managed through the UI only)
- netlify.toml should declare: build command (`npm run build`), publish directory (`dist`), and Node version

### TypeScript strictness
- Use **strictest** tsconfig — maximum type safety, catches errors at write time
- Best choice since Claude will be making all future code changes; strictest prevents subtle bugs before they reach the browser

### Claude's Discretion
- Exact Astro integration packages included at scaffold time (e.g., @astrojs/tailwind, @astrojs/sitemap)
- Specific Node version pinned in netlify.toml
- `.gitignore` contents

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard Astro + Tailwind scaffolding approaches.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None yet — this phase establishes the baseline

### Integration Points
- `.planning/` directory already exists in the repo root and must remain intact after scaffold
- Git repo already initialized locally — only needs a GitHub remote and Netlify connection added

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-project-scaffold*
*Context gathered: 2026-03-20*
