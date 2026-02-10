"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from "recharts";
import { getSleepQualityDisplay, getSleepHoursColor } from "../constants/sleep";

export type SleepChartDataType = {
  hours: number;
  quality: number | null;
  date: Date;
  formattedDate: string;
};

const CHART_COLORS = {
  stroke: "#6366f1",
  grid: "#9ca3af",
  healthyZone: "rgba(34, 197, 94, 0.12)",
  recommendedLine: "rgba(34, 197, 94, 0.6)",
} as const;

function SleepTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: SleepChartDataType }>;
}) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const qualityDisplay = getSleepQualityDisplay(data.quality);
  const hoursColor = getSleepHoursColor(data.hours);

  return (
    <div className="rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-md dark:border-gray-500 dark:bg-gray-800">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {data.formattedDate}
      </div>
      <div className={`mt-1 text-lg font-bold ${hoursColor}`}>
        {data.hours}h
      </div>
      {qualityDisplay && (
        <div
          className={`mt-0.5 text-xs font-medium ${qualityDisplay.color}`}
        >
          {qualityDisplay.label}
        </div>
      )}
    </div>
  );
}

const SleepChart = ({ chartData }: { chartData: SleepChartDataType[] }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = () => setIsSmallScreen(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (chartData.length === 0) return null;

  const xTickMargin = isSmallScreen ? 4 : 8;
  const yTickMargin = isSmallScreen ? 14 : 12;

  return (
    <div className="h-[180px] sm:h-[200px] md:h-[220px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ left: 36, right: 20, bottom: 8, top: 8 }}
        >
          <defs>
            <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.stroke} stopOpacity={0.45} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke={CHART_COLORS.grid}
            strokeDasharray="5 5"
            strokeWidth={1.5}
            vertical={false}
          />
          <ReferenceArea
            y1={7}
            y2={9}
            fill={CHART_COLORS.healthyZone}
            strokeOpacity={0}
          />
          <ReferenceLine
            y={7}
            stroke={CHART_COLORS.recommendedLine}
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <XAxis
            dataKey="formattedDate"
            allowDataOverflow
            tickMargin={xTickMargin}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            tick={({ payload, x, y }) => (
              <foreignObject x={x - 28} y={y} width={56} height={24}>
                <span className="text-foreground text-center text-xs sm:text-sm font-medium">
                  {payload.value}
                </span>
              </foreignObject>
            )}
          />
          <YAxis
            domain={[0, 12]}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}h`}
            width={32}
            tickMargin={yTickMargin}
            tick={({ x, y, payload }) => (
              <foreignObject x={x} y={y - 10} width={32} height={20}>
                <span className="text-foreground text-right text-xs sm:text-sm font-medium">
                  {payload.value}h
                </span>
              </foreignObject>
            )}
          />
          <Tooltip content={<SleepTooltip />} />
          <Area
            type="monotone"
            dataKey="hours"
            stroke={CHART_COLORS.stroke}
            strokeWidth={2.5}
            fill="url(#sleepGradient)"
            dot={{ fill: CHART_COLORS.stroke, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SleepChart;
