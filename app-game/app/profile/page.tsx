"use client"

import { useState } from "react"
import { NavBar } from "@/app/components/nav-bar"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { useGameStore } from "@/app/lib/game-store"
import {
  Edit3,
  Check,
  X,
  Trophy,
  Gamepad2,
  Target,
  Zap,
  Clock,
  Award,
  Flame,
  Utensils,
  Ruler,
  Palette,
  Repeat,
  Lock,
} from "lucide-react"
import { cn } from "@/app/lib/utils"

const avatarOptions = [
  { id: "snake", color: "#22c55e" },
  { id: "fire", color: "#f97316" },
  { id: "ice", color: "#3b82f6" },
  { id: "purple", color: "#a855f7" },
  { id: "gold", color: "#fbbf24" },
  { id: "pink", color: "#ec4899" },
]

const achievementIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  gamepad: Gamepad2,
  target: Target,
  trophy: Trophy,
  repeat: Repeat,
  flame: Flame,
  utensils: Utensils,
  ruler: Ruler,
  palette: Palette,
}

export default function ProfilePage() {
  const { profile, stats, achievements, updateProfile } = useGameStore()
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(profile.name)
  const [activeSection, setActiveSection] = useState<"stats" | "achievements">("stats")

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateProfile({ name: tempName.trim() })
    }
    setIsEditingName(false)
  }

  const handleCancelEdit = () => {
    setTempName(profile.name)
    setIsEditingName(false)
  }

  const xpForNextLevel = profile.level * 100
  const xpProgress = (profile.xp / xpForNextLevel) * 100

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length
  const totalAchievements = achievements.length

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24 md:pb-8">
        {/* Profile Header */}
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-2xl text-3xl font-bold text-background shadow-lg md:h-28 md:w-28"
                  style={{
                    backgroundColor: avatarOptions.find((a) => a.id === profile.avatar)?.color || "#22c55e",
                    boxShadow: `0 0 40px ${avatarOptions.find((a) => a.id === profile.avatar)?.color}40`,
                  }}
                >
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background text-sm font-bold text-primary ring-2 ring-primary">
                  {profile.level}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                {/* Name */}
                <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="h-10 w-48 text-lg font-bold"
                        maxLength={20}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveName()
                          if (e.key === "Escape") handleCancelEdit()
                        }}
                      />
                      <Button size="icon" variant="ghost" onClick={handleSaveName} className="h-8 w-8 text-primary">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-8 w-8 text-muted-foreground">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold md:text-3xl">{profile.name}</h1>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsEditingName(true)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                <p className="mb-4 text-muted-foreground">Level {profile.level} Player</p>

                {/* XP Progress */}
                <div className="mb-4">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{profile.xp} / {xpForNextLevel} XP</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                </div>

                {/* Avatar Selection */}
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Profile Color</p>
                  <div className="flex gap-2">
                    {avatarOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => updateProfile({ avatar: option.id })}
                        className={cn(
                          "h-8 w-8 rounded-full transition-all",
                          profile.avatar === option.id && "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                        )}
                        style={{ backgroundColor: option.color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Tabs */}
        <div className="mb-6 flex gap-2 rounded-lg bg-secondary/50 p-1">
          <button
            onClick={() => setActiveSection("stats")}
            className={cn(
              "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
              activeSection === "stats"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveSection("achievements")}
            className={cn(
              "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
              activeSection === "achievements"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Achievements ({unlockedAchievements}/{totalAchievements})
          </button>
        </div>

        {/* Stats Section */}
        {activeSection === "stats" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard icon={Gamepad2} label="Games Played" value={stats.gamesPlayed} color="text-primary" />
            <StatCard icon={Trophy} label="High Score" value={stats.highScore} color="text-yellow-500" />
            <StatCard icon={Target} label="Total Score" value={stats.totalScore} color="text-accent" />
            <StatCard icon={Zap} label="Longest Snake" value={stats.longestSnake} color="text-blue-500" />
            <StatCard icon={Utensils} label="Total Food Eaten" value={stats.totalFoodEaten} color="text-orange-500" />
            <StatCard
              icon={Clock}
              label="Total Play Time"
              value={formatTime(stats.totalPlayTime)}
              isText
              color="text-cyan-500"
            />
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === "achievements" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement) => {
              const Icon = achievementIcons[achievement.icon] || Award
              const progress = Math.min((achievement.progress / achievement.target) * 100, 100)

              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "relative overflow-hidden rounded-xl border bg-card p-5 transition-all",
                    achievement.unlocked
                      ? "border-primary/50 shadow-lg shadow-primary/5"
                      : "border-border opacity-75"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "rounded-lg p-3",
                        achievement.unlocked ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {achievement.unlocked ? <Icon className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-semibold">{achievement.name}</h3>
                        {achievement.unlocked && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              achievement.unlocked ? "bg-primary" : "bg-muted-foreground/50"
                            )}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium tabular-nums text-muted-foreground">
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  isText = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number | string
  color: string
  isText?: boolean
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg">
      <div className={`mb-3 inline-flex rounded-lg bg-secondary p-3 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold tabular-nums">
        {isText ? value : (value as number).toLocaleString()}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}
