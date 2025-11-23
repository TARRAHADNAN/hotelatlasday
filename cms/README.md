# Strapi CMS - Hôtel Atlas Day

Backend Strapi pour la gestion du contenu du site Hôtel Atlas Day.

## 📋 Stack Technique

- **Strapi 4.25.12** - Headless CMS
- **PostgreSQL 15.x** - Base de données (production)
- **SQLite** - Base de données (développement)
- **TypeScript** - Langage
- **Cloudinary** - Gestion des médias

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Modifier les variables d'environnement si nécessaire
nano .env
```

## ⚙️ Configuration

### Variables d'Environnement

Modifiez le fichier `.env` avec vos propres valeurs :

```bash
# Base de données
DATABASE_CLIENT=postgres  # ou sqlite pour le développement
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=hotel_atlas_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=votre_mot_de_passe

# Cloudinary (optionnel en développement)
CLOUDINARY_NAME=votre_cloud_name
CLOUDINARY_KEY=votre_api_key
CLOUDINARY_SECRET=votre_api_secret
```

### Génération des Secrets

Pour générer des secrets sécurisés :

```bash
# Avec OpenSSL
openssl rand -base64 32

# Ou avec Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🎯 Démarrage

### Mode Développement

```bash
npm run develop
```

Le panel admin sera accessible sur : **http://localhost:1337/admin**

### Mode Production

```bash
# Build
npm run build

# Démarrage
npm run start
```

## 📊 Structure du CMS

### Collections

| Collection | Description | Localisée | Draft & Publish |
|---|---|---|---|
| **Rooms** | Chambres et suites de l'hôtel | ✅ | ✅ |
| **Blog Posts** | Articles et actualités | ✅ | ✅ |
| **Activities** | Activités touristiques | ✅ | ✅ |
| **Restaurant Items** | Plats et menu du restaurant | ✅ | ✅ |
| **Amenities** | Équipements des chambres | ✅ | ❌ |
| **Authors** | Auteurs des articles | ❌ | ❌ |
| **Categories** | Catégories des articles | ✅ | ❌ |

### Single Types

| Type | Description | Localisée |
|---|---|---|
| **eZee Config** | Configuration du système de réservation | ❌ |
| **Global Config** | Configuration générale du site | ✅ |

### Components

| Component | Description |
|---|---|
| **shared.seo** | Métadonnées SEO (title, description, keywords, image) |
| **shared.social-media** | Liens réseaux sociaux (Facebook, Instagram, etc.) |
| **room.capacity** | Capacité d'une chambre (adultes, enfants) |

## 🌍 Localisation (i18n)

Le CMS supporte 3 langues :
- 🇫🇷 Français (fr) - Langue par défaut
- 🇬🇧 Anglais (en)
- 🇲🇦 Arabe (ar)

### Activer les Locales

1. Aller dans **Settings** > **Internationalization**
2. Cliquer sur **Add new locale**
3. Sélectionner **English (en)** et **Arabic (ar)**
4. Définir **French (fr)** comme locale par défaut

## 🔑 API Endpoints

### Collections

```bash
# Rooms
GET /api/rooms?locale=fr&populate=*
GET /api/rooms/:id?locale=fr&populate=*

# Blog Posts
GET /api/blog-posts?locale=fr&populate=*
GET /api/blog-posts/:id?locale=fr&populate=*

# Activities
GET /api/activities?locale=fr&populate=*
GET /api/activities/:id?locale=fr&populate=*

# Restaurant Items
GET /api/restaurant-items?locale=fr&populate=*

# Amenities
GET /api/amenities?locale=fr

# Authors
GET /api/authors?populate=*

# Categories
GET /api/categories?locale=fr&populate=*
```

### Single Types

```bash
# eZee Config
GET /api/ezee-config

# Global Config
GET /api/global-config?locale=fr&populate=*
```

### Exemples de Requêtes

```bash
# Récupérer toutes les chambres en français avec leurs relations
curl http://localhost:1337/api/rooms?locale=fr&populate=image,gallery,amenities

# Récupérer les chambres featured triées par ordre
curl "http://localhost:1337/api/rooms?locale=fr&filters[featured][$eq]=true&sort=order:asc&populate=*"

# Récupérer les articles de blog par catégorie
curl "http://localhost:1337/api/blog-posts?locale=fr&filters[categories][slug][$eq]=actualites&populate=*"

# Recherche full-text
curl "http://localhost:1337/api/rooms?locale=fr&filters[$or][0][name][$contains]=suite&populate=*"
```

## 🔒 Permissions

### Configuration Initiale

1. Aller dans **Settings** > **Users & Permissions** > **Roles**
2. Sélectionner **Public**
3. Activer les permissions **find** et **findOne** pour :
   - Rooms
   - Blog Posts
   - Activities
   - Restaurant Items
   - Amenities
   - Authors
   - Categories
   - eZee Config
   - Global Config

### Génération d'API Token

1. Aller dans **Settings** > **API Tokens**
2. Cliquer sur **Create new API Token**
3. Nom : "Frontend Token"
4. Token type : **Full access** (ou **Custom** selon les besoins)
5. Copier le token généré
6. Ajouter dans `frontend/.env.local` :
   ```bash
   STRAPI_API_TOKEN=votre_token_ici
   ```

## 📦 Plugins Installés

- **@strapi/plugin-i18n** - Internationalisation
- **@strapi/plugin-users-permissions** - Authentification et permissions
- **@strapi/provider-upload-cloudinary** - Upload vers Cloudinary

## 🗄️ Base de Données

### SQLite (Développement)

Par défaut, Strapi utilise SQLite en développement. La base de données est stockée dans `.tmp/data.db`.

### PostgreSQL (Production)

Pour utiliser PostgreSQL, modifiez le fichier `.env` :

```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=hotel_atlas_cms
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=votre_mot_de_passe
```

### Migration

Les migrations sont automatiques au démarrage de Strapi.

## 📝 Contenu de Test

### Amenities (Équipements)

Créez ces équipements pour les chambres :
- WiFi gratuit (icon: wifi)
- Climatisation (icon: snowflake)
- Télévision (icon: tv)
- Minibar (icon: wine)
- Balcon (icon: balcony)
- Vue montagne (icon: mountain)
- Coffre-fort (icon: lock)
- Bureau (icon: desk)

### Authors (Auteurs)

- Nom : Équipe Atlas Day
- Email : blog@hotelatlasday.com
- Bio : Équipe de l'Hôtel Atlas Day

### Categories (Catégories)

- Actualités (slug: actualites)
- Conseils Voyage (slug: conseils-voyage)
- Culture Locale (slug: culture-locale)

## 🛠️ Développement

### Structure des Fichiers

```
cms/
├── config/              # Configuration Strapi
│   ├── admin.ts
│   ├── database.ts
│   ├── middlewares.ts
│   ├── plugins.ts
│   └── server.ts
├── src/
│   ├── api/            # Collections et Single Types
│   │   ├── room/
│   │   ├── blog-post/
│   │   ├── activity/
│   │   └── ...
│   └── components/     # Components réutilisables
│       ├── shared/
│       └── room/
├── public/             # Fichiers publics
└── .env               # Variables d'environnement
```

### Commandes Utiles

```bash
# Développement avec auto-reload
npm run develop

# Build de production
npm run build

# Démarrage production
npm run start

# Console Strapi
npm run strapi

# Générer une API
npm run strapi generate

# Voir la version
npm run strapi version
```

## 🚀 Déploiement

### Railway

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Login
railway login

# Créer un projet
railway init

# Ajouter PostgreSQL
railway add

# Déployer
railway up
```

### Render

1. Créer un nouveau **Web Service**
2. Connecter le repository GitHub
3. Root Directory : `cms`
4. Build Command : `npm install && npm run build`
5. Start Command : `npm run start`
6. Ajouter les variables d'environnement
7. Ajouter une base PostgreSQL

## 📚 Documentation

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [i18n Plugin](https://docs.strapi.io/dev-docs/plugins/i18n)

## 🆘 Support

En cas de problème :

1. Vérifier les logs : `npm run develop`
2. Vérifier la configuration : `.env`
3. Nettoyer le cache : `rm -rf .cache build .tmp`
4. Réinstaller : `rm -rf node_modules && npm install`

---

**Made with ❤️ by SESNOV**
