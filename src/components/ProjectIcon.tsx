import { ReactNode } from "react";
import { ProjectIconName } from "@/types";

interface IconDef {
  from: string;
  to: string;
  paths: ReactNode;
}

const ICONS: Record<ProjectIconName, IconDef> = {
  shelf: {
    from: "#34d399",
    to: "#22c55e",
    paths: (
      <>
        <rect x="4.2" y="5.3" width="3.2" height="12.5" rx="0.8" />
        <rect x="9.4" y="6.8" width="3" height="11" rx="0.8" />
        <rect
          x="14.3"
          y="5.9"
          width="3.2"
          height="11.9"
          rx="0.8"
          transform="rotate(14 15.9 11.85)"
        />
        <path d="M3 19.6h18" />
      </>
    ),
  },
  bone: {
    from: "#2dd4bf",
    to: "#38bdf8",
    paths: (
      <path
        d="M9.4 10.9 14.6 10.9 A2.1 2.1 0 1 1 18.2 12 A2.1 2.1 0 1 1 14.6 13.1 L9.4 13.1 A2.1 2.1 0 1 1 5.8 12 A2.1 2.1 0 1 1 9.4 10.9 Z"
        transform="rotate(-45 12 12)"
      />
    ),
  },
  quiz: {
    from: "#fbbf24",
    to: "#f97316",
    paths: (
      <>
        <path d="M8 8.8a4 4 0 0 1 7.8 1.3c0 2.6-3.9 3.4-3.9 5.4v.4" />
        <circle cx="11.9" cy="19.6" r="0.3" />
      </>
    ),
  },
  clap: {
    from: "#c084fc",
    to: "#f472b6",
    paths: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M3.5 9.5h17" />
        <path d="M8.5 5 6.8 9.5" />
        <path d="M13.5 5l-1.7 4.5" />
        <path d="M18.5 5l-1.7 4.5" />
      </>
    ),
  },
  pokeball: {
    from: "#ef4444",
    to: "#f43f5e",
    paths: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h4.6" />
        <path d="M15.9 12h4.6" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
};

interface ProjectIconProps {
  name: ProjectIconName;
  className?: string;
}

export const ProjectIcon = ({ name, className }: ProjectIconProps) => {
  const { from, to, paths } = ICONS[name];
  const gradientId = `icon-gradient-${name}`;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ "--icon-glow": `${from}99` } as React.CSSProperties}
      className={`[filter:drop-shadow(0_0_0px_var(--icon-glow))] group-hover:[filter:drop-shadow(0_0_10px_var(--icon-glow))] transition-[filter] duration-500 ${
        className ?? ""
      }`}>
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      {paths}
    </svg>
  );
};
