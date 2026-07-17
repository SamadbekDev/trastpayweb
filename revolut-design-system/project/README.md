# Revolut Design System

A design system for recreating **Revolut's public marketing surfaces** — the
high-contrast, magazine-spread marketing canvas the fintech brand is known for.
This package gives a design agent everything needed to produce on-brand
interfaces, slides, and assets: color + type foundations, component specs, an
icon set, and a high-fidelity UI kit recreation of the marketing site.

> **Scope note.** This system documents the **public marketing canvas only**
> (home, product, pricing/plans, FAQ, footer). Logged-in app surfaces
> (transactions, transfers, account settings) are intentionally out of scope —
> they are product-photography / native-app territory, not part of the
> marketing design language captured here.

> **Provenance / "inspired by".** This is an *analysis-led recreation* built
> from a public design breakdown, not a copy of Revolut's proprietary code or
> assets. Treat it as a faithful interpretation of the brand's marketing visual
> language for prototyping and internal design exploration.

---

## Sources

Built from the design analysis in the **VoltAgent `awesome-design-md`** corpus:

- **Repo:** https://github.com/VoltAgent/awesome-design-md (`main`)
- **Subtree used:** [`design-md/revolut/`](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/revolut)
  - `DESIGN.md` — full token + component extraction (colors, type, spacing, radii, components, do/don'ts).
  - `README.md` — pointer to the hosted analysis at https://getdesign.md/revolut/design-md
- **Hosted analysis (previews, dark-mode examples):** https://getdesign.md/revolut/design-md

If you have access, explore the repo above to go deeper than this package and
refine recreations further. No proprietary Revolut source or Figma was used or
is required.

---

## The brand in one paragraph

Revolut's marketing canvas runs a **two-mode system**: a true-black (`#000000`)
*storytelling canvas* that hosts oversized headlines, full-bleed product
mockups, and the plans grid — alternating with white (`#ffffff`) *catalogue
bands* that host comparison tables, FAQs, and download tiles. Bands slam
against each other full-bleed (no soft transitions) to create the magazine
rhythm. Display type is set in **Aeonik Pro 500** from 20px up to a 136px hero,
with `line-height: 1.0` and large negative tracking; body type is **Inter 400**.
The single brand stamp is **cobalt violet `#494fdf`**, used scarcely — the
loudest action on the page is actually a **white pill on black**, not the
cobalt. A wide secondary palette (teal, light-blue, deep-pink, light-green,
warning orange, yellow) lives *only inside product illustrations and icons* —
never as button surfaces.

---

## CONTENT FUNDAMENTALS

How Revolut writes on its marketing surfaces.

**Voice & person.** Direct second person — "you", "your money", "your plan".
The brand speaks *to* the reader about *their* money, never about itself in
abstract. Verbs lead: "Send", "Spend", "Save", "Get started", "Join".

**Tone.** Confident, plain-spoken, benefit-first. Premium without being
flowery; precise without being cold. No hype words, no exclamation marks, no
jargon. A claim is stated as fact and backed by a number.

**Casing.** **Sentence case everywhere** — headlines, buttons, nav, labels.
Title Case and ALL CAPS are avoided. Buttons read "Choose your subscription",
"Get started", "Learn more" — never "GET STARTED".

**Numbers as proof.** Big, specific, numeric claims carry the marketing:
"Join the 70+ million using Revolut", "Spend in 150+ currencies",
"In 30+ countries". Numbers are written as digits with a `+` for "and more".

**Headlines.** Short, punchy, often two or three words at hero scale
("Banking & Beyond"). Sub-heads expand the promise in one calm sentence of
`body-lg`.

**Buttons / CTAs.** Imperative and concrete. Primary: "Choose your
subscription", "Get started". Secondary: "Learn more", "Compare plans",
"View FAQs". Never generic ("Click here", "Submit").

**Emoji.** **Not used** in marketing copy. Meaning is carried by type,
photography, and the accent-colored product illustrations — not emoji.

**Disclosure / fine print.** Regulatory and legal copy sits in `caption`
(13px) in the footer, muted (`on-dark-mute`), factual and unembellished.

**Vibe.** "Fintech-meets-product-brochure." It should feel like a confident
consumer product brand that happens to be a bank — editorial, spacious,
photography-led, never busy.

*Examples to model:* `"Banking & Beyond"` · `"Join the 70+ million using
Revolut"` · `"Spend, save and invest — all in one app"` ·
`"Choose your subscription"` · `"Get started"`.

---

## VISUAL FOUNDATIONS

**Two-mode canvas.** Everything is built on the black ↔ white band rhythm.
Storytelling = true black `#000000` (never near-black). Browsing/catalogue =
white `#ffffff`. Transitions are hard full-bleed band cuts, not gradients.

**Color.** Cobalt violet `#494fdf` is the *only* brand color and appears
scarcely — featured plan card, brand wordmark, occasional secondary CTA in
white bands. The wide accent palette (teal, light-blue, deep-pink,
light-green, warning orange, yellow, brown, danger red) is **illustration- and
icon-only** — never a button surface. Text on light uses warm near-blacks
(`ink #191c1f`, `body #1f2226`) down a 7-step grey ladder to `faint`.

**Type.** Display in Aeonik Pro 500 (substituted by Hanken Grotesk here),
20–136px, `line-height: 1.0` on display sizes, negative tracking that scales
with size (bigger = tighter). Body in Inter 400 with *positive* tracking
(`0.24px`) for a slightly mechanical, fintech-precise feel. Body weight is only
ever 400 or 600 — never the in-between 500.

**Spacing.** 4px base. Bands breathe at 88px (`section`) to 120px (`band`)
vertical. Card interior padding is a consistent 32px (`xxl`). Generous,
editorial whitespace so 80–136px headlines register without crowding.

**Backgrounds.** Solid color-blocked bands — **no gradients** as background
washes, **no textures, no patterns**. The only "imagery" is full-bleed
**product mockups** (phones, cards, POS terminals) shown as hero objects inside
dark sections, carrying their own atmospheric lighting. Lifestyle photography
is rare.

**Elevation & shadows.** **No drop-shadow language at all.** Depth comes from
(1) color-blocking light↔dark band switches and (2) surface-luminance steps in
dark mode: `canvas-dark #000` → `surface-elevated #16181a`. The dark surface
ladder has only two steps. Cards never float on shadows.

**Borders / hairlines.** 1px hairlines replace shadows. `hairline-light
#e2e2e7` on white; `hairline-dark rgba(255,255,255,.12)` on dark;
`hairline-strong #191c1f` for structural dividers and light-card outlines.

**Corner radii.** Buttons/pills/badges = `full` (9999px). Feature & plan cards
= `lg` (20px). Inputs & download tiles = `md` (12px). Product-mockup containers
= `xl` (28px). Hero bands, sections, footer = `none` (0px). Phone mockups carry
`xl` device-chrome corners; card mockups `lg`.

**Buttons.** Pill-shaped, 48px tall (exceeds WCAG AAA touch). The signature is
`button-primary`: a **white pill with black label** on dark canvas — the
brightest pixel and loudest action. Reverse is `button-dark` (black pill on
white). Softer tiers: `button-soft`, `button-outline-light/-dark`,
`button-pill-sm` (36px chips).

**Hover / press.** Hover = a subtle surface tint (white pill → light grey;
black pill → `#1f2226`; soft → `#e8e8ec`; outline → faint fill). Press =
darker still (`button-primary-pressed` uses `faint #c9c9cd`). No scale/transform
bounce; transitions are short (~180ms) color fades. The brand is calm, not
springy.

**Transparency / blur.** Used sparingly — `on-dark-mute rgba(255,255,255,.72)`
for secondary dark-mode text and `hairline-dark` for low-contrast dividers.
No frosted-glass / backdrop-blur panels in the marketing canvas.

**Imagery vibe.** Product mockups are crisp, well-lit, color-true (the
accent-colored card faces and app screens pop against true black). Not warm,
not B&W, not grainy — clean studio lighting with the device's own glow as the
only atmosphere.

**Layout.** Max content width ≈1200px on body sections; hero and mockup bands
run full-bleed. Plan grid 4-up (→2-up tablet →1-up mobile). Feature grid 3-up
(→2→1). Nav bar 64px tall, collapses to hamburger <1024px with wordmark + primary
CTA anchored.

**Animation.** Restrained. Short color-fade transitions on interactive states;
no large entrance animations, parallax, or bounce in the core marketing
language. Motion serves clarity, not spectacle.

---

## ICONOGRAPHY

**Approach.** Revolut's marketing iconography is a clean, **geometric
line/duotone** style — consistent stroke weight, rounded joins, simple
finance-domain metaphors (card, wallet, transfer, exchange, crypto, stocks,
shield/security). Icons frequently appear in the **accent palette** (teal,
pink, light-green, etc.) inside product illustrations, while UI-chrome icons
(nav, chevrons, close) sit in `ink` on light / `on-dark` on dark.

**This package's icon set.** Revolut's proprietary marketing icons could not be
sourced from the markdown-only analysis repo, so this system ships a **custom,
brand-matched icon set** at `assets/icons.svg` — an SVG sprite of ~22
fintech-domain glyphs drawn on a 24×24 grid with a **2px stroke, round caps and
joins**, `currentColor` fill so they inherit text/accent colors. Use it via
`<svg><use href="assets/icons.svg#icon-card"></use></svg>`. See
`preview/icons-*.html` for the full grid.

**CDN fallback.** Where the custom set lacks a glyph, **Lucide**
(https://lucide.dev) is the recommended match — same clean 2px rounded-stroke
character — loadable from CDN. Flagged as a substitution since it is not
Revolut's own set.

**Emoji & unicode.** Not used as iconography anywhere in the marketing canvas.
Meaning is carried by the drawn icon set and product photography.

**Logo.** A brand wordmark recreation lives at `assets/logo-wordmark.svg`
(light + dark variants) and the standalone "R" glyph at `assets/logo-glyph.svg`.
These are *recreations* for prototyping, not the official trademark artwork.

---

## Index / Manifest

Root files:

| File | What it is |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography, manifest. |
| `colors_and_type.css` | All color, type, spacing, radius tokens as CSS vars + semantic type classes + button/badge primitives. |
| `SKILL.md` | Agent-Skills-compatible entry point (for use in Claude Code). |
| `assets/` | Logos (wordmark + glyph, light/dark), the `icons.svg` sprite, sample product-mockup placeholders. |
| `preview/` | Small HTML cards that populate the Design System tab (colors, type, spacing, components, icons). |
| `ui_kits/marketing-site/` | High-fidelity, interactive recreation of the Revolut marketing site. |

UI kits:

- **`ui_kits/marketing-site/`** — the public marketing canvas. `index.html` is
  an interactive click-thru (nav → hero → features → plans → FAQ → footer) built
  from modular JSX components (`NavBar`, `Hero`, `FeatureGrid`, `PlanGrid`,
  `FAQ`, `Footer`, `Button`, etc.). See its own `README.md`.

---

## Font substitution (action needed)

**Aeonik Pro is proprietary and is not bundled.** Display type is currently
substituted with **Hanken Grotesk** (Google Fonts — closest free geometric
match). Per the source analysis, **General Sans**, **Inter Display**, or
**Söhne** are also credible substitutes. To restore exact fidelity, drop the
licensed Aeonik Pro web fonts into `fonts/` and update `--font-display` in
`colors_and_type.css`. Body type (**Inter**) is already the real, open-source
family.
