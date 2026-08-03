---
title: "Nook"
tagline: "Jeux, films, séries : tout au même endroit"
description: "Suivi collaboratif de jeux, films, séries et animés, pensé mobile-first."
role: "Conception, design et développement"
stack: ["Next.js", "TypeScript", "PWA"]
accent: "#3b5bff"
device: "phone"
year: 2025
links:
  demo: "https://nook.thomasbasquin.fr/"
media:
  poster: "/media/nook/poster.webp"
  video:
    webm: "/media/nook/loop.webm"
    mp4: "/media/nook/loop.mp4"
  gallery:
    - "/media/nook/capture-1.webp"
    - "/media/nook/capture-2.webp"
featured: true
order: 1
---

## Ce que fait l'application

Nook rassemble dans une même bibliothèque ce qu'on joue, regarde et suit — jeux, films, séries, animés — au lieu d'une application par type de média. Chaque entrée porte son statut de progression, et les listes se partagent entre plusieurs personnes.

L'application demande un compte : tout ce qu'on y range est personnel, et le partage suppose de savoir qui range quoi.

## Le choix du mobile

Nook est d'abord une application de canapé : on l'ouvre pour cocher un épisode, pas pour administrer un catalogue. Tout en découle.

Elle s'installe depuis le navigateur — manifeste web, affichage `standalone`, orientation portrait verrouillée, ouverture directe sur la bibliothèque de jeux. Une fois posée sur l'écran d'accueil, plus rien ne signale un site web. L'interface est construite sur un jeu de variables CSS (surfaces, contenus, états) plutôt que sur des couleurs écrites en dur, ce qui laisse le thème sombre et les états actifs cohérents d'un écran à l'autre.
