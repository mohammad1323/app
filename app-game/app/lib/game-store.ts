"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SnakeSkin = {
  id: string
  name: string
  price: number
  headColor: string
  bodyColor: string
  glowColor: string
  owned: boolean
  equipped: boolean
}

export type FoodSkin = {
  id: string
  name: string
  price: number
  color: string
  glowColor: string
  shape: "circle" | "square" | "diamond" | "star"
  owned: boolean
  equipped: boolean
}

export type Achievement = {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  target: number
}

export type GameStats = {
  gamesPlayed: number
  totalScore: number
  highScore: number
  totalFoodEaten: number
  longestSnake: number
  totalPlayTime: number
}

export type PlayerProfile = {
  name: string
  avatar: string
  coins: number
  level: number
  xp: number
}

type GameStore = {
  profile: PlayerProfile
  stats: GameStats
  snakeSkins: SnakeSkin[]
  foodSkins: FoodSkin[]
  achievements: Achievement[]
  
  // Profile actions
  updateProfile: (profile: Partial<PlayerProfile>) => void
  addCoins: (amount: number) => void
  addXp: (amount: number) => void
  
  // Stats actions
  updateStats: (stats: Partial<GameStats>) => void
  recordGame: (score: number, foodEaten: number, snakeLength: number, playTime: number) => void
  
  // Skin actions
  buySnakeSkin: (skinId: string) => boolean
  equipSnakeSkin: (skinId: string) => void
  buyFoodSkin: (skinId: string) => boolean
  equipFoodSkin: (skinId: string) => void
  getEquippedSnakeSkin: () => SnakeSkin | undefined
  getEquippedFoodSkin: () => FoodSkin | undefined
  
  // Achievement actions
  checkAchievements: () => void
  unlockAchievement: (achievementId: string) => void
}

const defaultSnakeSkins: SnakeSkin[] = [
  {
    id: "classic",
    name: "Classic Green",
    price: 0,
    headColor: "#22c55e",
    bodyColor: "#22c55e",
    glowColor: "#22c55e80",
    owned: true,
    equipped: true,
  },
  {
    id: "neon-blue",
    name: "Neon Blue",
    price: 100,
    headColor: "#3b82f6",
    bodyColor: "#3b82f6",
    glowColor: "#3b82f680",
    owned: false,
    equipped: false,
  },
  {
    id: "fire",
    name: "Fire",
    price: 200,
    headColor: "#f97316",
    bodyColor: "#ef4444",
    glowColor: "#f9731680",
    owned: false,
    equipped: false,
  },
  {
    id: "purple-haze",
    name: "Purple Haze",
    price: 250,
    headColor: "#a855f7",
    bodyColor: "#7c3aed",
    glowColor: "#a855f780",
    owned: false,
    equipped: false,
  },
  {
    id: "golden",
    name: "Golden",
    price: 500,
    headColor: "#fbbf24",
    bodyColor: "#f59e0b",
    glowColor: "#fbbf2480",
    owned: false,
    equipped: false,
  },
  {
    id: "rainbow",
    name: "Rainbow",
    price: 1000,
    headColor: "#ec4899",
    bodyColor: "#8b5cf6",
    glowColor: "#ec489980",
    owned: false,
    equipped: false,
  },
]

const defaultFoodSkins: FoodSkin[] = [
  {
    id: "classic",
    name: "Classic Pink",
    price: 0,
    color: "#ff6b9d",
    glowColor: "#ff6b9d80",
    shape: "square",
    owned: true,
    equipped: true,
  },
  {
    id: "apple",
    name: "Red Apple",
    price: 75,
    color: "#ef4444",
    glowColor: "#ef444480",
    shape: "circle",
    owned: false,
    equipped: false,
  },
  {
    id: "diamond",
    name: "Diamond",
    price: 150,
    color: "#06b6d4",
    glowColor: "#06b6d480",
    shape: "diamond",
    owned: false,
    equipped: false,
  },
  {
    id: "star",
    name: "Golden Star",
    price: 300,
    color: "#fbbf24",
    glowColor: "#fbbf2480",
    shape: "star",
    owned: false,
    equipped: false,
  },
]

const defaultAchievements: Achievement[] = [
  {
    id: "first-game",
    name: "First Steps",
    description: "Play your first game",
    icon: "gamepad",
    unlocked: false,
    progress: 0,
    target: 1,
  },
  {
    id: "score-100",
    name: "Century",
    description: "Score 100 points in a single game",
    icon: "target",
    unlocked: false,
    progress: 0,
    target: 100,
  },
  {
    id: "score-500",
    name: "High Roller",
    description: "Score 500 points in a single game",
    icon: "trophy",
    unlocked: false,
    progress: 0,
    target: 500,
  },
  {
    id: "games-10",
    name: "Regular Player",
    description: "Play 10 games",
    icon: "repeat",
    unlocked: false,
    progress: 0,
    target: 10,
  },
  {
    id: "games-50",
    name: "Dedicated",
    description: "Play 50 games",
    icon: "flame",
    unlocked: false,
    progress: 0,
    target: 50,
  },
  {
    id: "food-100",
    name: "Hungry",
    description: "Eat 100 food items total",
    icon: "utensils",
    unlocked: false,
    progress: 0,
    target: 100,
  },
  {
    id: "snake-20",
    name: "Long Boy",
    description: "Grow your snake to 20 segments",
    icon: "ruler",
    unlocked: false,
    progress: 0,
    target: 20,
  },
  {
    id: "collector",
    name: "Collector",
    description: "Own 5 skins",
    icon: "palette",
    unlocked: false,
    progress: 0,
    target: 5,
  },
]

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      profile: {
        name: "Player",
        avatar: "snake",
        coins: 50,
        level: 1,
        xp: 0,
      },
      stats: {
        gamesPlayed: 0,
        totalScore: 0,
        highScore: 0,
        totalFoodEaten: 0,
        longestSnake: 1,
        totalPlayTime: 0,
      },
      snakeSkins: defaultSnakeSkins,
      foodSkins: defaultFoodSkins,
      achievements: defaultAchievements,

      updateProfile: (newProfile) =>
        set((state) => ({
          profile: { ...state.profile, ...newProfile },
        })),

      addCoins: (amount) =>
        set((state) => ({
          profile: { ...state.profile, coins: state.profile.coins + amount },
        })),

      addXp: (amount) => {
        const state = get()
        const newXp = state.profile.xp + amount
        const xpForNextLevel = state.profile.level * 100
        
        if (newXp >= xpForNextLevel) {
          set({
            profile: {
              ...state.profile,
              level: state.profile.level + 1,
              xp: newXp - xpForNextLevel,
            },
          })
        } else {
          set({
            profile: { ...state.profile, xp: newXp },
          })
        }
      },

      updateStats: (newStats) =>
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        })),

      recordGame: (score, foodEaten, snakeLength, playTime) => {
        const state = get()
        const newStats = {
          gamesPlayed: state.stats.gamesPlayed + 1,
          totalScore: state.stats.totalScore + score,
          highScore: Math.max(state.stats.highScore, score),
          totalFoodEaten: state.stats.totalFoodEaten + foodEaten,
          longestSnake: Math.max(state.stats.longestSnake, snakeLength),
          totalPlayTime: state.stats.totalPlayTime + playTime,
        }
        
        set({ stats: newStats })
        
        // Add coins and XP based on score
        get().addCoins(Math.floor(score / 10))
        get().addXp(Math.floor(score / 5))
        
        // Check achievements
        get().checkAchievements()
      },

      buySnakeSkin: (skinId) => {
        const state = get()
        const skin = state.snakeSkins.find((s) => s.id === skinId)
        
        if (!skin || skin.owned || state.profile.coins < skin.price) {
          return false
        }

        set({
          profile: { ...state.profile, coins: state.profile.coins - skin.price },
          snakeSkins: state.snakeSkins.map((s) =>
            s.id === skinId ? { ...s, owned: true } : s
          ),
        })
        
        get().checkAchievements()
        return true
      },

      equipSnakeSkin: (skinId) => {
        const state = get()
        const skin = state.snakeSkins.find((s) => s.id === skinId)
        
        if (!skin || !skin.owned) return

        set({
          snakeSkins: state.snakeSkins.map((s) => ({
            ...s,
            equipped: s.id === skinId,
          })),
        })
      },

      buyFoodSkin: (skinId) => {
        const state = get()
        const skin = state.foodSkins.find((s) => s.id === skinId)
        
        if (!skin || skin.owned || state.profile.coins < skin.price) {
          return false
        }

        set({
          profile: { ...state.profile, coins: state.profile.coins - skin.price },
          foodSkins: state.foodSkins.map((s) =>
            s.id === skinId ? { ...s, owned: true } : s
          ),
        })
        
        get().checkAchievements()
        return true
      },

      equipFoodSkin: (skinId) => {
        const state = get()
        const skin = state.foodSkins.find((s) => s.id === skinId)
        
        if (!skin || !skin.owned) return

        set({
          foodSkins: state.foodSkins.map((s) => ({
            ...s,
            equipped: s.id === skinId,
          })),
        })
      },

      getEquippedSnakeSkin: () => {
        return get().snakeSkins.find((s) => s.equipped)
      },

      getEquippedFoodSkin: () => {
        return get().foodSkins.find((s) => s.equipped)
      },

      checkAchievements: () => {
        const state = get()
        const { stats, snakeSkins, foodSkins } = state
        const ownedSkins = snakeSkins.filter((s) => s.owned).length + foodSkins.filter((s) => s.owned).length

        const updatedAchievements = state.achievements.map((achievement) => {
          let progress = achievement.progress

          switch (achievement.id) {
            case "first-game":
              progress = Math.min(stats.gamesPlayed, 1)
              break
            case "score-100":
              progress = Math.min(stats.highScore, 100)
              break
            case "score-500":
              progress = Math.min(stats.highScore, 500)
              break
            case "games-10":
              progress = Math.min(stats.gamesPlayed, 10)
              break
            case "games-50":
              progress = Math.min(stats.gamesPlayed, 50)
              break
            case "food-100":
              progress = Math.min(stats.totalFoodEaten, 100)
              break
            case "snake-20":
              progress = Math.min(stats.longestSnake, 20)
              break
            case "collector":
              progress = Math.min(ownedSkins, 5)
              break
          }

          return {
            ...achievement,
            progress,
            unlocked: progress >= achievement.target,
          }
        })

        set({ achievements: updatedAchievements })
      },

      unlockAchievement: (achievementId) =>
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === achievementId ? { ...a, unlocked: true } : a
          ),
        })),
    }),
    {
      name: "snake-game-storage",
    }
  )
)
