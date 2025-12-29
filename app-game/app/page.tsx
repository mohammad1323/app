export default function GamePage() {
  return (
    <div className="px-4">
      <div className="flex items-center justify-center pt-6">
        <h1 className="text-3xl font-extrabold text-green-400">
          MOHAMMADS GAME
        </h1>
        <div className="bg-zinc-800 px-4 py-2 rounded-xl">
          🪙 0
        </div>
      </div>


      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-sm bg-zinc-800 rounded-2xl p-6 text-center">
          <p className="text-zinc-300">
           Start Game
          </p>
        </div>
      </div>

    </div>
  );
}
