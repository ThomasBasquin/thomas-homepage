import { TAGLINE } from "@/data/constants";

export const Header = () => {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <h1 className="neon-title mb-4 text-7xl font-bold text-white transition-all duration-500">
        Thomas
      </h1>
      <p className="text-xl font-light tracking-wide text-gray-400">{TAGLINE}</p>
      <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
    </div>
  );
};
