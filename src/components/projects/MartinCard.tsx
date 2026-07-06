import { Project } from "@/types";
import { ProjectCardShell } from "./ProjectCardShell";

interface MartinCardProps {
  project: Project;
}

export const MartinCard = ({ project }: MartinCardProps) => {
  return (
    <ProjectCardShell
      project={project}
      className="card-martin"
      titleClassName="martin-neon font-monoton text-2xl uppercase [word-spacing:0.35em]"
      tagClassName="martin-tag"
      ctaClassName="martin-cta"
      visual={
        <span className="font-monoton martin-neon text-xs uppercase tracking-[0.2em] opacity-80">
          Rec ●
        </span>
      }
    />
  );
};
