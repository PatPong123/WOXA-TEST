import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  User as UserIcon,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  Menu,
  X,
  LayoutDashboard,
  Users,
  BarChart3,
  MessageSquare,
  ShoppingBag,
  Sprout,
  ShoppingCart
} from "lucide-react";
import { useLocation, Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

import type { Order } from "@/types/order";

export default function MainHeader({ onLogout }: { onLogout?: () => void }) {
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // State สำหรับจัดการข้อมูล User
  const [userData, setUserData] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }, [location]); // เช็คข้อมูลใหม่ทุกครั้งที่เปลี่ยนหน้า

  const isAuthenticated = !!userData;
  const isAdmin = userData?.role === "admin";
  const orderConfirm = orders.filter(o => o.status === "รอการยืนยัน");
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur">
      <div className="w-full max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between relative">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity group"
          onClick={() => setLocation(isAdmin ? "/admin" : isAuthenticated ? "/" : "/")}
        >
        
          <h1 className="text-xl md:text-2xl font-bold tracking-tight"> Institutional Brokers</h1>
          {isAdmin && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold ml-1">ADMIN</span>}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" onClick={() => setLocation("/create-broker")}>Inquire Now</Button>
              <Button variant="ghost" onClick={() => setLocation("/")}>Brokers</Button>
              {/* <Button onClick={() => setLocation("/login")}>เข้าสู่ระบบ</Button> */}
            </>
          ) : (
            <>
              {/* --- เมนูแยกตามสิทธิ์ --- */}
              {isAdmin ? (
                <>
                  <Button variant="ghost" className="font-bold" onClick={() => setLocation("/admin")}>
                    <LayoutDashboard className="w-4 h-4 mr-2" /> แดชบอร์ด
                  </Button>

                  <Button variant="ghost" className="font-bold" onClick={() => setLocation("/admin/vegetables")}>
                    <Sprout className="w-4 h-4 mr-2" /> จัดการผัก
                  </Button>
                  <Button variant="ghost" className="font-bold" onClick={() => setLocation("/admin/statistical")}>
                    <BarChart3 className="w-4 h-4 mr-2" /> สถิติ
                  </Button>
                  <Button variant="ghost" className="font-bold" onClick={() => setLocation("/admin/users")}>
                    <Users className="w-4 h-4 mr-2" /> ผู้ใช้งาน
                  </Button>
                </>
              ) : (
                <>

                  <Button variant="ghost" className="font-bold" onClick={() => setLocation("/dashboard")}>แดชบอร์ด</Button>
                  <Button variant="ghost" className="font-bold" onClick={() => setLocation("/vegetables")}>ผักทั้งหมด</Button>
                  <Button variant="ghost" className="font-bold" onClick={() => setLocation("/feedback")}>ข้อเสนอแนะ</Button>
                  <Button variant="ghost" className="font-bold" onClick={() => setLocation("/about")}>เกี่ยวกับเรา</Button>
                  <Button variant="ghost" className="font-bold relative" onClick={() => setLocation("/delivery/confirmPurchase")}>
                    <ShoppingCart className="w-4 h-4 mr-2" />

                  
                  </Button>
                </>
              )}

              {/* Profile Dropdown (ใช้ร่วมกันแต่เนื้อหาข้างในต่างกัน) */}
              <div className="relative group ml-2">
                <Button variant="outline" className="font-bold flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> {isAdmin ? "แอดมิน" : "โปรไฟล์"}
                </Button>
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  {!isAdmin && (
                    <>


                      <button onClick={() => setLocation("/profile")} className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2">
                        <UserIcon className="w-4 h-4" /> ข้อมูลส่วนตัว
                      </button>
                      <button onClick={() => setLocation("/myOrder")} className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> การซื้อของฉัน
                      </button>
                    </>
                  )}
                  {isAdmin && (
                    <button onClick={() => setLocation("/admin/feedback")} className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> จัดการข้อเสนอแนะ
                    </button>
                  )}
                  <hr className="border-border" />
                  <button onClick={onLogout} className="w-full px-4 py-2 text-left text-sm hover:bg-destructive/10 text-destructive flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> ออกจากระบบ
                  </button>
                </div>
              </div>
            </>
          )}

          <Button size="icon" variant="ghost" className="ml-2" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </nav>

        {/* Mobile Header Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <Button size="icon" variant="outline" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 z-50 bg-background border-b shadow-md flex flex-col px-6 py-4 gap-2 md:hidden">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 mb-2 bg-muted/50 rounded-lg">
                  <p className="text-xs font-bold text-muted-foreground uppercase">{isAdmin ? "Admin Access" : "User Menu"}</p>
                  <p className="text-sm font-semibold truncate">{userData?.email}</p>
                </div>

                {isAdmin ? (
                  <>
                    <MobileItem
                      icon={<ShoppingCart />}
                    
                      href="/delivery/confirmPurchase"
                      onClick={() => setMenuOpen(false)}
                    />

                    <MobileItem icon={<LayoutDashboard />} label="แดชบอร์ด" href="/dashboard" onClick={() => setMenuOpen(false)} />
                    <MobileItem icon={<LayoutDashboard />} label="แดชบอร์ด" href="/admin" onClick={() => setMenuOpen(false)} />
                    <MobileItem icon={<Sprout />} label="จัดการผัก" href="/admin/vegetables" onClick={() => setMenuOpen(false)} />
                    <MobileItem icon={<Users />} label="ผู้ใช้งาน" href="/admin/users" onClick={() => setMenuOpen(false)} />
                  </>
                ) : (
                  <>
                    <MobileItem icon={<LayoutDashboard />} label="แดชบอร์ด" href="/dashboard" onClick={() => setMenuOpen(false)} />
                    <MobileItem icon={<Sprout />} label="ผักทั้งหมด" href="/vegetables" onClick={() => setMenuOpen(false)} />
                    <MobileItem icon={<ShoppingBag />} label="การซื้อของฉัน" href="/myOrder" onClick={() => setMenuOpen(false)} />
                  </>
                )}

                <hr className="my-1" />
                <Button variant="ghost" className="justify-start font-bold text-destructive" onClick={() => { onLogout?.(); setMenuOpen(false); }}>
                  <LogOut className="w-4 h-4 mr-2" /> ออกจากระบบ
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={() => { setLocation("/login"); setMenuOpen(false); }}>เข้าสู่ระบบ</Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// Helper Component สำหรับ Mobile Menu
function MobileItem({ icon, label, href, onClick }: any) {
  const [, setLocation] = useLocation();
  return (
    <Button
      variant="ghost"
      className="justify-start font-bold w-full"
      onClick={() => {
        setLocation(href);
        onClick();
      }}
    >
      <span className="w-5 h-5 mr-3 opacity-70">{icon}</span>
      {label}
    </Button>
  );
}