import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByPlaceholder("Jane Doe").first().click();

  await page.getByText("Using the Grid").click();

  await page.getByTestId("SignIn").click();

  await page.getByTitle("IoT Dashboard").click();
});

test("locating child elements", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page.locator("nb-card").locator("nb-radio").locator(':text-is("Option 2")').click();

  await page.locator("nb-card").getByRole("button", { name: "Sign in" }).first().click();

  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("locating parent elements", async ({ page }) => {
  await page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" }).click();
  await page.locator("nb-card", { has: page.locator('#inputEmail1') }).getByRole("textbox", { name: "Email" }).click();

  await page.locator("nb-card").filter({ hasText: "Basic Form" }).getByRole("textbox", { name: "Email" }).click();
  await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole("textbox", { name: "Password" }).click();

  // This is an unique example where we have to locate a parent element based on a child element that has specific text.
  // Even thought there are multiple nb-cards with nb-checkbox, only one has the "Sign In" text.
  await page.locator("nb-card").filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign In" }).getByRole("textbox", { name: "Email" }).click();
});

test('Reusing the locators', async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic Form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill('test@test.com');
  await basicForm.getByRole("textbox", { name: "Password" }).fill('Welcome123.Z');
  await basicForm.locator('nb-checkbox').click();
  await basicForm.getByRole('button').click();

  await expect(emailField).toHaveValue('test@test.com');
});

test('extracting values', async ({ page }) => {
  // single test value
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic Form" });
  // Extract this button text
  const buttonText = await basicForm.locator('button').textContent();
  expect(buttonText).toEqual('Submit');

  // all text values
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
  expect(allRadioButtonsLabels).toContain('Option 1');

  // input value
  const emailField = basicForm.getByRole('textbox', { name: "Email" })
  await emailField.fill("test@test.com")
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual("test@test.com");

  const placeholderValue = await emailField.getAttribute('placeholder');
  expect(placeholderValue).toEqual('Email')
});

test('assertions', async ({ page }) => {
  const basicFormButton = page.locator("nb-card").filter({ hasText: "Basic Form" }).locator('button');
  // General assertions
  const value = 5
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual('Submit');

  // Locator Assertion
  await expect(basicFormButton).toHaveText('Submit');

  // Soft Assertion
  // This will continue even if the assertion failed
  await expect.soft(basicFormButton).toHaveText('Submit');
  await basicFormButton.click();
});

// Explanation of getByRole() vs locator()
test("getByRole vs locator", async ({ page }) => {
  // Using getByRole to locate the "Sign in" button inside the first nb-card
  await page.locator("nb-card").first().getByRole("button", { name: "Sign in" }).click();
  // Using locator to locate the same button
  await page.locator("nb-card").first().locator('button:has-text("Sign in")').click();
});
// As we can see both approaches work fine. However, getByRole provides better readability and accessibility compliance.
