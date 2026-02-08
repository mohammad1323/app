"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface GameStats {
  score: number;
  applesEaten: number;
  gameTime: number;
}

export type GameMode = "classic" | "speed" | "survival";
export type MapSize = "small" | "medium" | "large";

interface SnakeGameProps {
  selectedSkin?: string;
  mapSize?: MapSize;
  gameMode?: GameMode;
  onGameEnd?: (stats: GameStats) => void;
}

const GRID_SIZES = {
  small: { width: 20, height: 20, cellSize: 25 },
  medium: { width: 30, height: 30, cellSize: 20 },
  large: { width: 40, height: 40, cellSize: 15 },
};

const GAME_SPEEDS = {
  classic: 150,
  speed: 80,
  survival: 120,
};

const SKIN_COLORS: Record<string, string> = {
  default: "#10b981",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#a855f7",
  gold: "#f59e0b",
  rainbow: "linear-gradient(45deg, #ef4444, #f59e0b, #10b981, #3b82f6, #a855f7)",
};

export default function SnakeGame({
  selectedSkin = "default",
  mapSize = "medium",
  gameMode = "classic",
  onGameEnd,
}: SnakeGameProps) {
  const gridConfig = GRID_SIZES[mapSize];
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [apple, setApple] = useState<Position>({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [applesEaten, setApplesEaten] = useState(0);
  const directionRef = useRef<Position>({ x: 1, y: 0 });
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateApple = useCallback((): Position => {
    let newApple: Position;
    do {
      newApple = {
        x: Math.floor(Math.random() * gridConfig.width),
        y: Math.floor(Math.random() * gridConfig.height),
      };
    } while (
      snake.some((segment) => segment.x === newApple.x && segment.y === newApple.y)
    );
    return newApple;
  }, [snake, gridConfig]);

  const checkCollision = useCallback(
    (head: Position): boolean => {
      // Wall collision
      if (
        head.x < 0 ||
        head.x >= gridConfig.width ||
        head.y < 0 ||
        head.y >= gridConfig.height
      ) {
        return true;
      }
      // Self collision
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          return true;
        }
      }
      return false;
    },
    [snake, gridConfig]
  );

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver || !isPlaying) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      const newDirection = directionRef.current;
      head.x += newDirection.x;
      head.y += newDirection.y;

      if (checkCollision(head)) {
        setIsGameOver(true);
        setIsPlaying(false);
        if (onGameEnd) {
          onGameEnd({
            score,
            applesEaten,
            gameTime,
          });
        }
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check if apple is eaten
      if (head.x === apple.x && head.y === apple.y) {
        setScore((prev) => prev + 10);
        setApplesEaten((prev) => prev + 1);
        setApple(generateApple());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [isPaused, isGameOver, isPlaying, apple, checkCollision, generateApple, score, applesEaten, gameTime, onGameEnd]);

  useEffect(() => {
    if (isPlaying && !isPaused && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEEDS[gameMode]);
      timeIntervalRef.current = setInterval(() => {
        setGameTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
        timeIntervalRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, [isPlaying, isPaused, isGameOver, moveSnake, gameMode]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isPlaying || isPaused || isGameOver) return;

      const key = e.key.toLowerCase();
      const currentDir = directionRef.current;

      switch (key) {
        case "arrowup":
        case "w":
          if (currentDir.y === 0) {
            directionRef.current = { x: 0, y: -1 };
            setDirection({ x: 0, y: -1 });
          }
          break;
        case "arrowdown":
        case "s":
          if (currentDir.y === 0) {
            directionRef.current = { x: 0, y: 1 };
            setDirection({ x: 0, y: 1 });
          }
          break;
        case "arrowleft":
        case "a":
          if (currentDir.x === 0) {
            directionRef.current = { x: -1, y: 0 };
            setDirection({ x: -1, y: 0 });
          }
          break;
        case "arrowright":
        case "d":
          if (currentDir.x === 0) {
            directionRef.current = { x: 1, y: 0 };
            setDirection({ x: 1, y: 0 });
          }
          break;
        case " ":
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    },
    [isPlaying, isPaused, isGameOver]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setApple(generateApple());
    setScore(0);
    setApplesEaten(0);
    setGameTime(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setIsGameOver(false);
    setIsPaused(false);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setScore(0);
    setApplesEaten(0);
    setGameTime(0);
  };

  const getSnakeColor = (index: number) => {
    if (selectedSkin === "rainbow") {
      const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"];
      return colors[index % colors.length];
    }
    return SKIN_COLORS[selectedSkin] || SKIN_COLORS.default;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Game Stats */}
      <div className="flex gap-4 w-full justify-center">
        <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-6 py-3 backdrop-blur-sm">
          <p className="text-xs text-zinc-400 mb-1">Punkte</p>
          <p className="text-2xl font-bold text-emerald-400">{score}</p>
        </div>
        <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-6 py-3 backdrop-blur-sm">
          <p className="text-xs text-zinc-400 mb-1">Äpfel</p>
          <p className="text-2xl font-bold text-red-400">{applesEaten}</p>
        </div>
        <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-6 py-3 backdrop-blur-sm">
          <p className="text-xs text-zinc-400 mb-1">Zeit</p>
          <p className="text-2xl font-bold text-blue-400">{formatTime(gameTime)}</p>
        </div>
      </div>

      {/* Game Board */}
      <div
        className="relative bg-zinc-900/50 border-2 border-zinc-700/50 rounded-2xl p-4 backdrop-blur-sm"
        style={{
          width: gridConfig.width * gridConfig.cellSize + 32,
          height: gridConfig.height * gridConfig.cellSize + 32,
        }}
      >
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-xl z-10">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🐍</div>
              <h3 className="text-2xl font-bold text-white mb-2">Snake Spiel</h3>
              <p className="text-zinc-400 mb-6">Bereit zum Spielen?</p>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold text-lg text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Spiel starten
              </button>
            </div>
          </div>
        ) : isGameOver ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 rounded-xl z-10">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">💀</div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">Game Over!</h3>
              <p className="text-zinc-400 mb-2">Punkte: {score}</p>
              <p className="text-zinc-400 mb-6">Äpfel gesammelt: {applesEaten}</p>
              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold text-white hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Nochmal
                </button>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-zinc-700 rounded-xl font-bold text-white hover:bg-zinc-600 transition-all duration-300"
                >
                  Zurück
                </button>
              </div>
            </div>
          </div>
        ) : isPaused ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-xl z-10">
            <div className="text-center">
              <div className="text-4xl mb-4">⏸️</div>
              <h3 className="text-xl font-bold text-white mb-2">Pausiert</h3>
              <p className="text-zinc-400">Drücke Leertaste zum Fortsetzen</p>
            </div>
          </div>
        ) : null}

        {/* Grid */}
        <div
          className="relative"
          style={{
            width: gridConfig.width * gridConfig.cellSize,
            height: gridConfig.height * gridConfig.cellSize,
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className="absolute rounded-sm transition-all duration-100"
              style={{
                left: segment.x * gridConfig.cellSize,
                top: segment.y * gridConfig.cellSize,
                width: gridConfig.cellSize - 2,
                height: gridConfig.cellSize - 2,
                backgroundColor: index === 0 ? getSnakeColor(0) : getSnakeColor(index),
                boxShadow: index === 0 ? `0 0 ${gridConfig.cellSize / 2}px ${getSnakeColor(0)}` : "none",
                zIndex: snake.length - index,
              }}
            />
          ))}

          {/* Apple */}
          <div
            className="absolute animate-pulse"
            style={{
              left: apple.x * gridConfig.cellSize,
              top: apple.y * gridConfig.cellSize,
              width: gridConfig.cellSize - 2,
              height: gridConfig.cellSize - 2,
            }}
          >
            <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-red-500/50">
              🍎
            </div>
          </div>
        </div>
      </div>

      {/* Controls Info */}
      {isPlaying && !isGameOver && (
        <div className="text-center text-sm text-zinc-400">
          <p>Steuerung: Pfeiltasten oder WASD | Pause: Leertaste</p>
        </div>
      )}
    </div>
  );
}

