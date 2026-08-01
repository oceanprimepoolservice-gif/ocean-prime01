# Ocean Prime Pool Service — Launch Checklist
## Phase 10 Deliverable

---

## PRE-LAUNCH CHECKLIST

### 1. Content — replace every placeholder before going live

A full scan of the codebase found **44 remaining placeholders**. None of them block development or testing, but every one should be resolved before this goes live — a `[Needs confirmation]` visible on a real page reads as broken to a visitor.

**Business config (`src/data/business.json`) — 10 items:**
- `[BUSINESS_EMAIL]`, `[BUSINESS_HOURS]`
- `[GOOGLE_REVIEW_RATING]`, `[GOOGLE_REVIEW_COUNT]`, `[GOOGLE_BUSINESS_PROFILE_URL]`, `[FACEBOOK_URL]`
- `[GTM_CONTAINER_ID]`, `[GOOGLE_ADS_CONVERSION_ID]`, `[GOOGLE_ADS_PHONE_CALL_CONVERSION_LABEL]`, `[GOOGLE_ADS_FORM_SUBMIT_CONVERSION_LABEL]`

**Search verification (`src/components/SEO.astro`) — 2 items:**
- `[GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE]`, `[BING_WEBMASTER_VERIFICATION_CODE]`

**Page content — 30 items across 18 pages**, mostly FAQ answers pending real policy details: brand names serviced (pump/heater/salt/automation pages), typical response times (pump repair, equipment repair, heater install), chemicals-included policy (weekly service, plans, homepage FAQ), plan upgrade/downgrade and contract terms (Service Plans, Terms), renovation timeline/permits/usability (Pool Renovation), LED conversion (Pool Light Repair), one-time cleaning availability (Pool Cleaning), seasonal reduced-frequency plans (Seasonal Care), green cleanup duration/swim-ready timeline (Green Pool Cleanup). Full list with exact file/line locations available on request — every one is tagged `[Needs confirmation — ...]` so they're easy to find with a search for `[` across the project.

**Legal pages — 2 items:** `[DATE]` on both Privacy Policy and Terms & Conditions (last-updated date), plus both pages need actual attorney review — they're template drafts, flagged as such in the pages themselves.

**Real assets:**
- Photos — every image slot is a labeled placeholder `<div>` with a commented example `<img>` tag showing the expected markup
- `public/apple-touch-icon.png` — currently a plain placeholder, worth replacing with a real icon
- Review excerpts — Reviews page and homepage social proof section, pending your permission on which reviews to publish

### 2. Domain & hosting
- [ ] Transfer `oceanprimepoolservice.com` off Durable to a standard registrar (Cloudflare/Namecheap/Porkbun) — cuts the $110/yr cost with zero SEO impact since the domain itself isn't changing
- [ ] Create Netlify (or Cloudflare Pages) account, connect the GitHub repo
- [ ] Point DNS at the new host
- [ ] Confirm SSL/HTTPS is active (automatic on both platforms)
- [ ] Enable Netlify Identity + Git Gateway so `/admin/` (Decap CMS) works

### 3. Tracking accounts
- [ ] Create GTM container → drop the real ID into `business.json`
- [ ] Create GA4 property → configure inside GTM per `TRACKING-PLAN.md`
- [ ] Create the two Google Ads Conversion Actions (phone call, form submission) → drop IDs/labels into `business.json`
- [ ] Verify Search Console + Bing Webmaster property → drop verification codes into `SEO.astro`
- [ ] Submit sitemap (`/sitemap-index.xml`) to both

### 4. Local build verification
- [ ] Run `npm install && npm run build` locally — this hasn't been possible in the environment this was built in, so it's the first real test the code gets
- [ ] Fix anything the build surfaces
- [ ] Run `npm run preview` and click through all 29 pages

### 5. Pre-launch testing
- [ ] Real device testing — mobile, tablet, desktop, at least 2 browsers
- [ ] Submit the quote form end-to-end — confirm it reaches you, confirm the thank-you page redirect works, confirm the conversion fires once (not on refresh)
- [ ] Tap-to-call on an actual phone
- [ ] Run Google's Rich Results Test against a few key pages (home, a service page, a location page)
- [ ] Run PageSpeed Insights / Lighthouse — check against the targets in the original plan doc (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1)
- [ ] Confirm the `_redirects` file works — spot-check a few old URLs actually redirect
- [ ] Confirm 404 page displays correctly for a broken URL

### 6. Business & legal
- [ ] Privacy Policy and Terms & Conditions reviewed by an attorney
- [ ] License number and insurance statement confirmed and accurate
- [ ] Update Google Business Profile's website field once live (no other GBP data needs to move, since the domain itself isn't changing)

---

## POST-LAUNCH MONITORING (first 30 days)

### Week 1
- [ ] Confirm Search Console shows the site as indexed, no crawl errors
- [ ] Confirm GA4 is receiving real traffic and events (spot-check `phone_click` and `form_submit_success` against actual inquiries)
- [ ] Confirm Google Ads conversions are recording (if campaigns are live) and match real leads — don't trust the count blindly, call a few leads and verify they're genuine
- [ ] Check that the sitemap was picked up in Search Console's Sitemaps report

### Weeks 2–4
- [ ] Monitor Search Console's Coverage report for indexing issues on the new URLs
- [ ] Check Core Web Vitals report in Search Console (needs real traffic to populate — won't show data in week 1)
- [ ] Watch for 404s in analytics that might mean a missed redirect
- [ ] Start the post-service review request habit (text or email after each visit) — this is the compounding local-SEO move from the original strategy doc, worth starting on day one rather than "eventually"
- [ ] Confirm citation consistency (Yelp, Angi, BBB, etc.) — same domain, so these don't need updating, but worth a pass to confirm NAP consistency now that the new site is live

### 30-day check-in
- [ ] Review which pages are getting organic traffic vs. which aren't — decide if any location or repair pages need content strengthening
- [ ] Review Ads conversion cost-per-lead against the two conversion types (phone vs. form) — the tracking plan separates them specifically so this comparison is possible
- [ ] Revisit the placeholder list above — anything still unresolved a month in should get prioritized
