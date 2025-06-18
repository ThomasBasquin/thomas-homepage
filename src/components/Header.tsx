import { FULL_TEXT } from "@/data/constants";

interface HeaderProps {
  typedText: string;
  scrollY: number;
  hackerMode: boolean;
  onTripleClick: () => void;
}

export const Header = ({ typedText, scrollY, hackerMode, onTripleClick }: HeaderProps) => {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <h1
        className={`text-7xl font-bold mb-4 cursor-pointer select-none transition-all duration-500 ${
          hackerMode
            ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent"
            : "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent"
        }`}
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: "transform 0.1s ease-out",
        }}
        onClick={onTripleClick}
      >
        Thomas
      </h1>
      <p className="text-xl text-gray-400 font-light tracking-wide min-h-[28px]">
        {typedText}
        {typedText.length < FULL_TEXT.length && (
          <span className="typing-cursor">|</span>
        )}
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full" />
    </div>
  );
};