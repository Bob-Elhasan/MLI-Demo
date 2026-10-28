# Brand Direction

## The Transition Identity

Misr Life is moving from an old identity to a new one. This work sits inside that transition, so it borrows the new base palette without waiting for the full brand system.

- The mother brand (the website) stays traditional and trustworthy: calm layouts, generous white space, plain statements of fact, heritage used as proof that the company pays.
- MLI Connect (the landing page and the app) is the younger, more modern, tech-savvy facelift of that same brand: brighter gradients, rounder shapes, more motion, warmer and shorter copy.
- One company, two registers. A visitor who taps "Get MLI Connect" should feel the room got brighter, not that they left the building.

## Palette

The six transition pastels are surfaces and gradients only. They never carry text and are never used for buttons.

| Token | Hex | Role |
| --- | --- | --- |
| Mist White | #FBFDFB | Page background on both surfaces |
| Mint Green | #D6FADF | Surface tint, gradient stop, protection products |
| Soft Aqua | #CFF7F7 | Surface tint, gradient stop, family products |
| Icy Blue | #DFEDFF | Surface tint, gradient stop, IR and information bands |
| Soft Lavender | #EFE3FF | Surface tint, gradient stop, savings products (Maash Bokra) |
| Pale Lilac | #FADFFB | Gradient accent, used sparingly |

Derived tokens for text and action:

| Token | Hex | Role |
| --- | --- | --- |
| Ink | #1F1A22 | Headings and body text |
| Ink 2 | #34293A | Secondary headings, strong UI text |
| Muted | #5F5A66 | Captions, helper text, metadata |
| Accent | #006660 | Primary buttons, links, focus ring, active states |
| Accent Strong | #004D48 | Button hover and pressed, emphasis on pastel surfaces |

Supporting tokens in the build: paper #FFFFFF, fill #F3F6F5, accent soft #E3F3EF, plus success, warning and danger pairs. All tokens are defined once in `app/globals.css`.

## Contrast Ratios (WCAG 2.1, Computed)

Computed with the standard relative luminance formula. AA needs 4.5:1 for body text and 3:1 for large text and UI components. AAA needs 7:1 for body text.

| Foreground | On Mist | On White | On Mint | On Aqua | On Icy | On Lavender | On Lilac |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ink #1F1A22 | 16.72 | 17.09 | 15.13 | 14.89 | 14.40 | 13.91 | 13.84 |
| Ink 2 #34293A | 13.48 | 13.78 | 12.20 | 12.01 | 11.61 | 11.22 | 11.16 |
| Muted #5F5A66 | 6.54 | 6.69 | 5.92 | 5.83 | 5.63 | 5.44 | 5.42 |
| Accent #006660 | 6.69 | 6.84 | 6.06 | 5.96 | 5.76 | 5.57 | 5.54 |
| Accent Strong #004D48 | 9.53 | 9.74 | 8.63 | 8.49 | 8.21 | 7.94 | 7.89 |

Buttons:

- White text on Accent: 6.84:1 (AA for all text sizes).
- White text on Accent Strong: 9.74:1 (AAA).
- Mist text on Accent: 6.69:1.

What this means:

- Every text token passes AA on every surface in the palette, including the darkest pastel.
- Ink and Ink 2 pass AAA everywhere. Accent Strong passes AAA everywhere. Muted and Accent pass AA but not AAA, so they stay out of long body copy.
- The pastels against Mist range from 1.10:1 (Mint) to 1.21:1 (Lilac). That confirms the rule: pastels cannot be text, icons or borders that carry meaning. Use a hairline or a shadow to separate a pastel card from the page.

## Typography

- Latin: IBM Plex Sans. Arabic: IBM Plex Sans Arabic. Self-hosted, with the Arabic face set as the primary family when the page language is Arabic.
- Why a matched pair: the product is bilingual on every screen, and mixed lines are common (an Arabic sentence with an English product name, a policy number, an amount in EGP). The two Plex faces were drawn as one family, so weights, x-height and color sit together on the same line. Mismatched faces make the Arabic version look like a translation bolted on, which is the opposite of what an Egyptian audience should feel.
- Numbers use tabular figures in amounts, dates and policy numbers so columns line up and values do not jump when they change.
- Arabic needs more line height than Latin. Keep body line height generous and never set Arabic in all caps styles or tight tracking.
- Text is never baked into images, so every string can switch language and direction.

## RTL Rules

- Layout uses logical properties only (start and end, never left and right), so one stylesheet serves both directions.
- The `dir` attribute flips at the root when the language changes. Icons that imply direction (back, forward, progress) mirror. Logos, numbers, phone numbers and media controls do not.
- Sliders and progress fill in the reading direction.

## The Design Pairing

| | Parent Site | /connect And The App |
| --- | --- | --- |
| Feeling | Traditional, trustworthy, calm | Younger, modern, warm |
| Reference | lemonade.com for structure only | ladderlife.com for calm, single-action flow |
| Surfaces | Mist and white, pastels as quiet section tints | Soft multi-stop pastel gradients (mint, lavender, aqua) |
| Shapes | Restrained radii, more straight edges | Larger radii, card stacks, phone visuals |
| Motion | Minimal | Purposeful microinteractions on key moments (scan, match, issued) |
| Copy | Full sentences, factual | Short, second person, emotional where it matters |

What keeps them one company:

- The same wordmark, the same typefaces, the same Ink and Accent on both.
- The same token file. The app does not get its own colors, it uses more of the same pastels.
- The same trust line appears on both: FRA licence and Misr Life as the parent.
- The parent site already uses the pastels as section tints, so the gradients on `/connect` feel like a step up in volume, not a new palette.

## Voice And Tone

One voice: a calm, competent person who explains things plainly and does not push.

English:

- Short sentences, second person, active voice.
- Say what happens, not how great it is. "Your policy is active" beats any adjective.
- Be honest about limits: "Indicative premium. Final price is confirmed after your application is reviewed."
- In hard moments (claims, missed payments) be direct and kind. No exclamation marks.

Egyptian Arabic:

- Modern Egyptian Arabic for the app and `/connect`: warm, conversational, the way a trusted relative who works in finance would explain it. The legacy prototype already uses this register (for example "حماية بتدفع وقت الحاجة").
- A more formal register for Investor Relations, disclosures, legal terms and policy wording, where precision matters more than warmth.
- Arabic is written, not translated. Lines can differ from English if they read better.
- Legal and insurance terminology needs validation by a qualified reviewer before anything goes live (owner to be named).

Examples of the shift between surfaces:

| Moment | Parent Site | App |
| --- | --- | --- |
| Hero headline | Cover That Pays When It Matters | Protection That Fits In Your Pocket |
| Identity check body | Buying online requires a short identity check with a face scan, as set by the FRA. | It takes about two minutes. Your data is used only to verify you. |
| Issued headline | (not applicable) | You're Covered |

## Logo Status

- No logo files or brand guidelines exist yet for the new identity.
- The build uses a clean text wordmark ("MLI" in a dark tile, then "Misr Life" or "MLI Connect"). It is marked in code as a placeholder for replacement, and should be labelled as such in the deck.
- When files arrive, they replace one component and the favicon. Nothing else changes.

## Do And Don't

Do:

- Use pastels as backgrounds, section tints and gradients.
- Use Ink for text, Accent for one primary action per screen.
- Keep one primary action per screen or section.
- Show the FRA licence and parent company near any moment that asks for trust (identity check, payment).
- Design every screen in Arabic and English and check RTL before calling it done.
- Label every premium as indicative and only inside the app.
- Use Title Case for headings and headlines in English.

Don't:

- Put text, icons that carry meaning, or buttons on a pastel color as the foreground.
- Show premiums or prices on the website.
- Bake text into images.
- Use left and right in layout code, or mirror logos and numbers in RTL.
- Imply a digital claims decision, guaranteed returns on Maash Bokra, or a unified customer data platform.
- Use hype words ("elevate", "seamless", "revolutionize", "unlock") or invented proof (customer counts, testimonials, stats) in any copy.
- Use em dashes in any copy.
