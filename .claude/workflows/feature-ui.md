# UI Feature Development Workflow

Use this workflow when implementing a new UI feature or modifying existing UI in DynamoHome.

## Steps

### 1. Identify scope

Determine which module(s) are affected:
- **Recent** → `src/components/Recent/`
- **Samples** → `src/components/Samples/`
- **Learning** → `src/components/Learning/`
- **Sidebar** → `src/components/Sidebar/`
- **Shared** → `src/components/Common/`

Read the existing components in that module before making changes.

### 2. Add or update localized strings

Before writing any JSX with user-visible text:

a. Add the key to `src/locales/en.json`
b. Add the same key (English value as placeholder) to all 13 other locale files
c. Key format: `module.element.descriptor` (e.g., `recent.filter.label.search`)

### 3. Implement the UI change

Follow the React skills (`skills/react.md`):
- Functional component with explicit prop interface
- CSS Modules for styling
- `<FormattedMessage>` or `useIntl()` for all text
- No new libraries

If adding a new component:
- Place it in the correct module folder (or `Common/` if shared)
- Create `ComponentName.tsx` + `ComponentName.module.css` together

### 4. Update SettingsContext if needed

If the feature requires persisting user preferences (e.g., a new view mode):
- Add the new field to `SettingsContext.tsx`
- Update the settings JSON schema in `src/functions/utility.ts`
- Note: settings schema is shared with Dynamo — adding fields is safe, removing/renaming is a breaking change

### 5. Write or update unit tests

For every component created or modified, create/update `tests/unit/ComponentName.test.tsx`:
- Wrap with `IntlProvider` for components using `FormattedMessage`
- Test what renders, test user interactions
- Run: `npm run test:unit -- --coverage`
- Coverage must not decrease

### 6. Verify build and lint

```bash
npm run lint:check    # Must pass with no errors
npm run build         # Must produce a valid bundle
npm run test:unit     # All tests must pass
```

### 7. Update E2E tests (if user flow changed)

If the feature changes a user-visible flow (new page, new navigation, new interactive element):
- Add or update Page Object classes in `tests/e2e/pages/` or `tests/e2e/components/`
- Add test cases to `tests/e2e/e2e.test.ts` (orchestration only — no selectors in test file)
- Run: `npm run test:e2e` (requires `npm run start` running)

## Quick reference — common patterns

```tsx
// New component skeleton
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
