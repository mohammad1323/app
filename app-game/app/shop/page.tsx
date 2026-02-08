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
    color: "linear-gradient(45deg, #ef4444, #f59e0b, #10b981, #3b82f6, #a855f7)",
    description: "Ein bunter Regenbogen-Snake",
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
    <div className="h-full w-full px-8 py-8 overflow-auto">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-3">
            Shop
          </h1>
          <p className="text-xl text-zinc-400">Kaufe coole Skins für deinen Snake!</p>
        </div>

        {/* Coins Display */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 px-6 py-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🪙</span>
              <div>
                <p className="text-xs text-zinc-400">Deine Münzen</p>
                <p className="text-3xl font-bold text-amber-400">{stats.totalCoins}</p>
              </div>
            </div>
          </div>
          <div className="text-zinc-400">
            <p className="text-sm">💡 Tipp: Spiele Snake, um Münzen zu verdienen!</p>
          </div>
        </div>

        {/* Skins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_SKINS.map((skin) => {
            const isOwned = stats.ownedSkins.includes(skin.id);
            const isSelected = stats.selectedSkin === skin.id;
            const canAfford = stats.totalCoins >= skin.price || isOwned;

            return (
              <div
                key={skin.id}
                className={`bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border-2 rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 ${
                  isSelected
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/50"
                    : "border-zinc-700 hover:border-zinc-600"
                } ${!canAfford ? "opacity-60" : ""}`}
              >
                {/* Skin Preview */}
                <div className="mb-4 flex items-center justify-center h-32 bg-zinc-900/50 rounded-2xl border border-zinc-700/50">
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded"
                        style={{
                          backgroundColor: skin.color.includes("gradient")
                            ? `hsl(${i * 60}, 70%, 50%)`
                            : skin.color,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Skin Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{skin.icon}</span>
                    <h3 className="text-xl font-bold text-white">{skin.name}</h3>
                    {isSelected && (
                      <span className="ml-auto text-emerald-400 text-sm font-semibold">✓ Aktiv</span>
                    )}
                    {isOwned && !isSelected && (
                      <span className="ml-auto text-zinc-400 text-sm">Besessen</span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400">{skin.description}</p>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🪙</span>
                    <span
                      className={`text-lg font-bold ${
                        isOwned ? "text-zinc-400 line-through" : "text-amber-400"
                      }`}
                    >
                      {skin.price}
                    </span>
                    {isOwned && (
                      <span className="text-sm text-emerald-400 font-semibold">Kostenlos</span>
                    )}
                  </div>
                  <button
                    onClick={() => handlePurchase(skin)}
                    disabled={!canAfford && !isOwned}
                    className={`px-6 py-2 rounded-xl font-bold transition-all duration-300 ${
                      isSelected
                        ? "bg-emerald-500 text-white"
                        : isOwned
                        ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                        : canAfford
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:scale-105"
                        : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    }`}
                  >
                    {isSelected ? "Aktiv" : isOwned ? "Auswählen" : "Kaufen"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span>💡</span> Wie funktioniert es?
          </h3>
          <ul className="space-y-2 text-zinc-300">
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

