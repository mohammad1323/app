"use client";

import { useGameState } from "../hooks/useGameState";

export default function ProfilePage() {
  const { stats } = useGameState();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const getRank = () => {
    if (stats.bestScore >= 500) return { name: "Meister", icon: "👑", color: "text-yellow-400" };
    if (stats.bestScore >= 300) return { name: "Experte", icon: "⭐", color: "text-purple-400" };
    if (stats.bestScore >= 150) return { name: "Fortgeschritten", icon: "🎯", color: "text-blue-400" };
    if (stats.bestScore >= 50) return { name: "Anfänger", icon: "🌱", color: "text-green-400" };
    return { name: "Neuling", icon: "🌿", color: "text-zinc-400" };
  };

  const rank = getRank();

  return (
    <div className="h-full w-full px-8 py-8 overflow-auto">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-6xl shadow-2xl shadow-emerald-500/50">
              👤
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">
                MEIN PROFIL
              </h1>
              <p className="text-xl text-zinc-400">Deine Spielstatistiken und Erfolge</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 rounded-3xl p-6 backdrop-blur-sm shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-3xl">👤</span> Profilinformationen
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">👤</span>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Benutzername</p>
                      <p className="font-semibold text-white text-lg">Spieler</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{rank.icon}</span>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Rang</p>
                      <p className={`font-semibold text-lg ${rank.color}`}>{rank.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🪙</span>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Münzen</p>
                      <p className="font-semibold text-white text-lg">{stats.totalCoins}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🎨</span>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Aktiver Skin</p>
                      <p className="font-semibold text-white text-lg capitalize">{stats.selectedSkin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 rounded-3xl p-6 backdrop-blur-sm shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-3xl">📊</span> Statistiken
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">🎯</div>
                  <p className="text-xs text-zinc-400 mb-2 font-medium">Spiele gespielt</p>
                  <p className="text-4xl font-bold text-blue-400">{stats.gamesPlayed}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">⭐</div>
                  <p className="text-xs text-zinc-400 mb-2 font-medium">Bester Score</p>
                  <p className="text-4xl font-bold text-yellow-400">{stats.bestScore}</p>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">🍎</div>
                  <p className="text-xs text-zinc-400 mb-2 font-medium">Äpfel gesammelt</p>
                  <p className="text-4xl font-bold text-red-400">{stats.totalApplesEaten}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">⏱️</div>
                  <p className="text-xs text-zinc-400 mb-2 font-medium">Gesamtspielzeit</p>
                  <p className="text-2xl font-bold text-purple-400">{formatTime(stats.totalPlayTime)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Achievements & More */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 rounded-3xl p-6 backdrop-blur-sm shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-3xl">🏆</span> Erfolge
              </h2>
              <div className="space-y-3">
                <div
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    stats.gamesPlayed >= 10
                      ? "border-yellow-500/50 bg-yellow-500/10"
                      : "border-zinc-700 bg-zinc-800/30 opacity-50"
                  }`}
                >
                  <span className="text-3xl">{stats.gamesPlayed >= 10 ? "🏅" : "🔒"}</span>
                  <div>
                    <p className="font-semibold text-white">10 Spiele</p>
                    <p className="text-xs text-zinc-400">
                      {stats.gamesPlayed >= 10 ? "Erreicht!" : `${10 - stats.gamesPlayed} noch nötig`}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    stats.bestScore >= 100
                      ? "border-yellow-500/50 bg-yellow-500/10"
                      : "border-zinc-700 bg-zinc-800/30 opacity-50"
                  }`}
                >
                  <span className="text-3xl">{stats.bestScore >= 100 ? "🏅" : "🔒"}</span>
                  <div>
                    <p className="font-semibold text-white">100 Punkte</p>
                    <p className="text-xs text-zinc-400">
                      {stats.bestScore >= 100 ? "Erreicht!" : `${100 - stats.bestScore} noch nötig`}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    stats.totalApplesEaten >= 50
                      ? "border-yellow-500/50 bg-yellow-500/10"
                      : "border-zinc-700 bg-zinc-800/30 opacity-50"
                  }`}
                >
                  <span className="text-3xl">{stats.totalApplesEaten >= 50 ? "🏅" : "🔒"}</span>
                  <div>
                    <p className="font-semibold text-white">50 Äpfel</p>
                    <p className="text-xs text-zinc-400">
                      {stats.totalApplesEaten >= 50 ? "Erreicht!" : `${50 - stats.totalApplesEaten} noch nötig`}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    stats.ownedSkins.length >= 4
                      ? "border-yellow-500/50 bg-yellow-500/10"
                      : "border-zinc-700 bg-zinc-800/30 opacity-50"
                  }`}
                >
                  <span className="text-3xl">{stats.ownedSkins.length >= 4 ? "🏅" : "🔒"}</span>
                  <div>
                    <p className="font-semibold text-white">Skin Sammler</p>
                    <p className="text-xs text-zinc-400">
                      {stats.ownedSkins.length >= 4
                        ? "Erreicht!"
                        : `${4 - stats.ownedSkins.length} noch nötig`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
