/* Website statistics: fixed event names only; never read demo input values. */
(function () {
  "use strict";
  const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function cleanUrl(value, keepCampaign) {
    if (!value) return value;
    try {
      const url = new URL(value, window.location.origin);
      const campaign = new URLSearchParams();
      if (keepCampaign) {
        campaignKeys.forEach((key) => {
          if (url.searchParams.has(key)) campaign.set(key, url.searchParams.get(key).slice(0, 100));
        });
      }
      url.search = campaign.toString();
      url.hash = "";
      return /^[a-z][a-z\d+.-]*:/i.test(value) ? url.href : url.pathname + url.search;
    } catch {
      return "";
    }
  }

  window.lightvesselBeforeSend = function (_type, payload) {
    const result = { ...payload };
    result.url = cleanUrl(payload.url, true);
    result.referrer = cleanUrl(payload.referrer, false);
    delete result.data; // No arbitrary event properties, text, mood selections or identities.
    return result;
  };

  const faqNames = ["FAQ: App purpose", "FAQ: Data storage", "FAQ: Forget memory", "FAQ: Premium"];
  document.querySelectorAll(".faq-list details").forEach((details, index) => {
    details.addEventListener("toggle", () => {
      if (details.open && faqNames[index] && window.umami) {
        try { Promise.resolve(window.umami.track(faqNames[index])).catch(() => {}); }
        catch { /* Statistics must never interfere with the page. */ }
      }
    });
  });
})();
