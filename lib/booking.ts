export const BOOKING_EVENT = "aurum:booking";

export type BookingIntent = {
  /** Pre-selects the service in the form */
  service?: string;
  /** Changes the modal headline to match the CTA that opened it */
  title?: string;
  subtitle?: string;
};

/** Opens the booking modal from anywhere in the tree. */
export function openBooking(intent: BookingIntent = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail: intent }));
}

/** +7 (999) 123-45-67 */
export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (!digits) return "";
  const d = digits.startsWith("7") ? digits : `7${digits}`.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += ` (${p.slice(0, 3)}`;
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += ` ${p.slice(3, 6)}`;
  if (p.length > 6) out += `-${p.slice(6, 8)}`;
  if (p.length > 8) out += `-${p.slice(8, 10)}`;
  return out;
}

export function isPhoneComplete(raw: string) {
  return raw.replace(/\D/g, "").length === 11;
}

export const rub = (n: number) =>
  `${n.toLocaleString("ru-RU")} ₽`;
