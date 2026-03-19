# Domain Pitfalls

**Domain:** BPO/Virtual Staffing Marketing Website
**Stack:** Astro + Tailwind CSS + Netlify + Formspree/Make
**Owner Profile:** Non-developer maintaining via Claude Code
**Researched:** 2026-03-19
**Confidence:** MEDIUM-HIGH (training data through August 2025; core behaviors of these tools are stable and well-documented)

---

## Critical Pitfalls

Mistakes that cause rewrites, outages, or days of lost work.

---

### Pitfall C1: DNS Cutover Kills the Existing Site Before the New One Is Ready

**What goes wrong:** The owner points the workwiser.io domain to Netlify before the new site is live and tested, causing the current WordPress site to go offline. Visitors and potential clients hit a broken or blank site during the gap.

**Why it happens:** Domain connection is treated as the final step, but it's actually a two-sided operation. Netlify instructions say "add your domain" — they don't warn you that removing it from WordPress happens simultaneously or that DNS TTL means the old site can be unavailable for hours even if you try to reverse.

**Consequences:**
- Real business downtime during a live migration
- Lead loss if any campaigns are running to workwiser.io
- Potential email disruption if MX records are on the same zone and accidentally modified
- Panic-driven partial fixes that leave the DNS in a broken state

**Prevention:**
- Never touch DNS until the new Netlify site is confirmed working on the Netlify-provided subdomain (e.g., `workwiser.netlify.app`)
- Export a full DNS record snapshot from the current registrar BEFORE making any changes
- Schedule the cutover during a low-traffic window (not Monday morning)
- Use Netlify's "branch deploy" or the staging URL to get client/owner sign-off first
- After pointing DNS, keep the WordPress install intact (don't delete it) for at least 2 weeks as a fallback

**Warning signs:**
- Temptation to "just try connecting the domain early to see how it works"
- Not knowing what registrar the domain lives on before starting

**Phase:** DNS/domain work must be the final step of the deployment phase, never earlier.

---

### Pitfall C2: Formspree Free Tier Submission Limits Surprise You Post-Launch

**What goes wrong:** Formspree's free tier allows 50 submissions per month per form. A contact form AND a job application form each count separately. If either form gets more than 50 submissions in a month, Formspree silently stops processing them — no error shown to the visitor, no notification to the owner.

**Why it happens:** The limit is real but not prominently surfaced during setup. A BPO site that runs any outreach or job listing campaign can easily exceed 50 applications/month.

**Consequences:**
- Leads and job applicants submit the form and receive a success message — but nothing arrives
- Owner discovers the problem only when someone follows up and says "I applied but never heard back"
- Trust damage with both clients and prospective hires

**Prevention:**
- Set up the Google Sheets append via Make (formerly Integromat) as the primary record — Formspree is just the email notifier, not the source of truth
- Alternatively, use Make's webhook as the primary handler for both forms, bypassing Formspree's submission limit entirely
- Monitor Formspree dashboard monthly after launch
- Consider Formspree's Basic tier ($10/month) if the site generates consistent lead flow

**Warning signs:**
- Both forms rely solely on Formspree with no secondary record in Google Sheets
- No monitoring plan established at launch

**Phase:** Form architecture decision must be made in the planning phase, not retrofitted after launch.

---

### Pitfall C3: Netlify Forms Requires a Hidden Field That Astro's Build Process Strips Out

**What goes wrong:** Netlify's built-in form detection works by scanning the built HTML for a hidden `netlify` attribute and a hidden `form-name` input. Astro components that render forms with dynamic data or inside `.astro` component slots can produce HTML that Netlify's crawler cannot detect, leaving forms silently broken.

**Why it happens:** Netlify scans the static build output, not source files. If the form is inside a client-rendered island (using a framework component like React/Vue), Netlify never sees it in the static HTML and won't create a form entry in the dashboard.

**Consequences:**
- Form submissions go nowhere. No error shown to user.
- "It worked locally" but fails in production.

**Prevention:**
- If using Netlify Forms: ensure the form renders in plain `.astro` HTML (not inside a framework island). Add `netlify` attribute directly on the `<form>` tag and include `<input type="hidden" name="form-name" value="contact" />`.
- Verify the form appears in the Netlify dashboard under Site > Forms immediately after the first deploy.
- Better alternative: skip Netlify Forms entirely and use Formspree or a Make webhook — these work reliably regardless of how Astro renders the form.

**Warning signs:**
- Form exists inside a React or Vue component (Astro island)
- No test submission made immediately after first deploy

**Phase:** Test form submissions on the very first deploy — not at the end.

---

### Pitfall C4: Tailwind CSS Purging Removes Classes That Are Built Dynamically

**What goes wrong:** Tailwind's production build scans source files for class names and removes any that don't appear as literal strings. If class names are constructed dynamically (e.g., `"text-" + color` or using string interpolation), those classes are purged from the final CSS and styles silently disappear.

**Why it happens:** Tailwind's content scanner is a static string matcher, not a JavaScript evaluator. It cannot detect interpolated or conditional class names.

**Consequences:**
- Styles work perfectly in development (`astro dev`) and break only in production builds
- Debugging is extremely confusing because the code looks correct

**Prevention:**
- Always write complete Tailwind class names as literals: `text-blue-600` not `text-${color}-600`
- If dynamic classes are genuinely needed, add them to the `safelist` array in `tailwind.config.mjs`
- Audit all component files for string concatenation patterns involving Tailwind classes before launch

**Warning signs:**
- Using conditional class logic like `` `bg-${variant}` `` anywhere in components
- Colors or spacing look correct in dev but wrong after `npm run build`

**Phase:** Build-time verification needed in the initial build/deploy phase.

---

## Moderate Pitfalls

---

### Pitfall M1: BPO Website Copy Is Too Generic to Convert

**What goes wrong:** The site lists services and prices without addressing the specific anxiety of hiring remote staff: "Will they actually show up?", "Is my data safe?", "How do I know they're good?" The result is a site that looks professional but gets zero contact form submissions.

**Why it happens:** BPO/staffing sites default to capability lists ("We offer VA services for X, Y, Z industries") rather than confidence-building narratives. Visitors arrive skeptical and leave without acting.

**Consequences:**
- High bounce rate
- Contact form stays empty despite site traffic
- Owner concludes the site "isn't working" and attributes it to design

**Prevention:**
- Each service page must answer: "Why should I trust WorkWiser specifically?"
- Lead with social proof: client logos, testimonials, case study outcomes, stat numbers (agents placed, countries served, years operating)
- IRS-compliant, US-registered status is a trust signal — surface it prominently, especially on the homepage
- The Calendly booking CTA must be on every page, not just the contact page

**Warning signs:**
- Service pages are structured as feature lists with no testimonials or case studies
- No stat block (e.g., "200+ clients served") on the homepage

**Phase:** Content review during the build phase, before launch.

---

### Pitfall M2: Astro Islands Hydration Misunderstanding

**What goes wrong:** Interactive components (Calendly embed, animated counters, WhatsApp chat widget) are added to Astro pages without the correct `client:*` directive, so they render as static HTML with no JavaScript — they appear but don't function.

**Why it happens:** Astro is server-rendered by default. JavaScript runs on the client only when explicitly opted in via `client:load`, `client:visible`, etc. First-time Astro users expect JavaScript to "just work" like in a regular HTML file.

**Consequences:**
- Calendly widget renders as a broken embed
- Animated stats counter shows "0" on page load (exactly the bug on the current WordPress site)
- WhatsApp chat button appears but doesn't open WhatsApp

**Prevention:**
- Any component with interactivity needs an explicit `client:` directive
- Prefer `client:visible` for below-the-fold components (loads only when scrolled into view) to maintain page speed
- Test every interactive element in a production build (`npm run build && npm run preview`) before launch

**Warning signs:**
- Adding a Calendly `<script>` embed directly in an Astro component without a framework wrapper
- Stat counters that use JavaScript animation not showing the correct hydration directive

**Phase:** Hydration verification needed during component build phase.

---

### Pitfall M3: Non-Developer Maintenance Breaks the Build

**What goes wrong:** The owner asks Claude to make a content change, Claude edits a file incorrectly (broken JSX syntax, missing closing tag, wrong import path), and the Netlify build fails. The owner has no way to diagnose or fix this independently, and the site may revert to an older version or show a build error page.

**Why it happens:** Claude Code is a capable but imperfect coding assistant. Small syntax errors in Astro/JSX components cause build failures that are invisible locally (if the owner doesn't run `npm run build`). The owner has no developer instincts to diagnose "build failed" emails from Netlify.

**Consequences:**
- Site goes stale (showing old content) while a broken deploy sits in the queue
- Owner emails support or waits days before realizing the change never published

**Prevention:**
- After every Claude-assisted change, run `npm run build` locally before committing
- Set up Netlify deploy notifications to email the owner on both success AND failure
- Keep a clear git commit history so rollback is always one step: `git revert HEAD`
- Document a "rollback procedure" in the project README that the owner can follow literally: "If the site breaks, run these 3 commands"
- Structure the site so content (text, images) is in clearly-labeled data files or frontmatter, not embedded in component logic — this minimizes the surface area where Claude edits can cause syntax errors

**Warning signs:**
- No local build test step in the Claude-assisted update workflow
- Owner doesn't have Netlify failure notifications configured

**Phase:** Maintenance workflow must be defined and tested before handing the site over.

---

### Pitfall M4: Google Sheets Integration Breaks When the Sheet Is Reorganized

**What goes wrong:** The Make (Integromat) scenario maps form fields to specific columns in a Google Sheet by column position or name. If the owner later adds a column, renames a header, or moves columns to "organize" the sheet, the automation silently writes data to wrong columns or fails entirely.

**Why it happens:** Non-developers treat spreadsheets as living documents and reorganize them freely without realizing the automation is tightly coupled to the structure.

**Consequences:**
- Form submissions start writing to wrong columns or dropping data
- Owner doesn't notice until they manually check the sheet weeks later

**Prevention:**
- Add a locked header row with a comment/note: "Do not move or rename these columns — automation depends on them"
- In Make, map fields by column name (not position) and test after any sheet change
- Designate the Google Sheet as "append-only" infrastructure — owner reviews but doesn't restructure it
- Keep a separate "reporting" sheet that pulls from the raw submissions sheet via QUERY() or IMPORTRANGE() if reorganization is needed

**Warning signs:**
- Sheet columns have been renamed or reordered after the automation was set up
- Make scenario hasn't been tested in more than 30 days

**Phase:** Document sheet structure constraints at the integration setup phase.

---

### Pitfall M5: WhatsApp Chat Widget Slows Page Load Score

**What goes wrong:** Third-party chat widgets (WhatsApp, Tidio, Intercom) inject large JavaScript bundles that fire on page load. On a fast Astro site, this can drop Lighthouse performance scores from 95+ to 60-70, eliminating the primary advantage of switching away from WordPress.

**Why it happens:** The widget script is added to the `<head>` or as a global script without considering its load cost. The WordPress site likely already has this problem, but it's invisible because everything was slow anyway.

**Consequences:**
- Core Web Vitals scores drop
- Google SEO ranking signal weakened
- The "fast site" value proposition is undermined

**Prevention:**
- Load the WhatsApp widget script with `defer` or trigger it only after page interaction (`client:idle` in Astro)
- Use a lightweight custom WhatsApp button (plain anchor tag with `https://wa.me/[number]`) instead of an embeddable widget if full chat functionality isn't needed
- Test Lighthouse scores with and without the widget to quantify the impact

**Warning signs:**
- Widget script loaded in `<head>` without `defer` or `async`
- Lighthouse score drops more than 10 points compared to the widget-free build

**Phase:** Performance audit needed after adding all third-party integrations.

---

## Minor Pitfalls

---

### Pitfall m1: Calendly Embed Breaks on Mobile Due to Fixed Height

**What goes wrong:** Calendly embeds are typically added with a fixed pixel height (e.g., `height: 630px`). On mobile, this causes the embed to either overflow the container or show scrollbars within the iframe, making it unusable.

**Prevention:** Use Calendly's responsive popup widget mode (a button that opens Calendly in a modal overlay) instead of inline embed. The popup requires minimal CSS and works across all screen sizes.

**Phase:** Mobile testing needed during build phase.

---

### Pitfall m2: Images Not Optimized, Offsetting Astro's Speed Advantage

**What goes wrong:** Large unoptimized images (team photos, case study screenshots, hero backgrounds) are placed directly in `src/assets/` or `public/` without going through Astro's `<Image>` component. The page loads slowly despite the static site architecture.

**Prevention:** Always use Astro's built-in `<Image>` component from `astro:assets` for all images. It generates WebP format, correct `width`/`height` attributes, and `loading="lazy"` automatically. Never place large images in `public/` — they bypass optimization.

**Phase:** Image handling convention should be set in the first build phase.

---

### Pitfall m3: Netlify Free Tier Bandwidth Limit

**What goes wrong:** Netlify free tier includes 100GB bandwidth per month. A marketing site with large hero images that isn't image-optimized can burn through this faster than expected. Exceeding the limit triggers overage charges or temporary suspension.

**Prevention:** Optimized images (WebP via Astro `<Image>`) dramatically reduce per-page weight. With proper optimization, a 5-page marketing site will stay well within 100GB even at reasonable traffic levels. Monitor bandwidth in the Netlify dashboard.

**Phase:** Monitor at launch, no action needed if images are optimized.

---

### Pitfall m4: `public/` Directory Files Are Not Processed by Astro

**What goes wrong:** Files placed in `public/` are copied verbatim to the build output. This is correct for favicons, `robots.txt`, and `sitemap.xml`, but if image files are accidentally placed in `public/` instead of `src/assets/`, they skip Astro's image optimization entirely.

**Prevention:** Simple rule: hero images, team photos, and any content image goes in `src/assets/`. Only truly static, non-optimizable files (favicon, PDF downloads, manifest) go in `public/`.

**Phase:** File organization convention needed from project setup.

---

### Pitfall m5: Form Spam Without CAPTCHA

**What goes wrong:** A contact form on a live domain will attract bot spam within days of launch. Without spam protection, the Google Sheet fills with junk and the owner's inbox floods.

**Prevention:** Formspree includes basic spam filtering on paid tiers. On free tier, add a honeypot field (a hidden input that bots fill but humans don't). Make scenarios can add a filter step that discards submissions with known spam patterns. Avoid Google reCAPTCHA v2 — it degrades UX; prefer hCaptcha or Cloudflare Turnstile (both free, privacy-friendly).

**Phase:** Implement honeypot at form build time; evaluate CAPTCHA before launch.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Project setup / scaffolding | `public/` vs `src/assets/` confusion from day one | Set file placement rules in phase instructions |
| Component build | Tailwind dynamic class purging | Write only literal class names; test production build |
| Component build | Astro island hydration | Add `client:` directives to all interactive elements; test with `npm run preview` |
| Form integration | Formspree submission limits | Use Make webhook as primary; Formspree as notifier only |
| Form integration | Netlify Forms not detecting Astro forms | Verify form appears in Netlify dashboard after first deploy |
| Form integration | Google Sheets column dependency | Document column structure; warn owner not to reorganize |
| Third-party embeds | Calendly mobile breakage | Use popup widget, not inline iframe |
| Third-party embeds | WhatsApp widget performance hit | Use `defer` or plain anchor link |
| DNS cutover | Site downtime during migration | Snapshot DNS; test on Netlify subdomain first; cutover last |
| Maintenance handoff | Claude-assisted edits breaking build | Require `npm run build` test before every commit; configure failure alerts |
| Post-launch | Form spam | Honeypot field at build time; CAPTCHA evaluation before launch |
| Post-launch | Formspree monthly limit hit | Monitor dashboard; upgrade or switch to Make-only flow |

---

## BPO/Staffing Domain-Specific Pitfalls

These are specific to what BPO and virtual staffing marketing sites get wrong — independent of the tech stack.

---

### Domain Pitfall D1: No Clear Differentiation from Generic Offshore Staffing

**What goes wrong:** Visitors cannot distinguish WorkWiser from dozens of similar-sounding VA companies. The site lists services without answering "why WorkWiser specifically?"

**Why it happens:** Founders know their differentiators deeply but assume visitors will read between the lines. They don't.

**Consequences:** High bounce rates, low form submissions, visitors go to competitors who communicate trust more explicitly.

**Prevention:** The US registration + IRS compliance angle is a real differentiator for US-based clients worried about contractor misclassification — surface this on the homepage, not buried in FAQ. The bilingual English/Spanish team serving Nicaragua is a concrete operational detail that signals legitimacy — include it.

---

### Domain Pitfall D2: Hiding the Price Until "Contact Us"

**What goes wrong:** No pricing signal on the site. Visitors don't know if WorkWiser is affordable for their budget and leave without converting.

**Why it happens:** BPO companies fear that showing prices will scare away large clients or invite low-budget tire-kickers.

**Consequences:** Qualified mid-market prospects who see "starting at $9/hour" as a competitive advantage never learn about it.

**Prevention:** "Starting at $9/hour" is a competitive advantage for the target market — include it on the homepage and services page as a trust signal, not a commitment. It sets expectations and filters out truly incompatible prospects while drawing in cost-conscious buyers.

---

### Domain Pitfall D3: Job Application Flow Looks Unprofessional

**What goes wrong:** The job application form asks for the same fields as the contact form, or has no role-specific fields (availability, English proficiency level, experience type). Applicants submit generic forms and the owner has no way to screen them.

**Why it happens:** The form is built as an afterthought using the same component as the contact form.

**Consequences:** Either a flood of unqualified applications or top candidates who see the generic form and question the company's professionalism.

**Prevention:** The job application form should have its own page (`/careers` or `/apply`), its own Formspree form (separate from contact, to avoid mixing data), and fields appropriate for VA screening: full name, email, phone, location, role interest, English proficiency (self-rated), years of experience, availability (hours/week), and a short free-text "tell us about yourself."

---

## Sources

**Confidence levels:**

| Claim | Confidence | Basis |
|-------|------------|-------|
| Formspree free tier 50 submissions/month limit | HIGH | Stable, documented pricing feature as of training cutoff |
| Netlify Forms hidden field requirement | HIGH | Official Netlify documentation, well-documented behavior |
| Tailwind CSS static class scanning (purge behavior) | HIGH | Core Tailwind design, documented in official docs |
| Astro `client:*` directive required for interactivity | HIGH | Core Astro design, stable since Astro 2.0 |
| DNS TTL propagation timing risks | HIGH | Standard DNS behavior, not tool-specific |
| `public/` vs `src/assets/` image optimization behavior | HIGH | Core Astro build behavior |
| BPO conversion copy patterns | MEDIUM | Based on marketing domain knowledge; validate with actual analytics post-launch |
| WhatsApp widget performance impact | MEDIUM | General third-party script impact; specific numbers depend on widget vendor |

- Astro official docs: https://docs.astro.build
- Netlify Forms docs: https://docs.netlify.com/forms/setup/
- Formspree pricing: https://formspree.io/pricing
- Tailwind CSS content configuration: https://tailwindcss.com/docs/content-configuration
