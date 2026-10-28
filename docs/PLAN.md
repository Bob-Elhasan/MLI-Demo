# MLI Build Plan

Working plan for the 20 Nov demo. The brief lives in `CLAUDE.md`, this file tracks how we get there.

## Architecture

- One Next.js App Router project, static export, so it runs off the laptop with zero backend and doubles as a GitHub Pages backup link.
- Route groups: `(site)` for the main website, `(connect)` for `/connect`, `(app)` for the phone-frame demo at `/app`.
- i18n: next-intl in client mode. Locale lives in a Zustand store (persisted), the provider flips `lang` and `dir` on `<html>`. Arabic keys fall back to English until copy lands, so RTL layout can be tested today.
- Styling: Tailwind v4 with design tokens in `app/globals.css`, logical properties only (`ms-`, `pe-`, `start-`), never `left`/`right`.
- Data: typed mock data in `lib/mock/`, one Zustand store for the app journey (`lib/store/journey.ts`).
- Fonts: IBM Plex Sans and IBM Plex Sans Arabic, self-hosted via Fontsource.
- The previous single-file site is kept at `legacy/index.html` as reference for copy and structure.

## Products

| Archetype | Product | Notes |
| --- | --- | --- |
| Simple Term Life | Placeholder | Small, fast, emotional first purchase |
| Savings Plan | Maash Bokra | Real MLI product, kept by decision |
| Family Protection Plan | Placeholder | Cross-sell target after life events |

## Phase 1: Skeleton By Sunday 1 Nov

1. Scaffold, tokens, locale and RTL switch, phone-frame shell. **Done in slice 1**
2. App flows 1 to 4: Onboarding, eKYC with webcam, Choose A Product, Purchase. **Done in slice 1**
3. App flows 5 to 11: My Policy, Pay Installment, Claims, Goals, Family Vault, Life Event Check-In, Notifications.
4. Website skeleton: Home, Products index and detail, Investor Relations (5 sub-pages), About Us, Partners, Contact.
5. `/connect` landing page: QR on desktop, store badges on mobile, how it works, teasers, FAQ.
6. Strategy pack: sitemap with page purposes, app journey map, brand direction, scope lock.

## Phase 2: 2 To 10 Nov, App Polish

Microinteractions, webcam moments, empty and error states, the cadence story in Notifications.

## Phase 3: 11 To 17 Nov, Website And Language

IR content, landing page polish, Arabic copy integration, QA in both languages.

## Phase 4: 18 To 20 Nov

Buffer and rehearsal only.

## Demo Script (Draft)

1. Website home, trust first, "Get MLI Connect".
2. `/connect`, scan the QR.
3. App: language, phone, OTP, ID scan on the webcam, OCR review, selfie liveness, Face unlock.
4. Pick Maash Bokra or Simple Term Life, slide the cover, see the indicative premium.
5. Pay, sign, policy issued.
6. Fast forward: installment due, one-tap pay, life event check-in triggers a cross-sell card.

## Open Items

See `CLAUDE.md`. Biggest one: confirm 20 Nov (a Friday) with the client in writing.
