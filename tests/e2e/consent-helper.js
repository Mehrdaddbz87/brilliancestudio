/**
 * Seeds cookie-consent storage so E2E runs are not blocked by the banner.
 */
async function seedCookieConsent(page) {
  await page.addInitScript(() => {
    const record = {
      version: 1,
      updatedAt: new Date().toISOString(),
      preferences: {
        functional: false,
        analytics: false,
        marketing: false,
      },
    };
    const serialized = JSON.stringify(record);

    window.localStorage.setItem("brilliance-cookie-consent", serialized);
    document.cookie = `brilliance_cookie_consent=${encodeURIComponent(
      serialized,
    )}; Path=/; SameSite=Lax`;
  });
}

module.exports = { seedCookieConsent };
