import { useRoute } from "wouter";
import { 
  Loader2, ArrowLeft, Globe, Shield, BarChart3, 
  ExternalLink, CheckCircle2, Info, Building2 
} from "lucide-react";
import { Link } from "wouter";
// 1. นำเข้า useQuery แทน trpc
import { useQuery } from "@tanstack/react-query";

export default function BrokerDetail() {
  const [, params] = useRoute("/broker/:slug");
  const slug = params?.slug;

  // 2. ฟังก์ชันสำหรับดึงข้อมูลรายตัวจาก API
  const fetchBrokerBySlug = async () => {
    if (!slug) return null;
    const response = await fetch(`http://localhost:5000/api/brokers/${slug}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch broker details");
    }
    return response.json();
  };

  // 3. ใช้ useQuery แทนที่ trpc.brokers.getBySlug
  const { data: broker, isLoading, error } = useQuery({
    queryKey: ["broker", slug], // ระบุ slug ใน key เพื่อให้โหลดใหม่เมื่อเปลี่ยนหน้า
    queryFn: fetchBrokerBySlug,
    enabled: !!slug, // รัน query เฉพาะเมื่อมี slug เท่านั้น
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (error || !broker) return (
    <div className="container py-20 text-center">
      <h2 className="text-2xl font-bold">ไม่พบข้อมูลโบรกเกอร์</h2>
      <Link href="/" className="text-primary hover:underline mt-4 block">กลับไปหน้าหลัก</Link>
    </div>
  );

  // 4. การจัดการข้อมูล JSON (Metrics) 
  // เนื่องจาก Prisma เก็บเป็น Json เราต้องเช็คและใช้งานอย่างปลอดภัย
  

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-background pb-20">
      {/* 1. Top Navigation & Hero Section */}
      <div className="bg-white dark:bg-card border-b">
        <div className="container py-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> กลับไปหน้า Directory
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center p-4 border">
                <img src={broker.logo_url} alt={broker.name} className="max-h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-4xl font-bold">{broker.name}</h1>
                  <CheckCircle2 size={24} className="text-blue-500" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {broker.broker_type}
                  </span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <Shield size={14} /> Regulated
                  </span>
                </div>
              </div>
            </div>
            
            <a 
              href={broker.website} 
              target="_blank" 
              className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              เปิดบัญชีกับ {broker.name} <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="container mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* คอลัมน์ซ้าย: รายละเอียดเนื้อหา */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-card border rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary" /> รายละเอียดโบรกเกอร์
              </h3>
              <p className="text-muted-foreground leading-loose whitespace-pre-line text-lg">
                {broker.description}
              </p>
            </section>

            {/* Performance Statistics (ใช้ข้อมูลจาก metrics ที่ parse แล้ว) */}
          
            <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h4 className="font-bold text-primary mb-4">ทำไมต้องเลือก {broker.name}?</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["ค่าธรรมเนียมต่ำ", "รองรับภาษาไทย", "ฝาก-ถอน เร็ว", "มีใบอนุญาตถูกต้อง"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* คอลัมน์ขวา: Sidebar */}
          <div className="space-y-6">
            <section className="bg-white dark:bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold mb-6 text-lg border-b pb-2 flex items-center gap-2">
                <Building2 size={20} className="text-primary" /> ข้อมูลการติดต่อ
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-2">เว็บไซต์ทางการ</label>
                  <a href={broker.website} target="_blank" className="text-primary font-bold flex items-center gap-2 hover:underline break-all">
                    <Globe size={16} /> {broker.website}
                  </a>
                </div>
                <div>
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-2">ประเภคหลักทรัพย์</label>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-md text-xs font-bold uppercase">{broker.broker_type}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}