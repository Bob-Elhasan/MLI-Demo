import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/site/products";
import { getSiteProduct, siteProducts } from "@/lib/mock/site/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteProducts.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSiteProduct(slug)) notFound();
  return <ProductDetail slug={slug} />;
}
