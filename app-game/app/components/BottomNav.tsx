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
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-800 border-t border-zinc-700">
      <div className="flex justify-around py-3">


        <Link href="/" className={linkClass("/")}>
          <span className="text-xl">🏠</span>
          Start
        </Link>

        <Link href="/leaderboard" className={linkClass("/leaderboard")}>
          <span className="text-xl">🏆</span>
          Rangliste
        </Link>


        <Link href="/profile" className={linkClass("/profile")}>
          <span className="text-xl">👤</span>
          Profil
        </Link>

      </div>
    </nav>
  );
}
