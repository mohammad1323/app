"use client"

import { useState } from "react"
import { NavBar } from "@/app/components/nav-bar"
import { Button } from "@/app/components/ui/button"
import { useGameStore, type SnakeSkin, type FoodSkin } from "@/app/lib/game-store"
import { Check, Coins, Lock, Sparkles } from "lucide-react"
import { cn } from "@/app/lib/utils"

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<"snake" | "food">("snake")
  const { profile, snakeSkins, foodSkins, buySnakeSkin, equipSnakeSkin, buyFoodSkin, equipFoodSkin } = useGameStore()

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Shop</h1>
          <p className="text-muted-foreground">
            Customize your game with unique skins and styles
          </p>
        </div>

        {/* Balance Card */}
        <div className="mb-8 flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-yellow-500/10 p-3">
              <Coins className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Balance</p>
              <p className="text-2xl font-bold tabular-nums">{profile.coins} Coins</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Earn coins by playing games
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-lg bg-secondary/50 p-1">
          <button
            onClick={() => setActiveTab("snake")}
            className={cn(
              "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
              activeTab === "snake"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Snake Skins
          </button>
          <button
            onClick={() => setActiveTab("food")}
            className={cn(
              "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
              activeTab === "food"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Food Skins
          </button>
        </div>

        {/* Skin Grid */}
        {activeTab === "snake" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snakeSkins.map((skin) => (
              <SnakeSkinCard
                key={skin.id}
                skin={skin}
                canAfford={profile.coins >= skin.price}
                onBuy={() => buySnakeSkin(skin.id)}
                onEquip={() => equipSnakeSkin(skin.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {foodSkins.map((skin) => (
              <FoodSkinCard
                key={skin.id}
                skin={skin}
                canAfford={profile.coins >= skin.price}
                onBuy={() => buyFoodSkin(skin.id)}
                onEquip={() => equipFoodSkin(skin.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function SnakeSkinCard({
  skin,
  canAfford,
  onBuy,
  onEquip,
}: {
  skin: SnakeSkin
  canAfford: boolean
  onBuy: () => void
  onEquip: () => void
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 transition-all",
        skin.equipped
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-border hover:border-border/80"
      )}
    >
      {skin.equipped && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
          <Check className="h-3 w-3" />
          Equipped
        </div>
      )}

      {/* Preview */}
      <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-secondary/50">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-md transition-all"
              style={{
                backgroundColor: i === 0 ? skin.headColor : skin.bodyColor,
                opacity: 1 - i * 0.15,
                boxShadow: i === 0 ? `0 0 20px ${skin.glowColor}` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <h3 className="mb-1 font-semibold">{skin.name}</h3>
      
      {/* Price / Actions */}
      {skin.owned ? (
        <Button
          onClick={onEquip}
          disabled={skin.equipped}
          variant={skin.equipped ? "secondary" : "default"}
          className="mt-3 w-full"
        >
          {skin.equipped ? "Equipped" : "Equip"}
        </Button>
      ) : (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold tabular-nums">{skin.price}</span>
          </div>
          <Button
            onClick={onBuy}
            disabled={!canAfford}
            size="sm"
            className="gap-1.5"
          >
            {canAfford ? (
              <>
                <Sparkles className="h-4 w-4" />
                Buy
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Locked
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

function FoodSkinCard({
  skin,
  canAfford,
  onBuy,
  onEquip,
}: {
  skin: FoodSkin
  canAfford: boolean
  onBuy: () => void
  onEquip: () => void
}) {
  const renderShape = () => {
    const baseStyle = {
      backgroundColor: skin.color,
      boxShadow: `0 0 20px ${skin.glowColor}`,
    }

    switch (skin.shape) {
      case "circle":
        return <div className="h-10 w-10 rounded-full" style={baseStyle} />
      case "diamond":
        return <div className="h-8 w-8 rotate-45 rounded-sm" style={baseStyle} />
      case "star":
        return (
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill={skin.color} style={{ filter: `drop-shadow(0 0 10px ${skin.glowColor})` }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      default:
        return <div className="h-8 w-8 rounded-md" style={baseStyle} />
    }
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 transition-all",
        skin.equipped
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-border hover:border-border/80"
      )}
    >
      {skin.equipped && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
          <Check className="h-3 w-3" />
          Equipped
        </div>
      )}

      {/* Preview */}
      <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-secondary/50">
        {renderShape()}
      </div>

      {/* Info */}
      <h3 className="mb-1 font-semibold">{skin.name}</h3>
      
      {/* Price / Actions */}
      {skin.owned ? (
        <Button
          onClick={onEquip}
          disabled={skin.equipped}
          variant={skin.equipped ? "secondary" : "default"}
          className="mt-3 w-full"
        >
          {skin.equipped ? "Equipped" : "Equip"}
        </Button>
      ) : (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold tabular-nums">{skin.price}</span>
          </div>
          <Button
            onClick={onBuy}
            disabled={!canAfford}
            size="sm"
            className="gap-1.5"
          >
            {canAfford ? (
              <>
                <Sparkles className="h-4 w-4" />
                Buy
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Locked
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
