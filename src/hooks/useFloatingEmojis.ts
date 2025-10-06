import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export function useFloatingEmojis(
  containerRef: RefObject<HTMLDivElement | null>
) {
  useGSAP(() => {
    if (!containerRef.current) return;

    const emojis = gsap.utils.toArray(".floating-emoji") as HTMLElement[];

    gsap.set(emojis, { opacity: 0, scale: 0.8 });
    gsap.to(emojis, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "back.out(1.7)",
      stagger: {
        amount: 2,
        from: "random",
      },
    });
    emojis.forEach((emoji, index) => {
      const element = emoji as HTMLElement;

      const floatTimeline = gsap.timeline({
        repeat: -1,
        delay: 2 + index * 0.8,
      });

      floatTimeline
        .to(element, {
          x: gsap.utils.random(-50, 50),
          y: gsap.utils.random(-35, 35),
          rotation: gsap.utils.random(-30, 30),
          duration: gsap.utils.random(4, 6),
          ease: "sine.inOut",
        })
        .to(element, {
          x: gsap.utils.random(-60, 60),
          y: gsap.utils.random(-40, 40),
          rotation: gsap.utils.random(-45, 45),
          duration: gsap.utils.random(4, 7),
          ease: "sine.inOut",
        })
        .to(element, {
          x: gsap.utils.random(-45, 45),
          y: gsap.utils.random(-30, 30),
          rotation: gsap.utils.random(-60, 60),
          duration: gsap.utils.random(3, 6),
          ease: "sine.inOut",
        })
        .to(element, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: gsap.utils.random(3, 5),
          ease: "sine.inOut",
        });

      gsap.to(element, {
        scale: gsap.utils.random(0.95, 1.05),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2 + index * 0.3,
      });
    });
  }, []);
}
