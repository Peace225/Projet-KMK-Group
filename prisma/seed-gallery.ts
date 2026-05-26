import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const images = [
  // Agriculture — images du client
  { url: "/images/agriculture/image7.jpg",   category: "agriculture", title: "Cultures", order: 1 },
  { url: "/images/agriculture/image8.jpg",   category: "agriculture", title: "Champs", order: 2 },
  { url: "/images/agriculture/image21.jpg",  category: "agriculture", title: "Agriculture", order: 3 },
  { url: "/images/agriculture/image22.jpeg", category: "agriculture", title: "Plantation", order: 4 },
  { url: "/images/agriculture/image23.jpg",  category: "agriculture", title: "Recolte", order: 5 },
  { url: "/images/agriculture/image24.jpeg", category: "agriculture", title: "Cultures vivrieres", order: 6 },
  { url: "/images/agriculture/image26.jpeg", category: "agriculture", title: "Champs de cultures", order: 7 },
  { url: "/images/agriculture/image27.jpg",  category: "agriculture", title: "Agriculture moderne", order: 8 },
  { url: "/images/agriculture/image28.jpg",  category: "agriculture", title: "Production agricole", order: 9 },
  { url: "/images/agriculture/image29.jpg",  category: "agriculture", title: "Manioc et igname", order: 10 },
  { url: "/images/agriculture/image30.jpg",  category: "agriculture", title: "Cultures de rente", order: 11 },
  { url: "/images/agriculture/image31.jpg",  category: "agriculture", title: "Terrain agricole", order: 12 },
  { url: "/images/agriculture/image60.jpeg", category: "agriculture", title: "Exploitation agricole", order: 13 },
  // Elevage — images du client
  { url: "/images/elevage/image4.jpg",   category: "elevage", title: "Elevage", order: 14 },
  { url: "/images/elevage/image6.jpeg",  category: "elevage", title: "Bovins", order: 15 },
  { url: "/images/elevage/image9.jpeg",  category: "elevage", title: "Troupeau", order: 16 },
  { url: "/images/elevage/image10.jpg",  category: "elevage", title: "Aviculture", order: 17 },
  { url: "/images/elevage/image11.jpg",  category: "elevage", title: "Poulailler", order: 18 },
  { url: "/images/elevage/image12.jpeg", category: "elevage", title: "Pisciculture", order: 19 },
  { url: "/images/elevage/image13.jpeg", category: "elevage", title: "Caprins", order: 20 },
  { url: "/images/elevage/image14.jpeg", category: "elevage", title: "Apiculture", order: 21 },
  { url: "/images/elevage/image15.jpeg", category: "elevage", title: "Aulacodes", order: 22 },
  { url: "/images/elevage/image16.jpeg", category: "elevage", title: "Elevage diversifie", order: 23 },
  { url: "/images/elevage/image19.jpeg", category: "elevage", title: "Production animale", order: 24 },
  // Construction
  { url: "/images/btp.jpg",  category: "construction", title: "Chantier", order: 25 },
  { url: "/images/btp1.jpg", category: "construction", title: "Construction", order: 26 },
  { url: "/images/btp2.jpg", category: "construction", title: "Batiment", order: 27 },
  { url: "/images/btp3.jpg", category: "construction", title: "Infrastructure", order: 28 },
  // Reboisement
  { url: "/images/reboisement.jpg", category: "reboisement", title: "Reboisement", order: 29 },
  // Transport
  { url: "/images/location-voiture.jpg", category: "transport", title: "Flotte vehicules", order: 30 },
  // Espaces publicitaires
  { url: "/images/panneau_pub.jpg", category: "audiovisuel", title: "Espaces publicitaires", order: 31 },
];

async function main() {
  console.log("Insertion des images en base...");

  // Vider la table d'abord pour eviter les doublons
  await prisma.galleryImage.deleteMany({});
  console.log("Table videe.");

  for (const img of images) {
    await prisma.galleryImage.create({ data: img });
  }

  console.log(`${images.length} images inserees avec succes.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
