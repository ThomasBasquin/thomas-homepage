---
title: "Nook"
tagline: "Jeux, films, séries : tout au même endroit"
description: "Suivi collaboratif de jeux, films, séries et animés, pensé mobile-first."
role: "Conception, design et développement"
stack: ["Next.js", "TypeScript", "PWA"]
accent: "#3b5bff"
year: 2025
links:
  demo: "https://nook.thomasbasquin.fr/"
media:
  poster: "/media/nook/poster.svg"
  video:
    webm: "/media/nook/loop.webm"
  gallery:
    - "/media/nook/capture-1.svg"
    - "/media/nook/capture-2.svg"
featured: true
order: 1
---

## Contexte

<!-- PLACEHOLDER : texte plausible à relire et personnaliser -->

Entre les jeux en cours, les séries à reprendre et les films recommandés par les proches, tout finissait éparpillé : des notes, des captures d'écran, des messages. Nook est né de ce besoin simple : un coin commun où chacun range ce qu'il regarde et ce qu'il joue.

## Le problème

Les applications existantes traitent chaque média séparément (une pour les séries, une pour les jeux) et se partagent mal. Il fallait un seul outil, utilisable à plusieurs, assez rapide sur mobile pour être ouvert dans le canapé, et qui fonctionne même sans réseau.

## La solution

Une PWA mobile-first construite avec Next.js et TypeScript : listes partagées, statuts de progression, recherche par titre. L'application s'installe sur l'écran d'accueil et garde ses données consultables hors ligne. L'interface privilégie les gestes courts : ajouter, cocher, passer au suivant.

## Ce que j'ai appris

Faire tenir une vraie logique collaborative dans une interface simple demande plus de travail de retrait que d'ajout. Ce projet m'a aussi appris à traiter le mode hors ligne comme une contrainte de conception dès le départ, pas comme une option ajoutée à la fin.
