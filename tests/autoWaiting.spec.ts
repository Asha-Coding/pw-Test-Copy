import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test('Clicking the triggering button', async ({ page }) => {
  await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click()
})
