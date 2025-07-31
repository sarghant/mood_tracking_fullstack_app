"use client";

import type { MoodDisplayData } from "../constants/moods";
import type { Mood, MoodType } from "@/generated/prisma";
import MoodsChart from "./MoodsChart";

const MoodsDisplay = ({
  allMoods,
  currentMoodAccent,
}: {
  allMoods: Mood[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
}) => {
  return (
    <div className="my-8 py-12 px-4 flex justify-between bg-slate-100">
      <MoodsChart allMoods={allMoods} currentMoodAccent={currentMoodAccent} />
    </div>
  );
};

export default MoodsDisplay;
