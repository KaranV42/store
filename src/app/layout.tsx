// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

// Configure Inter for UI, Body, and Buttons
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Configure Playfair for Editorial Headings
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AMD | Contemporary Fashion",
    template: "%s | AMD",
  },
  description: "Contemporary fashion designed for everyday expression.",
  openGraph: {
    siteName: "AMD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply both font variables to the root HTML element */}
      <body className={`${inter.variable} ${playfair.variable}`}>
        <SmoothScroll>
          <div className="app">
            <StoreProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </StoreProvider>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}