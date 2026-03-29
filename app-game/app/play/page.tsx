"use client"

import { NavBar } from "@/app/components/nav-bar"
import { SnakeGameEnhanced } from "@/app/components/snake-game-enhanced"

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24 md:pb-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            Play Snake
          </h1>
          <p className="text-muted-foreground">
            Use arrow keys or WASD to control. Collect food and avoid walls!
          </p>
        </div>
        
        <div className="flex justify-center">
          <SnakeGameEnhanced />
        </div>
      </main>
    </div>
  )
}
