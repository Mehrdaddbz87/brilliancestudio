const { test, expect } = require("@playwright/test");

const { seedCookieConsent } = require("./consent-helper");

test.describe("critical user flows", () => {
  test.beforeEach(async ({ page }) => {
    await seedCookieConsent(page);
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
    await page.getByRole("combobox", { name: /choose service/i }).click();
    await page.getByRole("option", { name: "Custom Home Design & Build" }).click();
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, timeline, and what kind of transformation you are planning.",
      )
      .fill("We need a premium redesign for our renovation brand this quarter.");

    await contactForm.getByRole("button", { name: /send message/i }).click();

    await expect(
      page.getByText(/message has been sent/i),
    ).toBeVisible();
  });

  test("contact form reveals and submits a custom service for other", async ({
    page,
  }) => {
    let submittedPayload = null;

    await page.route("**/api/contact", async (route) => {
      submittedPayload = route.request().postDataJSON();
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
    await page.getByRole("combobox", { name: /choose service/i }).click();
    await page.getByRole("option", { name: "Other" }).click();
    await expect(contactForm.getByLabel("Please Specify")).toBeVisible();
    await contactForm
      .getByLabel("Please Specify")
      .fill("Commercial Fit-Out");
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, timeline, and what kind of transformation you are planning.",
      )
      .fill("We need support for a service not covered in the standard list.");

    await contactForm.getByRole("button", { name: /send message/i }).click();

    await expect(
      page.getByText(/message has been sent/i),
    ).toBeVisible();
    expect(submittedPayload).toMatchObject({
      service: "other",
      customService: "Commercial Fit-Out",
    });
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
    await expect(
      contactForm.getByText("Please choose a service."),
    ).toBeVisible();
    await expect(contactForm.getByText("Message is required.")).toBeVisible();

    await contactForm.getByPlaceholder("Your full name").fill("Test Contact");
    await contactForm.getByPlaceholder("name@example.com").fill("invalid-email");
    await page.getByRole("combobox", { name: /choose service/i }).click();
    await page.getByRole("option", { name: "Home Additions" }).click();
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, timeline, and what kind of transformation you are planning.",
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
    await page.getByRole("combobox", { name: /choose service/i }).click();
    await page.getByRole("option", { name: "Bathroom Remodeling" }).click();
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, timeline, and what kind of transformation you are planning.",
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
      page.getByRole("button", { name: "Services" }),
    ).toHaveAttribute("aria-haspopup", "menu");
    await expect(
      page.getByRole("link", { name: "About Us" }).first(),
    ).toHaveAttribute("href", "/about");
    await expect(
      page.getByRole("link", { name: "Portfolio" }).first(),
    ).toHaveAttribute("href", "/portfolio");
    await expect(
      page.getByRole("link", { name: "Contact Us" }).first(),
    ).toHaveAttribute("href", "/contact");
    await expect(
      page.getByRole("link", { name: /request project/i }).first(),
    ).toHaveAttribute("href", "/contact");
  });

  test("services dropdown reveals service categories on hover", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: "Services" }).hover();

    await expect(
      page.getByRole("menu", { name: /services categories/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: /custom home design & build/i }),
    ).toHaveAttribute("href", "/services/custom-home-design-build");
    await expect(
      page.getByRole("menuitem", { name: /basement finishing/i }),
    ).toBeVisible();
  });

  test("mobile hamburger menu opens, closes, and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const menuToggle = page.getByRole("button", {
      name: /toggle navigation menu/i,
    });

    await menuToggle.click();
    await expect(page.getByRole("button", { name: "Services" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact Us" })).toBeVisible();

    await page.getByRole("button", { name: "Services" }).click();
    const servicesCategoryLink = page
      .locator("#mobile-services-menu")
      .getByRole("link", { name: /custom home design & build/i });
    await expect(servicesCategoryLink).toBeVisible();

    await Promise.all([
      page.waitForURL(/\/services\/custom-home-design-build$/, { timeout: 15000 }),
      servicesCategoryLink.click(),
    ]);
  });

  test("service detail page loads from dropdown navigation", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: "Services" }).hover();
    await page
      .getByRole("menuitem", { name: /kitchen remodeling/i })
      .click();

    await expect(page).toHaveURL(/\/services\/kitchen-remodeling$/);
    await expect(
      page.getByRole("heading", {
        name: /kitchen remodeling/i,
        level: 1,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Services" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("about page highlights the active navigation item", async ({ page }) => {
    await page.goto("/about", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(/About Brilliance Studio/i);
    await expect(
      page.getByRole("heading", { name: "About Us", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "About Us" }).first(),
    ).toHaveAttribute("aria-current", "page");
  });

  test("admin page redirects unauthenticated visitors to login", async ({
    page,
  }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/login\?callbackUrl=/);
    await expect(
      page.getByRole("heading", { name: /admin login/i }),
    ).toBeVisible();
  });

  test("404 page loads correctly", async ({ page }) => {
    await page.goto("/this-route-does-not-exist", {
      waitUntil: "domcontentloaded",
    });

    await expect(
      page.getByText(/page not found|this page could not be found/i).first(),
    ).toBeVisible();
  });
});
