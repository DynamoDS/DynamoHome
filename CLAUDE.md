# DynamoHome

DynamoHome is the start page for **Dynamo**, an Autodesk visual programming tool. It is a React 18 SPA that runs inside a **Chrome WebView (Edge WebView2)** embedded in the Dynamo desktop application — not in a standalone browser. It is published to npm as `@dynamods/dynamo-home`.

## Architecture

```
App.tsx                          # IntlProvider (localization) + SettingsProvider
└── LayoutContainer.tsx          # SplitPane: resizable sidebar + main content
    ├── Sidebar.tsx              # Left nav: page switching, custom dropdowns
    │   └── CustomDropDown.tsx
    └── MainContent.tsx          # Renders active page based on sidebar state
        ├── PageRecent.tsx       # Recent Dynamo files — grid or table view
        │   ├── GraphGridItem.tsx
        │   └── GraphTable.tsx   # react-table with custom cell renderers
        │       ├── CustomNameCellRenderer.tsx
        │       ├── CustomLocationCellRenderer.tsx
        │       └── CustomAuthorCellRenderer.tsx
        ├── PageSamples.tsx      # Sample graphs — grid or table view
        │   ├── SamplesGrid.tsx → SamplesGridItem.tsx
        │   └── SamplesTable.tsx → CustomSampleFirstCellRenderer.tsx
        └── PageLearning.tsx     # Learning resources — guides + video carousels
            ├── Carousel.tsx
            ├── GuideGridItem.tsx
            ├── ModalItem.tsx
            └── VideoCarouselItem.tsx

src/components/Common/           # Shared across modules
  CardItem.tsx  Arrow.tsx  Tooltip.tsx  Portal.tsx  CustomIcons.tsx
```

- No routing library — page switching is state in `MainContent.tsx`
- No Redux or external state — React Context (`SettingsContext.tsx`) + `useState` only
- `public/index.html` has two roots: `#root` (React) and `#modal-root` (Portal target)

## Data flow

```
Dynamo (.NET host)
  │  calls window globals on the app:
  ├─ window.receiveGraphDataFromDotNet(json)              → PageRecent state
  ├─ window.receiveSamplesDataFromDotNet(json)            → PageSamples state
  ├─ window.receiveTrainingVideoDataFromDotNet(json)      → PageLearning state
  ├─ window.receiveInteractiveGuidesDataFromDotNet(json)  → PageLearning state
  ├─ window.setLocale(locale)                             → re-renders with new locale
  ├─ window.setHomePageSettings(settingsJson)             → SettingsContext hydration
  └─ window.setShowStartPageChanged(show)                 → loading overlay

  │  app calls back into Dynamo via:
  └─ window.chrome.webview.hostObjects.scriptObject.*     → all calls go through src/functions/utility.ts
```

**Never rename or remove the window globals** — Dynamo calls them by name from .NET. Any signature change is a breaking change.

## Dynamo host API (`src/functions/utility.ts`)

All backend calls are routed through `utility.ts`. Never call `scriptObject` directly from components.

```typescript
openFile(path: string)                       // scriptObject.OpenFile()
startGuidedTour(guidedTour: string)          // scriptObject.StartGuidedTour()
sideBarCommand(value: SidebarCommand)        // routes to OpenWorkspace / ShowTemplate / NewWorkspace / etc.
showSamplesCommand(value: ShowSamplesCommand) // routes to ShowSampleFilesInFolder / ShowSampleDatasetsInFolder
saveHomePageSettings(settings: any)          // scriptObject.SaveHomePageSettings(JSON)
```

On mount, `App.tsx` calls `scriptObject.ApplicationLoaded()` to signal the host that the UI is ready.

Always guard WebView access:
```tsx
if (window.chrome?.webview) {
  await scriptObject.OpenFile(path);
} else {
  console.log('[DEV] OpenFile:', path);
}
```

## Data shapes (from Dynamo)

```typescript
// Recent file entry
{ Name: string; Path: string; Author: string; TimeStamp: string; IsPinned: boolean }

// Sample graph entry
{ Name: string; Description: string; Path: string; ImagePath: string }

// Settings (persisted to Dynamo — safe to add fields, never rename/remove)
{ recentPageViewMode: 'grid' | 'list'; samplesViewMode: 'grid' | 'list'; sideBarWidth: number }
```

## Settings persistence

`SettingsContext.tsx` holds `recentPageViewMode`, `samplesViewMode`, `sideBarWidth`.
Loaded via `GetHomePageSettings()` on init, saved via `saveHomePageSettings()` on change.
Consumed everywhere via the `useSettings()` hook — do not call `useContext(SettingsContext)` directly.

## Development mode

When `window.chrome?.webview` is absent (running via `npm start` outside Dynamo), the app loads mock data from:
- `src/assets/home.ts` — recent files mock
- `src/assets/samples.ts` — samples mock
- `src/assets/learning.ts` — learning content mock

Tests run against the dev server (`npm start`) which serves this mock data automatically.

## Localization

- 14 locale files in `src/locales/`: `en, cs, de, es, fr, it, ja, ko, pl, pt-BR, ru, zh-Hans, zh-Hant` + `en-GB`
- Locale is set at runtime by Dynamo calling `window.setLocale(locale)`
- Locale identifiers from Dynamo use country-code format (`es-ES`, `de-DE`) — `localization.ts` maps these
- `en.json` is the source of truth; all other locale files must have the same keys
- Key format: `module.element.descriptor` (e.g. `recent.table.header.name`)

## Build output

- Entry: `src/index.tsx` → Output: `dist/build/index.bundle.js` + `dist/build/index.html`
- **The path `dist/build/index.bundle.js` is hardcoded in Dynamo — do not change it**
- `npm run build` = dev bundle, `npm run bundle` = production (minified), `npm run production` = bundle + copy metadata

## CI/CD

- GitHub Actions (`build.yml`): runs on every PR and push to `master` — build → unit tests → Playwright e2e
- Releases: `npm-publish.yml` publishes `@dynamods/dynamo-home` to npm on release creation
- Localization: `trigger_l10n_jenkins.yml` triggers Autodesk's L10N Jenkins pipeline on master push

## Key constraints — never do these

- Do not change the output path `dist/build/` or rename `index.bundle.js`
- Do not rename or remove any `window.*` global callbacks
- Do not change the settings JSON shape (adding fields is safe; renaming/removing is a breaking change)
- Do not add routing libraries, state management libraries (Redux, Zustand, etc.), or UI component libraries
- Do not enable `strict: true` in `tsconfig.json` — it breaks existing code
- Do not rename existing npm scripts — CI calls them by name
- Do not rely on browser APIs not available in Chromium/Edge WebView2

## Naming and folder conventions

- Components: PascalCase (`GraphGridItem.tsx`), co-located CSS Module (`GraphGridItem.module.css`)
- CSS classes accessed via bracket notation: `styles['class-name']`
- Shared components (2+ modules): `src/components/Common/`
- Unit tests: `tests/unit/ComponentName.test.tsx`
- Hooks: `use` prefix (`useSettings`)
- Types/interfaces: PascalCase, defined in `types/index.d.ts` for globals, inline interfaces for component props

## Scope discipline

- Make the smallest change that satisfies the requirement
- Do not refactor adjacent code while implementing a feature
- Do not add dependencies without explicit user approval
- Do not change build config, test config, or CI as a side effect of a feature
- If you spot a bug or improvement outside task scope, mention it — don't fix it unilaterally
