import { Page, Locator } from '@playwright/test';

export class Sidebar {
    private readonly navRecent: Locator;
    private readonly navSamples: Locator;
    private readonly navLearning: Locator;
    private readonly openDropdownToggle: Locator;
    private readonly newDropdownToggle: Locator;

    constructor(private page: Page) {
        this.navRecent          = page.locator('[data-testid="nav-recent"]');
        this.navSamples         = page.locator('[data-testid="nav-samples"]');
        this.navLearning        = page.locator('[data-testid="nav-learning"]');
        this.openDropdownToggle = page.locator('[data-testid="openDropdown-toggle"]');
        this.newDropdownToggle  = page.locator('[data-testid="newDropdown-toggle"]');
    }

    async navigateToRecent()   { await this.navRecent.click(); }
    async navigateToSamples()  { await this.navSamples.click(); }
    async navigateToLearning() { await this.navLearning.click(); }
    async openOpenDropdown()   { await this.openDropdownToggle.click(); }
    async openNewDropdown()    { await this.newDropdownToggle.click(); }

    getOpenOption(index: number)  { return this.page.locator(`#openDropdown-${index}`); }
    getNewOption(index: number)   { return this.page.locator(`#newDropdown-${index}`); }

    getOpenDropdownOptions() { return this.page.locator('[data-testid="openDropdown-dropdown"] .dropdown-options'); }
    getNewDropdownOptions()  { return this.page.locator('[data-testid="newDropdown-dropdown"] .dropdown-options'); }
}
