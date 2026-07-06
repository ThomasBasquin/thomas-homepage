import { projects } from "@/data/projects";
import { ProjectCardRouter } from "./projects/ProjectCardRouter";

export const ProjectsGrid = () => {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`card-entrance float-${(index % 3) + 1} ${
            project.featured ? "md:col-span-2 lg:col-span-2" : ""
          }`}
          style={{ "--enter-delay": `${0.5 + index * 0.15}s` } as React.CSSProperties}
        >
          <ProjectCardRouter project={project} />
        </div>
      ))}
    </div>
  );
};
