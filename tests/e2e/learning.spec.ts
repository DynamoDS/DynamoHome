import { test, expect } from '@playwright/test';
import { Sidebar } from './components/Sidebar';
import { LearningPage } from './pages/LearningPage';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/');
});

test.describe('Learning page — content', () => {
    test('L-01: Learning page shows Interactive Guides section', async ({ page }) => {
        const sidebar      = new Sidebar(page);
        const learningPage = new LearningPage(page);

        await sidebar.navigateToLearning();

        expect(await learningPage.isGuidesVisible()).toBe(true);
    });

    test('L-02: Interactive Guides section shows 3 guide cards', async ({ page }) => {
        const sidebar      = new Sidebar(page);
        const learningPage = new LearningPage(page);

        await sidebar.navigateToLearning();

        const count = await learningPage.getGuideCount();
        expect(count).toBe(3);
    });

    test('L-03: guide card titles are correct', async ({ page }) => {
        const sidebar      = new Sidebar(page);
        const learningPage = new LearningPage(page);

        await sidebar.navigateToLearning();

        expect(await learningPage.getGuideTitle(0)).toContain('User Interactive Tour');
        expect(await learningPage.getGuideTitle(1)).toContain('Getting Started');
        expect(await learningPage.getGuideTitle(2)).toContain('Packages');
    });

    test('L-04: Video Tutorials carousel is present with navigation buttons', async ({ page }) => {
        const sidebar      = new Sidebar(page);
        const learningPage = new LearningPage(page);

        await sidebar.navigateToLearning();

        expect(await learningPage.isCarouselVisible()).toBe(true);
        await expect(learningPage.getCarouselPrev()).toBeVisible();
        await expect(learningPage.getCarouselNext()).toBeVisible();
    });
});

test.describe('Carousel navigation', () => {
    test('C-01: carousel next button is clickable', async ({ page }) => {
        const sidebar      = new Sidebar(page);
        const learningPage = new LearningPage(page);

        await sidebar.navigateToLearning();

        await expect(learningPage.getCarouselNext()).toBeEnabled();
        await learningPage.clickNextVideo();
    });

    test('C-02: carousel prev button is clickable', async ({ page }) => {
        const sidebar      = new Sidebar(page);
        const learningPage = new LearningPage(page);

        await sidebar.navigateToLearning();

        await expect(learningPage.getCarouselPrev()).toBeEnabled();
        await learningPage.clickPrevVideo();
    });
});
