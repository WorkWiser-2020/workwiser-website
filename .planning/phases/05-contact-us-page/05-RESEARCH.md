# Phase 5: Contact Us Page - Research

**Researched:** 2026-03-23
**Domain:** Netlify Forms, Calendly popup widget, Astro contact page layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Page layout & hero**
- Hero: Same teal-to-navy gradient pattern as About Us and Why Us pages, with W-arrow watermark
- Headline: "Let's meet!" with subtitle "Drop a line or give us a call"
- Yellow CTA in hero linking to Calendly
- Layout: Claude's Discretion — form left with sidebar right is recommended, but Claude picks best layout for the brand

**Form behavior & validation**
- On successful submit: form fades out, replaced by inline success message ("Thanks! We'll be in touch within 24 hours.") — stay on same page, no redirect
- Required fields: Email and Location only — all other fields optional to keep friction low
- Validation: inline error messages below each invalid field (on blur / on submit attempt)
- Spam protection: Netlify honeypot field (hidden field, no CAPTCHA, zero user friction)

**Calendly integration**
- Compact "Book a Free Consultation" card with button that opens Calendly popup overlay
- Placed in the sidebar below stats and contact info
- Uses Calendly's popup widget JS snippet (not full inline calendar)
- Calendly URL: calendly.com/workwiser-info/ceo-client

**Form submission pipeline**
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

### Deferred Ideas (OUT OF SCOPE)
- Zapier auto-reply email to client after form submission — can be added later in Zapier dashboard
- Google Analytics conversion tracking on form submit — belongs in SEO/analytics phase
- Thank-you page for conversion tracking — not needed now, inline success message chosen
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Contact page hero — "Let's meet! Drop a line or give us a call" | Hero pattern directly mirrors WhyUsHero.astro — teal-to-navy gradient + W-arrow + yellow CTA |
| CONT-02 | Contact form with fields: First Name, Last Name, Job Title, Company Name, Email (required), Location (required), Message | Netlify Forms HTML pattern with `data-netlify="true"`, field validation with vanilla JS blur/submit handlers |
| CONT-03 | Form submission sends email notification to info@workwiser.io via Netlify Forms | Netlify Forms email notification configured in Netlify dashboard under Project configuration > Notifications |
| CONT-04 | Form submission saves to Google Sheets via Zapier integration | Zapier Netlify → Google Sheets template exists; setup guide document covers this entirely — no code |
| CONT-05 | Stats sidebar — 100+ Satisfied Clients, 300+ Projects Completed, 10+ Years Experience, 150 Team Members | Vertical variant of existing StatsBar count-up logic, driven by contactContent.ts data |
| CONT-06 | Calendly booking embed/link visible on contact page — calendly.com/workwiser-info/ceo-client | Calendly popup widget via `Calendly.initPopupWidget()` JS; widget.js + widget.css loaded in page head |
| CONT-07 | Contact info displayed: phone (302) 257-5427, email info@workwiser.io | Static data in contactContent.ts, rendered in sidebar |
</phase_requirements>

---

## Summary

Phase 5 is a frontend-only page build with one external service integration (Netlify Forms). The page consists of two main areas: a full-width hero (following established brand pattern) and a two-column body with the contact form on the left and a sidebar on the right containing stats, contact info, and a Calendly booking card.

Netlify Forms is zero-config for static Astro sites — Netlify's build system detects the `data-netlify="true"` attribute during build and registers the form automatically. The key implementation detail is that form submission must be intercepted with vanilla JS `fetch()` using `application/x-www-form-urlencoded` encoding (not JSON) so the form fades out and displays an inline success message instead of redirecting. The honeypot field requires `netlify-honeypot="bot-field"` on the form element and a hidden input `<input name="bot-field" />` in the form body.

Calendly's popup widget is loaded as an external script/stylesheet pair in the page `<head>`. A button calls `Calendly.initPopupWidget({ url: '...' })` directly — no Astro framework concerns since this is plain JS in a `<script>` block matching the established project pattern.

**Primary recommendation:** Build `contact.astro` with `ContactHero`, `ContactForm`, and `ContactSidebar` components, wire Netlify Forms with AJAX fetch submission, load Calendly popup widget in the page head, and produce a Zapier setup guide document as a separate deliverable.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Netlify Forms | Built-in | Form capture + email notification | Zero-config for Netlify-hosted static sites; no backend needed |
| Calendly Popup Widget | External CDN | Open scheduling overlay on button click | Official embed method; no install required |
| Vanilla JS (`<script>`) | ES2020+ | Form validation + AJAX submission + success animation | Established project pattern — no framework used |
| Tailwind v4 | v4 (project-installed) | Styling all new components | Already in project; CSS `@theme` tokens available |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Zapier (external) | N/A | Route Netlify form webhook to Google Sheets | External setup — not in code; documented in setup guide |
| IntersectionObserver API | Browser native | Count-up animation on stats sidebar | Already used in StatsBar.astro — copy pattern |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Netlify Forms | Formspree | Formspree free tier is 50 submissions/month vs Netlify's 100 (legacy) or credits-based; Netlify preferred since site already on Netlify |
| Calendly popup widget | Inline embed / new-tab link | Inline embed is intrusive; new-tab is lower friction for sidebar; popup is the decided approach |
| AJAX fetch submission | Standard HTML POST + redirect | Redirect requires a separate success page; AJAX enables inline success message per user decision |

**Installation:** No new npm packages required. Calendly widget loaded via CDN in page `<head>`.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── pages/
│   └── contact.astro          # New page, auto-routes to /contact
├── components/
│   ├── ContactHero.astro       # Hero — mirrors WhyUsHero.astro pattern
│   ├── ContactForm.astro       # Form with Netlify Forms + AJAX + validation
│   └── ContactSidebar.astro    # Stats (vertical) + contact info + Calendly card
└── data/
    └── contactContent.ts       # Stats, contact info, form fields metadata
```

### Pattern 1: Hero — Clone WhyUsHero.astro

**What:** Full-width `section` with `bg-gradient-to-br from-teal via-blue to-navy`, W-arrow SVG watermark at `opacity-10`, centered text block, yellow CTA button.

**When to use:** All interior page heroes follow this pattern (About Us, Why Us, Contact Us).

**Example:**
```astro
---
// src/components/ContactHero.astro
// CONT-01
---
<section class="relative overflow-hidden bg-gradient-to-br from-teal via-blue to-navy py-24 md:py-32">
  <!-- W-arrow watermark (identical SVG path to WhyUsHero/AboutHero) -->
  <div class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none" aria-hidden="true">
    <!-- SVG paths copied from WhyUsHero.astro -->
  </div>
  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
      Let's meet!
    </h1>
    <p class="mt-4 text-white/80 text-lg md:text-xl">Drop a line or give us a call</p>
    <div class="mt-10">
      <a href="https://calendly.com/workwiser-info/ceo-client"
         class="inline-block bg-yellow text-navy font-heading font-bold px-8 py-4 rounded-full text-lg hover:bg-yellow/90 transition-colors"
         target="_blank" rel="noopener">
        Book a Free Consultation
      </a>
    </div>
  </div>
</section>
```

### Pattern 2: Netlify Forms with AJAX Fetch (No Redirect)

**What:** Static HTML form detected by Netlify at build time. JS intercepts submit, posts via `fetch()` with URL-encoded `FormData`, hides form, shows inline success message.

**When to use:** Any Netlify-hosted form where staying on page is desired (as decided in CONTEXT.md).

**Critical details:**
- Form MUST have `data-netlify="true"` (or `netlify`) and `name="contact"` attributes
- `method="POST"` required
- Hidden `<input type="hidden" name="form-name" value="contact" />` is required for AJAX submissions so Netlify knows which form the data belongs to
- Body of fetch must be URL-encoded — use `new URLSearchParams(new FormData(form)).toString()` — NOT JSON
- Content-Type header must be `application/x-www-form-urlencoded`

**Example:**
```astro
---
// src/components/ContactForm.astro
// CONT-02, CONT-03
---
<div id="form-wrapper">
  <form
    id="contact-form"
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    novalidate
  >
    <!-- Required: form-name hidden field for AJAX submissions -->
    <input type="hidden" name="form-name" value="contact" />
    <!-- Honeypot: hidden from users, kills bot submissions -->
    <p class="hidden" aria-hidden="true">
      <label>Leave blank: <input name="bot-field" /></label>
    </p>

    <!-- Form fields (Email + Location are required) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="first-name" class="...">First Name</label>
        <input id="first-name" type="text" name="first_name" />
      </div>
      <!-- ... other fields ... -->
      <div>
        <label for="email" class="...">Email <span class="text-red-500">*</span></label>
        <input id="email" type="email" name="email" required />
        <p class="field-error hidden text-sm text-red-600" data-for="email"></p>
      </div>
      <div>
        <label for="location" class="...">Location of operations <span class="text-red-500">*</span></label>
        <input id="location" type="text" name="location" required />
        <p class="field-error hidden text-sm text-red-600" data-for="location"></p>
      </div>
    </div>
    <button type="submit" id="submit-btn" class="...">Send Message</button>
  </form>

  <!-- Success message (hidden until submit) -->
  <div id="success-msg" class="hidden text-center py-12">
    <p class="text-xl font-heading font-bold text-navy">Thanks! We'll be in touch within 24 hours.</p>
  </div>
</div>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const wrapper = document.getElementById('form-wrapper') as HTMLElement;
  const successMsg = document.getElementById('success-msg') as HTMLElement;

  // Inline validation on blur
  form.querySelectorAll('[required]').forEach(input => {
    input.addEventListener('blur', () => validateField(input as HTMLInputElement));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitBtn = form.querySelector('#submit-btn') as HTMLButtonElement;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      });
      // Fade form out, show success
      form.style.transition = 'opacity 0.4s ease';
      form.style.opacity = '0';
      setTimeout(() => {
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
      }, 400);
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      // Show generic error inline
    }
  });

  function validateField(input: HTMLInputElement): boolean {
    const errorEl = form.querySelector(`[data-for="${input.name}"]`) as HTMLElement;
    if (!errorEl) return true;
    if (input.validity.valueMissing) {
      errorEl.textContent = 'This field is required.';
      errorEl.classList.remove('hidden');
      return false;
    }
    if (input.type === 'email' && input.validity.typeMismatch) {
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.classList.remove('hidden');
      return false;
    }
    errorEl.classList.add('hidden');
    return true;
  }

  function validateForm(): boolean {
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      if (!validateField(input as HTMLInputElement)) valid = false;
    });
    return valid;
  }
</script>
```

### Pattern 3: Netlify Honeypot Field

**What:** Hidden input that bots fill out but humans never see. Any submission with a value in this field is silently rejected by Netlify.

**When to use:** Always — zero user friction spam protection, per CONTEXT.md decision.

**Example:**
```html
<!-- On <form> element: -->
netlify-honeypot="bot-field"

<!-- Inside form body (hidden via CSS): -->
<p class="hidden" aria-hidden="true">
  <label>Leave blank: <input name="bot-field" /></label>
</p>
```

The `hidden` Tailwind utility class (`display: none`) is sufficient. The `aria-hidden="true"` prevents screen readers from announcing it.

### Pattern 4: Calendly Popup Widget

**What:** Calendly's official popup embed. A button calls `Calendly.initPopupWidget()` which opens a modal overlay — no page navigation, no inline calendar taking up page space.

**When to use:** Per CONTEXT.md — compact booking card in sidebar, popup preferred over inline or new-tab.

**Example (page head injection from contact.astro):**
```astro
---
// contact.astro — add to BaseLayout slot or inline head tags
---
<BaseLayout title="Contact Us - WorkWiser" description="...">
  <!-- Calendly widget assets loaded on this page only -->
  <Fragment slot="head">
    <link href="https://calendly.com/assets/external/widget.css" rel="stylesheet" />
    <script src="https://calendly.com/assets/external/widget.js" type="text/javascript"></script>
  </Fragment>
  <!-- ... components ... -->
</BaseLayout>
```

**Button that opens popup:**
```html
<button
  type="button"
  onclick="Calendly.initPopupWidget({ url: 'https://calendly.com/workwiser-info/ceo-client' }); return false;"
  class="inline-block bg-yellow text-navy font-heading font-bold px-6 py-3 rounded-full hover:bg-yellow/90 transition-colors w-full text-center"
>
  Book a Free Consultation
</button>
```

Note: `return false` in `onclick` prevents any default navigation.

### Pattern 5: Vertical Stats Sidebar (CONT-05)

**What:** The existing `StatsBar.astro` is horizontal with a 4-column grid. For the sidebar, stats stack vertically — same count-up IntersectionObserver logic, different layout.

**When to use:** Sidebar context where horizontal layout does not fit.

**Example:**
```astro
<!-- Inline in ContactSidebar.astro — no need for separate component -->
<div class="space-y-6">
  {stats.map(stat => (
    <div class="text-center lg:text-left">
      <p class="text-3xl font-heading font-bold text-teal">
        <span data-count={stat.value} data-suffix={stat.suffix}>
          {stat.value}{stat.suffix}
        </span>
      </p>
      <p class="text-navy/70 text-sm font-medium">{stat.label}</p>
    </div>
  ))}
</div>
```

Re-use the same `data-count` / `data-suffix` attributes and the same IntersectionObserver JS from `StatsBar.astro`.

### Anti-Patterns to Avoid

- **Submitting form as JSON:** Netlify Forms does not accept `application/json` — must be `application/x-www-form-urlencoded`. Using `JSON.stringify()` in the fetch body will result in 404 or silent failure.
- **Omitting `form-name` hidden field in AJAX submissions:** Without it, Netlify cannot match the submission to the registered form. The POST will succeed (200) but the submission will not appear in the Netlify dashboard.
- **Loading Calendly widget.js globally:** Load it only on the contact page via a `<Fragment slot="head">` or `<head>` block — not in BaseLayout — to avoid loading an external script on every page.
- **Relying on `type="hidden"` to hide honeypot:** Use CSS `display: none` via the `hidden` class — `type="hidden"` makes the field invisible but bots still populate it, which may not trigger Netlify's filter correctly (Netlify specifically expects a text input that CSS-hides).
- **Using `window.location` for success:** The user decision is inline success message — do not redirect.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form spam filtering | Custom CAPTCHA or IP blocking | Netlify honeypot (`netlify-honeypot`) | Zero user friction; built into Netlify pipeline |
| Email notification on form submit | Netlify serverless function + SMTP | Netlify Forms built-in notification | Zero code; configure in dashboard |
| Google Sheets logging | Custom webhook endpoint | Zapier "Netlify Form → Google Sheets" template | Pre-built Zap; no server needed |
| Scheduling calendar | Custom calendar UI | Calendly popup widget | Purpose-built; handles timezone, availability, confirmations |
| Form field validation | Custom regex patterns | Browser native `validity` API (`valueMissing`, `typeMismatch`) | Already available; no library needed |

**Key insight:** The entire form-to-email-to-spreadsheet pipeline requires zero backend code — Netlify handles submission capture, the dashboard handles email routing, and Zapier handles the Sheets integration.

---

## Common Pitfalls

### Pitfall 1: Form Not Detected by Netlify at Build Time

**What goes wrong:** Form submissions return 404 or forms don't appear in the Netlify dashboard.
**Why it happens:** Netlify's build bot scans pre-rendered HTML for `data-netlify="true"`. If Astro renders the form server-side or the `<form>` is conditionally rendered, the scanner may miss it.
**How to avoid:** Keep the `<form>` element in static Astro component markup (not inside a client `<script>` block). Astro static mode renders to HTML at build time — forms in `.astro` files are always detected.
**Warning signs:** No form listed under "Forms" in the Netlify dashboard after first deploy.

### Pitfall 2: AJAX Submission Returns 404

**What goes wrong:** `fetch('/', ...)` returns 404.
**Why it happens:** The `form-name` hidden field is missing, OR the Content-Type header is wrong (JSON instead of URL-encoded), OR the fetch URL doesn't match where the form HTML was served from.
**How to avoid:** Always include `<input type="hidden" name="form-name" value="contact" />` inside the form. Use `new URLSearchParams(new FormData(form)).toString()` for the body. Fetch to `'/'` (the root, where Netlify routes form submissions) is the documented approach.
**Warning signs:** Network tab shows POST to `/` returning 404; form submissions not appearing in Netlify dashboard.

### Pitfall 3: Netlify Free Tier Form Limit

**What goes wrong:** Form submissions stop being captured mid-month.
**Why it happens:** Legacy free-tier Netlify accounts have 100 form submissions/month limit. Accounts created after September 4, 2025 are on credit-based pricing where each submission costs 1 credit.
**How to avoid:** Verify account type in Netlify dashboard before launch. WorkWiser is a B2B service — contact form volume is likely well under 100/month in early operation. STATE.md already flags this as a known concern.
**Warning signs:** Netlify sends an over-limit notification email; submissions stop appearing in dashboard.

### Pitfall 4: Calendly Script Polluting Other Pages

**What goes wrong:** `widget.js` (an external Calendly script) loads on every page, slowing performance.
**Why it happens:** Adding the `<script>` tag to `BaseLayout.astro` instead of `contact.astro`.
**How to avoid:** Load Calendly assets only in `contact.astro` using a `<Fragment slot="head">` or a `<head>` slot pattern in BaseLayout. Check whether BaseLayout exposes a head slot — if not, add one.
**Warning signs:** Network tab shows `widget.js` loading on home page, about page, etc.

### Pitfall 5: `FormData` → `URLSearchParams` TypeScript Error

**What goes wrong:** TypeScript complains about `new URLSearchParams(new FormData(form))` — `FormData` is not directly assignable to `URLSearchParams` constructor.
**Why it happens:** TypeScript's strict typing for `URLSearchParams` constructor does not accept `FormData`.
**How to avoid:** Cast as needed: `new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString()`. This is the established workaround.
**Warning signs:** TS build error: `Argument of type 'FormData' is not assignable to parameter of type 'string | URLSearchParams | ...'`.

### Pitfall 6: BaseLayout Head Slot May Not Exist

**What goes wrong:** `<Fragment slot="head">` has no effect — Calendly scripts never load.
**Why it happens:** `BaseLayout.astro` may not define a `<slot name="head" />` in its `<head>` element.
**How to avoid:** Check `BaseLayout.astro` before writing `contact.astro`. If no head slot exists, add `<slot name="head" />` inside `<head>` in BaseLayout as part of Plan 05-01.
**Warning signs:** Calendly button click does nothing; browser console shows `Calendly is not defined`.

---

## Code Examples

Verified patterns from project codebase and official sources:

### Netlify Forms: Minimal Required HTML

```html
<!-- Source: https://docs.netlify.com/manage/forms/setup/ -->
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden" aria-hidden="true">
    <input name="bot-field" />
  </p>
  <!-- fields -->
  <button type="submit">Send</button>
</form>
```

### Netlify Forms: AJAX Fetch Submission

```javascript
// Source: https://docs.netlify.com/manage/forms/setup/ (AJAX section)
// Body MUST be URL-encoded, NOT JSON
const response = await fetch('/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
});
// response.ok === true on success (200)
```

### Calendly Popup Widget: Page Head Assets

```html
<!-- Source: Calendly official embed docs + WebSearch verified 2025 -->
<link href="https://calendly.com/assets/external/widget.css" rel="stylesheet" />
<script src="https://calendly.com/assets/external/widget.js" type="text/javascript"></script>
```

### Calendly Popup Widget: Trigger Button

```html
<!-- Source: Calendly official embed docs + WebSearch verified 2025 -->
<button
  type="button"
  onclick="Calendly.initPopupWidget({ url: 'https://calendly.com/workwiser-info/ceo-client' }); return false;"
>
  Book a Free Consultation
</button>
```

### Count-Up Stats: Re-use Existing Pattern

```javascript
// Source: src/components/StatsBar.astro (established project pattern)
// Same IntersectionObserver + data-count / data-suffix attributes
// Copy verbatim into ContactSidebar.astro <script> block
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target as HTMLElement;
    const target = parseInt(el.dataset.count ?? '0', 10);
    const suffix = el.dataset.suffix ?? '';
    const duration = 1500;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    observer.unobserve(el);
  });
}, { threshold: 0.3 });
counters.forEach(el => observer.observe(el));
```

### contactContent.ts: Data File Shape

```typescript
// src/data/contactContent.ts — new file following established data layer pattern
export interface ContactStat {
  value: number;
  suffix: string;
  label: string;
}

export const contactStats: ContactStat[] = [
  { value: 100, suffix: '+', label: 'Satisfied Clients' },
  { value: 300, suffix: '+', label: 'Projects Completed' },
  { value: 10,  suffix: '+', label: 'Years Experience' },
  { value: 150, suffix: '',  label: 'Team Members' },
];

export const contactInfo = {
  phone: '(302) 257-5427',
  email: 'info@workwiser.io',
  calendlyUrl: 'https://calendly.com/workwiser-info/ceo-client',
};

export const formFields = [
  { id: 'first_name',   label: 'First Name',            type: 'text',  required: false, half: true  },
  { id: 'last_name',    label: 'Last Name',             type: 'text',  required: false, half: true  },
  { id: 'job_title',    label: 'Job Title',             type: 'text',  required: false, half: true  },
  { id: 'company_name', label: 'Company Name',          type: 'text',  required: false, half: true  },
  { id: 'email',        label: 'Email',                 type: 'email', required: true,  half: true  },
  { id: 'location',     label: 'Location of operations',type: 'text',  required: true,  half: true  },
  { id: 'message',      label: 'Message',               type: 'textarea', required: false, half: false },
];
```

### Zapier Setup Guide: Step-by-Step (Documentation Deliverable)

The Zapier integration is external configuration — no code. Provide as inline comments or a separate doc. Steps:
1. Log in to zapier.com
2. Create new Zap → Trigger: "Netlify" app → Event: "New Form Submission"
3. Connect Netlify account, select site, select form name: "contact"
4. Action: "Google Sheets" app → Event: "Create Spreadsheet Row"
5. Connect Google account, select spreadsheet and tab
6. Map Netlify fields (first_name, last_name, email, location, message, etc.) to sheet columns
7. Test Zap with a real form submission
8. Turn Zap on

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Netlify Forms redirect to default success page | AJAX fetch + inline success message | Always supported — redirect is default, AJAX is opt-in | Keeps user on page, better UX |
| Calendly inline embed (full calendar in page) | Popup widget | Calendly has offered both for years | Popup is less intrusive, better for sidebar |
| Manual spam filter (reCAPTCHA) | Netlify honeypot | Honeypot always available in Netlify | Zero user friction |

**Deprecated/outdated:**
- `@astrojs/tailwind` integration: Deprecated for Tailwind v4 — project correctly uses `@tailwindcss/vite` (already established in Phase 1).

---

## Open Questions

1. **BaseLayout head slot availability**
   - What we know: `BaseLayout.astro` exists and has a `<head>` element; existing pages don't need to inject head content
   - What's unclear: Whether a `<slot name="head" />` is currently defined
   - Recommendation: Read `BaseLayout.astro` at plan-time; add head slot if missing (1-line change, low risk)

2. **Netlify account tier (free vs credit-based)**
   - What we know: Legacy free tier = 100 submissions/month; credit-based plans post Sep 4 2025 charge per submission
   - What's unclear: When this Netlify account was created and which plan it is on
   - Recommendation: Verify in Netlify dashboard before launch (already flagged in STATE.md blockers); for a B2B service at this stage, 100/month is very unlikely to be exceeded

3. **`form-name` hidden field in AJAX mode**
   - What we know: Required per Netlify AJAX docs
   - What's unclear: Whether Astro's build-time processing of `data-netlify` injects this automatically (as it does for standard POST forms) or whether it must be added manually for AJAX
   - Recommendation: Explicitly include the hidden field — no downside to having it, and it's required if auto-injection doesn't apply to AJAX submissions

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — this is a static Astro site with no automated test suite |
| Config file | None |
| Quick run command | Manual browser verification |
| Full suite command | Manual browser verification |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Hero renders with correct headline and subtitle | visual/manual | `npm run build && npm run preview` → navigate to /contact | ❌ Wave 0 N/A |
| CONT-02 | Form renders all 7 fields; email + location show validation errors when empty on submit | manual | Browser: submit empty form; submit with invalid email | ❌ Wave 0 N/A |
| CONT-03 | Netlify Forms captures submission and sends email notification | manual/integration | Deploy to Netlify preview URL; submit form; check Netlify dashboard + inbox | ❌ Wave 0 N/A |
| CONT-04 | Zapier Zap triggers and creates Google Sheets row | manual/integration | Submit form on Netlify preview; check Google Sheet for new row | ❌ Wave 0 N/A |
| CONT-05 | Stats sidebar shows correct numbers with count-up animation | visual/manual | Browser: scroll to sidebar, verify numbers count up to target values | ❌ Wave 0 N/A |
| CONT-06 | Calendly popup opens on button click; URL is correct | manual | Browser: click "Book a Free Consultation"; verify overlay opens to correct Calendly page | ❌ Wave 0 N/A |
| CONT-07 | Phone and email display correctly in sidebar | visual/manual | Browser: verify (302) 257-5427 and info@workwiser.io visible | ❌ Wave 0 N/A |

### Sampling Rate

- **Per task commit:** `npm run build` — zero TypeScript/Astro build errors
- **Per wave merge:** `npm run build && npm run preview` — visual browser check at localhost:4321/contact
- **Phase gate:** All 7 requirements manually verified on Netlify preview URL before `/gsd:verify-work`

### Wave 0 Gaps

No automated test framework is present in this project (consistent with all prior phases). All verification is manual browser testing on `npm run preview` and Netlify preview URL. No gaps to fill before implementation — this is the established project pattern.

---

## Sources

### Primary (HIGH confidence)

- Netlify Docs — Forms setup: https://docs.netlify.com/manage/forms/setup/
- Netlify Docs — Spam filters (honeypot): https://docs.netlify.com/manage/forms/spam-filters/
- Netlify Docs — Form notifications: https://docs.netlify.com/manage/forms/notifications/
- Project codebase: `src/components/StatsBar.astro`, `src/components/WhyUsHero.astro`, `src/components/CtaBanner.astro`, `src/data/homeContent.ts`

### Secondary (MEDIUM confidence)

- Calendly popup widget JS/CSS embed pattern: Search-verified 2025 against Calendly help docs; `Calendly.initPopupWidget()` API confirmed via multiple sources
- Netlify Forms AJAX fetch pattern: Verified against Netlify support forum (official) + Netlify blog

### Tertiary (LOW confidence)

- Netlify free tier limits (100/month for legacy): Multiple sources agree on figure but official docs page was ambiguous; flag for verification in Netlify dashboard

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Netlify Forms is the site's existing form solution (decided in State.md); Calendly URL pre-exists
- Architecture: HIGH — all components follow established patterns already in codebase
- Pitfalls: HIGH — AJAX submission quirks verified against official Netlify docs and support forum

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (stable integrations; Netlify pricing subject to change)
