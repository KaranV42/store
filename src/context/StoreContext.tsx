// src/context/StoreContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, User } from "@/data/products";

type StoreContextType = {
  cart: CartItem[];
  wishlist: number[];
  user: User | null;
  orderNumber: string;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  updateCartQuantity: (cartId: string, change: number) => void;
  toggleWishlist: (id: number) => void;
  login: (user: User) => void;
  logout: () => void;
  placeOrder: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Helper to safely read storage (only works in browser)
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }
  return defaultValue;
};

export function StoreProvider({ children }: { children: ReactNode }) {
  // 1. Initialize as EMPTY. This ensures Server and Client match initially (both see 0).
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  
  // Track if the component has mounted to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);

  // 2. Load data from localStorage ONLY after mounting in the browser
  useEffect(() => {
    setIsMounted(true);
    setCart(getFromStorage("cart", []));
    setWishlist(getFromStorage("wishlist", []));
    setUser(getFromStorage("user", null));
  }, []);

  // 3. Save data to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

  useEffect(() => {
    if (isMounted) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
  }, [user, isMounted]);

  const addToCart = (item: CartItem) => {
    setCart((items) => {
      const existing = items.find((i) => i.id === item.id);
      if (existing) {
        return items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...items, item];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart((items) => items.filter((item) => item.id !== cartId));
  };

  const updateCartQuantity = (cartId: string, change: number) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === cartId ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (id: number) => {
    setWishlist((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id]
    );
  };

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const placeOrder = () => {
    const generated = `ZS-${Date.now().toString().slice(-8)}`;
    setOrderNumber(generated);
    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        user,
        orderNumber,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        login,
        logout,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}