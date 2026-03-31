const { test, expect } = require("@playwright/test");

const { seedCookieConsent } = require("./consent-helper");

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
    await contactForm.getByLabel("Choose Service").selectOption({
      label: "Custom Home Design & Build",
    });
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, timeline, and what kind of transformation you are planning.",
      )
      .fill("Message long enough for validation rules here.");

    await contactForm.getByRole("button", { name: /send message/i }).click();

    await expect(contactForm.getByRole("button", { name: /sending/i })).toBeVisible();
    await expect(
      contactForm.getByText("Your message has been sent successfully."),
    ).toBeVisible({ timeout: 15000 });
  });

  test("rapid contact submits only trigger one API request", async ({
    page,
  }) => {
    let requestCount = 0;

    await page.route("**/api/contact", async (route) => {
      requestCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 400));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    const contactForm = page.locator("form").first();
    await contactForm.getByPlaceholder("Your full name").fill("Rapid Contact");
    await contactForm
      .getByPlaceholder("name@example.com")
      .fill("rapid@example.com");
    await contactForm.getByLabel("Choose Service").selectOption({
      label: "Interior & Exterior Design",
    });
    await contactForm
      .getByPlaceholder(
        "Tell us about your goals, timeline, and what kind of transformation you are planning.",
      )
      .fill("This message is long enough to satisfy the validation rules.");

    await page.evaluate(() => {
      const submit = Array.from(document.querySelectorAll("button")).find(
        (button) => /send message/i.test(button.textContent || ""),
      );
      if (!submit) {
        throw new Error("Submit button not found");
      }
      for (let index = 0; index < 6; index += 1) {
        submit.click();
      }
    });

    await expect(
      contactForm.getByText("Your message has been sent successfully."),
    ).toBeVisible();
    expect(requestCount).toBe(1);
  });
});
