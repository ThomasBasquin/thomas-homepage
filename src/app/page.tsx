"use client";

import { useAnimations } from "@/hooks/useAnimations";
import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import "@/styles/animations.css";
import "@/styles/components.css";

export default function Home() {
  const {
    mousePosition,
    particles,
    isMobile,
    typedText,
    scrollY,
    touchedProject,
    setTouchedProject,
  } = useAnimations();

  return (
    <div
      className="min-h-[100lvh] bg-gradient-to-br from-black via-gray-900 to-black text-white relative"
    >
      {/* Grid Overlay */}
      <div className="grid-overlay absolute inset-0 pointer-events-none z-20" />

      {/* Background Effects */}
      <Background
        mousePosition={mousePosition}
        particles={particles}
        scrollY={scrollY}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100lvh] p-8">
        <Header typedText={typedText} />

        <ProjectsGrid
          isMobile={isMobile}
          touchedProject={touchedProject}
          setTouchedProject={setTouchedProject}
        />

        {/* Footer */}
        <div className="mt-16 pb-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-gray-500">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gray-500" />
            <span className="text-sm tracking-wider">© {new Date().getFullYear()} Thomas Basquin</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
