# Project Research Summary

**Project:** WorkWiser Website Rebuild
**Domain:** BPO / Virtual Staffing Company Marketing Website
**Researched:** 2026-03-19
**Confidence:** MEDIUM-HIGH

## Executive Summary

WorkWiser is a US-registered BPO placing bilingual (English/Spanish) remote staff from Nicaragua, primarily serving US-based clients. The website rebuild is not a complex technical problem — it is a trust and conversion problem. The current WordPress site has documented credibility failures (zero-displaying stats counters, hamburger nav on desktop, hidden pricing) that actively drive away qualified leads. The recommended approach is a static marketing site built with Astro 5 and Tailwind CSS v4, deployed to Netlify. This stack produces the fastest possible page loads (critical for SEO and perceived quality), requires zero server infrastructure, and is structured for reliable maintenance via Claude Code without a developer on staff.

The recommended architecture uses data-driven components: all repeating content (services, team members, case studies, testimonials) lives in typed TypeScript data files, not hardcoded in markup. A single `BaseLayout.astro` wraps every page. Forms route through Netlify Forms or Formspree to email notification plus a Google Sheets append via Zapier or Make. Calendly is embedded for booking (account already exists). This architecture means content updates are targeted file edits that cannot accidentally break layout or SEO.

The primary risks are operational, not technical: DNS cutover must be sequenced as the final step to prevent site downtime during migration; form submission limits on Formspree's free tier (50/month) can silently drop leads post-launch; and third-party scripts (Calendly, WhatsApp widget) must be loaded with `defer` or `client:idle` to preserve the page speed advantage that is the core reason for leaving WordPress. These risks are all preventable with deliberate sequencing.

---

## Key Findings

### Recommended Stack

Astro 5 is the correct framework for this project. It outputs zero-JavaScript HTML by default, making Core Web Vitals scores excellent without optimization effort — a direct SEO advantage over the WordPress site. Tailwind CSS v4 (the current stable version as of March 2026) handles responsive design via utility classes that are readable and editable without external CSS files. Netlify is the hosting platform because its built-in form handling with Zapier webhook integration eliminates the need for a separate form backend, and the free tier covers the volume a marketing site generates.

The full stack is deliberately minimal: no React, no Vue, no CMS, no database. Every technology choice was made to minimize the surface area where non-developer maintenance can go wrong.

**Core technologies:**
- Astro 5: Static site generation and page routing — zero-JS default means fastest possible load times and best Core Web Vitals
- Tailwind CSS v4 (with @tailwindcss/vite plugin): Utility-first styling — brand tokens in one CSS file, classes readable in markup, no config.js required in v4
- Netlify (free tier): Hosting, CI/CD, CDN, and built-in form handling — git-push deploys; 100 form submissions/month free
- Netlify Forms + Zapier: Form capture pipeline to email and Google Sheets — no separate backend required
- Calendly embed: Booking widget — account already exists at `calendly.com/workwiser-info/ceo-client`, zero setup cost
- @astrojs/sitemap: Auto-generated sitemap.xml — required from day one for Google indexing
- @fontsource: Self-hosted web fonts — faster than Google Fonts CDN, GDPR-compliant

**Critical version note:** Tailwind v4 uses `@tailwindcss/vite` (not PostCSS) and configures brand tokens in CSS via `@theme {}` — not `tailwind.config.js`. Starting on v3 would create immediate tech debt.

### Expected Features

The site serves two distinct audiences: employers (revenue-generating) and job applicants. These must be separated cleanly throughout — the hero and services pages speak only to employers; the `/careers` page speaks only to applicants. Mixing the two confuses both.

**Must have (table stakes):**
- Outcome-first hero headline with the "$9/hour" pricing anchor visible — no pricing signal means unqualified leads and qualified leads bouncing
- Single primary CTA (book a Calendly call) in the hero — one decision, not five
- Services section with role-specific tiles and task bullet points — "Virtual Assistants" is too vague
- Social proof block — client logos and/or testimonials with specific outcomes and named clients
- Stats counter section — "200+ clients placed," etc. — must work correctly (the current site shows "0")
- About/team page with real photos — BPO is a trust sale; prospects need to see real people
- Contact form (employers) and job application form (applicants) as separate forms, separate data destinations
- Dual-audience navigation: "Get Started" (primary button) and "Apply Now" (outlined button) in the header
- WhatsApp floating button on all pages — lightweight anchor link, not a heavy widget
- US-registration and bilingual capability callouts on the homepage — these are differentiators, not footnotes
- Mobile-responsive layout with proper horizontal nav on desktop (the current hamburger-only nav is a known failure)
- Fast page load — Astro handles this by default; avoid autoplay video and heavy third-party scripts on load

**Should have (competitive differentiators):**
- Calendly inline embed on the booking/contact page (not just an external link)
- Case studies with named clients and measurable outcomes — highest-trust social proof in the BPO category
- "Starting from $9/hour" prominently anchored with a CTA to contact for custom pricing
- Bilingual English/Spanish capability callout — WorkWiser's Nicaragua operations make this a concrete operational detail, not a marketing claim
- Service guarantee or contract flexibility language — "no long-term contracts" addresses the #1 outsourcing objection
- Post-application confirmation page that tells applicants what happens next and expected response time

**Defer to v2:**
- Role-specific or industry-specific landing pages (Real Estate VAs, Healthcare VAs) — high value, requires significant content production
- Blog/content marketing — only after a publishing cadence is committed to; an empty blog is worse than no blog
- Live chat widget — only if agent coverage during chat hours is guaranteed
- Dynamic job board listings — out of scope until hiring volume justifies it
- Client portal or login — separate application, link from nav if needed

### Architecture Approach

The architecture is a flat static Astro site: one `BaseLayout.astro` wraps all pages, data-driven TypeScript files power all repeating content, and page files (`src/pages/`) are clean compositions of named section components. No dynamic routing is needed in v1. All form submissions route externally (Netlify Forms or Formspree → email notification + Google Sheets via Zapier/Make). The build order matters: scaffold and brand tokens first, then layout, then data files, then shared components, then page sections, then forms, then 404, then deploy and DNS.

**Major components:**
1. `BaseLayout.astro` — HTML shell, SEO meta tags, font loading, Header/Footer slots; single source of truth for all pages
2. `src/data/` (siteConfig.ts, services.ts, team.ts, caseStudies.ts, testimonials.ts) — all content that changes without structural edits; Claude edits data files, never markup, for routine updates
3. Home page sections (Hero, StatsBar, ServicesGrid, WhyUs, CalendlyBanner, TestimonialsSlider) — each a standalone component; `index.astro` composes them
4. `ContactForm.astro` and `JobApplicationForm.astro` — separate components with separate Netlify/Formspree form names; data routes to separate Google Sheets tabs
5. `Header.astro` with dual-audience CTAs — "Get Started" primary button and "Apply Now" ghost button, both sourced from `siteConfig.ts`

### Critical Pitfalls

1. **DNS cutover kills the live site prematurely** — Never point `workwiser.io` to Netlify until the new site is confirmed working on `workwiser.netlify.app`. Export a DNS snapshot first. Schedule cutover during low-traffic hours. Keep WordPress intact for two weeks post-cutover as a fallback.

2. **Formspree free tier silently drops submissions at 50/month** — Use Make (Integromat) webhook as the primary record to Google Sheets; Formspree is only the email notifier. Or route entirely through Make and bypass Formspree limits. Monitor the Formspree dashboard monthly.

3. **Netlify Forms not detected in Astro build output** — Netlify Forms requires `data-netlify="true"` on the `<form>` tag and a hidden `form-name` input, and the form must appear in static HTML (not inside a client-side island). Verify the form appears in the Netlify dashboard immediately after the first deploy. Simpler alternative: use Formspree or Make webhook exclusively and skip Netlify Forms.

4. **Tailwind CSS purges dynamically constructed class names** — Never use string interpolation to build Tailwind class names (e.g., `"text-" + color`). Write complete literal class names only. Test with `npm run build && npm run preview` before launch — the bug appears in production builds, not development.

5. **Astro island hydration not enabled for interactive components** — Calendly embed, animated stats counters, and the WhatsApp button all require JavaScript at runtime. In Astro, JavaScript runs on the client only when a `client:` directive is explicitly set. Missing directives reproduce the "0+" counter bug from the current site. Use `client:visible` for below-the-fold components to preserve page speed.

---

## Implications for Roadmap

The architecture's 14-stage build order (from ARCHITECTURE.md) maps cleanly to 5 roadmap phases. Dependencies are strict: later phases cannot proceed without earlier ones.

### Phase 1: Foundation and Brand Setup
**Rationale:** All other phases depend on the project scaffold, brand tokens, and base layout existing. This is zero-deliverable for end users but gates everything else. Must happen first.
**Delivers:** Working Astro project with Tailwind v4 configured, brand colors and fonts as CSS tokens in `@theme {}`, `BaseLayout.astro` with SEO meta support, Header and Footer with dual-audience nav CTAs, Netlify deployment pipeline connected to git, site live at `workwiser.netlify.app`.
**Addresses features:** Dual-audience navigation, mobile-responsive layout, fast page load baseline
**Avoids pitfalls:** Sets `public/` vs `src/assets/` conventions before any images are added (Pitfall m4); configures Netlify deploy notifications for failure alerts (Pitfall M3)

### Phase 2: Core Pages and Content
**Rationale:** The home page and services page are the primary conversion surfaces. They must be built before forms or integrations — no point wiring up a form backend if the pages don't exist.
**Delivers:** Home page with all sections (Hero with pricing anchor, StatsBar with working JS, ServicesGrid, WhyUs, TestimonialsSlider, CalendlyBanner); Services page with role-specific cards from `services.ts`; About/team page with `team.ts` data; all data files populated with real WorkWiser content.
**Addresses features:** Outcome-first hero, pricing anchor, services with role tiles, stats counter, social proof, About/team with photos, US-registration callout, bilingual callout
**Avoids pitfalls:** Astro `client:*` directive verification for StatsBar (Pitfall M2); Tailwind literal class names audit (Pitfall C4); no wall-of-text service descriptions (Anti-feature); real team photos not stock imagery (Anti-feature)

### Phase 3: Forms and Lead Capture
**Rationale:** Forms depend on pages existing (Phase 2) and require external service setup (Netlify Forms detection, Formspree account, Make scenario, Google Sheets configuration) that must be tested before launch. Building forms last in this group avoids the trap of building them first and discovering integration issues mid-project.
**Delivers:** Contact form (employer inquiries) routing to email notification + Google Sheets append; Job application form on `/careers` page with role-specific fields and post-submission confirmation page; form spam protection via honeypot field; Google Sheets column structure documented with "do not reorganize" warning.
**Addresses features:** Contact form, job application form with expectation-setting, careers page with applicant-only content
**Avoids pitfalls:** Formspree submission limit (Pitfall C2) — Make webhook as primary record; Netlify Forms detection verified immediately on first deploy (Pitfall C3); Google Sheets column dependency documented at setup (Pitfall M4); separate form names for contact vs. job application (Domain Pitfall D3)

### Phase 4: Third-Party Integrations and Social Proof
**Rationale:** Calendly embed and WhatsApp button are straightforward but require performance testing after integration. Case studies require written content that should be prepared in parallel with Phase 3. This phase completes the differentiator feature set.
**Delivers:** Calendly popup widget on all pages (not inline iframe on mobile) and inline embed on contact/booking page; WhatsApp floating anchor button with `defer` loading; case studies page populated with 2-3 real client outcomes from `caseStudies.ts`; testimonials with specific named clients and measurable results; Lighthouse performance audit after all third-party scripts are in place.
**Addresses features:** Calendly booking, case studies, social proof with specific outcomes, WhatsApp floating button
**Avoids pitfalls:** Calendly mobile breakage from fixed height (Pitfall m1) — use popup widget; WhatsApp widget performance hit (Pitfall M5) — plain anchor tag with `defer`; generic/vague testimonials (Anti-feature)

### Phase 5: Launch and Migration
**Rationale:** DNS cutover is deliberately last. The new site must be fully verified on the Netlify subdomain before the domain is touched. This phase is sequenced after a full stakeholder review.
**Delivers:** DNS snapshot exported from current registrar; full review and sign-off on `workwiser.netlify.app`; domain pointed to Netlify during low-traffic window; WordPress install kept intact for two weeks; sitemap.xml submitted to Google Search Console; Netlify bandwidth monitoring enabled.
**Addresses features:** All features — this phase makes them live
**Avoids pitfalls:** DNS cutover kills live site (Pitfall C1) — the entire phase is structured around preventing this; Netlify free tier bandwidth limit (Pitfall m3) — image optimization verified in Phase 2 before launch

### Phase Ordering Rationale

- Phase 1 before everything: brand tokens and base layout are imported by every component; building components without them creates rework
- Phase 2 before Phase 3: form confirmation pages and careers page need to exist before configuring form redirect destinations
- Phase 3 before Phase 4: form infrastructure must be verified working before traffic-driving integrations (Calendly, WhatsApp) bring real submissions
- Phase 4 before Phase 5: performance audit must happen after all third-party scripts are loaded; a Lighthouse score drop discovered post-launch is harder to fix
- Phase 5 last: non-negotiable; DNS cutover with a broken or incomplete site causes real business downtime

### Research Flags

Phases with well-documented patterns (skip `/gsd:research-phase`):
- **Phase 1 (Foundation):** Astro scaffold, Tailwind v4 setup, and Netlify connection are all official, step-by-step documented processes. No research needed.
- **Phase 2 (Core Pages):** Astro component patterns and file-based routing are stable and well-documented. Content structure is defined in ARCHITECTURE.md. No research needed.
- **Phase 5 (Launch):** DNS cutover process is standard; pitfall documentation in PITFALLS.md is sufficient.

Phases that may benefit from targeted research during planning:
- **Phase 3 (Forms):** The Netlify Forms + Zapier + Google Sheets pipeline has several decision points (Netlify Forms vs. Formspree vs. Make-only) that should be validated against current free-tier pricing before the phase begins. Pricing may have changed since training data cutoff.
- **Phase 4 (Integrations):** Calendly embed API and WhatsApp link format are stable, but performance impact of third-party scripts should be benchmarked against the specific Tailwind/Astro build to confirm Lighthouse scores.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro 5, Tailwind v4, and Netlify are all verified against official documentation as of March 2026. Vite plugin requirement for Tailwind v4 is confirmed. |
| Features | MEDIUM | Table stakes and anti-features are grounded in PROJECT.md observations (real bugs on the current site). Differentiators are based on training knowledge of the BPO space through August 2025 — should be validated against 3-5 live competitor sites before finalizing copy. |
| Architecture | HIGH | Astro file-based routing, single layout pattern, and data-file separation are first-class Astro patterns, stable since Astro 2.x. No uncertainty here. |
| Pitfalls | MEDIUM-HIGH | Technical pitfalls (Tailwind purging, Astro hydration, Netlify Forms detection) are HIGH confidence from official docs. Business domain pitfalls (BPO conversion copy, trust barriers) are MEDIUM — well-established patterns but should be validated with post-launch analytics. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Formspree vs. Netlify Forms vs. Make-only:** Three valid approaches for form handling with different free-tier limits and setup complexity. The decision should be locked in at Phase 3 planning after verifying current pricing. Recommendation: default to Netlify Forms + Make webhook (Netlify for email notification, Make for Google Sheets append), which avoids Formspree submission limits entirely.

- **Brand assets not yet reviewed:** Colors, fonts, and logo files from the actual WorkWiser brand guide have not been analyzed. Phase 1 cannot finalize `@theme {}` tokens without them. Owner should provide brand color hex values and font names before Phase 1 begins.

- **Actual content not yet produced:** Services descriptions, team bios, case study narratives, and testimonial copy must be written before Phase 2 can be completed. Data files can be scaffolded with placeholder content but must be populated with real, accurate information before launch. The "$9/hour" figure and US-registration status are confirmed in PROJECT.md; all other claims must be verified with the owner.

- **@tailwindcss/typography v4 compatibility:** The typography plugin (needed for About/Case Studies prose) may require a v4-specific version. Verify before installing in Phase 1.

- **Netlify free tier limits:** 100 submissions/month and 100GB bandwidth/month were accurate as of training data (August 2025). Verify at netlify.com/pricing before launch.

---

## Sources

### Primary (HIGH confidence)
- Tailwind CSS v4.0 announcement and v4 Vite installation docs: https://tailwindcss.com/blog/tailwindcss-v4 and https://tailwindcss.com/docs/installation/using-vite — verified March 2026
- Netlify Forms setup and notifications docs: https://docs.netlify.com/forms/setup/ and https://docs.netlify.com/forms/notifications/ — verified March 2026
- Astro official documentation (project structure, layouts, routing, image optimization): https://docs.astro.build — stable patterns unchanged since Astro 2.x
- Tailwind CSS content configuration (purge behavior): https://tailwindcss.com/docs/content-configuration
- Formspree pricing (50 submissions/month free tier): https://formspree.io/pricing

### Secondary (MEDIUM confidence)
- BPO/staffing website conversion patterns — training knowledge through August 2025; consistent across category but not verified against live 2026 competitor sites this session
- WhatsApp widget performance impact — general third-party script behavior; specific numbers depend on widget vendor and implementation
- Netlify free tier: 100 form submissions/month — training data; verify current pricing before launch

### Tertiary (LOW confidence)
- @tailwindcss/typography compatibility with Tailwind v4 — training data only; verify plugin version at implementation time

---
*Research completed: 2026-03-19*
*Ready for roadmap: yes*
