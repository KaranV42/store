// src/app/product/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { products, formatPrice, type Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  // Find the product based on the URL ID
  const product = products.find((p) => p.id === Number(id));

  // Local state for selection
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Initialize selections when product loads
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
    }
  }, [product]);

  // Handle 404 if product doesn't exist
  if (!product) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h1>Product Not Found</h1>
        <Link href="/">Return Home</Link>
      </div>
    );
  }

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
    <section className="product-detail-page">
      <button className="back-button" onClick={() => router.back()}>
        ← BACK TO SHOP
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <p className="detail-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>

          <div className="detail-divider" />

          {/* Color Selection */}
          <div className="option-section">
            <div className="option-header">
              <span>COLOR</span>
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

          {/* Size Selection */}
          <div className="option-section">
            <div className="option-header">
              <span>SIZE</span>
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

          {/* Quantity Selection */}
          <div className="option-section">
            <div className="option-header">
              <span>QUANTITY</span>
            </div>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Actions */}
          <button className="detail-add-button" onClick={handleAddToCart}>
            ADD TO BAG — {formatPrice(product.price * quantity)}
          </button>

          <button
            className="detail-wishlist"
            onClick={() => toggleWishlist(product.id)}
          >
            {isWishlisted ? "♥ REMOVE FROM WISHLIST" : "♡ ADD TO WISHLIST"}
          </button>

          {/* Description */}
          <div className="product-description">
            <h3>PRODUCT DETAILS</h3>
            <p>{product.description}</p>
          </div>

          <div className="detail-information">
            <p>FREE SHIPPING ON ORDERS OVER ₹5,000</p>
            <p>EASY RETURNS WITHIN 30 DAYS</p>
            <p>SECURE PAYMENT</p>
          </div>
        </div>
      </div>
    </section>
  );
}