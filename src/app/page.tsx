// src/app/page.tsx
"use client";

import { useState, useMemo } from "react";
import { products, formatPrice } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const { wishlist } = useStore();
  
  const [category, setCategory] = useState("ALL");
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return category === "ALL" || product.category === category;
    });
  }, [category]);

  const handleSubscribe = () => {
    if (newsletter.trim()) {
      setSubscribed(true);
      setNewsletter("");
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
  <motion.img
    initial={{ scale: 1.1, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90"
    alt="New fashion collection"
  />
  <div className="hero-overlay">
    <motion.div 
      className="hero-text"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        NEW COLLECTION
      </motion.p>
      
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        AUTUMN / WINTER
      </motion.h1>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setCategory("ALL");
          document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        SHOP NOW
      </motion.button>
    </motion.div>
  </div>
</section>

      {/* QUICK CATEGORIES */}
      <section className="quick-categories">
        <button onClick={() => setCategory("WOMEN")}>
          <span>01</span> WOMEN <small>SHOP WOMEN</small>
        </button>
        <button onClick={() => setCategory("MEN")}>
          <span>02</span> MEN <small>SHOP MEN</small>
        </button>
        <button onClick={() => setCategory("ACCESSORIES")}>
          <span>03</span> ACCESSORIES <small>SHOP ACCESSORIES</small>
        </button>
        <button onClick={() => setCategory("ALL")}>
          <span>04</span> NEW IN <small>DISCOVER MORE</small>
        </button>
      </section>

      {/* PRODUCTS GRID */}
      <section className="products-section" id="products">
        <div className="products-header">
          <div>
            <p>THE LATEST</p>
            <h2>{category === "ALL" ? "NEW ARRIVALS" : category}</h2>
          </div>
          <div className="filter-buttons">
            {["ALL", "WOMEN", "MEN", "ACCESSORIES"].map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>NO PRODUCTS FOUND</h3>
            <button onClick={() => setCategory("ALL")}>VIEW ALL PRODUCTS</button>
          </div>
        )}
      </section>

      {/* PROMO SECTION */}
      <section className="promo">
        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=90"
          alt="Women's collection"
        />
        <div className="promo-content">
          <p>EDITORIAL</p>
          <h2>THE NEW <br /> SILHOUETTE</h2>
          <button onClick={() => setCategory("WOMEN")}>EXPLORE WOMEN</button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <div><span>01</span><h3>FREE SHIPPING</h3><p>On orders over ₹5,000</p></div>
        <div><span>02</span><h3>EASY RETURNS</h3><p>Return within 30 days</p></div>
        <div><span>03</span><h3>SECURE PAYMENT</h3><p>100% secure checkout</p></div>
        <div><span>04</span><h3>CONTACT US</h3><p>We're here to help</p></div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        {!subscribed ? (
          <>
            <p>STAY IN THE LOOP</p>
            <h2>JOIN OUR NEWSLETTER</h2>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Email address"
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
              />
              <button onClick={handleSubscribe}>SUBSCRIBE</button>
            </div>
          </>
        ) : (
          <>
            <h2>THANK YOU</h2>
            <p>YOU ARE NOW SUBSCRIBED.</p>
          </>
        )}
      </section>
    </>
  );
}