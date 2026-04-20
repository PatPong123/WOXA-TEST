import { Link } from "wouter";
import { Leaf, Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (

    <footer className="bg-white border-t mt-10">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              ร่วมปลูกผักสดใหม่ <br />
              และจัดการฟาร์มของคุณไปกับเรา
            </h2>
            <div className="space-y-4 text-slate-600 max-w-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm leading-relaxed">
                  213 หมู่ที่ 13 ถนนเลี่ยงเมือง ตำบลบ้านเป็ด <br />
                  อำเภอเมืองขอนแก่น จังหวัดขอนแก่น 40000
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm">043-258-196 (Main Office) <br />
                  080-640-4050 (Sales Dept.)</p>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm">info@automotionworks.com</p>
              </div>
            </div>
            <Link href="/about">
              <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 hover:bg-slate-800 transition-all group">
                เกี่ยวกับเรา
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Pages</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground"> {/* ลด space-y-2 */}
              <li><Link href="/" className="hover:text-green-600 transition-colors">หน้าหลัก</Link></li>
              <li><Link href="/vegetables" className="hover:text-green-600 transition-colors">รายการผัก</Link></li>
              {/* <li><Link href="/services" className="hover:text-green-600 transition-colors">บริการของเรา</Link></li> */}

            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Legal</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex gap-4 text-slate-600">
                <Facebook className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors" />
                <Instagram className="w-4 h-4 cursor-pointer hover:text-pink-600 transition-colors" />
                <Youtube className="w-4 h-4 cursor-pointer hover:text-red-600 transition-colors" />
              </div>
            </div>
          </div>
        </div>


        <div className="mt-8 overflow-hidden select-none pointer-events-none text-center">
          <h1 className="text-[8vw] font-black text-slate-50 leading-none uppercase tracking-tighter">
            Smart Farm
          </h1>
        </div>


        <div className="mt-4 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <Leaf className="w-3 h-3 text-green-600" />
            <span>© 2026 Smart Farm Project.</span>
          </div>
          <p>Full Stack Developer Team</p>
        </div>
      </div>
    </footer>
  );
}