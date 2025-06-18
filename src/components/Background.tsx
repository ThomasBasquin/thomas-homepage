interface BackgroundProps {
  mousePosition: { x: number; y: number };
  particles: Array<{
    id: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
  }>;
}

export const Background = ({ mousePosition, particles }: BackgroundProps) => {
  return (
    <>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div
          className="fixed w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl transition-transform duration-300 ease-out pointer-events-none"
          style={{
            transform: `translate(${mousePosition.x - 192}px, ${
              mousePosition.y - 192
            }px)`,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};