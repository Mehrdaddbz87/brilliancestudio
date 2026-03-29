"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export const COOKIE_CONSENT_STORAGE_KEY = "brilliance-cookie-consent";
export const COOKIE_CONSENT_COOKIE_NAME = "brilliance_cookie_consent";
export const COOKIE_CONSENT_UPDATED_EVENT = "brilliance:cookie-consent-updated";
export const COOKIE_CONSENT_OPEN_EVENT = "brilliance:cookie-consent-open";
const COOKIE_CONSENT_VERSION = 1;
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export type CookieConsentPreferences = {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type CookieConsentRecord = {
  version: number;
  updatedAt: string;
  preferences: CookieConsentPreferences;
};

export const defaultCookieConsent: CookieConsentPreferences = {
  functional: false,
  analytics: false,
  marketing: false,
};

/**
 * Guards browser-only consent helpers during server rendering.
 */
function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * Parses a serialized consent record and validates the expected preference shape.
 */
function parseConsentRecord(value: string | null): CookieConsentRecord | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);

    if (
      typeof parsed?.preferences?.functional !== "boolean" ||
      typeof parsed?.preferences?.analytics !== "boolean" ||
      typeof parsed?.preferences?.marketing !== "boolean"
    ) {
      return null;
    }

    return {
      version: Number(parsed.version || COOKIE_CONSENT_VERSION),
      updatedAt: String(parsed.updatedAt || new Date().toISOString()),
      preferences: {
        functional: parsed.preferences.functional,
        analytics: parsed.preferences.analytics,
        marketing: parsed.preferences.marketing,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Builds the stored consent payload with a version and fresh timestamp.
 */
function serializeConsentRecord(
  preferences: CookieConsentPreferences,
): CookieConsentRecord {
  return {
    version: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    preferences,
  };
}

/**
 * Reads the latest saved cookie consent record from local storage.
 */
export function readCookieConsent(): CookieConsentRecord | null {
  if (!isBrowser()) {
    return null;
  }

  return parseConsentRecord(
    window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY),
  );
}

/**
 * Persists cookie consent preferences to storage, cookies, and the in-page event bus.
 */
export function saveCookieConsent(
  preferences: CookieConsentPreferences,
): CookieConsentRecord | null {
  if (!isBrowser()) {
    return null;
  }

  const record = serializeConsentRecord(preferences);
  const serialized = JSON.stringify(record);

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serialized);
  document.cookie =
    `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(serialized)}; ` +
    `Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/; SameSite=Lax`;

  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: record }),
  );

  return record;
}

/**
 * Requests that the cookie banner reopen in preference-editing mode.
 */
export function openCookieConsentPreferences() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
}

/**
 * React hook that exposes the current consent state and a save helper for UI components.
 */
export function useCookieConsent() {
  const [consentRecord, setConsentRecord] = useState<CookieConsentRecord | null>(
    null,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setConsentRecord(readCookieConsent());
    setIsHydrated(true);

    const syncConsent = (event?: Event) => {
      const detailRecord = (event as CustomEvent<CookieConsentRecord>).detail;
      setConsentRecord(detailRecord || readCookieConsent());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_STORAGE_KEY) {
        setConsentRecord(parseConsentRecord(event.newValue));
      }
    };

    window.addEventListener(
      COOKIE_CONSENT_UPDATED_EVENT,
      syncConsent as EventListener,
    );
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        COOKIE_CONSENT_UPDATED_EVENT,
        syncConsent as EventListener,
      );
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const savePreferences = useCallback(
    (preferences: CookieConsentPreferences) => {
      const nextRecord = saveCookieConsent(preferences);
      setConsentRecord(nextRecord);
      return nextRecord;
    },
    [],
  );

  const preferences = useMemo(
    () => consentRecord?.preferences || null,
    [consentRecord],
  );

  return {
    consentRecord,
    preferences,
    isHydrated,
    hasSavedConsent: Boolean(consentRecord),
    savePreferences,
  };
}
