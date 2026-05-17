const { test, expect } = require("@playwright/test");

const { seedCookieConsent } = require("./consent-helper");

const MOBILE_VIEWPORT = { width: 375, height: 812 };

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
    const servicesToggle = page.getByRole("button", { name: "Services" });
    await expect(servicesToggle).toBeVisible({ timeout: 10000 });

    await Promise.all([
      page.waitForURL(/\/services\/custom-home-design-build$/, { timeout: 15000 }),
      servicesToggle.click().then(() =>
        page
          .locator("#mobile-services-menu")
          .getByRole("link", { name: /custom home design & build/i })
          .click(),
      ),
    ]);
  });

  test("mobile navigation opens menu and reaches Contact Us", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page
      .getByRole("button", { name: /toggle navigation menu/i })
      .click();
    const contactCta = page
      .getByRole("link", { name: /request project/i })
      .filter({ visible: true });
    await expect(contactCta).toBeVisible();

    await contactCta.click();
    await expect(page).toHaveURL(/\/contact$/);
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
      "Tell us about your goals, timeline, and what kind of transformation you are planning.",
    );
    const submit = contactForm.getByRole("button", { name: /send message/i });

    await expect(nameField).toBeVisible();
    await expect(messageField).toBeVisible();
    await expect(submit).toBeVisible();

    await nameField.fill("Mobile Contact");
    await contactForm
      .getByPlaceholder("name@example.com")
      .fill("mobile@example.com");
    await page.getByRole("combobox", { name: /choose service/i }).click();
    await page.getByRole("option", { name: "Kitchen Remodeling" }).click();
    await messageField.fill(
      "We need a premium redesign for our renovation brand this quarter.",
    );
    await submit.click();

    await expect(
      page.getByText(/message has been sent/i),
    ).toBeVisible();
  });

  test("contact form service dropdown is usable on mobile", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    const combobox = page.getByRole("combobox", { name: /choose service/i });

    await expect(combobox).toBeVisible();
    await combobox.click();
    await page.getByRole("option", { name: "Basement Finishing" }).click();
    await expect(combobox).toContainText("Basement Finishing");
  });
});
