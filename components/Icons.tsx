const common = {
  width: 26,
  height: 26,
  viewBox: "0 0 26 26",
  fill: "none",
  strokeWidth: 1.4,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const paths: Record<string, React.ReactNode> = {
  shield: (
    <>
      <path d="M13 2.5l8 3v6.6c0 5-3.3 9.5-8 11.4-4.7-1.9-8-6.4-8-11.4V5.5l8-3Z" />
      <path d="M9.5 12.8l2.4 2.4 4.6-4.8" />
    </>
  ),
  microscope: (
    <>
      <path d="M10 4.5h4l1.5 8h-7l1.5-8Z" />
      <path d="M8.5 12.5h9" />
      <path d="M13 16.5a5 5 0 01-5 5" />
      <path d="M5 21.5h16" />
      <path d="M17 12.5a6 6 0 01-4 9" />
    </>
  ),
  scan: (
    <>
      <path d="M3 8V4.5A1.5 1.5 0 014.5 3H8M18 3h3.5A1.5 1.5 0 0123 4.5V8M23 18v3.5a1.5 1.5 0 01-1.5 1.5H18M8 23H4.5A1.5 1.5 0 013 21.5V18" />
      <path d="M3 13h20" />
      <circle cx="13" cy="13" r="3.6" opacity="0.45" />
    </>
  ),
  cube: (
    <>
      <path d="M13 2.8l9 5v10.4l-9 5-9-5V7.8l9-5Z" />
      <path d="M4 7.8l9 5 9-5M13 12.8V23" />
    </>
  ),
  lab: (
    <>
      <path d="M10 2.8v7L4.6 19a2.4 2.4 0 002.1 3.6h12.6a2.4 2.4 0 002.1-3.6L16 9.8v-7" />
      <path d="M8.6 2.8h8.8" />
      <path d="M7.6 15.5h10.8" />
    </>
  ),
  certificate: (
    <>
      <circle cx="13" cy="10" r="6.5" />
      <path d="M9.4 15.6L8 23l5-2.4L18 23l-1.4-7.4" />
      <path d="M10.6 10l1.8 1.8 3.4-3.6" />
    </>
  ),
  plan: (
    <>
      <path d="M6 3.5h10l4.5 4.5v14a1 1 0 01-1 1H6a1 1 0 01-1-1v-17a1 1 0 011-1Z" />
      <path d="M15.5 3.5V8.5H20.5" />
      <path d="M9 13h8M9 17h5" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 8.5A2.5 2.5 0 015.5 6h15A1.5 1.5 0 0122 7.5v11a1.5 1.5 0 01-1.5 1.5h-15A2.5 2.5 0 013 17.5v-9Z" />
      <path d="M3 8.5c0 1.4 1.1 2.5 2.5 2.5H22" />
      <circle cx="17.5" cy="15" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  warranty: (
    <>
      <path d="M13 2.5l8 3v6.6c0 5-3.3 9.5-8 11.4-4.7-1.9-8-6.4-8-11.4V5.5l8-3Z" />
      <path d="M13 8.5v5.5M13 17.2v.4" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="12" height="12" rx="2.4" />
      <path d="M11 3v4M15 3v4M11 19v4M15 19v4M3 11h4M3 15h4M19 11h4M19 15h4" />
    </>
  ),
  tooth: (
    <>
      <path d="M13 5.5c2.3-1.6 4.9-1.9 6.6-.5 1.9 1.5 2.5 4.3 2 7.2-.4 2.2-1.2 3.8-1.7 6-.4 2-.6 4.2-1.3 5.8-.6 1.5-1.7 2.5-2.7 2-1.1-.5-1.4-2.3-1.7-4.2-.2-1.4-.5-2.7-1.2-2.7s-1 1.3-1.2 2.7c-.3 1.9-.6 3.7-1.7 4.2-1 .5-2.1-.5-2.7-2-.7-1.6-.9-3.8-1.3-5.8-.5-2.2-1.3-3.8-1.7-6-.5-2.9.1-5.7 2-7.2 1.7-1.4 4.3-1.1 6.6.5Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="13" cy="13" r="9.5" />
      <path d="M13 7.5V13l3.5 2.2" />
    </>
  ),
};

export default function Icon({
  name,
  className,
  size = 26,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  return (
    <svg {...common} width={size} height={size} className={className} aria-hidden>
      {paths[name] ?? paths.tooth}
    </svg>
  );
}
