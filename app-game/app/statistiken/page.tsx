"use client";

const stats = [
  {
    title: "Spiele gespielt",
    value: 0,
    color: "text-blue-400",
    bgGradient: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
    icon: "🎯",
  },
  {
    title: "Spiele gewonnen",
    value: 0,
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/20 to-green-600/20",
    borderColor: "border-emerald-500/30",
    icon: "🏆",
  },
  {
    title: "Spiele verloren",
    value: 0,
    color: "text-rose-400",
    bgGradient: "from-rose-500/20 to-red-600/20",
    borderColor: "border-rose-500/30",
    icon: "😔",
  },
  {
    title: "Gewinnrate",
    value: "0%",
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/20 to-amber-600/20",
    borderColor: "border-yellow-500/30",
    icon: "📊",
  },
  {
    title: "Gesamtpunkte",
    value: 0,
    color: "text-purple-400",
    bgGradient: "from-purple-500/20 to-pink-600/20",
    borderColor: "border-purple-500/30",
    icon: "⭐",
  },
  {
    title: "Durchschnitt",
    value: 0,
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/20 to-blue-600/20",
    borderColor: "border-cyan-500/30",
    icon: "📈",
  },
];

export default function StatistikenPage() {
  return (
    <div className="h-full w-full px-8 py-8">
      <div className="max-w-[1920px] mx-auto h-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent mb-3">
            Statistiken
          </h1>
          <p className="text-xl text-zinc-400">Deine Spielleistung im Überblick</p>
        </div>

        {/* Stats Grid - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className={`
                bg-gradient-to-br ${stat.bgGradient}
                border ${stat.borderColor}
                rounded-2xl p-6
                backdrop-blur-sm
                shadow-xl
                hover:scale-105
                transition-all duration-300
                hover:shadow-2xl
              `}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <div className="text-right">
                  <p className="text-xs text-zinc-400 mb-1">{stat.title}</p>
                  <p
                    className={`text-3xl md:text-4xl font-bold ${stat.color}`}
                  >
                    {typeof stat.value === "number"
                      ? stat.value.toLocaleString("de-DE")
                      : stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info - Full Width */}
        <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">📋</span> Weitere Informationen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-zinc-400">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <p className="text-lg">Spiele mehr, um deine Statistiken zu verbessern</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <p className="text-lg">Deine Bestleistungen werden hier angezeigt</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <p className="text-lg">Vergleiche dich mit anderen Spielern</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
