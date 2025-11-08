import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
});

test('auto waiting', async ({ page }) => {
  const sucessButton = page.locator('.bg-success')

  // await sucessButton.click() // This waits for 30 seconds (default playwright configuration) to make this test executed

  const text = await sucessButton.textContent(); // This also waits for 30 seconds to retrieve the content of this element

  await sucessButton.waitFor({ state: "attached" })
  const textAll = await sucessButton.allTextContents(); // allTextContents() does NOT wait for the element to show. But we can fix this like e.g above

  expect(text).toContain('Data loaded with AJAX get request.');

  // This waits for 5 seconds to retrieve the information and will fail, however we can change that like so:
  // await expect(sucessButton).toHaveText('Data loaded with AJAX get request.');
  await expect(sucessButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
})

test('alternative waits', async ({ page }) => {
  const sucessButton = page.locator('.bg-success');

  // ____ wait for element
  await page.waitForSelector('.bg-succes');

  // ____ wait for particular response
  await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

  // ____ wait for network calls to be completed ('NOT RECOMMENDED')
  await page.waitForLoadState('networkidle');

  // ____ wait for a specific time ('NOT RECOMMENDED')
  await page.waitForTimeout(5000);

  const text = await sucessButton.textContent();
  expect(text).toContain('Data loaded with AJAX get request.');
})
