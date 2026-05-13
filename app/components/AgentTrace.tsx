import { Bot, CheckCircle2 } from "lucide-react";

export function AgentTrace({ steps }: { steps: string[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <Bot className="text-cyan-300" />
        <h2 className="text-xl font-bold">Live Agent Workflow</h2>
      </div>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step} className="flex gap-3 rounded-2xl bg-white/5 p-4 text-sm text-white/75">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
