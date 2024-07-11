// src/analytics.js

export function initGA() {
  if (import.meta.env.MODE === "production") {
    const trackingID = import.meta.env.VITE_GA_TRACKING_ID;
    if (trackingID) {
      // Create script element for gtag.js
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingID}`;
      document.head.appendChild(script);

      // Create script element for gtag initialization
      const inlineScript = document.createElement("script");
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${trackingID}');
      `;
      document.head.appendChild(inlineScript);
    }
  }
}
