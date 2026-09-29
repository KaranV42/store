// src/components/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image"; // 1. Import the Next.js Image component
import type { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <Link href={`/product/${product.id}`} className="product-card-link">
        <div className="product-image">
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}

          <button
            className={`wishlist ${isWishlisted ? "liked" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            {isWishlisted ? "♥" : "♡"}
          </button>

          {/* 2. Replace standard img with Next.js Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />

          <button className="add-button">
            VIEW PRODUCT
          </button>
        </div>

        <div className="product-info">
          <div>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
          </div>

          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>
        </div>
      </Link>
    </article>
  );
}