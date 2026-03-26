import { test, expect } from '@playwright/test';
import { Sidebar } from './components/Sidebar';
import { RecentPage } from './pages/RecentPage';
import { SamplesPage } from './pages/SamplesPage';
import { LearningPage } from './pages/LearningPage';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/');
});

test.describe('Navigation', () => {
    test('N-01: app loads with Recent page active by default', async ({ page }) => {
        const recentPage   = new RecentPage(page);
        const samplesPage  = new SamplesPage(page);
        const learningPage = new LearningPage(page);

        expect(await recentPage.isVisible()).toBe(true);
        expect(await samplesPage.isVisible()).toBe(false);
        expect(await learningPage.isVisible()).toBe(false);
    });

    test('N-02: clicking Samples in sidebar shows Samples page', async ({ page }) => {
        const sidebar     = new Sidebar(page);
        const recentPage  = new RecentPage(page);
        const samplesPage = new SamplesPage(page);

        await sidebar.navigateToSamples();

        expect(await samplesPage.isVisible()).toBe(true);
        expect(await recentPage.isVisible()).toBe(false);
    });

    test('N-03: clicking Learning in sidebar shows Learning page', async ({ page }) => {
        const sidebar      = new Sidebar(page);
        const recentPage   = new RecentPage(page);
        const learningPage = new LearningPage(page);

        await sidebar.navigateToLearning();

        expect(await learningPage.isVisible()).toBe(true);
        expect(await recentPage.isVisible()).toBe(false);
    });

    test('N-04: clicking Recent from Learning returns to Recent page', async ({ page }) => {
        const sidebar      = new Sidebar(page);
        const recentPage   = new RecentPage(page);
        const learningPage = new LearningPage(page);

        await sidebar.navigateToLearning();
        expect(await learningPage.isVisible()).toBe(true);

        await sidebar.navigateToRecent();
        expect(await recentPage.isVisible()).toBe(true);
        expect(await learningPage.isVisible()).toBe(false);
    });
});
