import { Metadata } from "next";
import BrokerList from "./components/BrokerList";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Institutional Brokers",
  description: "Discover and explore premium brokers",
};


async function getBrokers() {
  const res = await fetch("http://localhost:5000/api/brokers", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const brokers = await getBrokers();

  return (
    <main className="min-h-screen">
      <BrokerList initialData={brokers} />
    </main>
  );
}