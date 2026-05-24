"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/button";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  defaultCookieConsent,
  type CookieConsentPreferences,
  useCookieConsent,
} from "@/lib/cookie-consent";

type ConsentToggleProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

/**
 * Switch-style control used inside the cookie preference panel.
 */
function ConsentToggle({
  title,
  description,
  checked,
  onChange,
}: ConsentToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex w-full items-start justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition hover:border-accent/40 hover:bg-white/[0.05]"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-text">
          {title}
        </p>
        <p className="mt-2 text-sm leading-6 text-text/70">{description}</p>
      </div>
      <span
        className={`mt-1 inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full border transition ${
          checked
            ? "border-accent bg-accent/90"
            : "border-white/15 bg-white/10"
        }`}
      >
        <span
          className={`mx-1 block h-5 w-5 rounded-full bg-background transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

/**
 * Presents the cookie consent banner and lets visitors accept, reject, or customize categories.
 */
export function CookieConsentBanner() {
  const { preferences, hasSavedConsent, isHydrated, savePreferences } =
    useCookieConsent();
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draftPreferences, setDraftPreferences] =
    useState<CookieConsentPreferences>(defaultCookieConsent);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    setDraftPreferences(preferences || defaultCookieConsent);
    setIsOpen(!hasSavedConsent);
  }, [hasSavedConsent, isHydrated, preferences]);

  useEffect(() => {
    const handleOpen = () => {
      setDraftPreferences(preferences || defaultCookieConsent);
      setIsOpen(true);
      setShowPreferences(true);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen);
    };
  }, [preferences]);

  const canSave = useMemo(
    () =>
      draftPreferences.functional !== (preferences?.functional || false) ||
      draftPreferences.analytics !== (preferences?.analytics || false) ||
      draftPreferences.marketing !== (preferences?.marketing || false) ||
      !hasSavedConsent,
    [draftPreferences, hasSavedConsent, preferences],
  );

  useEffect(() => {
    if (!isOpen) {
      document.body.style.paddingBottom = "";
      return;
    }
    document.body.style.paddingBottom = showPreferences ? "360px" : "72px";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [isOpen, showPreferences]);

  if (!isHydrated || !isOpen) {
    return null;
  }

  const closeBanner = () => {
    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      functional: true,
      analytics: true,
      marketing: true,
    });
    closeBanner();
  };

  const handleRejectOptional = () => {
    savePreferences(defaultCookieConsent);
    closeBanner();
  };

  const handleSavePreferences = () => {
    savePreferences(draftPreferences);
    closeBanner();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70]">
      {/* ── Slim banner (default) ── */}
      {!showPreferences ? (
        <div className="border-t border-accent/20 bg-black/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-6 sm:px-6 lg:px-8">
            {/* Left — label + text */}
            <div className="flex min-w-0 flex-1 items-baseline gap-3">
              <span className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-accent">
                Cookie Consent
              </span>
              <p className="min-w-0 text-xs leading-relaxed text-text/55">
                We use optional cookies to improve your experience. You can accept all or manage your preferences.
              </p>
            </div>
            {/* Right — actions */}
            <div className="flex shrink-0 items-center gap-4">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-xs text-text/45 underline-offset-2 transition hover:text-accent hover:underline"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={handleRejectOptional}
                className="inline-flex h-8 items-center rounded-full border border-white/15 bg-white/5 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-text/70 transition hover:border-white/30 hover:text-text"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex h-8 items-center rounded-full border border-accent bg-accent px-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-transparent hover:text-accent"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ── Preferences panel (customize view) ── */}
      {showPreferences ? (
        <div className="border-t border-accent/20 bg-black/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mt-0 grid gap-4">
            <div className="rounded-[1.5rem] border border-accent/20 bg-accent/[0.06] px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                Strictly Necessary
              </p>
              <p className="mt-2 text-sm leading-6 text-text/70">
                Required for security, navigation, and your saved consent
                choices. These are always active.
              </p>
            </div>

            <ConsentToggle
              title="Functional Cookies"
              description="Remember experience preferences and support non-essential site features."
              checked={draftPreferences.functional}
              onChange={() =>
                setDraftPreferences((current) => ({
                  ...current,
                  functional: !current.functional,
                }))
              }
            />

            <ConsentToggle
              title="Analytics Cookies"
              description="Measure visits, page views, and engagement so we can improve site performance."
              checked={draftPreferences.analytics}
              onChange={() =>
                setDraftPreferences((current) => ({
                  ...current,
                  analytics: !current.analytics,
                }))
              }
            />

            <ConsentToggle
              title="Marketing Cookies"
              description="Support advertising measurement, campaign attribution, and remarketing tags."
              checked={draftPreferences.marketing}
              onChange={() =>
                setDraftPreferences((current) => ({
                  ...current,
                  marketing: !current.marketing,
                }))
              }
            />

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                onClick={handleSavePreferences}
                className={!canSave ? "opacity-80" : ""}
              >
                Save preferences
              </Button>
              <Button type="button" variant="ghost" onClick={handleAcceptAll}>
                Accept all
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleRejectOptional}
              >
                Reject optional
              </Button>
              {hasSavedConsent ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={closeBanner}
                >
                  Close
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        </div>
      ) : null}

    </div>
  );
}
