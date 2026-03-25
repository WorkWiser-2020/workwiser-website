# Phase 7: Careers Page - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Job application page for prospective VAs and agents — clearly separate from client-facing content. Form submits to recruitment@workwiser.io via Netlify Forms and logs to a new tab in the existing Google Sheet via Zapier. A link to the Careers page is added to the footer.

</domain>

<decisions>
## Implementation Decisions

### Page tone & audience separation
- Headline: Claude's Discretion — pick the best headline that clearly signals this is for applicants, not clients
- Visual treatment: Claude's Discretion — same gradient hero or slightly different accent, whatever best maintains brand consistency
- Benefits section: Claude's Discretion — brief "Why work with WorkWiser" section above the form if it helps, or just hero + form if minimal works better
- Copy must be clearly applicant-focused — no mixing client-facing and applicant-facing language (CAREER-01)

### Form fields & validation
- Required fields: Full Name, Email, and Role of interest — all other fields optional
- "Role of interest" dropdown: Claude's Discretion — use WorkWiser's service industries as the role list (Customer Support, Healthcare, Real Estate, Tech Support, Sales, Legal, or more specific breakdowns)
- "Experience level": Claude's Discretion — dropdown with ranges or free text, whichever is more useful for hiring
- All other fields per CAREER-02: Phone, Location (country), LinkedIn/resume link (optional), Short cover message
- Same form UX patterns as Contact form: inline validation on blur, honeypot spam protection, inline success message on submit

### Navigation placement
- Careers link in footer only — do NOT add to main header navigation
- Keeps main nav focused on clients (Home, About Us, Why Us, Contact)
- Footer link labeled "Careers" or "Join Our Team" — Claude's Discretion on exact label

### Submission pipeline
- Email notification to: recruitment@workwiser.io (existing hiring email)
- Netlify Forms with separate form name (e.g., "careers" vs "contact") so submissions don't mix
- Zapier → Google Sheets: new tab ("Website Applications") in the existing recruitment Google Sheet — NOT a separate spreadsheet
- Claude documents Zapier setup steps as a deliverable (same pattern as Phase 5 ZAPIER-SETUP-GUIDE)

### Claude's Discretion
- Hero headline and subtitle text
- Whether to include a benefits/perks section above the form
- Dropdown role list contents
- Experience level input format
- Card/section styling within brand guidelines
- Success message text after application submit

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ContactForm.astro`: Netlify Forms AJAX pattern — clone and adapt for careers form (different fields, different form name)
- `ContactHero.astro`: Gradient hero pattern to follow
- `src/data/contactContent.ts`: Data file pattern with typed interfaces
- `Footer.astro`: Needs a Careers link added

### Established Patterns
- Netlify Forms: `data-netlify="true"`, `netlify-honeypot="bot-field"`, hidden `form-name` input, AJAX fetch with URLSearchParams
- Inline validation on blur with red error text below fields
- Success message: form fades out, "Thanks!" message fades in
- TypeScript data files in `src/data/` with typed interfaces

### Integration Points
- `src/pages/careers.astro` — new page file, auto-routes to `/careers`
- `src/data/careersContent.ts` — new data file for form fields, roles, benefits
- `src/components/Footer.astro` — add Careers link
- Netlify Forms dashboard: separate form name to distinguish from contact submissions

</code_context>

<specifics>
## Specific Ideas

- Hiring email is recruitment@workwiser.io (already active)
- Google Sheet for applications already exists — Zapier adds a new tab, doesn't replace existing data
- Form must use a different Netlify form name than the contact form to keep submissions separate

</specifics>

<deferred>
## Deferred Ideas

- Adding Careers to main header navigation — keep footer only for now
- Auto-reply email to applicants after submission — can add in Zapier later
- Job listings with individual detail pages — if needed, add as future phase

</deferred>

---

*Phase: 07-careers-page*
*Context gathered: 2026-03-25*
