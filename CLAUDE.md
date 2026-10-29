# MLI Digital Ecosystem: Build Brief

Read this fully before writing any code. It is the handoff from a long strategy chat. Decisions marked LOCKED are not up for debate. Ask the user only about items under Open Items.

## Working Rules

- The user is Bobby, Head of Strategy at Lynkrs, building this alone with you. Direct, casual tone. Push back on bad ideas instead of validating.
- Prototype first. Get a clickable thing on screen early, then refine.
- Never use em dashes anywhere (code comments, copy, docs). Use commas, periods, or hyphens.
- All headlines and headings, in UI copy and docs, must be in Title Case. Always.
- Keep output formatting clean and minimal.

## Client And Goal

Client: Misr Life Insurance (MLI, misrlife.com), life arm only. Lynkrs is the agency. The client wants two surfaces:

1. A website: infopage, Investor Relations, intent capture. Traditional insurer look and feel. It has NO buy button.
2. A mobile app called MLI Connect (the Digital Companion): the ONLY channel where a digital purchase can happen. Buy a policy, track it, pay installments, upsell and cross-sell. The FRA requires facial recognition for digital sales, which is why purchase lives in the app and not on the web.

Deadline: demo on 20 Nov 2026 (note: that is a Friday, confirm the date with the client). Sunday 1 Nov is the internal checkpoint, see Phasing.

## Locked Decisions

- Demo device is Bobby's laptop. Build the app as a web app rendered inside a phone frame. Native is out of scope.
- Everything behind the UI is mocked: eKYC, OCR result, liveness, OTP, payments, policy data, claims. UI, state, and flows are real.
- Use the webcam (getUserMedia) for the ID scan and selfie moments so they feel real in the room. The returned data is mocked.
- Bilingual Arabic and English, everywhere. Arabic copy will be supplied later, so ship English first with full RTL support wired in from day one (logical CSS properties, dir attribute, locale switcher). Never bake text into images. Use a matched Arabic and Latin typeface (IBM Plex Sans Arabic with IBM Plex Sans, or similar).
- Website shows ALL products, using placeholder products for now. Do not show premiums on the website (FRA position unknown). Indicative premium estimates exist inside the app only.
- Investor Relations: replicate the structure of the current misrlife.com IR section, including FRA and EGX disclosures, reskinned into the new design. Fetch the current site for structure. Documents are placeholders.
- No mention of a unified cross-product customer data layer anywhere. Cross-sell is driven by the app's own data and user-declared life events.
- MLI is moving from an old identity to a new one. MLI Connect is a younger, more modern, tech-savvy facelift of the mother brand.

## Surfaces And Sitemap

Main website (traditional, trust-first, calm; layout and flow inspired by lemonade.com structure, NOT its art direction):
- Home
- Products (index plus a detail page per placeholder product)
- Investor Relations (Financial Reports, FRA And EGX Disclosures, Governance, Share Information, IR Contact)
- About Us (Company, Leadership, History)
- Partners (Distribution, Bancassurance, Corporate, Become A Partner)
- Contact (intent capture)

Primary CTA across the site is "Get MLI Connect", pointing to the app landing page. Window shopper capture: a "Send Me The App Link" form (phone number, WhatsApp or SMS). Core nav is Products, Investor Relations, About Us, Partners.

MLI Connect landing page (/connect): the Ladder Life reference (ladderlife.com): calm, modern, trust-first, single clear action. QR code on desktop, store badges on mobile, short how-it-works, product teasers, FAQ. The visual jump from the main site must not feel like a different company.

Design pairing: parent site is traditional and trustworthy, the landing page and app carry the younger modern look.

## Brand Direction

Base palette from the transition identity: Mist White #FBFDFB, Mint Green #D6FADF, Soft Aqua #CFF7F7, Icy Blue #DFEDFF, Soft Lavender #EFE3FF, Pale Lilac #FADFFB. These pastels are surfaces and gradients only. Derive a deep ink for text and a confident accent for CTAs that pass WCAG AA contrast, and define everything as design tokens. No logo files exist yet, so use a clean text wordmark placeholder and mark it clearly for replacement.

## The App: MLI Connect

Flows to build (all clickable end to end, mocked data):
1. Onboarding: language, phone number, OTP.
2. eKYC: ID front and back capture, OCR review screen with extracted fields the user confirms, selfie with liveness prompts, biometric enrollment (Face unlock toggle).
3. Choose A Product: three placeholder archetypes (Simple Term Life, Savings Plan, Family Protection Plan), indicative premium calculator, cover picker.
4. Purchase: summary, mock payment, e-signature, policy issued confirmation.
5. My Policy: status, cover, next installment, documents, timeline.
6. Pay Installment: payday-aligned schedule, one-tap pay, saved method, receipt, grace period and one-tap reinstatement, pause option.
7. Claims: intake form, document upload, status tracking only (adjudication is client ops, never promise digital claims).
8. Goals Tracker: track-only goals (marriage, kids school, car) with the policy shown as one tool. The app never holds user money.
9. Family Vault: store documents and beneficiaries, invite a beneficiary to view the policy details (second user per policy, referral loop: "Protect Your Parents").
10. Life Event Check-In: prompts every 6 months ("Anything changed?" married, baby, new job) that triggers cross-sell cards.
11. Notifications center showing the cadence design below.

## The Dead App Problem

Bobby's core worry: the app goes dead after purchase. Honest framing, which the strategy deck must use: this is a pulse app, not a habit app. Design every screen around the cadence:
- Daily or weekly: almost nothing. Only soft hook is the goals tracker.
- Monthly: installment payment, the reliable pulse. Make it frictionless and rewarding.
- Every 6 months: life event check-in, the cross-sell engine.
- Yearly: renewal, annual statement, beneficiary review.
- Once: claims, where trust is made or lost.

Success metrics to pitch (not vanity engagement): on-time payment rate, persistency at month 13 and 25, policies per user, cross-sell conversion, cost per acquired policy versus the agent channel. The app fixes lapse caused by forgetting and friction, not by affordability.

Target user: digital-first, will not talk to a broker, will not visit a branch, may not consider life insurance at all. The first product must feel small, fast, emotional. The app converts demand, it does not create it.

## Recommended Stack

- One Next.js project (App Router) with TypeScript and Tailwind. Route groups: (site) for the main website, (connect) for the landing page, (app) for the phone-frame demo.
- next-intl for i18n, RTL via logical properties, locale-aware fonts.
- Mock data in typed JSON and a small client state store (Zustand). No real backend.
- Real eKYC vendor is out of scope. For the deck, the recommended vendor category is an FRA-approved local provider (Digified has FRA approval for eKYC and e-contracting for NBFIs, Valify is another local option). Needs confirmation of what the client's IT (Dot IT) already uses.
- Deploy to Vercel for a shareable link as a backup to the laptop demo.

## Phasing

Bobby wants "the full thing" by Sunday 1 Nov. Four days, one person. Deliver a complete skeleton by then, not a polished product:

- By Sunday 1 Nov: every page and every app flow exists and clicks through with placeholder content, tokens and layout system done, RTL wired, site structure and sitemap final. Plus a strategy pack: sitemap with page purposes, app journey map, brand direction, and scope lock.
- 2 to 10 Nov: polish the app flows, microinteractions, webcam moments, empty and error states.
- 11 to 17 Nov: website polish, IR content, landing page, Arabic copy integration, QA across both languages.
- 18 to 20 Nov: buffer and rehearsal. Do not plan work here.

Get the user to confirm in writing with the client that Nov 20 means a full-fidelity demo on mocked backends, not a launch-ready product.

## Open Items

- Current site URL and structure for IR (assume misrlife.com, verify).
- Mother brand logo files and guidelines: none exist yet.
- Real product list and premium logic: placeholders for now.
- Whether the website may show indicative premiums: FRA position unknown, default is no.
- Arabic copy and legal terminology validation: later, owner TBD.
- Confirm 20 Nov demo date (it is a Friday).
- Existing docs in the Misr Insurance project on claude.ai: products and offerings research, website requirements deck for the CEO, website user flows and psychology, an Egyptian Arabic website copy deck, and a pre-IPO brand strategy research pack. Read them before designing. They may supersede assumptions in this brief, especially on Arabic copy and the sitemap, so flag any conflict to the user instead of silently picking one.

## First Move

Scaffold the Next.js project, set up tokens, the locale and RTL switch, and the phone-frame shell. Then build the happy-path purchase flow (flows 1 to 4) as the first clickable slice before anything else, since it is the riskiest and the most impressive part of the demo.

## Decisions Since Handoff

- 28 Oct: Keep Maash Bokra as a real product. It is the Savings Plan archetype in the app and appears on the website. The other products stay placeholders.
- 28 Oct: The previous single-file prototype lives at `legacy/index.html` for copy and structure reference. It is not the build.
- 28 Oct: Static export (no server), so the same build runs on the laptop and on GitHub Pages as the backup link. Vercel is still an option.
- 28 Oct: Locale switches client side (next-intl provider plus a Zustand store), no locale in the URL. Arabic in `messages/ar.json` is a draft for RTL testing and falls back to English per key.
- 29 Oct: Browse first, verify last. Users see products and an indicative price before phone, OTP and eKYC; verification starts at "Choose This Cover" and the summary reprices from the ID age. (Marketing council round 1, docs/council/.)
- 29 Oct: The app is channel-inclusive: an optional advisor or partner code at summary credits agents, banks and partners. Never frame the app as replacing agents.
- 29 Oct: Effects must use block bodies. Newer Chromium returns a Promise from window.scrollTo, and an expression-bodied effect that returns one crashes navigation.
