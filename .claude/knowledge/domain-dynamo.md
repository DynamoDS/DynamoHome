# Dynamo Domain Knowledge

## What Dynamo is

Dynamo is a visual programming tool by Autodesk used in architecture, engineering, and construction. DynamoHome is its start page — a webview-based UI embedded in the Dynamo desktop application.

## How the host integration works

The app communicates with the Dynamo host (.NET) exclusively through `window.chrome.webview.hostObjects.scriptObject`. This object is injected by the WebView host and exposes backend methods.

### Methods the app calls on Dynamo

```typescript
scriptObject.OpenFile(filePath: string)           // Open a Dynamo graph file
scriptObject.DeleteFile(filePath: string)          // Delete a recent file entry
scriptObject.OpenUrl(url: string)                  // Open URL in browser
scriptObject.GetHomePageSettings(): string         // Returns JSON settings string
scriptObject.SaveHomePageSettings(json: string)    // Persist user preferences
scriptObject.PinGraph(filePath: string)            // Pin/unpin recent file
```

All of these are async (return promises) and must be called with `await`.

### Global callbacks Dynamo calls on the app

These are set on `window` and called by the .NET host:

```typescript
window.receiveGraphDataFromDotNet(json: string)           // Recent files data
window.receiveSamplesDataFromDotNet(json: string)         // Sample graphs data
window.receiveTrainingVideoDataFromDotNet(json: string)   // Learning videos data
window.receiveInteractiveGuidesDataFromDotNet(json: string) // Learning guides data
window.setLocale(locale: string)                          // Change UI language
window.setShowStartPageChanged(show: boolean)             // Loading overlay control
window.setHomePageSettings(settingsJson: string)          // Apply persisted settings
```

**Never rename or remove these globals** — Dynamo calls them by name from .NET code. Any signature change is a breaking change.

## Data shapes

Recent file entry (from `receiveGraphDataFromDotNet`):
```json
{
  "Name": "MyGraph.dyn",
  "Path": "C:\\Users\\user\\Documents\\MyGraph.dyn",
  "Author": "user@company.com",
  "TimeStamp": "2024-01-15T10:30:00",
  "IsPinned": false
}
```

Sample graph entry:
```json
{
  "Name": "Sample Graph",
  "Description": "A sample Dynamo graph",
  "Path": "C:\\Program Files\\Dynamo\\samples\\...",
  "ImagePath": "relative/path/to/image.png"
}
```

Settings JSON (persisted to Dynamo):
```json
{
  "recentPageViewMode": "grid",
  "samplesViewMode": "list",
  "sideBarWidth": 200
}
```

## Development mode

When `window.chrome?.webview` is not present (running via `npm start` outside Dynamo), the app uses mock data from:
- `src/assets/home.ts` — mock recent files
- `src/assets/samples.ts` — mock samples
- `src/assets/learning.ts` — mock learning content

This allows full development without Dynamo installed.

## Compatibility constraints

- The output bundle path `dist/build/index.bundle.js` is hardcoded in Dynamo — never change it
- The app must run in Chromium (Edge WebView2) — no reliance on browser-specific APIs not in Chromium
- Locale identifiers must match what Dynamo sends (e.g., `"en-US"`, `"de-DE"`, `"zh-Hans"`) — check `src/localization/localization.ts` for the full mapping
- Settings schema is shared with Dynamo — adding new fields is safe; renaming/removing existing fields is a breaking change
