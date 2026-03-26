# React Skills – DynamoHome

## Component rules

**Always use functional components:**
```tsx
// ✅
export const MyComponent = ({ title }: MyComponentProps) => <div>{title}</div>;

// ❌ Never
export class MyComponent extends React.Component { ... }
```

**Define explicit prop interfaces:**
```tsx
// ✅
interface GraphGridItemProps {
  name: string;
  path: string;
  onOpen: (path: string) => void;
}
export const GraphGridItem = ({ name, path, onOpen }: GraphGridItemProps) => { ... };

// ❌
export const GraphGridItem = ({ name, path, onOpen }: any) => { ... };
```

**CSS Modules — mandatory:**
```tsx
import styles from './GraphGridItem.module.css';
// Access with bracket notation
<div className={styles['graph-item']}>
// ❌ Never global class names or inline styles
<div className="graph-item">
<div style={{ color: 'red' }}>
```

## State management

- Component-level state: `useState`
- Shared user preferences: `useSettings()` hook (wraps `SettingsContext`)
- No external state libraries — Context API only

```tsx
import { useSettings } from '../SettingsContext';
const { recentPageViewMode, setRecentPageViewMode } = useSettings();
```

## Hooks

- Use built-in hooks: `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `useContext`
- Consume context via `useSettings()` — do not use `useContext(SettingsContext)` directly
- Use `useIntl()` from react-intl when you need a string value (not JSX)

## Approved libraries — do not add others

| Library | Usage |
|---|---|
| react-intl | `<FormattedMessage>`, `useIntl()` |
| react-table | `useTable()` hook in GraphTable and SamplesTable |
| react-split-pane | `<SplitPane>` in LayoutContainer |

## Folder placement

| Component type | Location |
|---|---|
| Used by one module | `src/components/[Module]/` |
| Used by 2+ modules | `src/components/Common/` |
| App-level | `src/components/` (LayoutContainer, MainContent, SettingsContext) |

## What NOT to do

- Do not add Redux, Zustand, Recoil, MobX, Jotai, or any state management library
- Do not add component libraries (Material UI, Ant Design, Chakra, shadcn, etc.)
- Do not use `React.FC` type — prefer explicit prop interfaces with arrow function components
- Do not use `React.memo`, `React.lazy`, or `Suspense` unless explicitly requested
- Do not use `any` for prop types, state, or return types in new code
