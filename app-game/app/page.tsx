"use client";

import { useState, useEffect } from "react";
import SnakeGame from "./components/SnakeGame";
import GameModeSelector from "./components/GameModeSelector";
import { useGameState } from "./hooks/useGameState";

type GameModeType = "classic" | "speed" | "noWalls";
type MapSizeType = "small" | "medium" | "large";

export default function HomePage() {
  const { stats, updateGameResult } = useGameState();
  const [gameMode, setGameMode] = useState<GameModeType>("classic");
  const [mapSize, setMapSize] = useState<MapSizeType>("medium");
  const [showGame, setShowGame] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);

  useEffect(() => {
    if (showGame) {
      document.body.style.overflow = "hidden";

      const navs = document.querySelectorAll("nav");
      navs.forEach((nav) => {
        (nav as HTMLElement).style.display = "none";
      });
    } else {
      document.body.style.overflow = "";

      const navs = document.querySelectorAll("nav");
      navs.forEach((nav) => {
        (nav as HTMLElement).style.display = "";
      });
    }
    return () => {
      document.body.style.overflow = "";
      const navs = document.querySelectorAll("nav");
      navs.forEach((nav) => {
        (nav as HTMLElement).style.display = "";
      });
    };
  }, [showGame]);

  const handleModeSelect = (mode: GameModeType, size: MapSizeType) => {
    setGameMode(mode);
    setMapSize(size);
    setShowModeSelector(false);
    setShowGame(true);
  };

  const handleGameEnd = (gameStats: {
    score: number;
    applesEaten: number;
    gameTime: number;
  }) => {
    const coinsEarned = updateGameResult(
      gameStats.score,
      gameStats.applesEaten,
      gameStats.gameTime,
    );
  };

  if (showGame) {
    return (
      <div
        className="fixed inset-0 w-screen h-screen bg-black"
        style={{ width: "100vw", height: "100vh" }}
      >
        <SnakeGame
          selectedSkin={stats.selectedSkin}
          mapSize={mapSize}
          gameMode={gameMode}
          onGameEnd={handleGameEnd}
          onBack={() => setShowGame(false)}
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full px-4 md:px-8 py-4 md:py-8 overflow-auto bg-black">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">
            Willkommen!
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400">
            Bereit für dein nächstes Abenteuer?
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 w-full max-w-2xl">
          <div className="bg-black/60 border border-blue-500/30 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-xs md:text-sm">Spiele</span>
              <span className="text-2xl md:text-3xl">🎯</span>
            </div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 tabular-nums">
              {stats.gamesPlayed}
            </p>
          </div>
          <div className="bg-black/60 border border-yellow-500/30 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-xs md:text-sm">Bester</span>
              <span className="text-2xl md:text-3xl">⭐</span>
            </div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 tabular-nums">
              {stats.bestScore}
            </p>
          </div>
          <div className="bg-black/60 border border-amber-500/30 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-xs md:text-sm">Münzen</span>
              <span className="text-2xl md:text-3xl"></span>
            </div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400 tabular-nums">
              {stats.totalCoins}
            </p>
          </div>
        </div>

        <div className="bg-black/60 border border-zinc-800/50 rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-sm mb-8 w-full max-w-2xl">
          <div className="text-center">
            <div className="text-8xl md:text-9xl lg:text-[12rem] mb-6">🐍</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Snake Spiel
            </h2>
            <p className="text-zinc-400 mb-10 text-base md:text-lg lg:text-xl">
              Sammle Äpfel und werde immer länger!
            </p>
            <button
              onClick={() => setShowModeSelector(true)}
              className="w-full py-6 md:py-8 lg:py-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl font-bold text-2xl md:text-3xl lg:text-4xl text-white shadow-xl shadow-emerald-500/50 active:scale-95 hover:shadow-emerald-500/70 transition-all duration-200"
            >
              🎮 Spiel starten
            </button>
          </div>
        </div>

        {showModeSelector && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModeSelector(false)}
          >
            <div
              className="bg-black/95 border-2 border-zinc-800 rounded-3xl p-6 md:p-8 w-full backdrop-blur-xl"
              style={{ maxWidth: "600px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Spiel starten
                </h2>
                <button
                  onClick={() => setShowModeSelector(false)}
                  className="text-zinc-400 hover:text-white text-2xl transition-colors"
                >
                  ×
                </button>
              </div>
              <GameModeSelector onModeSelect={handleModeSelect} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
