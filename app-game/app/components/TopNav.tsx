"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGameState } from "../hooks/useGameState";

export default function TopNav() {
  const pathname = usePathname();
  const { stats } = useGameState();

  const linkClass = (path: string) => {
    const isActive = pathname === path;
    return `relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
      isActive
        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
        : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
    }`;
  };

  const navItems = [
    { href: "/", icon: "🏠", label: "Start" },
    { href: "/shop", icon: "🛒", label: "Shop" },
    { href: "/profile", icon: "👤", label: "Profil" },
  ];

  return (
    <nav className="w-full bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800 z-50 shadow-lg">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
              🐍
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                SNAKE GAME
              </h1>
              <p className="text-xs text-zinc-500">Sammle Äpfel & werde länger!</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Coin Display */}
          <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 px-4 py-2 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪙</span>
              <div>
                <p className="text-xs text-zinc-400">Münzen</p>
                <p className="text-lg font-bold text-amber-400">{stats.totalCoins}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
