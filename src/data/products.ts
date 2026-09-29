// src/data/products.ts

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
  sizes: string[];
  colors: string[];
};

export type CartItem = {
  id: string;
  productId: number;
  size: string;
  color: string;
  quantity: number;
};

export type User = {
  name: string;
  email: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Oversized Wool Coat",
    category: "WOMEN",
    price: 7990,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85",
    description: "An oversized wool coat with a structured silhouette and clean minimal finish. Designed for layering through colder seasons.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["BLACK", "CAMEL", "GREY"],
  },
  {
    id: 2,
    name: "Tailored Black Blazer",
    category: "WOMEN",
    price: 5990,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85",
    description: "A sharply tailored blazer with a refined silhouette. Designed to work equally well with formal and casual looks.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["BLACK"],
  },
  {
    id: 3,
    name: "Minimal Black Dress",
    category: "WOMEN",
    price: 4990,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85",
    description: "A clean-lined black dress with a minimalist silhouette and understated detailing.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["BLACK"],
  },
  {
    id: 4,
    name: "Relaxed White Shirt",
    category: "MEN",
    price: 2990,
    image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=800&q=85",
    description: "A relaxed cotton shirt with a clean profile and versatile everyday construction.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["WHITE", "BLACK"],
  },
  {
    id: 5,
    name: "Classic Denim Jacket",
    category: "MEN",
    price: 3990,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",
    description: "A classic denim jacket with a structured fit and timeless everyday styling.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["BLUE", "BLACK"],
  },
  {
    id: 6,
    name: "Wide Leg Trousers",
    category: "WOMEN",
    price: 3490,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1506629905607-d9c297d8a4f1?auto=format&fit=crop&w=800&q=85",
    description: "Wide-leg trousers designed with a fluid silhouette and clean tailored finish.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["BLACK", "GREY"],
  },
  {
    id: 7,
    name: "Leather Shoulder Bag",
    category: "ACCESSORIES",
    price: 4490,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
    description: "A structured shoulder bag with a clean profile and versatile everyday proportions.",
    sizes: ["ONE SIZE"],
    colors: ["BLACK", "BROWN"],
  },
  {
    id: 8,
    name: "Minimal Sneakers",
    category: "ACCESSORIES",
    price: 4990,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
    description: "Minimal everyday sneakers with a clean low-profile design.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["WHITE", "BLACK"],
  },
];

// THIS IS THE LINE THAT WAS MISSING OR NOT SAVED
export const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;