import { Page, Locator } from '@playwright/test';

export class LearningPage {
  private readonly root: Locator;
  private readonly guidesSection: Locator;
  private readonly videosSection: Locator;
  private readonly carouselPrev: Locator;
  private readonly carouselNext: Locator;

  constructor(private page: Page) {
    this.root          = page.locator('[data-testid="page-learning"]');
    this.guidesSection = page.locator('[data-testid="guides-section"]');
    this.videosSection = page.locator('[data-testid="videos-section"]');
    this.carouselPrev  = page.locator('[data-testid="carousel-prev"]');
    this.carouselNext  = page.locator('[data-testid="carousel-next"]');
  }

  async isVisible()         { return this.root.isVisible(); }
  async isGuidesVisible()   { return this.guidesSection.isVisible(); }
  async isCarouselVisible() { return this.videosSection.isVisible(); }
  async getGuideCount()     { return this.guidesSection.locator('[data-testid="card-item"]').count(); }
  async getGuideTitle(i: number) {
    return this.guidesSection.locator('[data-testid="card-item"]').nth(i)
      .locator('p').first().textContent();
  }
  async clickNextVideo()   { await this.carouselNext.click(); }
  async clickPrevVideo()   { await this.carouselPrev.click(); }
  isPrevButtonVisible()    { return this.carouselPrev.isVisible(); }
  isNextButtonVisible()    { return this.carouselNext.isVisible(); }
  getCarouselPrev()        { return this.carouselPrev; }
  getCarouselNext()        { return this.carouselNext; }
}
