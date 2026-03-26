# UI Feature Workflow – DynamoHome

Use this workflow when implementing a new UI feature or modifying existing UI.

## Steps

### 1. Identify scope

Determine which module(s) are affected and read the existing components before making changes:

| Module | Location |
|---|---|
| Recent files | `src/components/Recent/` |
| Sample graphs | `src/components/Samples/` |
| Learning resources | `src/components/Learning/` |
| Sidebar navigation | `src/components/Sidebar/` |
| Shared / reused | `src/components/Common/` |

### 2. Add localized strings first

Before writing any JSX with user-visible text:

1. Add the key to `src/locales/en.json`
2. Add the same key (English value as placeholder) to all 13 other locale files
3. Key format: `module.element.descriptor` (e.g. `recent.filter.label.search`)

See the `localization` skill for patterns and the full locale list.

### 3. Implement the UI change

- Functional component with explicit prop interface
- CSS Modules for styling (`styles['class-name']`)
- `<FormattedMessage>` or `useIntl()` for all user-visible text
- No new libraries

If adding a new component, create `ComponentName.tsx` + `ComponentName.module.css` together in the module folder.

```tsx
interface MyFeatureProps {
  value: string;
  onChange: (v: string) => void;
}

export const MyFeature = ({ value, onChange }: MyFeatureProps) => {
  const intl = useIntl();
  return (
    <div className={styles['my-feature']}>
      <span><FormattedMessage id="module.myfeature.label" /></span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={intl.formatMessage({ id: 'module.myfeature.placeholder' })}
      />
    </div>
  );
};
```

### 4. Update SettingsContext if the feature needs persistence

If the feature requires persisting a user preference (e.g. a new view mode or toggle):
- Add the new field to `SettingsContext.tsx`
- Update `saveHomePageSettings()` in `src/functions/utility.ts`
- Adding new fields to the settings JSON is safe; never rename or remove existing fields

### 5. Write unit tests

For every component created or modified, create/update `tests/unit/ComponentName.test.tsx`:
- Wrap with `IntlProvider` for components using `FormattedMessage`
- Test render output and user interactions
- Run: `npm run test:unit -- --coverage`
- Coverage must not decrease

See the `unit-testing` skill for patterns.

### 6. Verify build and lint

```bash
npm run lint:check    # Must pass with no errors
npm run build         # Must produce a valid bundle
npm run test:unit     # All tests must pass
```

### 7. Update E2E tests if the user flow changed

If the feature adds a new page, navigation path, or interactive element:
- Add or update Page Object classes in `tests/e2e/pages/` or `tests/e2e/components/`
- Add test cases to `tests/e2e/e2e.test.ts` (orchestration only — no selectors in the test file)
- Run: `npm run test:e2e` (requires `npm run start` running in another terminal)

See the `end-to-end-testing` skill for POM patterns.
