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

/**
 * Overlay that makes the tooth in the hero photograph turn on the spot and
 * puts a ring of faint stars on its outline.
 *
 * It renders in two passes because the two halves belong on opposite sides of
 * the hero's scrims: `photo` is the rotating copy of the shot and has to be
 * dimmed by them exactly like the still frame underneath, while `marks` (the
 * glow and the stars) belongs on top of them. Both passes run the same
 * animation and mount together, so they stay in phase.
 */
export default function HeroTooth({
  layer = "marks",
}: {
  layer?: "photo" | "marks";
}) {
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
        r: 0.35 + Math.random() * 0.85,
        delay: Math.random() * 5,
        dur: 2.8 + Math.random() * 3.4,
      });
    }
    setStars(out);
  }, []);

  const frame = useMemo(
    () => ({ width: box.w || undefined, height: box.h || undefined }),
    [box]
  );

  /** Feathered disc around the tooth, in the frame's own pixels. A circle
   *  centred on the axis is invariant under the rotation, so the masked copy
   *  never slides out from under its own edge. */
  const disc = useMemo(() => {
    const r = box.h * 0.4;
    if (!r) return undefined;
    return `radial-gradient(circle ${r}px at ${box.w * TOOTH.cx}px ${
      box.h * TOOTH.cy
    }px, #000 0 ${r * 0.62}px, transparent ${r}px)`;
  }, [box]);

  const spin = {
    transformOrigin: `${TOOTH.cx * 100}% ${TOOTH.cy * 100}%`,
  };

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
        style={frame}
      >
        {layer === "photo" ? (
          <div className="spin-slow absolute inset-0" style={spin}>
            {box.h > 0 && (
              <img
                src="/media/hero-bg.jpeg"
                alt=""
                className="h-full w-full"
                style={{ maskImage: disc, WebkitMaskImage: disc }}
              />
            )}
          </div>
        ) : (
          <>
            {/* soft light coming off the tooth */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[42px]"
              style={{
                left: `${TOOTH.cx * 100}%`,
                top: `${TOOTH.cy * 100}%`,
                width: `${TOOTH.w * 260}%`,
                height: `${TOOTH.h * 175}%`,
                background:
                  "radial-gradient(closest-side, rgba(125,196,255,0.3), rgba(80,150,240,0.13) 52%, transparent 76%)",
              }}
            />

            {/* the outline has to travel with the tooth it traces */}
            <div className="spin-slow absolute inset-0" style={spin}>
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
                {/* measured, never painted */}
                <path ref={pathRef} d={TOOTH_D} stroke="none" fill="none" />

                <path
                  d={TOOTH_D}
                  stroke="rgba(170,215,255,0.14)"
                  strokeWidth="0.7"
                  vectorEffect="non-scaling-stroke"
                />

                {/* The viewBox is stretched to the tooth's proportions, so the
                    dots are drawn as ellipses that come out round on screen. */}
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
          </>
        )}
      </div>
    </div>
  );
}
