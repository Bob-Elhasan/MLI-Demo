# Scope Lock

## What The 20 Nov Demo Is

- A full-fidelity, clickable demo of three surfaces: the main website, the MLI Connect landing page (`/connect`), and the MLI Connect app.
- Run from Bobby's laptop as a web build. The app is a web app rendered inside a phone frame, with presenter controls beside it.
- Every page and every app flow clicks through end to end with real UI, real state and real navigation.
- Bilingual Arabic and English with full RTL, switchable live in the room.
- The webcam is real: the ID scan and the selfie use the laptop camera so those moments feel real. A sample image fallback keeps the demo moving if the camera fails.
- Mocked behind the UI: eKYC, OCR result, liveness, OTP, payments, policy data, claims.
- A static export of the same build is published as a backup link (GitHub Pages, Vercel as an option).

## What It Is Not

- Not launch-ready. No production hosting, security review, load testing or app store submission.
- No real vendor integrations: no eKYC vendor, no SMS gateway, no payment gateway, no core insurance system.
- No real premiums. Prices in the app are indicative and come from a mocked curve.
- No premiums on the website at all. The FRA position on showing indicative premiums online is unknown, so the default is no.
- No digital claims adjudication. The app takes claim intake and shows status. Decisions stay with Misr Life's claims team, and the app never promises a decision or payout time.
- No unified cross-product customer data layer. Cross-sell runs on the app's own data and life events the user declares. This is not mentioned anywhere, in the build or the deck.
- No native app. Native iOS and Android are out of scope.
- The app never holds user money. Goals are track-only.

## eKYC Vendor Recommendation (For The Deck)

- Category: an FRA-approved local eKYC provider, so identity verification and e-contracting meet the FRA requirement for digital sales from day one.
- Digified: has FRA approval for eKYC and e-contracting for non-bank financial institutions (to verify current approval scope before the deck goes out).
- Valify: another local option to evaluate alongside.
- First step: confirm what the client's IT partner, Dot IT, already uses or has contracted. If something is already in place and approved, reuse beats a new procurement.
- The demo does not depend on the choice. The eKYC screens are vendor-neutral and map to what these providers return (ID fields, liveness result, face match score).

## Phasing

| Window | Dates | Deliverable |
| --- | --- | --- |
| Skeleton | By Sunday 1 Nov 2026 | Every page and every app flow exists and clicks through with placeholder content. Tokens and layout system done. RTL wired. Site structure and sitemap final. This strategy pack. |
| App polish | 2 to 10 Nov | App flows polished: microinteractions, webcam moments, empty and error states, the cadence story in Notifications. |
| Website and language | 11 to 17 Nov | Website polish, IR content, landing page, Arabic copy integration, QA across both languages. |
| Buffer and rehearsal | 18 to 20 Nov | No planned work. Rehearse the demo script, fix only what breaks. |

Status on 28 Oct: scaffold, tokens, RTL switch, phone frame and app flows 1 to 4 are built. Flows 5 to 11, the website and `/connect` are in progress.

## Open Items

| Item | Default Until Resolved | Owner |
| --- | --- | --- |
| Confirm 20 Nov 2026 as the demo date (it is a Friday) | Plan to 20 Nov | Bobby with client |
| Confirm the demo is on mocked backends, not a launch | Treat as demo | Bobby with client |
| Current site URL and IR structure | Assume misrlife.com, verify against the live IR section | Lynkrs |
| Listing status for Share Information (earlier material says preparing to list on EGX, to verify) | Show status and ownership, hide price module | Client legal |
| Mother brand logo files and guidelines | Text wordmark placeholder | Client |
| Real product list and premium logic | Maash Bokra real, others placeholders, mocked pricing | Client product team |
| Maash Bokra parameters (earlier material: age 18 to 59, minimum premium EGP 500, minimum term 5 years, to verify) | Use as placeholders in the app | Client product team |
| Whether the website may show indicative premiums | No | Client compliance, FRA position |
| Policy terms shown in the app (grace period length, cooling-off period, pause rules) | Placeholder values, clearly mocked | Client product and legal |
| Arabic copy and legal terminology validation | Draft Arabic for RTL testing, falls back to English | TBD |
| Which eKYC vendor Dot IT already uses | Recommend FRA-approved local provider category | Client IT (Dot IT) |
| Existing research docs in the Misr Insurance project on claude.ai (products research, CEO website requirements deck, user flows and psychology, Egyptian Arabic copy deck, pre-IPO brand strategy pack) | Read before design is final; flag any conflict with this pack | Bobby |
| Agent channel cost data for the cost-per-policy comparison | Leave the comparison as a method, no numbers | Client finance |

## Confirm In Writing With The Client

Two things need to be in writing before the build goes further: the date, and what "demo" means.

Ready-to-send email:

> Subject: MLI Digital Ecosystem: Confirming The 20 Nov Demo
>
> Hi [Name],
>
> A quick confirmation so we are aligned on the date and the scope.
>
> 1. Date: we are planning the demo for Friday 20 November 2026. Please confirm the day works, or let us know if you meant a different date.
>
> 2. Scope: on 20 Nov we will show a full-fidelity, clickable demo of the new website, the MLI Connect landing page and the MLI Connect app, in Arabic and English. Every screen and flow will work end to end, and the ID scan and selfie will use a real camera. Everything behind the screens (identity verification, OTP, payments, policy data and claims) will be simulated. It is a demo of the experience, not a launch-ready product, and it will not be connected to any of your live systems.
>
> If that matches your expectation, a short reply confirming both points is all we need.
>
> Thanks,
> Bobby
> Head of Strategy, Lynkrs
