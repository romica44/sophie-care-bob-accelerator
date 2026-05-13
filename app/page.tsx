"use client";

import { useState } from "react";
import { Sparkles, Activity, ShieldCheck, BrainCircuit, FileCode2, GitBranch, TestTube2 } from "lucide-react";
import { ResultDashboard } from "./components/ResultDashboard";
import { AnalysisResult } from "./types/analysis";

const defaultPrompt = "Use IBM Bob to explain this repository, generate onboarding documentation, suggest tests, and accelerate the SophieCare surgical AI prototype.";

export default function Home() {
  const [query, setQuery] = useState(defaultPrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function analyze() {
    setLoading(true);
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen px-6 py-8 md:px-12">
      <section className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-300 font-black">SC</div>
            <div>
              <p className="font-bold">SophieCare Bob Accelerator</p>
              <p className="text-xs text-white/50">IBM Bob Hackathon Prototype</p>
            </div>
          </div>
          <span className="rounded-full border border-cyan-300/30 px-4 py-2 text-xs text-cyan-200">BOB-POWERED DEV WORKFLOW</span>
        </nav>

        <div className="grid items-center gap-10 py-20 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-200">
              Turn idea into impact faster with IBM Bob
            </p>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
              From complex healthcare AI idea to demo-ready software.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/65">
              SophieCare Bob Accelerator demonstrates how IBM Bob helps developers understand a full repository, generate documentation, suggest tests, improve maintainability, and ship a polished AI surgical co-pilot prototype with more confidence.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <Feature icon={<FileCode2 />} title="Repo Understanding" />
              <Feature icon={<TestTube2 />} title="Docs & Tests" />
              <Feature icon={<GitBranch />} title="Refactor Workflow" />
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-5 text-sm text-white/70">
              <p className="font-semibold text-cyan-200">IBM Bob value shown in this prototype</p>
              <p className="mt-2">Bob is used as the AI development partner to read project context, explain architecture, generate onboarding material, identify improvement opportunities, and document the build process through an exported report.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/35 p-6 shadow-2xl backdrop-blur">
            <label className="text-sm font-semibold text-white/70">Run the Bob-assisted demo flow</label>
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="mt-3 h-36 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none ring-cyan-300/40 focus:ring-2"
            />
            <button
              onClick={analyze}
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-4 font-bold text-white shadow-xl disabled:opacity-60"
            >
              <Sparkles className="h-5 w-5" />
              {loading ? "Bob-assisted workflow is running..." : "Run Productivity Review"}
            </button>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <FeatureCard icon={<BrainCircuit />} title="Healthcare AI case study" text="A realistic ophthalmology software concept creates enough complexity to demonstrate the value of contextual AI development help." />
          <FeatureCard icon={<Activity />} title="Builder productivity" text="The repository includes Bob prompts and evidence templates for architecture explanation, docs, tests, refactor, and onboarding." />
          <FeatureCard icon={<ShieldCheck />} title="Responsible delivery" text="The demo is safe by default: mocked outputs, no real patient data, no paid API keys, and clear medical disclaimers." />
        </section>

        {result && <ResultDashboard result={result} />}
      </section>
    </main>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
      <span className="text-cyan-300">{icon}</span>
      {title}
    </div>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
      <div className="mb-4 inline-flex rounded-2xl bg-cyan-300/10 p-3 text-cyan-300">{icon}</div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
    </div>
  );
}
