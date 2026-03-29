"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, RotateCcw, Pause } from "lucide-react"

type Position = { x: number; y: number }
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 10 })
  const [, setDirection] = useState<Direction>("RIGHT")
  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "gameOver">("idle")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const directionRef = useRef<Direction>("RIGHT")
  const gameLoopRef = useRef<number | null>(null)

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }]
    setSnake(initialSnake)
    setFood(generateFood(initialSnake))
    setDirection("RIGHT")
    directionRef.current = "RIGHT"
    setScore(0)
    setGameState("idle")
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
      gameLoopRef.current = null
    }
  }, [generateFood])

  const startGame = useCallback(() => {
    if (gameState === "gameOver") {
      resetGame()
    }
    setGameState("playing")
  }, [gameState, resetGame])

  const pauseGame = useCallback(() => {
    setGameState("paused")
  }, [])

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] }
      const currentDirection = directionRef.current

      switch (currentDirection) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState("gameOver")
        setHighScore((prev) => Math.max(prev, score))
        return prevSnake
      }

      // Check self collision
      if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameState("gameOver")
        setHighScore((prev) => Math.max(prev, score))
        return prevSnake
      }

      const newSnake = [head, ...prevSnake]

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [food, generateFood, score])

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    let lastTime = 0
    const gameLoop = (timestamp: number) => {
      if (timestamp - lastTime >= INITIAL_SPEED) {
        moveSnake()
        lastTime = timestamp
      }
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState, moveSnake])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#0a0a12"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#1a1a2e"
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, canvas.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(canvas.width, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw food with glow effect
    const foodGradient = ctx.createRadialGradient(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      0,
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE
    )
    foodGradient.addColorStop(0, "#ff6b9d")
    foodGradient.addColorStop(0.5, "#ff6b9d80")
    foodGradient.addColorStop(1, "transparent")
    ctx.fillStyle = foodGradient
    ctx.fillRect(
      food.x * CELL_SIZE - CELL_SIZE / 2,
      food.y * CELL_SIZE - CELL_SIZE / 2,
      CELL_SIZE * 2,
      CELL_SIZE * 2
    )

    ctx.fillStyle = "#ff6b9d"
    ctx.beginPath()
    ctx.roundRect(
      food.x * CELL_SIZE + 2,
      food.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4,
      4
    )
    ctx.fill()

    // Draw snake with glow effect
    snake.forEach((segment, index) => {
      const isHead = index === 0
      const alpha = 1 - index * 0.03
      
      // Glow effect for head
      if (isHead) {
        const glowGradient = ctx.createRadialGradient(
          segment.x * CELL_SIZE + CELL_SIZE / 2,
          segment.y * CELL_SIZE + CELL_SIZE / 2,
          0,
          segment.x * CELL_SIZE + CELL_SIZE / 2,
          segment.y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE * 1.5
        )
        glowGradient.addColorStop(0, "#22c55e80")
        glowGradient.addColorStop(1, "transparent")
        ctx.fillStyle = glowGradient
        ctx.fillRect(
          segment.x * CELL_SIZE - CELL_SIZE / 2,
          segment.y * CELL_SIZE - CELL_SIZE / 2,
          CELL_SIZE * 2,
          CELL_SIZE * 2
        )
      }

      // Snake body gradient
      const bodyColor = isHead ? "#22c55e" : `rgba(34, 197, 94, ${alpha})`
      ctx.fillStyle = bodyColor
      ctx.beginPath()
      ctx.roundRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        isHead ? 6 : 4
      )
      ctx.fill()

      // Inner highlight
      if (isHead) {
        ctx.fillStyle = "#4ade80"
        ctx.beginPath()
        ctx.roundRect(
          segment.x * CELL_SIZE + 4,
          segment.y * CELL_SIZE + 4,
          CELL_SIZE - 10,
          CELL_SIZE - 10,
          3
        )
        ctx.fill()
      }
    })

    // Draw game over overlay
    if (gameState === "gameOver") {
      ctx.fillStyle = "rgba(10, 10, 18, 0.85)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = "#ff6b9d"
      ctx.font = "bold 28px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20)
      
      ctx.fillStyle = "#ffffff"
      ctx.font = "16px sans-serif"
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 15)
    }

    // Draw paused overlay
    if (gameState === "paused") {
      ctx.fillStyle = "rgba(10, 10, 18, 0.75)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = "#22c55e"
      ctx.font = "bold 28px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2)
    }

    // Draw idle screen
    if (gameState === "idle") {
      ctx.fillStyle = "rgba(10, 10, 18, 0.6)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = "#22c55e"
      ctx.font = "bold 24px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("SNAKE", canvas.width / 2, canvas.height / 2 - 20)
      
      ctx.fillStyle = "#a1a1aa"
      ctx.font = "14px sans-serif"
      ctx.fillText("Press Play to Start", canvas.width / 2, canvas.height / 2 + 15)
    }
  }, [snake, food, gameState, score])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === "idle" || gameState === "gameOver") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault()
          startGame()
          return
        }
      }

      if (gameState === "playing") {
        if (e.key === " " || e.key === "Escape") {
          e.preventDefault()
          pauseGame()
          return
        }
      }

      if (gameState === "paused") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault()
          startGame()
          return
        }
      }

      const currentDir = directionRef.current
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault()
          if (currentDir !== "DOWN") {
            setDirection("UP")
            directionRef.current = "UP"
          }
          break
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault()
          if (currentDir !== "UP") {
            setDirection("DOWN")
            directionRef.current = "DOWN"
          }
          break
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault()
          if (currentDir !== "RIGHT") {
            setDirection("LEFT")
            directionRef.current = "LEFT"
          }
          break
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault()
          if (currentDir !== "LEFT") {
            setDirection("RIGHT")
            directionRef.current = "RIGHT"
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameState, startGame, pauseGame])

  const handleDirectionButton = (newDirection: Direction) => {
    const currentDir = directionRef.current
    if (
      (newDirection === "UP" && currentDir !== "DOWN") ||
      (newDirection === "DOWN" && currentDir !== "UP") ||
      (newDirection === "LEFT" && currentDir !== "RIGHT") ||
      (newDirection === "RIGHT" && currentDir !== "LEFT")
    ) {
      setDirection(newDirection)
      directionRef.current = newDirection
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Score Display */}
      <div className="flex w-full max-w-[400px] items-center justify-between px-2">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Score</span>
          <span className="text-3xl font-bold text-primary tabular-nums">{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">High Score</span>
          <span className="text-3xl font-bold text-accent tabular-nums">{highScore}</span>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative rounded-xl border-2 border-border bg-card p-2 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="rounded-lg"
        />
      </div>

      {/* Game Controls */}
      <div className="flex gap-3">
        {gameState === "playing" ? (
          <Button
            onClick={pauseGame}
            size="lg"
            variant="secondary"
            className="gap-2"
          >
            <Pause className="h-5 w-5" />
            Pause
          </Button>
        ) : (
          <Button
            onClick={startGame}
            size="lg"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Play className="h-5 w-5" />
            {gameState === "gameOver" ? "Play Again" : gameState === "paused" ? "Resume" : "Play"}
          </Button>
        )}
        <Button
          onClick={resetGame}
          size="lg"
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="h-5 w-5" />
          Reset
        </Button>
      </div>

      {/* Mobile Direction Buttons */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <Button
          variant="secondary"
          size="icon"
          className="h-14 w-14"
          onClick={() => handleDirectionButton("UP")}
          disabled={gameState !== "playing"}
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
        <div />
        <Button
          variant="secondary"
          size="icon"
          className="h-14 w-14"
          onClick={() => handleDirectionButton("LEFT")}
          disabled={gameState !== "playing"}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-14 w-14"
          onClick={() => handleDirectionButton("DOWN")}
          disabled={gameState !== "playing"}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-14 w-14"
          onClick={() => handleDirectionButton("RIGHT")}
          disabled={gameState !== "playing"}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <p className="hidden md:block">
          Use <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-xs">Arrow Keys</kbd> or{" "}
          <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-xs">WASD</kbd> to move
        </p>
        <p className="md:hidden">Tap the arrow buttons to move</p>
      </div>
    </div>
  )
}
