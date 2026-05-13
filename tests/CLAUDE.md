Two separate test suites — keep them isolated:

| Folder | Runner | File pattern |
|---|---|---|
| `unit/` | Jest + React Testing Library | `ComponentName.test.tsx` — one file per component |
| `e2e/` | Playwright | `*.spec.ts` per feature area + `pages/` and `components/` (Page Object classes) |

**Hard e2e rule:** `*.spec.ts` files must never contain selectors or direct page actions. All `page.locator()` calls live in Page/Component classes under `e2e/pages/` and `e2e/components/`.

**Mocks applied globally — do not re-mock in individual test files:**

- `__mocks__/chromeMock.ts` — `window.chrome.webview`, `window.receiveGraphDataFromDotNet`, and all other window globals
- `__mocks__/fileMock.ts` — image imports (`*.png`, `*.svg`, etc.)
- `__mocks__/styleMock.ts` — CSS module imports

These are wired up via `jest.setup.ts` and apply automatically to every unit test.
