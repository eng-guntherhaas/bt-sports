"use client";

import { useState } from "react";

type DailyItem = {
  bid: string;
  timestamp: string;
};

type Props = {
  data: DailyItem[];
  color: string;
  label: string;
};

export default function CurrencyChart({ data, color, label }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return null;
  }

  const width = 700;
  const height = 300;
  const padding = 50;

  const chartData = [...data].reverse();
  const values = chartData.map((d) => Number(d.bid));

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  function scaleY(value: number) {
    return height - padding - ((value - min) / range) * (height - padding * 2);
  }

  function scaleX(index: number) {
    return padding + (index / (chartData.length - 1)) * (width - padding * 2);
  }

  const path = values
    .map((v, i) => {
      const x = scaleX(i);
      const y = scaleY(v);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  function formatDate(ts: string) {
    const date = new Date(Number(ts) * 1000);
    return date.toLocaleDateString("pt-BR");
  }

  const yTicks = 5;
  const xTicks = 5;

  return (
    <div className="mt-8">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-72 bg-surface-soft rounded-lg"
      >
        {/* Y grid */}
        {Array.from({ length: yTicks }).map((_, i) => {
          const value = min + (range / (yTicks - 1)) * i;
          const y = scaleY(value);

          return (
            <g key={i}>
              <line
                x1={padding}
                x2={width - padding}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
              />
              <text x={10} y={y + 4} fontSize="11" fill="#64748b">
                R$ {value.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* X labels */}
        {Array.from({ length: xTicks }).map((_, i) => {
          const index = Math.round((chartData.length - 1) * (i / (xTicks - 1)));
          const x = scaleX(index);

          return (
            <text
              key={i}
              x={x}
              y={height - 10}
              fontSize="11"
              textAnchor="middle"
              fill="#64748b"
            >
              {formatDate(chartData[index].timestamp)}
            </text>
          );
        })}

        {/* Line */}
        <path d={path} fill="none" stroke={color} strokeWidth="2" />

        {/* Hit areas */}
        {values.map((v, i) => (
          <circle
            key={i}
            cx={scaleX(i)}
            cy={scaleY(v)}
            r="8"
            fill="transparent"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          />
        ))}

        {/* Tooltip */}
        {hoverIndex !== null && (
          <>
            <line
              x1={scaleX(hoverIndex)}
              x2={scaleX(hoverIndex)}
              y1={padding}
              y2={height - padding}
              stroke="#94a3b8"
              strokeDasharray="4"
            />

            <rect
              x={scaleX(hoverIndex) - 70}
              y={padding}
              width="140"
              height="50"
              rx="8"
              fill="white"
              stroke="#e2e8f0"
            />

            <text
              x={scaleX(hoverIndex)}
              y={padding + 18}
              textAnchor="middle"
              fontSize="12"
              fill="#0f172a"
            >
              {formatDate(chartData[hoverIndex].timestamp)}
            </text>

            <text
              x={scaleX(hoverIndex)}
              y={padding + 35}
              textAnchor="middle"
              fontSize="12"
              fill={color}
            >
              {label}: R$ {values[hoverIndex].toFixed(2)}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
