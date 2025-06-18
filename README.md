# Thomas - Portfolio & Side Projects

Portfolio personnel de Thomas présentant ses projets web avec une interface moderne et interactive.

## ✨ Fonctionnalités

- **Design glassmorphisme** avec effets de flou et transparence
- **Animations fluides** et interactions souris/tactile
- **Responsive design** optimisé mobile et desktop
- **Easter eggs interactifs** cachés dans l'interface
- **Effets visuels** : particules flottantes, grille animée, parallax

## 🚀 Projets présentés

- **Quiz Ostéo** - Application de quiz en ostéopathie (React + Vite)
- **Portfolio Martin** - Portfolio créatif de montage vidéo
- **Pokédex** - Encyclopédie interactive des Pokémon (Next.js + PokeAPI)

## 🎮 Easter Eggs

Découvrez les fonctionnalités cachées :

- **Triple-click** sur "Thomas" → Affiche l'aide des Easter eggs
- **Konami Code** (↑↑↓↓←→←→) → Mode hacker avec lignes Matrix
- **Tape "coin"** → Canard animé qui se balade ! 🦆

## 🛠️ Technologies

- **Next.js 15** avec App Router et Turbopack
- **TypeScript** pour la sécurité de type
- **Tailwind CSS** pour le styling
- **React 19** avec hooks personnalisés
- **Architecture modulaire** avec composants réutilisables

## 📦 Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd thomas-homepage

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🔧 Scripts disponibles

```bash
npm run dev      # Serveur de développement avec Turbopack
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Analyse ESLint
```

## 📁 Structure du projet

```
src/
├── app/          # Pages Next.js (layout, page principal)
├── components/   # Composants React réutilisables
├── hooks/        # Hooks personnalisés (animations, Easter eggs)
├── data/         # Données statiques et constantes
├── types/        # Types TypeScript
└── styles/       # Fichiers CSS (animations, composants)
```

## 🎨 Architecture

Le projet suit une architecture Next.js modulaire avec :

- **Séparation des responsabilités** : hooks pour la logique métier
- **Composants focalisés** : chaque composant a une responsabilité unique  
- **Styles organisés** : animations et styles séparés
- **Performance optimisée** : throttling des événements, useCallback

## 🚀 Déploiement

Le projet est optimisé pour le déploiement sur [Vercel](https://vercel.com) :

```bash
npm run build  # Vérifier que le build fonctionne
```

Le déploiement se fait automatiquement via Git avec Vercel.