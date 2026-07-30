"use client";

import type { ReactNode } from "react";
import { openBooking } from "@/lib/booking";
import { Magnetic } from "./motion";

/** Server-page-friendly wrapper that opens the booking modal. */
export default function BookCta({
  children,
  service,
  title,
  subtitle,
  className = "btn btn-primary",
  magnetic = true,
}: {
  children: ReactNode;
  service?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  magnetic?: boolean;
}) {
  const button = (
    <button
      className={className}
      onClick={() => openBooking({ service, title, subtitle })}
    >
      {children}
    </button>
  );
  return magnetic ? <Magnetic strength={0.22}>{button}</Magnetic> : button;
}
