const { test, expect } = require("@playwright/test");

const { seedCookieConsent } = require("./consent-helper");

const MOBILE_VIEWPORT = { width: 375, height: 812 };

async function selectAvailableDate(page) {
  await page.locator('input[name="preferredDate"] + button').click();
  await page.locator('[role="dialog"] button:not([disabled])').nth(10).click();
  await expect(page.locator('input[name="preferredDate"]')).not.toHaveValue("");
}

test.describe("basic responsiveness (mobile)", () => {
  test.beforeEach(async ({ page }) => {
    await seedCookieConsent(page);
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test("mobile navigation opens menu and reaches Services", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page
      .getByRole("button", { name: /toggle navigation menu/i })
      .click();
    // Mobile drawer nav only (homepage also links cards to /services).
    const servicesLink = page.locator("header nav.flex-col a[href='/services']");
    await expect(servicesLink).toBeVisible({ timeout: 10000 });

    await Promise.all([
      page.waitForURL(/\/services(?:\/)?$/, { timeout: 15000 }),
      servicesLink.click(),
    ]);
  });

  test("mobile navigation opens menu and reaches Booking", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page
      .getByRole("button", { name: /toggle navigation menu/i })
      .click();
    const bookingCta = page
      .getByRole("link", { name: /request project/i })
      .filter({ visible: true });
    await expect(bookingCta).toBeVisible();

    await bookingCta.click();
    await expect(page).toHaveURL(/\/booking$/);
  });

  test("contact form is usable on mobile and submits", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    const contactForm = page.locator("form").first();
    const nameField = contactForm.getByPlaceholder("Your full name");
    const messageField = contactForm.getByPlaceholder(
      "Tell us about your goals, audience, and desired timeline.",
    );
    const submit = contactForm.getByRole("button", { name: /send message/i });

    await expect(nameField).toBeVisible();
    await expect(messageField).toBeVisible();
    await expect(submit).toBeVisible();

    await nameField.fill("Mobile Contact");
    await contactForm
      .getByPlaceholder("name@example.com")
      .fill("mobile@example.com");
    await messageField.fill(
      "We need a premium redesign for our renovation brand this quarter.",
    );
    await submit.click();

    await expect(
      contactForm.getByText("Your message has been sent successfully."),
    ).toBeVisible();
  });

  test("booking form is usable on mobile and submits", async ({ page }) => {
    await page.route("**/api/booking", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/booking", { waitUntil: "domcontentloaded" });

    const nameField = page.getByPlaceholder("Your name");
    const dateTrigger = page.locator('input[name="preferredDate"] + button');
    const submit = page.getByRole("button", { name: /send booking/i });

    await expect(nameField).toBeVisible();
    await expect(dateTrigger).toBeVisible();
    await expect(submit).toBeVisible();

    await nameField.fill("Mobile Booker");
    await page.getByPlaceholder("name@example.com").fill("mobile@example.com");
    await page
      .getByPlaceholder("Website design, redesign, brand site...")
      .fill("Website redesign");
    await selectAvailableDate(page);
    await submit.click();

    await expect(
      page.getByText("Your booking request has been saved successfully."),
    ).toBeVisible();
  });
});
