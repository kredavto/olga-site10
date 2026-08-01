"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/lib/services";
import { formatPhone, isPhoneComplete } from "@/lib/booking";

type Errors = { name?: string; phone?: string; agree?: string };

export default function BookingForm({
  defaultService,
  compact = false,
  onDone,
  submitLabel = "Получить консультацию",
}: {
  defaultService?: string;
  compact?: boolean;
  onDone?: () => void;
  submitLabel?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService ?? "");
  const [slot, setSlot] = useState("");
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const validate = (next?: Partial<Record<string, string>>) => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Введите имя — как к вам обращаться";
    if (!isPhoneComplete(phone)) e.phone = "Нужен полный номер: +7 (___) ___-__-__";
    if (!agree) e.agree = "Без согласия мы не можем вам перезвонить";
    setErrors({ ...e, ...next });
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setTouched({ name: true, phone: true, agree: true });
    if (!validate()) return;
    setState("sending");
    // Demo submit. Wire to the clinic's CRM / API route before launch.
    await new Promise((r) => setTimeout(r, 900));
    setState("sent");
    onDone?.();
  };

  if (state === "sent") return <Success name={name} />;

  return (
    <form onSubmit={submit} noValidate className="space-y-3.5">
      <div className="field" data-invalid={touched.name && !!errors.name}>
        <input
          id="bf-name"
          value={name}
          placeholder=" "
          autoComplete="name"
          onChange={(e) => {
            setName(e.target.value);
            if (touched.name) validate();
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, name: true }));
            validate();
          }}
        />
        <label htmlFor="bf-name">Ваше имя</label>
        <FieldError show={!!touched.name && !!errors.name} msg={errors.name} />
      </div>

      <div className="field" data-invalid={touched.phone && !!errors.phone}>
        <input
          id="bf-phone"
          value={phone}
          placeholder=" "
          inputMode="tel"
          autoComplete="tel"
          onChange={(e) => {
            setPhone(formatPhone(e.target.value));
            if (touched.phone) validate();
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, phone: true }));
            validate();
          }}
        />
        <label htmlFor="bf-phone">Телефон</label>
        <FieldError show={!!touched.phone && !!errors.phone} msg={errors.phone} />
      </div>

      {!compact && (
        <div className="field">
          <select
            id="bf-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="" disabled hidden />
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.nav}
              </option>
            ))}
            <option value="other">Другое / не знаю</option>
          </select>
          <label htmlFor="bf-service">Направление</label>
        </div>
      )}

      <div className="field">
        <select
          id="bf-slot"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
        >
          <option value="" disabled hidden />
          <option value="asap">Как можно скорее</option>
          <option value="morning">Утром, 9:00–12:00</option>
          <option value="day">Днём, 12:00–17:00</option>
          <option value="evening">Вечером, 17:00–21:00</option>
        </select>
        <label htmlFor="bf-slot">Удобное время звонка</label>
      </div>

      <label className="flex cursor-pointer items-start gap-3 pt-1 text-[0.84rem] leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
            if (touched.agree) validate();
          }}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-royal-600)]"
        />
        <span>
          Согласен на обработку персональных данных и с{" "}
          <a href="/privacy" className="text-royal-800 underline underline-offset-2">
            политикой конфиденциальности
          </a>
        </span>
      </label>
      <FieldError show={!!touched.agree && !!errors.agree} msg={errors.agree} />

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn btn-primary w-full disabled:opacity-70"
      >
        {state === "sending" ? "Отправляем…" : submitLabel}
      </button>

      <p className="text-center text-[0.8rem] text-muted">
        Перезваниваем в течение 12 минут в рабочее время
      </p>
    </form>
  );
}

function FieldError({ show, msg }: { show: boolean; msg?: string }) {
  return (
    <AnimatePresence>
      {show && msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 pl-1 text-[0.8rem] text-[#c25555]"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Success({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="py-6 text-center"
    >
      <div className="relative mx-auto mb-6 h-20 w-20">
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-soft/25"
          animate={{ scale: [0.85, 1.9], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-soft/12">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#4FAE92"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <motion.path
              d="M12 20.5l5.5 5.5L28 15"
              stroke="#4FAE92"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </div>
      </div>
      <h3 className="t-h4 font-bold">
        {name ? `${name}, заявка принята` : "Заявка принята"}
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-[0.98rem] leading-relaxed text-slate">
        Координатор позвонит в выбранное время, подберёт врача и подтвердит запись.
        В рабочие часы это занимает около 12 минут.
      </p>
    </motion.div>
  );
}
