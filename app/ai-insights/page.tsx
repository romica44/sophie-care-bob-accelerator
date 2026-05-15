"use client";

import { useState } from "react";
import {
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
} from "lucide-react";

const insights = [
  {
    category: "Phase Detection",
    confidence: 94.2,
    trend: "up",
    change: "+1.2%",
    description: "AI model accuracy for surgical phase identification",
    details: [
      "Incision phase: 98% accuracy",
      "Capsulorhexis: 94% accuracy",
      "Phacoemulsification: 91% accuracy",
      "IOL Implantation: 96% accuracy",
      "Closure: 99% accuracy",
    ],
  },
  {
    category: "Risk Prediction",
    confidence: 87.5,
    trend: "up",
    change: "+3.1%",
    description: "Early detection of potential complications",
    details: [
      "Posterior capsule rupture: 89% detection rate",
      "Zonular stress: 85% detection rate",
      "Corneal edema risk: 88% detection rate",
      "Anterior chamber instability: 87% detection rate",
    ],
  },
  {
    category: "Technique Analysis",
    confidence: 91.8,
    trend: "neutral",
    change: "0%",
    description: "Assessment of surgical technique quality",
    details: [
      "Hand stability: 93% accuracy",
      "Instrument positioning: 91% accuracy",
      "Timing optimization: 90% accuracy",
      "Energy management: 92% accuracy",
    ],
  },
];

const performanceMetrics = [
  { label: "Total Procedures Analyzed", value: "1,247", icon: Activity },
  { label: "Average Confidence Score", value: "91.2%", icon: TrendingUp },
  { label: "Risk Alerts Generated", value: "89", icon: AlertTriangle },
  { label: "Training Recommendations", value: "342", icon: CheckCircle2 },
];

const recentAnalyses = [
  {
    date: "2 hours ago",
    procedure: "Cataract Surgery - Standard",
    confidence: 95,
    risks: 0,
    status: "success",
  },
  {
    date: "5 hours ago",
    procedure: "Cataract Surgery - Complex",
    confidence: 88,
    risks: 2,
    status: "warning",
  },
  {
    date: "1 day ago",
    procedure: "Cataract Surgery - Standard",
    confidence: 96,
    risks: 0,
    status: "success",
  },
  {
    date: "1 day ago",
    procedure: "Cataract Surgery - Resident Training",
    confidence: 82,
    risks: 1,
    status: "info",
  },
];

export default function AIInsightsPage() {
  const [selectedInsight, setSelectedInsight] = useState<number>(0);

  return (
    <div className="min-h-screen overflow-hidden text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-96 w-96 rounded-full bg-violet-700/40 blur-3xl animate-pulse-glow" />
        <div
          className="absolute right-[-8%] top-[8%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-300/10">
              <BrainCircuit className="h-6 w-6 text-violet-300" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">AI Insights</h1>
              <p className="mt-1 text-sm text-white/60">
                Intelligence reports and performance analytics
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Performance Metrics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-300/10">
                  <Icon className="h-5 w-5 text-violet-300" />
                </div>
                <p className="text-sm text-white/55">{metric.label}</p>
                <p className="mt-1 text-3xl font-black text-white">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* AI Model Performance */}
        <div className="mb-8 animate-fade-in">
          <h2 className="mb-4 text-2xl font-bold">AI Model Performance</h2>
          <div className="grid gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover cursor-pointer transition-all hover:bg-white/10"
                onClick={() => setSelectedInsight(index)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-xl font-bold">{insight.category}</h3>
                      <span
                        className={`badge ${
                          insight.trend === "up"
                            ? "badge-success"
                            : insight.trend === "down"
                            ? "badge-error"
                            : "badge-info"
                        }`}
                      >
                        {insight.change}
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-white/60">{insight.description}</p>
                    {selectedInsight === index && (
                      <div className="mt-4 space-y-2 animate-fade-in">
                        {insight.details.map((detail, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-white/70"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-violet-300">
                      {insight.confidence}%
                    </div>
                    <p className="text-xs text-white/40">Confidence</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Analyses */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Activity className="h-5 w-5 text-cyan-300" />
              Recent Analyses
            </h3>
            <div className="space-y-3">
              {recentAnalyses.map((analysis, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4 transition-all hover:bg-white/5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-semibold">{analysis.procedure}</p>
                    <span
                      className={`badge ${
                        analysis.status === "success"
                          ? "badge-success"
                          : analysis.status === "warning"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {analysis.confidence}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">{analysis.date}</span>
                    <span className="text-white/50">
                      {analysis.risks} risk{analysis.risks !== 1 ? "s" : ""} detected
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Statistics */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <BarChart3 className="h-5 w-5 text-cyan-300" />
              Model Statistics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/70">Phase Detection</span>
                  <span className="text-sm font-bold text-cyan-300">94.2%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: "94.2%" }} />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/70">Technique Analysis</span>
                  <span className="text-sm font-bold text-violet-300">91.8%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill bg-violet-400" style={{ width: "91.8%" }} />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/70">Risk Prediction</span>
                  <span className="text-sm font-bold text-emerald-300">87.5%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill bg-emerald-400" style={{ width: "87.5%" }} />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/70">Training Feedback</span>
                  <span className="text-sm font-bold text-amber-300">89.3%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill bg-amber-400" style={{ width: "89.3%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Findings */}
        <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Eye className="h-5 w-5 text-cyan-300" />
            Key Findings
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <h4 className="font-semibold text-emerald-300">Improvements</h4>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>Phase detection accuracy improved by 1.2% this month</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>Risk prediction showing 3.1% increase in early detection</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>Training feedback quality scores consistently above 85%</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h4 className="font-semibold text-amber-300">Areas to Monitor</h4>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Complex case accuracy slightly lower than standard procedures</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Technique analysis needs more training data for edge cases</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Continue monitoring false positive rates in risk detection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-4 backdrop-blur animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-400" />
            <div>
              <p className="font-semibold text-yellow-200">AI Performance Metrics</p>
              <p className="mt-1 text-sm text-yellow-200/80">
                These metrics are based on simulated data for demonstration purposes. Real-world
                deployment would require extensive validation, clinical trials, and regulatory
                approval before use in actual medical settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob