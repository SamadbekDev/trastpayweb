# Trastbank Homepage — Responsive Test Checklist

Manual QA checklist derived from the adaptive audit plan. Use with DevTools device mode and at least one real iPhone + Android device.

## Scope note

Marketing site (not full internet banking). No login forms, PIN/OTP, transaction tables, cookie banner, or chat in this repo. Auth items below cover header entry points only.

## Viewport matrix (P0 first)

| Width | Device class | Orientation |
|------:|--------------|-------------|
| 320 / 360 | Narrow phone | portrait |
| 375 / 390 / 412 | Standard phone | portrait |
| 768 / 820 | Tablet | portrait + landscape |
| 1024 / 1180 | Tablet landscape / small laptop | — |
| 1280 / 1366 / 1440 | Laptop | — |
| 1920 | FullHD | — |
| 375 @ 200% zoom | Accessibility | — |

Browsers: Safari iOS, Chrome Android, Chrome/Edge desktop, Firefox (smoke on P0).

## Routes

| P | URL | Focus |
|---|-----|--------|
| P0 | `/` | Header drawer, chips scroll, LoanCalculator, CurrencyConverter, Footer |
| P0 | `/kredity/[id]` | Showcase hero, stats, CreditPriceCalculator, steps, CTA |
| P0 | `/kredity/kia` | Brand showcase; no dealers grid |
| P0 | `/vklady/[id]` | DepositCalculator, conditions grid, suggested |
| P0 | `/filialy` | Offices list; map link on mobile |
| P1 | `/kredity`, `/vklady`, `/karty` | Filters, product cards |
| P1 | `/karty/[id]` | Suggested carousel, media |
| P2 | Slow API | PageStatus overlay |

---

## Cross-platform

### Desktop / laptop
- [ ] 1280 / 1440 / 1920: content stays in `max-w-[1440px]`, padding does not break grids
- [ ] 1366×768: credit calculator usable, disclaimer visible
- [ ] 2K/4K at 100–125%: logo sharp (SVG), no extreme empty gaps

### Tablets
- [ ] 768 portrait: hamburger visible (`xl` breakpoint), opens/closes cleanly
- [ ] 1024: nav vs burger, calculator layout, offices map visible
- [ ] Rotate: credit hero titles not clipped

### Phones / safe area
- [ ] Content clear of Dynamic Island / status bar (`viewport-fit=cover` + safe-area padding)
- [ ] Footer / CTAs clear of home indicator
- [ ] Buttons ≥8px from screen edge
- [ ] `document.documentElement.scrollWidth <= innerWidth` at 320–390 (except intentional inner carousels)

---

## Banking-oriented UI

### Auth entry points
- [ ] Home Header «Войти» reachable (icon bar and/or mobile drawer below `sm`)
- [ ] Cards Header mobile drawer includes «Стать клиентом» and «Войти»
- [ ] Deposits Header mobile drawer includes login / become client

### Calculators / sliders
- [ ] LoanCalculator ranges drag with finger; thumb ≥ ~28px; track hit area ~44px
- [ ] CreditPriceCalculator ranges drag without miss-taps
- [ ] DepositCalculator ranges drag without miss-taps
- [ ] Region/brand tabs readable at 320px
- [ ] Calculator CTA visible; `#zayavka` / `#calculator` scroll works
- [ ] Coins background does not cause page horizontal scroll

### Conditions / offices / carousels
- [ ] Deposit conditions: no overlapping text at 768 / 1024
- [ ] Offices: list scrolls; mobile shows «Открыть на карте»
- [ ] Carousels scroll inside section only

### Primary CTAs
- [ ] «Оформить» / «Подать заявку» / «Подробнее» / «Рассчитать» ≥ ~44px tall, fully tappable
- [ ] Not covered by PageStatus loader after load completes

---

## UI / UX stability

### Typography
- [ ] Main card/step body copy ≥ 14px
- [ ] Showcase H1 readable at 320 (scales down from desktop 41px)
- [ ] Long RU/UZ/EN strings in tabs/chips wrap or scroll without clipping

### Media
- [ ] Logo sharp on 2x/3x
- [ ] CMS images do not cause large CLS
- [ ] Calculator coins fill section without overflow

### Navigation
- [ ] Burger `< xl`: open, close, navigate
- [ ] Utility links appear in home Header mobile drawer
- [ ] Lang dropdown does not trap under burger panel permanently

---

## Fixes already applied in code (verify)

| Item | Location |
|------|----------|
| Larger range hit areas (44px) | `app/globals.css` |
| CardsHeader mobile login/CTA | `components/cards/CardsHeader.tsx` |
| Header utility + login in drawer | `components/layout/Header.tsx` |
| DepositConditions responsive grid | `components/deposits/DepositConditions.tsx` |
| Offices mobile map link | `components/deposits/DepositOffices.tsx` |
| Calculator coins `object-cover` | `components/credits/CreditPriceCalculator.tsx` |
| Safe-area + `viewportFit: cover` | `app/layout.tsx` |
| CardSuggested overflow containment | `components/cards/CardSuggested.tsx` |
| Step/stat/filter copy ≥14px | credits/deposits/cards components |

---

## Pass criteria

- **Done:** zero P0 blockers (page overflow, untappable primary CTA, missing mobile login on cards, unusable slider on touch).
- Medium issues logged with route + viewport + screenshot.

## Out of scope (future internet-bank)

- Login/registration forms, keyboard avoidance, autocomplete
- Card/PIN/OTP masking and eye toggle
- Transaction history tables
- Cookie consent + chat vs bottom CTA
- Biometrics / native WebView chrome
