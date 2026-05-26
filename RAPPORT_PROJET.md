# Rapport de développement — Site web KMK GROUP SARL

**Date de rédaction :** Mars 2026  
**Projet :** Site web institutionnel avec espace d'administration  
**Client :** KMK GROUP SARL  
**Localisation :** Abidjan, Côte d'Ivoire  

---

## 1. Présentation du projet

KMK GROUP SARL est une société à responsabilité limitée basée à Abidjan, Côte d'Ivoire, opérant dans plusieurs secteurs d'activité : le BTP, l'agriculture, l'élevage, l'hôtellerie, la santé, la grande distribution et l'audiovisuel.

L'objectif du projet était de concevoir et développer un site web institutionnel complet, bilingue (français et anglais), avec un espace d'administration sécurisé permettant au client de gérer de manière autonome le contenu du site (articles de blog, galerie photos, demandes de partenariat, messages de contact, utilisateurs).

---

## 2. Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 15.1.0 | Framework React full-stack (App Router) |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 3.4.x | Styles utilitaires |
| Prisma | 5.22.0 | ORM — accès base de données |
| PostgreSQL | locale | Base de données relationnelle |
| NextAuth v5 | 5.0.0-beta.30 | Authentification (JWT) |
| next-intl | 3.26.x | Internationalisation FR/EN |
| Framer Motion | 11.x | Animations |
| Zod | 3.24.x | Validation des données |
| React Hook Form | 7.54.x | Gestion des formulaires |
| Sonner | 1.7.x | Notifications toast |
| Lucide React | 0.468.x | Icônes |
| Cloudinary | SDK v2 | Stockage cloud des images (production) |
| bcryptjs | 3.x | Hachage des mots de passe |

---

## 3. Architecture du projet

```
kmk-group/
├── app/
│   ├── [locale]/               # Routes localisées (fr / en)
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── about/              # Page À propos
│   │   ├── activities/         # Page Activités
│   │   ├── projects/           # Page Projets
│   │   ├── gallery/            # Page Galerie
│   │   ├── blog/               # Blog public + articles
│   │   ├── contact/            # Page Contact
│   │   ├── invest/             # Page Investir / Partenariat
│   │   └── admin/              # Espace administration (protégé)
│   │       ├── login/          # Page de connexion
│   │       ├── blog/           # Gestion des articles
│   │       ├── gallery/        # Gestion de la galerie
│   │       ├── messages/       # Gestion des messages
│   │       ├── partners/       # Gestion des partenaires
│   │       └── users/          # Gestion des utilisateurs
│   └── api/                    # Routes API (REST)
│       ├── auth/[...nextauth]/ # Point d'entrée NextAuth
│       ├── blog/               # CRUD articles
│       ├── gallery/            # CRUD galerie
│       ├── contact/            # CRUD messages
│       ├── partner/            # CRUD partenaires
│       ├── upload/             # Upload d'images
│       └── admin/users/        # CRUD utilisateurs admin
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Sections de la page d'accueil
│   └── ui/                     # Composants UI réutilisables
├── lib/
│   ├── prisma.ts               # Instance Prisma singleton
│   ├── utils.ts                # Utilitaires
│   └── require-auth.ts         # Helper sécurité API
├── messages/
│   ├── fr.json                 # Traductions françaises
│   └── en.json                 # Traductions anglaises
├── prisma/
│   ├── schema.prisma           # Schéma de la base de données
│   └── seed.ts                 # Données initiales
└── public/
    └── images/                 # Images locales du site
```

---

## 4. Base de données — Modèle Prisma

### Modèles définis

**User** — Administrateurs du site  
Champs : id, name, email, password (haché bcrypt), role, createdAt

**Post** — Articles de blog  
Champs : id, title, slug, content, excerpt, coverImage, published, categoryId, createdAt, updatedAt

**Category** — Catégories des articles  
Champs : id, name, slug

**GalleryImage** — Images de la galerie  
Champs : id, url, title, category, order, createdAt

**ContactMessage** — Messages du formulaire de contact  
Champs : id, name, email, phone, subject, message, read, createdAt

**PartnerRequest** — Demandes de partenariat / investissement  
Champs : id, name, email, phone, company, investType, amount, message, status, createdAt

### Données initiales (seed)

Un compte administrateur est créé automatiquement lors du seed :
- Email : admin@kmkgroup.com
- Mot de passe : admin123 (haché en base)
- Rôle : ADMIN

---

## 5. Pages publiques

### 5.1 Page d'accueil

La page d'accueil est composée de plusieurs sections :

- **HeroSection** : bannière principale avec image de fond, titre, sous-titre et boutons d'appel à l'action
- **StatsSection** : chiffres clés de la société
- **ActivitiesPreview** : aperçu des secteurs d'activité avec images locales
- **FlagshipProject** : mise en avant d'un projet phare
- **GalleryPreview** : aperçu de la galerie photos
- **WhyChooseUs** : arguments différenciants
- **CTASection** : section d'appel à l'action finale

### 5.2 Page À propos

Présentation de la société, de sa vision, de ses valeurs et de son équipe dirigeante. Toutes les références géographiques pointent vers Abidjan, Côte d'Ivoire, avec le préfixe téléphonique +225.

### 5.3 Page Activités

Présentation détaillée des secteurs d'activité de KMK GROUP :

- **BTP** : construction, rénovation, génie civil — image : btp.jpg
- **Agriculture** : cultures de manioc, igname et maïs — images dédiées
- **Élevage** : bovins (bœufs) et avicole (poulets de chair, pondeuses) — images dédiées par sous-secteur
- **Hôtellerie** : hôtel — image : hotel.jpg
- **Santé** : clinique — image : clinique.jpg
- **Grande distribution** : supermarché — image : supermarche.jpg
- **Audiovisuel** : production et diffusion — image : audio-visuel.jpg
- **Location de véhicules** : image : location-voiture.jpg

Note : le secteur élevage ne comprend pas de porcins ni d'ovins, conformément aux instructions du client.

### 5.4 Page Projets

Deux sections distinctes :

**Projets en cours / réalisés** : projets agricoles et d'élevage avec images locales.

**Projets de construction** (ajoutés à la demande du client) :
- Hôtel R+4 avec piscine — image : hotel.jpg
- Clinique R+4 — image : clinique.jpg
- Grand supermarché — image : supermarche.jpg

### 5.5 Page Galerie

Galerie photos filtrée par catégorie. Fonctionnalités :
- Filtres par catégorie (BTP, Agriculture, Élevage, etc.)
- Lightbox au clic sur une image
- Navigation gauche/droite dans le lightbox (boutons et touches clavier Flèche gauche / Flèche droite)
- Fermeture par touche Échap
- Compteur de position (ex. : 3 / 12)
- Animation de transition entre les images
- Navigation dans la catégorie filtrée active uniquement

### 5.6 Blog public

- Liste des articles publiés avec image de couverture, extrait, date et catégorie
- Pagination : 6 articles par page
- Page article individuel : affichage du contenu en paragraphes texte brut (sans HTML)

### 5.7 Page Contact

Formulaire de contact avec les champs : nom, email, téléphone, sujet, message. Les données sont enregistrées en base de données. Validation côté serveur avec Zod.

### 5.8 Page Investir / Partenariat

Formulaire de demande de partenariat ou d'investissement avec les champs : nom, email, téléphone, société, type d'investissement, montant (en FCFA), message. Les données sont enregistrées en base avec un statut de traitement.

---

## 6. Internationalisation (FR / EN)

Le site est entièrement bilingue. La langue est déterminée par le préfixe d'URL :
- `/fr/...` pour le français
- `/en/...` pour l'anglais

Toutes les pages utilisent le hook `useTranslations()` de next-intl. Les fichiers de traduction sont :
- `messages/fr.json` — version française complète
- `messages/en.json` — version anglaise complète

Les clés de traduction couvrent : navigation, accueil, à propos, activités, projets, galerie, blog, contact, investissement, footer.

---

## 7. Espace d'administration

L'accès à l'espace d'administration est protégé par authentification. URL : `/fr/admin/login`

### 7.1 Authentification

- Système basé sur NextAuth v5 avec stratégie JWT
- Adaptateur Prisma pour la persistance des sessions
- Mots de passe hachés avec bcryptjs (12 rounds)
- Middleware combiné : protection des routes `/admin/*` + gestion des locales next-intl
- Le fichier `app/api/auth/[...nextauth]/route.ts` expose les handlers GET et POST nécessaires au fonctionnement de NextAuth (routes signin, signout, session, callback, CSRF)

### 7.2 Tableau de bord

Page d'accueil de l'admin avec liens vers les différentes sections de gestion.

### 7.3 Gestion du blog

- Liste de tous les articles avec statut publié/brouillon
- Création d'un article : titre, slug, extrait, contenu texte brut, catégorie, statut, upload d'image de couverture
- Modification d'un article existant
- Suppression avec confirmation
- Upload d'image : zone de dépôt avec aperçu immédiat — pas d'URL à saisir manuellement
- Le contenu est en texte brut (sans HTML) pour faciliter la saisie par le client

### 7.4 Gestion de la galerie

- Liste des images avec aperçu, titre et catégorie
- Ajout d'une image (URL + titre + catégorie + ordre)
- Suppression avec confirmation

### 7.5 Gestion des messages de contact

- Deux cartes statistiques : nombre total de messages / nombre de messages non lus
- Liste paginée (8 messages par page)
- Indicateur visuel "Nouveau" pour les messages non lus (bordure bleue)
- Bouton "Marquer comme lu"
- Suppression avec confirmation inline (bouton Confirmer / Annuler)
- Affichage : nom, email, téléphone, sujet, date, contenu du message

### 7.6 Gestion des demandes de partenariat

- Liste paginée (8 demandes par page)
- Affichage : nom, email, téléphone, société, type d'investissement, montant en FCFA, date
- Formatage des montants : nombre formaté avec séparateurs + suffixe FCFA (ex. : 5 000 000 FCFA)
- Changement de statut via menu déroulant : En attente / Examiné / Accepté / Refusé
- Suppression avec confirmation inline

### 7.7 Gestion des utilisateurs

- Liste des comptes administrateurs
- Création d'un nouvel administrateur (nom, email, mot de passe, rôle)
- Suppression (avec protection : impossible de supprimer le dernier administrateur)
- Modification du mot de passe

---

## 8. Sécurité des APIs

### Principe appliqué

Un helper centralisé `lib/require-auth.ts` vérifie la session NextAuth avant chaque opération sensible. Il retourne une réponse 401 Unauthorized si l'utilisateur n'est pas connecté.

### Règles par route

| Route | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| /api/blog | Public | Protégé | Protégé | Protégé |
| /api/gallery | Public | Protégé | Protégé | Protégé |
| /api/contact | Protégé | Public | Protégé | Protégé |
| /api/partner | Protégé | Public | Protégé | Protégé |
| /api/upload | — | Protégé | — | — |
| /api/admin/users | Protégé | Protégé | Protégé | Protégé |

Les routes POST de contact et partenariat restent publiques car elles correspondent à des formulaires accessibles aux visiteurs du site.

---

## 9. Gestion des images

### En développement (local)

Les images uploadées via l'interface d'administration sont sauvegardées dans `public/images/blog/`. Aucune configuration externe n'est requise.

### En production

Les images sont envoyées vers Cloudinary (service de stockage et CDN d'images). L'API upload détecte automatiquement la présence des variables d'environnement Cloudinary et bascule vers le stockage cloud.

Variables d'environnement requises en production :
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Si ces variables sont absentes (environnement local), le système utilise automatiquement le stockage local.

### Images locales du site

Toutes les images statiques du site sont stockées dans `public/images/` :

| Fichier | Usage |
|---|---|
| acceuil.jpg | Hero section page d'accueil |
| apropos.jpg | Page À propos |
| btp.jpg, btp1.jpg, btp2.jpg, btp3.jpg | Section BTP |
| agriculture.jpg, agriculture-moderne.jpg | Section Agriculture |
| elevage.jpg, elevage-boeuf.jpg, elevage-boeuf1.jpg, elevage-boeuf2.jpg | Élevage bovin |
| elevage-poulet.jpg, elevage-poulet1.jpg, elevage-poulet2.jpg | Élevage avicole |
| hotel.jpg | Hôtellerie et projet hôtel R+4 |
| clinique.jpg | Santé et projet clinique R+4 |
| supermarche.jpg | Grande distribution et projet supermarché |
| audio-visuel.jpg | Audiovisuel |
| location-voiture.jpg | Location de véhicules |
| reboisement.jpg | Environnement |

---

## 10. Variables d'environnement

### Fichier `.env.local` (développement)

```
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/kmkgroup?schema=public"
AUTH_SECRET="votre-secret-nextauth"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### Variables supplémentaires pour la production

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"
NEXTAUTH_URL="https://votre-domaine.com"
NEXT_PUBLIC_SITE_URL="https://votre-domaine.com"
CLOUDINARY_CLOUD_NAME="votre-cloud-name"
CLOUDINARY_API_KEY="votre-api-key"
CLOUDINARY_API_SECRET="votre-api-secret"
```

---

## 11. Guide de mise en production

### Étape 1 — Base de données cloud

Créer une base de données PostgreSQL sur un service cloud (recommandé : Neon.tech — offre gratuite disponible).

Exporter la base locale et importer sur le service cloud :
```bash
pg_dump -U postgres -d kmkgroup > backup.sql
psql "postgresql://USER:PASS@host.neon.tech/dbname?sslmode=require" < backup.sql
```

### Étape 2 — Stockage des images

Créer un compte sur cloudinary.com (offre gratuite disponible). Récupérer les trois clés : Cloud Name, API Key, API Secret.

### Étape 3 — Hébergement de l'application

Déployer sur Vercel (recommandé pour Next.js) :
1. Connecter le dépôt GitHub sur vercel.com
2. Importer le projet
3. Ajouter toutes les variables d'environnement dans Settings > Environment Variables
4. Modifier la commande de build : `prisma generate && prisma migrate deploy && next build`

### Étape 4 — Premier déploiement

Chaque push sur la branche `main` déclenche automatiquement un nouveau déploiement sur Vercel.

---

## 12. Commandes utiles

```bash
# Démarrer le serveur de développement
npm run dev

# Appliquer les migrations de base de données
npm run db:migrate

# Pousser le schéma sans migration (développement rapide)
npm run db:push

# Insérer les données initiales (compte admin)
npm run db:seed

# Ouvrir l'interface visuelle Prisma Studio
npm run db:studio

# Build de production
npm run build
```

---

## 13. Accès administrateur

| Champ | Valeur |
|---|---|
| URL de connexion | http://localhost:3000/fr/admin/login |
| Email | admin@kmkgroup.com |
| Mot de passe | admin123 |

Il est fortement recommandé de changer le mot de passe administrateur avant la mise en production, via la page de gestion des utilisateurs dans l'espace admin.

---

## 14. État d'avancement

| Module | Avancement |
|---|---|
| Pages publiques (accueil, à propos, activités, projets, galerie, blog, contact, investir) | Complet |
| Internationalisation FR / EN | Complet |
| Authentification admin | Complet |
| CRUD Blog (admin) | Complet |
| CRUD Galerie (admin) | Complet |
| Gestion messages de contact | Complet |
| Gestion demandes de partenariat | Complet |
| Gestion utilisateurs | Complet |
| Sécurité des APIs | Complet |
| Upload images (local + cloud) | Complet |
| Mise en production | A faire |

---

*Rapport généré le Mars 2026*
