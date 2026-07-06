import { ReactNode } from "react";
import { Project } from "@/types";

interface ProjectCardShellProps {
  project: Project;
  visual: ReactNode;
  decoration?: ReactNode;
  className: string;
  titleClassName: string;
  tagClassName: string;
  ctaClassName: string;
}

export const ProjectCardShell = ({
  project,
  visual,
  decoration,
  className,
  titleClassName,
  tagClassName,
  ctaClassName,
}: ProjectCardShellProps) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${project.ctaLabel}`}
      className={`project-card group relative flex h-full flex-col overflow-hidden rounded-[28px] p-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      {decoration}
      <div className="relative z-10 mb-6">{visual}</div>

      <h3 className={`relative z-10 mb-1 text-[1.75rem] leading-tight ${titleClassName}`}>
        {project.title}
      </h3>
      <p className="relative z-10 mb-4 text-sm font-semibold opacity-70">
        {project.tagline}
      </p>
      <p className="relative z-10 mb-6 flex-grow text-[15px] leading-relaxed opacity-80">
        {project.description}
      </p>

      <div className="relative z-10 mb-8 flex flex-wrap gap-2">
        {project.techTags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-medium ${tagClassName}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <span
        className={`relative z-10 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1 ${ctaClassName}`}
      >
        {project.ctaLabel}
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </a>
  );
};
