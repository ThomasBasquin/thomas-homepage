interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal = ({ isOpen, onClose }: EasterEggModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="glass-card max-w-2xl w-full p-8 rounded-3xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            🎮 Easter Eggs
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        <div className="space-y-4 text-gray-300">
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              🖱️ Triple-click sur &quot;Thomas&quot;
            </h3>
            <p className="text-sm">
              Affiche cette fenêtre d&apos;aide des easter eggs
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              ⌨️ Konami Code
            </h3>
            <p className="text-sm">
              ↑↑↓↓←→←→ Active le mode hacker avec lignes de code Matrix
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">
              🦆 Tape &quot;coin&quot;
            </h3>
            <p className="text-sm">
              Fait apparaître un canard qui se balade et saute entre les cartes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};