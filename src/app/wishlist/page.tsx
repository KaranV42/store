// src/app/wishlist/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { products, formatPrice } from "@/data/products";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, toggleWishlist } = useStore();
  
  // Filter the global products array to only include items in the wishlist
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <section className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <p>YOUR SELECTION</p>
          <h1>WISHLIST</h1>
        </div>
        <span>
          {wishlistProducts.length} {wishlistProducts.length === 1 ? "ITEM" : "ITEMS"}
        </span>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => (
            <article className="wishlist-card" key={product.id}>
              <div className="wishlist-image">
                <img className="wishlist-product-image" src={product.image} alt={product.name} />
                <button
                  className="wishlist-remove"
                  onClick={() => toggleWishlist(product.id)}
                >
                  ♥
                </button>
              </div>

              <div className="wishlist-info">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                </div>
                <strong>{formatPrice(product.price)}</strong>
              </div>

              <Link href={`/product/${product.id}`}>
                <button className="wishlist-view-button">VIEW PRODUCT</button>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <h2>YOUR WISHLIST IS EMPTY</h2>
          <p>Save pieces you love and find them here later.</p>
          <button onClick={() => router.push("/")}>CONTINUE SHOPPING</button>
        </div>
      )}
    </section>
  );
}