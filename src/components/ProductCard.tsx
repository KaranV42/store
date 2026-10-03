// src/components/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <article className="product-card">
      <Link href={`/product/${product.id}`} className="product-card-link">
        <div className="product-image">
          {!loaded && <div className="skeleton product-skeleton" />}

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

          <Image
            src={failed ? FALLBACK_IMAGE : product.image}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 50vw, 25vw"
            className={`product-img ${loaded ? "is-loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setFailed(true);
              setLoaded(true);
            }}
          />

          {product.hoverImage && loaded && (
            <Image
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 700px) 50vw, 25vw"
              className="hover-image"
            />
          )}

          <button className="add-button">VIEW PRODUCT</button>
        </div>

        <div className="product-info">
          <div>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
          </div>
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
        </div>
      </Link>
    </article>
  );
}