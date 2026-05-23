export interface Project {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  url: string;
}

export interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}
