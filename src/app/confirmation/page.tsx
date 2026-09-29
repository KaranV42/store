// src/app/confirmation/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function ConfirmationPage() {
  const router = useRouter();
  const { orderNumber } = useStore();

  // Guard: prevent direct access with no order in this session
  if (!orderNumber) {
    return (
      <div className="empty-bag">
        <h2>NO RECENT ORDER</h2>
        <p>We could not find a recent order associated with this session.</p>
        <button onClick={() => router.push("/")}>CONTINUE SHOPPING</button>
      </div>
    );
  }

  return (
    <section className="confirmation-page">
      <div className="confirmation-content">
        <p>ORDER CONFIRMED</p>
        <h1>THANK YOU FOR YOUR ORDER.</h1>

        <div className="confirmation-divider" />

        <p className="confirmation-number">ORDER NUMBER</p>
        <strong>{orderNumber}</strong>

        <p className="confirmation-message">
          Your order has been placed successfully. A confirmation will be sent
          to your email address.
        </p>

        <button className="confirmation-button" onClick={() => router.push("/")}>
          CONTINUE SHOPPING
        </button>
      </div>
    </section>
  );
}