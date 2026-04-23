"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Landmark, User, Globe, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes"; // อย่าลืมติดตั้ง next-themes

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ป้องกัน Hydration Mismatch
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Brokers", href: "/" },
    { name: "Inquire Now", href: "/create" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-[#050b15]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary-blue p-2 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white group-hover:text-primary-blue transition-colors">
            WOXA<span className="text-primary-blue"></span>
          </span>
        </Link>

        {/* --- DESKTOP NAV & ACTIONS --- */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-blue dark:hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/10" /> */}

   
          {/* {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-gray-500 dark:text-gray-400"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )} */}

        
        </div>

        {/* --- MOBILE BUTTONS --- */}
        {/* <div className="flex md:hidden items-center gap-4">
        
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button 
            className="text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div> */}
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#050b15] border-b border-gray-200 dark:border-white/10 p-6 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-xl font-semibold text-gray-900 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <hr className="border-gray-200 dark:border-white/10" />
          <div className="flex flex-col gap-4">
            <button className="w-full text-center py-3 text-gray-900 dark:text-white font-bold border border-gray-200 dark:border-white/10 rounded-xl">
              Log In
            </button>
            <button className="w-full bg-primary-blue text-white py-4 rounded-xl font-black shadow-lg">
              Open Account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}