import { Page, Locator } from '@playwright/test';

export class RecentPage {
  private readonly root: Locator;
  private readonly gridToggle: Locator;
  private readonly listToggle: Locator;
  private readonly graphGrid: Locator;
  private readonly table: Locator;

  constructor(private page: Page) {
    this.root        = page.locator('[data-testid="page-recent"]');
    this.gridToggle  = page.locator('[data-testid="page-recent"] [data-testid="view-toggle-grid"]');
    this.listToggle  = page.locator('[data-testid="page-recent"] [data-testid="view-toggle-list"]');
    this.graphGrid   = page.locator('[data-testid="graph-grid"]');
    this.table       = page.locator('[data-testid="page-recent"] table');
  }

  async isVisible()        { return this.root.isVisible(); }
  async switchToGridView() { await this.gridToggle.click(); }
  async switchToListView() { await this.listToggle.click(); }
  async isGridActive()     { return (await this.gridToggle.getAttribute('disabled')) !== null; }
  async isListActive()     { return (await this.listToggle.getAttribute('disabled')) !== null; }
  async getCardCount()     { return this.graphGrid.locator('[data-testid="card-item"]').count(); }
  async isTableVisible()   { return this.table.isVisible(); }
  async isGridVisible()    { return this.graphGrid.isVisible(); }
  getTableHeaders()        { return this.table.locator('th'); }
  getFirstCardTitle()      { return this.graphGrid.locator('[data-testid="card-item"]').first().locator('p').first(); }
}
