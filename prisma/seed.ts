import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const assets = [
  // Factory
  {
    name: "Automotive Assembly Plant",
    description:
      "A highly detailed automotive assembly plant scene featuring robotic arms, conveyor belts, and full production line. Perfect for World Model training in industrial environments with complex machinery and human-robot interaction scenarios.",
    category: "Factory",
    price: 299.0,
    isOpenSource: false,
    size: "4.2 GB",
    format: "USD / glTF / FBX",
    downloadUrl: "/downloads/automotive-assembly-plant.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "factory",
      "industrial",
      "automotive",
      "robot",
      "assembly",
    ]),
    featured: true,
  },
  {
    name: "Electronics Manufacturing Facility",
    description:
      "Clean-room electronics manufacturing environment with PCB assembly lines, automated inspection systems, and ESD-safe workstations. Ideal for training models on precision manufacturing tasks.",
    category: "Factory",
    price: 199.0,
    isOpenSource: false,
    size: "2.8 GB",
    format: "glTF / FBX",
    downloadUrl: "/downloads/electronics-facility.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "factory",
      "electronics",
      "pcb",
      "cleanroom",
      "manufacturing",
    ]),
    featured: false,
  },
  {
    name: "Warehouse Logistics Hub",
    description:
      "Large-scale warehouse with automated storage and retrieval systems, forklift paths, loading docks, and inventory shelving. Open-source community asset for robotics navigation research.",
    category: "Factory",
    price: 0,
    isOpenSource: true,
    size: "1.5 GB",
    format: "glTF / OBJ",
    downloadUrl: "/downloads/warehouse-logistics.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "factory",
      "warehouse",
      "logistics",
      "robot",
      "open-source",
    ]),
    featured: false,
  },
  {
    name: "Chemical Processing Plant",
    description:
      "Industrial chemical processing plant with reactor vessels, pipe networks, control rooms, and safety zones. Highly detailed for simulation of hazardous environment navigation.",
    category: "Factory",
    price: 349.0,
    isOpenSource: false,
    size: "5.1 GB",
    format: "USD / glTF / FBX",
    downloadUrl: "/downloads/chemical-plant.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518085250887-2f903c200fee?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1518085250887-2f903c200fee?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "factory",
      "chemical",
      "industrial",
      "hazardous",
      "pipes",
    ]),
    featured: false,
  },
  // Home
  {
    name: "Modern Urban Apartment",
    description:
      "A fully furnished modern apartment including living room, kitchen, bedroom, and bathroom. Photorealistic textures and accurate object placement for household robotics and AR/VR World Model training.",
    category: "Home",
    price: 149.0,
    isOpenSource: false,
    size: "1.8 GB",
    format: "USD / glTF",
    downloadUrl: "/downloads/modern-apartment.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e8a?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "home",
      "apartment",
      "indoor",
      "modern",
      "furniture",
    ]),
    featured: true,
  },
  {
    name: "Suburban Family Home",
    description:
      "Multi-room suburban house with garage, garden, and outdoor area. Covers diverse household scenarios including kitchen tasks, living room interaction, and outdoor navigation.",
    category: "Home",
    price: 189.0,
    isOpenSource: false,
    size: "2.4 GB",
    format: "glTF / FBX",
    downloadUrl: "/downloads/suburban-home.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "home",
      "house",
      "suburban",
      "garden",
      "multi-room",
    ]),
    featured: false,
  },
  {
    name: "Small Studio Flat",
    description:
      "Compact studio apartment optimized for navigation training in tight spaces. Includes realistic clutter, varied lighting conditions, and multi-surface floor types. Open-source.",
    category: "Home",
    price: 0,
    isOpenSource: true,
    size: "680 MB",
    format: "glTF / OBJ",
    downloadUrl: "/downloads/studio-flat.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "home",
      "studio",
      "compact",
      "navigation",
      "open-source",
    ]),
    featured: false,
  },
  {
    name: "Kitchen & Dining Scene Pack",
    description:
      "High-fidelity kitchen and dining room scene pack with 200+ interactive object annotations. Each object is labeled with semantic information suitable for fine-tuning manipulation models.",
    category: "Home",
    price: 99.0,
    isOpenSource: false,
    size: "1.1 GB",
    format: "USD / glTF",
    downloadUrl: "/downloads/kitchen-dining.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "home",
      "kitchen",
      "dining",
      "objects",
      "annotation",
    ]),
    featured: true,
  },
  // Others
  {
    name: "Urban Street Scene",
    description:
      "Detailed urban street environment including traffic, pedestrians, storefronts, and varied lighting conditions. Ideal for autonomous driving and outdoor navigation world models.",
    category: "Others",
    price: 249.0,
    isOpenSource: false,
    size: "3.6 GB",
    format: "USD / glTF / OpenDRIVE",
    downloadUrl: "/downloads/urban-street.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "outdoor",
      "urban",
      "street",
      "traffic",
      "autonomous-driving",
    ]),
    featured: true,
  },
  {
    name: "Hospital Ward Environment",
    description:
      "Medical facility scene covering patient wards, corridors, nursing stations, and operating preparation rooms. Suitable for healthcare robotics and assistive AI training.",
    category: "Others",
    price: 279.0,
    isOpenSource: false,
    size: "2.9 GB",
    format: "USD / glTF",
    downloadUrl: "/downloads/hospital-ward.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "hospital",
      "medical",
      "healthcare",
      "indoor",
      "robot",
    ]),
    featured: false,
  },
  {
    name: "Office Building Complex",
    description:
      "Multi-floor office building with open-plan areas, meeting rooms, cafeteria, and reception. Includes furniture annotations and navigable floor plans in NavMesh format.",
    category: "Others",
    price: 0,
    isOpenSource: true,
    size: "2.1 GB",
    format: "glTF / FBX / NavMesh",
    downloadUrl: "/downloads/office-complex.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "office",
      "building",
      "indoor",
      "navigation",
      "open-source",
    ]),
    featured: false,
  },
  {
    name: "Outdoor Nature Trail",
    description:
      "Forest trail environment with varied terrain, weather conditions, and seasonal variations. Includes 4 biome variants (summer, autumn, winter, rain) for robust outdoor navigation training.",
    category: "Others",
    price: 159.0,
    isOpenSource: false,
    size: "4.8 GB",
    format: "USD / glTF",
    downloadUrl: "/downloads/nature-trail.zip",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    ]),
    videoUrl: null,
    tags: JSON.stringify([
      "outdoor",
      "nature",
      "trail",
      "terrain",
      "weather",
    ]),
    featured: false,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  for (const asset of assets) {
    await prisma.asset.create({ data: asset });
  }

  console.log(`✅ Created ${assets.length} assets`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
