"use client";

import {
  ChevronDown,
  LogIn,
  LogOut,
  Settings,
  SmileIcon,
  SunIcon,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./NavBar.module.css";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = ({ session }: { session: Session | null }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const user = session?.user;
  return (
    <header className="w-full">
      <nav className="w-full flex items-center justify-between gap-2 lg:max-w-[80vw] mx-auto p-6 lg:p-12">
        {/* App logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <SmileIcon
            size={64}
            className="text-yellow-600 brightness-125 group-hover:text-orange-700 group-hover:brightness-200 group-hover:scale-105 transition"
          />
          <span
            className="font-semibold text-yellow-500 brightness-110 text-4xl text-shadow-2xs text-shadow-amber-600 
          group-hover:text-orange-400 group-hover:brightness-125 group-hover:scale-95 transition"
          >
            Moodies
          </span>
        </Link>
        {/*  */}
        <div className="hidden md:block relative w-[36vw] lg:max-w-2xl h-2 -translate-x-[5%] rounded-full overflow-hidden">
          <div
            className={`absolute ${styles.gradient} w-[200%] h-full bg-gradient-to-r from-0% from-amber-500 via-46% via-lime-500 to-82% to-cyan-600/40`}
          ></div>
        </div>
        {/* User */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Profile avatar */}
            <div className="max-w-max rounded-full overflow-hidden">
              {session != null ? (
                <img
                  width={48}
                  height={48}
                  src={user?.image!}
                  alt="User Avatar"
                />
              ) : (
                <UserCircle2
                  size={36}
                  strokeWidth={1.5}
                  className="text-slate-700"
                />
              )}
            </div>
            <ChevronDown />
          </button>
          {/* Dropdown */}
          <div
            className={`absolute top-full right-0 mt-4 p-4 space-y-1.5 w-xl max-w-[256px] overflow-hidden rounded-xl ring-1 dark:ring-2 ring-slate-700/4 dark:ring-neutral-300/30 bg-slate-100 dark:bg-gray-700 shadow-md origin-top ${
              isExpanded
                ? "rotate-x-0 opacity-100 z-50"
                : "rotate-x-90 opacity-0 -z-50"
            } transition duration-200`}
          >
            {session != null ? (
              <>
                <ThemeSwitcher />
                <Button asChild>
                  <Link href="/settings">
                    <Settings
                      size={28}
                      className="text-cyan-900/90 dark:text-cyan-400/80 group-hover:text-cyan-700/70 dark:group-hover:text-cyan-500/80 group-focus:text-cyan-700/70 dark:group-focus:text-cyan-500/80 transition-colors"
                    />
                    <span className="font-medium">Account Settings</span>
                  </Link>
                </Button>
                <Button type="button" onClick={() => signOut()}>
                  <LogOut
                    size={28}
                    className="text-red-900/60 dark:text-red-400/70 group-hover:text-red-700/60 group-focus:text-red-700/60 transition-colors"
                  />
                  <span className="font-medium">Logout</span>
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => signIn()}
                className="cursor-pointer w-full flex gap-3 lg:gap-4 p-3 rounded-md items-center group hover:bg-slate-200 focus:bg-slate-200 transition-colors"
              >
                <LogIn
                  size={28}
                  className="text-emerald-800/40 dark:text-emerald-500/70 group-hover:text-emerald-700/30 dark:group-hover:text-emerald-500/40 group-focus:text-emerald-700/30 dark:group-focus:text-emerald-500/40 transition-colors"
                />
                <span className="font-medium">Login</span>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
