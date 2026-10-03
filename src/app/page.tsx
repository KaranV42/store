// src/app/page.tsx
"use client";

import { useState, useMemo } from "react";
import { products, formatPrice } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const router = useRouter();
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
        <button onClick={() => router.push("/shop/women")}>
          <span>01</span>
          <strong>Women</strong>
          <small>SHOP WOMEN</small>
        </button>
        <button onClick={() => router.push("/shop/men")}>
          <span>02</span>
          <strong>Men</strong>
          <small>SHOP MEN</small>
        </button>
        <button onClick={() => router.push("/shop/accessories")}>
          <span>03</span>
          <strong>Accessories</strong>
          <small>SHOP ACCESSORIES</small>
        </button>
        <button onClick={() => router.push("/shop/new")}>
          <span>04</span>
          <strong>New In</strong>
          <small>DISCOVER MORE</small>
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
          <motion.div 
            className="products"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Triggers when 10% of grid is visible
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 } // 80ms delay between each card
              }
            }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="no-products">
            <h3>NO PRODUCTS FOUND</h3>
            <button onClick={() => setCategory("ALL")}>VIEW ALL PRODUCTS</button>
          </div>
        )}
      </section>

            {/* 4. EDITORIAL SPLIT */}
      <section className="editorial-split">
        <div className="editorial-copy">
          <p className="uppercase-label">Editorial</p>
          <h2 className="section-title">
            The New
            <br />
            Silhouette
          </h2>
          <p className="editorial-lede">
            Fluid tailoring and sculpted minimalism define the season. Pieces
            cut to move, designed to remain.
          </p>
          <button
            className="text-cta"
            onClick={() => router.push("/shop/women")}
          >
            EXPLORE WOMEN <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="editorial-media">
          <Image
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85"
            alt="The new silhouette editorial"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className="editorial-img"
          />
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
              <button onClick={handleSubscribe}>
  SUBSCRIBE <span aria-hidden="true">→</span>
</button>
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