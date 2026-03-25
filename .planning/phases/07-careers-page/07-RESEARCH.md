# Phase 7: Careers Page - Research

**Researched:** 2026-03-25
**Domain:** Astro static page, Netlify Forms AJAX, TypeScript data layer, footer navigation, Zapier integration
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Submission target:** recruitment@workwiser.io
- **Netlify Forms form name:** "careers" (separate from "contact")
- **Zapier destination:** new tab called "Website Applications" in the existing Google Sheet — NOT a new spreadsheet
- **Footer only navigation:** Careers link in footer Quick Links only — do NOT add to main header nav
- **Zapier guide deliverable:** same format as Phase 5 ZAPIER-SETUP-GUIDE.md
- **Required fields:** Full Name, Email, Role of interest — all others optional
- **Other fields (per CAREER-02):** Phone, Location (country), Experience level, LinkedIn/resume link (optional), Short cover message
- **Form UX:** inline validation on blur, honeypot spam protection, inline success message (same pattern as ContactForm.astro)

### Claude's Discretion
- Hero headline and subtitle text
- Whether to include a benefits/perks section above the form
- Dropdown role list contents (WorkWiser's service industries as guide)
- Experience level input format (dropdown or free text)
- Card/section styling within brand guidelines
- Success message text after application submit
- Exact footer link label ("Careers" or "Join Our Team")

### Deferred Ideas (OUT OF SCOPE)
- Adding Careers to main header navigation
- Auto-reply email to applicants after submission
- Job listings with individual detail pages
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CAREER-01 | Page clearly targeted at prospective agents/VAs — separate from client-facing content | Hero + copy strategy in Architecture Patterns; applicant-only tone |
| CAREER-02 | Job application form with fields: Full Name, Email, Phone, Location, Role of interest (dropdown), Experience level, LinkedIn or resume link (optional), Short cover message | FormField interface extended to support `select` type; careersContent.ts data shape documented |
| CAREER-03 | Form submission sends email notification to internal hiring email | Netlify Forms email notification — same mechanism as Phase 5, different form name and recipient |
| CAREER-04 | Form submission saves to Google Sheets (separate sheet from client contact form) via Zapier | New Zap targeting "careers" form + "Website Applications" tab; field mapping documented |
| CAREER-05 | Link to Careers page visible in navigation (footer) | Footer.astro navLinks array update; placement in Quick Links column |
</phase_requirements>

---

## Summary

Phase 7 is a near-clone of Phase 5 (Contact Us) applied to a different audience. The code patterns are fully established: Netlify Forms AJAX, TypeScript data files, gradient hero, inline validation. The primary work is (1) adapting the form to new fields including a `select` dropdown type not currently in the FormField interface, (2) adding a "careers" form name to keep submissions separate, (3) adding a footer link, and (4) producing a Zapier guide for the new form-to-sheets connection.

The sole new technical element compared to Phase 5 is the `select` (dropdown) input type. The existing ContactForm.astro renders `input` and `textarea` — it does not handle `select`. CareersForm.astro must extend the FormField type to include `'select'` and add a `options?: string[]` property, then render `<select>` elements in the template branch.

The Zapier guide follows the Phase 5 structure verbatim, with three differences: form name is "careers", recipient email is recruitment@workwiser.io, and the Sheets destination is the "Website Applications" tab of the existing spreadsheet.

**Primary recommendation:** Clone ContactForm.astro as CareersForm.astro, extend FormField type to handle `select`, create careersContent.ts for field definitions and role options, create careers.astro page, add footer link, and produce ZAPIER-SETUP-GUIDE.md in the phase directory.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x (already installed) | Page routing and component rendering | Project foundation — `/careers` auto-routes from `src/pages/careers.astro` |
| Tailwind CSS v4 | 4.x (already installed) | Utility classes for styling | Project foundation — all existing components use it |
| TypeScript | (already configured) | Type-safe data file | All data files in `src/data/` use typed interfaces |
| Netlify Forms | (Netlify platform) | Form submission capture and email notification | Already wired for contact form — same mechanism, different form name |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Zapier | (external service) | Route form submissions to Google Sheets | Setup guide deliverable, not code dependency |
| Google Sheets | (external service) | Application log / hiring team CRM | "Website Applications" tab in existing sheet |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Netlify Forms | Formspree | Formspree free tier limited to 50/month — project explicitly chose Netlify Forms to avoid this |
| Zapier | Apps Script webhook | Apps Script requires the user to write/maintain code — Zapier is no-code, consistent with project decisions |

**No new packages to install** — all dependencies are already present.

---

## Architecture Patterns

### Files to Create / Modify

```
src/
├── pages/
│   └── careers.astro          NEW — page file, auto-routes to /careers
├── data/
│   └── careersContent.ts      NEW — typed content: hero text, form fields, role options, benefits
└── components/
    └── CareersForm.astro      NEW — clone of ContactForm.astro with select support
                                      and "careers" form name

src/components/
    Footer.astro               MODIFY — add Careers link to navLinks array

.planning/phases/07-careers-page/
    ZAPIER-SETUP-GUIDE.md      NEW deliverable — follows Phase 5 format
```

### Pattern 1: Extending FormField for Select Inputs

**What:** The existing `FormField` interface in contactContent.ts supports `'text' | 'email' | 'textarea'`. The careers form needs a `<select>` dropdown for Role of interest and optionally Experience level. The interface must be extended — not replaced — so the pattern stays consistent.

**When to use:** Any field where the applicant picks from a fixed list.

**Example:**
```typescript
// Source: src/data/contactContent.ts (extended for careers)
export interface CareersFormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'select' | 'textarea';
  required: boolean;
  half: boolean;
  options?: string[];   // only for type === 'select'
  placeholder?: string; // optional helper text
}
```

### Pattern 2: CareersForm.astro — Select Render Branch

**What:** CareersForm.astro mirrors ContactForm.astro exactly but adds a `select` branch in the field render logic.

**Example:**
```astro
{field.type === 'select' ? (
  <select
    id={field.id}
    name={field.id}
    required={field.required || undefined}
    class="w-full px-4 py-3 border border-navy/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow text-navy"
  >
    <option value="">Select one...</option>
    {field.options?.map(opt => (
      <option value={opt}>{opt}</option>
    ))}
  </select>
) : field.type === 'textarea' ? (
  // ... existing textarea branch
) : (
  // ... existing input branch
)}
```

### Pattern 3: Netlify Forms AJAX — Form Name Separation

**What:** Netlify identifies forms by the `name` attribute and the hidden `form-name` input. Using `name="careers"` keeps careers submissions in a separate bucket from contact submissions in the Netlify Forms dashboard.

**Example:**
```astro
<!-- Source: established pattern from ContactForm.astro, adapted -->
<form
  id="careers-form"
  name="careers"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  novalidate
  class="flex flex-col gap-5"
>
  <input type="hidden" name="form-name" value="careers" />
  <p class="hidden" aria-hidden="true">
    <label>Leave blank: <input name="bot-field" /></label>
  </p>
  ...
</form>
```

### Pattern 4: careersContent.ts Data File

**What:** Single source of truth for hero text, form fields, role options, and (optional) benefits bullets. Planner and executor never hard-code content in .astro files — all content lives in the data file.

```typescript
// src/data/careersContent.ts — structure
export const careersHero = {
  headline: string;
  subtitle: string;
  badge?: string;  // e.g. "Now Hiring"
};

export const roleOptions: string[] = [
  'Customer Support',
  'Real Estate',
  'Healthcare',
  'Tech Support',
  'Sales',
  'Legal',
  'Other',
];

export const experienceOptions: string[] = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '5+ years',
];

export const careersFormFields: CareersFormField[] = [ ... ];

export const careersBenefits?: string[];  // optional, Claude's Discretion
```

### Pattern 5: Footer Link Addition

**What:** Footer.astro's `navLinks` array is the Quick Links column. Adding a Careers entry keeps it consistent with all other nav additions — no new column, no new component.

```astro
// Source: src/components/Footer.astro (existing pattern)
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/why-us', label: 'Why Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/careers', label: 'Join Our Team' },  // ADD — label is Claude's Discretion
];
```

### Pattern 6: careers.astro Page Assembly

**What:** The page follows the same section stack pattern as contact.astro and case-studies.astro: BaseLayout > hero > main content (optional benefits + form).

```astro
---
// src/pages/careers.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import CareersHero from '../components/CareersHero.astro';
import CareersForm from '../components/CareersForm.astro';
// Optional: import CareersBenefits from '../components/CareersBenefits.astro';
---
<BaseLayout title="Careers | WorkWiser" description="Join the WorkWiser team...">
  <CareersHero />
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Optional benefits section -->
      <CareersForm />
    </div>
  </section>
</BaseLayout>
```

### Anti-Patterns to Avoid

- **Using the same form name as contact:** Both forms would feed the same Netlify submissions bucket, making it impossible to separate email notifications or Zapier triggers. Always use `name="careers"`.
- **Adding Careers to the header nav:** Explicitly deferred — client navigation stays focused on Home, About Us, Why Us, Contact.
- **Hard-coding select options in markup:** Options must live in careersContent.ts so they can be updated without touching component files.
- **Sharing the FormField interface from contactContent.ts:** Import and extend into a new `CareersFormField` type — don't modify the existing interface and risk breaking the contact form.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Spam protection | Custom CAPTCHA or server-side bot detection | `netlify-honeypot="bot-field"` | Already proven in ContactForm.astro; zero JS overhead |
| Form state management | Custom React/Svelte state layer | Astro `<script>` block (vanilla JS) | ContactForm.astro uses this — consistent, no framework needed |
| Email delivery | Custom SMTP or email API | Netlify Forms email notifications | Platform handles delivery; already configured for contact form |
| Sheets logging | Custom webhook endpoint or serverless function | Zapier trigger on "New Form Submission" | No-code, zero maintenance, already used for contact form |
| URL encoding of FormData | Manual serialization | `new URLSearchParams(new FormData(form) as unknown as Record<string, string>)` | Established pattern from Phase 5 — TypeScript strict mode compatible |

**Key insight:** This phase has zero novel infrastructure. Every system (Netlify Forms, Zapier, Google Sheets) was proved in Phase 5. The only new code concern is the `select` input type in the form renderer.

---

## Common Pitfalls

### Pitfall 1: Select fields not submitted in Netlify Forms
**What goes wrong:** A `<select>` with no default selected `<option value="">` may submit an empty string. Netlify stores it but the field appears blank.
**Why it happens:** HTML select default behavior — if no option has `selected`, the browser submits the first option's value, which here is the placeholder `""`.
**How to avoid:** The placeholder option has `value=""` and the field has `required` when needed. Validation checks `input.validity.valueMissing` for required selects — this fires if value is `""`.
**Warning signs:** Required select passes client-side validation but arrives at Netlify with an empty Role field.

### Pitfall 2: Validation script targets `[required]` but misses select elements
**What goes wrong:** The `querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]')` cast excludes `<select>` elements from validation iteration.
**Why it happens:** TypeScript narrowing — the existing type union doesn't include `HTMLSelectElement`.
**How to avoid:** Widen the type to `HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement` or query without the union cast. The `validity.valueMissing` API is identical across all three element types.

### Pitfall 3: Two Zapier zaps not separated by form name
**What goes wrong:** If the Zapier trigger is set to "All forms" instead of selecting "careers" specifically, both contact and careers submissions route to the same Google Sheet tab.
**Why it happens:** Zapier default in the Netlify trigger config is "any form".
**How to avoid:** Zapier setup guide explicitly instructs selecting the "careers" form name in trigger configuration, not "All submissions".

### Pitfall 4: Google Sheet tab name mismatch
**What goes wrong:** Zapier's "Worksheet" dropdown shows the tab by its exact name — if the user creates "Website Applications " (trailing space) vs "Website Applications", the Zap silently fails to route.
**Why it happens:** Zapier is case and whitespace sensitive on worksheet selection.
**How to avoid:** Zapier guide should instruct user to create the tab with the exact name "Website Applications" before running Zap setup.

### Pitfall 5: CareersHero includes Calendly JS
**What goes wrong:** If the hero is cloned from ContactHero and the Calendly popup button is included, the page will silently fail because BaseLayout only injects `widget.js` on the contact page via the head slot.
**Why it happens:** Calendly JS is lazy-loaded on contact.astro only.
**How to avoid:** CareersHero should NOT include a Calendly button. If a CTA is added, link to `/contact` or an external URL.

---

## Code Examples

Verified patterns from existing project files:

### Netlify Forms AJAX submit (proven in Phase 5)
```typescript
// Source: src/components/ContactForm.astro lines 213-217
const response = await fetch('/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
});
```

### Inline blur validation (proven in Phase 5)
```typescript
// Source: src/components/ContactForm.astro lines 166-178
function validateField(input: HTMLInputElement | HTMLTextAreaElement): boolean {
  const id = input.id;
  if (input.validity.valueMissing) {
    showError(id, 'This field is required.');
    return false;
  }
  if (input instanceof HTMLInputElement && input.validity.typeMismatch) {
    showError(id, 'Please enter a valid email address.');
    return false;
  }
  clearError(id);
  return true;
}
```

### Fade-to-success pattern (proven in Phase 5)
```typescript
// Source: src/components/ContactForm.astro lines 222-227
form.style.transition = 'opacity 400ms ease';
form.style.opacity = '0';
setTimeout(() => {
  form.classList.add('hidden');
  successMsg!.classList.remove('hidden');
}, 420);
```

### Hero gradient (proven in Phase 4/5)
```astro
<!-- Source: src/components/ContactHero.astro line 6 -->
<section class="relative overflow-hidden bg-gradient-to-br from-teal via-blue to-navy py-24 md:py-32">
```

### Footer navLinks (current state to modify)
```astro
// Source: src/components/Footer.astro lines 2-7
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/why-us', label: 'Why Us' },
  { href: '/contact', label: 'Contact' },
  // ADD: { href: '/careers', label: 'Join Our Team' },
];
```

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — Astro build check only |
| Config file | none |
| Quick run command | `npx astro check` |
| Full suite command | `npx astro build` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CAREER-01 | `/careers` page renders with applicant-focused content, no client-facing copy | smoke | `npx astro build` (build must pass) | ❌ Wave 0 |
| CAREER-02 | All 8 form fields render: Full Name, Email, Phone, Location, Role, Experience, LinkedIn, Cover message | smoke | `npx astro build` | ❌ Wave 0 |
| CAREER-03 | `<form name="careers" data-netlify="true">` present in built HTML | smoke | `npx astro build` | ❌ Wave 0 |
| CAREER-04 | Form name "careers" appears in `form-name` hidden input (Zapier guide is manual) | smoke | `npx astro build` | ❌ Wave 0 |
| CAREER-05 | Footer renders `<a href="/careers">` link | smoke | `npx astro build` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx astro check`
- **Per wave merge:** `npx astro build`
- **Phase gate:** Full build green with zero TypeScript errors before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] No formal test files needed — all requirements are verifiable via `astro build` output and manual browser inspection on the Netlify preview URL
- [ ] Confirm `npx astro check` is already passing before starting Phase 7 tasks

---

## Zapier Guide Structure (deliverable)

The guide follows the Phase 5 ZAPIER-SETUP-GUIDE.md structure exactly. Differences from Phase 5 version:

| Section | Phase 5 Value | Phase 7 Value |
|---------|--------------|--------------|
| Netlify Form name | `contact` | `careers` |
| Email recipient | `info@workwiser.io` | `recruitment@workwiser.io` |
| Google Sheet tab | (new spreadsheet) | "Website Applications" tab in existing sheet |
| Field mapping | firstName, lastName, jobTitle, company, email, location, message | fullName, email, phone, location, role, experience, linkedin, coverMessage |

The guide must instruct the user to create the "Website Applications" tab in the existing sheet BEFORE running Zap setup, because Zapier reads available worksheets at setup time.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate Netlify form per page (no AJAX) | Single page AJAX with `fetch('/')` | Phase 5 | No full-page redirect on submit; smooth UX |
| FormData directly to URLSearchParams | Cast via `as unknown as Record<string, string>` | Phase 5 | Required for TypeScript strict mode — do not change |
| Calendly direct link | `Calendly.initPopupWidget` | Phase 5 | Popup consistency — NOT needed on careers page |

**Deprecated/outdated for this phase:**
- `@astrojs/tailwind` integration: replaced by `@tailwindcss/vite` (Phase 1 decision) — do not reference
- Hamburger-only mobile nav: full desktop nav implemented in Phase 2 — careers page inherits BaseLayout automatically

---

## Open Questions

1. **Benefits/perks section above the form**
   - What we know: Claude's Discretion on whether to include it
   - What's unclear: Whether copy exists or Claude should generate it
   - Recommendation: Include a brief 3-item "Why Work With WorkWiser" section using content derived from the About Us / Why Us pages (flexibility, growth, impact) — it aids conversion without requiring new client input

2. **Experience level: dropdown vs free text**
   - What we know: Claude's Discretion
   - Recommendation: Use a dropdown with 4 ranges (Less than 1 year / 1–2 years / 3–5 years / 5+ years) — structured data is more useful for hiring team filtering in Google Sheets

3. **Role dropdown contents**
   - What we know: WorkWiser's 6 service industries: Customer Support, Real Estate, Healthcare, Tech Support, Sales, Legal
   - Recommendation: Use those 6 plus "Other" as the seventh option to catch edge cases

---

## Sources

### Primary (HIGH confidence)
- `src/components/ContactForm.astro` — AJAX pattern, validation, success state, TypeScript cast
- `src/components/ContactHero.astro` — gradient hero markup
- `src/data/contactContent.ts` — FormField interface, data file structure
- `src/components/Footer.astro` — navLinks array structure
- `.planning/phases/05-contact-us-page/ZAPIER-SETUP-GUIDE.md` — Zapier guide format and step structure

### Secondary (MEDIUM confidence)
- `07-CONTEXT.md` — User decisions, reusable asset list, form field spec
- `.planning/REQUIREMENTS.md` — CAREER-01 through CAREER-05 definitions
- `.planning/STATE.md` — Phase 5 TypeScript cast decision (`as unknown as Record<string, string>`)

### Tertiary (LOW confidence)
- None — all findings are grounded in existing project files

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed and proven in project
- Architecture: HIGH — all patterns replicated from Phase 5 (ContactForm.astro, contactContent.ts); only new element is `select` type
- Pitfalls: HIGH — Pitfalls 1-2 are TypeScript/HTML standard behavior; Pitfalls 3-5 derived from direct inspection of Zapier guide and ContactHero.astro

**Research date:** 2026-03-25
**Valid until:** 2026-05-25 (stable stack — Astro 5, Tailwind v4, Netlify Forms unchanged)
