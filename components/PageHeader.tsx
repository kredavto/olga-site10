import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { Reveal, SplitText } from "./motion";
import type { ReactNode } from "react";

export default function PageHeader({
  trail,
  eyebrow,
  title,
  lead,
  metrics,
  actions,
  children,
}: {
  trail: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  metrics?: { value: string; label: string }[];
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 lg:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-pearl to-white" />
      <div className="mesh" />
      <div className="med-grid opacity-70" />

      <div className="relative">
        <Breadcrumbs trail={trail} />

        <div className="shell mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            {eyebrow && (
              <Reveal>
                <p className="t-eyebrow mb-5 text-royal-700">{eyebrow}</p>
              </Reveal>
            )}
            <SplitText
              as="h1"
              text={title}
              className="t-h1 font-bold"
              stagger={0.014}
            />
            {lead && (
              <Reveal delay={0.15}>
                <p className="t-lead mt-7 max-w-2xl text-slate">{lead}</p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.25}>
                <div className="mt-9 flex flex-wrap items-center gap-3.5">
                  {actions}
                </div>
              </Reveal>
            )}
          </div>

          {metrics && (
            <Reveal delay={0.2}>
              <dl className="glass hairline grid grid-cols-2 gap-x-6 gap-y-7 rounded-[28px] p-7">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="block text-[1.55rem] font-bold tracking-tight">
                        {m.value}
                      </span>
                      <span className="mt-1.5 block text-[0.84rem] leading-snug text-muted">
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
