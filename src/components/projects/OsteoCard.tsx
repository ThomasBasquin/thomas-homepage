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
      visual={
        <div className="osteo-halo flex items-center justify-center">
          <ProjectIcon name={project.icon} className="h-9 w-9" />
        </div>
      }
    />
  );
};
