# KMK GROUP SARL — Site Vitrine

Site web professionnel multi-activités pour KMK GROUP SARL.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + Framer Motion
- **Prisma ORM** + PostgreSQL
- **next-intl** (FR/EN)
- **NextAuth v5** (authentification admin)
- **Zod** + React Hook Form
- **Sonner** (notifications toast)
- **Lucide React** (icônes)

## Installation

```bash
npm install
```

## Configuration

Copier `.env.example` en `.env.local` et renseigner les valeurs :

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/kmkgroup?schema=public"
AUTH_SECRET="une-chaine-aleatoire-longue"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Générer un `AUTH_SECRET` :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Base de données

```bash
# 1. Créer la base PostgreSQL
psql -U postgres -c "CREATE DATABASE kmkgroup;"

# 2. Pousser le schéma Prisma
npx prisma db push

# 3. Insérer les données de démonstration (+ compte admin)
npx tsx prisma/seed.ts
```

## Lancement

```bash
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Accès Admin

URL : `http://localhost:3000/fr/admin`

Identifiants par défaut (créés par le seed) :
```
Email    : admin@kmkgroup.com
Mot de passe : admin123
```

> Changer le mot de passe en production en modifiant `prisma/seed.ts` avant de relancer le seed.

Toutes les routes `/*/admin/*` sont protégées par NextAuth — une redirection vers `/admin/login` est automatique si non connecté.

## Structure

```
app/
├── [locale]/
│   ├── page.tsx          # Accueil
│   ├── about/            # À propos
│   ├── activities/       # Activités
│   ├── projects/         # Projets
│   ├── invest/           # Investissement
│   ├── gallery/          # Galerie
│   ├── blog/             # Blog (liste + article)
│   ├── contact/          # Contact
│   └── admin/            # Dashboard admin (protégé)
│       ├── login/        # Page de connexion
│       ├── messages/     # Messages de contact
│       ├── partners/     # Demandes de partenariat
│       ├── blog/         # Gestion articles (liste + création)
│       ├── gallery/      # Gestion galerie
│       └── users/        # Gestion des administrateurs
├── api/
│   ├── auth/[...nextauth]/  # NextAuth handler
│   ├── contact/          # POST message
│   ├── partner/          # GET/POST/PUT/DELETE partenariat
│   ├── blog/             # GET/POST/PUT/DELETE articles
│   ├── gallery/          # GET/POST/PUT/DELETE galerie
│   └── admin/users/      # GET/POST/DELETE administrateurs
components/
├── layout/               # Navbar, Footer
├── sections/             # Sections homepage
└── ui/                   # Button, Input, Badge, Card...
messages/
├── fr.json
└── en.json
prisma/
├── schema.prisma
└── seed.ts
auth.ts                   # Config NextAuth
middleware.ts             # Protection admin + i18n
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil — hero, stats, activités, galerie preview, CTA |
| `/about` | À propos, vision, valeurs |
| `/activities` | 6 activités détaillées |
| `/projects` | Projet 100 hectares + tableau investissements |
| `/invest` | Opportunités + formulaire partenariat |
| `/gallery` | Galerie avec filtres par catégorie |
| `/blog` | Articles depuis DB |
| `/blog/[slug]` | Article individuel |
| `/contact` | Formulaire de contact |
| `/admin` | Dashboard (stats globales) |
| `/admin/messages` | Messages de contact reçus |
| `/admin/partners` | Demandes de partenariat |
| `/admin/blog` | Liste articles — publier/dépublier/supprimer |
| `/admin/blog/new` | Créer un article (FR + EN) |
| `/admin/gallery` | Gérer les images — ajouter/supprimer |
| `/admin/users` | Gérer les administrateurs — ajouter/supprimer |

## API

| Endpoint | Méthodes | Description |
|----------|----------|-------------|
| `/api/contact` | POST | Envoyer un message de contact |
| `/api/partner` | GET, POST, PUT, DELETE | CRUD demandes de partenariat |
| `/api/blog` | GET, POST, PUT, DELETE | CRUD articles |
| `/api/gallery` | GET, POST, PUT, DELETE | CRUD galerie |
| `/api/admin/users` | GET, POST, DELETE | Gestion des administrateurs |
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handler |

## Déploiement (Vercel)

```bash
vercel --prod
```

Variables d'environnement à configurer dans le dashboard Vercel :
- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXTAUTH_URL` (URL de production)
- `NEXT_PUBLIC_SITE_URL` (URL de production)
