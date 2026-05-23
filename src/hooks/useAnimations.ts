import { useState, useEffect, useRef, useCallback } from "react";
import { Particle } from "@/types";
import { FULL_TEXT } from "@/data/constants";

export const useAnimations = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [touchedProject, setTouchedProject] = useState<number | null>(null);
  const lastUpdate = useRef(0);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isMobile) {
      const now = Date.now();
      if (now - lastUpdate.current > 16) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastUpdate.current = now;
      }
    }
  }, [isMobile]);

  const generateParticles = useCallback(() => {
    const particleCount = isMobile ? 20 : 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }));
    setParticles(newParticles);
  }, [isMobile]);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Typing effect
  useEffect(() => {
    if (typedText.length < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setTypedText(FULL_TEXT.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Setup event listeners
  useEffect(() => {
    checkMobile();
    generateParticles();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, generateParticles, handleMouseMove, checkMobile, handleScroll]);

  return {
    mousePosition,
    particles,
    isMobile,
    scrollY,
    typedText,
    touchedProject,
    setTouchedProject,
  };
};
