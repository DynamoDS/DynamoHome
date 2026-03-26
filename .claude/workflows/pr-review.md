# PR Review Workflow

Use this workflow when reviewing a pull request against the DynamoHome repository.

## Steps

### 1. Understand the scope

Read the PR description and list of changed files. Identify:
- Which module(s) are touched: Recent, Samples, Learning, Sidebar, Common, build, tests
- Is it a feature, bugfix, refactor, or dependency update?
- Are there Dynamo integration touchpoints (window globals, settings schema, output path)?

### 2. Review code changes

Work through the `code-review` skill checklist (`skills/code-review.md`):

**TypeScript**: no new `any`, no `@ts-ignore`

**React**: functional components, explicit prop types, CSS Modules, no new libraries

**Localization**:
- Every new user-visible string must be in `en.json` AND all 13 other locale files
- Keys follow `module.element.descriptor` format
- No hardcoded text in JSX

**Dynamo integration**:
- `window.chrome?.webview` always optional-chained
- No rename/removal of global callbacks (`receiveGraphDataFromDotNet`, `setLocale`, etc.)
- No change to settings JSON field names or output bundle path

### 3. Verify test coverage

**Unit tests**:
- New/modified components have test files in `tests/unit/`
- Tests validate behavior, not implementation details
- Chrome globals not re-mocked (already in `tests/__mocks__/chromeMock.ts`)

**E2E tests**:
- Changed user flows have Playwright test coverage
- `tests/e2e/e2e.test.ts` contains no selectors or direct page actions
- All selectors live in `tests/e2e/pages/` or `tests/e2e/components/`

### 4. Check build integrity

Confirm (or ask the author to confirm):
```bash
npm run lint:check   # Passes
npm run test:unit    # Passes
npm run build        # Dev bundle succeeds
npm run bundle       # Production bundle succeeds (for PRs touching webpack or build scripts)
```

### 5. Write feedback

Structure feedback clearly:

- **Blocker**: something that will break functionality, cause a regression, or violates a hard rule
  > File and line number, what the problem is, what the fix should be
- **Recommendation**: optional improvement, clearly labeled as non-blocking
  > Keep it brief; one issue per comment

Do NOT:
- Request refactors for code not touched by the PR
- Flag style differences that match the surrounding file
- Block for pre-existing issues (legacy `any` types, missing tests for old components)
- Ask for architectural changes outside the PR scope

## Common blockers to watch for

| Issue | Why it blocks |
|---|---|
| Missing locale key in any of the 14 locale files | App throws at runtime for users of that locale |
| `window.chrome.webview` accessed without optional chaining | Crashes in dev mode / outside Dynamo |
| Global callback renamed or removed | Dynamo .NET host calls it by name — breaking change |
| Selector in `e2e.test.ts` directly | Violates POM requirement; makes tests brittle |
| New npm dependency without justification | Increases bundle size, adds supply chain risk |
| Output path changed from `dist/build/` | Dynamo integration breaks at runtime |
