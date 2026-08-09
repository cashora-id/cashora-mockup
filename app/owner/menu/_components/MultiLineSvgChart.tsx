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

  const rawMax = Math.max(...allVals, 1);
  const maxVal = rawMax * 1.15;
  const minVal = 0;

  const width = 740;
  const height = 240;
  const paddingLeft = 60;
  const paddingRight = 35;
  const paddingTop = 25;
  const paddingBottom = 40;

  // Helper to format currency for Y-Axis labels
  const formatYLabel = (val: number) => {
    if (val >= 1_000_000) return `Rp ${(val / 1_000_000).toFixed(1)}Jt`;
    if (val >= 1_000) return `Rp ${(val / 1_000).toFixed(0)}rb`;
    return `Rp ${val}`;
  };

  // Helper to get series value for a point
  const getVal = (pt: ChartPoint, seriesKey: string): number => {
    if (seriesKey === "total") return isSales ? pt.totalSales : pt.totalExpenses;
    if (seriesKey === "budiRetail") return isSales ? pt.stores.budiRetail.sales : pt.stores.budiRetail.expenses;
    if (seriesKey === "warungPakBudi") return isSales ? pt.stores.warungPakBudi.sales : pt.stores.warungPakBudi.expenses;
    if (seriesKey === "kopiBudi") return isSales ? pt.stores.kopiBudi.sales : pt.stores.kopiBudi.expenses;
    return 0;
  };

  // Helper to calculate X coordinate for a point index
  const getX = (idx: number) => {
    return paddingLeft + (idx / (points.length - 1 || 1)) * (width - paddingLeft - paddingRight);
  };

  // Helper to calculate Y coordinate for a value
  const getY = (val: number) => {
    return height - paddingBottom - ((val - minVal) / (maxVal - minVal)) * (height - paddingTop - paddingBottom);
  };

  // Build Bezier Path string for a series
  const buildPath = (seriesKey: string) => {
    const coords = points.map((pt, idx) => {
      const x = getX(idx);
      const val = getVal(pt, seriesKey);
      const y = getY(val);
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
    ? `${totalPathData.d} L ${totalPathData.coords[totalPathData.coords.length - 1].x} ${height - paddingBottom} L ${totalPathData.coords[0].x} ${height - paddingBottom} Z`
    : "";

  const activeHoverPt = hoveredIndex !== null ? points[hoveredIndex] : null;
  const activeHoverX = hoveredIndex !== null ? getX(hoveredIndex) : 0;

  // Y-axis grid ratios
  const yRatios = [0, 0.33, 0.66, 1];

  return (
    <div className="w-full h-full relative flex flex-col justify-between select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="multiChartGradientSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A2540" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0A2540" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="multiChartGradientExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid lines & Y-Axis Labels */}
        {yRatios.map((ratio) => {
          const val = minVal + ratio * (maxVal - minVal);
          const yPos = getY(val);
          return (
            <g key={ratio}>
              <line
                x1={paddingLeft}
                y1={yPos}
                x2={width - paddingRight}
                y2={yPos}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 10}
                y={yPos + 4}
                textAnchor="end"
                className="text-[10px] font-semibold fill-slate-400"
              >
                {formatYLabel(val)}
              </text>
            </g>
          );
        })}

        {/* Vertical Grid lines aligned precisely with each Time Label */}
        {points.map((pt, idx) => {
          const xPos = getX(idx);
          const isHovered = hoveredIndex === idx;

          return (
            <g key={idx}>
              <line
                x1={xPos}
                y1={paddingTop}
                x2={xPos}
                y2={height - paddingBottom}
                stroke={isHovered ? "#0A2540" : "#F1F5F9"}
                strokeDasharray={isHovered ? "4 4" : undefined}
                strokeWidth={isHovered ? "1.5" : "1"}
                className="transition-colors duration-200"
              />
              {/* Perfectly aligned X-Axis Time Label */}
              <text
                x={xPos}
                y={height - 12}
                textAnchor="middle"
                className={`text-[11px] transition-all cursor-pointer ${
                  isHovered
                    ? "fill-[#0A2540] font-extrabold text-[12px]"
                    : "fill-slate-500 font-semibold"
                }`}
                onMouseEnter={() => onHover(idx)}
                onMouseLeave={() => onHover(null)}
              >
                {pt.label}
              </text>
            </g>
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

        {/* Render Each Enabled Store Line & Node Circles */}
        {STORE_SERIES.map((s) => {
          if (!visibleLines[s.key]) return null;
          const { d, coords } = buildPath(s.key);
          const isTotal = s.isTotal;

          return (
            <g key={s.key}>
              {/* Line Curve */}
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={isTotal ? "3.5" : "2.5"}
                strokeDasharray={isTotal ? undefined : "none"}
                strokeLinecap="round"
                className="transition-all duration-500"
              />

              {/* Node Circles centered EXACTLY at (c.x, c.y) */}
              {coords.map((c, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <g key={idx}>
                    {/* Pulsing ring on hover */}
                    {isHovered && (
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={isTotal ? "10" : "8"}
                        fill={s.color}
                        fillOpacity="0.25"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isHovered ? (isTotal ? "7" : "6") : (isTotal ? "4.5" : "3.5")}
                      fill={s.color}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="transition-all duration-200 cursor-pointer shadow-sm"
                      onMouseEnter={() => onHover(idx)}
                      onMouseLeave={() => onHover(null)}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Multi-Series Hover Tooltip */}
      {hoveredIndex !== null && activeHoverPt && (
        <div
          className="absolute z-30 bg-[#0A2540]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 min-w-[220px]"
          style={{
            left: `${(activeHoverX / width) * 100}%`,
            top: `18%`,
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-1.5 mb-2">
            <span className="text-[11px] font-bold text-slate-300">{activeHoverPt.label}</span>
            <span className="text-[11px] font-extrabold text-[#00C897]">
              {isSales ? activeHoverPt.totalSalesFormatted : activeHoverPt.totalExpensesFormatted} Total
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
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
    </div>
  );
}
