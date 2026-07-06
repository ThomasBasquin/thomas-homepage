export type ProjectIconName = "shelf" | "bone" | "quiz" | "clap" | "pokeball";

export interface Project {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: ProjectIconName;
  url: string;
}

export interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}
