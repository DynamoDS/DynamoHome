When creating or moving a component, choose the folder by usage:

| Used by | Folder |
|---|---|
| One module (Recent, Samples, Learning, Sidebar) | `[Module]/ComponentName.tsx` |
| Two or more modules | `Common/ComponentName.tsx` |
| App-level (layout, context) | `src/components/ComponentName.tsx` |

Every component file must have a co-located CSS Module in the same folder: `ComponentName.module.css`. Create both files together — never a component without its stylesheet or vice versa.
