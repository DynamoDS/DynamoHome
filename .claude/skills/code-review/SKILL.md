# Code Review Skills – DynamoHome

## Review mindset

Focus on real problems: regressions, missing tests, broken localization, type safety gaps, Dynamo integration breakage. Do not request style changes or refactors for code not touched by the PR. Keep feedback concise and actionable.

## Review process

### 1. Understand the scope

Read the PR description and list of changed files. Identify:
- Which module(s) are touched: Recent, Samples, Learning, Sidebar, Common, build, tests
- Whether it is a feature, bugfix, refactor, or dependency update
- Any Dynamo integration touchpoints (window globals, settings schema, output path)

### 2. Work through the checklist

See checklist below. Flag blockers as you go; note recommendations separately.

### 3. Verify test coverage

- New/modified components have unit tests in `tests/unit/`
- Changed user flows have Playwright coverage
- `tests/e2e/*.spec.ts` files contain no selectors or direct page actions

### 4. Check build integrity

Confirm (or ask the author to confirm):
```bash
npm run lint:check   # Passes
npm run test:unit    # Passes
npm run build        # Dev bundle succeeds
npm run bundle       # Production bundle succeeds (only for PRs touching webpack or build scripts)
```

### 5. Write structured feedback

See "How to give feedback" section below.

## Checklist

### TypeScript
- [ ] No new `any` types introduced for props, state, or function parameters
- [ ] No `// @ts-ignore` added
- [ ] New types are interfaces (not inline) if used in more than one place
- [ ] Existing `any` in legacy code (`SettingsContext`, `utility.ts`) is not flagged as new issues

### React components
- [ ] Functional components only (no class components)
- [ ] Explicit prop interfaces defined
- [ ] CSS classes use `styles['class-name']` from CSS Modules imports — no global classNames or inline styles
- [ ] No new UI or state management libraries added to `package.json`

### Localization
- [ ] Every new user-visible string has a key in `src/locales/en.json`
- [ ] The same key exists in all 13 other locale files (`cs`, `de`, `es`, `fr`, `it`, `ja`, `ko`, `pl`, `pt-BR`, `ru`, `zh-Hans`, `zh-Hant`)
- [ ] Keys follow `module.element.descriptor` format
- [ ] No hardcoded text in JSX (no raw string children, no `title=""` without intl)

### Unit tests
- [ ] New or modified components have test files in `tests/unit/`
- [ ] Tests validate behavior (user sees X, clicking Y does Z), not implementation details
- [ ] No re-mocking of globals already provided by `tests/__mocks__/chromeMock.ts`
- [ ] Coverage not reduced for modified files

### E2E tests
- [ ] Playwright tests have no selectors in `*.spec.ts` files (all in Page/Component classes)
- [ ] No `page.locator()` or `page.click()` calls directly in test files
- [ ] No `waitForTimeout()` calls

### Dynamo integration
- [ ] `window.chrome?.webview` is guarded with optional chaining before access
- [ ] No global callback functions renamed or removed (`receiveGraphDataFromDotNet`, `setLocale`, etc.)
- [ ] Settings JSON shape unchanged (no field removals or renames)
- [ ] Output bundle path `dist/build/index.bundle.js` not changed

### Dependencies and build
- [ ] No new `npm` packages without justification
- [ ] `npm run lint:check` passes
- [ ] `npm run build` produces a valid bundle
- [ ] Existing npm script names unchanged

## Common blockers

| Issue | Why it blocks |
|---|---|
| Missing locale key in any of the 14 locale files | App throws at runtime for users of that locale |
| `window.chrome.webview` accessed without optional chaining | Crashes in dev mode / outside Dynamo |
| Global callback renamed or removed | Dynamo .NET host calls it by name — breaking change |
| Settings field renamed or removed | Dynamo reads/writes settings by field name — breaking change |
| Selector in `*.spec.ts` directly | Violates POM requirement; makes tests brittle |
| New npm dependency without justification | Increases bundle size, adds supply chain risk |
| Output path changed from `dist/build/` | Dynamo integration breaks at runtime |

## How to give feedback

**Blocker** (must fix before merge):
> `src/components/Recent/GraphGridItem.tsx:42` — `title` prop is hardcoded `"Open File"`. Must use `<FormattedMessage id="recent.item.open" />`. Add the key to all 14 locale files.

**Recommendation** (optional improvement):
> Consider extracting the `formatDate()` call on line 28 to `utility.ts` since the same logic appears in `CustomNameCellRenderer.tsx`. Not blocking.

## What NOT to flag

- Existing `any` types in files not touched by the PR
- Code style differences that match the surrounding file (unless they introduce bugs)
- Missing tests for components that already existed before the PR
- Architecture concerns outside the scope of the change
