import type { MoodType } from "@prisma/client";
import type { MoodDisplayData } from "../constants/moods";
import { moodChartData } from "../constants/moods";
import Image from "next/image";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

export type ChartDataType = {
  moodValue: number;
  date: Date;
  formattedDate: string;
  moodType: MoodType;
  emoji: string;
  color: string;
};

const MoodsChart = ({
  chartData,
  currentMoodAccent,
  showBarChart = false,
}: {
  chartData: ChartDataType[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
  showBarChart?: boolean;
}) => {
  if (showBarChart) {
    return (
      <BarChart
        width={736}
        height={336}
        data={chartData}
        margin={{ left: 90, right: 70, bottom: 10, top: 10 }}
        className="max-w-full md:flex-grow"
      >
        <CartesianGrid
          stroke={currentMoodAccent?.chart}
          strokeDasharray="5 5"
          strokeWidth={3}
        />
        <Bar
          dataKey="moodValue"
          name="Your moods over time"
          label={({ x, y, width, index }) => (
            <foreignObject
              x={x + width / 2 - 16}
              y={y - 20}
              width={32}
              height={32}
              style={{ overflow: "visible" }}
            >
              <Image
                src={chartData[index].emoji}
                alt="Mood Emoji"
                width={32}
                height={32}
                style={{
                  display: "block",
                  margin: 0,
                  pointerEvents: "none",
                }}
              />
            </foreignObject>
          )}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
        <XAxis
          dataKey="formattedDate"
          allowDataOverflow={true}
          tickMargin={10}
          tick={({ payload, x, y }) => (
            <foreignObject x={x - 24} y={y} width={64} height={28}>
              <span className="text-foreground font-medium">
                {payload.value}
              </span>
            </foreignObject>
          )}
        />
        <YAxis
          allowDecimals={false}
          tickMargin={8}
          width={40}
          tick={CustomTick}
        />
      </BarChart>
    );
  }

  return (
    <LineChart
      width={736}
      height={336}
      data={chartData}
      margin={{ left: 90, right: 70, bottom: 10, top: 10 }}
      className="max-w-full md:flex-grow"
    >
      <CartesianGrid
        stroke={currentMoodAccent?.chart}
        strokeDasharray="5 5"
        strokeWidth={3}
      />
      <Line
        type="monotone"
        dataKey="moodValue"
        stroke={currentMoodAccent?.chart}
        strokeWidth={3}
        name="Your moods over time"
        dot={CustomDot}
      />
      <XAxis
        dataKey="formattedDate"
        allowDataOverflow={true}
        tickMargin={10}
        tick={({ payload, x, y }) => (
          <foreignObject x={x - 24} y={y} width={64} height={28}>
            <span className="text-foreground font-medium">{payload.value}</span>
          </foreignObject>
        )}
      />
      <YAxis
        allowDecimals={false}
        tickMargin={8}
        width={40}
        tick={CustomTick}
      />
    </LineChart>
  );
};

function CustomTick({
  x = 0,
  y = 0,
  payload,
}: {
  x: number;
  y: number;
  payload: { value: number };
}) {
  const { name, color } = Object.values(moodChartData)[payload.value];
  const textColor = `text-[${color}]`;
  return (
    <foreignObject
      key={payload.value}
      x={x - 128}
      y={y - 14}
      width={128}
      height={28}
    >
      <span
        style={{ color: color }}
        className={`${textColor} text-shadow-2xs block text-right text-shadow-black/30 text-lg sm:text-xl font-semibold`}
      >
        {name}
      </span>
    </foreignObject>
  );
}

function CustomDot({
  cx,
  cy,
  payload,
}: {
  cx: number;
  cy: number;
  payload: { moodType: MoodType; date: string };
}) {
  let path = "";
  switch (payload.moodType) {
    case "ANGRY":
      path = "/mood_emojis/pouting_face_flat.svg";
      break;
    case "SAD":
      path = "/mood_emojis/frowning_face_flat.svg";
      break;
    case "NEUTRAL":
      path = "/mood_emojis/neutral_face_flat.svg";
      break;
    case "OPTIMISTIC":
      path = "/mood_emojis/slightly_smiling_face_flat.svg";
      break;
    case "ECSTATIC":
      path = "/mood_emojis/smiling_face_with_smiling_eyes_flat.svg";
      break;
    default:
      path = "/mood_emojis/neutral_face_flat.svg";
  }
  return (
    <foreignObject
      key={payload.date}
      x={cx - 20}
      y={cy - 32}
      width={40}
      height={40}
    >
      <Image src={path} alt="Mood Emoji" width={40} height={40} />
    </foreignObject>
  );
}

export default MoodsChart;
