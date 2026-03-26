# Localization Skills – DynamoHome

## System overview

- Library: **react-intl** (v6)
- Source of truth: `src/locales/en.json`
- All 14 locale files must stay in sync: `en, cs, de, es, fr, it, ja, ko, pl, pt-BR, ru, zh-Hans, zh-Hant`
- Locale is set at runtime by Dynamo via `window.setLocale(locale)`
- Mapping from locale string → messages: `src/localization/localization.ts → getMessagesForLocale()`

## Key naming convention

Format: `module.element.descriptor`

```json
// ✅ Good key names
"recent.table.header.name": "Name",
"recent.table.header.location": "Location",
"samples.grid.item.open": "Open Sample",
"learning.carousel.title.guides": "Interactive Guides",
"button.title.text.open": "Open",
"sidebar.item.recent": "Recent"

// ❌ Bad key names
"openButton": "Open",
"name": "Name",
"recentTableHeaderName": "Name"
```

## Adding a new string — required steps

**Step 1:** Add the key to `src/locales/en.json`:
```json
{
  "recent.filter.placeholder": "Search files..."
}
```

**Step 2:** Add the same key to all 13 other locale files (`cs.json`, `de.json`, `es.json`, `fr.json`, `it.json`, `ja.json`, `ko.json`, `pl.json`, `pt-BR.json`, `ru.json`, `zh-Hans.json`, `zh-Hant.json`). Use the English value as a placeholder if translations are not yet available:
```json
{
  "recent.filter.placeholder": "Search files..."
}
```

**Step 3:** Use the key in your component:

```tsx
// In JSX — use FormattedMessage
import { FormattedMessage } from 'react-intl';
<span><FormattedMessage id="recent.filter.placeholder" /></span>

// In attributes/props — use useIntl hook
import { useIntl } from 'react-intl';
const intl = useIntl();
<input placeholder={intl.formatMessage({ id: 'recent.filter.placeholder' })} />
```

## Adding a new locale

1. Add `src/locales/[locale].json` with all existing keys translated
2. Add the mapping in `src/localization/localization.ts`:
```typescript
case 'pt-PT':
  return import('./locales/pt-PT.json');
```
3. Add the locale to the `Locale` type in `types/index.d.ts` if needed

## What NOT to do

```tsx
// ❌ Never hardcode user-visible text
<button>Open File</button>
<div title="Recent files">

// ❌ Never use string concatenation with locale strings
const msg = intl.formatMessage({ id: 'prefix' }) + name;
// ✅ Use FormattedMessage with values prop instead
<FormattedMessage id="recent.item.title" values={{ name }} />

// ❌ Never add a key to en.json without adding it to all other locale files
```
