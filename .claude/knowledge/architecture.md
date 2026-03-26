# Architecture – DynamoHome

DynamoHome is a **React 18 single-page application** that serves as the home/start page for Dynamo, an Autodesk visual programming tool. It runs inside a **Chrome WebView** embedded in the Dynamo desktop application — not in a standalone browser.

## Component tree

```
App.tsx                         # IntlProvider (localization) + SettingsProvider (context)
└── LayoutContainer.tsx         # SplitPane: resizable sidebar + main content
    ├── Sidebar.tsx             # Left nav panel — page switching + custom dropdowns
    │   └── CustomDropDown.tsx
    └── MainContent.tsx         # Renders active page based on sidebar selection
        ├── PageRecent.tsx      # Recent Dynamo files — grid or table view
        │   ├── GraphGridItem.tsx
        │   └── GraphTable.tsx  # react-table with custom cell renderers
        │       ├── CustomNameCellRenderer.tsx
        │       ├── CustomLocationCellRenderer.tsx
        │       └── CustomAuthorCellRenderer.tsx
        ├── PageSamples.tsx     # Sample graphs — grid or table view
        │   ├── SamplesGrid.tsx
        │   │   └── SamplesGridItem.tsx
        │   └── SamplesTable.tsx
        │       └── CustomSampleFirstCellRenderer.tsx
        └── PageLearning.tsx    # Learning resources — guides + video carousels
            ├── Carousel.tsx
            ├── GuideGridItem.tsx
            ├── ModalItem.tsx
            └── VideoCarouselItem.tsx

Common/                         # Shared across modules
  CardItem.tsx                  # Reusable card for grid views
  Tooltip.tsx
  Arrow.tsx
  Portal.tsx
  CustomIcons.tsx               # SVG icons: GridView, ListView
```

## Data flow

```
Dynamo backend (.NET)
    │
    ▼ calls window globals
window.receiveGraphDataFromDotNet(json)         → PageRecent state
window.receiveSamplesDataFromDotNet(json)       → PageSamples state
window.receiveTrainingVideoDataFromDotNet(json) → PageLearning state
window.receiveInteractiveGuidesDataFromDotNet(json) → PageLearning state
    │
    ▼
Component setState → React render
    │
    ▼ user interaction
window.chrome.webview.hostObjects.scriptObject.OpenFile(path)
window.chrome.webview.hostObjects.scriptObject.DeleteFile(path)
window.chrome.webview.hostObjects.scriptObject.OpenUrl(url)
    │
    ▼
Back to Dynamo
```

In **development mode** (no WebView), the app detects `!window.chrome?.webview` and loads mock data from `src/assets/home.ts`, `samples.ts`, `learning.ts`.

## Settings persistence

`SettingsContext.tsx` holds: `recentPageViewMode`, `samplesViewMode`, `sideBarWidth`

- Loaded on init via `window.chrome.webview.hostObjects.scriptObject.GetHomePageSettings()`
- Saved on change via `saveHomePageSettings()` in `src/functions/utility.ts`
- Consumed via the `useSettings()` custom hook

## Localization

- `App.tsx` wraps the tree with `<IntlProvider locale={locale} messages={messages}>`
- Locale is set at runtime by Dynamo calling `window.setLocale(locale)`
- Messages come from `src/localization/localization.ts → getMessagesForLocale(locale)`
- 14 locales: en, cs, de, es, fr, it, ja, ko, pl, pt-BR, ru, zh-Hans, zh-Hant

## Build output

- **Entry**: `src/index.tsx`
- **Output**: `dist/build/index.bundle.js` + `dist/build/index.html`
- Dynamo hardcodes the path `dist/build/index.bundle.js` — do not change it

## Key constraints

- No backend server — all data comes from the Dynamo host via WebView
- No routing library — page switching is managed by component state in `MainContent.tsx`
- No Redux or external state management — React Context + useState only
- The app must work in Chromium (WebView) — no reliance on Firefox/Safari-specific APIs
