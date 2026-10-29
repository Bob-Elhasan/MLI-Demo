// Website product catalogue. Maash Bokra is a real MLI product kept by decision, the rest are placeholders.
// The website never shows premiums or prices. Copy lives in messages/site.*.json under site.products.items.<key>.

import type { PictureKey } from "./pictures";

export type SiteProductKey = "maashBokra" | "termLife" | "familyProtection" | "education" | "creditLife" | "groupLife";

export type Need = "retire" | "family" | "education" | "business";

export type SiteProduct = {
  slug: string;
  key: SiteProductKey;
  /** Who buys it: individuals buy in MLI Connect, businesses talk to the corporate team */
  audience: "individual" | "business";
  /** Where it is bought. "app" means MLI Connect, the only digital purchase channel */
  channel: "app" | "adviser" | "business";
  needs: Need[];
  /** Field colour for the product page head */
  field: "mint" | "aqua" | "icy" | "lavender" | "lilac";
  picture: PictureKey;
  placeholder: boolean;
  /** The matching product in the MLI Connect app, so a choice made here opens there */
  appId?: "term-life" | "maash-bokra" | "family-protection";
  /** Number of key-term rows and FAQ entries in the copy deck */
  terms: number;
  faqs: number;
};

export const siteProducts: SiteProduct[] = [
  { slug: "maash-bokra", appId: "maash-bokra", key: "maashBokra", audience: "individual", channel: "app", needs: ["retire"], field: "lavender", picture: "nileboats1900", placeholder: false, terms: 6, faqs: 4 },
  { slug: "simple-term-life", appId: "term-life", key: "termLife", audience: "individual", channel: "app", needs: ["family"], field: "mint", picture: "cairostreet1900", placeholder: true, terms: 5, faqs: 3 },
  { slug: "family-protection", appId: "family-protection", key: "familyProtection", audience: "individual", channel: "app", needs: ["family", "education"], field: "aqua", picture: "nileskyline", placeholder: true, terms: 5, faqs: 3 },
  { slug: "education-plan", key: "education", audience: "individual", channel: "adviser", needs: ["education"], field: "icy", picture: "muskistreet1900", placeholder: true, terms: 5, faqs: 3 },
  { slug: "loan-and-credit-protection", key: "creditLife", audience: "business", channel: "business", needs: ["business"], field: "lilac", picture: "qasralnilbridge", placeholder: true, terms: 5, faqs: 3 },
  { slug: "group-life", key: "groupLife", audience: "business", channel: "business", needs: ["business"], field: "mint", picture: "nilecorniche", placeholder: true, terms: 5, faqs: 3 },
];

export const getSiteProduct = (slug: string) => siteProducts.find((p) => p.slug === slug);

export const needs: Need[] = ["retire", "family", "education", "business"];
