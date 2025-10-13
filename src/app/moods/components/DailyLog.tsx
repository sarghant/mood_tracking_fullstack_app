"use client";

import { moods } from "../constants/moods";
import type { MoodDisplayData } from "../constants/moods";
import MoodsDisplay from "./MoodsDisplay";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/ui/button";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { logMood } from "@/actions/moods.actions";
import { XIcon } from "lucide-react";
import type { Mood } from "@prisma/client";
import { useRouter } from "next/navigation";

const DailyLog = ({
  allMoods,
  currentMoodAccent,
  hasLoggedMoodToday,
}: {
  allMoods: Mood[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
  hasLoggedMoodToday: boolean;
}) => {
  const router = useRouter();
  // Form states
  const [state, formAction] = useActionState(logMood, {
    success: false,
    message: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [hasPickedMood, setHasPickedMood] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      router.refresh();
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
              Log Your Mood!
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
