# Ocean Prime Pool Service — Website

Built with [Astro](https://astro.build) — ships static HTML with zero JS by default, which is why it's the right fit for the Core Web Vitals targets in the project plan.

## What's included in this build

**All 29 pages from the sitemap are now built:**
- Homepage (`/`)
- Pool Service Plans, Weekly Pool Service, Pool Cleaning, Pool Maintenance, Green Pool Cleanup, Seasonal & Vacation Pool Care
- Pool Equipment Repair (hub), Pool Pump Repair, Pool Pump Replacement, Pool Heater Repair, Pool Heater Installation, Filter Repair & Replacement, Salt System Repair, Pool Automation Repair, Pool Light Repair, Pool Renovation (placeholder shell — see note below)
- Service Areas hub + Naples, Bonita Springs, Estero, and Marco Island (each with unique local content, not templated duplicates)
- About, Reviews, Contact, Privacy Policy, Terms & Conditions
- Thank-you page, custom 404
- `_redirects` file mapping the old site's URLs to the new structure
- Shared component library: header (with full dropdown nav + simplified variant for Ads landing pages), footer, utility bar, sticky mobile CTA bar, quote form, FAQ accordion, plan/service cards, SEO/schema component
- `src/data/business.json` — single source of truth for phone, hours, pricing, and review numbers
- Decap CMS config at `/admin/` for non-technical content edits

**Not included — deliberately out of scope for code generation:**
- Blog (`/blog/`) — sitemap slot exists in the header nav, but no articles were part of Phase 5 copywriting yet
- Real photography — every image slot is a labeled placeholder `<div>` with a commented-out `<img>` example showing the expected markup
- Pool Renovation page content — built as a placeholder shell since the specific scope (resurfacing vs. tile/decking vs. full remodel) was never confirmed; see the in-page content note

## Local development

This project needs Node.js installed on your machine (not available in the environment this was built in, so it hasn't been test-run — see "Before you deploy" below).

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`.

## Before you deploy

This code was written directly rather than run through a live build, so **do a local `npm install && npm run build` first** and fix anything that surfaces — Astro is generally forgiving, but this step hasn't been verified in this environment. Also:

1. Update `site` in `astro.config.mjs` from the placeholder to your production domain (or remove the trailing-slash config if you prefer non-trailing-slash URLs).
2. Replace every `[BRACKETED_PLACEHOLDER]` in `src/data/business.json` and across the page copy with real values — search the codebase for `[` to find them all.
3. Drop real photos into `public/images/` and swap the dashed placeholder `<div>` blocks for real `<img>` tags (each placeholder has a commented-out example tag right above or below it showing the expected `src`/`alt` pattern).
4. Wire the `QuoteForm` component to a real submission handler — it currently uses Netlify Forms attributes (`data-netlify="true"`) as a starting point, which works out of the box if you host on Netlify, but needs `action`/handler changes for other hosts.

## Recommended hosting

**Netlify** or **Cloudflare Pages** — both have generous free tiers for a site this size, both handle static hosting well, and Netlify specifically makes the form handling and Decap CMS git-gateway auth close to zero-config.

To deploy on Netlify:
1. Push this project to a GitHub repository.
2. Connect the repo in Netlify's dashboard — it will auto-detect Astro.
3. Point your existing domain (`oceanprimepoolservice.com`) at Netlify via DNS.
4. Enable Netlify Identity + Git Gateway (Site settings → Identity) so `/admin/` works for content editors.

## Editing content later

Once deployed on Netlify with Identity enabled, go to `yourdomain.com/admin/` — this opens the Decap CMS editor where you can update the phone number, hours, pricing, and reviews without touching code. Right now only `business.json` is wired into the CMS config; page copy itself (headlines, paragraphs) still lives in the `.astro` files and would need a developer or an expanded CMS config to make fully editable — worth doing once the remaining pages are built, so the CMS schema only needs to be designed once.

## Redirects from the old site

`public/_redirects` is already included and maps the old site's URLs to the new structure. Netlify reads this automatically on deploy. If you host elsewhere, translate it into your platform's redirect config (nginx rewrite rules, `.htaccess`, etc.).
