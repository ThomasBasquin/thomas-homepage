import { useState, useEffect, useRef, useCallback } from "react";
import { KONAMI_CODE } from "@/data/constants";

export const useEasterEggs = () => {
  const [showEasterEggInfo, setShowEasterEggInfo] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  const [duckMode, setDuckMode] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [typedSequence, setTypedSequence] = useState("");
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTripleClick = useCallback(() => {
    clickCount.current += 1;
    
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }
    
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 500);

    if (clickCount.current === 3) {
      setShowEasterEggInfo(true);
      clickCount.current = 0;
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    console.log("Key pressed:", e.key, e.code);
    
    // Konami code detection
    const newSequence = [...konamiSequence, e.code].slice(-8);
    setKonamiSequence(newSequence);
    
    if (
      newSequence.length === 8 &&
      newSequence.every((key, index) => key === KONAMI_CODE[index])
    ) {
      console.log("Konami activated!");
      setHackerMode(!hackerMode);
      setKonamiSequence([]);
    }

    // Duck mode detection
    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      const newTyped = (typedSequence + e.key.toLowerCase()).slice(-4);
      setTypedSequence(newTyped);
      console.log("Typed sequence:", newTyped);
      
      if (newTyped === "coin") {
        console.log("Duck mode activated!");
        setDuckMode(!duckMode);
        setTypedSequence("");
      }
    }
  }, [konamiSequence, typedSequence, hackerMode, duckMode]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    showEasterEggInfo,
    setShowEasterEggInfo,
    hackerMode,
    duckMode,
    handleTripleClick,
  };
};