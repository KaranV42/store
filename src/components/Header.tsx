// src/components/Header.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function Header() {
  const router = useRouter();
  const { user, wishlist, cart } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const selectCategory = (category: string) => {
    setMenuOpen(false);
    // Navigate to home with category filter - we'll handle this via query params later
    router.push(`/`);
  };

  const openSearchResults = () => {
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearchOpen(false);
  };

  return (
    <>
      <header className="header">
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          MENU
        </button>

        <button
          className="logo"
          onClick={() => router.push("/")}
        >
          ZARA
        </button>

        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <button onClick={() => selectCategory("ALL")}>NEW</button>
          <button onClick={() => selectCategory("WOMEN")}>WOMEN</button>
          <button onClick={() => selectCategory("MEN")}>MEN</button>
          <button onClick={() => selectCategory("ACCESSORIES")}>ACCESSORIES</button>
          <button onClick={() => selectCategory("ALL")}>COLLECTION</button>
        </nav>

        <div className="header-actions">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="header-button"
          >
            SEARCH
          </button>

          <button
            className="header-button"
            onClick={() => user ? router.push("/account") : router.push("/login")}
          >
            {user ? user.name.toUpperCase() : "LOGIN"}
          </button>

          <button
            className="header-button wishlist-header-button"
            onClick={() => router.push("/wishlist")}
          >
            WISHLIST <span>({wishlist.length})</span>
          </button>

          <button
            className="bag-button"
            onClick={() => router.push("/bag")}
          >
            BAG <span>({cartCount})</span>
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openSearchResults();
            }}
          >
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">SEARCH</button>
            <button type="button" onClick={() => setSearch("")}>CLEAR</button>
          </form>
        </div>
      )}
    </>
  );
}