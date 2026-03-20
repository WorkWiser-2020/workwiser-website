# Phase 2: Brand System - Research

**Researched:** 2026-03-20
**Domain:** Astro 6 layout system, Tailwind v4 CSS design tokens, font loading, responsive navigation
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Header font:** Open Sauce One — open-source, find freely available source (GitHub/fontsource) and self-host or CDN
- **Body font:** Inter (free Google Font) — Helvetica Now Display license not purchased
- **Heading weights:** Bold (700) and ExtraBold (800)
- **Header navigation:** Sticky header, stays visible at all times as user scrolls
- **Desktop nav:** Horizontal links — Home, About Us, Why Us, Contact — plus phone number (302) 257-5427 and "Get Started" CTA button
- **"Get Started" CTA:** Links to calendly.com/workwiser-info/ceo-client
- **Mobile nav:** Hamburger icon → slide-out menu from the right, nav links stacked vertically
- **Brand tokens:** #003c64 (navy primary), #0072c9 (blue), #26aeb4 (teal), #effefe (light teal bg), #f3f145 (yellow accent), #ffffff (white)
- **Dot grid pattern:** Page content sections only — not in header or footer
- **Footer content:** Nav links + contact info (phone, email) + social media icons
- **Social media URLs:**
  - LinkedIn: https://www.linkedin.com/company/workwiser-io/
  - Facebook: https://www.facebook.com/share/1BMtBrehBK/?mibextid=wwXIfr
  - Instagram: https://www.instagram.com/workwiser_?igsh=MXQ0MTE1OWl4d3htaw==
- **Contact info:** Phone (302) 257-5427, Email info@workwiser.io

### Claude's Discretion
- Body font weight selection (Regular + Medium or Regular + SemiBold)
- Header background treatment (solid navy vs subtle gradient)
- Footer background color
- Yellow and teal accent placement in header/footer
- Gradient usage in header vs reserved for hero sections
- Copyright line inclusion
- Exact spacing, typography scale, and responsive breakpoints

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-02 | Brand tokens implemented in CSS `@theme {}` block: colors, gradients, fonts | Tailwind v4 `@theme` block with `--color-*` and `--font-*` namespace variables; hex values supported directly |
| FOUND-03 | Open Sauce font loaded (header font — available via CDN/fontsource) | `@fontsource/open-sauce-one` npm package v5.2.5 exists, 9 weights available (300–900); use Astro 6 native fonts API with fontsource provider |
| FOUND-04 | Body font decision resolved: Inter (free, near-identical alternative) | `@fontsource-variable/inter` available; use Astro 6 native fonts API with weights 400 and 500/600 |
| FOUND-05 | BaseLayout.astro created — shared header, footer, SEO meta, and page structure | Astro layout pattern with typed Props interface, `<slot />` for content, `<Font />` component in `<head>` |
| FOUND-06 | Header/navigation: links + phone + CTA button, desktop horizontal (not hamburger-only) | Sticky header with `sticky top-0 z-50`; responsive show/hide via Tailwind breakpoint classes; JS toggle for slide-out |
| FOUND-07 | Footer with logo, email, phone, social links | Astro component with static data; SVG social icons inline or from SVG sprite |
| FOUND-08 | Mobile-responsive layout on phone, tablet, and desktop | Tailwind responsive breakpoints `md:` and `lg:`; slide-out via `translate-x-full` toggle pattern |
</phase_requirements>

---

## Summary

Phase 2 builds the shared visual shell for every page in the WorkWiser site. Three distinct technical areas must come together: design tokens (Tailwind v4 `@theme`), font loading (Astro 6 native fonts API), and component layout (BaseLayout.astro with Header and Footer). All three integrate cleanly with the established stack.

The project uses **Astro 6.0.7** (not Astro 5 as originally planned at scaffold time — the package.json confirms `"astro": "^6.0.7"`). Astro 6 ships a stable, built-in Fonts API via `fonts: []` in `astro.config.mjs` with `fontProviders` imported from `'astro/config'`. This is the preferred loading mechanism — it auto-downloads, caches, generates optimized fallbacks, and adds preload hints. Both `@fontsource/open-sauce-one` and `@fontsource-variable/inter` are available through this API.

The responsive navigation requires vanilla JavaScript for the mobile slide-out toggle. The pattern is minimal: a `<script>` tag in the Header component toggles `translate-x-full` on a right-side drawer. No external JS library is needed. The sticky header is pure Tailwind (`sticky top-0 z-50`). On desktop (`md:` breakpoint and above), the nav links show inline and the hamburger hides.

**Primary recommendation:** Use Astro 6's native fonts API with the fontsource provider for both typefaces, define all brand tokens in `global.css` `@theme {}` using hex values, and implement the mobile hamburger as a Tailwind translate-driven slide-out with a `<script>` tag in the Header component.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 6.0.7 (installed) | Page routing, layouts, components | Already installed; v6 ships stable fonts API |
| tailwindcss | 4.2.2 (installed) | Utility classes, responsive breakpoints | Already installed; v4 CSS-first config via `@theme` |
| @tailwindcss/vite | 4.2.2 (installed) | Vite plugin integration | Correct v4 integration method (not @astrojs/tailwind) |

### Fonts
| Package | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource/open-sauce-one | 5.2.5 | Open Sauce One heading font | Header font; 9 weights (300–900) available |
| @fontsource-variable/inter | latest | Inter body font (variable) | Body font; variable font = one file covers all weights |

Note: Astro 6's native fonts API (`fontProviders.fontsource()`) auto-fetches from Fontsource. Installing the npm packages directly is the fallback approach if the API doesn't resolve the font name correctly.

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | 3.7.1 (installed) | Sitemap generation | Already wired in astro.config.mjs |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Astro 6 fonts API | npm direct import in global.css | Direct import is simpler if the native API has issues with Open Sauce One; use as fallback |
| Vanilla JS toggle | Alpine.js `x-show`/`x-transition` | Alpine adds ~14KB dependency; vanilla is simpler for a single toggle |
| CSS `translate-x-full` | CSS `max-height` transition | Translate performs better (GPU composite layer); max-height has animation timing issues |

**Installation (if falling back to direct npm imports):**
```bash
npm install @fontsource/open-sauce-one @fontsource-variable/inter
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── layouts/
│   └── BaseLayout.astro      # Shell: <html>, <head>, <Header />, <slot />, <Footer />
├── components/
│   ├── Header.astro           # Sticky nav: logo, links, phone, CTA, hamburger
│   ├── Footer.astro           # Footer: logo, nav links, contact info, social icons
│   └── MobileMenu.astro       # (optional) Extract slide-out drawer if Header grows complex
├── styles/
│   └── global.css             # @import "tailwindcss"; + @theme {} with all brand tokens
└── pages/
    └── index.astro            # Updated to use <BaseLayout> instead of bare HTML
```

### Pattern 1: Tailwind v4 Brand Token Definition

**What:** Define all brand colors and font families as CSS custom properties inside `@theme {}` in `global.css`. Tailwind v4 reads these and generates utility classes automatically.

**When to use:** All brand colors and typography — the single source of truth.

**Example:**
```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */

@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-navy:      #003c64;
  --color-blue:      #0072c9;
  --color-teal:      #26aeb4;
  --color-teal-light: #effefe;
  --color-yellow:    #f3f145;
  --color-white:     #ffffff;

  /* Font Families — names must match loaded fonts */
  --font-heading: 'Open Sauce One', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```

After this, use tokens as Tailwind classes: `bg-navy`, `text-blue`, `text-teal`, `bg-yellow`, `font-heading`, `font-body`.

**Key note:** Hex values work directly in `@theme {}`. OKLCH is Tailwind v4's default for built-in palette, but custom tokens accept any valid CSS color format.

### Pattern 2: Astro 6 Font Loading via Native Fonts API

**What:** Configure fonts in `astro.config.mjs` using the `fonts` array and `fontProviders`. Astro downloads, caches, and optimizes them. Add `<Font />` component in BaseLayout's `<head>`.

**When to use:** Primary method for all font loading in Astro 6.

**Example:**
```javascript
// astro.config.mjs
// Source: https://astro.build/blog/astro-6/ and https://docs.astro.build/en/guides/fonts/
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rococo-faun-f7353a.netlify.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Open Sauce One',
      cssVariable: '--font-open-sauce-one',
      weights: [700, 800],
      styles: ['normal'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500],
      styles: ['normal'],
    },
  ],
});
```

```astro
<!-- src/layouts/BaseLayout.astro -->
---
import { Font } from 'astro:assets';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'WorkWiser — Your Trusted Virtual Assistant Partners' } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | WorkWiser</title>
    <Font cssVariable="--font-open-sauce-one" preload />
    <Font cssVariable="--font-inter" preload />
  </head>
  <body class="font-body">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Fallback if native fonts API fails for Open Sauce One:** Import the npm package directly in global.css:
```css
/* Add ABOVE @import "tailwindcss" */
@import '@fontsource/open-sauce-one/700.css';
@import '@fontsource/open-sauce-one/800.css';
@import '@fontsource-variable/inter';
```

Then keep `@theme {}` font-family values — they'll reference the loaded fonts by name.

### Pattern 3: Sticky Responsive Header with Slide-Out Mobile Menu

**What:** Desktop shows full horizontal nav; mobile shows hamburger that triggers a right-side slide-out drawer. Tailwind responsive classes handle layout switching; vanilla JS handles the toggle.

**When to use:** This is the only nav pattern — desktop horizontal, mobile slide-out.

**HTML structure:**
```astro
<!-- src/components/Header.astro -->
---
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/why-us', label: 'Why Us' },
  { href: '/contact', label: 'Contact' },
];
---

<header class="sticky top-0 z-50 bg-navy">
  <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

    <!-- Logo -->
    <a href="/">
      <img src="/logo-white.svg" alt="WorkWiser" class="h-8" />
    </a>

    <!-- Desktop nav (hidden on mobile) -->
    <nav class="hidden md:flex items-center gap-6">
      {navLinks.map(link => (
        <a href={link.href} class="text-white hover:text-yellow transition-colors">
          {link.label}
        </a>
      ))}
      <span class="text-white text-sm">(302) 257-5427</span>
      <a
        href="https://calendly.com/workwiser-info/ceo-client"
        class="bg-yellow text-navy font-semibold px-4 py-2 rounded hover:bg-yellow/90 transition-colors"
        target="_blank" rel="noopener"
      >
        Get Started
      </a>
    </nav>

    <!-- Hamburger (visible on mobile only) -->
    <button
      id="mobile-menu-toggle"
      class="md:hidden text-white p-2"
      aria-label="Open navigation menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <!-- Hamburger SVG icon -->
      <svg id="icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <!-- Close SVG icon (hidden by default) -->
      <svg id="icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</header>

<!-- Mobile slide-out drawer (from right) -->
<div
  id="mobile-menu"
  class="fixed inset-y-0 right-0 z-40 w-72 bg-navy transform translate-x-full transition-transform duration-300 ease-in-out md:hidden"
  aria-hidden="true"
>
  <!-- Overlay backdrop -->
  <div id="mobile-overlay" class="fixed inset-0 bg-black/50 -z-10 opacity-0 transition-opacity duration-300" />

  <nav class="flex flex-col gap-4 p-6 pt-20">
    {navLinks.map(link => (
      <a href={link.href} class="text-white text-lg hover:text-yellow transition-colors">
        {link.label}
      </a>
    ))}
    <div class="border-t border-white/20 pt-4 mt-2">
      <p class="text-white/70 text-sm mb-4">(302) 257-5427</p>
      <a
        href="https://calendly.com/workwiser-info/ceo-client"
        class="block bg-yellow text-navy font-semibold px-4 py-3 rounded text-center hover:bg-yellow/90 transition-colors"
        target="_blank" rel="noopener"
      >
        Get Started
      </a>
    </div>
  </nav>
</div>

<script>
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    menu?.classList.remove('translate-x-full');
    overlay?.classList.remove('opacity-0');
    overlay?.classList.add('opacity-100');
    iconOpen?.classList.add('hidden');
    iconClose?.classList.remove('hidden');
    toggle?.setAttribute('aria-expanded', 'true');
    menu?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    isOpen = false;
    menu?.classList.add('translate-x-full');
    overlay?.classList.remove('opacity-100');
    overlay?.classList.add('opacity-0');
    iconOpen?.classList.remove('hidden');
    iconClose?.classList.add('hidden');
    toggle?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  }

  toggle?.addEventListener('click', () => {
    if (isOpen) closeMenu(); else openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  // Close on nav link click (mobile)
  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
</script>
```

### Pattern 4: BaseLayout Page Usage

**What:** Pages import and wrap with BaseLayout, passing title/description props.

**Example:**
```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Home" description="WorkWiser — Your Trusted Virtual Assistant Partners">
  <h1>Welcome to WorkWiser</h1>
</BaseLayout>
```

### Anti-Patterns to Avoid

- **Bare `<html>` in pages after BaseLayout exists:** `index.astro` currently contains a raw `<html>` structure. Once BaseLayout is created, update the page to use it — do not leave both patterns coexisting.
- **`tailwind.config.js` file for Tailwind v4:** Tailwind v4 does NOT use a JS config file. All config lives in `global.css` via `@theme {}`. Do not create `tailwind.config.js`.
- **`@astrojs/tailwind` integration:** The project correctly uses `@tailwindcss/vite` only. Do not add `@astrojs/tailwind` — it is deprecated for v4.
- **Loading fonts twice:** If using Astro 6 fonts API, do NOT also `@import` the fontsource npm package in CSS — pick one method only.
- **`overflow: hidden` on body without menu close handling:** The mobile menu locks body scroll. Always provide a way to re-enable scroll: on close, on overlay click, and on navigation link click.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading + preloading | Manual `<link rel="preload">` tags + `@font-face` declarations | Astro 6 fonts API | Handles download, caching, optimized fallbacks, and preload hints automatically |
| CSS design token generation | Custom PostCSS plugin or JS config | Tailwind v4 `@theme {}` | Single CSS block generates all utility classes + CSS variables simultaneously |
| Responsive breakpoints | Custom media queries | Tailwind `md:` / `lg:` prefixes | Already defined; `md` = 768px, `lg` = 1024px match standard device targets |
| SVG social icons | Draw SVG by hand | Copy from Simple Icons (simpleicons.org) | LinkedIn, Facebook, Instagram SVG paths are standardized; copying is correct approach |

**Key insight:** Astro 6's fonts API eliminates the single most fiddly part of font setup (subset selection, preload, FOUT prevention) — use it rather than manual `@font-face` declarations.

---

## Common Pitfalls

### Pitfall 1: Astro 6 Fonts API — font name must match Fontsource catalog exactly

**What goes wrong:** The `name` field in the fonts config must match the font name as registered in Fontsource. Using `'Open Sauce One'` should work because that is the npm package slug (`open-sauce-one` → display name `Open Sauce One`). If Astro can't resolve it, the build fails silently or falls back to no font.

**Why it happens:** The fontsource provider uses the display name to look up the font. Slight variations ("OpenSauce One", "Open-Sauce-One") will fail.

**How to avoid:** After implementing the fonts config, run `npm run build` and check that font files appear in `dist/_astro/` or Astro's font cache. If missing, fall back to the direct npm import method.

**Warning signs:** Headings rendering in system sans-serif after build; font files not appearing in network panel.

### Pitfall 2: Tailwind v4 — `@theme` variables must be top-level, not nested

**What goes wrong:** Placing `@theme {}` inside a `:root {}` block or a media query causes Tailwind to silently ignore the tokens.

**Why it happens:** Tailwind v4 documentation explicitly states: "Theme variables must be defined at the top level, not nested under selectors or media queries."

**How to avoid:** Always place `@theme {}` at the root level of `global.css`, after the `@import "tailwindcss"` line.

### Pitfall 3: Sticky header obstructing in-page anchor links

**What goes wrong:** When a user clicks an anchor link (e.g., `#contact`), the sticky header covers the target element's heading.

**Why it happens:** `position: sticky` removes the header from flow and CSS `scroll-margin-top` is needed on anchor targets.

**How to avoid:** Add `scroll-margin-top` via a global CSS rule or Tailwind class on any element with an `id` attribute used as an anchor. For Phase 2 this is low risk (no anchored sections yet), but plan for it in future phases.

**Warning signs:** Anchor navigation leaves the heading hidden under the header.

### Pitfall 4: Mobile menu z-index stacking conflict

**What goes wrong:** The slide-out drawer (z-40) or header (z-50) conflicts with other absolutely/fixed positioned elements on content pages (modals, dropdowns added in later phases).

**Why it happens:** z-index only matters within the same stacking context.

**How to avoid:** Reserve z-index tiers: `z-50` for header, `z-40` for mobile drawer, `z-30` for page-level overlays, `z-20` and below for content. Document this convention in code comments.

### Pitfall 5: Body scroll lock not removed after SPA-style navigation

**What goes wrong:** If Astro's client-side routing (ClientRouter) is added in a later phase, navigating away while the menu is open leaves `overflow-hidden` on the body, breaking scroll on the new page.

**Why it happens:** The `<script>` in Header.astro runs once. If Astro later uses view transitions with `<ClientRouter />`, event listeners must re-register on `astro:page-load`.

**How to avoid:** In Phase 2, this is not an issue (no ClientRouter yet). Note this risk for Phase 8 polish if view transitions are added. Pattern: wrap menu init in a function and call it both on DOM load and on `astro:page-load`.

---

## Code Examples

Verified patterns from official sources:

### @theme Color Token Definition
```css
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  --color-navy:       #003c64;
  --color-blue:       #0072c9;
  --color-teal:       #26aeb4;
  --color-teal-light: #effefe;
  --color-yellow:     #f3f145;
  /* --color-white is already in Tailwind defaults; can omit or re-declare */

  --font-heading: 'Open Sauce One', sans-serif;
  --font-body:    'Inter', sans-serif;
}
```
Results in classes: `bg-navy`, `text-blue`, `bg-yellow`, `font-heading`, `font-body`.

### Astro 6 Font Config
```javascript
/* Source: https://astro.build/blog/astro-6/ */
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rococo-faun-f7353a.netlify.app',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Open Sauce One',
      cssVariable: '--font-open-sauce-one',
      weights: [700, 800],
      styles: ['normal'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500],
      styles: ['normal'],
    },
  ],
});
```

### Mobile Slide-Out Toggle (core JS)
```javascript
/* Source: https://web3templates.com/blog/create-responsive-navigation-menu-in-astro-javascript */
/* Adapted for slide-out pattern */
const menu = document.getElementById('mobile-menu');
const toggle = document.getElementById('mobile-menu-toggle');

toggle?.addEventListener('click', () => {
  menu?.classList.toggle('translate-x-full');
});
```

### Tailwind Sticky Header
```html
<!-- Source: https://tailwindcss.com/docs/position -->
<header class="sticky top-0 z-50 bg-navy">
  <!-- content -->
</header>
```

### Font Component in BaseLayout Head
```astro
<!-- Source: https://docs.astro.build/en/guides/fonts/ -->
---
import { Font } from 'astro:assets';
---
<head>
  <Font cssVariable="--font-open-sauce-one" preload />
  <Font cssVariable="--font-inter" preload />
</head>
```

### Direct npm Import (Fallback Method)
```css
/* src/styles/global.css — use ONLY if Astro fonts API fails */
@import '@fontsource/open-sauce-one/700.css';
@import '@fontsource/open-sauce-one/800.css';
@import '@fontsource-variable/inter';

@import "tailwindcss";
/* Note: @import statements must come BEFORE @import "tailwindcss" */
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js with `theme.extend.colors` | `@theme {}` in CSS | Tailwind v4 (2025) | No JS config file needed; CSS is single source of truth |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin | Tailwind v4 + Astro v3+ | Already in place in this project |
| Manual `@font-face` + preload links | Astro 6 `fonts:[]` config + `<Font />` | Astro 6.0 (2026-03) | Automated download, caching, fallbacks, preloads |
| Hamburger menu with Alpine.js | Vanilla JS in `<script>` tag | Astro philosophy | No framework dependency for simple toggle |
| `import "@fontsource/xxx"` in layout | Astro native fonts API | Astro 6.0 | Preferred; npm import is now the fallback |

**Deprecated/outdated:**
- `tailwind.config.js` with `theme.colors`: Replaced by `@theme {}` in CSS for v4
- `@astrojs/tailwind` package: Deprecated for Tailwind v4; `@tailwindcss/vite` is correct
- `Astro.glob()`: Removed in Astro 6 (not relevant to this phase, but worth noting)
- `<ViewTransitions />` component: Renamed to `<ClientRouter />` in Astro 6 (relevant if added later)

---

## Open Questions

1. **Will Astro 6 fontsource provider resolve "Open Sauce One" by name?**
   - What we know: The package `@fontsource/open-sauce-one` exists at v5.2.5. The Astro fonts API uses the font's display name to resolve via Fontsource's API.
   - What's unclear: Whether the Astro fontsource provider correctly looks up "Open Sauce One" (vs. the slug "open-sauce-one"). This will only be confirmed at build time.
   - Recommendation: Implement with the native API first. If the build fails to load the font, fall back to direct npm install + CSS `@import`. Document the fallback as a Wave 0 backup step.

2. **Header background: solid navy vs gradient?**
   - What we know: Brand has #003c64 navy (darkest) and #0072c9 blue. A left-to-right gradient from navy to blue would align with Canva mockup style. Solid navy is safest for contrast with white text.
   - What's unclear: Which version appears in the actual Canva mockups — Claude doesn't have direct access.
   - Recommendation: Implement as solid navy (`bg-navy`) initially, as it guarantees maximum contrast. Add gradient as a simple CSS tweak if the user prefers after review: `style="background: linear-gradient(135deg, #003c64, #0072c9)"`.

3. **Logo file paths and format?**
   - What we know: Context mentions primary (light bg) and white (dark bg) versions exist. Current `public/favicon.svg` is a placeholder.
   - What's unclear: Whether logo files have been added to the repository yet.
   - Recommendation: Planner should include a task that checks `public/` for logo files and uses a text-based fallback ("WorkWiser") if no logo SVG/PNG is present yet.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright (browser-based E2E) — no unit test framework detected |
| Config file | None found — Wave 0 must create `playwright.config.ts` if E2E tests are required, OR validate manually via `npm run dev` + browser inspection |
| Quick run command | `npm run build` (build validation — catches Tailwind, font config, and Astro compilation errors) |
| Full suite command | `npm run build && npm run preview` |

**Note:** This phase is primarily visual/structural. Automated testing of visual output (colors, fonts, layout) requires either visual regression tools (Playwright screenshots) or manual browser inspection. The build pipeline (`npm run build`) is the critical automated gate — it will fail if:
- `@theme {}` has invalid CSS
- Astro fonts API can't resolve a font name
- Component import paths are wrong
- TypeScript prop interface errors

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-02 | Brand color tokens defined and usable as Tailwind classes | Build + manual | `npm run build` | ❌ Wave 0 |
| FOUND-03 | Open Sauce One loads for headings | Build + manual browser | `npm run build` | ❌ Wave 0 |
| FOUND-04 | Inter loads for body text | Build + manual browser | `npm run build` | ❌ Wave 0 |
| FOUND-05 | BaseLayout renders with header and footer on every page | Build + manual | `npm run build` | ❌ Wave 0 |
| FOUND-06 | Desktop nav shows horizontal links (not hamburger-only) | Manual browser at ≥768px | `npm run dev` + visual | ❌ Wave 0 |
| FOUND-07 | Footer shows logo, email, phone, social links | Manual browser | `npm run dev` + visual | ❌ Wave 0 |
| FOUND-08 | Mobile layout responds correctly at ≤767px | Manual browser (devtools mobile) | `npm run dev` + visual | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` — catches compilation errors immediately
- **Per wave merge:** `npm run build && npm run preview` — full local preview
- **Phase gate:** Build green + manual browser check at mobile (375px), tablet (768px), desktop (1280px) before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] No test files exist yet — this phase creates visual components best validated manually
- [ ] `npm run build` acts as the automated gate; it must pass clean before each commit
- [ ] Manual browser checklist: run `npm run preview` and verify each component at 375px / 768px / 1280px viewport widths

*(No Playwright config needed for Phase 2 — visual validation via browser devtools is sufficient and faster. Playwright E2E will be valuable in Phase 5+ when forms are added.)*

---

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Theme Docs](https://tailwindcss.com/docs/theme) — `@theme {}` syntax, `--color-*` and `--font-*` namespaces, hex value support
- [Astro 6.0 Blog Post](https://astro.build/blog/astro-6/) — fonts API config syntax, `fontProviders` import from `'astro/config'`
- [Astro Fonts Guide](https://docs.astro.build/en/guides/fonts/) — `<Font />` component, weights configuration, provider setup
- [Astro Layouts Docs](https://docs.astro.build/en/basics/layouts/) — BaseLayout pattern, Props interface, `<slot />` usage
- [Fontsource Open Sauce One](https://fontsource.org/fonts/open-sauce-one/install) — available weights (300–900), npm package name `@fontsource/open-sauce-one`, variable version availability

### Secondary (MEDIUM confidence)
- [Web3Templates Astro Nav Tutorial](https://web3templates.com/blog/create-responsive-navigation-menu-in-astro-javascript) — vanilla JS hamburger toggle pattern verified against Astro docs script behavior
- [Tailwind Translate Docs](https://tailwindcss.com/docs/translate) — `translate-x-full` class confirmed for slide-out pattern
- [Astro 5.7 Release](https://astro.build/blog/astro-570/) — confirmed fonts API first appeared in 5.7 as experimental, graduated to stable in Astro 6

### Tertiary (LOW confidence)
- AlternativeTo news summary on Astro 6 fonts API — used to confirm "built-in" status in v6; secondary confirmation only

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — installed packages confirmed from package.json; Astro 6.0.7 confirmed
- Architecture: HIGH — BaseLayout + slot pattern is core Astro; verified against current docs
- Tailwind @theme: HIGH — verified against official Tailwind v4 docs; hex values confirmed to work
- Font loading (Astro API): MEDIUM — Astro 6 fonts API verified; open-sauce-one resolution unconfirmed until build
- Mobile nav pattern: HIGH — vanilla JS toggle is well-documented, minimal risk
- Pitfalls: HIGH — z-index, scroll lock, and font resolution issues are well-known patterns

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (Tailwind v4 + Astro 6 are stable; low churn expected)
