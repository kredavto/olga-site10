"use client";

import {
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ *
 * Reveal — blur + scale + fade as the element enters the viewport
 * ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 34,
  blur = 12,
  scale = 0.985,
  once = true,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  scale?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const reduced = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)`, scale }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/* ------------------------------------------------------------------ *
 * Stagger — parent/child orchestration
 * ------------------------------------------------------------------ */

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

export function Stagger({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * SplitText — per-character reveal with a rolling mask
 * ------------------------------------------------------------------ */

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.028,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  // The trigger lives on the wrapper, not on the characters: each character is
  // parked below an overflow-hidden mask, so it never intersects the viewport
  // on its own and would wait forever.
  const M = motion[Tag] as typeof motion.span;

  let index = 0;
  return (
    <M
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8%" }}
    >
      {words.map((word, w) => (
        <span
          key={`${word}-${w}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          {Array.from(word).map((ch, c) => {
            const i = index++;
            return (
              <motion.span
                key={`${ch}-${c}`}
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "108%", opacity: 0, rotate: 4 },
                  show: {
                    y: "0%",
                    opacity: 1,
                    rotate: 0,
                    transition: {
                      duration: 0.95,
                      ease: EASE,
                      delay: delay + i * stagger,
                    },
                  },
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </M>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic — element leans toward the cursor, springs back on leave
 * ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.34,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.5 });

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ *
 * TiltCard — 3D tilt with a cursor-tracked light
 * ------------------------------------------------------------------ */

export function TiltCard({
  children,
  className,
  intensity = 8,
  glow = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 180,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 180,
    damping: 20,
  });
  const [pos, setPos] = useState({ x: 50, y: 50 });

  if (reduced)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        mx.set(px);
        my.set(py);
        setPos({ x: px * 100, y: py * 100 });
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 [.group:hover_&]:opacity-100"
          style={{
            background: `radial-gradient(28rem 20rem at ${pos.x}% ${pos.y}%, rgba(37,99,235,0.13), transparent 62%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Counter — counts up once in view
 * ------------------------------------------------------------------ */

export function Counter({
  to,
  decimals = 0,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  const formatted = value.toLocaleString("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={`tnum ${className ?? ""}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * useMounted — guards browser-only rendering
 * ------------------------------------------------------------------ */

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export { motion, useAnimation, EASE };
