# 📝 Guide de Contenu - Hôtel Atlas Day

Ce guide vous explique comment ajouter du contenu dans Strapi CMS pour votre site web.

## 🔧 Prérequis : Résoudre l'incompatibilité Node.js

**Problème** : Strapi 4.25.12 nécessite Node.js >=18.0.0 <=20.x.x, mais l'environnement utilise Node.js v22.21.1.

### Solution 1 : Utiliser nvm (Recommandé)

```bash
# 1. Installer nvm si nécessaire
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# 2. Installer Node.js 20
nvm install 20

# 3. Utiliser Node.js 20
nvm use 20

# 4. Vérifier la version
node --version  # Devrait afficher v20.x.x

# 5. Démarrer Strapi
cd cms
npm run develop
```

### Solution 2 : Utiliser Docker

```bash
# Dans le dossier du projet
docker-compose up -d

# Strapi sera accessible sur http://localhost:1337
```

---

## 🚀 Démarrage de Strapi

Une fois Node.js 20 installé :

```bash
cd cms
npm run develop
```

Strapi démarrera sur **http://localhost:1337**

---

## 👤 Création du Premier Utilisateur Admin

1. Ouvrez **http://localhost:1337/admin**
2. Remplissez le formulaire :
   - **Prénom** : Admin
   - **Nom** : Atlas Day
   - **Email** : admin@hotelatlasday.com
   - **Mot de passe** : (choisir un mot de passe fort)
3. Cliquez sur "Créer le premier administrateur"

---

## 📋 Configuration des Permissions API

**IMPORTANT** : Avant d'ajouter du contenu, configurez les permissions publiques.

### Étapes :

1. Allez dans **Settings** (⚙️) → **Users & Permissions Plugin** → **Roles**
2. Cliquez sur **Public**
3. Pour chaque type de contenu, cochez les permissions suivantes :

#### Permissions à activer (Public) :

- **Activity** : ✅ `find`, ✅ `findOne`
- **Amenity** : ✅ `find`, ✅ `findOne`
- **Author** : ✅ `find`, ✅ `findOne`
- **Blog-post** : ✅ `find`, ✅ `findOne`
- **Category** : ✅ `find`, ✅ `findOne`
- **Ezee-config** : ✅ `find`
- **Global-config** : ✅ `find`
- **Restaurant-item** : ✅ `find`, ✅ `findOne`
- **Room** : ✅ `find`, ✅ `findOne`

4. Cliquez sur **Save** en haut à droite

---

## 🏗️ Structure du Contenu à Créer

### 1️⃣ Équipements (Amenities) - À créer en premier

Les équipements sont utilisés par les chambres. Créez-les d'abord.

**Menu** : Content Manager → Amenities → Create new entry

| Nom (FR) | Nom (EN) | Nom (AR) | Icon |
|----------|----------|----------|------|
| Wi-Fi Gratuit | Free Wi-Fi | واي فاي مجاني | wifi |
| Climatisation | Air Conditioning | تكييف | wind |
| TV à écran plat | Flat-screen TV | تلفزيون مسطح | tv |
| Minibar | Minibar | ميني بار | refrigerator |
| Coffre-fort | Safe | خزنة | lock |
| Balcon | Balcony | شرفة | home |
| Vue sur montagne | Mountain View | إطلالة على الجبال | mountain |
| Salle de bain privée | Private Bathroom | حمام خاص | bath |
| Produits de toilette | Toiletries | مستلزمات النظافة | sparkles |
| Sèche-cheveux | Hair Dryer | مجفف شعر | wind |

**Astuce** : Pour chaque équipement :
1. Cliquez sur "Create new entry"
2. Remplissez les champs pour FR
3. Cliquez sur "Save"
4. Changez la locale (EN, puis AR) et remplissez
5. Publiez (bouton "Publish")

---

### 2️⃣ Auteurs (Authors)

**Menu** : Content Manager → Authors → Create new entry

#### Exemple d'auteur :

**Nom** : Équipe Atlas Day
**Bio** :
```
L'équipe de l'Hôtel Atlas Day partage ses conseils et recommandations
pour découvrir le Haut Atlas marocain et la région d'Azilal.
```

**Avatar** : Téléchargez une photo ou laissez vide

---

### 3️⃣ Catégories (Categories)

**Menu** : Content Manager → Categories → Create new entry

| Nom (FR) | Slug | Nom (EN) | Nom (AR) |
|----------|------|----------|----------|
| Tourisme | tourisme | Tourism | السياحة |
| Culture | culture | Culture | الثقافة |
| Gastronomie | gastronomie | Gastronomy | فن الطعام |
| Conseils | conseils | Tips | نصائح |
| Événements | evenements | Events | الأحداث |

---

### 4️⃣ Chambres (Rooms)

**Menu** : Content Manager → Rooms → Create new entry

#### Exemple : Chambre Standard

**Français** :
- **Nom** : Chambre Standard
- **Slug** : chambre-standard
- **Catégorie** : standard
- **Description courte** : Chambre confortable avec vue sur les montagnes de l'Atlas
- **Description** :
```html
<p>Notre chambre standard offre un refuge paisible après une journée d'exploration.
Décorée dans un style contemporain avec des touches berbères, elle dispose de tout
le confort moderne pour un séjour agréable.</p>

<h3>Caractéristiques</h3>
<ul>
  <li>Lit double ou lits jumeaux</li>
  <li>Salle de bain privée avec douche</li>
  <li>Vue sur les jardins ou la montagne</li>
  <li>Espace de travail</li>
</ul>
```
- **Surface** : 25 (m²)
- **Prix à partir de** : 500 (MAD)
- **Code chambre eZee** : STD001
- **Ordre** : 1
- **En vedette** : ✅ Oui
- **Capacité** :
  - Adultes : 2
  - Enfants : 1
- **Équipements** : Sélectionner 6-8 équipements créés précédemment
- **Image** : Télécharger une photo de chambre
- **Galerie** : Télécharger 3-5 photos supplémentaires

**SEO** :
- **Meta Title** : Chambre Standard | Hôtel Atlas Day Azilal
- **Meta Description** : Chambre confortable avec vue sur l'Atlas. 25m², climatisation, Wi-Fi gratuit. À partir de 500 MAD/nuit.
- **Keywords** : chambre standard, hôtel azilal, atlas, hébergement

**Langues** : Répéter pour EN et AR

#### Autres chambres à créer :

1. **Chambre Deluxe**
   - Prix : 750 MAD
   - Surface : 35 m²
   - Catégorie : deluxe
   - Capacité : 2 adultes + 2 enfants

2. **Suite Atlas**
   - Prix : 1200 MAD
   - Surface : 50 m²
   - Catégorie : suite
   - Capacité : 4 adultes

---

### 5️⃣ Articles de Blog (Blog Posts)

**Menu** : Content Manager → Blog Posts → Create new entry

#### Exemple d'article :

**Titre** : Découvrir les Cascades d'Ouzoud : Guide Complet 2024

**Slug** : decouvrir-cascades-ouzoud-guide-complet

**Extrait** :
```
Les Cascades d'Ouzoud sont l'une des merveilles naturelles du Maroc.
À seulement 150 km de Marrakech, ces chutes spectaculaires de 110 mètres
attirent des milliers de visiteurs chaque année.
```

**Contenu** :
```html
<h2>Introduction</h2>
<p>Situées dans le Moyen Atlas, à environ 150 kilomètres au nord-est de Marrakech,
les Cascades d'Ouzoud (signifiant "meunerie" en berbère) sont parmi les plus hautes
d'Afrique du Nord avec leurs 110 mètres de hauteur.</p>

<h2>Comment s'y rendre depuis Azilal</h2>
<p>Depuis l'Hôtel Atlas Day à Azilal, les cascades sont à seulement 50 km (environ 1h de route).</p>
<ul>
  <li><strong>En voiture</strong> : Route N8 direction Ouzoud (bien indiquée)</li>
  <li><strong>En taxi</strong> : Environ 300-400 MAD aller-retour</li>
  <li><strong>Excursion organisée</strong> : Demandez à notre réception</li>
</ul>

<h2>Que faire aux Cascades d'Ouzoud</h2>
<ul>
  <li>Descendre jusqu'au bas des cascades (sentiers aménagés)</li>
  <li>Observer les singes magots dans leur habitat naturel</li>
  <li>Prendre un bateau traditionnel au pied des chutes</li>
  <li>Déjeuner dans un restaurant avec vue sur les cascades</li>
  <li>Se baigner dans les bassins naturels (été)</li>
</ul>

<h2>Conseils pratiques</h2>
<ul>
  <li><strong>Meilleure période</strong> : Printemps (mars-mai) pour un débit maximum</li>
  <li><strong>Durée de visite</strong> : Prévoir 3-4 heures sur place</li>
  <li><strong>Équipement</strong> : Chaussures de marche, maillot de bain, appareil photo</li>
  <li><strong>Budget</strong> : 100-200 MAD/personne (repas + activités)</li>
</ul>
```

**Date de publication** : Aujourd'hui

**Temps de lecture** : 8 (minutes)

**En vedette** : ✅ Oui

**Image de couverture** : Photo des cascades

**Auteur** : Sélectionner l'auteur créé

**Catégories** : Tourisme, Conseils

**Tags** : ouzoud, cascades, excursion, nature, azilal

---

#### Autres articles suggérés :

1. **Top 10 des activités à faire autour d'Azilal**
2. **Le Géoparc M'Goun : Un trésor géologique**
3. **La cuisine berbère : Plats traditionnels à découvrir**
4. **Randonnée dans le Haut Atlas : Nos meilleurs parcours**
5. **Préparer sa valise pour un séjour à Azilal**

---

### 6️⃣ Activités (Activities)

**Menu** : Content Manager → Activities → Create new entry

#### Exemple : Excursion Cascades d'Ouzoud

**Nom** : Excursion aux Cascades d'Ouzoud

**Slug** : excursion-cascades-ouzoud

**Type** : Excursion

**Description courte** : Découvrez les majestueuses cascades d'Ouzoud, hautes de 110 mètres

**Description** :
```html
<p>Partez à la découverte des spectaculaires Cascades d'Ouzoud, situées
à seulement 50 km de l'hôtel. Cette excursion d'une journée vous permettra
d'admirer l'une des plus belles merveilles naturelles du Maroc.</p>

<h3>Programme de la journée</h3>
<ul>
  <li>09h00 : Départ de l'hôtel</li>
  <li>10h00 : Arrivée aux cascades</li>
  <li>10h00-13h00 : Exploration libre, randonnée, photos</li>
  <li>13h00-14h30 : Déjeuner avec vue sur les cascades</li>
  <li>14h30-16h30 : Balade en barque, observation des singes</li>
  <li>17h00 : Retour à l'hôtel</li>
</ul>

<h3>Inclus</h3>
<ul>
  <li>Transport aller-retour en véhicule climatisé</li>
  <li>Guide local francophone</li>
  <li>Déjeuner traditionnel</li>
  <li>Balade en barque</li>
  <li>Bouteille d'eau</li>
</ul>
```

**Durée** : Journée complète (8h)

**Difficulté** : facile

**Prix** : 0 (calculé par personne)

**Fourchette de prix** : 350-450 MAD/personne

**Distance depuis l'hôtel** : 50 (km)

**Téléphone** : +212 5 23 45 67 89

**Site web** : (laisser vide ou mettre votre site)

**En vedette** : ✅ Oui

**Inclus** :
- Transport aller-retour
- Guide francophone
- Déjeuner traditionnel
- Balade en barque

**Non inclus** :
- Pourboires
- Dépenses personnelles

**Image** : Photo des cascades

**Galerie** : 3-5 photos de l'excursion

---

#### Autres activités à créer :

1. **Randonnée au Géoparc M'Goun** (moyen, 300 MAD)
2. **Visite du marché berbère d'Azilal** (facile, 150 MAD)
3. **Cours de cuisine marocaine** (facile, 400 MAD)
4. **Trekking de 2 jours dans l'Atlas** (difficile, 1200 MAD)

---

### 7️⃣ Éléments du Restaurant (Restaurant Items)

**Menu** : Content Manager → Restaurant Items → Create new entry

#### Exemple - Catégorie Entrées :

**Nom** : Salade Marocaine

**Slug** : salade-marocaine

**Catégorie** : Entrée

**Description** : Salade fraîche de tomates, concombres, poivrons et oignons, assaisonnée à l'huile d'olive et au cumin

**Prix** : 45 (MAD)

**En vedette** : ✅ Oui

**Disponible** : ✅ Oui

**Allergènes** : (vide si aucun)

**Végétarien** : ✅ Oui

**Sans gluten** : ✅ Oui

**Ordre d'affichage** : 1

---

#### Menu complet suggéré :

**Entrées** :
- Salade Marocaine (45 MAD)
- Zaalouk (55 MAD)
- Briouates aux légumes (60 MAD)
- Harira (35 MAD)

**Plats principaux** :
- Tajine poulet aux olives (120 MAD)
- Tajine agneau aux pruneaux (150 MAD)
- Couscous royal (140 MAD)
- Pastilla au poulet (130 MAD)

**Desserts** :
- Cornes de gazelle (45 MAD)
- Gâteau aux amandes (50 MAD)
- Salade de fruits frais (40 MAD)

**Boissons** :
- Thé à la menthe (25 MAD)
- Jus d'orange frais (30 MAD)
- Café (20 MAD)

---

### 8️⃣ Configuration eZee (eZee Config) - Single Type

**Menu** : Content Manager → eZee Config

**Code hôtel** : ATLAS-DAY-AZILAL

**URL de réservation** : https://live.ipms247.com/booking/book-rooms-atlasday

**Clé API** : (Obtenir auprès de votre fournisseur eZee)

**API activée** : ✅ Oui (si vous avez la clé)

**Thème du widget** :
```json
{
  "primaryColor": "#C9A55C",
  "secondaryColor": "#2C5F7F"
}
```

---

### 9️⃣ Configuration Globale (Global Config) - Single Type

**Menu** : Content Manager → Global Config

**Nom du site** (FR) : Hôtel Atlas Day

**Nom du site** (EN) : Atlas Day Hotel

**Nom du site** (AR) : فندق أطلس داي

**Logo** : Télécharger le logo de l'hôtel

**Email de contact** : contact@hotelatlasday.com

**Téléphone** : +212 5 23 45 67 89

**Adresse** (FR) : Avenue Hassan II, Azilal 22000, Maroc

**Réseaux sociaux** :
- **Facebook** : https://facebook.com/hotelatlasday
- **Instagram** : https://instagram.com/hotelatlasday
- **Twitter** : https://twitter.com/hotelatlasday

---

## 🖼️ Conseils pour les Images

### Dimensions recommandées :

- **Images de chambres** : 1920x1080px (16:9)
- **Images d'activités** : 1920x1080px (16:9)
- **Images de blog** : 1920x1080px (16:9)
- **Logo** : 500x200px (transparent PNG)
- **Images restaurant** : 1200x800px

### Sources d'images gratuites :

- Unsplash.com
- Pexels.com
- Pixabay.com

Mots-clés : "hotel room", "morocco", "atlas mountains", "waterfalls", "berber", "moroccan food"

---

## ✅ Checklist de Lancement

Avant de tester le frontend :

- [ ] Au moins 10 équipements créés
- [ ] Au moins 1 auteur créé
- [ ] Au moins 3 catégories créées
- [ ] Au moins 3 chambres créées et **PUBLIÉES**
- [ ] Au moins 3 articles de blog créés et **PUBLIÉS**
- [ ] Au moins 3 activités créées et **PUBLIÉES**
- [ ] Au moins 10 items de restaurant créés et **PUBLIÉS**
- [ ] Configuration eZee remplie
- [ ] Configuration globale remplie
- [ ] Permissions API configurées (Public role)
- [ ] Frontend testé : `cd frontend && npm run dev`

---

## 🧪 Tester le Frontend

Une fois le contenu ajouté dans Strapi :

```bash
# Terminal 1 : Strapi (déjà lancé)
cd cms
npm run develop

# Terminal 2 : Frontend Next.js
cd frontend
npm run dev
```

Visitez **http://localhost:3000** et vérifiez :

- ✅ Homepage affiche les chambres en vedette
- ✅ Page `/chambres` affiche toutes les chambres
- ✅ Page `/blog` affiche les articles
- ✅ Page `/activites` affiche les activités
- ✅ Page `/restaurant` affiche le menu
- ✅ Page `/a-propos` s'affiche correctement
- ✅ Changement de langue (FR/EN/AR) fonctionne

---

## 🚀 Prochaines Étapes

1. **Optimiser les images** : Configurer Cloudinary
2. **Email de contact** : Configurer Resend ou SendGrid
3. **eZee intégration** : Obtenir les credentials eZee Absolute
4. **SEO** : Vérifier Google Search Console
5. **Performance** : Tester avec Lighthouse
6. **Déploiement** : Vercel (frontend) + Strapi Cloud (CMS)

---

## 💡 Besoin d'Aide ?

- **Strapi Docs** : https://docs.strapi.io
- **Next.js Docs** : https://nextjs.org/docs
- **Support client** : contact@hotelatlasday.com

---

**Créé par Claude Code pour SESNOV - Hôtel Atlas Day** 🏔️
