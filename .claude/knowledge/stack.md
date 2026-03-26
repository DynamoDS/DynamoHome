# Technology Stack – DynamoHome

## Core

| Technology | Version | Purpose |
|---|---|---|
| React | ^18.2.0 | UI framework |
| React DOM | ^18.2.0 | DOM rendering via `createRoot` |
| TypeScript | ^5.4.5 | Type safety |

## Build

| Technology | Version | Purpose |
|---|---|---|
| Webpack | ^5.92.0 | Module bundler |
| Webpack CLI | ^5.1.4 | CLI runner |
| Webpack Dev Server | ^5.2.2 | Dev server, port 8080, hot reload |
| ts-loader | ^9.5.1 | TypeScript → Webpack |
| babel-loader | ^9.1.3 | JS/JSX → Webpack |
| Babel Core | ^7.23.5 | JS transpilation |
| css-loader | ^6.8.1 | CSS imports |
| style-loader | ^3.3.3 | Injects CSS into DOM |
| HtmlWebpackPlugin | ^5.5.4 | Generates index.html |
| TerserPlugin | bundled | Production minification |

## UI Libraries

| Library | Version | Purpose |
|---|---|---|
| react-intl | ^6.6.1 | Localization (FormattedMessage, useIntl) |
| react-split-pane | ^0.1.92 | Resizable sidebar/content split |
| react-table | ^7.8.0 | Headless table (Recent, Samples views) |

## Testing

| Technology | Version | Purpose |
|---|---|---|
| Jest | ^29.7.0 | Unit test runner |
| ts-jest | ^29.1.5 | TypeScript support in Jest |
| @testing-library/react | ^15.0.6 | Component testing utilities |
| @testing-library/dom | ^10.3.0 | DOM testing utilities |
| jest-environment-jsdom | ^29.7.0 | DOM simulation for unit tests |
| identity-obj-proxy | ^3.0.0 | CSS Modules mock in Jest |
| @types/jest | ^29.5.12 | Jest type definitions |
| Playwright | ^1.27.1 | E2E test runner |
| @playwright/test | ^1.27.1 | Playwright test framework |

## Code Quality

| Technology | Version | Purpose |
|---|---|---|
| ESLint | ^8.57.0 | Linting |
| eslint-plugin-react | ^7.34.1 | React-specific lint rules |

## Key npm scripts

```bash
npm run start           # Dev server (webpack-dev-server, port 8080)
npm run build           # Dev bundle (unminified)
npm run bundle          # Production bundle (minified)
npm run production      # bundle + copy metadata to dist/
npm run test:unit       # Jest unit tests
npm run test:e2e        # Playwright e2e tests
npm run test            # test:unit + test:e2e
npm run lint:check      # ESLint check (read-only)
npm run lint:fix        # ESLint auto-fix
```

## TypeScript config notes

- `strict: false` — intentional; do not enable without user approval
- `target: "ES2016"`, `module: "CommonJS"`, `jsx: "react-jsx"`
- `resolveJsonModule: true` — needed for locale JSON imports
- Custom type roots: `./types/index.d.ts` for global declarations (Window extensions, Locale type)

## Supported locales

en, cs, de, es, fr, it, ja, ko, pl, pt-BR, ru, zh-Hans, zh-Hant (14 total)
