// src/components/ProductDetailClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
    router.push("/bag");
  };

  return (
    <section className="pdp">
      <div className="pdp-main">
        {/* MEDIA COLUMN */}
        <div className="pdp-media">
          <nav className="pdp-crumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href={`/shop/${product.category.toLowerCase()}`}>
              {product.category}
            </Link>
            <span className="sep">/</span>
            <span className="current">{product.name}</span>
          </nav>

          <div className="pdp-image">
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </div>
        </div>

        {/* PURCHASE COLUMN */}
        <div className="pdp-buy">
          <p className="uppercase-label">{product.category}</p>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>

          <div className="detail-divider" />

          <div className="option-section">
            <div className="option-header">
              <span className="uppercase-label">Color</span>
              <strong>{selectedColor}</strong>
            </div>
            <div className="option-buttons">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={selectedColor === color ? "selected" : ""}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="option-section">
            <div className="option-header">
              <span className="uppercase-label">Size</span>
              <strong>{selectedSize}</strong>
            </div>
            <div className="option-buttons size-buttons">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "selected" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="option-section">
            <div className="option-header">
              <span className="uppercase-label">Quantity</span>
            </div>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button className="detail-add-button" onClick={handleAddToCart}>
            ADD TO BAG
          </button>

          <button
            className="detail-wishlist"
            onClick={() => toggleWishlist(product.id)}
          >
            {isWishlisted ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
          </button>
        </div>
      </div>

      {/* EDITORIAL INFORMATION BAND */}
      <div className="pdp-info">
        <div>
          <h3>The Design</h3>
          <p>{product.description}</p>
        </div>
        <div>
          <h3>Composition &amp; Care</h3>
          <p>Outer: 100% Wool. Lining: 100% Cupro. Dry clean only. Made in India.</p>
        </div>
        <div>
          <h3>Shipping &amp; Returns</h3>
          <p>Complimentary shipping on orders over ₹5,000. Returns accepted within 30 days of delivery.</p>
        </div>
      </div>
    </section>
  );
}