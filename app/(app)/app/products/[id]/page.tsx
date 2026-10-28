import { products } from "@/lib/mock/products";
import { Calculator } from "./calculator";

export const generateStaticParams = () => products.map((p) => ({ id: p.id }));

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Calculator id={id} />;
}
