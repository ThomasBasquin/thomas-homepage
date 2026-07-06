export type ProjectIconName = "shelf" | "bone" | "quiz" | "clap" | "pokeball";

export type ProjectSlug = "myshelf" | "osteo" | "quiz" | "martin" | "pokedex";

export interface Project {
  id: number;
  slug: ProjectSlug;
  title: string;
  tagline: string;
  description: string;
  icon: ProjectIconName;
  url: string;
  ctaLabel: string;
  techTags: string[];
  featured?: boolean;
}

export interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}
