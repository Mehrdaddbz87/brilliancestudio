const { test, expect } = require("@playwright/test");

const { seedCookieConsent } = require("./consent-helper");

async function selectAvailableDate(page) {
  await page.locator('input[name="preferredDate"] + button').click();
  await page.locator('[role="dialog"] button:not([disabled])').nth(10).click();
  await expect(page.locator('input[name="preferredDate"]')).not.toHaveValue("");
}

test.describe("critical user flows", () => {
  test.beforeEach(async ({ page }) => {
    await seedCookieConsent(page);
  });

  test("booking flow submits successfully", async ({ page }) => {
    await page.route("**/api/booking", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/booking", { waitUntil: "domcontentloaded" });

    await page.getByPlaceholder("Your name").fill("Test Booker");
    await page.getByPlaceholder("name@example.com").fill("booker@example.com");
    await page
      .getByPlaceholder("Website design, redesign, brand site...")
      .fill("Website redesign");
    await selectAvailableDate(page);

    await page.getByRole("button", { name: /send booking/i }).click();

    await expect(
      page.getByText("Your booking request has been saved successfully."),
    ).toBeVisible();
  });

  test("contact flow submits successfully", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    const contactForm = page.locator("form").first();

    await contactForm.getByPlaceholder("Your full name").fill("Test Contact");
    await contactForm
      .getByPlaceholder("name@example.com")
      .fill("contact@example.com");
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, audience, and desired timeline.",
      )
      .fill("We need a premium redesign for our renovation brand this quarter.");

    await contactForm.getByRole("button", { name: /send message/i }).click();

    await expect(
      contactForm.getByText("Your message has been sent successfully."),
    ).toBeVisible();
  });

  test("contact form blocks empty and invalid submissions", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    const contactForm = page.locator("form").first();

    await contactForm.getByRole("button", { name: /send message/i }).click();

    await expect(
      contactForm.getByText("Please correct the highlighted fields and try again."),
    ).toBeVisible();
    await expect(contactForm.getByText("Name is required.")).toBeVisible();
    await expect(contactForm.getByText("Email is required.")).toBeVisible();
    await expect(contactForm.getByText("Message is required.")).toBeVisible();

    await contactForm.getByPlaceholder("Your full name").fill("Test Contact");
    await contactForm.getByPlaceholder("name@example.com").fill("invalid-email");
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, audience, and desired timeline.",
      )
      .fill("This message is long enough to avoid the length error.");

    await contactForm.getByRole("button", { name: /send message/i }).click();

    await expect(
      contactForm.getByText("Please enter a valid email address."),
    ).toBeVisible();
  });

  test("contact form handles API failure gracefully", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Failed to send contact request." }),
      });
    });

    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    const contactForm = page.locator("form").first();

    await contactForm.getByPlaceholder("Your full name").fill("Test Contact");
    await contactForm
      .getByPlaceholder("name@example.com")
      .fill("contact@example.com");
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, audience, and desired timeline.",
      )
      .fill("We need a premium redesign for our renovation brand this quarter.");

    await contactForm.getByRole("button", { name: /send message/i }).click();

    await expect(
      contactForm.getByText("Failed to send contact request."),
    ).toBeVisible();
  });

  test("desktop navigation exposes all main links", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "Services" }).first(),
    ).toHaveAttribute("href", "/services");
    await expect(
      page.getByRole("link", { name: "References" }).first(),
    ).toHaveAttribute("href", "/references");
    await expect(
      page.getByRole("link", { name: "Contact" }).first(),
    ).toHaveAttribute("href", "/contact");
    await expect(
      page.getByRole("link", { name: /request project/i }).first(),
    ).toHaveAttribute("href", "/booking");
  });

  test("mobile hamburger menu opens, closes, and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const menuToggle = page.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    await menuToggle.click();
    await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();

    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole("link", { name: "Contact" }),
    ).not.toBeVisible();
  });

  test("admin page loads Sanity login without CORS or 403 errors", async ({
    page,
  }) => {
    const consoleIssues = [];
    const failedResponses = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        const text = message.text();
        if (/cors|403|blocked by cors policy/i.test(text)) {
          consoleIssues.push(text);
        }
      }
    });

    page.on("response", (response) => {
      if (
        response.status() >= 400 &&
        /sanity\.io|localhost:3000\/admin/i.test(response.url())
      ) {
        failedResponses.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    await expect(page.getByText(/choose login provider/i)).toBeVisible({
      timeout: 30000,
    });
    await expect(page.getByText(/google/i)).toBeVisible();
    expect(consoleIssues).toEqual([]);
    expect(failedResponses).toEqual([]);
  });

  test("booking form blocks empty and invalid submissions", async ({ page }) => {
    await page.goto("/booking", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: /send booking/i }).click();

    await expect(
      page.getByText("Please correct the highlighted fields and try again."),
    ).toBeVisible();
    await expect(page.getByText("Name is required.")).toBeVisible();
    await expect(page.getByText("Email is required.")).toBeVisible();
    await expect(page.getByText("Service is required.")).toBeVisible();
    await expect(page.getByText("Date is required.")).toBeVisible();

    await page.getByPlaceholder("Your name").fill("Test Booker");
    await page.getByPlaceholder("name@example.com").fill("invalid-email");
    await page
      .getByPlaceholder("Website design, redesign, brand site...")
      .fill("Website redesign");
    await selectAvailableDate(page);

    await page.getByRole("button", { name: /send booking/i }).click();

    await expect(
      page.getByText("Please enter a valid email address."),
    ).toBeVisible();
  });

  test("booking form handles API failure gracefully", async ({ page }) => {
    await page.route("**/api/booking", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Failed to save booking request." }),
      });
    });

    await page.goto("/booking", { waitUntil: "domcontentloaded" });

    await page.getByPlaceholder("Your name").fill("Test Booker");
    await page.getByPlaceholder("name@example.com").fill("booker@example.com");
    await page
      .getByPlaceholder("Website design, redesign, brand site...")
      .fill("Website redesign");
    await selectAvailableDate(page);

    await page.getByRole("button", { name: /send booking/i }).click();

    await expect(
      page.getByText("Failed to save booking request."),
    ).toBeVisible();
  });

  test("404 page loads correctly", async ({ page }) => {
    await page.goto("/this-route-does-not-exist", {
      waitUntil: "domcontentloaded",
    });

    await expect(page).toHaveTitle(/404/i);
    await expect(
      page.getByText(/page not found|this page could not be found/i).first(),
    ).toBeVisible();
  });
});
