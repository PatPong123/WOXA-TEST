import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Debounce search input (เหมือนเดิม)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // 2. ฟังก์ชัน Fetcher สำหรับดึงข้อมูลจาก Node.js API
  const fetchBrokers = async () => {
    // สร้าง Query String สำหรับ search และ types
    const params = new URLSearchParams();
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (selectedTypes.length > 0) params.append("types", selectedTypes.join(","));

    const response = await fetch(`http://localhost:5000/api/brokers?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  // 3. ใช้ useQuery แทน trpc.brokers.list.useQuery
  const { data: brokers, isLoading, error } = useQuery({
    queryKey: ["brokers", debouncedSearch, selectedTypes], // Key จะเปลี่ยนตามตัวกรองเพื่อ Fetch ใหม่
    queryFn: fetchBrokers,
  });

  return (
       <>
      <Helmet>
        <title>Institutional Brokers</title>
        <meta name="description" content="Discover and explore premium brokers" />
      </Helmet>
    <main className="min-h-screen">
      <section className="bg-background border-b border-border py-16 md:py-8">
        <div className="container">
          <h1 className="headline text-5xl md:text-4xl mb-4">
           Institutional Brokers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover and explore premium brokers across multiple asset classes. Search, filter, and learn about each broker's specialties.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-background border-b border-border py-8">
        <div className="container">
          {/* ใช้ md:flex-row เพื่อให้บรรทัดเดียวกันในจอคอม และ flex-col ในมือถือ */}
          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* ฝั่งซ้าย: Search Input (แบ่งครึ่งหรือยืดตามพื้นที่ที่เหลือ) */}
            <div className="w-full md:flex-1">
              <Input
                placeholder="Search brokers by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            {/* ฝั่งขวา: Checkbox Group (แบ่งครึ่งหน้า) */}
            <div className="w-full md:flex-1 flex flex-wrap items-center justify-start md:justify-end gap-3">
              <span className="text-sm font-medium text-muted-foreground mr-2">Filters:</span>
              {["cfd", "bond", "stock", "crypto"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center space-x-2 cursor-pointer px-3 py-1.5 rounded-md border transition-all ${selectedTypes.includes(type)
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-transparent text-muted-foreground hover:border-primary/50"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-bold uppercase">{type}</span>
                </label>
              ))}

              {selectedTypes.length > 0 && (
                <button
                  onClick={() => setSelectedTypes([])}
                  className="text-xs text-destructive hover:underline ml-2"
                >
                  Reset
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Broker List Section */}
      <section className="py-16">
        <div className="container">
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">Error loading brokers. Please try again.</p>
            </div>
          )}

          {!isLoading && (!brokers || brokers.length === 0) && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No brokers found.</p>
            </div>
          )}

          {!isLoading && brokers && brokers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brokers.map((broker: any) => (
                <Link key={broker.id} href={`/broker/${broker.slug}`} className="no-underline">
                  <div className="editorial-card hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
                    {/* Broker Logo */}
                    <div className="mb-4 w-full aspect-[16/9] flex items-center justify-center bg-muted rounded-md overflow-hidden p-4">
                      {broker.logo_url ? (
                        <img
                          src={broker.logo_url}
                          alt={broker.name}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="text-muted-foreground text-xs italic">No image available</div>
                      )}
                    </div>

                    {/* Broker Name */}
                    <h3 className="subheading mb-2">{broker.name}</h3>

                    {/* Broker Type Badge */}
                    <div className="mb-3">
                      <span className="caption bg-muted text-muted-foreground px-2 py-1 rounded-sm">
                        {broker.broker_type.toUpperCase()}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {broker.description.length > 100
                        ? broker.description.substring(0, 100) + "..."
                        : broker.description}
                    </p>

                    {/* View Details Link */}
                    <div className="text-primary text-sm font-semibold hover:underline">
                      View Details →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
     </>
  );
}