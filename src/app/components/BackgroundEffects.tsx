"use client";

import { useFloatingEmojis } from "@/hooks/useFloatingEmojis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const emojiConfigs = [
  {
    src: "mood_emojis/pouting_face_color.svg",
    width: 100,
    height: 100,
    className: "floating-emoji absolute top-[4%] left-[1.5%]",
    id: "floating-emoji-1",
  },
  {
    src: "mood_emojis/frowning_face_color.svg",
    width: 180,
    height: 180,
    className: "floating-emoji absolute bottom-[8%] right-[35%]",
    id: "floating-emoji-2",
  },
  {
    src: "mood_emojis/neutral_face_color.svg",
    width: 128,
    height: 128,
    className: "floating-emoji absolute bottom-[15%] left-[4%]",
    id: "floating-emoji-3",
  },
  {
    src: "/mood_emojis/slightly_smiling_face_color.svg",
    width: 200,
    height: 200,
    className: "floating-emoji absolute top-[25%] right-[5%]",
    id: "floating-emoji-4",
    priority: true,
  },
  {
    src: "mood_emojis/smiling_face_with_smiling_eyes_color.svg",
    width: 80,
    height: 80,
    className: "floating-emoji absolute top-1/2 left-[6%] -translate-y-1/2",
    id: "floating-emoji-5",
  },
];

const BackgroundEffects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFloatingEmojis(containerRef);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-20">
      {emojiConfigs.map((config) => (
        <Image
          key={config.id}
          src={config.src}
          alt="Floating Mood Emoji"
          width={config.width}
          height={config.height}
          id={config.id}
          className={config.className}
          priority={config.priority || false}
          style={{
            width: `${config.width}px`,
            height: `${config.height}px`,
            willChange: "transform, opacity, filter", // Optimize for animations
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;
