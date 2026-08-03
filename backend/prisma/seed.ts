import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, ListingType } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });


const saleProperties = [
  {
    slug: "beachfront-bliss",
    title: "Beachfront Bliss",
    projectName: "Beachfront Bliss",
    address: "456 Palm Avenue, California",
    location: "Beverly Hills",
    sqft: "12,500",
    floor: "1",
    rooms: "4",
    price: "$750,000",
    image: "/property-1.jpg",
    gallery: ["/property-1.jpg", "/property-2.jpg", "/property-3.jpg"],
    map: "/property-map.png",
  },
  {
    slug: "green-meadow-retreat",
    title: "Green Meadow Retreat",
    projectName: "Green Meadow Retreat",
    address: "789 Oak Street, California",
    location: "Santa Monica",
    sqft: "8,500",
    floor: "2",
    rooms: "3",
    price: "$650,000",
    image: "https://images.unsplash.com/photo-1697807650304-907257330a3e?w=800&q=80",
  },
  {
    slug: "sunny-villa",
    title: "Sunny Villa",
    projectName: "Sunny Villa",
    address: "321 Maple Drive, California",
    location: "Malibu",
    sqft: "15,000",
    floor: "1",
    rooms: "5",
    price: "$1,200,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    slug: "city-loft",
    title: "City Loft",
    projectName: "City Loft",
    address: "100 Main Street, California",
    location: "Los Angeles",
    sqft: "3,200",
    floor: "5",
    rooms: "2",
    price: "$450,000",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  },
  {
    slug: "mountain-cabin",
    title: "Mountain Cabin",
    projectName: "Mountain Cabin",
    address: "555 Pine Road, California",
    location: "Lake Tahoe",
    sqft: "4,500",
    floor: "1",
    rooms: "3",
    price: "$550,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
];

const rentalProperties = [
  {
    slug: "downtown-apartment",
    title: "Downtown Apartment",
    projectName: "Downtown Apartment",
    address: "200 Market Street, California",
    location: "San Francisco",
    sqft: "1,200",
    floor: "10",
    rooms: "2",
    price: "$3,500/month",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    slug: "beach-studio",
    title: "Beach Studio",
    projectName: "Beach Studio",
    address: "50 Ocean Drive, California",
    location: "Santa Monica",
    sqft: "650",
    floor: "3",
    rooms: "1",
    price: "$2,200/month",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  },
  {
    slug: "suburban-house",
    title: "Suburban House",
    projectName: "Suburban House",
    address: "88 Maple Avenue, California",
    location: "Irvine",
    sqft: "2,800",
    floor: "2",
    rooms: "4",
    price: "$4,800/month",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
];

const features = [
  {
    title: "Easy Financing",
    description:
      "We offer hassle-free financing options tailored to your needs. Our flexible payment plans make it easy to get the services you need without breaking the bank.",
  },
  {
    title: "Free Consultations",
    description:
      "Schedule a free consultation in the comfort of your own home. Our experts will assess your needs and provide personalized recommendations tailored to your space and lifestyle.",
  },
  {
    title: "Award Winning Service",
    description:
      "Our commitment to excellence has earned us numerous awards and accolades in the industry. Rest assured, you're in good hands with our team of dedicated professionals.",
  },
  {
    title: "Licensed & Insured",
    description:
      "We are fully licensed and insured, giving you peace of mind knowing that your project is in compliance with all regulations and standards. Your safety and satisfaction are our top priorities.",
  },
];

async function main() {
  console.log("Clearing existing data...");
  await prisma.inquiry.deleteMany();
  await prisma.property.deleteMany();
  await prisma.feature.deleteMany();

  console.log("Seeding properties...");
  const sale = saleProperties.map((p) => ({ ...p, listingType: ListingType.SALE }));
  const rent = rentalProperties.map((p) => ({ ...p, listingType: ListingType.RENT }));
  await prisma.property.createMany({ data: [...sale, ...rent] });

  console.log("Seeding features...");
  await prisma.feature.createMany({ data: features });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
