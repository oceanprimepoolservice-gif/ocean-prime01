# Ocean Prime Pool Service — Tracking Plan
## Phase 8 Deliverable

This covers what's already built into the code, and the setup steps that need real accounts (GTM, GA4, Google Ads) before any of it actually reports data.

---

## What's already wired into the code

- **`public/scripts/tracking.js`** — a single site-wide script that listens for clicks and form interactions across all 29 pages (event delegation, so it doesn't need to be added per-page or per-component) and pushes structured events to `window.dataLayer`.
- **GTM container snippet** — in `BaseLayout.astro` head + body, reading the container ID from `business.json`. Currently a placeholder (`[GTM_CONTAINER_ID]`) — the snippet is inert until a real ID is dropped in, but nothing else needs to change once it is.
- **Thank-you page conversion firing** — `src/pages/thank-you/service-request.astro` fires the primary "completed lead" conversion on page load, guarded with `sessionStorage` so a refresh or back-navigation doesn't double-count it.

## Why the thank-you page, not the form's submit event

The form posts natively (via Netlify Forms), which means the browser navigates away before a submit-time analytics call is guaranteed to finish sending — especially on mobile. So `form_submit_attempt` fires as a best-effort signal at submit time, but the **actual conversion** is counted on thank-you page load instead, which is the reliable signal that the submission completed successfully.

---

## Event Tracking Plan

| Event Name | Trigger | Category | Status | Platform Destination |
|---|---|---|---|---|
| `phone_click` | Click on any `tel:` link, site-wide | Contact | **Primary** | GA4 event + Google Ads phone-call conversion |
| `form_submit_success` | Thank-you page view (deduplicated via sessionStorage) | Lead | **Primary** | GA4 event + Google Ads form-submit conversion |
| `form_start` | First field focus on any quote form | Lead | Secondary | GA4 event |
| `form_submit_attempt` | Native form submit event, fires just before navigation | Lead | Secondary (supporting signal only — not counted as the conversion) | GA4 event |
| `cta_click` | Click on any `.btn` element that isn't a phone/email link | Engagement | Secondary | GA4 event |
| `email_click` | Click on any `mailto:` link | Contact | Secondary | GA4 event |
| Confirmed booked appointment | N/A — no scheduling/booking integration exists yet | Lead | Not applicable yet | — |

**Primary conversions** (phone click, completed form) are the two your brief's Section 22 identifies as the ones that should count toward Google Ads' conversion optimization. **Secondary conversions** are useful for understanding engagement and funnel drop-off, but shouldn't be imported as Ads conversions — mixing them in would have Ads optimize toward cheap, low-intent signals like button clicks instead of actual leads.

---

## GTM Setup (manual steps — can't be done from this environment)

Once you have a GTM container:

1. **Create the container**, get the `GTM-XXXXXXX` ID, and replace `[GTM_CONTAINER_ID]` in `src/data/business.json`.
2. **In GTM, create a GA4 Configuration tag** pointing to your GA4 Measurement ID, firing on All Pages.
3. **Create GA4 Event tags** for each row in the table above — trigger type "Custom Event," trigger name matching the `event` value pushed to `dataLayer` (e.g. a trigger firing on custom event `phone_click`).
4. **Create the Google Ads Conversion Tracking tags** for `ads_conversion_phone_click` and `ads_conversion_form_submit` — these two events already push a `send_to` value built from `business.googleAdsConversionId` and the respective label, so once those two fields in `business.json` hold real values, the events carry everything the Ads tag needs.
5. **Preview and publish** the container before going live.

## Google Ads Setup (manual steps)

1. Create two Conversion Actions in Google Ads: "Phone Call" and "Form Submission."
2. Copy each action's Conversion ID and Conversion Label into `business.json` (`googleAdsConversionId`, `googleAdsPhoneCallLabel`, `googleAdsFormSubmitLabel`).
3. Consider enabling **Dynamic Number Insertion** (per your brief's Section 22) if you want to distinguish paid-search calls from organic ones at the phone-tracking level — that requires a call-tracking provider (e.g. CallRail) layered on top of this, not something built into the current code.

## Google Search Console

Separate from GTM/GA4 — add the verification meta tag value to `src/components/SEO.astro` (`google-site-verification`) once the property is created, then submit the sitemap at `/sitemap-index.xml`.
