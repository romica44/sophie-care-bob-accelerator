import { Score } from "@/app/types/analysis";

export function ScoreCard({ score }: { score: Score }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-white/80">{score.label}</h3>
        <span className="text-2xl font-bold text-cyan-300">{score.value}</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-300" style={{ width: `${score.value}%` }} />
      </div>
      <p className="mt-3 text-sm text-white/60">{score.explanation}</p>
    </div>
  );
}
