# Bug Fix Workflow – DynamoHome

Use this workflow when diagnosing and fixing a bug.

## Steps

### 1. Reproduce the issue

Before touching any code:
- Identify the affected module: Recent, Samples, Learning, Sidebar, or layout
- Check whether the bug occurs in dev mode (`npm run start`) or only inside Dynamo (WebView context)
- Dev-mode bugs: reproduce with mock data from `src/assets/`
- WebView-only bugs: root cause is likely in `src/functions/utility.ts` or a missing `window.chrome?.webview` guard

### 2. Locate the root cause

Common bug locations in DynamoHome:

| Symptom | Where to look |
|---|---|
| Data not displaying | `receiveXxxDataFromDotNet` callback and JSON parsing in the page component |
| Localization broken / missing text | Key missing in one or more of the 14 locale files |
| Settings not persisting | `saveHomePageSettings()` in `utility.ts` and `SettingsContext.tsx` |
| Crash on load / outside Dynamo | Missing `window.chrome?.webview` optional chaining guard |
| Wrong view mode shown | `SettingsContext` values (`recentPageViewMode`, `samplesViewMode`) |
| Action does nothing in Dynamo | Missing `await` on `scriptObject.*` calls — all hostObjects methods are async |

### 3. Apply the fix

- Make the **smallest change** that fixes the issue — do not refactor adjacent code
- Do not change unrelated files
- If the fix touches `window` globals or the settings JSON schema:
  - Global callback names must not change
  - Settings field names must not change (adding new fields is safe)

### 4. Add a regression test

For every bug fixed, add or update a test that would have caught it:

```tsx
// tests/unit/ComponentName.test.tsx
it('does not crash when graphData is empty', () => {
  render(<PageRecent graphs={[]} />);
  expect(screen.getByText(/no recent files/i)).toBeInTheDocument();
});
```

Run: `npm run test:unit`

### 5. Verify everything passes

```bash
npm run lint:check    # No new lint errors
npm run test:unit     # All unit tests pass (including new regression test)
npm run build         # Dev bundle still builds
```

For bugs involving a full user flow, also run: `npm run test:e2e`

## Dynamo-specific notes

- All `scriptObject.*` methods are async — missing `await` is a common source of silent failures
- `GetHomePageSettings()` JSON parsing is wrapped in try-catch in `LayoutContainer.tsx` — check that logic for settings-related bugs
- If a bug only reproduces inside Dynamo (not in dev mode), trace the call through `src/functions/utility.ts` — that is the only place WebView calls should be made
