import { useEffect, useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/router";

import { useCookieConsent } from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

/**
 * Ensures `dataLayer` and `gtag` exist before consent or page-view events are pushed.
 */
function ensureTrackingBootstrap() {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }
}

/**
 * Applies the current consent choices to Google Consent Mode and emits a custom dataLayer event.
 */
function updateConsentMode({
  functional,
  analytics,
  marketing,
}: {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}) {
  if (typeof window === "undefined") {
    return;
  }

  ensureTrackingBootstrap();

  window.gtag?.("consent", "update", {
    functionality_storage: functional ? "granted" : "denied",
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
    security_storage: "granted",
  });

  window.dataLayer.push({
    event: "cookie_consent_updated",
    consent_functional: functional,
    consent_analytics: analytics,
    consent_marketing: marketing,
  });
}

/**
 * Tracks a page view for SPA navigations once analytics consent has been granted.
 */
function trackPageView(url: string) {
  if (typeof window === "undefined") {
    return;
  }

  ensureTrackingBootstrap();

  const pagePath = url || window.location.pathname;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });

  if (GA_ID && window.gtag) {
    window.gtag("config", GA_ID, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
}

/**
 * Loads analytics scripts only when the corresponding consent categories are enabled.
 */
export function Analytics() {
  const router = useRouter();
  const { preferences, isHydrated } = useCookieConsent();
  const hasTrackedInitialPage = useRef(false);
  const analyticsEnabled = Boolean(preferences?.analytics);
  const marketingEnabled = Boolean(preferences?.marketing);
  const functionalEnabled = Boolean(preferences?.functional);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    ensureTrackingBootstrap();

    window.gtag?.("consent", "default", {
      functionality_storage: "denied",
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      security_storage: "granted",
    });
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    updateConsentMode({
      functional: functionalEnabled,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    });
  }, [analyticsEnabled, functionalEnabled, isHydrated, marketingEnabled]);

  useEffect(() => {
    if (!analyticsEnabled) {
      hasTrackedInitialPage.current = false;
      return;
    }

    if (!hasTrackedInitialPage.current) {
      hasTrackedInitialPage.current = true;
      trackPageView(router.asPath);
    }

    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [analyticsEnabled, router.asPath, router.events]);

  return (
    <>
      {(GTM_ID && (analyticsEnabled || marketingEnabled)) || GA_ID ? (
        <Script id="cookie-consent-bootstrap" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          `}
        </Script>
      ) : null}

      {GTM_ID && (analyticsEnabled || marketingEnabled) ? (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      ) : null}

      {GA_ID && analyticsEnabled ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                send_page_view: false
              });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
