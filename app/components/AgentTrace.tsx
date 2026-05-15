import { Bot, CheckCircle2, Loader2, Clock, Zap, AlertCircle } from "lucide-react";

export function AgentTrace({ steps }: { steps: string[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur animate-fade-in">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-300/10 p-2 animate-pulse-glow">
            <Bot className="h-6 w-6 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold">IBM Bob Agent Workflow</h2>
            <p className="text-sm text-white/60">Step-by-step analysis trace</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
          <span className="status-dot active"></span>
          <span className="text-xs font-semibold text-emerald-300">Complete</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={step} 
            className="group flex gap-3 rounded-2xl bg-white/5 p-4 text-sm text-white/75 hover:bg-white/10 transition-all card-hover border border-white/5 hover:border-cyan-300/20"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className="relative">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-emerald-300/50 to-transparent" />
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-white/90 font-medium">Step {index + 1}</span>
                <span className="text-xs text-white/40 whitespace-nowrap flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {(index + 1) * 0.5}s
                </span>
              </div>
              <p className="text-white/70 leading-relaxed">{step}</p>
            </div>
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 rounded hover:bg-white/10 transition-colors" aria-label="View details">
                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-white/50">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Analysis complete</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40">{steps.length} steps executed</span>
            <span className="text-cyan-300 font-semibold">{(steps.length * 0.5).toFixed(1)}s total</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AgentTraceLoading() {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur animate-pulse-glow">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-300/10 p-2">
            <Bot className="h-6 w-6 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold">IBM Bob Agent Workflow</h2>
            <p className="text-sm text-white/60">Analyzing repository...</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 border border-cyan-500/20">
          <Loader2 className="h-3 w-3 text-cyan-300 animate-spin" />
          <span className="text-xs font-semibold text-cyan-300">Processing</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3 rounded-2xl bg-white/5 p-4 border border-white/5">
            <Loader2 className="h-5 w-5 text-cyan-300 animate-spin flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-cyan-300">
          <Zap className="h-4 w-4 animate-pulse" />
          <span>Bob is analyzing your codebase...</span>
        </div>
      </div>
    </section>
  );
}

export function AgentTraceEmpty() {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur animate-fade-in">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-cyan-300/10 p-2">
          <Bot className="h-6 w-6 text-cyan-300" />
        </div>
        <div>
          <h2 className="text-xl font-bold">IBM Bob Agent Workflow</h2>
          <p className="text-sm text-white/60">No analysis steps yet</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/30">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-white/70">No Workflow Steps</h3>
        <p className="max-w-md text-sm text-white/50 mb-4">
          Start an analysis to see IBM Bob's step-by-step workflow and decision-making process.
        </p>
        <button className="btn-primary inline-flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Start Analysis
        </button>
      </div>
    </section>
  );
}

export function AgentTraceCompact({ steps, maxSteps = 3 }: { steps: string[]; maxSteps?: number }) {
  const displaySteps = steps.slice(0, maxSteps);
  const remainingCount = steps.length - maxSteps;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-2">
        <Bot className="h-4 w-4 text-cyan-300" />
        <span className="text-sm font-semibold text-white/80">Recent Steps</span>
      </div>
      <div className="space-y-2">
        {displaySteps.map((step, index) => (
          <div key={index} className="flex gap-2 text-xs text-white/60">
            <CheckCircle2 className="h-3 w-3 text-emerald-300 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{step}</span>
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="pt-2 text-xs text-cyan-300 font-medium">
            + {remainingCount} more steps
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
