# Marketing Site — UI Kit

A high-fidelity, interactive recreation of the **Revolut public marketing
canvas**: the two-mode (black ↔ white) magazine-spread page with an oversized
hero, a product mockup, feature grid, subscription plans, FAQ and footer.

> Recreation for prototyping — not affiliated with Revolut Ltd, and not the
> brand's production code. Built from the token + component analysis in the
> project root (`../../README.md`, `../../colors_and_type.css`).

## Run it

Open `index.html`. It's a single-page React (Babel-in-browser) click-thru.

**Interactions wired up:**
- **Nav tabs** (Personal / Business / Company) swap the hero headline, lead, CTA and sub-nav pills.
- **Get started / Log in / Choose plan** open the **signup modal** (email + password → success state).
- **Billing toggle** (Annual / Monthly) re-prices the plan grid.
- **FAQ accordion** expands one row at a time.
- Responsive: nav collapses to a hamburger and the phone mockup hides < 1024px.

## Files

| File | Role |
|---|---|
| `index.html` | App shell — loads tokens, `kit.css`, the icon sprite, React + Babel, mounts `<App>` and the `SubNav`. |
| `kit.css` | All component styles, keyed to the root design tokens. |
| `components-core.jsx` | `Icon` (sprite `<use>`), `Button` (variant/size), `Logo`. |
| `NavBar.jsx` | Sticky 64px black nav — tabs, language, log-in, primary CTA, mobile burger. |
| `Hero.jsx` | `Hero` band + `PhoneMockup` (recreated app-home screen used as the hero object). |
| `Sections.jsx` | `FeatureGrid`, `PlanGrid` (billing toggle + cobalt featured tier), `FAQ`, `Footer` (download tiles + columns), `SignupModal`. |

## Component coverage

NavBar · primary/dark/soft/outline/pill buttons · hero band · product (phone)
mockup · sub-nav pills · feature cards · plan cards + featured (cobalt
inversion) · billing toggle · FAQ accordion · download tiles · footer ·
text inputs · signup modal. Icons come from the shared `assets/icons.svg`
sprite via `assets/icons-sprite.js`.

## Conventions

- Styling is **className-based** against the root token CSS — no JS style
  objects (avoids global-scope collisions across Babel files).
- Each component file exports to `window` via `Object.assign` so the files
  share scope at runtime.
- Accent colors appear on **icons only**, never on button surfaces — per the
  brand rules in the root README.

## Known gaps / notes

- The hero "product photography" is a **CSS app-screen recreation**, not a
  licensed Revolut photo asset. Swap in real product imagery for production.
- Display type uses **Hanken Grotesk** (Aeonik Pro substitute). See the root
  README "Font substitution" note.
- Logged-in app surfaces are out of scope (marketing canvas only).
