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

export type GameMode = "classic" | "speed" | "noWalls";
export type MapSize = "small" | "medium" | "large";

interface SnakeGameProps {
  selectedSkin?: string;
  mapSize?: MapSize;
  gameMode?: GameMode;
  onGameEnd?: (stats: GameStats) => void;
  onBack?: () => void;
}

const GRID_SIZES = {
  small: { width: 20, height: 20, cellSize: 18 },
  medium: { width: 25, height: 25, cellSize: 16 },
  large: { width: 30, height: 30, cellSize: 14 },
};

const GAME_SPEEDS = {
  classic: 120,
  speed: 70,
  noWalls: 110,
};

const SKIN_COLORS: Record<string, string> = {
  default: "#10b981",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#a855f7",
  gold: "#f59e0b",
  rainbow:
    "linear-gradient(45deg, #ef4444, #f59e0b, #10b981, #3b82f6, #a855f7)",
  pink: "#ec4899",
  cyan: "#06b6d4",
  orange: "#f97316",
  lime: "#84cc16",
  indigo: "#6366f1",
  teal: "#14b8a6",
  violet: "#8b5cf6",
  emerald: "#10b981",
  crimson: "#dc2626",
};

export default function SnakeGame({
  selectedSkin = "default",
  mapSize = "medium",
  gameMode = "classic",
  onGameEnd,
  onBack,
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
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const generateApple = useCallback((): Position => {
    let newApple: Position;
    do {
      newApple = {
        x: Math.floor(Math.random() * gridConfig.width),
        y: Math.floor(Math.random() * gridConfig.height),
      };
    } while (
      snake.some(
        (segment) => segment.x === newApple.x && segment.y === newApple.y,
      )
    );
    return newApple;
  }, [snake, gridConfig]);

  const checkCollision = useCallback(
    (head: Position, allowWalls: boolean = false): boolean => {
      if (!allowWalls) {
        if (
          head.x < 0 ||
          head.x >= gridConfig.width ||
          head.y < 0 ||
          head.y >= gridConfig.height
        ) {
          return true;
        }
      }
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          return true;
        }
      }
      return false;
    },
    [snake, gridConfig],
  );

  const wrapPosition = (pos: Position): Position => {
    return {
      x: ((pos.x % gridConfig.width) + gridConfig.width) % gridConfig.width,
      y: ((pos.y % gridConfig.height) + gridConfig.height) % gridConfig.height,
    };
  };

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver || !isPlaying) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      const newDirection = directionRef.current;
      head.x += newDirection.x;
      head.y += newDirection.y;

      // Handle wall wrapping for noWalls mode
      const allowWalls = gameMode === "noWalls";
      if (allowWalls) {
        const wrapped = wrapPosition(head);
        head.x = wrapped.x;
        head.y = wrapped.y;
      }

      if (checkCollision(head, allowWalls)) {
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

      if (head.x === apple.x && head.y === apple.y) {
        setScore((prev) => prev + 10);
        setApplesEaten((prev) => prev + 1);
        setApple(generateApple());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [
    isPaused,
    isGameOver,
    isPlaying,
    apple,
    checkCollision,
    generateApple,
    score,
    applesEaten,
    gameTime,
    onGameEnd,
    gameMode,
  ]);

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

  const changeDirection = useCallback((newDir: Position) => {
    const currentDir = directionRef.current;
    if (currentDir.x === -newDir.x && currentDir.y === -newDir.y) {
      return;
    }
    if (currentDir.x === 0 && newDir.x !== 0) {
      directionRef.current = newDir;
      setDirection(newDir);
    } else if (currentDir.y === 0 && newDir.y !== 0) {
      directionRef.current = newDir;
      setDirection(newDir);
    }
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isPlaying || isPaused || isGameOver) return;

      const key = e.key.toLowerCase();
      e.preventDefault();

      switch (key) {
        case "arrowup":
        case "w":
          changeDirection({ x: 0, y: -1 });
          break;
        case "arrowdown":
        case "s":
          changeDirection({ x: 0, y: 1 });
          break;
        case "arrowleft":
        case "a":
          changeDirection({ x: -1, y: 0 });
          break;
        case "arrowright":
        case "d":
          changeDirection({ x: 1, y: 0 });
          break;
        case " ":
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    },
    [isPlaying, isPaused, isGameOver, changeDirection],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isPlaying || isPaused || isGameOver) return;
      const touch = e.touches[0];
      if (gameBoardRef.current) {
        const rect = gameBoardRef.current.getBoundingClientRect();
        touchStartRef.current = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      }
    },
    [isPlaying, isPaused, isGameOver],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isPlaying || isPaused || isGameOver || !touchStartRef.current)
        return;
      const touch = e.changedTouches[0];
      if (gameBoardRef.current) {
        const rect = gameBoardRef.current.getBoundingClientRect();
        const endX = touch.clientX - rect.left;
        const endY = touch.clientY - rect.top;

        const deltaX = endX - touchStartRef.current.x;
        const deltaY = endY - touchStartRef.current.y;

        const minSwipeDistance = 20;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (Math.abs(deltaX) > minSwipeDistance) {
            changeDirection(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
          }
        } else {
          if (Math.abs(deltaY) > minSwipeDistance) {
            changeDirection(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
          }
        }

        touchStartRef.current = null;
      }
    },
    [isPlaying, isPaused, isGameOver, changeDirection],
  );

  const startGame = () => {
    const startPos = {
      x: Math.floor(gridConfig.width / 2),
      y: Math.floor(gridConfig.height / 2),
    };
    setSnake([startPos]);
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
    const startPos = {
      x: Math.floor(gridConfig.width / 2),
      y: Math.floor(gridConfig.height / 2),
    };
    setSnake([startPos]);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setScore(0);
    setApplesEaten(0);
    setGameTime(0);
    if (onBack) {
      onBack();
    }
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const statsHeight = 80;
  const controlsHeight = isPlaying && !isGameOver ? 100 : 0;
  const padding = 32;
  const availableHeight =
    viewportSize.height - statsHeight - controlsHeight - padding;
  const availableWidth = viewportSize.width - padding;
  const gameSize = Math.min(availableWidth, availableHeight);

  const cellSize = gameSize / Math.max(gridConfig.width, gridConfig.height);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 bg-black">
      <div className="flex gap-3 w-full justify-center">
        <div className="bg-black/80 border border-emerald-500/30 rounded-xl px-5 py-3 backdrop-blur-md">
          <p className="text-xs text-zinc-400 mb-1 uppercase tracking-wide">
            Punkte
          </p>
          <p className="text-2xl font-bold text-emerald-400 tabular-nums">
            {score}
          </p>
        </div>
        <div className="bg-black/80 border border-red-500/30 rounded-xl px-5 py-3 backdrop-blur-md">
          <p className="text-xs text-zinc-400 mb-1 uppercase tracking-wide">
            Äpfel
          </p>
          <p className="text-2xl font-bold text-red-400 tabular-nums">
            {applesEaten}
          </p>
        </div>
        <div className="bg-black/80 border border-blue-500/30 rounded-xl px-5 py-3 backdrop-blur-md">
          <p className="text-xs text-zinc-400 mb-1 uppercase tracking-wide">
            Überlebenszeit
          </p>
          <p className="text-2xl font-bold text-blue-400 tabular-nums font-mono">
            {formatTime(gameTime)}
          </p>
        </div>
      </div>

      <div
        ref={gameBoardRef}
        className="relative bg-black/80 border-2 border-zinc-800 rounded-2xl backdrop-blur-sm shadow-2xl flex-shrink-0"
        style={{
          width: `${gameSize}px`,
          height: `${gameSize}px`,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          {!isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 rounded-2xl z-10">
              <div className="text-center space-y-4 px-4">
                <div className="text-7xl mb-4 animate-pulse">🐍</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Snake Spiel
                </h3>
                <p className="text-zinc-400 mb-6 text-sm">
                  Bereit zum Spielen?
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl font-bold text-lg text-white shadow-xl shadow-emerald-500/50 active:scale-95 transition-all duration-200"
                >
                  Spiel starten
                </button>
              </div>
            </div>
          ) : isGameOver ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-2xl z-10">
              <div className="text-center space-y-4 px-4">
                <div className="text-7xl mb-4">💀</div>
                <h3 className="text-2xl font-bold text-red-400 mb-2">
                  Game Over!
                </h3>
                <div className="space-y-2 mb-6">
                  <p className="text-zinc-300">
                    Punkte:{" "}
                    <span className="text-emerald-400 font-bold">{score}</span>
                  </p>
                  <p className="text-zinc-300">
                    Äpfel:{" "}
                    <span className="text-red-400 font-bold">
                      {applesEaten}
                    </span>
                  </p>
                  <p className="text-zinc-300">
                    Zeit:{" "}
                    <span className="text-blue-400 font-bold">
                      {formatTime(gameTime)}
                    </span>
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-bold text-white active:scale-95 transition-all duration-200"
                  >
                    Nochmal
                  </button>
                  <button
                    onClick={() => {
                      resetGame();
                      if (onBack) {
                        onBack();
                      }
                    }}
                    className="px-6 py-3 bg-zinc-800 rounded-xl font-bold text-white active:scale-95 transition-all duration-200"
                  >
                    Zurück zur Startseite
                  </button>
                </div>
              </div>
            </div>
          ) : isPaused ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 rounded-2xl z-10">
              <div className="text-center">
                <div className="text-5xl mb-4">⏸️</div>
                <h3 className="text-xl font-bold text-white mb-2">Pausiert</h3>
                <p className="text-zinc-400 text-sm">Tippe zum Fortsetzen</p>
                <button
                  onClick={() => setIsPaused(false)}
                  className="mt-4 px-6 py-3 bg-emerald-500 rounded-xl font-bold text-white active:scale-95 transition-all duration-200"
                >
                  Weiter
                </button>
              </div>
            </div>
          ) : null}

          <div
            className="relative w-full h-full"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridConfig.width}, 1fr)`,
              gridTemplateRows: `repeat(${gridConfig.height}, 1fr)`,
              gap: "1px",
            }}
          >
            {Array.from({ length: gridConfig.width * gridConfig.height }).map(
              (_, i) => {
                const x = i % gridConfig.width;
                const y = Math.floor(i / gridConfig.width);
                return (
                  <div
                    key={i}
                    className="bg-zinc-900/20"
                    style={{
                      gridColumn: x + 1,
                      gridRow: y + 1,
                    }}
                  />
                );
              },
            )}

            {snake.map((segment, index) => {
              const isHead = index === 0;
              const color = getSnakeColor(index);
              const segmentSize =
                100 / Math.max(gridConfig.width, gridConfig.height);
              const glowSize = cellSize * 0.15;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-75 ease-out"
                  style={{
                    left: `${(segment.x / gridConfig.width) * 100}%`,
                    top: `${(segment.y / gridConfig.height) * 100}%`,
                    width: `${segmentSize}%`,
                    height: `${segmentSize}%`,
                    margin: "1px",
                    zIndex: snake.length - index + 10,
                    transition: "all 0.075s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    className="w-full h-full rounded-lg"
                    style={{
                      backgroundColor: color,
                      boxShadow: isHead
                        ? `0 0 ${glowSize}px ${color}, 0 0 ${glowSize * 1.5}px ${color}, inset 0 0 ${glowSize * 0.5}px rgba(255,255,255,0.4)`
                        : `0 0 ${glowSize * 0.3}px ${color}, inset 0 0 ${glowSize * 0.2}px rgba(255,255,255,0.2)`,
                      border: isHead
                        ? `2px solid rgba(255,255,255,0.3)`
                        : `1px solid rgba(255,255,255,0.1)`,
                      transform: isHead ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                </div>
              );
            })}

            <div
              className="absolute animate-pulse"
              style={{
                left: `${(apple.x / gridConfig.width) * 100}%`,
                top: `${(apple.y / gridConfig.height) * 100}%`,
                width: `${100 / gridConfig.width}%`,
                height: `${100 / gridConfig.height}%`,
                margin: "1px",
                zIndex: 5,
                transition: "all 0.1s ease-out",
              }}
            >
              <div
                className="w-full h-full bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  boxShadow: `0 0 ${cellSize * 0.2}px #ef4444, 0 0 ${cellSize * 0.4}px #ef4444, inset 0 0 ${cellSize * 0.1}px rgba(255,255,255,0.3)`,
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                <span className="text-xs">🍎</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPlaying && !isGameOver && (
        <div className="w-full flex flex-col items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-6 py-3 bg-zinc-800/80 border border-zinc-700 rounded-xl font-semibold text-white active:scale-95 transition-all duration-200"
          >
            {isPaused ? "▶️ Weiter" : "⏸️ Pause"}
          </button>
          <p className="text-xs text-zinc-500 text-center">
            {isMobile
              ? "Wische zum Steuern"
              : "Pfeiltasten oder WASD | Pause: Leertaste"}
          </p>
        </div>
      )}
    </div>
  );
}
