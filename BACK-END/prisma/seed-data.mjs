import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const brokersData = [
  {
    name: "Vanguard Capital",
    slug: "vanguard-capital",
    description:
      "A premier institutional broker specializing in equity and derivatives markets.",
    logo_url:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    website: "https://vanguardcapital.example.com",
    broker_type: "stock",

  },
  {
    name: "Meridian Bonds",
    slug: "meridian-bonds",
    description:
      "Meridian Bonds is a leading fixed-income specialist offering access to global bond markets.",


    logo_url:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    website: "https://meridianbonds.example.com",
    broker_type: "bond",

  },
  {
    name: "Apex Equities",
    slug: "apex-equities",
    description:
      "Apex Equities delivers institutional-grade equity trading with direct market access.",
    logo_url:
     "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&q=80",
    website: "https://apexequities.example.com",
    broker_type: "stock",
 
 
  },
  {
    name: "BlockStream Prime",
    slug: "blockstream-prime",
    description:
      "BlockStream Prime is a crypto-native institutional broker offering spot, futures, and options.",
    logo_url:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80",
    website: "https://blockstreamprime.example.com",
    broker_type: "crypto",
  

  },
  {
    name: "Summit Analytics",
    slug: "summit-analytics",
    description:
      "Summit Analytics is a quantitative CFD broker offering access to indices and forex.",
    logo_url:
     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    website: "https://summitanalytics.example.com",
    broker_type: "cfd",
 
  },
];

async function main() {
  console.log("🚀 Start seeding...");

  for (const b of brokersData) {
    await prisma.brokers.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
    console.log(`✅ Created: ${b.name}`);
  }

  console.log("✨ Seeding finished.");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });