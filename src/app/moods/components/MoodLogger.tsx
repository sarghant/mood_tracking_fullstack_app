"use client";

import { logMood } from "@/actions/moods.actions";
import { Button } from "@/ui/button";
import { useActionState, useState } from "react";
import Image from "next/image";
import { Mood, moods } from "../constants/moods";

const MoodsLogger = ({
  currentMoodAccent,
}: {
  currentMoodAccent: Mood["colors"] | undefined;
}) => {
  const [state, formAction] = useActionState(logMood, {
    success: false,
    message: "",
  });
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex flex-col gap-2.5 items-center mt-5">
      <Button
        variant="cta"
        size="adaptive"
        className={`${currentMoodAccent?.background} ${currentMoodAccent?.hoverBackground} disabled:saturate-[25%] disabled:brightness-90`}
        onClick={() => setShowForm(true)}
        disabled={showForm}
      >
        Let's reflect on it
      </Button>
      <form
        action={formAction}
        className={`mx-auto my-5 p-6 md:p-10 flex flex-col items-center gap-3 md:gap-6 
      w-max bg-slate-100 dark:bg-neutral-700/60 shadow-md rounded-lg ${
        showForm
          ? "rotate-x-0 translate-y-0 opacity-100"
          : "rotate-x-90 -translate-y-full opacity-0"
      } transition-all duration-300`}
      >
        <fieldset>
          <legend className="text-xl font-semibold text-center mb-5">
            What's your mood right now?
          </legend>
          <div className="flex gap-5 md:gap-8 justify-center">
            {moods.map((mood) => (
              <label
                key={mood.moodType}
                className="cursor-pointer flex flex-col items-center gap-2 group"
              >
                <input
                  type="radio"
                  name="mood_type"
                  value={mood.moodType}
                  className="hidden peer"
                />
                <Image
                  src={mood.emoji}
                  alt="Mood Emoji"
                  width={56}
                  height={56}
                  className={`group-hover:scale-110 group-focus:scale-110 rounded-full peer-checked:scale-[115%] peer-checked:outline-2 ${mood.colors.activeOutlineColor} transition-transform`}
                />
                <span
                  className={`text-lg md:text-xl font-semibold text-shadow-2xs text-shadow-black/30 dark:text-shadow-white/10 ${mood.colors.foreground} brightness-75 peer-checked:brightness-100 dark:peer-checked:brightness-150 peer-checked:text-shadow-black/40 dark:brightness-125 group-hover:brightness-100 dark:group-hover:brightness-150 group-hover:text-shadow-black/45 group-focus:brightness-100 dark:group-focus:brightness-150 group-focus:text-shadow-black/45 transition`}
                >
                  {mood.name}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <textarea
          name="mood_quote"
          placeholder="Optional: add a quote regarding your current mood."
          className="w-full max-w-xl min-h-[80px] rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-base text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-300 shadow-sm transition"
        ></textarea>
        {/* Hidden input to send current timezone in form data */}
        <input
          type="hidden"
          name="timezone"
          value={Intl.DateTimeFormat().resolvedOptions().timeZone}
        />
        <Button
          type="submit"
          variant="cta"
          size="adaptive"
          className="bg-cyan-600/80 dark:bg-cyan-400/40 hover:bg-cyan-700/90 dark:hover:bg-cyan-300/50 focus:bg-cyan-700/90 dark:focus:bg-cyan-300/50 tracking-wide"
        >
          Log Your Mood!
        </Button>
      </form>
    </div>
  );
};

export default MoodsLogger;
