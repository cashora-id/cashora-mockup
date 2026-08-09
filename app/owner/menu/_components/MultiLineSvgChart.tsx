"use client";

import { ChartPoint, MetricTabType } from "../types";
import { STORE_SERIES } from "../data";

interface MultiLineSvgChartProps {
  points: ChartPoint[];
  activeTab: MetricTabType;
  visibleLines: Record<string, boolean>;
  hoveredIndex: number | null;
  onHover: (idx: number | null) => void;
}

export function MultiLineSvgChart({
  points,
  activeTab,
  visibleLines,
  hoveredIndex,
  onHover,
}: MultiLineSvgChartProps) {
  const isSales = activeTab === "sales";

  // Calculate Max Value across all series to normalize scaling
  const allVals: number[] = [];
  points.forEach((p) => {
    if (isSales) {
      allVals.push(p.totalSales, p.stores.budiRetail.sales, p.stores.warungPakBudi.sales, p.stores.kopiBudi.sales);
    } else {
      allVals.push(p.totalExpenses, p.stores.budiRetail.expenses, p.stores.warungPakBudi.expenses, p.stores.kopiBudi.expenses);
    }
  });

  const maxVal = Math.max(...allVals, 1) * 1.15;
  const minVal = 0;

  const width = 700;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  // Helper to get series value for a point
  const getVal = (pt: ChartPoint, seriesKey: string): number => {
    if (seriesKey === "total") return isSales ? pt.totalSales : pt.totalExpenses;
    if (seriesKey === "budiRetail") return isSales ? pt.stores.budiRetail.sales : pt.stores.budiRetail.expenses;
    if (seriesKey === "warungPakBudi") return isSales ? pt.stores.warungPakBudi.sales : pt.stores.warungPakBudi.expenses;
    if (seriesKey === "kopiBudi") return isSales ? pt.stores.kopiBudi.sales : pt.stores.kopiBudi.expenses;
    return 0;
  };

  // Build Bezier Path string for a series
  const buildPath = (seriesKey: string) => {
    const coords = points.map((pt, idx) => {
      const x = paddingX + (idx / (points.length - 1 || 1)) * (width - 2 * paddingX);
      const val = getVal(pt, seriesKey);
      const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);
      return { x, y };
    });

    if (coords.length === 0) return { d: "", coords: [] };
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cpX = (curr.x + next.x) / 2;
      d += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }
    return { d, coords };
  };

  // Build Area Path for Total Line
  const totalPathData = buildPath("total");
  const totalAreaD = totalPathData.coords && totalPathData.coords.length > 0
    ? `${totalPathData.d} L ${totalPathData.coords[totalPathData.coords.length - 1].x} ${height - paddingY} L ${totalPathData.coords[0].x} ${height - paddingY} Z`
    : "";

  const activeHoverPt = hoveredIndex !== null ? points[hoveredIndex] : null;
  const activeHoverX = hoveredIndex !== null
    ? paddingX + (hoveredIndex / (points.length - 1 || 1)) * (width - 2 * paddingX)
    : 0;

  return (
    <div className="w-full h-full relative flex flex-col justify-between">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="multiChartGradientSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A2540" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0A2540" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="multiChartGradientExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid lines */}
        {[0.2, 0.5, 0.8].map((ratio) => {
          const yPos = height - paddingY - ratio * (height - 2 * paddingY);
          return (
            <line
              key={ratio}
              x1={paddingX}
              y1={yPos}
              x2={width - paddingX}
              y2={yPos}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
          );
        })}

        {/* Shaded Area Fill under Total Line */}
        {visibleLines.total && (
          <path
            d={totalAreaD}
            fill={isSales ? "url(#multiChartGradientSales)" : "url(#multiChartGradientExpenses)"}
            className="transition-all duration-500"
          />
        )}

        {/* Render Each Enabled Store Line */}
        {STORE_SERIES.map((s) => {
          if (!visibleLines[s.key]) return null;
          const { d, coords } = buildPath(s.key);
          const isTotal = s.isTotal;

          return (
            <g key={s.key}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={isTotal ? "3.5" : "2.5"}
                strokeDasharray={isTotal ? undefined : "none"}
                strokeLinecap="round"
                className="transition-all duration-500"
              />

              {/* Data Point Nodes for this line */}
              {coords.map((c, idx) => (
                <circle
                  key={idx}
                  cx={c.x}
                  cy={c.y}
                  r={hoveredIndex === idx ? (isTotal ? "6" : "5") : (isTotal ? "4" : "3")}
                  fill={s.color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => onHover(idx)}
                />
              ))}
            </g>
          );
        })}

        {/* Hover Vertical Guideline */}
        {hoveredIndex !== null && (
          <line
            x1={activeHoverX}
            y1={paddingY}
            x2={activeHoverX}
            y2={height - paddingY}
            stroke="#0A2540"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}
      </svg>

      {/* Multi-Series Hover Tooltip */}
      {hoveredIndex !== null && activeHoverPt && (
        <div
          className="absolute z-30 bg-[#0A2540] text-white p-3 rounded-2xl shadow-2xl border border-slate-700 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 min-w-[210px]"
          style={{
            left: `${(activeHoverX / width) * 100}%`,
            top: `20%`,
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
            <span className="text-[11px] font-bold text-slate-300">{activeHoverPt.label}</span>
            <span className="text-[10px] font-extrabold text-[#00C897]">
              {isSales ? activeHoverPt.totalSalesFormatted : activeHoverPt.totalExpensesFormatted} Total
            </span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between text-blue-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Budi Retail Mart:
              </span>
              <span className="font-extrabold text-white">
                {isSales ? activeHoverPt.stores.budiRetail.salesFormatted : activeHoverPt.stores.budiRetail.expensesFormatted}
              </span>
            </div>

            <div className="flex items-center justify-between text-emerald-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Warung Pak Budi:
              </span>
              <span className="font-extrabold text-white">
                {isSales ? activeHoverPt.stores.warungPakBudi.salesFormatted : activeHoverPt.stores.warungPakBudi.expensesFormatted}
              </span>
            </div>

            <div className="flex items-center justify-between text-amber-300 font-semibold opacity-70">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Kopi Budi Sejahtera:
              </span>
              <span className="font-extrabold text-white">
                {isSales ? activeHoverPt.stores.kopiBudi.salesFormatted : activeHoverPt.stores.kopiBudi.expensesFormatted}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* X-Axis Labels */}
      <div className="flex justify-between px-6 pt-2 text-[11px] font-bold text-slate-500">
        {points.map((pt, i) => (
          <span
            key={i}
            className={`cursor-pointer transition-colors ${
              hoveredIndex === i ? "text-[#0A2540] underline font-extrabold" : ""
            }`}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
          >
            {pt.label}
          </span>
        ))}
      </div>
    </div>
  );
}
