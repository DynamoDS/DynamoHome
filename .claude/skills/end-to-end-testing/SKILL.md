# End-to-End Testing – DynamoHome

## Playwright configuration

- **Config file**: `playwright.config.js` (`testDir: './tests/e2e'`)
- **Browser**: Chromium only (Desktop Chrome profile)
- **Base URL**: `http://localhost:8080` (dev server must be running)
- **Timeouts**: 30s per test, 5s for expect assertions
- **Retries**: 2 on CI, 0 locally
- **Run tests**: `npm run test:e2e` (targets `tests/e2e/e2e.test.ts`)
- **Prerequisite**: `npm run start` must be running (or configure the `webServer` in config which auto-starts it)

## Required folder structure

```
tests/
  e2e/
    e2e.test.ts              # Test orchestration only — NO selectors, NO page.locator()
    pages/
      RecentPage.ts          # Page class for Recent files page
      SamplesPage.ts         # Page class for Samples page
      LearningPage.ts        # Page class for Learning page
    components/
      Sidebar.ts             # Sidebar navigation component class
      GraphTable.ts          # Table component class (used by Recent + Samples)
      Carousel.ts            # Carousel component class (used by Learning)
      CardItem.ts            # Grid card component class
  unit/
    App.test.tsx             # Unit tests — separate from e2e
  jest.setup.ts              # Jest setup (not used by Playwright)
  __mocks__/                 # Jest mocks (not used by Playwright)
```

## Page Object Model — mandatory pattern

### Page class

```typescript
// tests/e2e/pages/RecentPage.ts
import { Page, Locator } from '@playwright/test';

export class RecentPage {
  private readonly gridViewToggle: Locator;
  private readonly listViewToggle: Locator;
  private readonly graphCards: Locator;

  constructor(private page: Page) {
    this.gridViewToggle = page.locator('[data-testid="grid-view-toggle"]');
    this.listViewToggle = page.locator('[data-testid="list-view-toggle"]');
    this.graphCards = page.locator('[data-testid="graph-card"]');
  }

  async switchToGridView(): Promise<void> {
    await this.gridViewToggle.click();
  }

  async switchToListView(): Promise<void> {
    await this.listViewToggle.click();
  }

  async getGraphCount(): Promise<number> {
    return this.graphCards.count();
  }

  async openGraphByName(name: string): Promise<void> {
    await this.graphCards.filter({ hasText: name }).dblclick();
  }
}
```

### Test file

```typescript
// tests/e2e/e2e.test.ts
import { test, expect } from '@playwright/test';
import { RecentPage } from './pages/RecentPage';
import { Sidebar } from './components/Sidebar';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
});

test('recent page shows graphs in grid view by default', async ({ page }) => {
  const sidebar = new Sidebar(page);
  const recentPage = new RecentPage(page);

  await sidebar.navigateToRecent();
  const count = await recentPage.getGraphCount();
  expect(count).toBeGreaterThan(0);
});

test('recent page switches to list view', async ({ page }) => {
  const recentPage = new RecentPage(page);
  await recentPage.switchToListView();
  const isTableVisible = await recentPage.isTableVisible();
  expect(isTableVisible).toBe(true);
});
```

## Hard rules

| Rule | Example violation |
|---|---|
| No selectors in test files | `await page.locator('.graph-card').click()` in `e2e.test.ts` |
| No direct page actions in test files | `await page.click('[data-testid="button"]')` in `e2e.test.ts` |
| No `waitForTimeout()` | `await page.waitForTimeout(2000)` |
| All selectors defined in Page/Component constructors | Inline `page.locator()` in action methods |

## Selector strategy

Prefer in this order:
1. `data-testid` attributes (`[data-testid="graph-card"]`) — most stable
2. ARIA roles (`page.getByRole('button', { name: 'Open' })`)
3. Text content (`page.getByText('Recent Files')`) — for labels only
4. CSS selectors — last resort, avoid

If a `data-testid` is missing from a component, add it via the frontend-agent before writing the test.

## Waiting strategy

```typescript
// ✅ Wait for element to be visible
await page.waitForSelector('[data-testid="graph-card"]');

// ✅ Use expect-based waiting (auto-retries)
await expect(recentPage.getGraphCards()).toHaveCount(5);

// ❌ Never arbitrary sleep
await page.waitForTimeout(2000);
```

## Exploratory testing

```bash
# Open the app for exploratory testing and selector discovery
playwright-cli open http://localhost:8080

# View HTML test report after a run
npx playwright show-report
```

Convert findings from exploration into formal Page Object classes — never leave raw `page.locator()` calls in test files.
