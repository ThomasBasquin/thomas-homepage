"use client";

import { useAnimations } from "@/hooks/useAnimations";
import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import "@/styles/animations.css";
import "@/styles/components.css";
import "@/styles/projectCards.css";

export default function Home() {
  const { mousePosition, particles, scrollY } = useAnimations();

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
        <Header />

        <h2 className="sr-only">Projets</h2>

        <ProjectsGrid />

        {/* Footer */}
        <div className="mt-20 pb-8 text-center">
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_2px_rgba(192,132,252,0.5)]" />
            <span className="text-sm font-medium tracking-wide">
              © {new Date().getFullYear()} Thomas Basquin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
