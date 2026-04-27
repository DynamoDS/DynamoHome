import { Page, Locator } from '@playwright/test';

export class SamplesPage {
  private readonly root: Locator;
  private readonly gridToggle: Locator;
  private readonly listToggle: Locator;
  private readonly samplesGrid: Locator;
  private readonly table: Locator;

  constructor(private page: Page) {
    this.root        = page.locator('[data-testid="page-samples"]');
    this.gridToggle  = page.locator('[data-testid="page-samples"] [data-testid="view-toggle-grid"]');
    this.listToggle  = page.locator('[data-testid="page-samples"] [data-testid="view-toggle-list"]');
    this.samplesGrid = page.locator('[data-testid="samples-grid"]');
    this.table       = page.locator('[data-testid="page-samples"] table');
  }

  async isVisible()        { return this.root.isVisible(); }
  async switchToGridView() { await this.gridToggle.click(); }
  async switchToListView() { await this.listToggle.click(); }
  async isGridActive()     { return (await this.gridToggle.getAttribute('disabled')) !== null; }
  async isListActive()     { return (await this.listToggle.getAttribute('disabled')) !== null; }
  async getCardCount()     { return this.samplesGrid.locator('[data-testid="card-item"]').count(); }
  async isTableVisible()   { return this.table.isVisible(); }
  async isGridVisible()    { return this.samplesGrid.isVisible(); }
}
