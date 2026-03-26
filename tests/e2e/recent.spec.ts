import { test, expect } from '@playwright/test';
import { RecentPage } from './pages/RecentPage';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/');
});

test.describe('Recent page — view modes', () => {
    test('R-01: Recent loads in grid view by default', async ({ page }) => {
        const recentPage = new RecentPage(page);

        expect(await recentPage.isGridActive()).toBe(true);
        expect(await recentPage.isListActive()).toBe(false);
        expect(await recentPage.isGridVisible()).toBe(true);
        expect(await recentPage.isTableVisible()).toBe(false);
    });

    test('R-02: clicking list toggle switches to list view', async ({ page }) => {
        const recentPage = new RecentPage(page);

        await recentPage.switchToListView();

        expect(await recentPage.isListActive()).toBe(true);
        expect(await recentPage.isGridActive()).toBe(false);
        expect(await recentPage.isTableVisible()).toBe(true);
    });

    test('R-03: list view table has correct column headers', async ({ page }) => {
        const recentPage = new RecentPage(page);

        await recentPage.switchToListView();

        const headers = recentPage.getTableHeaders();
        await expect(headers.nth(0)).toContainText('Title');
        await expect(headers.nth(1)).toContainText('Author');
        await expect(headers.nth(2)).toContainText('Date Modified');
        await expect(headers.nth(3)).toContainText('Location');
    });

    test('R-04: clicking grid toggle from list view returns to grid', async ({ page }) => {
        const recentPage = new RecentPage(page);

        await recentPage.switchToListView();
        await recentPage.switchToGridView();

        expect(await recentPage.isGridActive()).toBe(true);
        expect(await recentPage.isGridVisible()).toBe(true);
        expect(await recentPage.isTableVisible()).toBe(false);
    });
});

test.describe('Recent page — content', () => {
    test('R-05: grid view shows at least one graph card', async ({ page }) => {
        const recentPage = new RecentPage(page);

        const count = await recentPage.getCardCount();
        expect(count).toBeGreaterThan(0);
    });

    test('R-06: graph cards render a non-empty title', async ({ page }) => {
        const recentPage = new RecentPage(page);

        await expect(recentPage.getFirstCardTitle()).not.toBeEmpty();
    });
});
