import { Project } from "@/types";
import { ProjectIcon } from "@/components/ProjectIcon";
import { ProjectCardShell } from "./ProjectCardShell";

interface OsteoCardProps {
  project: Project;
}

export const OsteoCard = ({ project }: OsteoCardProps) => {
  return (
    <ProjectCardShell
      project={project}
      className="card-osteo"
      titleClassName="font-baloo font-extrabold"
      tagClassName="osteo-tag"
      ctaClassName="osteo-cta"
      decoration={
        <>
          <span
            className="osteo-petal h-2 w-2"
            style={{ top: "18%", right: "22%", animationDelay: "0s" }}
            aria-hidden="true"
          />
          <span
            className="osteo-petal h-1.5 w-1.5"
            style={{ top: "38%", right: "10%", animationDelay: "2.5s" }}
            aria-hidden="true"
          />
          <span
            className="osteo-petal h-1 w-1"
            style={{ top: "10%", right: "38%", animationDelay: "5s" }}
            aria-hidden="true"
          />
        </>
      }
      visual={
        <div className="osteo-halo flex items-center justify-center">
          <ProjectIcon
            name={project.icon}
            className="h-8 w-8"
            solidColor="oklch(0.32 0.06 165)"
          />
        </div>
      }
    />
  );
};
