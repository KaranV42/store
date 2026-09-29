// src/components/Footer.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">ZARA</div>
          <p>Contemporary fashion designed for everyday expression.</p>
        </div>

        <div>
          <h4>SHOP</h4>
          <a href="#products" onClick={(e) => { e.preventDefault(); router.push("/"); }}>
            New Arrivals
          </a>
          <a href="#products" onClick={(e) => { e.preventDefault(); router.push("/"); }}>
            Women
          </a>
          <a href="#products" onClick={(e) => { e.preventDefault(); router.push("/"); }}>
            Men
          </a>
          <a href="#products" onClick={(e) => { e.preventDefault(); router.push("/"); }}>
            Accessories
          </a>
        </div>

        <div>
          <h4>HELP</h4>
          <a href="#help">Customer Service</a>
          <a href="#shipping">Shipping</a>
          <a href="#returns">Returns</a>
          <a href="#contact">Contact</a>
        </div>

        <div>
          <h4>FOLLOW</h4>
          <a href="#instagram">Instagram</a>
          <a href="#facebook">Facebook</a>
          <a href="#pinterest">Pinterest</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ZARA-STYLE STORE</span>
        <span>INDIA / INR</span>
        <span>PRIVACY · TERMS</span>
      </div>
    </footer>
  );
}