# Ventema — website

Three static pages: the home page, and the two App Store Connect asks for —
**Support URL** and **Privacy Policy URL**.

```
index.html      Home: what Ventema does, and why a farmer would want it.
support.html    Support URL. Contact, FAQ, how to file a bug.
privacy.html    Privacy Policy URL.
assets/
  styles.css            The design system, ported from the app.
  mark.png              Wordmark and favicon, 128x128, rounded.
  apple-touch-icon.png  Home-screen icon, 180x180, square.
```

No build step, no dependencies, no JavaScript. Open a file, or serve the
folder:

```bash
python3 -m http.server 4173
```

## The design system

`assets/styles.css` is a direct port of
`VentemaApp/Modules/Sources/VentemaDesignSystem`, so the site and the app stay
one thing:

| App | Web |
| --- | --- |
| `VentemaColor.olive`, `.bark`, `.terracotta` | `--olive`, `--bark`, `--terracotta` |
| `VentemaColor.canvas`, `.card`, `.hairline` | `--canvas`, `--card`, `--hairline` |
| `VentemaSpacing.xs … xxl` | `--xs … --xxl` |
| `VentemaSpacing.cornerRadius` | `--corner-radius` |
| `VentemaCard` | `.card` |
| `StatTile` | `.stat` |
| `PriorityBadge` / `StatusBadge` | `.badge--*` |

Both light and dark values come from `VentemaColor.dynamic(light:dark:)`; the
page follows the reader's system appearance the same way the app does. **If a
colour changes in the Swift file, change it here too** — these are two copies
of one palette.

## The icon

`assets/mark.png` is the app icon, rebuilt from
`VentemaApp/Ventema/App.icon`: the white olive branch is
`Assets/Minimalist White Olive Branch 2.png` drawn at scale 0.75 and offset
(-54.875, -27.75) points on the 1024pt canvas, over the green gradient in
`icon.json` (`#009B00` to `#004300`, top to 70% height) — the same numbers,
read straight out of that file. The corners are rounded the way iOS rounds
them; `apple-touch-icon.png` is the same artwork left square and full-bleed,
because iOS applies its own mask to it.

App.icon is the original; this is a copy for the web. **If the icon changes
there, regenerate both files here.**

## Before it goes live

- [ ] Point `support@ventema.app` somewhere real, or replace the address in all
      three pages and the footer (`grep -rn "support@ventema.app"`).
- [ ] Add the App Store link once the app is approved — the hero and the closing
      section both have room for a download button.
- [ ] Check the copyright year and the privacy policy's "Last updated" date.

## Deploying

Any static host serves it as-is. For GitHub Pages, push this folder to a
repository and turn Pages on for the branch root; the three URLs are then
`/`, `/support.html` and `/privacy.html`.
