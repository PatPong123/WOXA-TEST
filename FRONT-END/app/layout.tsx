import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "./components/Header"; // ⬅️ อย่าลืม Import Header ที่เราสร้างไว้

import Providers from "./components/providers"; // ตรวจสอบ path ให้ถูกต้อง
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WOXA Institutional | Premium Broker Network",
  description: "Connect with elite brokers and institutional liquidity providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
    
       
         
          <Header />

     <Providers>
          <main className="flex-grow">
            {children}
          </main>
</Providers>
          {/* 4. Footer */}
          <footer className="border-t border-black/5 dark:border-white/5 py-8 text-center text-sm text-gray-500 bg-white dark:bg-transparent">
            © 2026  Institutional. All rights reserved.
          </footer>
        
      </body>
    </html>
  );
}