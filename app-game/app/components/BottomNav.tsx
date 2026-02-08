"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const linkClass = (path: string) => {
    const isActive = pathname === path;
    return `relative flex flex-col items-center gap-1 text-sm transition-all duration-300 ${
      isActive
        ? "text-emerald-400 scale-110"
        : "text-zinc-400 hover:text-zinc-300"
    }`;
  };

  const navItems = [
    { href: "/", icon: "🏠", label: "Start" },
    { href: "/shop", icon: "🛒", label: "Shop" },
    { href: "/profile", icon: "👤", label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 z-40 shadow-2xl">
      <div className="flex justify-around py-4 px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={linkClass(item.href)}
          >
            <span className="text-2xl transition-transform duration-300">
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {pathname === item.href && (
              <div className="absolute -top-1 w-12 h-1 bg-emerald-400 rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
