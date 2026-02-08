"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const linkClass = (path: string) => {
    const isActive = pathname === path;
    return `relative flex flex-col items-center gap-1 text-xs transition-all duration-200 ${
      isActive
        ? "text-emerald-400 scale-105"
        : "text-zinc-400 active:text-zinc-300"
    }`;
  };

  const navItems = [
    { href: "/", icon: "🏠", label: "Start" },
    { href: "/shop", icon: "🛒", label: "Shop" },
    { href: "/profile", icon: "👤", label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-zinc-800/50 z-40 shadow-2xl safe-area-inset-bottom">
      <div className="flex justify-around py-3 px-2 w-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={linkClass(item.href)}
          >
            <span className="text-2xl transition-transform duration-200 active:scale-90">
              {item.icon}
            </span>
            <span className="font-medium text-[10px]">{item.label}</span>
            {pathname === item.href && (
              <div className="absolute -top-0.5 w-10 h-0.5 bg-emerald-400 rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
