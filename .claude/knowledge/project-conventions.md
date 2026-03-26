# Project Conventions – DynamoHome

## File and folder structure

- Components live in `src/components/[Module]/ComponentName.tsx`
- Styles live in `src/components/[Module]/ComponentName.module.css` (CSS Modules, same folder as component)
- Shared components (used by 2+ modules) go in `src/components/Common/`
- Unit tests live in `tests/ComponentName.test.tsx` (flat, not mirrored structure)
- E2E page objects live in `tests/pages/` and `tests/components/`
- Locale strings live in `src/locales/[locale].json` — all 14 files must stay in sync

## Naming conventions

- **Components**: PascalCase (`GraphGridItem.tsx`, `CustomDropDown.tsx`)
- **CSS Module files**: same name as component (`GraphGridItem.module.css`)
- **Hooks**: camelCase prefixed with `use` (`useSettings`)
- **Type interfaces**: PascalCase, descriptive (`SidebarItem`, `HomePageSetting`)
- **Locale keys**: dot-notation, `module.element.descriptor` (`recent.table.header.name`, `button.title.text.open`)
- **Test files**: `ComponentName.test.tsx` for unit, `e2e.test.ts` for e2e

## Component conventions

```tsx
// ✅ Correct: explicit prop interface, CSS Modules, FormattedMessage
interface CardItemProps {
  imageSrc: string;
  onClick: () => void;
  titleText: string;
}

export const CardItem = ({ imageSrc, onClick, titleText }: CardItemProps) => {
  return (
    <div className={styles['graph-container']} onClick={onClick}>
      <FormattedMessage id="card.title.text" />
    </div>
  );
};

// ❌ Wrong: inline types, hardcoded text, any type
export const CardItem = ({ imageSrc, onClick }: { imageSrc: any; onClick: any }) => (
  <div className="graph-container">Recent Files</div>
);
```

## CSS Modules convention

```tsx
import styles from './CardItem.module.css';

// Access with bracket notation (kebab-case class names)
<div className={styles['graph-container']}>
```

## Localization convention

```tsx
// In JSX — use FormattedMessage
<FormattedMessage id="recent.table.header.name" />

// In props or attributes — use useIntl hook
const intl = useIntl();
<input placeholder={intl.formatMessage({ id: 'search.placeholder' })} />
```

## Backend integration convention

All calls to Dynamo backend go through `src/functions/utility.ts`:
```tsx
// ✅ Correct: use utility functions
import { openFile, saveHomePageSettings } from '../functions/utility';

// ❌ Wrong: inline webview calls in components
window.chrome.webview.hostObjects.scriptObject.OpenFile(path);
```

Always guard WebView access:
```tsx
// ✅ Correct
if (window.chrome?.webview) {
  await scriptObject.OpenFile(path);
} else {
  console.log('[DEV] OpenFile:', path); // dev fallback
}
```

## Scope discipline

- Make the **smallest change** that satisfies the requirement
- Do not refactor adjacent code while implementing a feature
- Do not add dependencies without explicit user approval
- Do not change build config, test config, or CI pipelines as a side effect
- If you notice a bug or improvement opportunity outside your task scope, mention it — don't fix it unilaterally
