import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "New Site",
  description: "New homepage extracted from Osstem Mall",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-pretendard">
        <CartProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
          </Suspense>
          <main className="min-h-[600px]">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
