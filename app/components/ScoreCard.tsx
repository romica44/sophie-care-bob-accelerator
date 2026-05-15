import { Score } from "@/app/types/analysis";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function ScoreCard({ score }: { score: Score }) {
  const getScoreColor = (value: number) => {
    if (value >= 90) return "from-emerald-500 to-cyan-400";
    if (value >= 75) return "from-cyan-500 to-blue-400";
    if (value >= 60) return "from-yellow-500 to-orange-400";
    return "from-orange-500 to-red-400";
  };

  const getScoreTextColor = (value: number) => {
    if (value >= 90) return "text-emerald-300";
    if (value >= 75) return "text-cyan-300";
    if (value >= 60) return "text-yellow-300";
    return "text-orange-300";
  };

  const getScoreBgColor = (value: number) => {
    if (value >= 90) return "bg-emerald-500/10";
    if (value >= 75) return "bg-cyan-500/10";
    if (value >= 60) return "bg-yellow-500/10";
    return "bg-orange-500/10";
  };

  const getScoreLabel = (value: number) => {
    if (value >= 90) return "Excellent";
    if (value >= 75) return "Good";
    if (value >= 60) return "Fair";
    return "Needs Improvement";
  };

  const getTrendIcon = (value: number) => {
    if (value >= 75) return <TrendingUp className="h-4 w-4" />;
    if (value >= 60) return <Minus className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-premium card-hover animate-fade-in-up transition-all duration-500 overflow-hidden">
      {/* Premium gradient border effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20" />
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white/90 mb-2 tracking-wide uppercase">{score.label}</h3>
            <div className="flex items-center gap-2">
              <span className={`badge text-xs font-semibold px-3 py-1.5 rounded-full ${getScoreBgColor(score.value)} ${getScoreTextColor(score.value)} transition-all duration-300 group-hover:scale-105`}>
                {getScoreLabel(score.value)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-3">
              <span className={`${getScoreTextColor(score.value)} transition-all duration-300 group-hover:scale-110 animate-float`}>
                {getTrendIcon(score.value)}
              </span>
              <span className={`text-4xl font-black ${getScoreTextColor(score.value)} transition-all duration-500 group-hover:scale-125 group-hover:text-glow`}>
                {score.value}
              </span>
            </div>
            <span className="text-xs text-white/40 font-medium">/ 100</span>
          </div>
        </div>
        
        {/* Premium progress bar */}
        <div className="mb-5 h-3 rounded-full bg-white/10 overflow-hidden shadow-inner relative">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(score.value)} transition-all duration-1000 ease-out relative overflow-hidden shadow-lg`}
            style={{ width: `${score.value}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            {/* Top highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
        
        <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-300">{score.explanation}</p>
        
        {/* Premium hover effect indicator */}
        <div className="mt-5 pt-5 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/50 font-medium">Detailed Analysis</span>
            <span className="flex items-center gap-2 text-cyan-300 font-semibold group-hover:gap-3 transition-all duration-300">
              View Insights
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScoreCardSkeleton() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-premium animate-pulse relative overflow-hidden">
      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex-1">
            <div className="skeleton h-4 w-36 mb-3 rounded-lg" />
            <div className="skeleton h-6 w-24 rounded-full" />
          </div>
          <div className="skeleton h-12 w-20 rounded-xl" />
        </div>
        <div className="mb-5 skeleton h-3 w-full rounded-full" />
        <div className="space-y-3">
          <div className="skeleton h-3 w-full rounded-md" />
          <div className="skeleton h-3 w-4/5 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function ScoreCardGrid({ scores }: { scores: Score[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {scores.map((score, index) => (
        <div key={score.label} style={{ animationDelay: `${index * 100}ms` }}>
          <ScoreCard score={score} />
        </div>
      ))}
    </div>
  );
}

export function ScoreCardCompact({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) {
  const getScoreColor = (val: number) => {
    if (val >= 90) return "text-emerald-300";
    if (val >= 75) return "text-cyan-300";
    if (val >= 60) return "text-yellow-300";
    return "text-orange-300";
  };

  return (
    <div className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-premium card-hover transition-all duration-300 relative overflow-hidden">
      {/* Hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
      
      <div className="flex items-center gap-4 relative z-10">
        {icon && (
          <div className="text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-glow-pulse">
            {icon}
          </div>
        )}
        <span className="text-sm font-semibold text-white/80 group-hover:text-white/95 transition-colors duration-300">{label}</span>
      </div>
      <span className={`text-3xl font-black ${getScoreColor(value)} transition-all duration-300 group-hover:scale-110 relative z-10`}>
        {value}
      </span>
    </div>
  );
}

// Made with Bob
