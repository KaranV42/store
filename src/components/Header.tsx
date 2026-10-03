// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, wishlist, cart } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isHome = pathname === "/";
  const headerState = isHome && !scrolled && !menuOpen ? "header--transparent" : "header--solid";

  const goHome = () => {
    setMenuOpen(false);
    router.push("/");
  };

  const openSearchResults = () => {
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    setMenuOpen(false);
    router.push(path);
  };

  return (
    <>
            <header className={`header ${headerState}`}>
        {/* ZONE 1: LEFT — Menu (mobile) + Logo (desktop) */}
        <div className="header-zone header-zone--left">
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
          <button className="logo logo--desktop" onClick={goHome}>
            amd<span className="logo-star">✦</span>
          </button>
        </div>

        {/* ZONE 2: CENTER — Logo (mobile) + Nav (desktop) */}
        <div className="header-zone header-zone--center">
          <button className="logo logo--mobile" onClick={goHome}>
            amd<span className="logo-star">✦</span>
          </button>
          <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
            <Link href="/shop/new" onClick={() => setMenuOpen(false)}>NEW</Link>
            <Link href="/shop/women" onClick={() => setMenuOpen(false)}>WOMEN</Link>
            <Link href="/shop/men" onClick={() => setMenuOpen(false)}>MEN</Link>
            <Link href="/shop/accessories" onClick={() => setMenuOpen(false)}>ACCESSORIES</Link>
            <Link href="/shop/all" onClick={() => setMenuOpen(false)}>COLLECTION</Link>
          </nav>
        </div>

        {/* ZONE 3: RIGHT — Utility */}
        <div className="header-zone header-zone--right">
          <button
            className="header-button desktop-only"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            SEARCH
          </button>

          <button
            className="header-button desktop-only"
            onClick={() => (user ? router.push("/") : router.push("/login"))}
          >
            {user ? user.name.toUpperCase() : "LOGIN"}
          </button>

          <button
            className="icon-button"
            aria-label="Wishlist"
            onClick={() => navigateTo("/wishlist")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
          </button>

          <button
            className="icon-button"
            aria-label="Shopping bag"
            onClick={() => navigateTo("/bag")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* DESKTOP SEARCH PANEL */}
      {searchOpen && (
        <div className="search-panel">
          <form onSubmit={(e) => { e.preventDefault(); openSearchResults(); }}>
            <input autoFocus type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit">SEARCH</button>
            <button type="button" onClick={() => setSearch("")}>CLEAR</button>
          </form>
        </div>
      )}

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${menuOpen ? "is-open" : ""}`}>
        <form className="drawer-search" onSubmit={(e) => { e.preventDefault(); openSearchResults(); }}>
          <input
            type="text"
            placeholder="Search the store..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <nav className="drawer-nav">
          <Link href="/shop/new" onClick={() => setMenuOpen(false)}>NEW</Link>
          <Link href="/shop/women" onClick={() => setMenuOpen(false)}>WOMEN</Link>
          <Link href="/shop/men" onClick={() => setMenuOpen(false)}>MEN</Link>
          <Link href="/shop/accessories" onClick={() => setMenuOpen(false)}>ACCESSORIES</Link>
          <Link href="/shop/all" onClick={() => setMenuOpen(false)}>COLLECTION</Link>
        </nav>

        <div className="drawer-utility">
          <button onClick={() => navigateTo(user ? "/" : "/login")}>
            {user ? `ACCOUNT (${user.name})` : "LOGIN / REGISTER"}
          </button>
        </div>
      </div>
    </>
  );
}