const { test, expect } = require("@playwright/test");

test("homepage loads and exposes primary navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Brilliance Studio/i);
  await expect(
    page.getByRole("heading", { name: /what we build with precision/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /all services/i })).toBeVisible();
});
