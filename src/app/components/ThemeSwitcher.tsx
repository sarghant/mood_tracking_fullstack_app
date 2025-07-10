"use client";

import { Button } from "@/ui/button";
import { MoonIcon, MoonStar, SunIcon, Sunrise } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="relative h-16 max-h-12 w-full p-2 lg:p-3">
      <Button
        onClick={() => setIsExpanded(true)}
        className={`absolute inset-0 ${
          isExpanded
            ? "-translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        } transition`}
      >
        {theme === "light" ? (
          <SunIcon
            size={28}
            className="text-amber-700/90 group-hover:text-amber-600/70 group-focus:text-amber-600/70 transition-colors"
          />
        ) : (
          <MoonIcon
            size={28}
            className="text-amber-300 group-hover:text-amber-200 group-focus:text-amber-200 transition-colors"
          />
        )}
        <span className="font-medium">Current Theme</span>
      </Button>
      <div
        className={`absolute inset-0 flex gap-2 items-center justify-center ${
          isExpanded
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } transition`}
      >
        <Button
          type="button"
          size="full-rounded-circle"
          className={`justify-center ring-1 ring-gray-600/60 dark:ring-white/40 ${
            theme === "light" ? "bg-slate-300/70" : ""
          }`}
          onClick={() => {
            setTheme("light");
            setIsExpanded(false);
          }}
        >
          <Sunrise className="text-orange-600/90 dark:text-orange-500/70" />
          Light
        </Button>
        <Button
          type="button"
          size="full-rounded-circle"
          className={`justify-center ring-1 ring-gray-600/60 dark:ring-white/40 ${
            theme === "dark" ? "bg-gray-800/60" : ""
          }`}
          onClick={() => {
            setTheme("dark");
            setIsExpanded(false);
          }}
        >
          <MoonStar className="text-blue-600/80 dark:text-blue-400/90" />
          Dark
        </Button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
