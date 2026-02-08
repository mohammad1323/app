"use client";

import { useState } from "react";
import SnakeGame from "./components/SnakeGame";
import GameModeSelector from "./components/GameModeSelector";
import { useGameState } from "./hooks/useGameState";

type GameModeType = "classic" | "speed" | "survival";
type MapSizeType = "small" | "medium" | "large";

export default function HomePage() {
  const { stats, updateGameResult } = useGameState();
  const [gameMode, setGameMode] = useState<GameModeType>("classic");
  const [mapSize, setMapSize] = useState<MapSizeType>("medium");
  const [showGame, setShowGame] = useState(false);

  const handleModeSelect = (mode: GameModeType, size: MapSizeType) => {
    setGameMode(mode);
    setMapSize(size);
    setShowGame(true);
  };

  const handleGameEnd = (gameStats: { score: number; applesEaten: number; gameTime: number }) => {
    const coinsEarned = updateGameResult(
      gameStats.score,
      gameStats.applesEaten,
      gameStats.gameTime
    );
    // You could show a notification here about coins earned
  };

  if (showGame) {
    return (
      <div className="h-full w-full px-8 py-8 overflow-auto">
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Snake Spiel
              </h1>
              <p className="text-zinc-400 mt-1">Sammle Äpfel und werde länger!</p>
            </div>
            <button
              onClick={() => setShowGame(false)}
              className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-zinc-700 text-white transition-all duration-300"
            >
              Zurück
            </button>
          </div>
          <div className="flex justify-center">
            <SnakeGame
              selectedSkin={stats.selectedSkin}
              mapSize={mapSize}
              gameMode={gameMode}
              onGameEnd={handleGameEnd}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full px-8 py-8 overflow-auto">
      <div className="max-w-[1920px] mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">
            Willkommen zurück!
          </h1>
          <p className="text-xl text-zinc-400">Bereit für dein nächstes Abenteuer?</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-400 text-sm font-medium">Spiele gespielt</span>
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-4xl font-bold text-blue-400">{stats.gamesPlayed}</p>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-400 text-sm font-medium">Bester Score</span>
                  <span className="text-2xl">⭐</span>
                </div>
                <p className="text-4xl font-bold text-yellow-400">{stats.bestScore}</p>
              </div>
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-400 text-sm font-medium">Münzen</span>
                  <span className="text-2xl">🪙</span>
                </div>
                <p className="text-4xl font-bold text-amber-400">{stats.totalCoins}</p>
              </div>
            </div>
          </div>

          {/* Center Column - Game Mode Selection */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-7xl mb-4">🐍</div>
                <h2 className="text-3xl font-bold text-white mb-2">Snake Spiel</h2>
                <p className="text-zinc-400">Wähle deinen Spielmodus und starte!</p>
              </div>
              <GameModeSelector onModeSelect={handleModeSelect} />
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Schnellzugriff</h2>
              <div className="space-y-4">
                <a
                  href="/shop"
                  className="flex items-center justify-between p-5 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 hover:border-emerald-500/30 border border-transparent transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🛒</span>
                    <div>
                      <p className="font-semibold text-white text-lg">Shop</p>
                      <p className="text-xs text-zinc-400">Skins kaufen</p>
                    </div>
                  </div>
                  <span className="text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300">→</span>
                </a>
                <a
                  href="/profile"
                  className="flex items-center justify-between p-5 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 hover:border-emerald-500/30 border border-transparent transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👤</span>
                    <div>
                      <p className="font-semibold text-white text-lg">Profil</p>
                      <p className="text-xs text-zinc-400">Statistiken & Details</p>
                    </div>
                  </div>
                  <span className="text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
