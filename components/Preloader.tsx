"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  delay: number;
};

/**
 * Loading sequence:
 *   1. thousands of glowing particles converge into the AURUM wordmark
 *   2. a medical scan line sweeps the assembled logo
 *   3. the curtain splits and the page is revealed
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"assemble" | "scan" | "done">("assemble");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Returning visitors within the same tab session skip the full sequence.
    if (typeof window !== "undefined" && sessionStorage.getItem("aurum-loaded")) {
      setPhase("done");
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = setTimeout(() => setPhase("done"), 400);
      return () => clearTimeout(t);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    // --- sample the wordmark into target points -------------------------
    const off = document.createElement("canvas");
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;
    off.width = w;
    off.height = h;

    const fontSize = Math.min(w * 0.16, 190);
    octx.fillStyle = "#fff";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.font = `700 ${fontSize}px Manrope, Inter, system-ui, sans-serif`;
    octx.letterSpacing = `${fontSize * 0.06}px`;
    octx.fillText("AURUM", w / 2, h / 2);

    const img = octx.getImageData(0, 0, w, h).data;
    const step = w < 640 ? 4 : 3;
    const targets: { x: number; y: number }[] = [];
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        if (img[(y * w + x) * 4 + 3] > 128) targets.push({ x, y });
      }
    }

    const max = 4200;
    const picked =
      targets.length > max
        ? targets.filter((_, i) => i % Math.ceil(targets.length / max) === 0)
        : targets;

    const particles: Particle[] = picked.map((t) => {
      const a = Math.random() * Math.PI * 2;
      const d = 380 + Math.random() * 620;
      return {
        x: w / 2 + Math.cos(a) * d,
        y: h / 2 + Math.sin(a) * d * 0.6,
        tx: t.x,
        ty: t.y,
        vx: 0,
        vy: 0,
        r: 0.6 + Math.random() * 1.3,
        hue: Math.random() > 0.82 ? 42 : 219,
        delay: Math.random() * 0.28,
      };
    });

    const start = performance.now();
    let scanTriggered = false;

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      let settled = 0;
      for (const p of particles) {
        if (t > p.delay) {
          const k = 0.055;
          p.vx += (p.tx - p.x) * k;
          p.vy += (p.ty - p.y) * k;
          p.vx *= 0.82;
          p.vy *= 0.82;
          p.x += p.vx;
          p.y += p.vy;
        }
        const dist = Math.hypot(p.tx - p.x, p.ty - p.y);
        if (dist < 1.2) settled++;

        const glow = Math.min(1, 0.25 + (1 - Math.min(dist / 260, 1)));
        ctx.fillStyle =
          p.hue === 42
            ? `rgba(216,190,138,${glow})`
            : `rgba(${96 - glow * 40},${144 + glow * 20},${250},${glow})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!scanTriggered && (settled / particles.length > 0.94 || t > 2.4)) {
        scanTriggered = true;
        setPhase("scan");
        setTimeout(() => {
          sessionStorage.setItem("aurum-loaded", "1");
          setPhase("done");
        }, 1150);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          {/* curtain — splits on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0f1c]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0f1c]"
            exit={{ y: "100%" }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="absolute inset-0">
            <div className="med-grid opacity-[0.35]" />
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* medical scan sweep */}
            <AnimatePresence>
              {phase === "scan" && (
                <motion.div
                  className="pointer-events-none absolute inset-x-0 h-40"
                  initial={{ top: "-20%", opacity: 0 }}
                  animate={{ top: "110%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(96,144,250,0.28) 45%, rgba(216,190,138,0.5) 50%, rgba(96,144,250,0.28) 55%, transparent)",
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          <motion.p
            className="t-eyebrow absolute inset-x-0 bottom-[14vh] text-center text-white/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {phase === "scan" ? "Система готова" : "Стоматология будущего"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
