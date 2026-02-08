"use client";

import { useState, useEffect } from "react";

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="hidden md:block w-full bg-black/80 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-2 z-50">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span>📶</span>
          <span>100%</span>
        </div>
        <div className="font-mono font-semibold">{formatTime(time)}</div>
        <div className="flex items-center gap-2">
          <span>🔋</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
