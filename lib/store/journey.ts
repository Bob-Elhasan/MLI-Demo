"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ageFrom, mockOcr, type IdFields } from "@/lib/mock/kyc";
import { getProduct, priceQuote, type ProductId, type Quote } from "@/lib/mock/products";

export type PaymentMethod = "card" | "meeza" | "instapay" | "fawry";

export type Policy = {
  number: string;
  productId: ProductId;
  quote: Quote;
  issuedAt: string;
  paymentDay: number;
  paymentMethod: PaymentMethod;
};

/**
 * Presenter scenarios. The app is a pulse app, so the demo needs to jump to the moments that matter:
 * the monthly payment, a missed one, the 6-month check-in and the policy anniversary.
 */
export type Scenario = "onTrack" | "dueSoon" | "grace" | "lapsed" | "checkIn" | "anniversary";

export type Receipt = { number: string; amount: number; paidAt: string; method: PaymentMethod; kind: "premium" | "reinstatement" };

export type ClaimType = "death" | "disability" | "illness" | "maturity";
export type Claim = {
  ref: string;
  type: ClaimType;
  eventDate: string;
  description: string;
  documents: string[];
  submittedAt: string;
  /** 0 submitted, 1 documents checked, 2 under review, 3 decision, 4 paid */
  stage: number;
};

export type GoalKind = "marriage" | "school" | "car" | "home" | "custom";
export type Goal = { id: string; kind: GoalKind; name: string; target: number; saved: number; targetYear: number };

export type Beneficiary = { id: string; name: string; relation: string; phone: string; share: number; invite: "none" | "sent" | "accepted" };
export type VaultDoc = { id: string; name: string; addedAt: string; kind: "policy" | "id" | "receipt" | "user" };

export type LifeEvent = "married" | "baby" | "newJob" | "home" | "school" | "nothing";

type Captures = {
  idFront?: string;
  idBack?: string;
  selfie?: string;
  signature?: string;
};

type JourneyState = Captures & {
  phone: string;
  phoneVerified: boolean;
  idFields: IdFields;
  idConfirmed: boolean;
  livenessPassed: boolean;
  faceUnlock: boolean;
  productId?: ProductId;
  quote?: Quote;
  paymentDay: number;
  paymentMethod: PaymentMethod;
  policy?: Policy;

  scenario: Scenario;
  receipts: Receipt[];
  pausedMonths: number;
  claims: Claim[];
  goals: Goal[];
  beneficiaries: Beneficiary[];
  vaultDocs: VaultDoc[];
  lifeEvents: LifeEvent[];
  lastCheckIn?: string;
  readNotifications: string[];
  weeklyGoalNudge: boolean;
  /** Age the user dials in before the ID scan; the ID age replaces it at summary */
  ageGuess: number;
  /** Optional advisor or partner code, so the app credits whoever brought the customer */
  advisorCode: string;

  set: (patch: Partial<JourneyState>) => void;
  capture: (key: keyof Captures, dataUrl: string) => void;
  issuePolicy: () => Policy | undefined;
  payInstallment: () => Receipt | undefined;
  submitClaim: (c: Omit<Claim, "ref" | "submittedAt" | "stage">) => Claim;
  advanceClaim: (ref: string) => void;
  saveGoal: (g: Goal) => void;
  removeGoal: (id: string) => void;
  saveBeneficiary: (b: Beneficiary) => void;
  removeBeneficiary: (id: string) => void;
  addVaultDoc: (name: string) => void;
  checkIn: (events: LifeEvent[]) => void;
  reset: () => void;
};

const rand = (n = 6) => String(Math.floor(10 ** (n - 1) + Math.random() * 9 * 10 ** (n - 1)));
const year = () => new Date().getFullYear();

const initial = {
  phone: "",
  phoneVerified: false,
  idFields: mockOcr,
  idConfirmed: false,
  livenessPassed: false,
  faceUnlock: true,
  productId: undefined,
  quote: undefined,
  paymentDay: 27,
  paymentMethod: "card" as PaymentMethod,
  policy: undefined,
  idFront: undefined,
  idBack: undefined,
  selfie: undefined,
  signature: undefined,
  scenario: "onTrack" as Scenario,
  receipts: [] as Receipt[],
  pausedMonths: 0,
  claims: [] as Claim[],
  goals: [] as Goal[],
  beneficiaries: [] as Beneficiary[],
  vaultDocs: [] as VaultDoc[],
  lifeEvents: [] as LifeEvent[],
  lastCheckIn: undefined,
  readNotifications: [] as string[],
  weeklyGoalNudge: false,
  ageGuess: 30,
  advisorCode: "",
};

export const useJourney = create<JourneyState>()(
  persist(
    (set, get) => ({
      ...initial,
      set: (patch) => set(patch),
      capture: (key, dataUrl) => set({ [key]: dataUrl }),
      issuePolicy: () => {
        const { quote, productId, paymentDay, paymentMethod } = get();
        if (!quote || !productId) return undefined;
        const now = new Date().toISOString();
        const policy: Policy = { number: `MLI-${year()}-${rand()}`, productId, quote, issuedAt: now, paymentDay, paymentMethod };
        set({
          policy,
          scenario: "onTrack",
          receipts: [{ number: `RCT-${rand(8)}`, amount: quote.monthly, paidAt: now, method: paymentMethod, kind: "premium" }],
          vaultDocs: [
            { id: "contract", name: "policyContract", addedAt: now, kind: "policy" },
            { id: "schedule", name: "policySchedule", addedAt: now, kind: "policy" },
            { id: "national-id", name: "nationalId", addedAt: now, kind: "id" },
          ],
        });
        return policy;
      },
      payInstallment: () => {
        const { policy, scenario, receipts } = get();
        if (!policy) return undefined;
        // Reinstatement settles every missed premium at once
        const missed = scenario === "lapsed" ? 2 : 1;
        const receipt: Receipt = {
          number: `RCT-${rand(8)}`,
          amount: policy.quote.monthly * missed,
          paidAt: new Date().toISOString(),
          method: policy.paymentMethod,
          kind: scenario === "lapsed" ? "reinstatement" : "premium",
        };
        set({ receipts: [receipt, ...receipts], scenario: "onTrack" });
        return receipt;
      },
      submitClaim: (c) => {
        const claim: Claim = { ...c, ref: `CLM-${year()}-${rand(5)}`, submittedAt: new Date().toISOString(), stage: 0 };
        set({ claims: [claim, ...get().claims] });
        return claim;
      },
      advanceClaim: (ref) => set({ claims: get().claims.map((c) => (c.ref === ref ? { ...c, stage: Math.min(4, c.stage + 1) } : c)) }),
      saveGoal: (g) => {
        const goals = get().goals;
        set({ goals: goals.some((x) => x.id === g.id) ? goals.map((x) => (x.id === g.id ? g : x)) : [...goals, g] });
      },
      removeGoal: (id) => set({ goals: get().goals.filter((g) => g.id !== id) }),
      saveBeneficiary: (b) => {
        const list = get().beneficiaries;
        set({ beneficiaries: list.some((x) => x.id === b.id) ? list.map((x) => (x.id === b.id ? b : x)) : [...list, b] });
      },
      removeBeneficiary: (id) => set({ beneficiaries: get().beneficiaries.filter((b) => b.id !== id) }),
      addVaultDoc: (name) =>
        set({ vaultDocs: [...get().vaultDocs, { id: `doc-${rand()}`, name, addedAt: new Date().toISOString(), kind: "user" }] }),
      checkIn: (events) => set({ lifeEvents: events, lastCheckIn: new Date().toISOString(), scenario: get().scenario === "checkIn" ? "onTrack" : get().scenario }),
      reset: () => set(initial),
    }),
    {
      name: "mli-journey",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      // Camera captures stay in memory only, they are too heavy for storage.
      partialize: ({ idFront, idBack, selfie, signature, ...rest }) => rest,
    },
  ),
);

/** Seeds a verified user with an issued policy, for presenter jumps */
export function seedDemoPolicy(productId: ProductId = "term-life") {
  const s = useJourney.getState();
  s.set({ phone: s.phone || "1001234567", phoneVerified: true, idConfirmed: true, livenessPassed: true });
  if (s.policy) return;
  if (!s.quote) {
    const p = getProduct(productId)!;
    s.set({ productId, quote: priceQuote(p, ageFrom(s.idFields.dateOfBirth), p.cover.default, p.term.default, p.contribution?.default) });
  }
  useJourney.getState().issuePolicy();
}

/** True once the persisted journey has been restored, so screens never flash an empty state */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useJourney.persist.onFinishHydration(() => setHydrated(true));
    if (useJourney.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);
  return hydrated;
}
