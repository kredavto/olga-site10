"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A soft light that follows the pointer and swells over interactive
 * elements. Pointer-only: hidden on touch devices and with reduced motion.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const interactive = (e.target as HTMLElement)?.closest?.(
        "a, button, input, select, textarea, [data-cursor]"
      );
      ringRef.current?.style.setProperty(
        "--ring-scale",
        interactive ? "2.4" : "1"
      );
      ringRef.current?.style.setProperty(
        "--ring-alpha",
        interactive ? "0.9" : "0.35"
      );
    };

    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      if (ref.current)
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%) scale(var(--ring-scale,1))`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      <div
        ref={ref}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 520,
          height: 520,
          marginLeft: -260,
          marginTop: -260,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.09), rgba(37,99,235,0) 62%)",
          filter: "blur(6px)",
        }}
      />
      <div
        ref={ringRef}
        className="absolute rounded-full transition-[width,height] duration-300"
        style={{
          width: 12,
          height: 12,
          border: "1px solid rgba(37,99,235,var(--ring-alpha,0.35))",
          transition: "transform 0.08s linear",
        }}
      />
    </div>
  );
}
