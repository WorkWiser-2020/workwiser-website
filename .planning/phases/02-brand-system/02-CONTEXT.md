# Phase 2: Brand System - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Every shared visual element — brand color tokens, fonts, BaseLayout, Header, and Footer — is live and consistent so every page inherits them without duplication. No page content is built here; only the reusable shell that wraps all pages.

</domain>

<decisions>
## Implementation Decisions

### Typography
- **Header font:** Open Sauce One — open-source, find freely available source (GitHub/fontsource) and self-host or CDN
- **Body font:** Inter (free Google Font) — Helvetica Now Display license not purchased
- **Heading weights:** Bold (700) and ExtraBold (800) — bold & impactful feel for a professional services brand
- **Body weights:** Claude's Discretion — pick the best combination for readability and brand feel

### Header navigation
- **Sticky header** — stays visible at all times as user scrolls
- **Background:** Claude's Discretion — pick based on brand mockups (solid navy or gradient)
- **Desktop nav:** Horizontal links — Home, About Us, Why Us, Contact — plus phone number (302) 257-5427 and "Get Started" CTA button
- **"Get Started" CTA:** Links to Calendly booking page (calendly.com/workwiser-info/ceo-client)
- **Mobile nav:** Hamburger icon → slide-out menu from the right, nav links stacked vertically

### Color & visual accents
- **Brand tokens:** #003c64 (navy primary), #0072c9 (blue), #26aeb4 (teal), #effefe (light teal bg), #f3f145 (yellow accent), #ffffff (white)
- **Dot grid pattern:** Page content sections only — not in header or footer
- **Yellow accent (#f3f145):** Claude's Discretion — decide where it works best without overusing it (CTA button is a strong candidate)
- **Teal (#26aeb4):** Claude's Discretion — decide usage based on brand guidelines
- **Gradients:** Claude's Discretion — decide whether header uses gradient or flat color; gradients available for hero sections

### Footer
- **Content:** Nav links (Home, About Us, Why Us, Contact) + contact info (phone, email) + social media icons
- **Background:** Claude's Discretion — pick the best footer background to complement the header
- **Copyright:** Claude's Discretion — decide whether to include copyright line
- **Social media URLs:**
  - LinkedIn: https://www.linkedin.com/company/workwiser-io/
  - Facebook: https://www.facebook.com/share/1BMtBrehBK/?mibextid=wwXIfr
  - Instagram: https://www.instagram.com/workwiser_?igsh=MXQ0MTE1OWl4d3htaw==
- **Contact info:** Phone (302) 257-5427, Email info@workwiser.io

### Claude's Discretion
- Body font weight selection (Regular + Medium or Regular + SemiBold)
- Header background treatment (solid navy vs subtle gradient)
- Footer background color
- Yellow and teal accent placement in header/footer
- Gradient usage in header vs reserved for hero sections
- Copyright line inclusion
- Exact spacing, typography scale, and responsive breakpoints

</decisions>

<specifics>
## Specific Ideas

- The current WordPress site has a hamburger-only menu even on desktop — the new site must show full horizontal nav on desktop (this was a known pain point)
- Brand has existing Canva mockups with dot grid patterns, gradient panels, and arrow icons — reference these for visual direction
- Logo exists in both primary (for light backgrounds) and white (for dark backgrounds) versions

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/styles/global.css` — Currently just `@import "tailwindcss"`. Ready to receive `@theme {}` block with brand tokens.
- `public/favicon.svg` — Placeholder W submark; will be replaced in Phase 8.

### Established Patterns
- Tailwind v4 via `@tailwindcss/vite` Vite plugin (NOT @astrojs/tailwind)
- Single `@import "tailwindcss"` entry point in global.css (Tailwind v4 style)
- Astro config uses `vite.plugins` array for Vite plugins, `integrations` array for Astro integrations

### Integration Points
- `src/pages/index.astro` — Currently a minimal placeholder. Will be wrapped in BaseLayout once it's created.
- `astro.config.mjs` — site set to `https://rococo-faun-f7353a.netlify.app`
- No `src/components/` or `src/layouts/` directories exist yet — Phase 2 creates them

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-brand-system*
*Context gathered: 2026-03-20*
