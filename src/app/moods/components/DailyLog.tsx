"use client";

import { moods } from "../constants/moods";
import type { MoodDisplayData } from "../constants/moods";
import MoodsDisplay from "./MoodsDisplay";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/ui/button";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { logMood } from "@/actions/moods.actions";
import { XIcon, MoonIcon } from "lucide-react";
import type { MoodWithDailyLog } from "@/lib/getMood";

const sleepQualityOptions = [
  { label: "Rough", color: "text-slate-400 dark:text-slate-500", fill: "fill-slate-400 dark:fill-slate-500" },
  { label: "Restless", color: "text-rose-300 dark:text-rose-400/70", fill: "fill-rose-300 dark:fill-rose-400/70" },
  { label: "Okay", color: "text-amber-400 dark:text-amber-300", fill: "fill-amber-400 dark:fill-amber-300" },
  { label: "Restful", color: "text-green-500 dark:text-green-400", fill: "fill-green-500 dark:fill-green-400" },
  { label: "Refreshing", color: "text-sky-500 dark:text-sky-400", fill: "fill-sky-500 dark:fill-sky-400" },
];

const DailyLog = ({
  allMoods,
  currentMoodAccent,
  hasLoggedMoodToday,
}: {
  allMoods: MoodWithDailyLog[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
  hasLoggedMoodToday: boolean;
}) => {
  // Form states
  const [state, formAction] = useActionState(logMood, {
    success: false,
    message: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [hasPickedMood, setHasPickedMood] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sleep tracking states
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState<number | null>(null);

  function handleAction(payload: FormData) {
    if (!hasPickedMood) {
      setErrorMessage("You haven't picked your mood yet.");
      return;
    }
    formAction(payload);
  }

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      setShowForm(false);
    } else toast.error(state.message);
  }, [state]);
  return (
    <>
      <ToastContainer position="bottom-center" hideProgressBar={true} />
      {/* Mood logger form */}
      {!hasLoggedMoodToday && (
        <div className="flex flex-col gap-2.5 items-center mt-5">
          <Button
            variant="cta"
            size="adaptive"
            aria-label="Show Form"
            className={`${currentMoodAccent?.background} ${
              currentMoodAccent?.hoverBackground
            } disabled:grayscale-[80%] disabled:brightness-[80%] ${
              showForm ? "opacity-0 invisible" : "opacity-100 visible"
            } transition-all`}
            onClick={() => {
              setShowForm(true);
              setErrorMessage("");
            }}
            disabled={showForm}
          >
            Let&apos;s reflect on it
          </Button>
          {showForm && (
            <div
              className="fixed inset-0 z-40 bg-black/10 dark:bg-black/30"
              onClick={() => setShowForm(false)}
              aria-label="Hide Form"
            />
          )}
          <form
            role="form"
            action={handleAction}
            aria-hidden={!showForm}
            className={`absolute mx-auto my-5 p-6 md:p-10 flex flex-col items-center gap-3 md:gap-6 
      w-max bg-slate-100 dark:bg-neutral-700/60 shadow-md rounded-lg ${
        showForm
          ? "rotate-x-0 translate-y-0 opacity-100 z-50 pointer-events-auto"
          : "rotate-x-90 -translate-y-full opacity-0 -z-50 pointer-events-none"
      } transition-all duration-300`}
          >
            {/* Close button */}
            <Button
              type="button"
              variant="default"
              size="icon"
              aria-label="Hide Form Button"
              aria-hidden={!showForm}
              onClick={() => {
                setShowForm(false);
              }}
              className="absolute top-4 right-4 ring-1 ring-foreground/50 hover:bg-background/60 focus:bg-background/60 transition-colors"
            >
              <XIcon />
            </Button>
            <fieldset>
              <legend className="text-xl font-semibold text-center mb-5">
                What&apos;s your mood right now?
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
                      onChange={() => {
                        setErrorMessage("");
                        setHasPickedMood(true);
                      }}
                    />
                    <Image
                      src={mood.emoji.svgPath}
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
              {errorMessage && (
                <p
                  role="alert"
                  className="text-red-600 font-medium text-center mt-3"
                >
                  {errorMessage}
                </p>
              )}
            </fieldset>

            {/* Divider */}
            <div className="w-full max-w-xl flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-300 dark:bg-neutral-500" />
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                and
              </span>
              <div className="flex-1 h-px bg-slate-300 dark:bg-neutral-500" />
            </div>

            {/* Sleep tracking section */}
            <fieldset className="w-full max-w-xl">
              <legend className="text-xl font-semibold text-center mb-4">
                How did you sleep last night?
              </legend>

              {/* Sleep hours slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="sleep_hours"
                    className="text-base font-medium text-neutral-700 dark:text-neutral-200"
                  >
                    Hours of sleep
                  </label>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {sleepHours}h
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    id="sleep_hours"
                    name="sleep_hours"
                    min={0}
                    max={12}
                    step={0.5}
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-red-400 via-yellow-400 via-50% to-green-400 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1 px-1">
                    <span>0h</span>
                    <span>6h</span>
                    <span>12h</span>
                  </div>
                </div>
              </div>

              {/* Sleep quality rating */}
              <div>
                <p className="text-base font-medium text-neutral-700 dark:text-neutral-200 mb-3 text-center">
                  Sleep quality{" "}
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm font-normal">
                    (optional)
                  </span>
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 justify-center">
                    {sleepQualityOptions.map((option, index) => {
                      const qualityLevel = index + 1;
                      const isSelected = sleepQuality === qualityLevel;
                      const isFilled = sleepQuality !== null && sleepQuality >= qualityLevel;
                      // Use the color of the currently selected quality level for all filled icons
                      const selectedOption = sleepQuality !== null ? sleepQualityOptions[sleepQuality - 1] : null;

                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() =>
                            setSleepQuality(isSelected ? null : qualityLevel)
                          }
                          className={`p-2 rounded-lg transition-all ${
                            isSelected
                              ? "bg-slate-200/80 dark:bg-neutral-600/80 scale-110"
                              : "hover:bg-slate-200 dark:hover:bg-neutral-600"
                          }`}
                          aria-label={`Rate sleep quality as ${option.label}`}
                        >
                          <MoonIcon
                            className={`w-7 h-7 transition-colors ${
                              isFilled && selectedOption
                                ? `${selectedOption.color} ${selectedOption.fill}`
                                : "text-neutral-300 dark:text-neutral-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  {/* Show label only for selected quality */}
                  <span
                    className={`text-sm font-semibold h-5 transition-all ${
                      sleepQuality !== null
                        ? `${sleepQualityOptions[sleepQuality - 1].color} opacity-100`
                        : "opacity-0"
                    }`}
                  >
                    {sleepQuality !== null ? sleepQualityOptions[sleepQuality - 1].label : ""}
                  </span>
                </div>
                {/* Hidden input to send sleep quality in form data */}
                <input
                  type="hidden"
                  name="sleep_quality"
                  value={sleepQuality ?? ""}
                />
              </div>
            </fieldset>

            <textarea
              name="mood_quote"
              placeholder="Optional: add a quote regarding your current mood."
              className="w-full max-w-xl min-h-[80px] rounded-lg border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-base text-neutral-800 dark:text-neutral-100 placeholder:text-sm sm:placeholder:text-base placeholder:text-neutral-500 dark:placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-300 shadow-sm transition"
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
              Log Today&apos;s Entry
            </Button>
          </form>
        </div>
      )}
      <MoodsDisplay
        showForm={showForm}
        hasLoggedMoodToday={hasLoggedMoodToday}
        currentMoodAccent={currentMoodAccent}
        allMoods={allMoods}
      />
    </>
  );
};

export default DailyLog;
