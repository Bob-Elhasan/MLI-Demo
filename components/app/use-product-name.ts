"use client";

import { useTranslations } from "next-intl";
import { getProduct } from "@/lib/mock/products";

export function useProductName() {
  const t = useTranslations("products");
  return (id?: string) => {
    const p = id ? getProduct(id) : undefined;
    return p ? t(`${p.key}.name`) : "";
  };
}
