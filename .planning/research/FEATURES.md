# Feature Landscape

**Domain:** BPO / Virtual Staffing Company Marketing Website
**Researched:** 2026-03-19
**Confidence:** MEDIUM — Based on training knowledge of the BPO/staffing website space through August 2025. External research tools were unavailable during this session. Findings reflect well-established industry patterns but should be validated against live competitor sites before finalizing decisions.

---

## Table Stakes

Features users expect from any credible BPO or virtual staffing company. Missing any of these and prospects assume the company is too small, inexperienced, or untrustworthy to handle their operations.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear hero with outcome-first headline | Visitors give 3-5 seconds before bouncing. "Hire remote staff from $9/hr" beats "We are WorkWiser." | Low | Headline must name what you do and who it's for. Not a tagline. |
| Single primary CTA in hero | Decision fatigue kills conversions. One path forward — book a call or contact us. | Low | Secondary CTA (learn more / see services) acceptable below the fold. |
| Services listed with role names | "Virtual Assistants" is too vague. Prospects search for "customer service VA," "real estate VA." | Low | Each role deserves a tile or section with 3-5 bullet points of what they do. |
| Pricing anchor (even a "starting from" figure) | Buyers pre-qualify themselves. Without a number they assume expensive and disengage. | Low | "$9/hour" is a strong anchor — use it prominently. Not burying it is a differentiator in this space. |
| Social proof — client logos or testimonials | Trust is the #1 barrier in BPO. Prospects are handing you their operations. | Low | Even 3-5 logos or quotes are better than none. |
| Contact form | Some buyers won't book a call cold. They want to ask a question first. | Low | Route to email + a record store. Formspree or equivalent handles this on static sites. |
| Mobile-responsive design | 40-60% of B2B research now happens on mobile. A broken mobile view reads as "this company can't execute." | Medium | Full mobile nav required — not just readable text, but usable forms and CTAs. |
| Fast page load | Google penalizes slow sites in rankings. Prospects associate page speed with operational quality. | Low | Astro static site handles this well by default. Avoid heavy video autoplay. |
| About / team section | BPO is a trust sale. Who runs this company? Where are they based? Are they real people? | Low | Founder photo + brief bio minimum. Team photos for key roles if available. |
| Contact information visible | Email, WhatsApp, or phone in the footer and/or header. Not hidden behind a form only. | Low | WhatsApp CTA is especially effective for this audience — add a floating WhatsApp button. |
| US company signal | US-registered status reduces the "offshore shady" objection immediately. | Low | "US-Registered Company" badge or statement near the top of the page. IRS compliance mention adds credibility. |

---

## Differentiators

Features that top-performing BPO and virtual staffing sites use to separate themselves. Prospects won't leave without them, but they are what close deals.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Calendly inline booking (not just a link) | Removing friction from scheduling converts browsers to booked calls. A link requires a new tab, an embed completes in-flow. | Low | Embed the Calendly widget on a dedicated booking page or at the bottom of the home page. Already in use — make it prominent. |
| Case studies with measurable outcomes | "We saved Client X 60% on support costs" is more persuasive than any copy. B2B buyers present case studies internally to justify the spend. | Medium | Even 2-3 one-page case studies with before/after stats outperform testimonial quotes alone. |
| Bilingual capability signal | For US companies with Spanish-speaking customer bases, bilingual staff is a real pain point. Most BPOs don't advertise this prominently. | Low | A single "Bilingual English/Spanish Staff" callout can pre-empt a common objection. |
| Role-specific landing paths | A real estate investor and a SaaS founder have different needs. Segmenting by industry or role lets copy speak directly to that reader. | Medium | Can start simple: a "Real Estate VAs" section on the Services page. Full separate pages are a v2 enhancement. |
| Stats counter section | "500+ clients served," "10,000+ hours delivered" — concrete numbers communicate scale and experience. | Low | Animated counters are common but verify JavaScript loads correctly (the existing site has a known counter bug at zero). |
| Clear dual-audience navigation | Employers and job seekers land on the same site. A clear "Hire Staff" vs "Apply Now" split in the nav prevents confusion. | Low | Two CTA buttons in the nav header is the standard pattern — e.g., "Get Started" (blue/primary) and "Apply" (outlined/secondary). |
| Job application form with expectation-setting | Applicants who know what to expect don't ghost. A "what happens next" paragraph after form submission reduces no-shows in the hiring funnel. | Low | The form itself is table stakes; the expectation-setting copy is the differentiator. |
| WhatsApp floating button | BPO buyers — especially those evaluating across time zones or from mobile — expect WhatsApp as a fast channel. Most US-based SaaS companies do NOT offer this, creating a gap WorkWiser can own. | Low | Fixed position bottom-right, opens wa.me link. Visible on all pages. |
| Service guarantee or risk reversal language | "Try us for 30 days" or "No long-term contracts required" addresses the #1 objection to outsourcing: fear of being locked in. | Low | Even a single sentence about contract flexibility moves buyers forward. Verify what WorkWiser actually offers before writing this copy. |
| Industry-specific VA examples | Showing a real estate VA workflow or a healthcare VA task list makes the abstract concrete. Prospects can see themselves using the service. | Medium | A short "Day in the life of your VA" section per industry is high-impact and low-cost to write. |

---

## Anti-Features

Things that hurt conversion, damage trust, or add complexity without payoff. Deliberately avoid these.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Generic stock photography (especially offshore call-center imagery) | Erodes trust immediately. Prospect thinks "this looks like every other BPO." Worse if photos are visibly mismatched to the brand. | Use real team photos if available. If stock is necessary, choose authentic small-team imagery, not headset-and-rows-of-desks. |
| Broken JavaScript elements (zero counters, non-loading animations) | The current site has this exact bug. Prospects see "0 +" and think the company inflated its numbers or can't maintain its own website. | Test all interactive elements before launch. Prefer CSS animations over JS for stats unless JS is confirmed to load. |
| Hamburger-only nav on desktop | The current site does this. Desktop users expect a horizontal nav bar. Forcing them to hunt for a hamburger signals low production quality. | Standard horizontal nav on desktop. Hamburger/slide-out only on mobile. |
| Hiding pricing entirely | BPO prospects self-select on price. No pricing signal means wasted discovery calls with non-qualified leads, and qualified leads leaving to find a competitor who shows numbers. | "Starting from $9/hour" is sufficient. Full pricing tables are not needed in v1. |
| Multiple competing CTAs in the hero | "Book a call / Contact us / See pricing / Learn more / Apply now" — all in the hero causes paralysis. | One primary CTA. One soft secondary. Everything else below the fold. |
| Wall-of-text service descriptions | Prospects scan before they read. A paragraph of features in prose form gets skipped. | Bullet lists, icons, and short headers. Save detailed prose for case studies and role-specific sub-pages. |
| Separate site for job applications | A completely separate career site (jobs.workwiser.io, Greenhouse, Lever, etc.) breaks the flow for applicants and requires maintaining two sites. | One site, one apply flow. A clearly labeled "Careers" or "Apply" section in the main nav routes applicants correctly. |
| Live chat requiring an always-on agent | If no one is monitoring live chat, an unanswered open chat box destroys trust faster than having no chat at all. | WhatsApp floating button routes to async messaging — no agent availability required. Use live chat only if coverage is guaranteed. |
| Blog/content section without a publishing plan | An empty blog with 2 posts from 2023 signals inactivity and poor attention to the site. Worse than no blog. | Defer blog entirely until a content publishing cadence is committed to. v2 feature. |
| Testimonials without specifics | "Great company! Highly recommend." — this is indistinguishable from fake reviews and adds no persuasive weight. | Include client name, company type, and a specific outcome. "Reduced our support backlog by 40% in the first month — Sarah T., E-commerce Operations Manager." |
| Pop-ups on entry or within 5 seconds | Immediately intrusive on a B2B site. Signals desperation. Aggravates mobile users especially. | Use exit-intent pop-ups sparingly if needed. Better: a persistent sticky CTA bar rather than interruptive pop-ups. |
| Automatic video/audio on page load | Kills page speed, startles users in office environments, violates browser autoplay policies on most devices. | Use a play-to-start video embed (YouTube or Vimeo) if a video is needed. |

---

## Feature Dependencies

```
Calendly booking → Calendly account (already exists: calendly.com/workwiser-info/ceo-client)
Contact form → Formspree or equivalent → Email delivery + Google Sheets log
Job application form → Same form backend (Formspree or Make) → separate sheet/tab
Stats counters → JavaScript must load correctly before using animated counters
Case studies → Requires written content from client stories (copy must be prepared in advance)
Dual-audience nav ("Hire Staff" / "Apply Now") → Job application page must exist as a destination
WhatsApp floating button → wa.me link with WorkWiser's WhatsApp number
Social proof logos/testimonials → Requires permission from clients and real copy — cannot be invented
Pricing anchor → Must be confirmed with business owner before publishing ("starting from $9/hr")
```

---

## MVP Recommendation

**Prioritize for v1 launch (within 1 month):**

1. Outcome-first hero with pricing anchor and single primary CTA (book a call via Calendly)
2. Services section with role-specific tiles and bullet-point task lists
3. Stats section (with verified working JavaScript or CSS-only animation fallback)
4. Social proof section — client logos and/or testimonials with specifics
5. Case studies page — even 2-3 real examples with measurable outcomes
6. About / team page with real photos
7. Contact form (Formspree → email + Google Sheets)
8. Job application form (separate form → email + Google Sheets, separate tab)
9. Dual-audience navigation ("Get Started" + "Apply Now" in nav header)
10. WhatsApp floating button on all pages
11. US-registration and bilingual capability callouts
12. Calendly embed on booking/contact page

**Defer to v2:**

- Role-specific or industry-specific landing pages — high value but requires content production; v1 uses one Services page
- Client portal / login — explicitly out of scope
- Live job board — out of scope until hiring volume justifies it
- Blog / content marketing — deferred pending publishing plan
- Live chat widget — only if agent coverage is guaranteed

---

## Dual Audience: "Hire Staff" vs "Apply for a Job"

This is one of the most common UX failures on BPO sites — treating two completely different audiences as one.

**Recommended pattern:**

- Nav header: Two visually distinct CTAs — "Get Started" (primary/filled button) for employers, "Apply Now" (outlined/ghost button) for job seekers
- Hero: Written entirely for employers (the revenue-generating audience)
- Footer: "Looking for work? Apply here" link — routes job seekers without competing with employer messaging in the main flow
- Careers/Apply page: Standalone page optimized for applicants. Sets expectations (roles available, hiring process, what to expect). Contains the application form.
- No mixing: Job seeker content should not appear on employer-facing pages (Services, Case Studies, About). Cross-contamination confuses both audiences.

**Application form minimum fields:**
- Full name
- Email
- Phone / WhatsApp number
- English proficiency level (self-assessed)
- Role(s) of interest (multi-select)
- Years of relevant experience
- Resume/CV upload or LinkedIn URL
- Brief: "Why do you want to work with WorkWiser?" (short text)
- Availability / timezone

**Post-submission UX:** Confirmation page (not just a thank-you message) that tells the applicant: what happens next, expected response time, and who to contact with questions.

---

## Pricing Display Guidance

**What the research consistently shows for BPO sites:**

- Showing a "starting from" price dramatically increases qualified lead volume — buyers self-select
- Full pricing tables (with tiers) are more common on marketplace-style VA platforms (Time Etc, Belay, Magic) than on custom BPO providers like WorkWiser
- For a custom-staffing model, the right pattern is: anchor price prominently ("From $9/hour"), then explain that exact pricing depends on role and hours, and CTA to book a call for a custom quote
- Do NOT hide pricing behind "contact us for pricing" only — this pattern correlates with high bounce rates in B2B service categories

---

## Social Proof Priority Order

For a BPO company specifically, ranked by persuasive weight:

1. **Case studies with named clients and measurable outcomes** — highest trust, hardest to fake
2. **Client logos** — visual shorthand for credibility; even SMB client logos work if recognizable
3. **Video testimonials** — high trust if production quality is adequate; skip if low quality
4. **Written testimonials with full name, title, company type** — medium trust
5. **Stats counters** ("500+ clients," "98% retention rate") — low trust alone, high trust when combined with above
6. **"As seen in" press logos** — useful if WorkWiser has any press coverage; otherwise skip

---

## Sources and Confidence

| Area | Confidence | Basis |
|------|------------|-------|
| Table stakes features | MEDIUM | Training knowledge through August 2025; patterns consistent across BPO/staffing category; no live competitor verification this session |
| Differentiators | MEDIUM | Same basis; bilingual and WhatsApp patterns are especially well-established for Latin America-sourced BPOs |
| Anti-features | HIGH | Counter bug, hamburger nav, and hidden pricing are documented on the current WorkWiser site (PROJECT.md); general anti-patterns are well-established |
| Dual-audience navigation | MEDIUM | Standard pattern in staffing industry; specific implementation should be validated against 2-3 live competitor sites |
| Pricing display | MEDIUM | Pattern consistent with B2B services; WorkWiser's "$9/hour" figure taken from PROJECT.md as confirmed |
| Social proof ranking | MEDIUM | Well-established B2B conversion research; BPO-specific ordering based on trust barrier analysis |

**Validation recommended:** Before finalizing the site, manually review 3-5 direct competitors (e.g., supportninja.com, wing.com, myoutdesk.com, belay.com, 20four7va.com) to verify which differentiators they do and do not use. This identifies gaps WorkWiser can own.
