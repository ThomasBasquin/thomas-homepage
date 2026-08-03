---
title: "Pokédex"
tagline: "L'encyclopédie Pokémon interactive"
description: "Encyclopédie interactive des Pokémon, avec recherche et fiches détaillées."
role: "Développement"
stack: ["Next.js", "TypeScript", "Tailwind"]
accent: "#ef4444"
device: "phone"
year: 2023
links:
  demo: "https://pokedex.thomasbasquin.fr/"
media:
  poster: "/media/pokedex/poster.webp"
  video:
    webm: "/media/pokedex/loop.webm"
    mp4: "/media/pokedex/loop.mp4"
  gallery:
    - "/media/pokedex/capture-1.webp"
    - "/media/pokedex/capture-2.webp"
featured: false
order: 4
---

## L'encyclopédie

Chaque fiche donne le nom français et le nom japonais, la description du Pokédex, les types, les talents, la taille, le poids — et le cri, qu'on peut écouter.

La navigation couvre le millier d'entrées par tranches de cinquante, avec une recherche par nom pour aller directement au but. C'est un projet de plaisir, et ça se voit : le soin est mis là où on passe du temps, sur la fiche elle-même.

## Rendu statique

Les données sont figées au build plutôt que demandées à chaque visite : les pages sont générées à l'avance et servies telles quelles. Passer d'une créature à l'autre n'attend aucun aller-retour réseau.

C'est le projet qui m'a fait prendre mes habitudes actuelles — typage strict du jeu de données, pré-rendu par défaut, et un travail sérieux sur le poids des images quand il y en a plusieurs centaines.
