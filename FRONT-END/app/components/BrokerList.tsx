// app/components/BrokerList.tsx (หรือตำแหน่งที่คุณวางไฟล์ไว้)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Globe, Shield, Zap, ArrowUpRight } from "lucide-react";

type Props = {
    initialData: any[];
};

export default function BrokerList({ initialData }: Props) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [brokers, setBrokers] = useState(initialData);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const toggleType = (type: string) => {
        if (type === "all") {
            setSelectedTypes([]);
            return;
        }
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };
    const clearFilters = () => {
        setSelectedTypes([]);
        setSearch("");
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const params = new URLSearchParams();
            if (debouncedSearch) params.append("search", debouncedSearch);
            if (selectedTypes.length > 0) params.append("types", selectedTypes.join(","));

            try {
                const res = await fetch(`http://localhost:5000/api/brokers?${params.toString()}`);
                const data = await res.json();
                setBrokers(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [debouncedSearch, selectedTypes]);

    return (

        <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-500">

            {/* --- HEADER SECTION --- */}
            <header className="container mx-auto pt-16 pb-12 px-4">
                <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    Institutional Brokers
                </h1>
                <p className="text-slate-500 dark:text-gray-400 text-lg max-w-2xl">
                    Access global liquidity through our curated network of elite financial institutions.
                </p>
            </header>


            <section className=" bg-white/80 dark:bg-[#050b15]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-6 mb-10">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-6 items-center">
                    {/* Search Input */}
                    <div className="relative w-full lg:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Find brokers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}

                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm text-slate-900 dark:text-white"
                        />
                    </div>

                    {/* Filter Chips */}
                    {/* Filter Chips */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-gray-500 font-bold mr-2">Asset Focus:</span>

                        {/* ปุ่ม ALL */}
                        <button
                            onClick={() => toggleType("all")}
                            className={`px-5 py-2 rounded-full text-[10px] font-bold transition-all border ${selectedTypes.length === 0
                                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10"
                                }`}
                        >
                            ALL
                        </button>

                        {/* รายการประเภทต่างๆ */}
                        {["cfd", "bond", "stock", "crypto"].map((type) => (
                            <button
                                key={type}
                                onClick={() => toggleType(type)}
                                className={`px-5 py-2 rounded-full text-[10px] font-bold transition-all border ${selectedTypes.includes(type)
                                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10"
                                    }`}
                            >
                                {type.toUpperCase()}
                            </button>
                        ))}

                        {/* ปุ่ม Clear (แสดงเมื่อมีการ Filter เท่านั้น) */}
                        {(selectedTypes.length > 0 || search !== "") && (
                            <button
                                onClick={clearFilters}
                                className="text-[10px] font-bold text-red-500 hover:text-red-600 dark:text-red-400 underline underline-offset-4 ml-2 transition-colors"
                            >
                                CLEAR FILTERS
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* --- GRID LIST SECTION --- */}
            <main className="container mx-auto px-4 pb-20">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {brokers.map((b: any) => (
                            <Link key={b.id} href={`/broker/${b.slug}`} className="group">

                                <div className="bg-white dark:bg-[#0f172a]/50 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-xl dark:group-hover:shadow-blue-500/10">
                                    {/* Thumbnail */}
                                    <div className="relative h-48 w-full bg-slate-200 dark:bg-gray-800 overflow-hidden">
                                        <img
                                            src={b.logo_url || "/api/placeholder/400/200"}
                                            alt={b.name}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f172a] via-transparent to-transparent" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {b.name}
                                        </h3>
                                        <p className="text-slate-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 font-light">
                                            {b.description || "Specializing in high-frequency execution and multi-asset liquidity across global markets."}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                                            <div className="flex items-center gap-4 text-[9px] uppercase tracking-wider text-slate-400 dark:text-gray-500 font-bold">
                                                <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-blue-500" /> TIER 1</span>
                                                <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-blue-500" /> GLOBAL</span>
                                            </div>
                                            <span className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                                                Details <ArrowUpRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Partner Card */}
                        <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-white/2 backdrop-blur-sm">
                            <Zap className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Partner with Us</h3>
                            <p className="text-sm text-slate-500 dark:text-gray-500 mb-6 font-light">Are you an institutional broker? Join our network.</p>
                            <Link href="/create">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                                    Inquire Now
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}