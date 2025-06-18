import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  isMobile: boolean;
  touchedProject: number | null;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}

export const ProjectCard = ({
  project,
  index,
  isMobile,
  touchedProject,
  onTouchStart,
  onTouchEnd,
}: ProjectCardProps) => {
  const getTechTags = (projectId: number) => {
    switch (projectId) {
      case 1:
        return ["React", "Quiz Engine", "Medical"];
      case 2:
        return ["Video Editing", "Creative", "Portfolio"];
      case 3:
        return ["Next.js", "API Integration", "Gaming"];
      default:
        return [];
    }
  };

  return (
    <div
      className="group relative animate-slide-up"
      style={{
        animationDelay: `${0.5 + index * 0.4}s`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      <div
        className={`glass-card relative overflow-hidden rounded-3xl transition-all duration-500 ${
          isMobile
            ? `mobile-glow mobile-float-${index + 1} ${
                touchedProject === project.id ? "glass-card-active" : ""
              }`
            : `hover:glass-card-hover desktop-float-${index + 1}`
        }`}
        style={
          isMobile
            ? {
                animationDelay: `${2 + index * 0.5}s`,
                animationDuration: `${5 + index}s`,
              }
            : {}
        }>
        {/* Decorative gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5`}
        />

        {/* Animated gradient border */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}
        />

        {/* Content container */}
        <div className="relative p-8 h-full flex flex-col">
          {/* Header with icon and title */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-2 transition-all duration-500">
                {project.icon}
              </div>
              <h3 className="text-2xl font-bold group-hover:text-white transition-colors duration-300 leading-tight font-outfit">
                {project.title}
              </h3>
            </div>
            {project.id === 3 ? (
              <div className="w-2 h-2 rounded-full bg-gray-500" />
            ) : (
              <div className="relative transform -translate-x-2">
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color} animate-pulse`}
                />
                <div
                  className={`absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r ${project.color} opacity-40 animate-ping`}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-grow">
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {getTechTags(project.id).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative overflow-hidden px-6 py-3 rounded-xl font-bold font-bold-force text-base transition-all duration-300 cursor-pointer inline-flex items-center justify-center bg-gradient-to-r ${project.color} bg-opacity-90 text-white hover:scale-105 hover:shadow-lg`}>
            <div className="absolute inset-0 bg-black/20" />
            <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
              Découvrir
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Glowing border effect */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10`}
        />
      </div>
    </div>
  );
};
