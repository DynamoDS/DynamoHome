import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {

  test('app', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    const screenBackground = page.locator('#homeContainer');
    expect(screenBackground).toBeVisible;
  });

});
