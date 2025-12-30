"use client";
const stats = [
  {
    title: "Spiele gespielt",
    value: 0,
    color: "text-blue-400",
  },
  {
    title: "Spiele gewonnen",
    value: 0,
    color: "text-emerald-400",
  },
  {
    title: "Spiele verloren",
    value: 0,
    color: "text-rose-400",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10 text-white">
      {/* Titel */}
      <div className="mb-10 flex justify-center">
        <h1 className="text-4xl font-extrabold tracking-wide text-blue-400">
          Statistiken
        </h1>
      </div>

      {/* Stats untereinander */}
      <div className="mx-auto flex max-w-md flex-col gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl backdrop-blur"
          >
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-slate-400">
                {stat.title}
              </span>
            </div>
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value.toLocaleString("de-DE")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}