// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zara-Style Store",
  description: "Contemporary fashion designed for everyday expression.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* THIS DIV IS CRITICAL FOR THE CSS TO WORK */}
        <div className="app">
          <StoreProvider>
            <div className="announcement">FREE SHIPPING ON ORDERS OVER ₹5,000</div>
            <Header />
            <main>{children}</main>
            <Footer />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}