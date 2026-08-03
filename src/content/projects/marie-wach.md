---
title: "Marie Wach"
tagline: "Un cabinet d'ostéopathie, en ligne"
description: "Site vitrine pour un cabinet d'ostéopathie, avec prise de rendez-vous en ligne."
role: "Design, développement et mise en ligne"
stack: ["Astro", "TypeScript", "Leaflet"]
accent: "#57c785"
device: "browser"
year: 2024
links:
  demo: "https://mariewach.fr/"
media:
  poster: "/media/marie-wach/poster.webp"
  video:
    webm: "/media/marie-wach/loop.webm"
    mp4: "/media/marie-wach/loop.mp4"
  gallery:
    - "/media/marie-wach/capture-1.webp"
    - "/media/marie-wach/capture-2.webp"
featured: false
order: 2
---

## Le besoin du cabinet

Un cabinet d'ostéopathie à Dieffenbach-au-Val avait besoin de trois choses : être trouvé, être situé, être joignable pour un rendez-vous. Le reste est du bruit.

Le site tient donc sur peu d'écrans : ce que fait la praticienne, où se trouve le cabinet — carte Leaflet, pas d'iframe tierce à charger — et la prise de rendez-vous. La mention que l'ostéopathie ne se substitue pas à un suivi médical y figure explicitement : un site de santé engage celle dont il porte le nom.

## Le thème circadien

Le site n'a pas de bouton « mode sombre » comme réglage principal. Il est clair entre le lever et le coucher du soleil, sombre la nuit.

Les heures ne viennent pas d'une API : elles sont calculées à partir des coordonnées du cabinet, équation du temps comprise. Le script est inliné dans le `<head>` et s'exécute avant le premier rendu, pour qu'aucun flash de thème ne soit visible au chargement. Une bascule manuelle reste possible, retenue le temps de la visite.

C'est le genre de détail que personne ne remarque tant qu'il fonctionne — ce qui est exactement le but.
