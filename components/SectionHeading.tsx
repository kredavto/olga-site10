import { Reveal, SplitText } from "./motion";
import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  aside,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  aside?: ReactNode;
  invert?: boolean;
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-8 ${
        centered
          ? "items-center text-center"
          : aside
            ? "lg:flex-row lg:items-end lg:justify-between"
            : ""
      }`}
    >
      <div className={centered ? "max-w-3xl" : "max-w-2xl"}>
        {eyebrow && (
          <Reveal>
            <p
              className={`t-eyebrow mb-5 ${
                invert ? "text-white/45" : "text-royal-800"
              }`}
            >
              {eyebrow}
            </p>
          </Reveal>
        )}
        <SplitText
          as="h2"
          text={title}
          className={`t-h2 font-bold ${invert ? "text-white" : ""}`}
          stagger={0.016}
        />
        {text && (
          <Reveal delay={0.12}>
            <p
              className={`t-lead mt-6 ${
                invert ? "text-white/65" : "text-slate"
              }`}
            >
              {text}
            </p>
          </Reveal>
        )}
      </div>
      {aside && <Reveal delay={0.2}>{aside}</Reveal>}
    </div>
  );
}
