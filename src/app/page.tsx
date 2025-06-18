"use client";

import { useEasterEggs } from "@/hooks/useEasterEggs";
import { useAnimations } from "@/hooks/useAnimations";
import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { EasterEggModal } from "@/components/EasterEggModal";
import { HackerLines } from "@/components/HackerLines";
import { Duck } from "@/components/Duck";
import "@/styles/animations.css";
import "@/styles/components.css";

export default function Home() {
  const {
    showEasterEggInfo,
    setShowEasterEggInfo,
    hackerMode,
    duckMode,
    handleTripleClick,
  } = useEasterEggs();

  const {
    mousePosition,
    particles,
    isMobile,
    scrollY,
    typedText,
    hackerLines,
    touchedProject,
    setTouchedProject,
  } = useAnimations(hackerMode);

  return (
    <div
      className={`min-h-screen text-white overflow-hidden relative transition-colors duration-1000 ${
        hackerMode ? "bg-black" : "bg-black"
      }`}
    >
      {/* Grid Overlay */}
      <div
        className={`grid-overlay fixed inset-0 pointer-events-none z-20 ${
          hackerMode ? "hacker-grid" : ""
        }`}
      />

      {/* Easter Egg Components */}
      <HackerLines lines={hackerLines} isActive={hackerMode} />
      <EasterEggModal
        isOpen={showEasterEggInfo}
        onClose={() => setShowEasterEggInfo(false)}
      />
      <Duck isActive={duckMode} />

      {/* Background Effects */}
      <Background mousePosition={mousePosition} particles={particles} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <Header
          typedText={typedText}
          scrollY={scrollY}
          hackerMode={hackerMode}
          onTripleClick={handleTripleClick}
        />

        <ProjectsGrid
          isMobile={isMobile}
          touchedProject={touchedProject}
          setTouchedProject={setTouchedProject}
        />

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-6 text-gray-500">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gray-500" />
            <span className="text-sm tracking-wider">2024</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}