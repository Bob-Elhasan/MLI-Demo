# MLI Digital Ecosystem: Strategy Pack

Prepared by Lynkrs for Misr Life Insurance (life arm). Working draft, 28 Oct 2026. Demo date: 20 Nov 2026 (to confirm with the client).

## The Short Version

Misr Life wants two digital surfaces. The first is a website: a calm, traditional, trust-first home for products, Investor Relations and intent capture. It has no buy button. The second is MLI Connect, a mobile app that is the only place a policy can be bought digitally. Purchase lives in the app and not on the web because the FRA requires facial recognition for digital sales, and a phone with a front camera is where that check works reliably. The website's job is to build trust and send people to the app. The app's job is to convert, then keep the policy alive through a small number of well-timed moments: monthly payment, a six-monthly life check-in, yearly renewal, and claims when they happen.

## What Is In This Pack

| File | What It Answers |
| --- | --- |
| [sitemap.md](sitemap.md) | Every page on the website and `/connect`, its purpose, audience, the one action it drives, content blocks and CTA. The "Get MLI Connect" funnel and the "Send Me The App Link" capture. |
| [app-journey-map.md](app-journey-map.md) | All 11 MLI Connect flows mapped to stages, goals, screens, emotions and friction removed. The pulse cadence and the success metrics we pitch. |
| [brand-direction.md](brand-direction.md) | Transition identity, palette and roles, computed contrast ratios, typography, the parent and app pairing, voice and tone, logo status, do and don't rules. |
| [scope-lock.md](scope-lock.md) | What the 20 Nov demo is and is not, eKYC vendor recommendation, phasing, open items, and a ready-to-send confirmation email. |
| [deck-outline.md](deck-outline.md) | A 15-slide outline for the strategy deck. |

## Scope Lock Summary

- The 20 Nov deliverable is a full-fidelity, clickable demo on mocked backends. It is not a launch-ready product.
- Mocked: eKYC, OCR result, liveness, OTP, payments, policy data, claims. Real: the UI, state, flows, and the webcam moments for the ID scan and selfie.
- Runs on Bobby's laptop as a web build, with the app rendered in a phone frame. A static export doubles as a backup link (GitHub Pages, Vercel optional).
- Bilingual Arabic and English with full RTL. English copy ships first, Arabic copy is integrated in the 11 to 17 Nov window.
- The website shows all products and no premiums. Indicative premiums exist inside the app only.
- Maash Bokra is the one real product (the Savings Plan archetype). Simple Term Life and Family Protection Plan are placeholders.
- No unified cross-product customer data layer is proposed or implied. Cross-sell runs on the app's own data and life events the user declares.
- Claims in the app are intake and status tracking only. Adjudication stays with Misr Life's claims team.

Full detail in [scope-lock.md](scope-lock.md).

## Where The Build Stands Today

- Done: project scaffold, design tokens, locale and RTL switch, phone-frame shell with presenter controls, and app flows 1 to 4 (onboarding, eKYC with webcam, choose a product with indicative calculator, purchase through policy issued).
- In progress in parallel: app flows 5 to 11, the full website, and the `/connect` landing page. Those sections of this pack describe the planned design from the brief, not finished screens.
