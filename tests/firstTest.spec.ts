import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.locator("nb-select[status='primary'].appearance-outline.size-medium.status-primary.shape-rectangle.nb-transition").click();
  await page.locator("nb-option[ng-reflect-value='cosmic']#nb-option-8.nb-transition.ng-star-inserted").click();
});

test.describe("Charts", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts", { exact: true }).click();
  });

  test("Go to ECharts", async ({ page }) => {
    await page.getByText("Echarts").click();
  });
});

test.describe("Forms", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Fill Email", async ({ page }) => {
    await page.locator('input[placeholder="Email"]#inputEmail1.input-full-width').fill("test@gmail.com");
  });
});

test.describe("Dialogs Names", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays", { exact: true }).click();
    await page.getByRole('link', { name: 'Dialog' }).click();
  });

  test("Fill Dialog Names", async ({ page }) => {
    await page.locator("button:has-text('Enter Name').appearance-filled.size-medium.shape-rectangle.status-basic.nb-transition").click();
    await page.locator("input[placeholder='Name'].size-medium.status-basic.shape-rectangle.nb-transition").fill("Bob Smith");
    await page.locator("button:has-text('Submit').status-success.appearance-filled.size-medium.shape-rectangle.nb-transition").click();
  });
});

// Hello from Windows!

