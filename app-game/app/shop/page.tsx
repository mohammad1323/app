"use client";

import { useState } from "react";
import { useGameState } from "../hooks/useGameState";

interface Skin {
  id: string;
  name: string;
  price: number;
  icon: string;
  color: string;
  description: string;
}

const AVAILABLE_SKINS: Skin[] = [
  {
    id: "default",
    name: "Standard",
    price: 0,
    icon: "🐍",
    color: "#10b981",
    description: "Der klassische grüne Snake",
  },
  {
    id: "red",
    name: "Feuer",
    price: 50,
    icon: "🔥",
    color: "#ef4444",
    description: "Ein feuriger roter Snake",
  },
  {
    id: "blue",
    name: "Eis",
    price: 50,
    icon: "❄️",
    color: "#3b82f6",
    description: "Ein kühler blauer Snake",
  },
  {
    id: "purple",
    name: "Magie",
    price: 75,
    icon: "✨",
    color: "#a855f7",
    description: "Ein magischer lila Snake",
  },
  {
    id: "gold",
    name: "Gold",
    price: 100,
    icon: "👑",
    color: "#f59e0b",
    description: "Ein luxuriöser goldener Snake",
  },
  {
    id: "rainbow",
    name: "Regenbogen",
    price: 200,
    icon: "🌈",
    color:
      "linear-gradient(45deg, #ef4444, #f59e0b, #10b981, #3b82f6, #a855f7)",
    description: "Ein bunter Regenbogen-Snake",
  },
  {
    id: "pink",
    name: "Rosa",
    price: 60,
    icon: "💗",
    color: "#ec4899",
    description: "Ein süßer rosa Snake",
  },
  {
    id: "cyan",
    name: "Cyan",
    price: 60,
    icon: "💎",
    color: "#06b6d4",
    description: "Ein glänzender cyan Snake",
  },
  {
    id: "orange",
    name: "Orange",
    price: 70,
    icon: "🧡",
    color: "#f97316",
    description: "Ein energiegeladener oranger Snake",
  },
  {
    id: "lime",
    name: "Lime",
    price: 65,
    icon: "💚",
    color: "#84cc16",
    description: "Ein frischer limettengrüner Snake",
  },
  {
    id: "indigo",
    name: "Indigo",
    price: 80,
    icon: "💜",
    color: "#6366f1",
    description: "Ein mystischer indigo Snake",
  },
  {
    id: "teal",
    name: "Türkis",
    price: 70,
    icon: "🌊",
    color: "#14b8a6",
    description: "Ein ozeanblauer türkiser Snake",
  },
];

export default function ShopPage() {
  const { stats, purchaseSkin, selectSkin } = useGameState();
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);

  const handlePurchase = (skin: Skin) => {
    if (stats.ownedSkins.includes(skin.id)) {
      if (selectSkin(skin.id)) {
        setSelectedSkin(skin.id);
      }
      return;
    }

    if (purchaseSkin(skin.id, skin.price)) {
      selectSkin(skin.id);
      setSelectedSkin(skin.id);
    } else {
      alert("Nicht genug Münzen!");
    }
  };

  return (
    <div className="relative h-full w-full px-4 md:px-8 lg:px-12 py-4 md:py-8 overflow-auto bg-[#050508] min-h-0">
      {/* Arcade grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.3em] md:tracking-[0.4em] text-transparent mb-3"
            style={{
              color: "#00f5ff",
              textShadow: `
                0 0 10px #00f5ff,
                0 0 20px #00f5ff,
                0 0 40px #00f5ff,
                0 0 80px rgba(0, 245, 255, 0.5)
              `,
            }}
          >
            SHOP
          </h1>
          <p
            className="text-sm md:text-lg tracking-widest uppercase"
            style={{
              color: "rgba(255, 45, 149, 0.9)",
              textShadow: "0 0 12px rgba(255, 45, 149, 0.6)",
            }}
          >
            Skins für deinen Snake
          </p>
        </div>

        {/* Skin grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8 flex-1 overflow-y-auto">
          {AVAILABLE_SKINS.map((skin) => {
            const isOwned = stats.ownedSkins.includes(skin.id);
            const isSelected = stats.selectedSkin === skin.id;
            const canAfford = stats.totalCoins >= skin.price || isOwned;

            return (
              <div
                key={skin.id}
                className={`
                  relative rounded-xl p-5 md:p-6 transition-all duration-300
                  border-2 bg-[#0a0a0f]/90 backdrop-blur-sm
                  ${isSelected ? "scale-[1.02]" : ""}
                  ${!canAfford ? "opacity-50" : ""}
                `}
                style={{
                  borderColor: isSelected ? "#00f5ff" : "rgba(255, 45, 149, 0.35)",
                  boxShadow: isSelected
                    ? "0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.2), inset 0 0 30px rgba(0, 245, 255, 0.05)"
                    : "0 0 15px rgba(255, 45, 149, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                {/* Card glow line */}
                <div
                  className="absolute inset-x-0 top-0 h-px rounded-full opacity-80"
                  style={{
                    background: "linear-gradient(90deg, transparent, #00f5ff, transparent)",
                    boxShadow: "0 0 8px #00f5ff",
                  }}
                />

                {/* Preview area */}
                <div
                  className="mb-4 flex items-center justify-center h-28 md:h-36 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 245, 255, 0.25)",
                    boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="flex gap-1.5 md:gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-sm transition-transform hover:scale-110"
                        style={{
                          backgroundColor: skin.color.includes("gradient")
                            ? `hsl(${i * 60}, 70%, 50%)`
                            : skin.color,
                          boxShadow: skin.color.includes("gradient")
                            ? "none"
                            : `0 0 12px ${skin.color}, 0 0 24px ${skin.color}40`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                      {skin.icon}
                    </span>
                    <h3
                      className="text-lg md:text-xl font-bold flex-1 uppercase tracking-wider"
                      style={{
                        color: "#e4e4e7",
                        textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      {skin.name}
                    </h3>
                    {isSelected && (
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{
                          color: "#00f5ff",
                          textShadow: "0 0 8px #00f5ff",
                          backgroundColor: "rgba(0, 245, 255, 0.15)",
                        }}
                      >
                        Aktiv
                      </span>
                    )}
                    {isOwned && !isSelected && (
                      <span
                        className="text-xs text-zinc-500 uppercase tracking-wider"
                        style={{ textShadow: "0 0 6px rgba(255,255,255,0.1)" }}
                      >
                        Owned
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-zinc-500 leading-snug">
                    {skin.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-lg md:text-xl"
                      style={{ filter: "drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))" }}
                    >
                      🪙
                    </span>
                    <span
                      className={`text-base md:text-lg font-bold tabular-nums ${
                        isOwned ? "line-through text-zinc-500" : ""
                      }`}
                      style={
                        isOwned
                          ? {}
                          : {
                              color: "#fbbf24",
                              textShadow: "0 0 10px rgba(251, 191, 36, 0.7)",
                            }
                      }
                    >
                      {skin.price}
                    </span>
                    {isOwned && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          color: "#22c55e",
                          textShadow: "0 0 8px rgba(34, 197, 94, 0.6)",
                        }}
                      >
                        Free
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handlePurchase(skin)}
                    disabled={!canAfford && !isOwned}
                    className={`
                      px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider
                      transition-all duration-200 active:scale-95 border-2
                      ${!canAfford && !isOwned ? "cursor-not-allowed" : ""}
                    `}
                    style={
                      isSelected
                        ? {
                            color: "#000",
                            backgroundColor: "#00f5ff",
                            borderColor: "#00f5ff",
                            boxShadow: "0 0 15px #00f5ff, 0 0 30px rgba(0, 245, 255, 0.4)",
                          }
                        : isOwned
                          ? {
                              color: "#00f5ff",
                              backgroundColor: "transparent",
                              borderColor: "rgba(0, 245, 255, 0.5)",
                              boxShadow: "0 0 10px rgba(0, 245, 255, 0.2)",
                            }
                          : canAfford
                            ? {
                                color: "#ff2d95",
                                backgroundColor: "transparent",
                                borderColor: "rgba(255, 45, 149, 0.7)",
                                boxShadow: "0 0 12px rgba(255, 45, 149, 0.3)",
                              }
                            : {
                                color: "#3f3f46",
                                backgroundColor: "rgba(24, 24, 27, 0.8)",
                                borderColor: "#27272a",
                              }
                    }
                  >
                    {isSelected ? "Aktiv" : isOwned ? "Wählen" : "Kaufen"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
