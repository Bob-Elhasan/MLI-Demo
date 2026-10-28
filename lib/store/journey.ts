"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mockOcr, type IdFields } from "@/lib/mock/kyc";
import type { ProductId, Quote } from "@/lib/mock/products";

export type PaymentMethod = "card" | "meeza" | "instapay" | "fawry";

export type Policy = {
  number: string;
  productId: ProductId;
  quote: Quote;
  issuedAt: string;
  paymentDay: number;
  paymentMethod: PaymentMethod;
};

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

  set: (patch: Partial<JourneyState>) => void;
  capture: (key: keyof Captures, dataUrl: string) => void;
  issuePolicy: () => Policy | undefined;
  reset: () => void;
};

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
        const policy: Policy = {
          number: `MLI-${new Date().getFullYear()}-${String(Math.floor(100000 + Math.random() * 899999))}`,
          productId,
          quote,
          issuedAt: new Date().toISOString(),
          paymentDay,
          paymentMethod,
        };
        set({ policy });
        return policy;
      },
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
