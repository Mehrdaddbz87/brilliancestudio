const { chromium } = require("playwright");

async function collectState(page) {
  return page.evaluate(() => ({
    localStorage: window.localStorage.getItem("brilliance-cookie-consent"),
    cookie: document.cookie,
    bannerVisible: document.body.textContent.includes("Cookie Consent"),
  }));
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  const preConsentRequests = [];
  const preConsentPage = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });
  preConsentPage.on("request", (request) => {
    if (
      request.url().includes("googletagmanager.com") ||
      request.url().includes("google-analytics.com")
    ) {
      preConsentRequests.push(request.url());
    }
  });

  await preConsentPage.goto("http://localhost:3001", { waitUntil: "networkidle" });
  await preConsentPage.waitForTimeout(700);
  const preConsentState = await collectState(preConsentPage);

  const acceptRequests = [];
  const acceptPage = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });
  acceptPage.on("request", (request) => {
    if (
      request.url().includes("googletagmanager.com") ||
      request.url().includes("google-analytics.com")
    ) {
      acceptRequests.push(request.url());
    }
  });

  await acceptPage.goto("http://localhost:3001", { waitUntil: "networkidle" });
  await acceptPage.getByRole("button", { name: /accept all/i }).click();
  await acceptPage.waitForTimeout(1200);
  const acceptedState = await collectState(acceptPage);

  await acceptPage.getByRole("button", { name: /cookie settings/i }).click();
  await acceptPage.waitForTimeout(300);
  const reopenVisible = await acceptPage.locator("text=Control how your visit is measured.").count();

  const rejectPage = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });
  rejectPage.on("request", () => {});
  await rejectPage.goto("http://localhost:3001", { waitUntil: "networkidle" });
  await rejectPage.getByRole("button", { name: /reject optional/i }).click();
  await rejectPage.waitForTimeout(400);
  const rejectedState = await collectState(rejectPage);

  await browser.close();

  process.stdout.write(
    `${JSON.stringify(
      {
        preConsent: {
          requestCount: preConsentRequests.length,
          state: preConsentState,
        },
        acceptAll: {
          requestCount: acceptRequests.length,
          state: acceptedState,
          reopenVisible,
        },
        rejectOptional: rejectedState,
      },
      null,
      2,
    )}\n`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
