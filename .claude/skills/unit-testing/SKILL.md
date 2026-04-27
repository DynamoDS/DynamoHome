# Unit Testing Skills – DynamoHome

## Stack

- **Runner**: Jest 29 with `ts-jest` preset
- **DOM**: `jest-environment-jsdom`
- **Component testing**: `@testing-library/react` 15
- **Run tests**: `npm run test:unit` (targets `tests/unit/`)
- **Coverage output**: `./coverage/` (lcov + text reporters)
- **Coverage target**: 100% for all files under `src/`

## Test file location

```
tests/
  unit/
    App.test.tsx            # Existing app-level test
    ComponentName.test.tsx  # One test file per component — place new tests here
  jest.setup.ts             # Applied via setupFilesAfterEnv — do not modify
  __mocks__/
    chromeMock.ts           # Auto-applied: mocks window.chrome.webview globals
    fileMock.ts             # Auto-applied: mocks image imports
    styleMock.ts            # Auto-applied: mocks CSS module imports
```

## Mocks — what's already set up

The `chromeMock.ts` is applied globally in `jest.setup.ts`. It mocks:
- `window.chrome.webview.hostObjects.scriptObject` (all backend methods)
- Global callbacks like `window.receiveGraphDataFromDotNet`

**Do not re-mock these in individual test files** — they're already available.

CSS Modules are mocked by `tests/__mocks__/styleMock.ts`, which returns an empty object — `styles['class-name']` returns `undefined` in tests (class names are not asserted on).

## Writing a test

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '../../src/locales/en.json';
import { CardItem } from '../../src/components/Common/CardItem';

// Wrap with IntlProvider for components using FormattedMessage
const renderWithIntl = (ui: React.ReactElement) =>
  render(
    <IntlProvider locale="en" messages={messages}>
      {ui}
    </IntlProvider>
  );

describe('CardItem', () => {
  it('renders the title', () => {
    renderWithIntl(<CardItem titleText="My Graph" imageSrc="" onClick={jest.fn()} />);
    expect(screen.getByText('My Graph')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderWithIntl(<CardItem titleText="My Graph" imageSrc="" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## What to test

- **Render output**: does the component render expected text, elements, attributes?
- **User interactions**: click, hover, keyboard events — use `fireEvent` or `userEvent`
- **Conditional rendering**: does it show/hide elements based on props or state?
- **Context consumption**: does it read from SettingsContext correctly?

## What NOT to test

- Internal implementation details (state variable names, private methods)
- CSS class names (CSS modules are mocked)
- Third-party library internals (react-table, react-split-pane)
- The Dynamo backend (mocked globally via chromeMock)

## Context testing

For components that use `useSettings()`:
```tsx
import { SettingsContext } from '../../src/components/SettingsContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SettingsContext.Provider value={{ recentPageViewMode: 'grid', ... }}>
    {children}
  </SettingsContext.Provider>
);

render(<PageRecent />, { wrapper });
```

## Coverage requirement

- Every component you **create or modify** must have a corresponding test file
- Run `npm run test:unit -- --coverage` to check coverage after writing tests (output in `./coverage/`)
- Do not submit work that reduces existing coverage
