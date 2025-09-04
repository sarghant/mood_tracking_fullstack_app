"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const AnimatedHeadingEmoji = () => {
  const emojiRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!emojiRef.current || !shadowRef.current || !sparklesRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(emojiRef.current, {
      y: -20,
      duration: 0.4,
      ease: "power3.out",
    })
      .to(
        shadowRef.current,
        {
          opacity: 0.25,
          scaleX: 0.85,
          duration: 0.4,
          ease: "power3.out",
        },
        "<"
      )
      .to(emojiRef.current, {
        y: 0,
        duration: 0.4,
        ease: "bounce.out",
      })
      .to(
        shadowRef.current,
        {
          opacity: 0.35,
          scaleX: 1,
          duration: 0.4,
          ease: "bounce.out",
        },
        "<"
      )
      .to(emojiRef.current, {
        duration: 0.15,
      })
      .to(emojiRef.current, {
        rotationY: 90,
        duration: 0.1,
        ease: "power2.inOut",
      })
      .to(
        sparklesRef.current,
        {
          opacity: 1,
          scale: 0.8,
          duration: 0.1,
          ease: "back.out(1.7)",
        },
        "<"
      )
      .to(emojiRef.current, {
        rotationY: 0,
        duration: 0.1,
        ease: "power2.inOut",
      })
      .to(
        sparklesRef.current,
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(emojiRef.current, {
        duration: 0.15,
      })
      .to(emojiRef.current, {
        y: -20,
        duration: 0.4,
        ease: "power3.out",
      })
      .to(
        shadowRef.current,
        {
          opacity: 0.25,
          scaleX: 0.85,
          duration: 0.4,
          ease: "power3.out",
        },
        "<"
      )
      .to(emojiRef.current, {
        y: 0,
        duration: 0.4,
        ease: "bounce.out",
      })
      .to(
        shadowRef.current,
        {
          opacity: 0.35,
          scaleX: 1,
          duration: 0.4,
          ease: "bounce.out",
        },
        "<"
      )
      .to(emojiRef.current, {
        duration: 0.15,
      })
      .to(emojiRef.current, {
        rotationX: 90,
        duration: 0.12,
        ease: "back.inOut(1.2)",
      })
      .to(
        sparklesRef.current,
        {
          opacity: 1,
          scale: 0.8,
          duration: 0.1,
          ease: "back.out(1.7)",
        },
        "<"
      )
      .to(emojiRef.current, {
        rotationX: 0,
        duration: 0.12,
        ease: "back.inOut(1.2)",
      })
      .to(
        sparklesRef.current,
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.12"
      )
      .to(emojiRef.current, {
        duration: 0.5,
      });
  });

  return (
    <div ref={containerRef} className="mx-auto w-24 md:min-w-max mb-8 relative">
      <div
        ref={shadowRef}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 w-20 h-4 bg-black/30 blur-[2px] opacity-35"
        style={{ borderRadius: "50%" }}
      />

      <div
        ref={sparklesRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none"
      >
        <div
          className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
          style={{ transform: "translate(-40px, -45px)" }}
        ></div>
        <div
          className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full shadow-lg"
          style={{ transform: "translate(45px, -35px)" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-pink-400 rounded-full shadow-lg"
          style={{ transform: "translate(-50px, 35px)" }}
        ></div>
        <div
          className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg"
          style={{ transform: "translate(40px, 50px)" }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-purple-400 rounded-full shadow-lg"
          style={{ transform: "translate(55px, -10px)" }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-green-400 rounded-full shadow-lg"
          style={{ transform: "translate(-55px, -10px)" }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-lg"
          style={{ transform: "translate(-25px, 55px)" }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-rose-400 rounded-full shadow-lg"
          style={{ transform: "translate(25px, -55px)" }}
        ></div>
      </div>

      <Image
        ref={emojiRef}
        width={112}
        height={112}
        src="/icons/slightly_smiling_face_3d.png"
        alt="Smiley Face Heading Icon"
        className="relative z-10"
      />
    </div>
  );
};

export default AnimatedHeadingEmoji;
