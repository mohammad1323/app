"use client";

import { useState } from "react";

type GameMode = "classic" | "speed" | "noWalls";
type MapSize = "small" | "medium" | "large";

interface GameModeSelectorProps {
  onModeSelect: (mode: GameMode, mapSize: MapSize) => void;
}

export default function GameModeSelector({
  onModeSelect,
}: GameModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>("classic");
  const [selectedMapSize, setSelectedMapSize] = useState<MapSize>("medium");

  const modes: {
    id: GameMode;
    label: string;
    icon: string;
    description: string;
  }[] = [
    {
      id: "classic",
      label: "Klassisch",
      icon: "🐍",
      description: "Standard-Geschwindigkeit, Wände tödlich",
    },
    {
      id: "speed",
      label: "Schnell",
      icon: "⚡",
      description: "Hohe Geschwindigkeit, für Profis",
    },
    {
      id: "noWalls",
      label: "Keine Wände",
      icon: "🌐",
      description: "Durch Wände gehen ",
    },
  ];

  const mapSizes: { id: MapSize; label: string; size: string }[] = [
    { id: "small", label: "Klein", size: "20x20" },
    { id: "medium", label: "Mittel", size: "25x25" },
    { id: "large", label: "Groß", size: "30x30" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>🎮</span> Spielmodus
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left active:scale-95 ${
                selectedMode === mode.id
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-800/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{mode.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-white text-base">{mode.label}</p>
                  <p className="text-xs text-zinc-400">{mode.description}</p>
                </div>
                {selectedMode === mode.id && (
                  <span className="text-emerald-400 text-xl">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span>🗺️</span> Karten-Größe
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {mapSizes.map((map) => (
            <button
              key={map.id}
              onClick={() => setSelectedMapSize(map.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
                selectedMapSize === map.id
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-800/30"
              }`}
            >
              <p className="font-bold text-white text-sm mb-1">{map.label}</p>
              <p className="text-[10px] text-zinc-400">{map.size}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onModeSelect(selectedMode, selectedMapSize)}
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold text-lg text-white shadow-lg shadow-emerald-500/50 active:scale-95 transition-all duration-200"
      >
        Spiel starten →
      </button>
    </div>
  );
}
