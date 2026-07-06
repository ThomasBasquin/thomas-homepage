import { Project } from "@/types";
import { ProjectIcon } from "@/components/ProjectIcon";
import { ProjectCardShell } from "./ProjectCardShell";

interface PokedexCardProps {
  project: Project;
}

export const PokedexCard = ({ project }: PokedexCardProps) => {
  return (
    <ProjectCardShell
      project={project}
      className="card-pokedex"
      titleClassName="font-extrabold"
      tagClassName="pokedex-tag"
      ctaClassName="pokedex-cta"
      visual={
        <div className="flex items-center gap-3">
          <span className="pokedex-ball-wrap">
            <ProjectIcon name={project.icon} className="h-7 w-7" />
          </span>
          <span className="font-press-start pokedex-badge text-[0.6rem]">Nº001</span>
        </div>
      }
    />
  );
};
