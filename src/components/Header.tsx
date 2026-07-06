import { TAGLINE } from "@/data/constants";

export const Header = () => {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <h1 className="hero-name font-bungee mb-4 text-5xl sm:text-6xl md:text-7xl">
        <span className="hero-name-word is-first">Thomas</span>
        <span className="hero-name-word is-last">Basquin</span>
      </h1>
      <p className="text-xl font-light tracking-wide text-gray-400">{TAGLINE}</p>
      <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
    </div>
  );
};
