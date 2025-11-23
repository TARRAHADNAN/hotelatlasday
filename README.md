# 🏨 Hôtel Atlas Day - Site Web Officiel

Site web premium pour l'Hôtel Atlas Day (4 étoiles) à Azilal, Maroc.

## 📋 Stack Technique

### Frontend
- **Next.js 14.2** (App Router)
- **React 18.3** + **TypeScript 5.4**
- **Tailwind CSS 3.4** + **Shadcn/ui**
- **Framer Motion 11** (animations)
- **next-intl 3.x** (multilingue FR/EN/AR)

### Backend (À venir)
- **Strapi 4.25** (Headless CMS)
- **PostgreSQL 15**

### Intégrations
- **eZee Absolute** : PMS & système de réservation
- **Cloudinary** : Gestion d'images
- **Vercel** : Hébergement frontend
- **Railway/Render** : Hébergement Strapi (à venir)

## 🚀 Démarrage Rapide

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le site sera disponible sur [http://localhost:3000](http://localhost:3000)

### Commandes Disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linting ESLint
npm run type-check  # Vérification TypeScript
```

## 🌍 Multilingue

Le site supporte 3 langues :
- 🇫🇷 Français (fr) - Par défaut
- 🇬🇧 Anglais (en)
- 🇲🇦 Arabe (ar)

Les traductions se trouvent dans `frontend/src/i18n/locales/`

## 📁 Structure du Projet

```
hotelatlasday/
├── frontend/               # Application Next.js
│   ├── src/
│   │   ├── app/           # Pages et layouts (App Router)
│   │   ├── components/    # Composants React
│   │   ├── lib/           # Utilitaires et API clients
│   │   ├── types/         # Types TypeScript
│   │   └── i18n/          # Configuration multilingue
│   ├── public/            # Assets statiques
│   └── package.json
│
├── cms/                   # Strapi CMS (à implémenter)
├── docs/                  # Documentation
└── README.md
```

## 🎨 Design System

### Couleurs

- **Primary (Or)**: `#C9A55C` - Élégance et luxe
- **Secondary (Bleu Atlas)**: `#2C5F7F` - Montagne et nature
- **Accent (Terre cuite)**: `#B85C3A` - Authenticité marocaine

### Typographie

- **Titres**: Playfair Display (serif)
- **Corps**: Inter (sans-serif)
- **Arabe**: Noto Sans Arabic

## 🔐 Variables d'Environnement

Créez un fichier `.env.local` dans `frontend/`:

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Hôtel Atlas Day

# Strapi CMS (à venir)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=

# eZee Absolute
NEXT_PUBLIC_EZEE_HOTEL_CODE=atlas-day-azilal
NEXT_PUBLIC_EZEE_BOOKING_URL=https://live.ipms247.com/booking/book-rooms-atlasday

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo

# Revalidation
REVALIDATE_SECRET=dev-secret-key-123
```

## 📦 Dépendances Principales

```json
{
  "next": "14.2.14",
  "react": "18.3.1",
  "typescript": "5.4.5",
  "next-intl": "^3.20.0",
  "framer-motion": "^11.11.1",
  "tailwindcss": "^3.4.13"
}
```

## 🎯 Fonctionnalités

### ✅ Implémenté
- [x] Structure Next.js 14 (App Router)
- [x] Configuration multilingue (FR/EN/AR)
- [x] Design system (couleurs, fonts, composants UI)
- [x] Layouts (Header, Footer)
- [x] Homepage avec sections
- [x] Configuration TypeScript stricte
- [x] Tailwind CSS + Shadcn/ui

### 🚧 En cours
- [ ] Intégration Strapi CMS
- [ ] Pages dynamiques (Chambres, Blog, Activités)
- [ ] Widget eZee Booking
- [ ] Formulaire de contact
- [ ] SEO optimization
- [ ] Génération de sitemap

### 📋 À faire
- [ ] Tests unitaires
- [ ] Tests E2E
- [ ] CI/CD
- [ ] Déploiement production

## 🔧 Configuration Strapi (À venir)

Le CMS Strapi sera configuré avec :
- Collection Types: Room, Blog Post, Activity, Restaurant Item
- Single Types: Global Config, eZee Config
- Plugins: i18n, Upload, Cloudinary

## 📝 Notes Importantes

### Google Fonts
Les Google Fonts sont temporairement désactivées en raison de restrictions réseau dans l'environnement de développement. Elles seront réactivées en production.

### ISR (Incremental Static Regeneration)
Toutes les pages dynamiques utilisent ISR avec un `revalidate` de 60 secondes pour un équilibre optimal entre performance et fraîcheur des données.

## 🤝 Contribution

Projet développé par **SESNOV** (Adnan) - Agence digitale marocaine

## 📄 Licence

Tous droits réservés © 2024 Hôtel Atlas Day

## 📧 Contact

- **Email**: contact@hotelatlasday.com
- **Téléphone**: +212 5XX-XXXXXX
- **Adresse**: Avenue Hassan II, Azilal 22000, Maroc

---

**Made with ❤️ in Morocco**
