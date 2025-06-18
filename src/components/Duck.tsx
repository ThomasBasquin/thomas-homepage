import { useState, useEffect } from "react";
import { DUCK_POSITIONS } from "@/data/constants";

interface DuckProps {
  isActive: boolean;
}

export const Duck = ({ isActive }: DuckProps) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setIsJumping(true);
        
        setTimeout(() => {
          setCurrentPosition((prev) => (prev + 1) % DUCK_POSITIONS.length);
          setIsJumping(false);
        }, 300);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  const position = DUCK_POSITIONS[currentPosition];

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-all duration-500 ease-in-out ${
        isJumping ? "transform scale-110 -translate-y-4" : ""
      }`}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div 
        className={`text-4xl ${
          isJumping 
            ? "animate-bounce" 
            : "animate-pulse"
        }`}
        style={{
          animation: isJumping 
            ? "duck-jump 0.6s ease-in-out" 
            : "duck-waddle 2s ease-in-out infinite"
        }}
      >
        🦆
      </div>
      {/* Petite ombre */}
      <div 
        className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm transition-all duration-300 ${
          isJumping ? "scale-125 opacity-30" : "opacity-20"
        }`} 
      />
      
      {/* Effet de saut avec particules */}
      {isJumping && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="text-yellow-400 text-xs animate-ping">✨</div>
        </div>
      )}
    </div>
  );
};