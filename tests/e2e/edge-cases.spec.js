const { test, expect } = require("@playwright/test");

const { seedCookieConsent } = require("./consent-helper");

async function selectAvailableDate(page) {
  await page.locator('input[name="preferredDate"] + button').click();
  await page.locator('[role="dialog"] button:not([disabled])').nth(10).click();
  await expect(page.locator('input[name="preferredDate"]')).not.toHaveValue("");
}

test.describe("real-world edge cases", () => {
  test.beforeEach(async ({ page }) => {
    await seedCookieConsent(page);
  });

  test("slow network shows loading state then success (contact)", async ({
    page,
  }) => {
    test.setTimeout(60000);

    await page.route("**/api/contact", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    const contactForm = page.locator("form").first();
    await contactForm.getByPlaceholder("Your full name").fill("Slow Net");
    await contactForm
      .getByPlaceholder("name@example.com")
      .fill("slow@example.com");
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, audience, and desired timeline.",
      )
      .fill("Message long enough for validation rules here.");

    await contactForm.getByRole("button", { name: /send message/i }).click();

    await expect(contactForm.getByRole("button", { name: /sending/i })).toBeVisible();
    await expect(
      contactForm.getByText("Your message has been sent successfully."),
    ).toBeVisible({ timeout: 15000 });
  });

  test("slow network shows loading state then success (booking)", async ({
    page,
  }) => {
    test.setTimeout(60000);

    await page.route("**/api/booking", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/booking", { waitUntil: "domcontentloaded" });

    await page.getByPlaceholder("Your name").fill("Slow Booker");
    await page.getByPlaceholder("name@example.com").fill("slow@example.com");
    await page
      .getByPlaceholder("Website design, redesign, brand site...")
      .fill("Website redesign");
    await selectAvailableDate(page);

    await page.getByRole("button", { name: /send booking/i }).click();

    await expect(page.getByRole("button", { name: /sending/i })).toBeVisible();
    await expect(
      page.getByText("Your booking request has been saved successfully."),
    ).toBeVisible({ timeout: 15000 });
  });

  test("rapid booking submits only trigger one API request", async ({
    page,
  }) => {
    let requestCount = 0;

    await page.route("**/api/booking", async (route) => {
      requestCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 400));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/booking", { waitUntil: "domcontentloaded" });

    await page.getByPlaceholder("Your name").fill("Rapid Booker");
    await page.getByPlaceholder("name@example.com").fill("rapid@example.com");
    await page
      .getByPlaceholder("Website design, redesign, brand site...")
      .fill("Website redesign");
    await selectAvailableDate(page);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const submit = buttons.find((button) =>
        /send booking/i.test(button.textContent || ""),
      );
      if (!submit) {
        throw new Error("Submit button not found");
      }
      for (let index = 0; index < 6; index += 1) {
        submit.click();
      }
    });

    await expect(
      page.getByText("Your booking request has been saved successfully."),
    ).toBeVisible();
    expect(requestCount).toBe(1);
  });
});
