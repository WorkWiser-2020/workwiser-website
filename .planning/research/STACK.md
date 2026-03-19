# Technology Stack

**Project:** WorkWiser Website Rebuild
**Researched:** 2026-03-19
**Verdict:** Astro + Tailwind CSS + Netlify is the correct choice. Validated and prescribed below.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | 5.x (latest) | Static site generator, page routing, component system | Zero-JS by default means fastest possible page loads and best Core Web Vitals — Google's ranking signals. File-based routing makes pages predictable for non-developers. `.astro` components are HTML-first, easy for Claude to read and edit without framework complexity. Shipped with built-in image optimization. |
| Node.js | 20 LTS or 22 LTS | Runtime for Astro dev server and build | Astro 5 requires Node 18+. Use 20 LTS for stability. |

**Why not Next.js / Nuxt / SvelteKit:** These are full-stack app frameworks. They add server runtime complexity, require a Node.js host (costs money), and produce heavier bundles. WorkWiser needs zero-server static output, not an app framework.

**Why not Hugo / Jekyll / Eleventy:** These are valid static generators but have weaker ecosystems and less community momentum in 2025. Astro has first-class Tailwind integration, a large community, and excellent documentation — critical when Claude is the primary developer.

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (v4.2+ as of Mar 2026) | Utility-first CSS framework | v4 is a major redesign: no `tailwind.config.js` required, configured entirely in CSS, integrated via Vite plugin. Produces smaller CSS output than v3. Utility classes make responsive design explicit in markup — Claude can read and modify styles without hunting through external CSS files. |
| @tailwindcss/vite | 4.x (matches Tailwind) | Vite plugin for Tailwind v4 | Replaces the PostCSS pipeline from Tailwind v3. Required for Tailwind v4 in Astro (which uses Vite internally). |

**Tailwind v3 vs v4:** Use v4. It ships faster builds, a simpler config model, and better defaults for 2025 projects. The `tailwind.config.js` approach from v3 is deprecated in v4. Starting a new project on v3 would mean inheriting tech debt immediately.

**Why not plain CSS / SASS:** Custom CSS requires naming conventions (BEM etc.) and discipline to stay consistent across pages. For a non-developer workflow where Claude makes targeted edits, utility classes in markup are far more readable and auditable.

### Hosting & Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Netlify | Free tier | Static site hosting, CDN, CI/CD, domain management, form handling | Free tier covers marketing site volumes. Git-push deploys mean Claude can trigger deployment by pushing code. Built-in form handling (100 submissions/month free) eliminates need for a separate form backend. Edge CDN means fast global load times. |

**Why not Vercel:** Also excellent, but Netlify Forms gives built-in form handling with Zapier webhooks — Vercel has no equivalent. For this project, that integration is the deciding factor.

**Why not AWS / GCP / Azure:** Massive overkill. Adds infrastructure complexity the owner cannot manage. Netlify abstracts all of this.

**Why not GitHub Pages:** No form handling, no webhook integrations, no serverless functions. Would require external form service plus more configuration.

### Form Handling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Netlify Forms | Built-in | Capture contact and job application form submissions, email notification | Already included with Netlify hosting. Zero additional cost within free tier (100 submissions/month). Email notification is built-in. Webhook to Zapier/Make enables Google Sheets pipeline. No separate service account needed. |
| Zapier (free tier) | — | Webhook receiver: Netlify → Google Sheets | Netlify has a pre-built Zap template for "Save Netlify form submissions to Google Sheets." Free Zapier tier handles low-volume marketing site submissions. No code required — configured in Zapier UI. |

**Why not Formspree:** Formspree free tier allows only 50 submissions/month and does not include Google Sheets natively (paid feature). Since Netlify Forms is already included and covers both email and webhook-to-Zapier, Formspree adds complexity with fewer benefits.

**Why not Make (formerly Integromat):** Make is a valid alternative to Zapier and can receive Netlify webhooks. Use Make if Zapier's free tier proves insufficient. Make's free tier allows 1,000 operations/month, which may be more generous for higher volumes. Both are valid — Zapier is recommended first because of the pre-built Netlify template.

**Why not a custom Google Apps Script webhook:** Technically possible (Apps Script can receive POST requests) but requires maintaining server-side code that breaks without warning. Use managed services (Zapier/Make) instead.

**Form architecture for Astro (critical):** Netlify Forms requires `data-netlify="true"` on the HTML `<form>` tag and a hidden input `<input type="hidden" name="form-name" value="contact" />`. Astro renders to static HTML so this works natively. However, if using Astro's client-side JS for form UX (e.g., AJAX submission), the form must still be present in the server-rendered HTML for Netlify to detect it at build time. The safest pattern is a standard HTML form with POST and a redirect to a thank-you page — no JavaScript required.

### Calendly Integration

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Calendly Embed Widget | — | Let visitors book a discovery call without leaving the site | WorkWiser already uses `calendly.com/workwiser-info/ceo-client`. Calendly provides a free JavaScript embed. No account changes needed. |

**Embed approach — use the inline widget on a dedicated booking page, plus popup trigger buttons throughout the site.** Two code snippets are required:

Inline embed (paste into any `.astro` page):
```html
<!-- Calendly inline widget -->
<div
  class="calendly-inline-widget"
  data-url="https://calendly.com/workwiser-info/ceo-client"
  style="min-width:320px;height:700px;"
></div>
<script
  type="text/javascript"
  src="https://assets.calendly.com/assets/external/widget.js"
  async
></script>
```

Popup trigger (button anywhere on the page):
```html
<!-- Calendly badge/popup widget -->
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
<a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/workwiser-info/ceo-client'});return false;">
  Book a Call
</a>
```

In Astro, place the `<script>` tags in the page's `<head>` or at the bottom of the `<body>` using Astro's `<slot>` pattern. Do not load the Calendly script on every page — only on pages that use it (Contact page, booking page).

### SEO & Performance

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | latest | Auto-generates sitemap.xml on build | Add from day one. Google needs sitemap.xml to index all pages. |
| astro-robots-txt | latest (community) | Generates robots.txt | Add from day one. Tells search engines which pages to crawl. |

**Meta tags:** Astro has no built-in SEO component but implementing one is trivial — create a `<SEO>` Astro component that accepts `title`, `description`, `og:image` props and outputs the appropriate `<meta>` tags in `<head>`. This is simpler and more controlled than an SEO library.

**Image optimization:** Astro 5's built-in `<Image />` component handles WebP conversion and lazy loading automatically. Use it for all images — especially hero images and team photos. This is the primary driver of Core Web Vitals scores.

**Font loading:** Use Google Fonts via `<link rel="preconnect">` and `display=swap` to avoid layout shift. Alternatively, self-host fonts using `@fontsource` npm packages for zero external requests.

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource/{font-name} | latest | Self-hosted web fonts, zero external dependency | Preferred over Google Fonts CDN for GDPR compliance and performance. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | latest | sitemap.xml generation | Always — install at project creation |
| @tailwindcss/typography | 0.5.x or 4.x-compatible | Prose styles for long-form text | Use on About page and Case Studies where formatted body copy is needed |
| sharp | latest | Image processing dependency for Astro | Required by Astro's Image component — install explicitly |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Astro 5 | Next.js 15 | Next.js requires server runtime, higher hosting cost, heavier JS bundle. Overkill for static marketing site. |
| Framework | Astro 5 | Hugo | Hugo is faster to build but has weaker Tailwind integration, smaller community, and less intuitive for Claude to work with. |
| Styling | Tailwind CSS v4 | Tailwind CSS v3 | v3 is entering maintenance mode. New project should start on v4. Configuration model is simpler. |
| Styling | Tailwind CSS v4 | Bootstrap 5 | Bootstrap produces more opinionated designs, harder to match custom brand. Utility-first (Tailwind) gives full control. |
| Hosting | Netlify | Vercel | Netlify wins on built-in form handling with webhook support. Vercel offers no equivalent. |
| Hosting | Netlify | GitHub Pages | No form handling, no CI/CD notifications, no serverless functions. |
| Forms | Netlify Forms + Zapier | Formspree | Formspree free tier: 50 submissions/month, no Google Sheets natively. Netlify Forms is already included and more capable. |
| Forms | Netlify Forms + Zapier | Make (Integromat) | Valid alternative to Zapier, use if Zapier free tier is insufficient. |
| Booking | Calendly embed | Cal.com | Calendly is already in use at `calendly.com/workwiser-info/ceo-client`. No reason to migrate. |
| Fonts | @fontsource | Google Fonts CDN | External CDN requests add latency and raise GDPR considerations (EU data transfer). Self-hosted via @fontsource is faster and compliant. |

---

## Installation

```bash
# 1. Create a new Astro project
npm create astro@latest workwiser-website
# Select: "Empty" template, TypeScript: "Relaxed", Git: yes

cd workwiser-website

# 2. Add Tailwind CSS v4
npx astro add tailwind
# (Astro's integration command handles @tailwindcss/vite configuration automatically)

# 3. Add sitemap integration
npx astro add sitemap

# 4. Add sharp for image optimization
npm install sharp

# 5. Add font support (replace with actual fonts from brand)
npm install @fontsource/inter
# or whichever font the WorkWiser brand uses

# 6. Add Tailwind typography plugin (for About/Case Studies pages)
npm install @tailwindcss/typography
```

**Netlify configuration** — create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Tailwind v4 CSS setup** — in `src/styles/global.css`:
```css
@import "tailwindcss";

/* Custom brand tokens */
@theme {
  --color-brand-primary: #YOUR_BRAND_COLOR;
  --color-brand-secondary: #YOUR_SECONDARY_COLOR;
  --font-family-sans: "Inter", sans-serif;
}
```

**Key difference from Tailwind v3:** There is no `tailwind.config.js`. Brand colors and custom tokens are defined with `@theme {}` inside CSS. This is simpler but requires updating the mental model from v3.

---

## Critical Constraints for Non-Developer Maintenance

The owner will use Claude Code for all changes. These patterns make maintenance reliable:

1. **One component per page section.** Each section of the home page (Hero, Stats, Services, etc.) lives in its own `.astro` component in `src/components/`. Claude can find and edit the right file without touching unrelated code.

2. **Brand tokens in one CSS file.** All colors, fonts, and spacing live in `src/styles/global.css` inside `@theme {}`. Changing brand colors means editing one file, not hunting through hundreds of utility classes.

3. **No JavaScript framework (no React/Vue).** Vanilla JS or Astro's built-in client directives only. Every JS interaction must have a clear, readable script in the component. No build-time complexity.

4. **Form names must match Zapier.** The `name` attribute on each Netlify form must match the trigger configured in Zapier. Document these names (`contact`, `job-application`) in the codebase and never rename them without updating Zapier.

---

## Confidence Assessment

| Decision | Confidence | Source | Notes |
|----------|------------|--------|-------|
| Astro 5 as framework | HIGH | Official Astro releases, community consensus Aug 2025 | Astro 5 released Dec 2024. Stable, actively maintained. |
| Tailwind v4.2 version | HIGH | Official tailwindcss.com blog (verified Mar 2026) | v4.0 launched Jan 2025, v4.2 is current stable. |
| Tailwind v4 uses @tailwindcss/vite | HIGH | Official Tailwind docs (verified Mar 2026) | PostCSS pipeline removed. Vite plugin is the correct approach. |
| Netlify Forms for form capture | HIGH | Official Netlify docs (verified Mar 2026) | `data-netlify="true"` attribute works. Email notification built-in. |
| Netlify Forms → Zapier → Google Sheets | HIGH | Official Netlify docs (verified Mar 2026) | Pre-built Zap template confirmed in documentation. |
| Netlify free tier: 100 form submissions/month | MEDIUM | Training data Aug 2025 — pricing may have changed | Verify on netlify.com/pricing before launch. |
| Formspree free tier: 50 submissions/month | MEDIUM | Training data Aug 2025 | Moot if using Netlify Forms, but noted for awareness. |
| Calendly embed via widget.js | HIGH | Stable API, unchanged for years | The embed snippet pattern is Calendly's documented approach. URL: `calendly.com/workwiser-info/ceo-client` confirmed in PROJECT.md. |
| @astrojs/sitemap for SEO | HIGH | Official Astro integration, standard pattern | Listed as official integration. |
| @tailwindcss/typography compatibility with v4 | MEDIUM | Training data Aug 2025 | Verify the typography plugin version supports Tailwind v4 before installing. v4-compatible version may be needed. |

---

## Sources

- Tailwind CSS v4.0 announcement: https://tailwindcss.com/blog/tailwindcss-v4 (verified Mar 2026)
- Tailwind CSS v4 Vite installation: https://tailwindcss.com/docs/installation/using-vite (verified Mar 2026)
- Netlify Forms setup: https://docs.netlify.com/forms/setup/ (verified Mar 2026)
- Netlify Forms notifications and Zapier: https://docs.netlify.com/forms/notifications/ (verified Mar 2026)
- Astro 5 release: https://astro.build/blog/astro-5/ (training data, Aug 2025 cutoff)
- Calendly embed docs: https://help.calendly.com/hc/en-us/articles/223147027 (training data, embed API stable)
