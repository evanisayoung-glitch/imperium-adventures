export function MountainBackdrop({
  className = "",
  interactive = false,
  calm = false,
}: {
  className?: string;
  interactive?: boolean;
  calm?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      data-interactive={interactive ? "true" : undefined}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(45,106,79,0.35),_transparent_55%),linear-gradient(180deg,#0f2a1f_0%,#1b4332_42%,#243f33_70%,#efe8d8_100%)]" />
      <svg
        className="absolute inset-x-0 bottom-0 h-[72%] w-full"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="peakFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d6a4f" />
            <stop offset="100%" stopColor="#0f2a1f" />
          </linearGradient>
          <linearGradient id="farFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d7a5f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1b4332" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g className={calm ? "opacity-40" : "mist-layer opacity-40"}>
          <ellipse cx="280" cy="250" rx="220" ry="48" fill="#f7f4ec" opacity="0.18" />
          <ellipse cx="980" cy="210" rx="280" ry="56" fill="#f7f4ec" opacity="0.14" />
        </g>
        <path
          d="M0 520 L180 360 L290 430 L420 280 L560 410 L700 250 L860 390 L980 300 L1140 430 L1280 340 L1440 470 L1440 720 L0 720 Z"
          fill="url(#farFill)"
        />
        <path
          d="M0 580 L220 420 L340 500 L480 340 L640 470 L790 310 L960 460 L1120 370 L1300 490 L1440 430 L1440 720 L0 720 Z"
          fill="url(#peakFill)"
        />
        <path
          d="M700 250 L724 292 L700 284 L676 298 Z"
          fill="#f7f4ec"
          opacity="0.85"
          className={calm ? undefined : "gold-pulse"}
        />
        <g fill="#0f2a1f" opacity="0.9">
          <path d="M180 580 L210 510 L240 580 Z" />
          <path d="M240 580 L275 490 L310 580 Z" />
          <path d="M1080 560 L1115 470 L1150 560 Z" />
          <path d="M1140 560 L1170 500 L1200 560 Z" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-field" />
    </div>
  );
}
