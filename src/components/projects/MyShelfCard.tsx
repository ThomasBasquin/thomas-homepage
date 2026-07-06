import { Project } from "@/types";
import { ProjectCardShell } from "./ProjectCardShell";

const SPINE_COLORS = ["oklch(0.62 0.19 262)", "oklch(0.72 0.15 235)", "oklch(0.55 0.16 300)", "oklch(0.78 0.12 210)"];
const SPINE_HEIGHTS = ["100%", "78%", "92%", "62%"];

interface MyShelfCardProps {
  project: Project;
}

export const MyShelfCard = ({ project }: MyShelfCardProps) => {
  return (
    <ProjectCardShell
      project={project}
      className="card-myshelf"
      titleClassName="font-extrabold"
      tagClassName="myshelf-tag"
      ctaClassName="myshelf-cta"
      visual={
        <div className="myshelf-shelf" aria-hidden="true">
          {SPINE_COLORS.map((color, i) => (
            <span
              key={i}
              className="myshelf-spine"
              style={{ backgroundColor: color, height: SPINE_HEIGHTS[i], "--i": i } as React.CSSProperties}
            />
          ))}
        </div>
      }
    />
  );
};
