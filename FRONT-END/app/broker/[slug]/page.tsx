import { Metadata } from "next";
import {
  ArrowLeft, Globe, Shield, ExternalLink,
  CheckCircle2, Mail, MapPin, TrendingUp, Zap, FileText
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// 1. ดึงข้อมูลจาก API
async function getBroker(slug: string) {
  const res = await fetch(`http://localhost:5000/api/brokers/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function BrokerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const broker = await getBroker(slug);

  if (!broker) notFound();

  const metrics = typeof broker.metrics === 'string' ? JSON.parse(broker.metrics) : (broker.metrics || {});
  console.log(broker)
  const typeColorMap: any = {
    crypto: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    stock: "bg-green-500/10 text-green-400 border-green-500/20",
    bond: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    cfd: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <main className="min-h-screen bg-background text-foreground font-sans transition-colors duration-500">


      <section className="relative h-[65vh] w-full flex items-end pb-20">

        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={broker.logo_url} // ใช้ URL จากข้อมูลที่คุณส่งมา
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Overlay ป้องกันภาพโดดและช่วยให้ Text อ่านง่าย */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b15] via-[#050b15]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050b15] via-transparent to-transparent" />
        </div>

        {/* 2. Content Layer */}
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mt-20">
              <span className="bg-blue-600 px-2 py-0.5 text-[10px] font-bold rounded-sm tracking-widest">
                INSTITUTIONAL GRADE
              </span>
              <span className="text-blue-400 text-[10px]">★★★★★</span>
            </div>

            <h1 className="text-7xl font-bold tracking-tight leading-none">
              {broker.name}
            </h1>

            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-xl">
              {broker.description}
            </p>

            <div className="flex items-center gap-4">
              <a
                href={broker.website}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-md font-bold transition-all text-sm shadow-lg shadow-blue-500/20"
              >
                Visit Website
              </a>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-md font-bold transition-all text-sm backdrop-blur-md">
                Download Prospectus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="container mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Column */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold mb-8 tracking-tight flex items-center">
              <span className="mr-4"> {broker.name}</span>

              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 
              translate-y-[2px]"${typeColorMap[broker.broker_type]
                }`}>
                {broker.broker_type}
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light mb-12">
              {broker.description}
            </p>

            {/* Bottom Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0f172a]/50 border border-white/5 p-8 rounded-xl shadow-xl">
                <Shield className="text-blue-500 mb-4" size={28} />
                <h4 className="font-bold mb-2">SEC & FCA Regulated</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Operating under the strictest global mandates for transparency and capital reserve requirements.
                </p>
              </div>
              <div className="bg-[#0f172a]/50 border border-white/5 p-8 rounded-xl shadow-xl">
                <Zap className="text-blue-500 mb-4" size={28} />
                <h4 className="font-bold mb-2">12ms Execution</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Industry-leading throughput powered by our proprietary Sterling Core engine.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Performance Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#111827] border border-white/5 rounded-2xl p-10 sticky top-24 shadow-2xl">
              <h3 className="text-xl font-bold mb-10 border-b border-white/5 pb-4">Performance Metrics</h3>

              <div className="space-y-12">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-gray-500 tracking-widest font-bold">AUM GROWTH (YOY)</span>
                    <TrendingUp size={14} className="text-blue-500" />
                  </div>
                  <div className="text-4xl font-bold">+{metrics.aum_growth || "24.8"}%</div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-gray-500 tracking-widest font-bold">LIQUIDITY ACCESS</span>
                    <span className="text-[10px] text-gray-600">Daily Average</span>
                  </div>
                  <div className="text-4xl font-bold">${metrics.liquidity || "12.4"}B</div>
                </div>

                <div className="pt-6">
                  <button className="w-full py-4 border border-white/10 rounded-lg text-xs font-bold text-gray-400 hover:bg-white/5 transition-all">
                    View Full Audit Report
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}