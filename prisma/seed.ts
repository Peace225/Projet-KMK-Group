import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "kouassim@kmkgroup.com" },
    update: {},
    create: {
      email: "kouassim@kmkgroup.com",
      name: "Admin KMK",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Categories
  const agri = await prisma.category.upsert({
    where: { slug: "agriculture" },
    update: {},
    create: { name: "Agriculture", slug: "agriculture" },
  });
  const news = await prisma.category.upsert({
    where: { slug: "actualites" },
    update: {},
    create: { name: "Actualités", slug: "actualites" },
  });

  // Posts
  await prisma.post.upsert({
    where: { slug: "lancement-projet-agricole-100-hectares" },
    update: { coverImage: "/images/agriculture.jpg" },
    create: {
      title: "Lancement du projet agricole de 100 hectares",
      titleEn: "Launch of the 100-hectare agricultural project",
      slug: "lancement-projet-agricole-100-hectares",
      excerpt: "KMK GROUP SARL lance son projet phare d'agriculture intensive sur 100 hectares dans la région.",
      excerptEn: "KMK GROUP SARL launches its flagship intensive farming project on 100 hectares in the region.",
      content: `<p>KMK GROUP SARL est fière d'annoncer le lancement officiel de son projet agricole phare couvrant 100 hectares de terres fertiles. Ce projet représente un investissement total de 205 millions de FCFA et vise à transformer l'agriculture locale.</p><p>Le projet comprend des cultures vivrières, des cultures de rente, et un système d'irrigation moderne permettant deux récoltes par an.</p>`,
      contentEn: `<p>KMK GROUP SARL is proud to announce the official launch of its flagship agricultural project covering 100 hectares of fertile land. This project represents a total investment of 205 million FCFA and aims to transform local agriculture.</p>`,
      coverImage: "/images/agriculture.jpg",
      published: true,
      categoryId: agri.id,
    },
  });

  await prisma.post.upsert({
    where: { slug: "kmk-group-partenariat-strategique" },
    update: { coverImage: "/images/agriculture-moderne.jpg" },
    create: {
      title: "KMK GROUP signe un partenariat stratégique",
      titleEn: "KMK GROUP signs a strategic partnership",
      slug: "kmk-group-partenariat-strategique",
      excerpt: "Un nouveau partenariat pour renforcer nos capacités dans le secteur de la construction.",
      excerptEn: "A new partnership to strengthen our capabilities in the construction sector.",
      content: `<p>KMK GROUP SARL annonce la signature d'un partenariat stratégique majeur visant à renforcer ses activités dans le secteur de la construction et du BTP.</p>`,
      contentEn: `<p>KMK GROUP SARL announces the signing of a major strategic partnership aimed at strengthening its activities in the construction and civil engineering sector.</p>`,
      coverImage: "/images/agriculture-moderne.jpg",
      published: true,
      categoryId: news.id,
    },
  });

  // Activities
  const activities = [
    {
      slug: "agriculture",
      title: "Agriculture",
      titleEn: "Agriculture",
      description: "Culture de manioc, igname, maïs et cultures de rente sur 100 hectares avec des techniques modernes et durables.",
      descriptionEn: "Cassava, yam, corn and cash crops on 100 hectares using modern and sustainable techniques.",
      icon: "Sprout",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600",
      impact: "100 hectares cultivés, 500 emplois créés",
      impactEn: "100 hectares cultivated, 500 jobs created",
      order: 1,
    },
    {
      slug: "elevage",
      title: "Élevage",
      titleEn: "Livestock",
      description: "Élevage bovin et avicole (poulets de chair, pondeuses) avec des standards sanitaires élevés pour une production de qualité.",
      descriptionEn: "Cattle and poultry farming (broilers, laying hens) with high health standards for quality production.",
      icon: "Beef",
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600",
      impact: "1000+ bovins & volailles",
      impactEn: "1000+ cattle & poultry",
      order: 2,
    },
    {
      slug: "construction",
      title: "Construction & BTP",
      titleEn: "Construction & Civil Engineering",
      description: "Réalisation de projets de construction résidentielle, commerciale et d'infrastructures publiques.",
      descriptionEn: "Residential, commercial and public infrastructure construction projects.",
      icon: "Building2",
      image: "/images/btp.jpg",
      impact: "50+ projets réalisés",
      impactEn: "50+ completed projects",
      order: 3,
    },
    {
      slug: "reboisement",
      title: "Reboisement",
      titleEn: "Reforestation",
      description: "Programme de reboisement et de protection de l'environnement pour un avenir durable.",
      descriptionEn: "Reforestation and environmental protection program for a sustainable future.",
      icon: "Trees",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
      impact: "50 000 arbres plantés",
      impactEn: "50,000 trees planted",
      order: 4,
    },
    {
      slug: "location-voitures",
      title: "Location de Voitures",
      titleEn: "Car Rental",
      description: "Flotte de véhicules modernes disponibles pour particuliers et entreprises.",
      descriptionEn: "Fleet of modern vehicles available for individuals and businesses.",
      icon: "Car",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600",
      impact: "30+ véhicules disponibles",
      impactEn: "30+ vehicles available",
      order: 5,
    },
    {
      slug: "audiovisuel",
      title: "Audiovisuel",
      titleEn: "Audiovisual",
      description: "Production audiovisuelle, événementielle et communication visuelle pour entreprises.",
      descriptionEn: "Audiovisual production, events and visual communication for businesses.",
      icon: "Video",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600",
      impact: "200+ productions réalisées",
      impactEn: "200+ productions completed",
      order: 6,
    },
  ];

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { slug: activity.slug },
      update: {},
      create: activity,
    });
  }

  // Gallery
  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800", category: "agriculture", title: "Champs de maïs" },
    { url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800", category: "agriculture", title: "Récolte" },
    { url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800", category: "elevage", title: "Élevage bovin" },
    { url: "/images/btp.jpg", category: "construction", title: "Chantier" },
    { url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800", category: "reboisement", title: "Forêt" },
    { url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800", category: "transport", title: "Flotte véhicules" },
  ];

  for (let i = 0; i < galleryImages.length; i++) {
    await prisma.galleryImage.create({ data: { ...galleryImages[i], order: i } }).catch(() => {});
  }

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
