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
    <div
      className={`grid gap-8 max-w-6xl w-full ${
        projects.length % 2 === 0
          ? "grid-cols-1 md:grid-cols-2"
          : "grid-cols-1 lg:grid-cols-3"
      }`}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isMobile={isMobile}
          touchedProject={touchedProject}
          onTouchStart={() => setTouchedProject(project.id)}
          onTouchEnd={() =>
            setTimeout(() => setTouchedProject(null), 2000)
          }
        />
      ))}
    </div>
  );
};