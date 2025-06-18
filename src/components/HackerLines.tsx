import { HackerLine } from "@/types";

interface HackerLinesProps {
  lines: HackerLine[];
  isActive: boolean;
}

export const HackerLines = ({ lines, isActive }: HackerLinesProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute text-green-400 font-mono text-sm hacker-line whitespace-nowrap"
          style={{
            left: `${line.left}%`,
            top: `${line.top}px`,
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
};