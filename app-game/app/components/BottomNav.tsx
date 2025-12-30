"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex flex-col items-center text-sm ${
      pathname === path ? "text-green-400" : "text-zinc-400"
    }`;

  return (
    <>
      <Link
        href="/play"
        className="
          fixed bottom-24 left-1/2 -translate-x-1/2 z-50
          flex items-center gap-2
          px-6 py-3 rounded-full
          bg-green-500 text-black font-semibold
          shadow-xl active:scale-95
        "
      >
        🎮 Spiel starten
      </Link>

      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-800 border-t border-zinc-700 z-40">
        <div className="flex justify-around py-3">
          <Link href="/" className={linkClass("/")}>
            <span className="text-xl">🏠</span>
            Start
          </Link>

          <Link href="/statistiken" className={linkClass("/leaderboard")}>
            <span className="text-xl">🏆</span>
            Statistiken
          </Link>

          <Link href="/profile" className={linkClass("/profile")}>
            <span className="text-xl">👤</span>
            Profil
          </Link>
        </div>
      </nav>
    </>
  );
}
