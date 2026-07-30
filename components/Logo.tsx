export default function Logo({
  className = "",
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  const ink = invert ? "#ffffff" : "#202124";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <linearGradient id="aurum-mark" x1="4" y1="2" x2="30" y2="32">
            <stop stopColor="#2563EB" />
            <stop offset="0.55" stopColor="#4FAE92" />
            <stop offset="1" stopColor="#D8BE8A" />
          </linearGradient>
        </defs>
        {/* stylised tooth silhouette built from two arcs */}
        <path
          d="M17 4.2c3.1-2 6.6-2.4 9-.6 2.6 2 3.4 5.7 2.7 9.6-.5 2.9-1.6 5.1-2.3 8-.6 2.6-.8 5.6-1.7 7.8-.8 2-2.3 3.3-3.7 2.7-1.5-.6-1.9-3-2.3-5.6-.3-1.9-.6-3.6-1.7-3.6s-1.4 1.7-1.7 3.6c-.4 2.6-.8 5-2.3 5.6-1.4.6-2.9-.7-3.7-2.7-.9-2.2-1.1-5.2-1.7-7.8-.7-2.9-1.8-5.1-2.3-8C4.6 9.3 5.4 5.6 8 3.6c2.4-1.8 5.9-1.4 9 .6Z"
          fill="url(#aurum-mark)"
          fillOpacity="0.16"
          stroke="url(#aurum-mark)"
          strokeWidth="1.4"
        />
        <circle cx="17" cy="12.5" r="2.1" fill="url(#aurum-mark)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-[1.24rem] font-bold tracking-[0.2em]"
          style={{ color: ink, fontFamily: "var(--font-display)" }}
        >
          AURUM
        </span>
        <span
          className="mt-[3px] text-[0.5rem] font-medium tracking-[0.24em] uppercase"
          style={{ color: invert ? "rgba(255,255,255,0.55)" : "#6b7280" }}
        >
          Dental Clinic
        </span>
      </span>
    </span>
  );
}
