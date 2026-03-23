# Roadmap: WorkWiser Website Rebuild

## Overview

Build a fast, brand-accurate Astro 5 marketing site that replaces WorkWiser's outdated WordPress site. The project moves through nine natural delivery boundaries: scaffold and deploy pipeline first, then brand system, then each content page in order of conversion priority, then form integrations, then SEO polish, and finally a careful DNS cutover that keeps WordPress live as a fallback.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Project Scaffold** - Astro 5 project with Tailwind v4 and Netlify deploy pipeline live at a preview URL (completed 2026-03-20)
- [x] **Phase 2: Brand System** - Brand tokens, fonts, BaseLayout, Header, and Footer — shared by all pages (completed 2026-03-20)
- [x] **Phase 3: Home Page** - Full home page with all sections: hero, stats, services, value props, process, testimonials (completed 2026-03-20)
- [x] **Phase 4: About Us + Why Us Pages** - Both Canva-designed pages built from brand guidelines and mockups (completed 2026-03-23)
- [x] **Phase 5: Contact Us Page** - Contact form wired to email notification and Google Sheets via Netlify Forms + Zapier (completed 2026-03-23)
- [ ] **Phase 6: Case Studies Page** - Data-driven listing page built from caseStudies.ts following brand guidelines
- [ ] **Phase 7: Careers Page** - Job application page with separate form pipeline to hiring email and Google Sheets
- [ ] **Phase 8: SEO + Brand Polish** - Meta tags, Open Graph, favicon, and brand consistency audit across all pages
- [ ] **Phase 9: Launch** - Full pre-launch review, DNS cutover to Netlify, SSL verification, WordPress fallback in place

## Phase Details

### Phase 1: Project Scaffold
**Goal**: A working Astro 5 project with Tailwind CSS v4 is deployed to Netlify and accessible at a preview URL, with sitemap and robots.txt auto-generated
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-09, FOUND-10
**Success Criteria** (what must be TRUE):
  1. Running `npm run build` locally produces no errors
  2. Pushing to git triggers a Netlify deploy that completes successfully
  3. The site is reachable at a `*.netlify.app` preview URL in a browser
  4. `/sitemap.xml` and `/robots.txt` are accessible at the preview URL
**Plans**: 1 plan

Plans:
- [ ] 01-01-PLAN.md — Scaffold Astro 5 project with Tailwind CSS v4, sitemap, and Netlify CI/CD

### Phase 2: Brand System
**Goal**: Every shared visual element (brand colors, fonts, header, footer, responsive layout) is live and consistent so every page inherits them without duplication
**Depends on**: Phase 1
**Requirements**: FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08
**Success Criteria** (what must be TRUE):
  1. Brand color tokens (#003c64, #0072c9, #26aeb4, #f3f145, etc.) are defined in CSS `@theme {}` and usable as Tailwind classes
  2. Open Sauce font loads correctly for headers; Inter (or Helvetica Now Display) loads for body text
  3. Header shows WorkWiser logo, navigation links (Home, About Us, Why Us, Contact), phone number, and "Get Started" CTA button — on desktop, not hamburger-only
  4. Footer shows logo, email, phone, and LinkedIn/Facebook/Instagram social links
  5. Layout is fully responsive: navigation and content adapt correctly on mobile, tablet, and desktop
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md — Brand tokens (@theme colors/fonts), Astro 6 font loading, BaseLayout with stub Header/Footer
- [ ] 02-02-PLAN.md — Full Header (sticky, responsive nav, mobile slide-out), Footer (contact/social), index.astro wired to BaseLayout

### Phase 3: Home Page
**Goal**: Prospective clients land on the home page and immediately understand what WorkWiser does, see credible social proof, and have a clear path to book a call or contact the team
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07
**Success Criteria** (what must be TRUE):
  1. Hero section displays with real photo (not missing/broken image), "We are your Trusted Partners" headline, body copy, yellow "Start delegating" CTA, and working Calendly link
  2. Stats bar shows correctly rendered numbers (300+ Completed Projects, 100+ Satisfied Clients, 10+ Years Experience, 150 Team Members) — not "0+"
  3. Services/industries section shows cards for Customer Support, Real Estate, Healthcare, Tech Support, Sales, and Legal with an "Explore all Roles" link
  4. Value propositions section shows all six differentiators: Simplified Hiring, IRS Compliance, Full Contract Management, Customized Roles, Bilingual Talent, Flexible Payroll Options
  5. 5-step process section and testimonials section are both visible and populated with real WorkWiser content
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md — Home page data layer + Hero, StatsBar, ServicesGrid components
- [ ] 03-02-PLAN.md — ValueProps, ProcessSteps, Testimonials + compose index.astro

### Phase 4: About Us + Why Us Pages
**Goal**: Visitors who want to learn more about WorkWiser and understand why to choose them can access two complete, brand-accurate pages with real content
**Depends on**: Phase 2
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, ABOUT-05, ABOUT-06, WHY-01, WHY-02, WHY-03
**Success Criteria** (what must be TRUE):
  1. About Us page displays hero, mission statement, vision, and stated mission ("preferred recruitment partner...") in styled sections matching the Canva mockup
  2. Core values section shows all four values (Integrity, Collaboration, Excellence, Innovation) with descriptions
  3. Team section is present (populated with real photos if available, placeholder structure if not)
  4. Why Us page displays the six differentiators with icons and descriptions, matching brand styling
  5. Why Us page includes a working "Start today" CTA that links to the contact page or Calendly
**Plans**: 2 plans

Plans:
- [ ] 04-01-PLAN.md — Data files (aboutContent.ts + whyUsContent.ts), About Us page components (Hero, Vision/Mission, Core Values, Our Story, Team, Strategic Location), and about.astro page
- [ ] 04-02-PLAN.md — Why Us page components (Hero, Differentiators, Recruitment Process, FAQ Accordion) and why-us.astro page

### Phase 5: Contact Us Page
**Goal**: Prospective clients can submit a contact inquiry that reliably reaches the WorkWiser team via email notification and is recorded in Google Sheets, and can also book a call directly via Calendly
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07
**Success Criteria** (what must be TRUE):
  1. Contact page renders hero ("Let's meet!"), stats sidebar, contact info (phone + email), and Calendly booking link
  2. Contact form accepts all required fields (First Name, Last Name, Job Title, Company Name, Email, Location, Message) and validates required fields before submission
  3. Submitting the form sends an email notification to info@workwiser.io
  4. Submitting the form creates a new row in the designated Google Sheets tab via Zapier
  5. Calendly booking widget or link is visible and functional on the page
**Plans**: 2 plans

Plans:
- [ ] 05-01-PLAN.md — Data layer (contactContent.ts), BaseLayout head slot, ContactHero and ContactSidebar components
- [ ] 05-02-PLAN.md — ContactForm with Netlify Forms AJAX submission, contact.astro page composition, Zapier setup guide

### Phase 6: Case Studies Page
**Goal**: Prospective clients can view real, named client outcomes on a polished case studies page that builds trust and reinforces WorkWiser's credibility
**Depends on**: Phase 2
**Requirements**: CASE-01, CASE-02, CASE-03, CASE-04
**Success Criteria** (what must be TRUE):
  1. Case studies listing page renders cards showing client name/industry, challenge summary, and a key measurable outcome (e.g., "Saved 20 hours/week")
  2. All case study data lives in `src/data/caseStudies.ts` — adding a new case study requires only editing that file
  3. Page follows brand guidelines (navy/blue/teal palette, Open Sauce headers, consistent card layout) with no Canva mockup to reference
  4. A CTA at the bottom of the page links to Contact Us
**Plans**: TBD

Plans:
- [ ] 06-01: Build caseStudies.ts data file and Case Studies listing page with brand-consistent card layout

### Phase 7: Careers Page
**Goal**: Prospective agents and VAs can find the job application page, understand it is separate from the client-facing site, and submit an application that reaches the hiring team via email and Google Sheets
**Depends on**: Phase 5
**Requirements**: CAREER-01, CAREER-02, CAREER-03, CAREER-04, CAREER-05
**Success Criteria** (what must be TRUE):
  1. Careers page is clearly targeted at prospective agents/VAs — page copy and heading do not mix client-facing and applicant-facing language
  2. Job application form accepts all fields (Full Name, Email, Phone, Location, Role of interest dropdown, Experience level, LinkedIn/resume link, Cover message) and validates required fields
  3. Submitting the application sends an email notification to the internal hiring email address
  4. Submitting the application creates a new row in a separate Google Sheets tab (distinct from the client contact sheet) via Zapier
  5. A link to the Careers page is visible in site navigation or the footer
**Plans**: TBD

Plans:
- [ ] 07-01: Build Careers page and job application form
- [ ] 07-02: Wire job application form to email + Google Sheets pipeline (separate from contact form)

### Phase 8: SEO + Brand Polish
**Goal**: Every page has correct SEO metadata and Open Graph tags, brand elements are applied consistently across the site, and the site looks production-ready for launch
**Depends on**: Phases 3, 4, 5, 6, 7
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. Every page has a unique, descriptive title tag and meta description visible in the browser tab and page source
  2. Open Graph tags are present on all pages — sharing a page URL on LinkedIn or Facebook shows a correct title, description, and image preview
  3. The WorkWiser favicon (W submark) displays in browser tabs on all pages
  4. Logo appears as the color wordmark on light backgrounds and white version on dark/blue backgrounds across all pages
  5. Yellow accents, dot grid patterns, gradient panels, and arrow icons are applied consistently and match the Canva mockups
**Plans**: TBD

Plans:
- [ ] 08-01: Implement SEO meta tags, Open Graph, and favicon across all pages
- [ ] 08-02: Brand consistency audit — review all pages against Canva mockups and brand guidelines

### Phase 9: Launch
**Goal**: The new WorkWiser site is live at workwiser.io with SSL active, DNS cutover completed safely with the WordPress site intact as a fallback
**Depends on**: Phase 8
**Requirements**: LAUNCH-01, LAUNCH-02, LAUNCH-03, LAUNCH-04, LAUNCH-05
**Success Criteria** (what must be TRUE):
  1. All pages and forms have been manually tested and verified at the Netlify preview URL before the domain is touched
  2. A DNS snapshot of the current workwiser.io records exists before any changes are made
  3. workwiser.io resolves to the new Netlify site and loads the Astro-built home page in a browser
  4. SSL certificate is active — the site loads over HTTPS with no browser security warning
  5. The old WordPress site remains accessible (at a backup URL or kept live) for at least two weeks post-launch
**Plans**: TBD

Plans:
- [ ] 09-01: Pre-launch verification — full site review at Netlify preview URL
- [ ] 09-02: DNS cutover — export DNS snapshot, point workwiser.io to Netlify, verify SSL, document WordPress fallback

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

Note: Phases 3, 4, and 5 all depend on Phase 2 (brand system) but are independent of each other. Phases 3-7 can be completed in any order after Phase 2.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Scaffold | 1/1 | Complete   | 2026-03-20 |
| 2. Brand System | 2/2 | Complete   | 2026-03-20 |
| 3. Home Page | 2/2 | Complete    | 2026-03-20 |
| 4. About Us + Why Us | 2/2 | Complete   | 2026-03-23 |
| 5. Contact Us | 2/2 | Complete   | 2026-03-23 |
| 6. Case Studies | 0/1 | Not started | - |
| 7. Careers | 0/2 | Not started | - |
| 8. SEO + Brand Polish | 0/2 | Not started | - |
| 9. Launch | 0/2 | Not started | - |
