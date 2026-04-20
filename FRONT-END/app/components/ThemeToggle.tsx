"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // ส่งกลับปุ่มว่างที่มีขนาดเท่ากันเพื่อไม่ให้ Layout ขยับ (Layout Shift)
    return <div className="p-2 w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-all duration-300 hover:ring-2 hover:ring-blue-500/20 group overflow-hidden"
      aria-label="Toggle Theme"
    >
      {/* เอฟเฟกต์การสลับไอคอนแบบ Smooth หมุนเบาๆ */}
      <div className="relative w-5 h-5">
        <Sun 
          size={20} 
          className="absolute inset-0 text-yellow-500 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" 
        />
        <Moon 
          size={20} 
          className="absolute inset-0 text-slate-700 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" 
        />
      </div>
    </button>
  );
}