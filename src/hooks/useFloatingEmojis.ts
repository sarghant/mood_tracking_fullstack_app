import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export function useFloatingEmojis(
  containerRef: RefObject<HTMLDivElement | null>
) {
  useGSAP(() => {
    if (!containerRef.current) return;
    const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
    const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
    const tl3 = gsap.timeline({ repeat: -1, yoyo: true });
    const tl4 = gsap.timeline({ repeat: -1, yoyo: true });
    const tl5 = gsap.timeline({ repeat: -1, yoyo: true });
    tl1.to("#floating-emoji-1", {
      x: "random(30, 120)",
      y: "random(50, 100)",
      rotate: "random(30, 20)",
      scale: 1.15,
      duration: 5,
      ease: "sine.inOut",
    });
    tl1.to("#floating-emoji-1", {
      x: "random(-10, -20)",
      y: "random(-10, -30)",
      rotate: "random(-15, -25)",
      scale: 1.05,
      duration: 3.5,
      ease: "sine.inOut",
    });
    tl1.to("#floating-emoji-1", {
      x: "random(40, 10)",
      y: "random(5, 25)",
      rotate: "random(5, 15)",
      scale: 1.2,
      duration: 4.5,
      ease: "sine.inOut",
    });
    //
    tl2.to("#floating-emoji-2", {
      x: "random(30, 120)",
      y: "random(50, 100)",
      rotate: "random(-30, -20)",
      scale: 1.25,
      duration: 5,
      ease: "sine.inOut",
    });
    tl2.to("#floating-emoji-2", {
      x: "random(-20, -50)",
      y: "random(-10, -30)",
      rotate: "random(15, 25)",
      scale: 1.05,
      duration: 4,
      ease: "sine.inOut",
    });
    tl2.to("#floating-emoji-2", {
      x: "random(40, 10)",
      y: "random(-5, -25)",
      rotate: "random(-5, -15)",
      scale: 1.2,
      duration: 4,
      ease: "sine.inOut",
    });
    //
    tl3.to("#floating-emoji-3", {
      x: "random(-30, -10)",
      y: "random(-10, -40)",
      rotate: "random(-10, -35)",
      duration: 4,
      ease: "sine.inOut",
    });
    tl3.to("#floating-emoji-3", {
      x: "random(20, 50)",
      y: "random(5, 0)",
      rotate: "random(5, 25)",
      duration: 4,
      ease: "sine.inOut",
    });
    tl3.to("#floating-emoji-3", {
      x: "random(40, 10)",
      y: "random(5, -25)",
      rotate: "random(-5, -15)",
      duration: 3,
      ease: "sine.inOut",
    });
    //
    tl4.to("#floating-emoji-4", {
      x: "random(-30, -10)",
      y: "random(-10, -40)",
      rotate: "random(-10, -35)",
      duration: 4,
      ease: "sine.inOut",
    });
    tl4.to("#floating-emoji-4", {
      x: "random(20, 50)",
      y: "random(5, 0)",
      rotate: "random(5, 25)",
      duration: 4,
      ease: "sine.inOut",
    });
    tl4.to("#floating-emoji-4", {
      x: "random(40, 10)",
      y: "random(5, -25)",
      rotate: "random(-5, -15)",
      duration: 3,
      ease: "sine.inOut",
    });
    //
    tl5.to("#floating-emoji-5", {
      x: "random(-30, -10)",
      y: "random(-10, -40)",
      rotate: "random(-10, -35)",
      duration: 4,
      ease: "sine.inOut",
    });
    tl5.to("#floating-emoji-5", {
      x: "random(20, 50)",
      y: "random(5, 0)",
      rotate: "random(5, 25)",
      duration: 4,
      ease: "sine.inOut",
    });
    tl5.to("#floating-emoji-5", {
      x: "random(40, 10)",
      y: "random(5, -25)",
      rotate: "random(-5, -15)",
      duration: 3,
      ease: "sine.inOut",
    });
  }, []);
}
