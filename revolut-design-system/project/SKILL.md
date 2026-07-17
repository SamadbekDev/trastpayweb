---
name: revolut-design
description: Use this skill to generate well-branded interfaces and assets for Revolut, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

This skill recreates the **Revolut marketing canvas** design language — a
two-mode (true-black ↔ white) system with oversized Aeonik Pro display type,
Inter body, a single cobalt-violet (`#494fdf`) brand stamp, pill buttons, and
full-bleed product mockups.

## What's here

- `README.md` — brand context, content fundamentals, visual foundations, iconography, and a file manifest. **Start here.**
- `colors_and_type.css` — all color / type / spacing / radius tokens as CSS vars, plus semantic type classes and button/badge primitives. Link or copy this into any artifact.
- `assets/` — logo wordmark + glyph (light/dark), the `icons.svg` sprite, and `icons-sprite.js` (self-injecting; lets you use `<svg><use href="#icon-card"></use></svg>` anywhere).
- `preview/` — small specimen cards for every foundation and component.
- `ui_kits/marketing-site/` — a high-fidelity, interactive React recreation of the marketing site (nav, hero + phone mockup, features, plans, FAQ, footer, signup modal). Lift components from here.

## How to use it

If creating **visual artifacts** (slides, mocks, throwaway prototypes):
copy assets out (`colors_and_type.css`, `assets/icons-sprite.js`, the logos) and
create static HTML files for the user to view. Reuse the UI-kit components as a
starting point rather than rebuilding from scratch.

If working on **production code**: copy the assets and read the rules in the
README to become an expert in designing with this brand — match the two-mode
band rhythm, keep cobalt scarce, pill buttons, accent colors on icons only, no
drop shadows.

If the user invokes this skill **without other guidance**, ask them what they
want to build or design, ask a few focused questions (surface, audience,
light/dark, how many variations), then act as an expert designer who outputs
HTML artifacts _or_ production code, depending on the need.

## Non-negotiables (see README for the full list)

- True black `#000000`, never near-black, for the storytelling canvas.
- Cobalt violet `#494fdf` is the only brand color — used scarcely (featured plan, wordmark).
- The loudest CTA is a **white pill on black**, not the cobalt.
- Accent palette (teal, pink, light-green, etc.) lives in illustrations/icons only — never as button surfaces.
- Display = Aeonik Pro 500 (substituted with Hanken Grotesk here); body = Inter 400/600. No shadows — depth is color-blocking + surface luminance.

## Font note

Aeonik Pro is proprietary and not bundled; display type is substituted with
**Hanken Grotesk** via Google Fonts. Drop licensed Aeonik Pro files into a
`fonts/` folder and update `--font-display` for exact fidelity.
