# Phase 5: Contact Us Page - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Contact page where prospective clients can submit an inquiry via form (Netlify Forms → email notification to info@workwiser.io) or book a call via Calendly. Page includes hero, contact form, stats sidebar, contact info, and Calendly booking. Zapier/Google Sheets integration is external configuration — Claude documents the setup steps but no code is needed for it.

</domain>

<decisions>
## Implementation Decisions

### Page layout & hero
- Hero: Same teal-to-navy gradient pattern as About Us and Why Us pages, with W-arrow watermark
- Headline: "Let's meet!" with subtitle "Drop a line or give us a call"
- Yellow CTA in hero linking to Calendly
- Layout: Claude's Discretion — form left with sidebar right is recommended, but Claude picks best layout for the brand

### Form behavior & validation
- On successful submit: form fades out, replaced by inline success message ("Thanks! We'll be in touch within 24 hours.") — stay on same page, no redirect
- Required fields: Email and Location only — all other fields optional to keep friction low
- Validation: inline error messages below each invalid field (on blur / on submit attempt)
- Spam protection: Netlify honeypot field (hidden field, no CAPTCHA, zero user friction)

### Calendly integration
- Compact "Book a Free Consultation" card with button that opens Calendly popup overlay
- Placed in the sidebar below stats and contact info
- Uses Calendly's popup widget JS snippet (not full inline calendar)
- Calendly URL: calendly.com/workwiser-info/ceo-client

### Form submission pipeline
- Netlify Forms handles form submission (built into Netlify deploy)
- Email notification to info@workwiser.io only (can add recipients in Netlify dashboard later)
- Zapier → Google Sheets: external configuration, not code — Claude provides step-by-step setup guide as a documentation deliverable
- No auto-reply email to client (can be added in Zapier later)

### Claude's Discretion
- Exact form field arrangement (grid vs stacked)
- Stats sidebar presentation (vertical variant of existing StatsBar or custom cards)
- Contact info styling (phone + email display)
- Success message animation and styling
- Mobile layout stacking order

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `StatsBar.astro`: Horizontal stats bar with count-up animation — may need vertical variant for sidebar
- `CtaBanner.astro`: CTA pattern with Calendly link and W-arrow SVG watermark
- `AboutHero.astro` / `WhyUsHero.astro`: Gradient hero pattern to follow for consistency
- `BaseLayout.astro`: Header/Footer already wired, `/contact` link in both Header and Footer nav

### Established Patterns
- TypeScript data files in `src/data/` for content (homeContent.ts, aboutContent.ts, whyUsContent.ts)
- Vanilla JS in `<script>` blocks for interactivity (accordion, count-up) — no framework
- Tailwind v4 utility classes, brand tokens in CSS @theme block
- All Calendly links currently use `target="_blank"` new-tab pattern

### Integration Points
- `src/pages/contact.astro` — new page file, auto-routes to `/contact`
- `src/data/contactContent.ts` — new data file for form fields, stats, contact info
- Header nav already has `/contact` link wired
- Footer already shows phone + email in contact column
- Netlify Forms requires `data-netlify="true"` attribute on `<form>` element

</code_context>

<specifics>
## Specific Ideas

- Stats sidebar should show same numbers as home page StatsBar: 300+ Projects, 100+ Clients, 10+ Years, 150 Team Members
- Phone: (302) 257-5427, Email: info@workwiser.io (consistent with footer)
- Form fields from requirements: First Name, Last Name, Job Title, Company Name, Email (required), Location of operations (required), Message

</specifics>

<deferred>
## Deferred Ideas

- Zapier auto-reply email to client after form submission — can be added later in Zapier dashboard
- Google Analytics conversion tracking on form submit — belongs in SEO/analytics phase
- Thank-you page for conversion tracking — not needed now, inline success message chosen

</deferred>

---

*Phase: 05-contact-us-page*
*Context gathered: 2026-03-23*
