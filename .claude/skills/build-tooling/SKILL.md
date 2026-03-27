# Build and Tooling Skills – DynamoHome

## Bundler: Webpack 5

`webpack.config.ts` is the single source of truth for all bundling.

### Key configuration

```
Entry:   src/index.tsx
Output:  dist/build/index.bundle.js  ← path is hardcoded in Dynamo, do NOT change
Loaders: ts-loader (TS/TSX), babel-loader (JS/JSX), css-loader + style-loader (CSS)
Plugins: HtmlWebpackPlugin → dist/build/index.html
Modes:   development (unminified) | production (TerserPlugin minification)
```

### Build commands

```bash
npm run start    # webpack-dev-server, port 8080, hot reload
npm run build    # dev bundle (webpack --mode=development)
npm run bundle   # production bundle (webpack --mode=production, minified)
npm run production  # bundle + copy package.json, README.md, license_output → dist/
```

## TypeScript: tsconfig.json

Critical settings to preserve:
- `"strict": false` — enabling this breaks existing code; do not change without explicit user approval
- `"resolveJsonModule": true` — required for `import messages from './locales/en.json'`
- `"typeRoots": ["./types", "./node_modules/@types"]` — custom types loaded from `types/index.d.ts`
- `"jsx": "react-jsx"` — no need for `import React from 'react'` in components

## ESLint: .eslintrc

- Extends `react-app` preset
- Covers `src/` and `tests/`
- Run: `npm run lint:check` (read-only), `npm run lint:fix` (auto-fix)
- Must pass before any PR merge

## Jest: jest.config.ts

- Preset: `ts-jest`
- Environment: `jsdom`
- Coverage from: `src/**/*.{ts,tsx}`, output to `./coverage/`
- Setup file: `tests/jest.setup.ts` — applies chrome global mocks
- Module name mapper: CSS → `identity-obj-proxy`, images → `fileMock.ts`
- Unit test files live in: `tests/unit/`
- Run: `npm run test:unit`

## Playwright: playwright.config.js

- Chromium only
- `testDir: './tests/e2e'` — scoped to e2e tests only
- Web server: auto-starts `npm start` before tests, waits for port 8080
- CI: 1 worker, 2 retries; local: unlimited workers, 0 retries
- Run: `npm run test:e2e` (targets all `*.spec.ts` files in `tests/e2e/`)

## When making build changes

1. After `webpack.config.ts` changes: verify `npm run build` AND `npm run bundle` both succeed
2. After `tsconfig.json` changes: verify `npm run lint:check` and `npm run test:unit` pass
3. After `package.json` script changes: verify all affected scripts still work
4. After adding a new webpack loader: verify CSS Modules still work (`identity-obj-proxy` in tests), and that the production build minifies correctly
5. After CI changes (`.github/workflows/`): review that `build.yml` triggers correctly on PR and push

## What NOT to do

- Do not switch to Vite, Rollup, esbuild, or Parcel
- Do not change the output path `dist/build/` — Dynamo integration depends on it
- Do not enable `strict: true` in `tsconfig.json`
- Do not rename existing npm scripts — CI pipelines call them by name
- Do not add loaders or plugins for technologies not used in the project (e.g., SASS, Less, SVGR) without explicit approval
- Do not modify `jest.setup.ts` or the mock files in `tests/__mocks__/` without understanding downstream impact
