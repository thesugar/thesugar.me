/* eslint @typescript-eslint/camelcase: 0 */
// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/lib/gtag.js
export const GA_TRACKING_ID = 'UA-171514129-1'

declare global {
  interface Window {
    gtag: any
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// https://github.com/vercel/next.js/pull/6787
export const pageview = (path: string) => {
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: path,
      anonymize_ip: true,
    })
  }
}