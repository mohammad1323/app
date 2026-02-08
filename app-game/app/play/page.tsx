"use client";

import { useState } from "react";

export default function PlayPage() {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const handleStart = () => {
    setIsPlaying(true);
    // Game logic would go here
  };

  return (
    <div className="h-full w-full px-8 py-8">
      <div className="max-w-[1920px] mx-auto h-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-3">
            Spiel starten
          </h1>
          <p className="text-xl text-zinc-400">Bereit für eine neue Herausforderung?</p>
        </div>

        {/* Game Area - Full Width Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-150px)]">
          {/* Main Game Area */}
          <div className="lg:col-span-2 bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl flex flex-col">
          {!isPlaying ? (
            <div className="flex-1 flex items-center justify-center text-center space-y-6">
              <div>
                <div className="text-8xl mb-6 animate-pulse">🎮</div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Bereit zum Spielen?
                </h2>
                <p className="text-xl text-zinc-400 mb-8">
                  Klicke auf Start, um dein Abenteuer zu beginnen!
                </p>
                <button
                  onClick={handleStart}
                  className="px-12 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-xl shadow-xl shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Spiel starten
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score and Timer */}
              <div className="flex justify-between items-center">
                <div className="bg-zinc-800/50 rounded-xl px-6 py-3 border border-zinc-700/50">
                  <p className="text-xs text-zinc-400 mb-1">Punkte</p>
                  <p className="text-3xl font-bold text-emerald-400">{score}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl px-6 py-3 border border-zinc-700/50">
                  <p className="text-xs text-zinc-400 mb-1">Zeit</p>
                  <p className="text-3xl font-bold text-blue-400">{timeLeft}s</p>
                </div>
              </div>

              {/* Game Content */}
              <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-700/30 flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-6">🎯</div>
                  <p className="text-xl text-zinc-400 mb-2">Spiel läuft...</p>
                  <p className="text-sm text-zinc-500">
                    Spielmechanik wird hier implementiert
                  </p>
                </div>
              </div>

              {/* Game Controls */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setScore(0);
                    setTimeLeft(60);
                  }}
                  className="flex-1 py-3 px-6 rounded-xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all duration-300 border border-zinc-700/50"
                >
                  Beenden
                </button>
                <button
                  onClick={() => setScore(score + 10)}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  +10 Punkte
                </button>
              </div>
            </div>
          )}
          </div>

          {/* Sidebar - Instructions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 rounded-3xl p-6 backdrop-blur-sm shadow-2xl h-full">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span> Tipps & Anleitung
              </h3>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Sammle so viele Punkte wie möglich</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Achte auf die verbleibende Zeit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Verbessere dein bestes Ergebnis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
