"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import CurrencyChart from "./CurrencyChart";

type DailyItem = {
  bid: string;
  timestamp: string;
};

type CurrencyData = {
  current: {
    bid: string;
    pctChange: string;
  } | null;
  history: DailyItem[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  usd: CurrencyData;
  eur: CurrencyData;
  loading: boolean;
  error: boolean;
};

export default function CurrencyButton({
  open,
  onClose,
  usd,
  eur,
  loading,
  error,
}: Props) {
  const [active, setActive] = useState<"eur" | "usd">("eur");

  function cardStyle(type: "usd" | "eur") {
    const isActive = active === type;

    return `
      rounded-lg p-6 border transition cursor-pointer
      ${
        isActive
          ? "border-brand bg-brand-soft"
          : "border-default bg-surface hover-brand-soft"
      }
    `;
  }

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl bg-surface border border-default rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold">Câmbio (BRL)</h3>
            <button onClick={onClose}>✕</button>
          </div>

          {!loading && !error && usd.current && eur.current && (
            <>
              {/* Botões seletivos */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <button
                  onClick={() => setActive("usd")}
                  className={cardStyle("usd")}
                >
                  <p className="text-sm font-semibold">Dólar</p>
                  <p className="text-3xl font-bold text-brand-dark mt-3">
                    R$ {Number(usd.current.bid).toFixed(2)}
                  </p>
                </button>

                <button
                  onClick={() => setActive("eur")}
                  className={cardStyle("eur")}
                >
                  <p className="text-sm font-semibold">Euro</p>
                  <p className="text-3xl font-bold text-brand-dark mt-3">
                    R$ {Number(eur.current.bid).toFixed(2)}
                  </p>
                </button>
              </div>

              {/* Gráfico condicional */}
              {active === "usd" && (
                <CurrencyChart
                  data={usd.history}
                  color="var(--color-brand-dark)"
                  label="USD"
                />
              )}

              {active === "eur" && (
                <CurrencyChart data={eur.history} color="#f59e0b" label="EUR" />
              )}
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
