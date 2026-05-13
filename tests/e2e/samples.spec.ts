import { test, expect } from '@playwright/test';
import { Sidebar } from './components/Sidebar';
import { SamplesPage } from './pages/SamplesPage';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080/');
});

test.describe('Samples page — view modes', () => {
  test('S-01: Samples loads in grid view by default', async ({ page }) => {
    const sidebar     = new Sidebar(page);
    const samplesPage = new SamplesPage(page);

    await sidebar.navigateToSamples();

    expect(await samplesPage.isGridActive()).toBe(true);
    expect(await samplesPage.isListActive()).toBe(false);
    expect(await samplesPage.isGridVisible()).toBe(true);
  });

  test('S-02: clicking list toggle switches to list view', async ({ page }) => {
    const sidebar     = new Sidebar(page);
    const samplesPage = new SamplesPage(page);

    await sidebar.navigateToSamples();
    await samplesPage.switchToListView();

    expect(await samplesPage.isListActive()).toBe(true);
    expect(await samplesPage.isTableVisible()).toBe(true);
  });

  test('S-03: clicking grid toggle from list view returns to grid', async ({ page }) => {
    const sidebar     = new Sidebar(page);
    const samplesPage = new SamplesPage(page);

    await sidebar.navigateToSamples();
    await samplesPage.switchToListView();
    await samplesPage.switchToGridView();

    expect(await samplesPage.isGridActive()).toBe(true);
    expect(await samplesPage.isGridVisible()).toBe(true);
    expect(await samplesPage.isTableVisible()).toBe(false);
  });
});

test.describe('Samples page — content', () => {
  test('S-04: grid view shows at least one sample card', async ({ page }) => {
    const sidebar     = new Sidebar(page);
    const samplesPage = new SamplesPage(page);

    await sidebar.navigateToSamples();

    const count = await samplesPage.getCardCount();
    expect(count).toBeGreaterThan(0);
  });
});
