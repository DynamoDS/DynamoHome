# Refactor Workflow

Use this workflow when restructuring code without changing its behavior in DynamoHome.

## Steps

### 1. Define scope and goal

Before touching code, clearly identify:
- What is being refactored and why (readability, duplication, type safety, etc.)
- What the observable behavior is (so you can verify it's preserved)
- What files are in scope — do not touch files outside the stated scope

### 2. Establish a baseline

Run the full test suite to confirm starting state is green:

```bash
npm run lint:check
npm run test:unit
npm run build
```

If any of these fail before you start, stop and fix them first or confirm with the user.

### 3. Refactor incrementally

- Make one logical change at a time (e.g., extract a component, rename a type, consolidate duplicate logic)
- After each meaningful change, run tests to confirm nothing broke:
  ```bash
  npm run test:unit
  ```
- Commit (or note) each stable checkpoint — makes it easy to revert one step without losing all work

### 4. Common DynamoHome refactors — watch for these risks

| Refactor | Risk to check |
|---|---|
| Renaming a prop or interface | Are there any callers that use the old name? Run `grep -r "oldName" src/` |
| Moving a component to `Common/` | Update all import paths in components that use it |
| Extracting a custom hook | Verify `useSettings()` context is still available if the hook needs it |
| Consolidating locale keys | Check all 14 locale files if you rename/remove a key; also `grep -r "old.key" src/` to find all usages |
| Changing utility.ts functions | These call `window.chrome.webview.hostObjects.scriptObject` — verify mocks in `tests/__mocks__/chromeMock.ts` cover the new signature |
| Changing SettingsContext shape | All consumers use `useSettings()` — grep for `useSettings` and verify each callsite |

### 5. Final verification

```bash
npm run lint:check    # No new lint errors
npm run test:unit     # All tests pass
npm run build         # Dev bundle builds
npm run bundle        # Production bundle builds (if webpack config was touched)
```

### 6. Do not do during a refactor

- Do not add new features or fix unrelated bugs — keep the diff focused on the refactor
- Do not introduce new npm dependencies
- Do not change observable behavior (what the user sees or what Dynamo receives)
- Do not rename or remove global window callbacks (`receiveGraphDataFromDotNet`, `setLocale`, etc.)
- Do not change the settings JSON schema (field names, types)
- Do not change the output bundle path

If you discover a bug while refactoring, note it separately — don't fix it inline (it muddies the refactor diff and makes review harder).
