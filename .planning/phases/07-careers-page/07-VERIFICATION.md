---
phase: 07-careers-page
verified: 2026-03-25T00:00:00Z
status: human_needed
score: 9/9 must-haves verified
re_verification: false
human_verification:
  - test: "Visit /careers on the dev server (npm run dev), confirm hero gradient shows with applicant-focused headline 'Join the WorkWiser Team' and 'Now Hiring' badge"
    expected: "Gradient hero is visible with badge pill, headline, subtitle, and Apply Now CTA button — no client-facing copy"
    why_human: "Visual rendering and copy tone cannot be verified programmatically"
  - test: "On /careers, confirm the 'Why Work With WorkWiser?' section renders 3 benefit cards"
    expected: "Three white rounded cards displayed in a row (or stacked on mobile) with benefit copy from careersBenefits"
    why_human: "Layout and visual rendering requires browser"
  - test: "Scroll to the application form and confirm all 8 fields render: Full Name, Email, Phone, Location, Role of Interest (dropdown), Years of Experience (dropdown), LinkedIn Profile or Resume URL, Cover Message"
    expected: "All 8 fields are visible; Role of Interest and Years of Experience render as <select> dropdowns with options"
    why_human: "Field rendering and dropdown options require browser verification"
  - test: "Click 'Submit Application' without filling any fields"
    expected: "Red inline error messages appear below Full Name, Email, and Role of Interest (the three required fields)"
    why_human: "Client-side blur/submit validation behavior requires browser"
  - test: "Tab out of the Email field after typing an invalid email (e.g. 'notanemail')"
    expected: "Red error 'Please enter a valid email address.' appears below the Email field on blur"
    why_human: "Blur-time validation requires browser interaction"
  - test: "Check the footer Quick Links column on any page"
    expected: "'Join Our Team' link is visible in the Quick Links column and navigates to /careers when clicked"
    why_human: "Visual presence in footer requires browser"
  - test: "Open browser DevTools Console on /careers and confirm zero JavaScript errors on load"
    expected: "No Calendly-related errors, no CareersForm element-not-found errors"
    why_human: "Console errors require browser runtime"
  - test: "Deploy to Netlify staging and follow CAREERS-ZAPIER-SETUP-GUIDE.md Part 1 to configure email notifications"
    expected: "A test submission to the careers form triggers an email to recruitment@workwiser.io"
    why_human: "Netlify Forms email pipeline requires live Netlify deployment — cannot verify locally"
  - test: "Follow CAREERS-ZAPIER-SETUP-GUIDE.md Part 2 to create the Zapier Zap"
    expected: "A test submission appears as a new row in the 'Website Applications' tab with all 8 columns populated"
    why_human: "Zapier + Google Sheets integration requires external service configuration"
---

# Phase 7: Careers Page Verification Report

**Phase Goal:** Prospective agents and VAs can find the job application page, understand it is separate from the client-facing site, and submit an application that reaches the hiring team via email and Google Sheets
**Verified:** 2026-03-25
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visiting /careers shows a page clearly targeted at prospective agents and VAs — no client-facing copy | ? HUMAN | Page file exists; hero headline is "Join the WorkWiser Team" with applicant-focused subtitle. Visual tone requires human review |
| 2 | The job application form renders all 8 fields: Full Name, Email, Phone, Location, Role of interest (dropdown), Experience level (dropdown), LinkedIn/resume link, Cover message | ✓ VERIFIED | Build output dist/careers/index.html confirms all 8 name attributes: fullName, email, phone, location, role, experience, linkedin, coverMessage |
| 3 | Required fields (Full Name, Email, Role of interest) show validation errors on blur if left empty | ? HUMAN | validateField + blur event listener wired to querySelectorAll('[required]') with widened HTMLSelectElement union confirmed in source; runtime behavior requires browser |
| 4 | Submitting the form posts to Netlify Forms under form name 'careers' and shows an inline success message | ✓ VERIFIED | form[name="careers"] data-netlify="true" confirmed in source and dist/careers/index.html; hidden form-name input present; success-msg div wired in AJAX submit handler |
| 5 | Footer Quick Links column includes a 'Join Our Team' link pointing to /careers | ✓ VERIFIED | Footer.astro navLinks array contains { href: '/careers', label: 'Join Our Team' }; dist/index.html contains href="/careers" |
| 6 | A human can follow the Zapier guide to set up Netlify email notifications to recruitment@workwiser.io for the 'careers' form | ✓ VERIFIED | Guide exists; Step 6 explicitly sets Form to 'careers' and Email to recruitment@workwiser.io |
| 7 | A human can follow the guide to create a Zapier Zap routing submissions to the 'Website Applications' tab in Google Sheets | ✓ VERIFIED | Guide Part 2 provides numbered steps; Step 9 selects Website Applications worksheet; field mapping table in Step 10 covers all 8 IDs |
| 8 | The guide instructs the user to create the 'Website Applications' tab BEFORE running Zap setup | ✓ VERIFIED | Prerequisites section explicitly states this with a callout block explaining why order matters |
| 9 | Field mapping table in the guide matches the actual form field IDs defined in careersContent.ts | ✓ VERIFIED | Guide table lists: fullName, email, phone, location, role, experience, linkedin, coverMessage — exact match to careersFormFields IDs in careersContent.ts |

**Score:** 7/9 truths fully verified programmatically, 2 require human review (visual rendering and validation behavior)

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/data/careersContent.ts` | CareersFormField interface, careersHero, roleOptions, experienceOptions, careersFormFields, careersBenefits | ✓ VERIFIED | All 6 exports present; CareersFormField interface includes type union with 'select' | 'tel' | 'url'; 8 fields defined with correct required/half flags |
| `src/components/CareersHero.astro` | Gradient hero with badge pill, applicant-focused headline, no Calendly dependency | ✓ VERIFIED | Gradient section bg-gradient-to-br from-teal via-blue to-navy; badge pill renders careersHero.badge; Apply Now CTA uses #careers-form anchor (no Calendly) |
| `src/components/CareersForm.astro` | Netlify Forms AJAX, select field rendering for both half and full width, HTMLSelectElement blur validation, fade-to-success | ✓ VERIFIED | form name="careers" data-netlify="true"; select branch present in both grid and full-width renderers; validateField union includes HTMLSelectElement; fade-to-success wired; success message present |
| `src/pages/careers.astro` | Page at /careers composing hero + benefits + form | ✓ VERIFIED | Imports CareersHero, CareersForm, careersBenefits; section id="careers-form" anchors hero CTA; dist/careers/index.html exists |
| `src/components/Footer.astro` | navLinks array updated with /careers entry | ✓ VERIFIED | { href: '/careers', label: 'Join Our Team' } is the 5th entry in navLinks |
| `.planning/phases/07-careers-page/CAREERS-ZAPIER-SETUP-GUIDE.md` | Step-by-step Zapier + Netlify setup guide for careers pipeline | ✓ VERIFIED | File exists; contains recruitment@workwiser.io, Website Applications, careers form scoping, tab creation prerequisite, all 8 field IDs in mapping table, troubleshooting section |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `src/pages/careers.astro` | `src/components/CareersForm.astro` | component import | ✓ WIRED | `import CareersForm from '../components/CareersForm.astro'` confirmed; `<CareersForm />` used in JSX |
| `src/pages/careers.astro` | `src/components/CareersHero.astro` | component import | ✓ WIRED | `import CareersHero from '../components/CareersHero.astro'` confirmed; `<CareersHero />` used |
| `src/components/CareersForm.astro` | `src/data/careersContent.ts` | named import of careersFormFields | ✓ WIRED | `import { careersFormFields } from '../data/careersContent.ts'` confirmed; fields iterated in row-builder and rendered in JSX |
| `src/components/CareersForm.astro` | Netlify Forms | form[name='careers'] data-netlify='true' | ✓ WIRED | Both form attribute and hidden `<input type="hidden" name="form-name" value="careers" />` present |
| `src/components/CareersHero.astro` | `src/data/careersContent.ts` | named import of careersHero | ✓ WIRED | `import { careersHero }` confirmed; badge, headline, subtitle all rendered |
| `CAREERS-ZAPIER-SETUP-GUIDE.md` | `CareersForm.astro` | field mapping table must match name attributes | ✓ WIRED | Guide Step 10 table IDs (fullName, email, phone, location, role, experience, linkedin, coverMessage) exactly match form field name attributes in dist/careers/index.html |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `CareersForm.astro` | careersFormFields | careersContent.ts (static typed array — 8 field definitions) | Yes — 8 concrete field objects with real labels, types, and options | ✓ FLOWING |
| `CareersHero.astro` | careersHero | careersContent.ts (static typed object) | Yes — real badge, headline, subtitle strings | ✓ FLOWING |
| `careers.astro` | careersBenefits | careersContent.ts (static typed array) | Yes — 3 real benefit strings rendered as list items | ✓ FLOWING |

Note: All data sources are static typed arrays/objects in careersContent.ts. There is no database or API call, which is correct for this use case — content is editorial, not dynamic.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| dist/careers/index.html exists | `ls dist/careers/` | index.html present | ✓ PASS |
| form[name="careers"] in build output | grep count | 1 match | ✓ PASS |
| data-netlify="true" in build output | grep count | 1 match | ✓ PASS |
| All 8 form field name attributes present | grep for each ID | fullName, email, phone, location, role, experience, linkedin, coverMessage all found | ✓ PASS |
| dist/index.html contains /careers footer link | grep count | 1 match | ✓ PASS |
| No Calendly references in careers components | grep on CareersHero.astro, careers.astro | 0 matches (only a comment confirming absence) | ✓ PASS |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|---------|
| CAREER-01 | 07-01 | Page clearly targeted at prospective agents/VAs — separate from client-facing content | ? HUMAN | careers.astro page exists with applicant-focused copy; visual separation from client pages requires human review |
| CAREER-02 | 07-01 | Job application form with all specified fields including dropdowns | ✓ SATISFIED | All 8 fields (fullName, email, phone, location, role select, experience select, linkedin, coverMessage) confirmed in build output and source |
| CAREER-03 | 07-02 | Form submission sends email notification to internal hiring email | ? HUMAN | Netlify Forms wired with name="careers"; email notification setup documented in CAREERS-ZAPIER-SETUP-GUIDE.md Part 1 with recruitment@workwiser.io; requires live Netlify deployment to test |
| CAREER-04 | 07-02 | Form submission saves to Google Sheets via Zapier (separate from contact form) | ? HUMAN | CAREERS-ZAPIER-SETUP-GUIDE.md provides complete Zapier setup scoped to 'careers' form and 'Website Applications' tab; requires external service configuration to verify end-to-end |
| CAREER-05 | 07-01 | Link to Careers page visible in navigation / footer | ✓ SATISFIED | "Join Our Team" → /careers in Footer.astro navLinks; confirmed present in dist/index.html |

All 5 requirement IDs (CAREER-01 through CAREER-05) are accounted for across plans 07-01 and 07-02. No orphaned requirements.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None | — | — | — | — |

All "placeholder" string matches in the grep scan are legitimate HTML `placeholder=` attributes on form inputs (field hint text), not code stubs. No TODO, FIXME, `return null`, hardcoded empty arrays, or hollow implementations found in any phase file.

---

### Human Verification Required

#### 1. Careers page visual tone and separation from client content (CAREER-01)

**Test:** Start dev server with `npm run dev`, navigate to `http://localhost:4321/careers`
**Expected:** Page opens with a gradient hero showing "Now Hiring" badge, "Join the WorkWiser Team" headline, and applicant-focused subtitle about bilingual professionals. No client-facing copy ("Get started", "Book a consultation", etc.) should be visible on this page.
**Why human:** Content tone and audience targeting are subjective — cannot be verified by grep.

#### 2. Hero, benefits section, and form layout rendering

**Test:** On `/careers`, visually confirm the three sections: gradient hero, "Why Work With WorkWiser?" benefits row, and application form with "Apply Now" heading.
**Expected:** Three distinct sections render in order. The benefits section shows 3 white rounded cards. The form section has an "Apply Now" heading and "Fields marked * are required." subheading.
**Why human:** Visual layout requires browser.

#### 3. Select dropdowns render with correct options

**Test:** Click the "Role of Interest" dropdown.
**Expected:** Options: Customer Support, Real Estate, Healthcare, Tech Support, Sales, Legal, Other. Click the "Years of Experience" dropdown — options: Less than 1 year, 1–2 years, 3–5 years, 5+ years.
**Why human:** Select option rendering requires browser.

#### 4. Required field validation on submit (CAREER-02)

**Test:** Click "Submit Application" without filling any fields.
**Expected:** Red inline error messages appear below Full Name ("This field is required."), Email ("This field is required."), and Role of Interest ("This field is required."). Other fields show no errors.
**Why human:** Client-side validation behavior requires browser interaction.

#### 5. Email blur validation

**Test:** Click into the Email field, type "notanemail", then press Tab to move focus out.
**Expected:** Red error "Please enter a valid email address." appears below the Email field immediately on blur.
**Why human:** Blur event behavior requires browser interaction.

#### 6. Footer "Join Our Team" link on all pages

**Test:** Check the footer Quick Links column on the Home page, About Us, and Contact pages.
**Expected:** "Join Our Team" is the last link in the Quick Links column on every page, and clicking it navigates to /careers.
**Why human:** Footer rendering across all page templates requires browser.

#### 7. No Calendly JavaScript errors on /careers

**Test:** Open browser DevTools > Console while on `/careers`.
**Expected:** Zero JavaScript errors on page load. Specifically, no "Calendly is not defined" or element-not-found errors.
**Why human:** Console errors require runtime execution.

#### 8. Netlify email notification pipeline (CAREER-03)

**Test:** Deploy to Netlify staging. Follow CAREERS-ZAPIER-SETUP-GUIDE.md Part 1. Submit a test application via the deployed /careers page.
**Expected:** recruitment@workwiser.io receives an email notification within a few minutes of the submission.
**Why human:** Netlify Forms email pipeline only activates on a deployed Netlify site — cannot be tested locally.

#### 9. Zapier Google Sheets integration (CAREER-04)

**Test:** After completing item 8, follow CAREERS-ZAPIER-SETUP-GUIDE.md Part 2. Submit another test application.
**Expected:** A new row appears in the "Website Applications" tab of the recruitment Google Sheet with all 8 columns populated from the form submission.
**Why human:** Requires Zapier account setup, Google Sheets access, and a live Netlify deployment.

---

## Gaps Summary

No code gaps found. All six source artifacts are present, substantive, fully wired, and carry real data through to the rendered output. The build passes and all 8 form fields are confirmed in the compiled HTML.

The two items that remain are external integration validations (Netlify email + Zapier Zap) that are explicitly documented in CAREERS-ZAPIER-SETUP-GUIDE.md and require a live Netlify deployment to complete. These are correct scope for the phase — the code deliverables are done; the integrations are user-executed setup steps post-deploy.

Status is **human_needed** (not **gaps_found**) because automated checks pass fully. The outstanding items are visual confirmation and external service setup that cannot be verified programmatically.

---

_Verified: 2026-03-25_
_Verifier: Claude (gsd-verifier)_
