# Bug Fix Workflow

Use this workflow when diagnosing and fixing a bug in DynamoHome.

## Steps

### 1. Reproduce the issue

Before touching any code:
- Identify the affected module: Recent, Samples, Learning, Sidebar, or layout
- Check if the bug occurs in dev mode (`npm run start`) or only inside Dynamo (WebView context)
- For dev-mode reproduction: start the server and observe the behavior with mock data
- For WebView-only bugs: the root cause is likely in `src/functions/utility.ts` or the `window.chrome?.webview` guard logic

### 2. Locate the root cause

```bash
# Find components related to the bug
grep -r "keyword" src/components/

# Check how data flows to the affected component
# Trace from window globals → component setState → render
```

Common bug locations:
- **Data not displaying**: check `receiveXxxDataFromDotNet` callback and JSON parsing
- **Localization broken**: check locale key exists in all 14 locale files
- **Settings not persisting**: check `saveHomePageSettings()` in `utility.ts` and SettingsContext
- **Crash on load**: check `window.chrome?.webview` optional chaining guard
- **Wrong view mode**: check `SettingsContext` and the `recentPageViewMode`/`samplesViewMode` values

### 3. Apply the fix

- Make the **smallest change** that fixes the issue — do not refactor adjacent code
- Do not change unrelated files
- If the fix touches `window` globals or the settings JSON schema, check Dynamo compatibility:
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

For bugs involving the full user flow, also run: `npm run test:e2e`

## Dynamo-specific considerations

- If the bug only occurs inside Dynamo (not in dev mode), read `src/functions/utility.ts` carefully — all WebView calls go through there
- The `hostObjects.scriptObject` methods are async — missing `await` is a common bug source
- JSON parsing errors from `GetHomePageSettings()` are caught with try-catch in `LayoutContainer.tsx` — check that logic if settings-related
