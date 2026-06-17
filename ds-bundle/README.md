# InteriorDesignExam (repo@1.0.0)

This design system is the published repo React library, bundled as a single
browser global. All 13 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.InteriorDesignExam`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.InteriorDesignExam.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { ArrowIcon } = window.InteriorDesignExam;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<ArrowIcon />);
```

## Tokens

20 CSS custom properties from repo. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (2): `--surface`, `--surface-2`
- **radius** (2): `--radius`, `--radius-sm`
- **shadow** (2): `--shadow`, `--shadow-lg`
- **other** (14): `--bg`, `--ink`, `--ink-soft`, …

## Components

### general
- `ArrowIcon`
- `BackIcon`
- `CheckIcon`
- `ClockIcon`
- `CloseIcon`
- `FlagIcon`
- `GridIcon`
- `ImageIcon`
- `MoonIcon`
- `SunIcon`
- `Switch`
- `ThemeToggle`
- `XIcon`
