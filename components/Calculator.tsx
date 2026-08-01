"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { openBooking, rub } from "@/lib/booking";

/* Base ranges per treatment type, in ₽ per unit. */
const treatments = {
  implant: {
    label: "Имплантация",
    unit: "зуб",
    max: 8,
    materials: [
      { id: "osstem", label: "Osstem, Ю. Корея", from: 55000, to: 72000 },
      { id: "straumann", label: "Straumann, Швейцария", from: 89000, to: 108000 },
      { id: "nobel", label: "Nobel Biocare, Швейцария", from: 96000, to: 120000 },
    ],
    crowns: [
      { id: "zircon", label: "Коронка из циркония", from: 0, to: 0 },
      { id: "emax", label: "Коронка E.max", from: 6000, to: 9000 },
    ],
  },
  veneer: {
    label: "Виниры",
    unit: "зуб",
    max: 12,
    materials: [
      { id: "emax", label: "Керамика E.max", from: 44000, to: 56000 },
      { id: "ultra", label: "Ультранир 0,3 мм", from: 52000, to: 62000 },
      { id: "hand", label: "Полевошпатная, ручная работа", from: 58000, to: 62000 },
    ],
    crowns: [
      { id: "none", label: "Без отбеливания", from: 0, to: 0 },
      { id: "zoom", label: "С отбеливанием ZOOM 4", from: 3500, to: 4200 },
    ],
  },
  crown: {
    label: "Коронки",
    unit: "зуб",
    max: 10,
    materials: [
      { id: "mk", label: "Металлокерамика", from: 32000, to: 38000 },
      { id: "zircon", label: "Диоксид циркония", from: 38000, to: 48000 },
      { id: "emax", label: "Керамика E.max", from: 42000, to: 54000 },
    ],
    crowns: [
      { id: "std", label: "Стандартная фиксация", from: 0, to: 0 },
      { id: "digital", label: "Цифровой слепок 3Shape", from: 4000, to: 5500 },
    ],
  },
  ortho: {
    label: "Исправление прикуса",
    unit: "челюсть",
    max: 2,
    materials: [
      { id: "metal", label: "Металлические брекеты", from: 47500, to: 67500 },
      { id: "ceramic", label: "Керамические брекеты", from: 72500, to: 92500 },
      { id: "aligner", label: "Элайнеры Invisalign", from: 95000, to: 195000 },
    ],
    crowns: [
      { id: "ret", label: "С ретенцией (входит)", from: 0, to: 0 },
      { id: "gnat", label: "С гнатологической диагностикой", from: 9000, to: 14000 },
    ],
  },
} as const;

type Key = keyof typeof treatments;

export default function Calculator() {
  const [type, setType] = useState<Key>("implant");
  const [material, setMaterial] = useState(0);
  const [extra, setExtra] = useState(0);
  const [count, setCount] = useState(1);
  const [bone, setBone] = useState(false);
  const [installments, setInstallments] = useState(12);

  const t = treatments[type];
  const mat = t.materials[Math.min(material, t.materials.length - 1)];
  const add = t.crowns[Math.min(extra, t.crowns.length - 1)];

  const { from, to } = useMemo(() => {
    let lo = (mat.from + add.from) * count;
    let hi = (mat.to + add.to) * count;
    if (bone && type === "implant") {
      lo += 28000 * Math.min(count, 4);
      hi += 65000 * Math.min(count, 4);
    }
    // volume discount from three units up
    if (count >= 3) {
      lo = Math.round(lo * 0.94);
      hi = Math.round(hi * 0.94);
    }
    return { from: lo, to: hi };
  }, [mat, add, count, bone, type]);

  const monthly = Math.round(from / installments / 100) * 100;

  const pick = (k: Key) => {
    setType(k);
    setMaterial(0);
    setExtra(0);
    setCount(1);
    setBone(false);
  };

  return (
    <div className="glass hairline relative overflow-hidden rounded-[30px] p-7 lg:p-10">
      <div className="mesh opacity-60" />

      <div className="relative">
        <p className="t-eyebrow text-royal-700">Калькулятор</p>
        <h3 className="t-h3 mt-3 font-bold">Рассчитать стоимость лечения</h3>
        <p className="mt-3 max-w-md text-[0.96rem] leading-relaxed text-slate">
          Диапазон обновляется мгновенно. Точная сумма фиксируется в плане лечения
          после диагностики.
        </p>

        {/* treatment type */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(treatments) as Key[]).map((k) => (
            <button
              key={k}
              onClick={() => pick(k)}
              className={`relative rounded-full px-5 py-2.5 text-[0.92rem] font-medium transition-colors ${
                type === k
                  ? "text-white"
                  : "border border-line bg-white/70 text-slate hover:border-royal-300"
              }`}
            >
              {type === k && (
                <motion.span
                  layoutId="calc-pill"
                  className="absolute inset-0 rounded-full bg-royal-600"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative">{treatments[k].label}</span>
            </button>
          ))}
        </div>

        {/* material */}
        <Field label="Материал / система">
          <div className="grid gap-2 sm:grid-cols-3">
            {t.materials.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setMaterial(i)}
                className={`rounded-2xl border px-4 py-3.5 text-left text-[0.9rem] leading-snug transition-all ${
                  material === i
                    ? "border-royal-600 bg-royal-50 text-royal-800 shadow-[0_10px_28px_-16px_rgba(37,99,235,0.8)]"
                    : "border-line bg-white/70 hover:border-royal-300"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </Field>

        {/* count */}
        <Field
          label={`Количество (${t.unit === "зуб" ? "зубов" : "челюстей"})`}
          value={String(count)}
        >
          <input
            type="range"
            min={1}
            max={t.max}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="range"
            style={{
              background: `linear-gradient(to right, var(--color-royal-600) ${
                ((count - 1) / (t.max - 1)) * 100
              }%, var(--color-mist) ${((count - 1) / (t.max - 1)) * 100}%)`,
            }}
            aria-label="Количество"
          />
          <div className="mt-2 flex justify-between text-[0.78rem] text-muted">
            <span>1</span>
            <span>{t.max}</span>
          </div>
        </Field>

        {/* option */}
        <Field label="Дополнительно">
          <div className="grid gap-2 sm:grid-cols-2">
            {t.crowns.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setExtra(i)}
                className={`rounded-2xl border px-4 py-3.5 text-left text-[0.9rem] transition-all ${
                  extra === i
                    ? "border-royal-600 bg-royal-50 text-royal-800"
                    : "border-line bg-white/70 hover:border-royal-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Field>

        {type === "implant" && (
          <label className="mt-5 flex cursor-pointer items-center justify-between rounded-2xl border border-line bg-white/70 px-5 py-4">
            <span className="text-[0.95rem]">
              Нужна костная пластика
              <span className="mt-0.5 block text-[0.8rem] text-muted">
                Определяется по КТ — отметьте, если знаете о дефиците кости
              </span>
            </span>
            <span
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                bone ? "bg-royal-600" : "bg-mist"
              }`}
              onClick={() => setBone((b) => !b)}
            >
              <motion.span
                className="absolute top-1 h-5 w-5 rounded-full bg-white shadow"
                animate={{ left: bone ? 26 : 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            </span>
            <input
              type="checkbox"
              checked={bone}
              onChange={(e) => setBone(e.target.checked)}
              className="sr-only"
            />
          </label>
        )}

        {/* result */}
        <div className="mt-8 rounded-[24px] border border-royal-200/70 bg-white/80 p-6">
          <p className="text-[0.86rem] text-muted">Предварительная стоимость</p>
          <motion.p
            key={`${from}-${to}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="tnum mt-1.5 text-[clamp(1.6rem,1.1rem+2vw,2.4rem)] font-bold leading-tight tracking-tight"
          >
            {rub(from)} — {rub(to)}
          </motion.p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-[0.88rem] text-muted">Рассрочка 0%:</span>
            {[6, 12, 24].map((m) => (
              <button
                key={m}
                onClick={() => setInstallments(m)}
                className={`rounded-full px-3.5 py-1.5 text-[0.85rem] transition-colors ${
                  installments === m
                    ? "bg-graphite text-white"
                    : "border border-line hover:border-royal-300"
                }`}
              >
                {m} мес
              </button>
            ))}
            <span className="tnum ml-auto text-[1.05rem] font-semibold">
              {rub(monthly)} / мес
            </span>
          </div>

          <button
            onClick={() =>
              openBooking({
                title: "Уточнить расчёт",
                subtitle: `Ваш предварительный расчёт: ${t.label}, ${mat.label}, ${count} ${
                  t.unit === "зуб" ? "зуб(а)" : "челюсть"
                } — ${rub(from)}–${rub(to)}.`,
              })
            }
            className="btn btn-primary mt-6 w-full"
          >
            Уточнить точную стоимость
          </button>
          <p className="mt-3 text-center text-[0.78rem] leading-relaxed text-muted">
            Расчёт справочный и не является офертой. Итоговая смета составляется
            после осмотра и 3D-диагностики.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-[0.88rem] font-medium text-slate">{label}</p>
        {value && (
          <p className="tnum text-[1.05rem] font-bold text-royal-700">{value}</p>
        )}
      </div>
      {children}
    </div>
  );
}
