import { Project } from "@/types";
import { MyShelfCard } from "./MyShelfCard";
import { OsteoCard } from "./OsteoCard";
import { QuizCard } from "./QuizCard";
import { MartinCard } from "./MartinCard";
import { PokedexCard } from "./PokedexCard";

interface ProjectCardRouterProps {
  project: Project;
}

export const ProjectCardRouter = ({ project }: ProjectCardRouterProps) => {
  switch (project.slug) {
    case "myshelf":
      return <MyShelfCard project={project} />;
    case "osteo":
      return <OsteoCard project={project} />;
    case "quiz":
      return <QuizCard project={project} />;
    case "martin":
      return <MartinCard project={project} />;
    case "pokedex":
      return <PokedexCard project={project} />;
  }
};
