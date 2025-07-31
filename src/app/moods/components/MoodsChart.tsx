import type { Mood, MoodType } from "@/generated/prisma";
import type { MoodDisplayData } from "../constants/moods";
import { moodChartData } from "../constants/moods";
import Image from "next/image";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid } from "recharts";

const MoodsChart = ({
  allMoods,
  currentMoodAccent,
}: {
  allMoods: Mood[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
}) => {
  const chartData = allMoods.map((mood) => {
    return {
      moodValue: moodChartData[mood.moodType].value,
      date: format(new Date(mood.createdAt), "MMM d"),
      moodType: mood.moodType,
      emoji: moodChartData[mood.moodType].emoji,
      color: moodChartData[mood.moodType].color,
    };
  });
  return (
    <LineChart
      width={698}
      height={328}
      data={chartData}
      margin={{ left: 64, right: 64, bottom: 10, top: 10 }}
    >
      <CartesianGrid stroke={currentMoodAccent?.chart} strokeDasharray="5 5" />
      <Line
        type="monotone"
        dataKey="moodValue"
        stroke={currentMoodAccent?.chart}
        strokeWidth={3}
        name="Your moods over time"
        dot={CustomDot}
      />
      <XAxis dataKey="date" tickMargin={10} />
      <YAxis
        allowDecimals={false}
        tickMargin={15}
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
  let path = "";
  const { name, color } = Object.values(moodChartData)[payload.value];
  const textColor = `text-[${color}]`;
  switch (payload.value) {
    case 0:
      path = "/mood_emojis/pouting_face_flat.svg";
      break;
    case 1:
      path = "/mood_emojis/frowning_face_flat.svg";
      break;
    case 2:
      path = "/mood_emojis/neutral_face_flat.svg";
      break;
    case 3:
      path = "/mood_emojis/slightly_smiling_face_flat.svg";
      break;
    case 4:
      path = "/mood_emojis/smiling_face_with_smiling_eyes_flat.svg";
      break;
  }
  return (
    <foreignObject
      key={payload.value}
      x={x - 64}
      y={y - 14}
      width={128}
      height={28}
    >
      <span
        style={{ color: color }}
        className={`${textColor} text-shadow-2xs text-shadow-black/15 text-lg font-semibold`}
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
  payload: { moodType: MoodType };
}) {
  let path = "";
  // console.log(payload);
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
    <foreignObject x={cx - 20} y={cy - 32} width={40} height={40}>
      <Image src={path} alt="Mood Emoji" width={40} height={40} />
    </foreignObject>
  );
}

export default MoodsChart;
