"use client";

import { useState, useEffect } from "react";

export interface GameStats {
  gamesPlayed: number;
  bestScore: number;
  totalApplesEaten: number;
  totalCoins: number;
  totalPlayTime: number;
  selectedSkin: string;
  ownedSkins: string[];
  playerName: string;
  profileIcon: string;
}

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  bestScore: 0,
  totalApplesEaten: 0,
  totalCoins: 100,
  totalPlayTime: 0,
  selectedSkin: "default",
  ownedSkins: ["default"],
  playerName: "Spieler",
  profileIcon: "👤",
};

const STORAGE_KEY = "snake_game_stats";

export function useGameState() {
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setStats({ ...DEFAULT_STATS, ...parsed });
      } catch (e) {
        console.error("Failed to load game stats:", e);
      }
    }
  }, []);

  const saveStats = (newStats: Partial<GameStats>) => {
    const updated = { ...stats, ...newStats };
    setStats(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateGameResult = (
    score: number,
    applesEaten: number,
    gameTime: number,
  ) => {
    const coinsEarned = Math.floor(score / 10) + applesEaten * 2;
    saveStats({
      gamesPlayed: stats.gamesPlayed + 1,
      bestScore: Math.max(stats.bestScore, score),
      totalApplesEaten: stats.totalApplesEaten + applesEaten,
      totalCoins: stats.totalCoins + coinsEarned,
      totalPlayTime: stats.totalPlayTime + gameTime,
    });
    return coinsEarned;
  };

  const purchaseSkin = (skinId: string, price: number) => {
    if (stats.ownedSkins.includes(skinId)) {
      return false;
    }
    if (stats.totalCoins < price) {
      return false;
    }
    saveStats({
      totalCoins: stats.totalCoins - price,
      ownedSkins: [...stats.ownedSkins, skinId],
    });
    return true;
  };

  const selectSkin = (skinId: string) => {
    if (stats.ownedSkins.includes(skinId)) {
      saveStats({ selectedSkin: skinId });
      return true;
    }
    return false;
  };

  const updatePlayerName = (name: string) => {
    saveStats({ playerName: name });
  };

  const updateProfileIcon = (icon: string) => {
    saveStats({ profileIcon: icon });
  };

  return {
    stats,
    updateGameResult,
    purchaseSkin,
    selectSkin,
    saveStats,
    updatePlayerName,
    updateProfileIcon,
  };
}
