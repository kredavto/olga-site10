"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { openBooking } from "@/lib/booking";

/** Sticky bottom action bar on phones + a floating call button on desktop. */
export default function MobileDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 bottom-0 z-[110] lg:hidden"
        initial={{ y: 120 }}
        animate={{ y: show ? 0 : 120 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass mx-3 mb-3 grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 rounded-[22px] p-2">
          <button
            onClick={() => openBooking({})}
            className="btn btn-primary !py-3.5 text-[0.95rem]"
          >
            Записаться
          </button>
          <DockIcon href={`tel:${site.phoneHref}`} label="Позвонить">
            <path
              d="M4.5 3.5h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3c0 .8-.7 1.5-1.5 1.4C9.4 17.9 3.1 11.6 3.1 5c0-.8.6-1.5 1.4-1.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </DockIcon>
          <DockIcon href={site.whatsapp} label="WhatsApp" external>
            <path
              d="M3.5 16.5l1-3.4a6.5 6.5 0 112.6 2.5l-3.6.9Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M7.8 8.2c.4 2 2 3.6 4 4l.9-1.2 1.6.7-.2 1.4c-2.6.5-5.9-2.5-6-5.2l1.4-.4.8 1.6-.5.9" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </DockIcon>
          <DockIcon href={site.telegram} label="Telegram" external>
            <path
              d="M17.5 4.5L2.8 10.2l4 1.3 1.5 4.6 2.3-2.7 4 3 2.9-11.9Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </DockIcon>
        </div>
      </motion.div>

      <AnimatePresence>
        {show && (
          <motion.a
            href={`tel:${site.phoneHref}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group fixed bottom-8 right-8 z-[110] hidden h-16 w-16 items-center justify-center rounded-full bg-royal-600 text-white shadow-[0_20px_50px_-16px_rgba(37,99,235,0.7)] lg:flex"
            aria-label={`Позвонить ${site.phone}`}
          >
            <span className="absolute inset-0 animate-[pulse-ring_2.6s_ease-out_infinite] rounded-full border border-royal-400" />
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M4.5 3.5h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3c0 .8-.7 1.5-1.5 1.4C9.4 17.9 3.1 11.6 3.1 5c0-.8.6-1.5 1.4-1.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}

function DockIcon({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-line bg-white/80 text-royal-700 transition-colors active:bg-royal-50"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        {children}
      </svg>
    </a>
  );
}
