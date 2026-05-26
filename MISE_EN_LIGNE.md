# Mise en ligne du site KMK GROUP SARL

## Objectif

Héberger le site web institutionnel de KMK GROUP SARL en ligne, accessible depuis n'importe quel navigateur, avec un espace d'administration fonctionnel.

---

## Services requis (tous gratuits)

### 1. Vercel — Hébergement de l'application
- Site : https://vercel.com
- Rôle : héberge le site Next.js et le rend accessible en ligne
- Plan : Hobby (gratuit)
- Limite : largement suffisant pour un site institutionnel
- URL fournie automatiquement : `kmk-group.vercel.app`

### 2. Neon — Base de données PostgreSQL
- Site : https://neon.tech
- Rôle : stocke toutes les données (articles de blog, galerie, messages de contact, demandes de partenariat, utilisateurs admin)
- Plan : Free (gratuit)
- Limite : 0,5 GB de stockage — suffisant pour plusieurs années d'utilisation

### 3. Cloudinary — Stockage des images uploadées
- Site : https://cloudinary.com
- Rôle : stocke les images ajoutées via l'espace admin (articles de blog, galerie)
- Plan : Free (gratuit)
- Limite : 25 GB de stockage et 25 GB de bande passante par mois

---

## Etapes de mise en ligne

### Etape 1 — Créer un compte Neon
1. Aller sur https://neon.tech et créer un compte gratuit
2. Créer un nouveau projet
3. Copier la DATABASE_URL fournie (format : `postgresql://...neon.tech/...?sslmode=require`)

### Etape 2 — Créer un compte Cloudinary
1. Aller sur https://cloudinary.com et créer un compte gratuit
2. Dans le dashboard, noter les trois informations suivantes :
   - Cloud Name
   - API Key
   - API Secret

### Etape 3 — Déployer sur Vercel
1. Aller sur https://vercel.com et se connecter avec le compte GitHub
2. Cliquer sur "Add New Project" et importer le dépôt `kmk_group`
3. Dans Settings > Environment Variables, ajouter les variables suivantes :

```
DATABASE_URL          = (coller la DATABASE_URL de Neon)
AUTH_SECRET           = 400c045f18379bef6638750651ac521ae94248f299c2adb04c64b883d50b7000
NEXTAUTH_URL          = https://kmk-group.vercel.app
NEXT_PUBLIC_SITE_URL  = https://kmk-group.vercel.app
CLOUDINARY_CLOUD_NAME = (Cloud Name Cloudinary)
CLOUDINARY_API_KEY    = (API Key Cloudinary)
CLOUDINARY_API_SECRET = (API Secret Cloudinary)
```

4. Dans Settings > General > Build Command, remplacer par :
```
npx prisma generate && npx prisma migrate deploy && next build
```

5. Cliquer sur Deploy

### Etape 4 — Migrer les données locales vers Neon
Depuis le terminal, dans le dossier du projet :
```bash
pg_dump -U postgres -d kmkgroup > backup.sql
psql "DATABASE_URL_NEON" < backup.sql
```

---

## Récapitulatif des coûts

| Service | Coût annuel |
|---|---|
| Vercel (hébergement) | 0 FCFA |
| Neon (base de données) | 0 FCFA |
| Cloudinary (images) | 0 FCFA |
| **TOTAL** | **0 FCFA** |

Le site sera accessible à l'adresse : **https://kmk-group.vercel.app**

---

## Accès administrateur après mise en ligne

| Information | Valeur |
|---|---|
| URL admin | https://kmk-group.vercel.app/fr/admin/login |
| Email | kouassim@kmkgroup.com |
| Mot de passe | admin123 (à changer après la première connexion) |

---

## Note importante

Il est fortement recommandé de changer le mot de passe administrateur immédiatement après la première connexion en production, via la page de gestion des utilisateurs dans l'espace admin.

---

*Document préparé le Mai 2026*
