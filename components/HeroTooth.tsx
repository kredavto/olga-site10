"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/** Aspect ratio of /media/hero-bg.jpeg — used to mirror `object-fit: cover` */
const IMG_AR = 735 / 413;

/** Where the tooth sits inside that photograph, as a share of the frame.
 *  Measured off the file: the luminous core spans x 293–465, y 85–320 of
 *  735×413. */
const TOOTH = { cx: 0.516, cy: 0.49, w: 0.236, h: 0.572 };

/** Outline traced over the tooth in the shot: wide crown, two splayed roots */
const TOOTH_D =
  "M50 6C33 -1 12 6 9 28c-3 21 4 41 8 63 4 25 6 55 16 61 9 5 13-15 15-37 1-13 1-22 2-22s1 9 2 22c2 22 6 42 15 37 10-6 12-36 16-61 4-22 11-42 8-63C88 6 67 -1 50 6Z";

type Star = { x: number; y: number; r: number; delay: number; dur: number };

export default function HeroTooth() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [stars, setStars] = useState<Star[]>([]);

  // Mirror object-fit: cover in JS. The section can be taller than the
  // viewport on phones, so vh-based CSS maths would drift here.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      setBox({
        w: Math.max(r.width, r.height * IMG_AR),
        h: Math.max(r.height, r.width / IMG_AR),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scatter the stars along the outline once the path is in the DOM
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    const count = 110;
    const out: Star[] = [];
    for (let i = 0; i < count; i++) {
      // jitter each step so the ring never reads as a dotted stroke
      const at = ((i + (Math.random() - 0.5) * 0.75) / count) * len;
      const pt = p.getPointAtLength((at + len) % len);
      const push = 1 + (Math.random() - 0.35) * 0.05; // nudge off the line
      out.push({
        x: 50 + (pt.x - 50) * push,
        y: 80 + (pt.y - 80) * push,
        r: 0.5 + Math.random() * 1.35,
        delay: Math.random() * 5,
        dur: 2.8 + Math.random() * 3.4,
      });
    }
    setStars(out);
  }, []);

  const style = useMemo(
    () => ({ width: box.w || undefined, height: box.h || undefined }),
    [box]
  );

  return (
    // Below lg the crop blows the tooth up past the viewport: the outline
    // stops reading as a tooth and the stars land on the headline.
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={style}
      >
        {/* soft light coming off the tooth */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[42px]"
          style={{
            left: `${TOOTH.cx * 100}%`,
            top: `${TOOTH.cy * 100}%`,
            width: `${TOOTH.w * 260}%`,
            height: `${TOOTH.h * 175}%`,
            background:
              "radial-gradient(closest-side, rgba(125,196,255,0.38), rgba(80,150,240,0.16) 52%, transparent 76%)",
          }}
        />

        <svg
          className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible"
          style={{
            left: `${TOOTH.cx * 100}%`,
            top: `${TOOTH.cy * 100}%`,
            width: `${TOOTH.w * 100}%`,
            height: `${TOOTH.h * 100}%`,
          }}
          viewBox="0 0 100 160"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <radialGradient id="tooth-core" cx="50%" cy="45%" r="62%">
              <stop offset="0%" stopColor="#bfe1ff" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#5aa6f5" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#5aa6f5" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* measured, never painted */}
          <path ref={pathRef} d={TOOTH_D} stroke="none" fill="none" />

          <path d={TOOTH_D} fill="url(#tooth-core)" />
          <path
            d={TOOTH_D}
            stroke="rgba(170,215,255,0.34)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />

          {/* The viewBox is stretched to the tooth's proportions, so the dots
              are drawn as ellipses that come out round on screen. */}
          {stars.map((s, i) => (
            <ellipse
              key={i}
              className="star"
              cx={s.x}
              cy={s.y}
              rx={s.r * 0.85}
              ry={s.r}
              fill={i % 7 === 0 ? "#ffffff" : "#9ed2ff"}
              style={
                {
                  "--delay": `${s.delay}s`,
                  "--dur": `${s.dur}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
