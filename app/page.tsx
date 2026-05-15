"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Video,
  FileVideo,
  GraduationCap,
  BrainCircuit,
  Sparkles,
  Eye,
  ShieldCheck,
  LineChart,
} from "lucide-react";
import { dashboardStore } from "./lib/dashboardStore";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

function MetricCard({ icon, label, value, change, trend }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur card-hover animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
          {icon}
        </div>
        {change && (
          <span
            className={`text-sm font-semibold ${
              trend === "up"
                ? "text-emerald-400"
                : trend === "down"
                ? "text-red-400"
                : "text-white/60"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-1 text-3xl font-black text-white">{value}</p>
    </div>
  );
}

interface ActivityItem {
  time: string;
  action: string;
  user: string;
  type: "surgery" | "analysis" | "training";
}

const initialActivity: ActivityItem[] = [
  {
    time: "2 min ago",
    action: "Completed cataract surgery simulation",
    user: "Dr. Sarah Chen",
    type: "surgery",
  },
  {
    time: "15 min ago",
    action: "Uploaded video for analysis",
    user: "Dr. Michael Torres",
    type: "analysis",
  },
  {
    time: "1 hour ago",
    action: "Completed resident training module",
    user: "Dr. Emily Rodriguez",
    type: "training",
  },
  {
    time: "2 hours ago",
    action: "Live surgery session ended",
    user: "Dr. James Wilson",
    type: "surgery",
  },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("today");
  const [videosAnalyzed, setVideosAnalyzed] = useState(47);
  const [aiConfidence, setAiConfidence] = useState(94.2);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>(initialActivity);
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);

  useEffect(() => {
    // Subscribe to dashboard store updates
    const unsubscribe = dashboardStore.subscribe(() => {
      setVideosAnalyzed(dashboardStore.getAnalysisCount());
      setAiConfidence(dashboardStore.getAverageConfidence());
      
      const analyses = dashboardStore.getRecentAnalyses();
      setRecentAnalyses(analyses);
      
      // Update recent activity with new analyses
      if (analyses.length > 0) {
        const newActivities = analyses.map((analysis, index) => {
          const timeAgo = index === 0 ? "Just now" : `${index} min ago`;
          return {
            time: timeAgo,
            action: `Analyzed ${analysis.procedure}`,
            user: "AI Analysis System",
            type: "analysis" as const
          };
        });
        
        // Merge with initial activity, keeping only the most recent items
        const merged = [...newActivities, ...initialActivity].slice(0, 4);
        setRecentActivity(merged);
      }
    });

    // Initial load
    setVideosAnalyzed(dashboardStore.getAnalysisCount());
    setAiConfidence(dashboardStore.getAverageConfidence());
    setRecentAnalyses(dashboardStore.getRecentAnalyses());

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-96 w-96 rounded-full bg-violet-700/40 blur-3xl animate-pulse-glow" />
        <div
          className="absolute right-[-8%] top-[8%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[-18%] left-[25%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
              <p className="mt-1 text-sm text-white/60">
                Welcome back! Here's your surgical intelligence overview.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(["today", "week", "month"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${
                    timeRange === range
                      ? "bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-300/30"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Hero Banner */}
        <div className="mb-8 rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 to-violet-600/10 p-6 backdrop-blur animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/20">
              <Sparkles className="h-7 w-7 text-cyan-200" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">SophieCare AI Surgical Co-Pilot</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Real-time surgical phase detection, safety monitoring, and resident training
                assistance for ophthalmology teams. Built with IBM Bob for the hackathon.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<Video className="h-6 w-6" />}
            label="Live Surgeries Today"
            value="12"
            change="+3"
            trend="up"
          />
          <MetricCard
            icon={<FileVideo className="h-6 w-6" />}
            label="Videos Analyzed"
            value={videosAnalyzed.toString()}
            change={videosAnalyzed > 47 ? `+${videosAnalyzed - 47}` : undefined}
            trend={videosAnalyzed > 47 ? "up" : "neutral"}
          />
          <MetricCard
            icon={<GraduationCap className="h-6 w-6" />}
            label="Training Sessions"
            value="23"
            change="+5"
            trend="up"
          />
          <MetricCard
            icon={<BrainCircuit className="h-6 w-6" />}
            label="AI Confidence Avg"
            value={`${aiConfidence}%`}
            change={aiConfidence > 94.2 ? `+${(aiConfidence - 94.2).toFixed(1)}%` : undefined}
            trend={aiConfidence > 94.2 ? "up" : "neutral"}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* System Status */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Activity className="h-5 w-5 text-cyan-300" />
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="font-semibold">AI Models</span>
                </div>
                <span className="badge badge-success">Operational</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="font-semibold">Video Processing</span>
                </div>
                <span className="badge badge-success">Online</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="font-semibold">Training Module</span>
                </div>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-cyan-400" />
                  <span className="font-semibold">Safety Monitoring</span>
                </div>
                <span className="badge badge-info">Enabled</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Clock className="h-5 w-5 text-cyan-300" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 transition-all hover:bg-white/5"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      item.type === "surgery"
                        ? "bg-cyan-300/10 text-cyan-300"
                        : item.type === "analysis"
                        ? "bg-violet-300/10 text-violet-300"
                        : "bg-emerald-300/10 text-emerald-300"
                    }`}
                  >
                    {item.type === "surgery" && <Video className="h-5 w-5" />}
                    {item.type === "analysis" && <FileVideo className="h-5 w-5" />}
                    {item.type === "training" && <GraduationCap className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white/90">{item.action}</p>
                    <p className="mt-1 text-xs text-white/50">
                      {item.user} · {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights - Show Recent Analyses */}
        {recentAnalyses.length > 0 && (
          <div className="mt-6 rounded-3xl border border-violet-300/20 bg-violet-300/5 p-6 shadow-2xl backdrop-blur animate-fade-in">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <BrainCircuit className="h-5 w-5 text-violet-300" />
              Recent AI Insights
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentAnalyses.slice(0, 3).map((analysis, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4 transition-all hover:bg-white/5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-white/50">
                      {new Date(analysis.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300">
                      {analysis.overallConfidence}%
                    </span>
                  </div>
                  <p className="font-semibold text-sm text-white/90 mb-1">{analysis.procedure}</p>
                  <p className="text-xs text-white/50 truncate">{analysis.fileName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Overview */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <LineChart className="h-5 w-5 text-cyan-300" />
            Performance Overview
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm text-white/55">Avg Surgery Duration</p>
              <p className="mt-2 text-2xl font-black text-white">18:42</p>
              <p className="mt-1 text-xs text-emerald-400">-2:15 vs last week</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm text-white/55">Safety Score</p>
              <p className="mt-2 text-2xl font-black text-emerald-400">96.8%</p>
              <p className="mt-1 text-xs text-emerald-400">+1.2% improvement</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm text-white/55">Resident Progress</p>
              <p className="mt-2 text-2xl font-black text-cyan-300">87%</p>
              <p className="mt-1 text-xs text-cyan-400">+5% this month</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm text-white/55">AI Accuracy</p>
              <p className="mt-2 text-2xl font-black text-violet-400">{aiConfidence}%</p>
              <p className="mt-1 text-xs text-violet-400">
                {aiConfidence > 94.2 ? "Improving" : "Consistent"}
              </p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-4 backdrop-blur animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-400" />
            <div>
              <p className="font-semibold text-yellow-200">Medical Disclaimer</p>
              <p className="mt-1 text-sm text-yellow-200/80">
                SophieCare is an educational hackathon prototype. It is not a medical device and
                must not be used for diagnosis or clinical decision-making without proper
                validation and regulatory approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
