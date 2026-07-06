import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

interface ProjectsGridProps {
  isMobile: boolean;
  touchedProject: number | null;
  setTouchedProject: (id: number | null) => void;
}

export const ProjectsGrid = ({
  isMobile,
  touchedProject,
  setTouchedProject,
}: ProjectsGridProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-12 max-w-7xl w-full">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]"
        >
          <ProjectCard
            project={project}
            index={index}
            isMobile={isMobile}
            touchedProject={touchedProject}
            onTouchStart={() => setTouchedProject(project.id)}
            onTouchEnd={() =>
              setTimeout(() => setTouchedProject(null), 2000)
            }
          />
        </div>
      ))}
    </div>
  );
};
