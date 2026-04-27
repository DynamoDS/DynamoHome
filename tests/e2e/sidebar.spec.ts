import { test, expect } from '@playwright/test';
import { Sidebar } from './components/Sidebar';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080/');
});

test.describe('Sidebar dropdowns', () => {
  test('D-01: Open dropdown shows 3 options', async ({ page }) => {
    const sidebar = new Sidebar(page);

    await sidebar.openOpenDropdown();

    await expect(sidebar.getOpenOption(0)).toBeVisible();
    await expect(sidebar.getOpenOption(1)).toBeVisible();
    await expect(sidebar.getOpenOption(2)).toBeVisible();
    await expect(sidebar.getOpenOption(0)).toContainText('Open File');
    await expect(sidebar.getOpenOption(1)).toContainText('Open Template');
    await expect(sidebar.getOpenOption(2)).toContainText('Backup Locations');
  });

  test('D-02: selecting an Open dropdown option closes the dropdown', async ({ page }) => {
    const sidebar = new Sidebar(page);

    await sidebar.openOpenDropdown();
    await expect(sidebar.getOpenOption(0)).toBeVisible();

    await sidebar.getOpenOption(0).click();

    await expect(sidebar.getOpenOption(0)).not.toBeVisible();
  });

  test('D-03: New dropdown shows 2 options', async ({ page }) => {
    const sidebar = new Sidebar(page);

    await sidebar.openNewDropdown();

    await expect(sidebar.getNewOption(0)).toBeVisible();
    await expect(sidebar.getNewOption(1)).toBeVisible();
    await expect(sidebar.getNewOption(0)).toContainText('Workspace');
    await expect(sidebar.getNewOption(1)).toContainText('Custom Node');
  });
});
