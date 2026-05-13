import { AnalysisResult } from "@/app/types/analysis";
import { ScoreCard } from "./ScoreCard";
import { AgentTrace } from "./AgentTrace";

export function ResultDashboard({ result }: { result: AnalysisResult }) {
  return (
    <div className="mt-10 grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">IBM Bob Development Intelligence</p>
        <h2 className="mt-3 text-3xl font-bold">Bob-Assisted Build Acceleration Review</h2>
        <p className="mt-4 max-w-4xl text-white/70">{result.executiveSummary}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        {result.scores.map((score) => <ScoreCard key={score.label} score={score} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <h2 className="text-xl font-bold">Productivity Insights</h2>
          <ul className="mt-4 space-y-3 text-white/70">
            {result.insights.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <h2 className="text-xl font-bold">Submission Risks & Next Steps</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-red-300">Risks</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/65">{result.risks.map((x) => <li key={x}>• {x}</li>)}</ul>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-300">Next Steps</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/65">{result.opportunities.map((x) => <li key={x}>• {x}</li>)}</ul>
            </div>
          </div>
        </section>
      </div>

      <AgentTrace steps={result.agentTrace} />

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <h2 className="text-xl font-bold">IBM Bob Evidence & Technical Documentation</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {result.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" className="rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-white/10">
              <p className="font-semibold">{source.title}</p>
              <p className="mt-1 text-sm text-cyan-300">{source.signal}</p>
              <p className="mt-2 truncate text-xs text-white/40">{source.url}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
