# Refactor Workflow – DynamoHome

Use this workflow when restructuring code without changing its observable behavior.

## Steps

### 1. Define scope and goal

Before touching code, identify:
- What is being refactored and why (readability, duplication, type safety, etc.)
- What the observable behavior is, so you can verify it is preserved afterward
- Which files are in scope — do not touch files outside the stated scope

### 2. Establish a baseline

Run the full test suite to confirm the starting state is green:

```bash
npm run lint:check
npm run test:unit
npm run build
```

If any of these fail before you start, stop and fix them first (or confirm with the user).

### 3. Refactor incrementally

- Make one logical change at a time (extract a component, rename a type, consolidate duplicate logic)
- Run `npm run test:unit` after each meaningful change to confirm nothing broke
- Note each stable checkpoint — makes it easy to revert one step without losing all work

### 4. DynamoHome-specific risks

| Refactor | Risk to check |
|---|---|
| Renaming a prop or interface | Any callers using the old name? Grep `src/` for it |
| Moving a component to `Common/` | Update all import paths in consumers |
| Extracting a custom hook | Verify `useSettings()` context is still available if the hook needs it |
| Consolidating or renaming locale keys | Check all 14 locale files; grep `src/` for old key usages |
| Changing `utility.ts` function signatures | Verify `tests/__mocks__/chromeMock.ts` covers the new signature |
| Changing `SettingsContext` shape | Grep for `useSettings` and verify every callsite still works |
| Renaming a global window callback | **Never do this** — Dynamo calls them by name from .NET |

### 5. Final verification

```bash
npm run lint:check    # No new lint errors
npm run test:unit     # All tests pass
npm run build         # Dev bundle builds
npm run bundle        # Production bundle builds (if webpack config was touched)
```

## What NOT to do during a refactor

- Do not add features or fix unrelated bugs — keep the diff focused
- Do not introduce new npm dependencies
- Do not change observable behavior (what the user sees or what Dynamo receives)
- Do not rename or remove global `window.*` callbacks
- Do not change the settings JSON schema field names
- Do not change the output bundle path

If you discover a bug while refactoring, note it separately — do not fix it inline. It muddies the diff and makes review harder.
