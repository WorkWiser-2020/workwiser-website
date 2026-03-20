# Requirements: WorkWiser Website Rebuild

**Defined:** 2026-03-19
**Core Value:** Prospective clients land on the site, immediately understand what WorkWiser does and why it's trustworthy, and take action — either booking a call or submitting a contact form.

---

## v1 Requirements

### Foundation & Setup

- [ ] **FOUND-01**: Astro 5 project scaffolded with Tailwind CSS v4 and Netlify configuration
- [x] **FOUND-02**: Brand tokens implemented in CSS `@theme {}` block: colors (#003c64, #0072c9, #26aeb4, #effefe, #f3f145, #ffffff), gradients, fonts
- [x] **FOUND-03**: Open Sauce font loaded (header font — available via CDN/fontsource)
- [x] **FOUND-04**: Body font decision resolved: Helvetica Now Display (commercial license required) OR Inter (free, near-identical alternative)
- [x] **FOUND-05**: BaseLayout.astro created — shared header, footer, SEO meta, and page structure
- [ ] **FOUND-06**: Header/navigation implemented: Home, About Us, Why Us, Contact links + phone number (302) 257-5427 + "Get Started" CTA button, desktop nav (not hamburger-only)
- [ ] **FOUND-07**: Footer implemented with logo, email (info@workwiser.io), phone, social links (LinkedIn, Facebook, Instagram)
- [ ] **FOUND-08**: Mobile-responsive layout works on phone, tablet, and desktop
- [ ] **FOUND-09**: Netlify deploy pipeline live — site accessible at a Netlify preview URL before domain cutover
- [ ] **FOUND-10**: Sitemap and robots.txt generated automatically by Astro

### Home Page

- [ ] **HOME-01**: Hero section — "More than a Virtual Assistant agency" (subtitle) + "We are your Trusted Partners" (H1) + body copy + "Start delegating" CTA button (yellow) + Calendly link
- [ ] **HOME-02**: Stats bar — 300+ Completed Projects, 100+ Satisfied Clients, 10+ Years Experience, 150 Team Members (correctly displaying numbers, not "0+")
- [ ] **HOME-03**: Industries/services section — cards for Customer Support, Real Estate, Healthcare, Tech Support, Sales, Legal with "Explore all Roles" link
- [ ] **HOME-04**: Value propositions section — "Grow your vision with talented virtual assistants" featuring: Simplified Hiring, IRS Compliance, Full Contract Management, Customized Roles, Bilingual Talent, Flexible Payroll Options
- [ ] **HOME-05**: 5-step process section — Understanding Your Needs → Pre-Qualified Candidates → Client Selection → Quick Onboarding → Boost Productivity
- [ ] **HOME-06**: Testimonials section — "Real Results Delivered By WorkWiser VA's" with client/team testimonial cards
- [ ] **HOME-07**: Hero uses a real photo (not a broken or missing image) — photo of team member or VA professional

### About Us Page

- [ ] **ABOUT-01**: Hero consistent with brand (blue gradient background, navigation)
- [ ] **ABOUT-02**: Mission statement — "Create opportunities for businesses and talented professionals alike"
- [ ] **ABOUT-03**: Vision section — "To connect exceptional talent with extraordinary opportunities, empowering individuals and organizations to achieve their full potential"
- [ ] **ABOUT-04**: Mission section — "To be the preferred recruitment partner, known for our outstanding service, unwavering commitment, and transformative solutions"
- [ ] **ABOUT-05**: Core values section — Integrity, Collaboration, Excellence, Innovation with descriptions
- [ ] **ABOUT-06**: Team section (if team photos are available to provide)

### Why Us Page

- [ ] **WHY-01**: Hero — "WorkWiser is your best option" with brand styling
- [ ] **WHY-02**: Six differentiators with icons and descriptions:
  - Tailored Approach — personalized client matching, not one-size-fits-all
  - Extensive Expertise — experienced recruiters across multiple industries
  - Thorough Screening Process — interviews, references, skill assessments
  - Confidentiality and Privacy — sensitive information always secured
  - Continuous Support — ongoing support after candidate placement
  - Time and Cost Efficiency — significantly reduced time to fill positions
- [ ] **WHY-03**: CTA section — "Start today" button linking to contact or Calendly

### Contact Us Page

- [ ] **CONT-01**: Contact page hero — "Let's meet! Drop a line or give us a call"
- [ ] **CONT-02**: Contact form with fields: First Name, Last Name, Job Title, Company Name, Email (required), Location of operations (required), Message
- [ ] **CONT-03**: Form submission sends email notification to info@workwiser.io via Netlify Forms
- [ ] **CONT-04**: Form submission saves to Google Sheets via Zapier integration
- [ ] **CONT-05**: Stats sidebar on contact page — 100+ Satisfied Clients, 300+ Projects Completed, 10+ Years Experience, 150 Team Members
- [ ] **CONT-06**: Calendly booking embed/link visible on contact page ("Book a Free Consultation" — calendly.com/workwiser-info/ceo-client)
- [ ] **CONT-07**: Contact info displayed: phone (302) 257-5427, email info@workwiser.io

### Case Studies Page

*Note: No Canva design exists for this page — will be built following brand guidelines.*

- [ ] **CASE-01**: Case studies listing page with cards — client name/industry, challenge, result summary
- [ ] **CASE-02**: Each case study card shows: industry, role type, a key measurable outcome (e.g., "Saved 20 hours/week")
- [ ] **CASE-03**: Case studies data stored in a TypeScript data file (src/data/caseStudies.ts) for easy updates via Claude
- [ ] **CASE-04**: CTA at bottom of page linking to Contact Us

### Careers / Job Application Page

*Note: No Canva design exists for this page — will be built following brand guidelines.*

- [ ] **CAREER-01**: Page clearly targeted at prospective agents/VAs — separate from client-facing content
- [ ] **CAREER-02**: Job application form with fields: Full Name, Email, Phone, Location (country), Role of interest (dropdown), Experience level, LinkedIn or resume link (optional), Short cover message
- [ ] **CAREER-03**: Form submission sends email notification to internal hiring email
- [ ] **CAREER-04**: Form submission saves to Google Sheets (separate sheet from client contact form) via Zapier
- [ ] **CAREER-05**: Link to Careers page visible in navigation (e.g., under "Join Us" or in footer)

### Brand & SEO

- [ ] **SEO-01**: Each page has a unique title tag and meta description
- [ ] **SEO-02**: Open Graph tags (for social sharing previews) on all pages
- [ ] **SEO-03**: Logo used correctly — primary wordmark on light backgrounds, white version on dark/blue backgrounds
- [ ] **SEO-04**: Brand elements applied consistently — yellow accents, dot grid pattern, gradient panels, arrow icon
- [ ] **SEO-05**: Favicon set to the WorkWiser W submark

### Launch

- [ ] **LAUNCH-01**: All pages tested at Netlify preview URL before domain cutover
- [ ] **LAUNCH-02**: DNS records documented (current WordPress site snapshot) before any changes
- [ ] **LAUNCH-03**: workwiser.io domain pointed to Netlify (CNAME/A record update)
- [ ] **LAUNCH-04**: SSL certificate active on new site
- [ ] **LAUNCH-05**: Old WordPress site kept accessible for at least 2 weeks post-launch as fallback

---

## v2 Requirements

### Client Portal

- Login system for existing clients to view their VA status, invoices, or documents
- Requires backend infrastructure (Supabase or similar) — significant scope increase

### Job Board

- Live job listings with open positions
- Applicants browse and apply to specific roles rather than a general form
- Requires a CMS or database for listing management

### Role-Specific Landing Pages

- Dedicated pages for Legal VA, Real Estate VA, Healthcare VA, etc.
- Good for SEO but requires writing unique content per role

### Blog / Content Marketing

- Article system for SEO-driven traffic
- Requires Astro Content Collections setup

---

## Out of Scope

| Feature | Reason |
|---------|---------|
| WordPress CMS | Replaced by Astro static site — better performance, no maintenance |
| E-commerce / payments | Not part of WorkWiser's business model |
| Multi-language site (Spanish) | Single English language for v1 — add Spanish in v2 |
| Live chat (beyond WhatsApp button) | WhatsApp floating button covers this use case for v1 |
| Email newsletter system | Not requested; defer to v2 if needed |

---

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 — Project Scaffold | Pending |
| FOUND-09 | Phase 1 — Project Scaffold | Pending |
| FOUND-10 | Phase 1 — Project Scaffold | Pending |
| FOUND-02 | Phase 2 — Brand System | Complete |
| FOUND-03 | Phase 2 — Brand System | Complete |
| FOUND-04 | Phase 2 — Brand System | Complete |
| FOUND-05 | Phase 2 — Brand System | Complete |
| FOUND-06 | Phase 2 — Brand System | Pending |
| FOUND-07 | Phase 2 — Brand System | Pending |
| FOUND-08 | Phase 2 — Brand System | Pending |
| HOME-01 | Phase 3 — Home Page | Pending |
| HOME-02 | Phase 3 — Home Page | Pending |
| HOME-03 | Phase 3 — Home Page | Pending |
| HOME-04 | Phase 3 — Home Page | Pending |
| HOME-05 | Phase 3 — Home Page | Pending |
| HOME-06 | Phase 3 — Home Page | Pending |
| HOME-07 | Phase 3 — Home Page | Pending |
| ABOUT-01 | Phase 4 — About Us + Why Us | Pending |
| ABOUT-02 | Phase 4 — About Us + Why Us | Pending |
| ABOUT-03 | Phase 4 — About Us + Why Us | Pending |
| ABOUT-04 | Phase 4 — About Us + Why Us | Pending |
| ABOUT-05 | Phase 4 — About Us + Why Us | Pending |
| ABOUT-06 | Phase 4 — About Us + Why Us | Pending |
| WHY-01 | Phase 4 — About Us + Why Us | Pending |
| WHY-02 | Phase 4 — About Us + Why Us | Pending |
| WHY-03 | Phase 4 — About Us + Why Us | Pending |
| CONT-01 | Phase 5 — Contact Us | Pending |
| CONT-02 | Phase 5 — Contact Us | Pending |
| CONT-03 | Phase 5 — Contact Us | Pending |
| CONT-04 | Phase 5 — Contact Us | Pending |
| CONT-05 | Phase 5 — Contact Us | Pending |
| CONT-06 | Phase 5 — Contact Us | Pending |
| CONT-07 | Phase 5 — Contact Us | Pending |
| CASE-01 | Phase 6 — Case Studies | Pending |
| CASE-02 | Phase 6 — Case Studies | Pending |
| CASE-03 | Phase 6 — Case Studies | Pending |
| CASE-04 | Phase 6 — Case Studies | Pending |
| CAREER-01 | Phase 7 — Careers | Pending |
| CAREER-02 | Phase 7 — Careers | Pending |
| CAREER-03 | Phase 7 — Careers | Pending |
| CAREER-04 | Phase 7 — Careers | Pending |
| CAREER-05 | Phase 7 — Careers | Pending |
| SEO-01 | Phase 8 — SEO + Brand Polish | Pending |
| SEO-02 | Phase 8 — SEO + Brand Polish | Pending |
| SEO-03 | Phase 8 — SEO + Brand Polish | Pending |
| SEO-04 | Phase 8 — SEO + Brand Polish | Pending |
| SEO-05 | Phase 8 — SEO + Brand Polish | Pending |
| LAUNCH-01 | Phase 9 — Launch | Pending |
| LAUNCH-02 | Phase 9 — Launch | Pending |
| LAUNCH-03 | Phase 9 — Launch | Pending |
| LAUNCH-04 | Phase 9 — Launch | Pending |
| LAUNCH-05 | Phase 9 — Launch | Pending |

**Coverage:**
- v1 requirements: 52 total
- Mapped to phases: 52
- Unmapped: 0

---
*Requirements defined: 2026-03-19*
*Last updated: 2026-03-19 — traceability updated after roadmap creation (9-phase structure)*
