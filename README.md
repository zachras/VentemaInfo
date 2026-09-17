# Ventema — website

Three static pages: the home page, and the two App Store Connect asks for —
**Support URL** and **Privacy Policy URL**.

```
index.html      Home: what Ventema does, and why a farmer would want it.
support.html    Support URL. Contact, FAQ, how to file a bug.
privacy.html    Privacy Policy URL.
assets/
  styles.css            The design system, ported from the app.
  mark.svg              Wordmark and favicon.
  apple-touch-icon.png  Home-screen icon, 180x180.
```

No build step, no dependencies and no JavaScript — the one `<script>` on the
home page is a JSON-LD block, which is metadata for search engines rather than
code that runs. Open a file, or serve the folder:

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
| `VentemaRootView`'s four tabs | `.tabbar`, `.tabstrip` |

Both light and dark values come from `VentemaColor.dynamic(light:dark:)`; the
page follows the reader's system appearance the same way the app does. **If a
colour changes in the Swift file, change it here too** — these are two copies
of one palette.

## What the home page draws

There are no screenshots on the site. Every picture of the app is built from
the same CSS the rest of the page uses, so it follows the reader's light or
dark appearance and never goes stale against a redesign:

- **`.device`** — the hero's iPhone. A rail, a screen at 9:19, a Dynamic
  Island, a status bar, and then the real `.stat`, `.row` and `.badge`
  components inside it. The tab bar carries the app's actual four tabs, in the
  order `RootTab` declares them: Map, Plan, Groves, Settings.
- **`.vignette`** — the four smaller panels down *How a season goes*.
- **`.minimap`** — the inline SVG map in step one. Its pin labels are sized in
  viewBox units, which shrink with the map, so a `max-width: 560px` query
  scales them back up for a phone.
- **`.ledger`** — the privacy band's "what leaves your phone" list.

When there are App Store screenshots, they can replace the vignettes; the hero
device is worth keeping either way, since it sizes itself to the column.

## The icon

`assets/mark.svg` is the app icon, rebuilt from
`VentemaApp/Ventema/App.icon`: the two leaf paths come from
`Assets/ventema-leaves.svg` and the dark green field from the gradient in
`icon.json` (`#004200` to `#004300`). `apple-touch-icon.png` is the same
artwork, full-bleed and square, because iOS applies its own mask to it.

App.icon is the original; this is a copy for the web. **If the icon changes
there, regenerate both files here.**

## Before it goes live

- [ ] Point `support@ventema.app` somewhere real, or replace the address in all
      three pages and the footer (`grep -rn "support@ventema.app"`).
- [ ] Add the App Store link once the app is approved. Two HTML comments in
      `index.html` mark the spots — the hero and the closing section — and each
      one sits above a "Coming soon to the App Store" chip to replace
      (`grep -n "Coming soon" index.html`).
- [ ] Confirm the site really is served from `https://ventema.app/`. That URL is
      written into the canonical link, `og:url` and the JSON-LD block; if the
      domain differs, change all three (`grep -n "ventema.app/" index.html`).
- [ ] Check the copyright year and the privacy policy's "Last updated" date.

## Deploying

Any static host serves it as-is. For GitHub Pages, push this folder to a
repository and turn Pages on for the branch root; the three URLs are then
`/`, `/support.html` and `/privacy.html`.
