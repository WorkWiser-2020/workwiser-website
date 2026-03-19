# WorkWiser Website Rebuild

## What This Is

WorkWiser (workwiser.io) is a US-registered BPO and virtual staffing company that both places remote staff for businesses AND manages operations on their behalf. The new website replaces an outdated WordPress site with a custom-coded, fast, and professionally designed marketing site that communicates credibility, explains services clearly, and converts visitors into leads.

Target audience: Growing companies that need cost-effective remote talent and operational support.

## Core Value

Prospective clients land on the site, immediately understand what WorkWiser does and why it's trustworthy, and take action — either booking a call or submitting a contact form.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Home page with hero, value propositions, stats, service highlights, and CTAs
- [ ] Services page detailing virtual assistant roles (customer service, sales, tech support, legal, real estate, healthcare, and more)
- [ ] About / Team page with WorkWiser's story, mission, and team
- [ ] Case Studies page with real client results and outcomes
- [ ] Contact form that sends submissions via email AND saves to Google Sheets
- [ ] Calendly integration so visitors can book a discovery call directly
- [ ] Job application form for prospective agents (submissions → email + Google Sheets)
- [ ] Responsive design that works on mobile, tablet, and desktop
- [ ] Brand implementation matching existing logo, colors, fonts, and mockups

### Out of Scope

- Client portal / login system — complexity exceeds v1 scope; planned for v2
- Job board with live listings — v2 feature once hiring volume justifies it
- E-commerce / payments — not relevant to the business model
- WordPress CMS — replaced by Astro static site for performance and cost reasons
- Blog / content marketing — deferred; focus is on converting visitors first

## Context

- **Existing site**: workwiser.io runs on WordPress with a blue color scheme and stock photography. Known issues: counters display "0 +" (JavaScript not loading), design feels generic, no case studies page, navigation is minimal (hamburger-only even on desktop).
- **Branding**: Logo, color palette, typography, page mockups, and written copy are all ready — no design work needed.
- **Current pages**: Home, About us, Why us, Contact. New site expands to Home, Services, About/Team, Case Studies, plus job application flow.
- **Owner profile**: Business owner (not a developer). Content updates will happen via Claude Code — owner describes changes, Claude implements them.
- **Services offered**: Virtual assistants for customer service, tech support, sales, legal, real estate, healthcare, and administrative tasks. Starting at $9/hour. Bilingual (English/Spanish). IRS-compliant as a US-registered company.
- **Social presence**: LinkedIn, Facebook, Instagram active. WhatsApp support chat in use.

## Constraints

- **Tech Stack**: Astro + Tailwind CSS — chosen for performance, free hosting on Netlify, and scalability without a server or database
- **Hosting**: Netlify free tier; existing workwiser.io domain to be connected
- **Timeline**: Launch within 1 month — ASAP priority
- **Content**: All copy and branding assets are pre-existing; no copywriting work needed
- **Forms**: Contact and job application forms must route to both email notification AND a Google Sheets record (via a free service such as Formspree or Make/Zapier)
- **No developer dependency**: Site must be maintainable by the owner using Claude as the update mechanism

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro over WordPress | Free hosting, faster pages, no plugin maintenance, fully custom to brand | — Pending |
| Netlify for hosting | Free tier covers marketing site traffic, easy domain connection, built-in form handling option | — Pending |
| Formspree / Make for forms | Bridges static site forms to email + Google Sheets without a backend | — Pending |
| Calendly for booking | Already in use on current site (calendly.com/workwiser-info/ceo-client); keep same link | — Pending |
| Job application form in v1 | Owner confirmed this is a known need; better to build it now than retrofit | — Pending |

---
*Last updated: 2026-03-19 after initialization*
