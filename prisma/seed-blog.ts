import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Récupérer ou créer les catégories
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
  const elevage = await prisma.category.upsert({
    where: { slug: "elevage" },
    update: {},
    create: { name: "Élevage", slug: "elevage" },
  });

  const posts = [
    {
      title: "KMK GROUP lance son programme agricole sur 100 hectares en Côte d'Ivoire",
      titleEn: "KMK GROUP launches its 100-hectare agricultural program in Côte d'Ivoire",
      slug: "kmk-group-programme-agricole-100-hectares",
      excerpt: "KMK GROUP SARL franchit une étape majeure avec le lancement officiel de son projet agricole phare couvrant 100 hectares de terres fertiles. Ce projet représente un investissement total de 205,5 millions de FCFA.",
      excerptEn: "KMK GROUP SARL takes a major step with the official launch of its flagship agricultural project covering 100 hectares of fertile land. This project represents a total investment of 205.5 million FCFA.",
      content: `KMK GROUP SARL est fière d'annoncer le lancement officiel de son projet agricole phare en Côte d'Ivoire.

Ce projet ambitieux couvre 100 hectares de terres fertiles et combine plusieurs activités complémentaires : cultures vivrières (manioc, igname, maïs), élevage diversifié et unité de transformation des produits agricoles.

L'investissement total s'élève à 205,5 millions de FCFA, répartis entre les infrastructures de forage, les équipements agricoles, les installations d'élevage et les conteneurs frigorifiques pour la conservation des produits.

Ce projet vise à créer plus de 500 emplois directs et indirects dans la région, tout en contribuant à la sécurité alimentaire locale. KMK GROUP s'engage à utiliser des techniques agricoles modernes et durables pour maximiser les rendements tout en préservant l'environnement.

Les premières récoltes sont attendues dans les prochains mois. Le groupe prévoit également de développer des partenariats avec les agriculteurs locaux pour étendre l'impact de ce programme au-delà de ses propres terres.`,
      contentEn: `KMK GROUP SARL is proud to announce the official launch of its flagship agricultural project in Côte d'Ivoire.

This ambitious project covers 100 hectares of fertile land and combines several complementary activities: food crops (cassava, yam, corn), diversified livestock farming and an agricultural processing unit.

The total investment amounts to 205.5 million FCFA, distributed between drilling infrastructure, agricultural equipment, livestock facilities and refrigerated containers for product preservation.

This project aims to create more than 500 direct and indirect jobs in the region, while contributing to local food security. KMK GROUP is committed to using modern and sustainable agricultural techniques to maximize yields while preserving the environment.

The first harvests are expected in the coming months. The group also plans to develop partnerships with local farmers to extend the impact of this program beyond its own land.`,
      coverImage: "/images/agriculture/image27.jpg",
      published: true,
      categoryId: agri.id,
    },
    {
      title: "L'élevage diversifié au cœur de la stratégie de KMK GROUP",
      titleEn: "Diversified livestock farming at the heart of KMK GROUP's strategy",
      slug: "elevage-diversifie-strategie-kmk-group",
      excerpt: "Bovins, caprins, aviculture, pisciculture, apiculture et aulacodiculture — KMK GROUP mise sur un élevage complet et diversifié pour répondre aux besoins croissants du marché ivoirien.",
      excerptEn: "Cattle, goats, poultry, fish farming, beekeeping and grasscutter farming — KMK GROUP bets on complete and diversified livestock to meet the growing needs of the Ivorian market.",
      content: `L'élevage constitue l'un des piliers stratégiques de KMK GROUP SARL. Contrairement à une approche mono-spécifique, le groupe a fait le choix d'un élevage diversifié qui couvre l'ensemble des filières animales à fort potentiel en Côte d'Ivoire.

Les activités d'élevage de KMK GROUP comprennent :

Élevage bovin et caprin : Le groupe dispose d'un cheptel de bovins et de caprins élevés selon des standards sanitaires rigoureux. La viande produite est destinée au marché local et régional.

Aviculture : Le poulailler de KMK GROUP produit des poulets de chair et des œufs de pondeuses. Cette activité répond à une demande locale très forte et en constante croissance.

Pisciculture : L'élevage de poissons en étangs constitue une source de protéines animales accessible et très appréciée des populations locales.

Apiculture : La production de miel naturel représente une activité à haute valeur ajoutée, avec des débouchés aussi bien sur le marché local qu'à l'export.

Aulacodiculture : L'élevage d'agoutis (aulacodes) est une spécialité de KMK GROUP. Cette viande très prisée en Côte d'Ivoire offre d'excellentes perspectives commerciales.

Cette diversification permet au groupe de réduire les risques liés aux fluctuations d'un seul marché et d'optimiser l'utilisation de ses ressources foncières et humaines.`,
      contentEn: `Livestock farming is one of the strategic pillars of KMK GROUP SARL. Unlike a mono-specific approach, the group has chosen diversified livestock farming that covers all animal sectors with high potential in Côte d'Ivoire.

KMK GROUP's livestock activities include:

Cattle and goat farming: The group has a herd of cattle and goats raised according to rigorous health standards. The meat produced is intended for the local and regional market.

Poultry farming: KMK GROUP's chicken coop produces broilers and laying hens. This activity meets a very strong and constantly growing local demand.

Fish farming: Fish farming in ponds is a source of animal protein that is accessible and very popular with local populations.

Beekeeping: Natural honey production represents a high value-added activity, with outlets both on the local market and for export.

Grasscutter farming: The breeding of grasscutters (aulacodes) is a specialty of KMK GROUP. This highly prized meat in Côte d'Ivoire offers excellent commercial prospects.

This diversification allows the group to reduce risks related to fluctuations in a single market and to optimize the use of its land and human resources.`,
      coverImage: "/images/elevage/image4.jpg",
      published: true,
      categoryId: elevage.id,
    },
    {
      title: "KMK GROUP : une vision multi-activités pour le développement durable de la Côte d'Ivoire",
      titleEn: "KMK GROUP: a multi-activity vision for the sustainable development of Côte d'Ivoire",
      slug: "kmk-group-vision-multi-activites-developpement-durable",
      excerpt: "De l'agriculture à la construction, en passant par l'élevage, la location de véhicules et les espaces publicitaires, KMK GROUP SARL incarne une nouvelle génération d'entreprises africaines engagées pour le développement.",
      excerptEn: "From agriculture to construction, through livestock, vehicle rental and advertising spaces, KMK GROUP SARL embodies a new generation of African companies committed to development.",
      content: `KMK GROUP SARL est bien plus qu'une simple entreprise agricole. C'est un groupe multi-activités dont la vision est de contribuer activement au développement économique et social de la Côte d'Ivoire.

Fondé avec la conviction que la diversification est la clé de la résilience économique, KMK GROUP opère aujourd'hui dans six secteurs complémentaires :

Agriculture et Élevage : Le cœur historique du groupe, avec 100 hectares de cultures et un élevage diversifié (bovins, caprins, aviculture, pisciculture, apiculture, aulacodiculture).

Construction et BTP : Le groupe développe des projets immobiliers ambitieux, notamment un hôtel R+2 de 50 chambres et une clinique médicale R+4, répondant aux besoins croissants en infrastructures.

Reboisement : Conscient de sa responsabilité environnementale, KMK GROUP mène un programme actif de reboisement pour compenser son empreinte carbone et préserver les écosystèmes locaux.

Location de véhicules : Une flotte de véhicules modernes disponibles pour les particuliers et les entreprises, avec ou sans chauffeur.

Espaces publicitaires : Location de panneaux et d'espaces publicitaires dans des emplacements stratégiques à Abidjan, offrant une visibilité maximale aux annonceurs.

Cette approche intégrée permet à KMK GROUP de créer des synergies entre ses différentes activités et de maximiser son impact économique et social sur les communautés dans lesquelles il opère.

Le groupe invite les investisseurs et partenaires à rejoindre cette aventure entrepreneuriale prometteuse.`,
      contentEn: `KMK GROUP SARL is much more than a simple agricultural company. It is a multi-activity group whose vision is to actively contribute to the economic and social development of Côte d'Ivoire.

Founded with the conviction that diversification is the key to economic resilience, KMK GROUP now operates in six complementary sectors:

Agriculture and Livestock: The historical core of the group, with 100 hectares of crops and diversified livestock (cattle, goats, poultry, fish farming, beekeeping, grasscutter farming).

Construction and Civil Engineering: The group is developing ambitious real estate projects, including a R+2 hotel with 50 rooms and a R+4 medical clinic, meeting growing infrastructure needs.

Reforestation: Aware of its environmental responsibility, KMK GROUP runs an active reforestation program to offset its carbon footprint and preserve local ecosystems.

Vehicle rental: A fleet of modern vehicles available for individuals and businesses, with or without driver.

Advertising spaces: Rental of billboards and advertising spaces in strategic locations in Abidjan, offering maximum visibility to advertisers.

This integrated approach allows KMK GROUP to create synergies between its different activities and maximize its economic and social impact on the communities in which it operates.

The group invites investors and partners to join this promising entrepreneurial venture.`,
      coverImage: "/images/agriculture/image28.jpg",
      published: true,
      categoryId: news.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { published: true, coverImage: post.coverImage },
      create: post,
    });
  }

  console.log(`${posts.length} articles de blog inseres avec succes.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
