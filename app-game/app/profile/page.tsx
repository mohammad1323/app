"use client";

import { useState } from "react";
import { useGameState } from "../hooks/useGameState";

const PROFILE_ICONS = [
  "👤",
  "🐍",
  "🎮",
  "⭐",
  "👑",
  "🔥",
  "💎",
  "🌟",
  "🎯",
  "🏆",
  "💪",
  "🚀",
];

export default function ProfilePage() {
  const { stats, updatePlayerName, updateProfileIcon } = useGameState();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(stats.playerName);
  const [showIconSelector, setShowIconSelector] = useState(false);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const getRank = () => {
    if (stats.bestScore >= 500)
      return { name: "Meister", icon: "👑", color: "text-yellow-400" };
    if (stats.bestScore >= 300)
      return { name: "Experte", icon: "⭐", color: "text-purple-400" };
    if (stats.bestScore >= 150)
      return { name: "Fortgeschritten", icon: "🎯", color: "text-blue-400" };
    if (stats.bestScore >= 50)
      return { name: "Anfänger", icon: "🌱", color: "text-green-400" };
    return { name: "Neuling", icon: "🌿", color: "text-zinc-400" };
  };

  const rank = getRank();

  const handleSaveName = () => {
    if (newName.trim()) {
      updatePlayerName(newName.trim());
      setIsEditingName(false);
    }
  };

  const achievements = [
    {
      id: "games10",
      label: "10 Spiele",
      icon: "🎮",
      condition: stats.gamesPlayed >= 10,
      progress: stats.gamesPlayed,
      target: 10,
    },
    {
      id: "games50",
      label: "50 Spiele",
      icon: "🎯",
      condition: stats.gamesPlayed >= 50,
      progress: stats.gamesPlayed,
      target: 50,
    },
    {
      id: "games100",
      label: "100 Spiele",
      icon: "🏅",
      condition: stats.gamesPlayed >= 100,
      progress: stats.gamesPlayed,
      target: 100,
    },
    {
      id: "score100",
      label: "100 Punkte",
      icon: "⭐",
      condition: stats.bestScore >= 100,
      progress: stats.bestScore,
      target: 100,
    },
    {
      id: "score250",
      label: "250 Punkte",
      icon: "🌟",
      condition: stats.bestScore >= 250,
      progress: stats.bestScore,
      target: 250,
    },
    {
      id: "score500",
      label: "500 Punkte",
      icon: "👑",
      condition: stats.bestScore >= 500,
      progress: stats.bestScore,
      target: 500,
    },
    {
      id: "apples50",
      label: "50 Äpfel",
      icon: "🍎",
      condition: stats.totalApplesEaten >= 50,
      progress: stats.totalApplesEaten,
      target: 50,
    },
    {
      id: "apples200",
      label: "200 Äpfel",
      icon: "🍏",
      condition: stats.totalApplesEaten >= 200,
      progress: stats.totalApplesEaten,
      target: 200,
    },
    {
      id: "apples500",
      label: "500 Äpfel",
      icon: "🍇",
      condition: stats.totalApplesEaten >= 500,
      progress: stats.totalApplesEaten,
      target: 500,
    },
    {
      id: "skins4",
      label: "Skin Sammler",
      icon: "🎨",
      condition: stats.ownedSkins.length >= 4,
      progress: stats.ownedSkins.length,
      target: 4,
    },
    {
      id: "skins10",
      label: "Skin Meister",
      icon: "🌈",
      condition: stats.ownedSkins.length >= 10,
      progress: stats.ownedSkins.length,
      target: 10,
    },
    {
      id: "time30",
      label: "30 Min Spielzeit",
      icon: "⏰",
      condition: stats.totalPlayTime >= 1800,
      progress: stats.totalPlayTime,
      target: 1800,
    },
    {
      id: "time60",
      label: "1 Stunde Spielzeit",
      icon: "⏱️",
      condition: stats.totalPlayTime >= 3600,
      progress: stats.totalPlayTime,
      target: 3600,
    },
    {
      id: "coins500",
      label: "500 Münzen",
      icon: "💰",
      condition: stats.totalCoins >= 500,
      progress: stats.totalCoins,
      target: 500,
    },
    {
      id: "coins1000",
      label: "1000 Münzen",
      icon: "💎",
      condition: stats.totalCoins >= 1000,
      progress: stats.totalCoins,
      target: 1000,
    },
  ];

  return (
    <div className="h-full w-full px-4 md:px-8 lg:px-12 py-4 md:py-8 overflow-auto bg-black">
      <div className="w-full h-full flex flex-col">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-4 md:gap-6 mb-4">
            <div
              className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-5xl md:text-6xl lg:text-7xl shadow-2xl shadow-emerald-500/50 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowIconSelector(true)}
            >
              {stats.profileIcon}
              <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-2 text-xs">
                ✏️
              </div>
            </div>
            <div className="flex-1">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSaveName()}
                    className="bg-zinc-800 border border-emerald-500 rounded-xl px-4 py-2 text-white text-2xl md:text-3xl font-bold flex-1"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-4 py-2 bg-emerald-500 rounded-xl text-white font-bold"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingName(false);
                      setNewName(stats.playerName);
                    }}
                    className="px-4 py-2 bg-zinc-800 rounded-xl text-white font-bold"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                    {stats.playerName}
                  </h1>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-zinc-400 hover:text-emerald-400 text-2xl transition-colors"
                  >
                    ✏️
                  </button>
                </div>
              )}
              <p className="text-base md:text-lg text-zinc-400 mt-2">
                Deine Spielstatistiken
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 flex-1 overflow-y-auto">
          <div className="bg-black/60 border border-zinc-800/50 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-3xl">👤</span> Informationen
            </h2>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-4 md:p-5 bg-zinc-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl">{rank.icon}</span>
                  <div>
                    <p className="text-xs md:text-sm text-zinc-400 mb-1">
                      Rang
                    </p>
                    <p
                      className={`font-semibold text-base md:text-lg ${rank.color}`}
                    >
                      {rank.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 md:p-5 bg-zinc-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl">🪙</span>
                  <div>
                    <p className="text-xs md:text-sm text-zinc-400 mb-1">
                      Münzen
                    </p>
                    <p className="font-semibold text-white text-base md:text-lg tabular-nums">
                      {stats.totalCoins}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 md:p-5 bg-zinc-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl">🎨</span>
                  <div>
                    <p className="text-xs md:text-sm text-zinc-400 mb-1">
                      Aktiver Skin
                    </p>
                    <p className="font-semibold text-white text-base md:text-lg capitalize">
                      {stats.selectedSkin}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 md:p-5 bg-zinc-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl">🏆</span>
                  <div>
                    <p className="text-xs md:text-sm text-zinc-400 mb-1">
                      Erfolge
                    </p>
                    <p className="font-semibold text-white text-base md:text-lg">
                      {achievements.filter((a) => a.condition).length} /{" "}
                      {achievements.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/60 border border-zinc-800/50 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-3xl">📊</span> Statistiken
            </h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4 md:p-5">
                <div className="text-3xl md:text-4xl mb-2">🎯</div>
                <p className="text-xs md:text-sm text-zinc-400 mb-2 font-medium">
                  Spiele
                </p>
                <p className="text-2xl md:text-3xl font-bold text-blue-400 tabular-nums">
                  {stats.gamesPlayed}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 md:p-5">
                <div className="text-3xl md:text-4xl mb-2">⭐</div>
                <p className="text-xs md:text-sm text-zinc-400 mb-2 font-medium">
                  Bester
                </p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-400 tabular-nums">
                  {stats.bestScore}
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-4 md:p-5">
                <div className="text-3xl md:text-4xl mb-2">🍎</div>
                <p className="text-xs md:text-sm text-zinc-400 mb-2 font-medium">
                  Äpfel
                </p>
                <p className="text-2xl md:text-3xl font-bold text-red-400 tabular-nums">
                  {stats.totalApplesEaten}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 md:p-5">
                <div className="text-3xl md:text-4xl mb-2">⏱️</div>
                <p className="text-xs md:text-sm text-zinc-400 mb-2 font-medium">
                  Zeit
                </p>
                <p className="text-lg md:text-xl font-bold text-purple-400 tabular-nums">
                  {formatTime(stats.totalPlayTime)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/60 border border-zinc-800/50 rounded-2xl p-5 md:p-6 backdrop-blur-sm overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-3xl">🏆</span> Erfolge
            </h2>
            <div className="space-y-2 md:space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 transition-all duration-200 ${
                    achievement.condition
                      ? "border-yellow-500/50 bg-yellow-500/10"
                      : "border-zinc-800 bg-zinc-900/30 opacity-60"
                  }`}
                >
                  <span className="text-2xl md:text-3xl">
                    {achievement.condition ? "🏅" : "🔒"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm md:text-base truncate">
                      {achievement.label}
                    </p>
                    <p className="text-xs md:text-sm text-zinc-400">
                      {achievement.condition
                        ? "Erreicht!"
                        : `${achievement.progress} / ${achievement.target}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showIconSelector && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowIconSelector(false)}
          >
            <div
              className="bg-black/95 border-2 border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Profilbild wählen
                </h2>
                <button
                  onClick={() => setShowIconSelector(false)}
                  className="text-zinc-400 hover:text-white text-2xl transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {PROFILE_ICONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => {
                      updateProfileIcon(icon);
                      setShowIconSelector(false);
                    }}
                    className={`p-4 rounded-xl text-4xl md:text-5xl transition-all duration-200 ${
                      stats.profileIcon === icon
                        ? "bg-emerald-500/20 border-2 border-emerald-500 scale-110"
                        : "bg-zinc-800/50 border-2 border-zinc-700 hover:border-zinc-600"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
