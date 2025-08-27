"use client";

import { useFloatingEmojis } from "@/hooks/useFloatingEmojis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const imgPaths = [
  "mood_emojis/pouting_face_flat.svg",
  "mood_emojis/frowning_face_flat.svg",
  "mood_emojis/neutral_face_flat.svg",
  "mood_emojis/slightly_smiling_face_flat.svg",
  "mood_emojis/smiling_face_with_smiling_eyes_flat.svg",
];

const BackgroundEffects2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFloatingEmojis(containerRef);
  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none">
      <Image
        src={imgPaths[0]}
        alt="Floating Mood Emoji"
        width={100}
        height={100}
        id="floating-emoji-1"
        className="floating-emoji absolute top-[4%] left-[1.5%] opacity-90"
      />
      <Image
        src={imgPaths[1]}
        alt="Floating Mood Emoji"
        width={180}
        height={180}
        id="floating-emoji-2"
        className="floating-emoji absolute bottom-[8%] right-[35%] opacity-90"
      />
      <Image
        src={imgPaths[2]}
        alt="Floating Mood Emoji"
        width={128}
        height={128}
        id="floating-emoji-3"
        className="floating-emoji absolute bottom-[15%] left-[4%] opacity-90"
      />
      <Image
        src={imgPaths[3]}
        priority={true}
        alt="Floating Mood Emoji"
        width={200}
        height={200}
        id="floating-emoji-4"
        className="floating-emoji absolute top-[25%] right-[5%] opacity-90"
      />
      <Image
        src={imgPaths[4]}
        alt="Floating Mood Emoji"
        width={80}
        height={80}
        id="floating-emoji-5"
        className="floating-emoji absolute top-1/2 left-[6%] -translate-y-1/2 opacity-90"
      />
    </div>
  );
};

export default BackgroundEffects2;
