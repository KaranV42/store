// src/data/products.ts

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  hoverImage?: string;
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
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    description: "An oversized wool coat with a structured silhouette and clean minimal finish. Designed for layering through colder seasons.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["SLATE", "BLACK"],
  },
  {
    id: 2,
    name: "Wide-Leg Trousers",
    category: "WOMEN",
    price: 3490,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    description: "Wide-leg trousers designed with a fluid silhouette and a clean tailored finish.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["BLUSH", "BLACK"],
  },
  {
    id: 3,
    name: "Burgundy Off-Shoulder Dress",
    category: "WOMEN",
    price: 4990,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    description: "A sculptural off-shoulder dress in deep burgundy with a clean, minimal line.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["BURGUNDY"],
  },
  {
    id: 4,
    name: "Marigold Embroidered Dress",
    category: "WOMEN",
    price: 5490,
    image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85",
    description: "A relaxed midi dress in marigold with artisanal embroidery and a belted waist.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["MARIGOLD"],
  },
  {
    id: 5,
    name: "Classic Denim Jacket",
    category: "MEN",
    price: 3990,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=85",
    description: "A classic denim jacket with a structured fit and timeless everyday styling.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["BLUE", "BLACK"],
  },
  {
    id: 6,
    name: "Relaxed White Shirt",
    category: "MEN",
    price: 2990,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    description: "A relaxed cotton shirt with a clean profile and versatile everyday construction.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["WHITE", "BLACK"],
  },
  {
    id: 7,
    name: "Leather Shoulder Bag",
    category: "ACCESSORIES",
    price: 4490,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    description: "A structured shoulder bag with a clean profile and versatile everyday proportions.",
    sizes: ["ONE SIZE"],
    colors: ["BLACK", "BROWN"],
  },
  {
    id: 8,
    name: "Court Sneakers",
    category: "ACCESSORIES",
    price: 4990,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=85",
    description: "A low-profile court sneaker with a clean leather upper and timeless styling.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["RED", "WHITE"],
  },
];

export const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;