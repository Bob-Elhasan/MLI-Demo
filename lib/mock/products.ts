// Placeholder products, except Maash Bokra which is a real MLI product kept by decision.
// Premium logic is mocked and indicative only. Never shown on the website.

export type ProductId = "term-life" | "maash-bokra" | "family-protection";

export type Product = {
  id: ProductId;
  /** i18n key under products.<key> */
  key: "termLife" | "maashBokra" | "familyProtection";
  kind: "protection" | "savings";
  tint: "mint" | "lavender" | "aqua";
  cover: { min: number; max: number; step: number; default: number };
  term: { min: number; max: number; default: number };
  /** Savings plans pick a monthly contribution instead of a cover amount */
  contribution?: { min: number; max: number; step: number; default: number };
  placeholder: boolean;
};

export const products: Product[] = [
  {
    id: "term-life",
    key: "termLife",
    kind: "protection",
    tint: "mint",
    cover: { min: 100_000, max: 2_000_000, step: 50_000, default: 500_000 },
    term: { min: 5, max: 30, default: 15 },
    placeholder: true,
  },
  {
    id: "maash-bokra",
    key: "maashBokra",
    kind: "savings",
    tint: "lavender",
    cover: { min: 50_000, max: 1_000_000, step: 50_000, default: 200_000 },
    // Legacy prototype: minimum term 5 years, from age 18 (to verify with MLI)
    term: { min: 5, max: 40, default: 20 },
    contribution: { min: 500, max: 10_000, step: 250, default: 1_500 },
    placeholder: false,
  },
  {
    id: "family-protection",
    key: "familyProtection",
    kind: "protection",
    tint: "aqua",
    cover: { min: 250_000, max: 5_000_000, step: 250_000, default: 1_000_000 },
    term: { min: 10, max: 30, default: 20 },
    placeholder: true,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export type Quote = {
  productId: ProductId;
  cover: number;
  term: number;
  contribution?: number;
  monthly: number;
};

// Mocked pricing curve: roughly doubles every 10 years of age.
const ageFactor = (age: number) => Math.pow(1.072, Math.max(0, age - 25));

export function priceQuote(product: Product, age: number, cover: number, term: number, contribution?: number): Quote {
  let monthly: number;
  if (product.kind === "savings") {
    // Savings plan: the contribution is the premium, life cover rider is folded in.
    monthly = contribution ?? product.contribution!.default;
  } else {
    const baseRate = product.id === "family-protection" ? 0.0019 : 0.0014;
    const termLoad = 1 + (term - 10) * 0.012;
    monthly = (cover * baseRate * ageFactor(age) * termLoad) / 12;
  }
  return { productId: product.id, cover, term, contribution, monthly: Math.max(50, Math.round(monthly / 5) * 5) };
}
