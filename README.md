# Thomas Basquin — Portfolio

Portfolio personnel : un « voyage spatial » 3D piloté au scroll. Le visiteur pilote une fusée depuis le pas de tir à travers le système solaire ; chaque section (à propos, parcours, compétences, projets, contact) est un jalon céleste sur la trajectoire.

Adapté du projet open-source [AbhishekBadar/portfolio](https://github.com/AbhishekBadar/portfolio) — architecture et scène 3D d'origine, contenu et langue remplacés.

## Stack

- **Next.js 16** (App Router) + React 19, TypeScript strict
- **three.js + @react-three/fiber** pour la scène 3D, **postprocessing** (bloom, aberration chromatique, vignette)
- **Lenis** pour le smooth scroll, **motion** pour les animations DOM, **zustand** pour l'état
- **Tailwind CSS v4**
- Export statique (`output: "export"`) déployé par rsync (`deploy.sh`)

## Développement

```bash
npm run dev     # serveur de dev (Turbopack)
npm run build   # build + export statique dans out/
./deploy.sh     # build + rsync vers /var/www/html
```

## Contenu

Tout le contenu du site (profil, parcours, compétences, projets) vit dans **`src/lib/data.ts`** — c'est le seul fichier à éditer pour changer ce que le site raconte. Les entrées marquées « À COMPLÉTER » attendent le vrai parcours professionnel.

L'architecture complète (scroll → vol, chorégraphie caméra, textures canvas) est documentée dans `docs/CONTEXT.md`.

## Crédits assets

- Textures de planètes — [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0)
- HDRI « Dikhololo Night » — [Poly Haven](https://polyhaven.com) (CC0)
- Modèles 3D (astronaute, vaisseau) — [Quaternius Ultimate Space Kit](https://quaternius.com) (CC0)
- Modèle ISS — [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources) (domaine public)
