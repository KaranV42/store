// src/app/search/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import { products, formatPrice } from "@/data/products";
import ProductCard from "@/components/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  
  const [search, setSearch] = useState(query);

  // Filter products based on the search term
  const filteredProducts = useMemo(() => {
  const lowerQuery = query.trim().toLowerCase();
  if (!lowerQuery) return [];
  
  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) // <-- ADD THIS LINE
    );
  });
}, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="search-results-page">
      <div className="search-results-header">
        <div>
          <p>SEARCH</p>
          <h1>RESULTS FOR "{query.toUpperCase()}"</h1>
        </div>
        <button
          className="search-clear-button"
          onClick={() => {
            setSearch("");
            router.push("/");
          }}
        >
          CLEAR SEARCH
        </button>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} style={{ marginBottom: "40px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ flex: 1, padding: "10px", border: "1px solid #ddd" }}
        />
        <button type="submit" className="auth-submit" style={{ padding: "10px 20px" }}>SEARCH</button>
      </form>

      <div className="search-results-meta">
        <span>
          {filteredProducts.length} {filteredProducts.length === 1 ? "PRODUCT" : "PRODUCTS"}
        </span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products search-results-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="search-no-results">
          <h2>NO RESULTS FOUND</h2>
          <p>We couldn't find any products matching "{query}".</p>
          <button onClick={() => router.push("/")}>CONTINUE SHOPPING</button>
        </div>
      )}
    </section>
  );
}

// Next.js requires Suspense for useSearchParams
export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}