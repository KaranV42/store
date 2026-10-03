// src/app/shop/[category]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

type PageProps = { params: Promise<{ category: string }> };

const CATALOG: Record<string, { title: string; filter: (p: Product) => boolean }> = {
  new: { title: "New Arrivals", filter: (p) => p.badge === "NEW" },
  women: { title: "Women", filter: (p) => p.category === "WOMEN" },
  men: { title: "Men", filter: (p) => p.category === "MEN" },
  accessories: { title: "Accessories", filter: (p) => p.category === "ACCESSORIES" },
  all: { title: "The Collection", filter: () => true },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const entry = CATALOG[category];
  if (!entry) return { title: "Collection Not Found" };
  return {
    title: entry.title,
    description: `The ${entry.title} collection at AMD Atelier.`,
  };
}

export default async function ShopPage({ params }: PageProps) {
  const { category } = await params;
  const entry = CATALOG[category];
  if (!entry) notFound();

  const items = products.filter(entry.filter);

  return (
    <section className="shop-page">
      <div className="shop-header">
        <div>
          <p className="uppercase-label">The Collection</p>
          <h1 className="section-title">{entry.title}</h1>
        </div>
        <span className="shop-count">
          {items.length} {items.length === 1 ? "PIECE" : "PIECES"}
        </span>
      </div>

      {items.length > 0 ? (
        <div className="products shop-grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <h3>NO PIECES IN THIS COLLECTION</h3>
        </div>
      )}
    </section>
  );
}