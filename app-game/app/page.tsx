"use client"

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { NavBar } from "@/app/components/nav-bar"
import { useGameStore } from "@/app/lib/game-store"
import { Play, ShoppingBag, User, Trophy, Zap, Target, Gamepad2 } from "lucide-react"

export default function HomePage() {
  const { profile, stats } = useGameStore()

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24 md:pb-8">
        {/* Hero Section */}
        <section className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              Level {profile.level} Player
            </div>
            
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
            
            <p className="mb-8 max-w-xl text-lg text-muted-foreground">
              Ready to beat your high score? Collect coins, unlock new skins, and climb the ranks.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90">
                <Link href="/play">
                  <Play className="h-5 w-5" />
                  Play Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/shop">
                  <ShoppingBag className="h-5 w-5" />
                  Visit Shop
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              icon={Gamepad2}
              label="Games Played"
              value={stats.gamesPlayed}
              color="text-primary"
            />
            <StatCard
              icon={Trophy}
              label="High Score"
              value={stats.highScore}
              color="text-yellow-500"
            />
            <StatCard
              icon={Target}
              label="Total Score"
              value={stats.totalScore}
              color="text-accent"
            />
            <StatCard
              icon={Zap}
              label="Longest Snake"
              value={stats.longestSnake}
              color="text-blue-500"
            />
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="mb-6 text-xl font-semibold">Quick Access</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <QuickLinkCard
              href="/play"
              icon={Play}
              title="Play Game"
              description="Start a new game and climb the leaderboard"
              color="bg-primary/10 text-primary"
            />
            <QuickLinkCard
              href="/shop"
              icon={ShoppingBag}
              title="Shop"
              description="Browse and unlock new snake skins"
              color="bg-accent/10 text-accent"
            />
            <QuickLinkCard
              href="/profile"
              icon={User}
              title="Profile"
              description="View achievements and customize your profile"
              color="bg-blue-500/10 text-blue-500"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  color: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 hover:shadow-lg">
      <div className={`mb-3 inline-flex rounded-lg bg-secondary p-2.5 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold tabular-nums">{value.toLocaleString()}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function QuickLinkCard({
  href,
  icon: Icon,
  title,
  description,
  color,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className={`rounded-lg p-3 ${color} transition-transform group-hover:scale-110`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}
