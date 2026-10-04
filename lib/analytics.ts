export type AnalyticsEventName =
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "call_click"
  | "direction_click"
  | "faq_open";

export function trackEvent(name: AnalyticsEventName, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  // Dispatch to configured analytics provider (e.g. Plausible, PostHog, or Google Analytics 4)
  try {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event: ${name}]`, properties || {});
    }

    // Window dataLayer / gtag placeholder integration
    const windowWithAnalytics = window as unknown as {
      dataLayer?: Array<Record<string, unknown>>;
      gtag?: (...args: unknown[]) => void;
    };

    if (Array.isArray(windowWithAnalytics.dataLayer)) {
      windowWithAnalytics.dataLayer.push({
        event: name,
        ...properties,
        timestamp: Date.now(),
      });
    }
  } catch (err) {
    // Fail silently in client runtime
    console.debug("Analytics track error:", err);
  }
}
