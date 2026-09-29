// src/app/checkout/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { products, formatPrice } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, user, placeOrder } = useStore();

  // Pre-fill contact details if the user is logged in
  const [checkoutName, setCheckoutName] = useState(user?.name ?? "");
  const [checkoutEmail, setCheckoutEmail] = useState(user?.email ?? "");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutCity, setCheckoutCity] = useState("");
  const [checkoutState, setCheckoutState] = useState("");
  const [checkoutPincode, setCheckoutPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [checkoutError, setCheckoutError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const cartSubtotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  const shipping = cartSubtotal >= 5000 || cartSubtotal === 0 ? 0 : 199;
  const cartTotal = cartSubtotal + shipping;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCheckoutError("");

    if (
      !checkoutName.trim() ||
      !checkoutEmail.trim() ||
      !checkoutPhone.trim() ||
      !checkoutAddress.trim() ||
      !checkoutCity.trim() ||
      !checkoutState.trim() ||
      !checkoutPincode.trim()
    ) {
      setCheckoutError("Please complete all delivery details.");
      return;
    }

    if (!/^\d{6}$/.test(checkoutPincode)) {
      setCheckoutError("Please enter a valid 6-digit PIN code.");
      return;
    }

    setIsPlacingOrder(true);
    placeOrder();
    router.push("/confirmation");
  };

  // Guard: a user cannot check out with an empty bag
  if (cart.length === 0 && !isPlacingOrder) {
    return (
      <div className="empty-bag">
        <h2>YOUR BAG IS EMPTY</h2>
        <p>Add items to your bag before checking out.</p>
        <button onClick={() => router.push("/")}>CONTINUE SHOPPING</button>
      </div>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <p>SECURE CHECKOUT</p>
        <h1>CHECKOUT</h1>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-main">
          {/* 01 CONTACT */}
          <div className="checkout-section">
            <div className="checkout-section-heading">
              <span>01</span>
              <div>
                <p>CONTACT</p>
                <h2>CONTACT INFORMATION</h2>
              </div>
            </div>

            <div className="checkout-fields">
              <div className="form-field">
                <label>FULL NAME</label>
                <input
                  type="text"
                  value={checkoutName}
                  onChange={(e) => setCheckoutName(e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div className="form-field">
                <label>EMAIL</label>
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>
              <div className="form-field">
                <label>PHONE</label>
                <input
                  type="tel"
                  value={checkoutPhone}
                  onChange={(e) => setCheckoutPhone(e.target.value)}
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>

          {/* 02 DELIVERY */}
          <div className="checkout-section">
            <div className="checkout-section-heading">
              <span>02</span>
              <div>
                <p>DELIVERY</p>
                <h2>DELIVERY ADDRESS</h2>
              </div>
            </div>

            <div className="checkout-fields">
              <div className="form-field full-width">
                <label>ADDRESS</label>
                <input
                  type="text"
                  value={checkoutAddress}
                  onChange={(e) => setCheckoutAddress(e.target.value)}
                  placeholder="Street address, apartment, etc."
                />
              </div>
              <div className="form-field">
                <label>CITY</label>
                <input
                  type="text"
                  value={checkoutCity}
                  onChange={(e) => setCheckoutCity(e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="form-field">
                <label>STATE</label>
                <input
                  type="text"
                  value={checkoutState}
                  onChange={(e) => setCheckoutState(e.target.value)}
                  placeholder="State"
                />
              </div>
              <div className="form-field">
                <label>PIN CODE</label>
                <input
                  type="text"
                  value={checkoutPincode}
                  onChange={(e) => setCheckoutPincode(e.target.value)}
                  placeholder="6-digit PIN"
                  maxLength={6}
                />
              </div>
            </div>
          </div>

          {/* 03 PAYMENT */}
          <div className="checkout-section">
            <div className="checkout-section-heading">
              <span>03</span>
              <div>
                <p>PAYMENT</p>
                <h2>PAYMENT METHOD</h2>
              </div>
            </div>

            <div className="payment-options">
              <button
                type="button"
                className={paymentMethod === "CARD" ? "payment-option selected" : "payment-option"}
                onClick={() => setPaymentMethod("CARD")}
              >
                <span>CARD PAYMENT</span>
                <small>Credit / Debit Card</small>
              </button>
              <button
                type="button"
                className={paymentMethod === "UPI" ? "payment-option selected" : "payment-option"}
                onClick={() => setPaymentMethod("UPI")}
              >
                <span>UPI</span>
                <small>UPI / QR Payment</small>
              </button>
              <button
                type="button"
                className={paymentMethod === "COD" ? "payment-option selected" : "payment-option"}
                onClick={() => setPaymentMethod("COD")}
              >
                <span>CASH ON DELIVERY</span>
                <small>Pay when delivered</small>
              </button>
            </div>
          </div>

          {checkoutError && <p className="checkout-error">{checkoutError}</p>}
        </div>

        {/* ORDER SUMMARY */}
        <aside className="checkout-summary">
          <h2>ORDER SUMMARY</h2>

          <div className="checkout-items">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <div className="checkout-item" key={item.id}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{item.color} / {item.size}</p>
                    <span>QTY {item.quantity}</span>
                  </div>
                  <strong>{formatPrice(product.price * item.quantity)}</strong>
                </div>
              );
            })}
          </div>

          <div className="summary-divider" />

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

          <button type="submit" className="place-order-button">
            PLACE ORDER
          </button>

          <p className="secure-checkout-note">
            YOUR ORDER IS SECURE AND ENCRYPTED.
          </p>
        </aside>
      </form>
    </section>
  );
}