# 🚀 Guide de Démarrage Rapide - Hôtel Atlas Day

## 📦 Ce que vous avez

✅ **Frontend Next.js 14** - Site web complet avec toutes les pages
✅ **Backend Strapi CMS** - Tous les schémas de données configurés
✅ **Multilingue** - Support FR/EN/AR
✅ **Design System** - Couleurs premium de l'hôtel
✅ **SEO Optimisé** - Sitemap, metadata dynamique

---

## ⚠️ Problème de Compatibilité Node.js

**Strapi 4.25.12 nécessite Node.js 18-20, mais vous avez Node.js v22.21.1**

Choisissez une solution ci-dessous :

---

## 🎯 Option 1 : Utiliser NVM (Recommandé)

### Installation de nvm

```bash
# Installer nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Charger nvm
source ~/.bashrc
# ou
source ~/.zshrc
```

### Utiliser Node.js 20

```bash
# Installer Node.js 20
nvm install 20

# Utiliser Node.js 20
nvm use 20

# Vérifier
node --version  # Devrait afficher v20.x.x
```

### Démarrer Strapi

```bash
cd cms
npm run develop
```

✅ Strapi sera accessible sur **http://localhost:1337/admin**

---

## 🐳 Option 2 : Utiliser Docker (Simple)

### Prérequis
- Docker installé : https://docs.docker.com/get-docker/
- Docker Compose installé

### Démarrage

```bash
# Démarrer Strapi avec Docker
docker-compose up -d

# Voir les logs
docker-compose logs -f strapi
```

✅ Strapi sera accessible sur **http://localhost:1337/admin**

### Arrêter

```bash
docker-compose down
```

---

## 🌐 Démarrer le Frontend

Une fois Strapi lancé, dans un **nouveau terminal** :

```bash
cd frontend
npm run dev
```

✅ Site web accessible sur **http://localhost:3000**

---

## 📝 Étapes Suivantes

### 1. Créer le premier utilisateur admin Strapi

Allez sur **http://localhost:1337/admin** et créez votre compte admin.

### 2. Configurer les permissions API

Dans Strapi :
- **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
- Cochez `find` et `findOne` pour tous les types de contenu
- **Save**

### 3. Ajouter du contenu

Suivez le guide détaillé dans **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)**

**Ordre recommandé** :
1. Équipements (Amenities)
2. Auteurs (Authors)
3. Catégories (Categories)
4. Chambres (Rooms)
5. Articles de blog (Blog Posts)
6. Activités (Activities)
7. Restaurant Items
8. Configurations (eZee, Global)

### 4. Tester le site

Visitez http://localhost:3000 et naviguez :
- `/` - Homepage
- `/chambres` - Liste des chambres
- `/blog` - Articles de blog
- `/activites` - Activités touristiques
- `/restaurant` - Menu du restaurant
- `/a-propos` - À propos de l'hôtel
- `/contact` - Formulaire de contact
- `/reserver` - Page de réservation

---

## 🔍 Dépannage

### Strapi ne démarre pas

**Erreur "Cannot find module 'ajv/dist/core'"**
```bash
cd cms
npm install ajv@^8.12.0 --save-dev
npm run develop
```

**Problème de version Node.js**
```bash
node --version  # Vérifier la version
nvm use 20      # Passer à Node.js 20
```

### Frontend affiche "Error fetching..."

**Vérifier que Strapi est bien démarré** :
```bash
curl http://localhost:1337/api/rooms
```

**Vérifier les permissions** : Settings → Users & Permissions → Public

### Images ne s'affichent pas

Les images Strapi sont servies depuis http://localhost:1337
Vérifiez que Strapi est lancé et que les images ont été uploadées.

---

## 📁 Structure du Projet

```
hotelatlasday/
├── frontend/              # Site Next.js
│   ├── src/
│   │   ├── app/          # Pages et routes
│   │   ├── components/   # Composants React
│   │   ├── lib/          # Utilitaires (Strapi client)
│   │   ├── types/        # Types TypeScript
│   │   └── i18n/         # Traductions FR/EN/AR
│   └── package.json
│
├── cms/                   # Backend Strapi
│   ├── src/
│   │   ├── api/          # Collections (Room, Blog, etc.)
│   │   ├── components/   # Composants réutilisables
│   │   └── extensions/   # Personnalisations
│   ├── config/           # Configuration
│   └── package.json
│
├── CONTENT_GUIDE.md      # 📝 Guide détaillé du contenu
├── QUICK_START.md        # 🚀 Ce fichier
└── docker-compose.yml    # 🐳 Configuration Docker
```

---

## 🎨 Configuration des Couleurs

Le design system utilise les couleurs premium de l'hôtel :

```
Gold (Primary)    : #C9A55C
Atlas Blue        : #2C5F7F
Terracotta        : #B85C3A
```

Configurées dans `frontend/tailwind.config.ts`

---

## 🌍 Langues Disponibles

- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **English**
- 🇲🇦 **العربية** (Arabe, avec support RTL)

Changez la langue via le sélecteur en haut à droite du site.

---

## 🚀 Déploiement Production

### Frontend (Vercel - Gratuit)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd frontend
vercel
```

### Backend Strapi

**Options** :
1. **Strapi Cloud** (Recommandé) - https://cloud.strapi.io
2. **Railway** - https://railway.app
3. **Heroku** - https://heroku.com
4. **VPS** (DigitalOcean, AWS, etc.)

---

## 📞 Support

Pour toute question :
- Consultez **CONTENT_GUIDE.md** pour le contenu
- Docs Strapi : https://docs.strapi.io
- Docs Next.js : https://nextjs.org/docs

---

**Bon développement ! 🏔️**
