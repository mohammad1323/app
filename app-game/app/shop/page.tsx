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
  {
    id: "violet",
    name: "Violett",
    price: 85,
    icon: "🔮",
    color: "#8b5cf6",
    description: "Ein magischer violetter Snake",
  },
  {
    id: "emerald",
    name: "Smaragd",
    price: 90,
    icon: "💚",
    color: "#10b981",
    description: "Ein edler smaragdgrüner Snake",
  },
  {
    id: "crimson",
    name: "Karmesin",
    price: 95,
    icon: "❤️",
    color: "#dc2626",
    description: "Ein leidenschaftlicher karmesinroter Snake",
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
    <div className="h-full w-full px-4 md:px-8 lg:px-12 py-4 md:py-8 overflow-auto bg-black">
      <div className="w-full h-full flex flex-col">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-3">
            Shop
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400">
            Kaufe coole Skins für deinen Snake!
          </p>
        </div>

        <div className="mb-8 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 px-6 md:px-8 py-5 md:py-6 rounded-2xl backdrop-blur-sm max-w-md mx-auto w-full">
          <div className="flex items-center gap-4">
            <span className="text-4xl md:text-5xl">🪙</span>
            <div>
              <p className="text-sm md:text-base text-zinc-400">Deine Münzen</p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400 tabular-nums">
                {stats.totalCoins}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-8 flex-1 overflow-y-auto">
          {AVAILABLE_SKINS.map((skin) => {
            const isOwned = stats.ownedSkins.includes(skin.id);
            const isSelected = stats.selectedSkin === skin.id;
            const canAfford = stats.totalCoins >= skin.price || isOwned;

            return (
              <div
                key={skin.id}
                className={`bg-black/60 border-2 rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-200 active:scale-[0.98] ${
                  isSelected
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/30"
                    : "border-zinc-800"
                } ${!canAfford ? "opacity-60" : ""}`}
              >
                <div className="mb-5 flex items-center justify-center h-32 md:h-40 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="flex gap-2 md:gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 md:w-12 md:h-12 rounded"
                        style={{
                          backgroundColor: skin.color.includes("gradient")
                            ? `hsl(${i * 60}, 70%, 50%)`
                            : skin.color,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl md:text-4xl">{skin.icon}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-white flex-1">
                      {skin.name}
                    </h3>
                    {isSelected && (
                      <span className="text-emerald-400 text-sm font-semibold">
                        ✓ Aktiv
                      </span>
                    )}
                    {isOwned && !isSelected && (
                      <span className="text-zinc-400 text-sm">Besessen</span>
                    )}
                  </div>
                  <p className="text-sm md:text-base text-zinc-400">
                    {skin.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl">🪙</span>
                    <span
                      className={`text-lg md:text-xl font-bold ${
                        isOwned
                          ? "text-zinc-400 line-through"
                          : "text-amber-400"
                      }`}
                    >
                      {skin.price}
                    </span>
                    {isOwned && (
                      <span className="text-xs md:text-sm text-emerald-400 font-semibold">
                        Kostenlos
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handlePurchase(skin)}
                    disabled={!canAfford && !isOwned}
                    className={`px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? "bg-emerald-500 text-white"
                        : isOwned
                          ? "bg-zinc-800 text-white"
                          : canAfford
                            ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                            : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
                    }`}
                  >
                    {isSelected ? "Aktiv" : isOwned ? "Auswählen" : "Kaufen"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span>💡</span> Wie funktioniert es?
          </h3>
          <ul className="space-y-2 text-zinc-300 text-sm md:text-base">
            <li>• Spiele Snake, um Münzen zu verdienen</li>
            <li>• Kaufe Skins im Shop mit deinen Münzen</li>
            <li>• Wähle deinen Lieblings-Skin aus</li>
            <li>• Je besser du spielst, desto mehr Münzen bekommst du!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
