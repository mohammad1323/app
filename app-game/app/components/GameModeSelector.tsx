"use client";

import { useState } from "react";

type GameMode = "classic" | "speed" | "survival";
type MapSize = "small" | "medium" | "large";

interface GameModeSelectorProps {
  onModeSelect: (mode: GameMode, mapSize: MapSize) => void;
}

export default function GameModeSelector({ onModeSelect }: GameModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>("classic");
  const [selectedMapSize, setSelectedMapSize] = useState<MapSize>("medium");

  const modes: { id: GameMode; label: string; icon: string; description: string }[] = [
    {
      id: "classic",
      label: "Klassisch",
      icon: "🐍",
      description: "Standard-Geschwindigkeit, entspanntes Spielen",
    },
    {
      id: "speed",
      label: "Schnell",
      icon: "⚡",
      description: "Hohe Geschwindigkeit, für Profis",
    },
    {
      id: "survival",
      label: "Überleben",
      icon: "🛡️",
      description: "Lange überleben, so viele Äpfel wie möglich",
    },
  ];

  const mapSizes: { id: MapSize; label: string; size: string }[] = [
    { id: "small", label: "Klein", size: "20x20" },
    { id: "medium", label: "Mittel", size: "30x30" },
    { id: "large", label: "Groß", size: "40x40" },
  ];

  return (
    <div className="space-y-6">
      {/* Game Modes */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🎮</span> Spielmodus
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedMode === mode.id
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{mode.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-white">{mode.label}</p>
                  <p className="text-sm text-zinc-400">{mode.description}</p>
                </div>
                {selectedMode === mode.id && (
                  <span className="text-emerald-400">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Sizes */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🗺️</span> Karten-Größe
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {mapSizes.map((map) => (
            <button
              key={map.id}
              onClick={() => setSelectedMapSize(map.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedMapSize === map.id
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              <p className="font-bold text-white mb-1">{map.label}</p>
              <p className="text-xs text-zinc-400">{map.size}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={() => onModeSelect(selectedMode, selectedMapSize)}
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold text-lg text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Spiel starten →
      </button>
    </div>
  );
}

