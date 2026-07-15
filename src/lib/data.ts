export const SITE_URL = "https://thomasbasquin.fr";

export const PROFILE = {
  name: "Thomas Basquin",
  firstName: "Thomas",
  role: "Développeur web",
  status: "Développeur web · France",
  taglines: [
    "conçois des applications web de bout en bout.",
    "développe du prototype à la mise en production.",
    "construis des interfaces rapides et soignées.",
    "héberge et déploie mes projets moi-même.",
  ],
  bio: "Je conçois et développe des sites et applications web, du prototype à la mise en production.",
  about: {
    lead: "Je conçois et développe des sites et applications web de bout en bout : interface, données, hébergement et mise en production.",
    p2: "Mes projets couvrent des besoins variés — une PWA collaborative de suivi de médias, un site vitrine avec prise de rendez-vous en ligne pour un cabinet d'ostéopathie, une application de quiz — construits avec Next.js, Astro et React.",
    p3: "Je privilégie des systèmes simples, rapides et maintenables, pensés pour l'usage réel plutôt que pour la démonstration technique.",
    credentials: [
      "À COMPLÉTER — formation / diplôme",
      "À COMPLÉTER — certification ou fait marquant",
      "À COMPLÉTER — situation actuelle (poste, ville)",
    ],
  },
  email: "thomas.basquin2@gmail.com",
  location: "France",
  siteUrl: `${SITE_URL}/`,
  socials: {
    github: "https://github.com/ThomasBasquin",
  },
};

export type Job = {
  company: string;
  title: string;
  range: string;
  location: string;
  blurb: string;
  points: string[];
};

/** Entrées factices — à remplacer par le vrai parcours avant mise en ligne. */
export const EXPERIENCE: Job[] = [
  {
    company: "À-COMPLÉTER",
    title: "À COMPLÉTER — intitulé du poste",
    range: "20xx — 20xx",
    location: "Ville · Type de contrat",
    blurb:
      "À COMPLÉTER — une phrase qui résume la mission et ce qui a été livré.",
    points: [
      "À COMPLÉTER — réalisation concrète n°1",
      "À COMPLÉTER — réalisation concrète n°2",
      "À COMPLÉTER — réalisation concrète n°3",
    ],
  },
];

export type Skill = {
  /** Numéro de module HUD, "01".."06" */
  num: string;
  name: string;
  items: string;
};

export const SKILLS: Skill[] = [
  { num: "01", name: "Frontend", items: "React · Next.js · Astro" },
  { num: "02", name: "Langages", items: "TypeScript · HTML · CSS" },
  { num: "03", name: "Interface", items: "Tailwind CSS · responsive" },
  { num: "04", name: "État & données", items: "Zustand · Leaflet" },
  { num: "05", name: "PWA", items: "Mobile-first · offline" },
  { num: "06", name: "Déploiement", items: "Linux · export statique" },
];

export type Project = {
  id: string;
  title: string;
  meta: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Extrémités du dégradé utilisées pour générer la carte en orbite. */
  colorA: string;
  colorB: string;
  /** Lien externe (site live / GitHub). Null = pas de lien public. */
  link: string | null;
  linkLabel?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "myshelf",
    title: "MyShelf",
    meta: "Web · PWA",
    tagline: "Jeux, films, séries : tout au même endroit",
    description:
      "Suivi collaboratif de jeux, films, séries et animés, pensé mobile-first (PWA).",
    tags: ["Next.js", "TypeScript", "PWA"],
    colorA: "#0e1638",
    colorB: "#3b5bff",
    link: "https://myshelf.thomasbasquin.fr/",
    linkLabel: "Voir le site",
    featured: true,
  },
  {
    id: "osteo",
    title: "Marie Wach",
    meta: "Site vitrine · Client",
    tagline: "Un cabinet d'ostéopathie, en ligne",
    description:
      "Site vitrine pour un cabinet d'ostéopathie, avec prise de rendez-vous en ligne.",
    tags: ["Astro", "TypeScript", "Leaflet"],
    colorA: "#0f2a1d",
    colorB: "#57c785",
    link: "https://osteo.thomasbasquin.fr/",
    linkLabel: "Voir le site",
  },
  {
    id: "quiz",
    title: "Quiz d'Ostéopathie",
    meta: "Web app · Éducation",
    tagline: "Réviser les sciences ostéopathiques",
    description: "Application de quiz en sciences ostéopathiques.",
    tags: ["React", "TypeScript", "Zustand"],
    colorA: "#2b1c07",
    colorB: "#e0a63f",
    link: "https://quiz.thomasbasquin.fr/",
    linkLabel: "Voir le site",
  },
  {
    id: "martin",
    title: "Martin Basquin",
    meta: "Portfolio · Créatif",
    tagline: "Le montage vidéo de Martin, en vitrine",
    description: "Portfolio créatif montage vidéo de Martin.",
    tags: ["HTML", "CSS"],
    colorA: "#26091f",
    colorB: "#e04fae",
    link: "https://martinbasquin.thomasbasquin.fr/",
    linkLabel: "Voir le site",
  },
  {
    id: "pokedex",
    title: "Pokédex",
    meta: "Web app · Fun",
    tagline: "L'encyclopédie Pokémon interactive",
    description: "Encyclopédie interactive des Pokémon.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    colorA: "#2b0b0b",
    colorB: "#ef4444",
    link: "https://pokedex.thomasbasquin.fr/",
    linkLabel: "Voir le site",
  },
];

export const ARCHIVE_URL = "https://github.com/ThomasBasquin";
