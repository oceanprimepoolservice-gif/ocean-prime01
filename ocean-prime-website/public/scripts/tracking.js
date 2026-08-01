// Ocean Prime Pool Service — site-wide event tracking
// Pushes to window.dataLayer for Google Tag Manager to pick up. GTM itself
// (container ID, tags, triggers) is configured in the GTM UI — this script
// only emits the events; see the Phase 8 tracking plan doc for the exact
// GTM trigger/tag setup each event name expects.

window.dataLayer = window.dataLayer || [];

function pushEvent(eventName, params = {}) {
  window.dataLayer.push({ event: eventName, ...params });
}

// --- Phone, email, and CTA clicks (event delegation — covers every link
// site-wide without needing per-component tracking code) ---------------
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href') || '';

  if (href.startsWith('tel:')) {
    pushEvent('phone_click', {
      event_category: 'contact',
      link_url: href,
      page_path: window.location.pathname,
    });

    // Google Ads phone-call conversion — inert until real IDs are in place.
    const config = window.OCEAN_PRIME_CONFIG || {};
    if (config.conversionId && !config.conversionId.startsWith('[') && config.phoneLabel && !config.phoneLabel.startsWith('[')) {
      pushEvent('ads_conversion_phone_click', {
        send_to: `${config.conversionId}/${config.phoneLabel}`,
      });
    }
    return;
  }

  if (href.startsWith('mailto:')) {
    pushEvent('email_click', {
      event_category: 'contact',
      link_url: href,
      page_path: window.location.pathname,
    });
    return;
  }

  // Any styled button that isn't a phone/email link counts as a CTA click.
  // Label defaults to the button's visible text so this works automatically
  // across all 29 pages without needing a data attribute on every button.
  if (link.classList.contains('btn')) {
    pushEvent('cta_click', {
      event_category: 'engagement',
      cta_label: link.textContent.trim(),
      cta_href: href,
      page_path: window.location.pathname,
    });
  }
});

// --- Form start (fires once per form, on first field interaction) ------
document.addEventListener(
  'focusin',
  (e) => {
    const form = e.target.closest('form[name="quote-request"]');
    if (!form || form.dataset.startTracked) return;
    form.dataset.startTracked = 'true';
    pushEvent('form_start', {
      event_category: 'lead',
      form_variant: form.querySelector('[name="equipment"]') ? 'repair' : 'standard',
      page_path: window.location.pathname,
    });
  },
  true
);

// --- Form submit attempt (best-effort — fires before the browser
// navigates away on a native form POST; the reliable signal for counting
// an actual completed lead is the thank-you page view, handled separately) --
document.addEventListener('submit', (e) => {
  const form = e.target.closest('form[name="quote-request"]');
  if (!form) return;
  pushEvent('form_submit_attempt', {
    event_category: 'lead',
    form_variant: form.querySelector('[name="equipment"]') ? 'repair' : 'standard',
    page_path: window.location.pathname,
  });
});
