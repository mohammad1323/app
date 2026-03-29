"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGameState } from "../hooks/useGameState";

export default function TopNav() {
  const pathname = usePathname();
  const { stats } = useGameState();

  return (
    <nav className="w-full bg-black/95 backdrop-blur-xl border-b border-zinc-800/50 z-40 shadow-lg">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="text-2xl md:text-3xl group-active:scale-110 transition-transform duration-200">
              🐍
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                SNAKE GAME
              </h1>
              <p className="text-[10px] text-zinc-500">Sammle Äpfel!</p>
            </div>
          </Link>
          <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 px-3 md:px-4 py-2 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl"></span>
              <div>
                <p className="text-[10px] text-zinc-400 hidden sm:block">
                  Münzen
                </p>
                <p className="text-base md:text-lg font-bold text-amber-400 tabular-nums">
                  {stats.totalCoins}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
