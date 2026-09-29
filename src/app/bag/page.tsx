// src/app/bag/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { products, formatPrice } from "@/data/products";

export default function BagPage() {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart } = useStore();

  // Calculate total number of items
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate financial totals
  const cartSubtotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  // Business logic: Free shipping over ₹5,000
  const shipping = cartSubtotal >= 5000 || cartSubtotal === 0 ? 0 : 199;
  const cartTotal = cartSubtotal + shipping;

  return (
    <section className="bag-page">
      <div className="bag-header">
        <div>
          <p>YOUR SELECTION</p>
          <h1>SHOPPING BAG</h1>
        </div>
        <span>
          {cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"}
        </span>
      </div>

      {cart.length > 0 ? (
        <div className="bag-layout">
          {/* CART ITEMS LIST */}
          <div className="bag-items">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <article className="bag-item" key={item.id}>
                  <img
                    className="bag-item-image"
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="bag-item-info">
                    <div className="bag-item-main">
                      <p className="bag-item-category">{product.category}</p>
                      <h3>{product.name}</h3>
                      <p>{formatPrice(product.price)}</p>
                    </div>

                    <div className="bag-item-options">
                      <span>COLOR: {item.color}</span>
                      <span>SIZE: {item.size}</span>
                    </div>

                    <div className="bag-item-actions">
                      <div className="bag-quantity">
                        <button onClick={() => updateCartQuantity(item.id, -1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>

                  <strong>
                    {formatPrice(product.price * item.quantity)}
                  </strong>
                </article>
              );
            })}
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <aside className="bag-summary">
            <h2>SUMMARY</h2>

            <div className="summary-row">
              <span>SUBTOTAL</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>

            <div className="summary-row">
              <span>SHIPPING</span>
              <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>TOTAL</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            <button
              className="checkout-button"
              onClick={() => router.push("/checkout")}
            >
              CHECKOUT
            </button>

            <button
              className="continue-button"
              onClick={() => router.push("/")}
            >
              CONTINUE SHOPPING
            </button>
          </aside>
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="empty-bag">
          <h2>YOUR BAG IS EMPTY</h2>
          <p>Discover our latest collection.</p>
          <button onClick={() => router.push("/")}>CONTINUE SHOPPING</button>
        </div>
      )}
    </section>
  );
}