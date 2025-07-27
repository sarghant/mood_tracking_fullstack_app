import { MoodType } from "@/generated/prisma";

export type Mood = {
  moodType: MoodType;
  emoji: string;
  name: string;
  heading: string;
  upliftingMessage: string;
  colors: {
    foreground: string;
    background: string;
    hoverBackground: string;
    activeOutlineColor: string;
  };
};

export const moods: Mood[] = [
  {
    moodType: MoodType["ANGRY"],
    emoji: "/mood_emojis/pouting_face_flat.svg",
    name: "Angry",
    heading: "Take a Pause",
    upliftingMessage: "Breathe deeply. You can handle this.",
    colors: {
      foreground: "text-red-600",
      background: "bg-red-600",
      hoverBackground:
        "hover:bg-red-700 focus:bg-red-700 disabled:hover:bg-red-600 disabled:focus:bg-red-600",
      activeOutlineColor: "outline-red-500",
    },
  },
  {
    moodType: MoodType["SAD"],
    emoji: "/mood_emojis/frowning_face_flat.svg",
    name: "Sad",
    heading: "It's Okay to Feel Down",
    upliftingMessage: "You’re not alone. Things will get better.",
    colors: {
      foreground: "text-blue-400/90",
      background: "bg-blue-400/90",
      hoverBackground:
        "hover:bg-blue-500/90 focus:bg-blue-500/90 disabled:hover:bg-blue-400/90 disabled:focus:bg-blue-400/90",
      activeOutlineColor: "outline-blue-400/80",
    },
  },
  {
    moodType: MoodType["NEUTRAL"],
    emoji: "/mood_emojis/neutral_face_flat.svg",
    name: "Ok",
    heading: "Stay Balanced",
    upliftingMessage: "Stay present. You’re doing fine.",
    colors: {
      foreground: "text-teal-500",
      background: "bg-teal-500",
      hoverBackground:
        "hover:bg-teal-600 focus:bg-teal-600 disabled:hover:bg-teal-500 disabled:focus:bg-teal-500",
      activeOutlineColor: "outline-teal-400",
    },
  },
  {
    moodType: MoodType["OPTIMISTIC"],
    emoji: "/mood_emojis/slightly_smiling_face_flat.svg",
    name: "Optimistic",
    heading: "Look Forward",
    upliftingMessage: "Keep going. Good things are ahead.",
    colors: {
      foreground: "text-yellow-500",
      background: "bg-yellow-600",
      hoverBackground:
        "hover:bg-yellow-700 focus:bg-yellow-700 disabled:hover:bg-yellow-600 disabled:focus:bg-yellow-600",
      activeOutlineColor: "outline-yellow-500",
    },
  },
  {
    moodType: MoodType["ECSTATIC"],
    emoji: "/mood_emojis/smiling_face_with_smiling_eyes_flat.svg",
    name: "Ecstatic",
    heading: "Celebrate Joy",
    upliftingMessage: "Enjoy this moment. You deserve it!",
    colors: {
      foreground: "text-amber-700/90",
      background: "bg-amber-600/90",
      hoverBackground:
        "hover:bg-amber-700/90 focus:bg-amber-700/90 disabled:hover:bg-amber-600/90 disabled:focus:bg-amber-600/90",
      activeOutlineColor: "outline-amber-500",
    },
  },
];
