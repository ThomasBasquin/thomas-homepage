import { Project } from "@/types";
import { ProjectCardShell } from "./ProjectCardShell";

interface QuizCardProps {
  project: Project;
}

export const QuizCard = ({ project }: QuizCardProps) => {
  return (
    <ProjectCardShell
      project={project}
      className="card-quiz"
      titleClassName="font-petrona italic font-semibold"
      tagClassName="quiz-tag"
      ctaClassName="quiz-cta"
      decoration={
        <span className="quiz-corner pointer-events-none absolute z-0" aria-hidden="true" />
      }
      visual={
        <span
          className="font-petrona flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl font-bold italic"
          style={{ borderColor: "oklch(0.55 0.12 75 / 0.4)" }}
          aria-hidden="true"
        >
          ?
        </span>
      }
    />
  );
};
