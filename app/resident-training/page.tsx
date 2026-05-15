"use client";

import { useState } from "react";
import {
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileText,
  Award,
  Target,
  BookOpen,
  BarChart3,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  MessageSquare,
  LineChart,
  Star,
  Lightbulb,
  Clock,
  Activity,
  Zap,
} from "lucide-react";

const trainingModules = [
  {
    id: 1,
    title: "Surgical Phase Recognition",
    description: "Learn to identify and classify different phases of cataract surgery",
    progress: 100,
    status: "completed" as const,
    lessons: 8,
    duration: "45 min",
  },
  {
    id: 2,
    title: "Risk Assessment & Safety",
    description: "Understanding potential complications and safety protocols",
    progress: 75,
    status: "in-progress" as const,
    lessons: 10,
    duration: "60 min",
  },
  {
    id: 3,
    title: "Capsulorhexis Technique",
    description: "Master the critical capsulorhexis phase with AI guidance",
    progress: 45,
    status: "in-progress" as const,
    lessons: 12,
    duration: "90 min",
  },
  {
    id: 4,
    title: "Phacoemulsification Mastery",
    description: "Advanced techniques for safe and efficient phaco procedures",
    progress: 0,
    status: "not-started" as const,
    lessons: 15,
    duration: "120 min",
  },
];

const recentScores = [
  { date: "Today", module: "Phase Recognition", score: 92, improvement: "+5" },
  { date: "Yesterday", module: "Risk Assessment", score: 88, improvement: "+3" },
  { date: "2 days ago", module: "Capsulorhexis", score: 85, improvement: "+8" },
  { date: "3 days ago", module: "Safety Protocols", score: 90, improvement: "+2" },
];

const achievements = [
  { icon: Award, title: "First Module Complete", date: "Completed Phase Recognition" },
  { icon: Target, title: "90% Accuracy", date: "Achieved in Risk Assessment" },
  { icon: TrendingUp, title: "Consistent Progress", date: "7 day learning streak" },
  { icon: BookOpen, title: "Quick Learner", date: "Completed 3 lessons in one day" },
];

// Performance Analytics Data
const performanceMetrics = [
  { metric: "Accuracy Rate", value: "88.8%", trend: "+5.2%", status: "up" },
  { metric: "Completion Time", value: "12.5 min", trend: "-2.3 min", status: "up" },
  { metric: "Error Rate", value: "4.2%", trend: "-1.8%", status: "up" },
  { metric: "Confidence Score", value: "85%", trend: "+8%", status: "up" },
];

// Mistake Detection Data
const detectedMistakes = [
  {
    id: 1,
    phase: "Capsulorhexis",
    mistake: "Irregular tear pattern detected",
    severity: "medium",
    timestamp: "00:03:45",
    recommendation: "Maintain consistent circular motion and controlled force",
  },
  {
    id: 2,
    phase: "Phacoemulsification",
    mistake: "Excessive power setting for soft nucleus",
    severity: "high",
    timestamp: "00:08:12",
    recommendation: "Reduce power to 40-50% for grade 2 nucleus density",
  },
  {
    id: 3,
    phase: "IOL Insertion",
    mistake: "Suboptimal IOL positioning",
    severity: "low",
    timestamp: "00:12:30",
    recommendation: "Ensure IOL is centered before releasing from injector",
  },
];

// Session Scoring Data
const sessionScores = [
  {
    session: "Session 12",
    date: "Today",
    overall: 92,
    technical: 94,
    safety: 90,
    efficiency: 91,
    duration: "14 min",
  },
  {
    session: "Session 11",
    date: "Yesterday",
    overall: 88,
    technical: 87,
    safety: 92,
    efficiency: 85,
    duration: "16 min",
  },
  {
    session: "Session 10",
    date: "2 days ago",
    overall: 85,
    technical: 83,
    safety: 88,
    efficiency: 84,
    duration: "18 min",
  },
];

// Skill Progression Data
const skillProgression = [
  { week: "Week 1", score: 65 },
  { week: "Week 2", score: 72 },
  { week: "Week 3", score: 78 },
  { week: "Week 4", score: 85 },
  { week: "Week 5", score: 88 },
  { week: "Week 6", score: 92 },
];

// AI Coaching Feedback
const aiCoachingFeedback = [
  {
    category: "Technique Excellence",
    icon: Star,
    color: "emerald",
    feedback: "Your capsulorhexis circular motion has improved by 23% over the last 5 sessions. Maintain this consistency.",
  },
  {
    category: "Safety Awareness",
    icon: CheckCircle2,
    color: "cyan",
    feedback: "Excellent posterior capsule protection. Zero incidents in last 10 procedures.",
  },
  {
    category: "Speed Optimization",
    icon: Zap,
    color: "violet",
    feedback: "Procedure time reduced by 18%. Focus on maintaining quality while improving efficiency.",
  },
  {
    category: "Learning Insight",
    icon: Lightbulb,
    color: "amber",
    feedback: "You learn best through repetitive practice. Consider additional capsulorhexis drills.",
  },
];

// Training Recommendations
const trainingRecommendations = [
  {
    priority: "high",
    title: "Advanced Capsulorhexis Workshop",
    description: "Focus on challenging cases with small pupils and weak zonules",
    estimatedTime: "45 min",
    skillGain: "+15%",
  },
  {
    priority: "medium",
    title: "Phaco Power Management",
    description: "Master power settings for different nucleus densities",
    estimatedTime: "30 min",
    skillGain: "+10%",
  },
  {
    priority: "low",
    title: "IOL Selection & Calculation",
    description: "Review biometry and IOL power calculation methods",
    estimatedTime: "20 min",
    skillGain: "+5%",
  },
];

export default function ResidentTrainingPage() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [selectedSession, setSelectedSession] = useState(sessionScores[0]);

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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/10">
              <GraduationCap className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Resident Training</h1>
              <p className="mt-1 text-sm text-white/60">
                Interactive learning modules for surgical skill development
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Progress Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <div className="mb-3 flex items-center justify-between">
              <GraduationCap className="h-6 w-6 text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-400">+12%</span>
            </div>
            <p className="text-sm text-white/55">Overall Progress</p>
            <p className="mt-1 text-3xl font-black text-white">68%</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <div className="mb-3 flex items-center justify-between">
              <CheckCircle2 className="h-6 w-6 text-cyan-300" />
              <span className="text-sm font-semibold text-cyan-400">1/4</span>
            </div>
            <p className="text-sm text-white/55">Modules Completed</p>
            <p className="mt-1 text-3xl font-black text-white">25%</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <div className="mb-3 flex items-center justify-between">
              <TrendingUp className="h-6 w-6 text-violet-300" />
              <span className="text-sm font-semibold text-violet-400">A-</span>
            </div>
            <p className="text-sm text-white/55">Average Score</p>
            <p className="mt-1 text-3xl font-black text-white">88.8%</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <div className="mb-3 flex items-center justify-between">
              <Award className="h-6 w-6 text-amber-300" />
              <span className="text-sm font-semibold text-amber-400">New!</span>
            </div>
            <p className="text-sm text-white/55">Achievements</p>
            <p className="mt-1 text-3xl font-black text-white">4</p>
          </div>
        </div>

        {/* Training Modules */}
        <div className="mb-8 animate-fade-in">
          <h2 className="mb-4 text-2xl font-bold">Training Modules</h2>
          <div className="grid gap-4">
            {trainingModules.map((module, index) => (
              <div
                key={module.id}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition-all hover:bg-white/10 card-hover cursor-pointer"
                onClick={() => setSelectedModule(module.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-xl font-bold">{module.title}</h3>
                      <span
                        className={`badge ${
                          module.status === "completed"
                            ? "badge-success"
                            : module.status === "in-progress"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {module.status === "completed"
                          ? "Completed"
                          : module.status === "in-progress"
                          ? "In Progress"
                          : "Not Started"}
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-white/60">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span>{module.lessons} lessons</span>
                      <span>•</span>
                      <span>{module.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-cyan-300">{module.progress}%</div>
                    <p className="text-xs text-white/40">Progress</p>
                  </div>
                </div>
                <div className="mt-4 progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${module.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Scores */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <FileText className="h-5 w-5 text-cyan-300" />
              Recent Scores
            </h3>
            <div className="space-y-3">
              {recentScores.map((score, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div>
                    <p className="font-semibold">{score.module}</p>
                    <p className="text-xs text-white/50">{score.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-cyan-300">{score.score}%</p>
                    <p className="text-xs text-emerald-400">{score.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Award className="h-5 w-5 text-amber-300" />
              Recent Achievements
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10">
                      <Icon className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="font-semibold">{achievement.title}</p>
                      <p className="text-xs text-white/50">{achievement.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <BarChart3 className="h-6 w-6 text-violet-300" />
            Performance Analytics
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {performanceMetrics.map((metric, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <p className="text-sm text-white/60">{metric.metric}</p>
                <p className="mt-2 text-3xl font-bold text-white">{metric.value}</p>
                <div className="mt-2 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">{metric.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Progression Tracking */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <LineChart className="h-6 w-6 text-cyan-300" />
            Skill Progression Tracking
          </h3>
          <div className="mb-6 flex items-end justify-between gap-2">
            {skillProgression.map((data, index) => {
              const height = (data.score / 100) * 200;
              return (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="text-sm font-bold text-cyan-300">{data.score}%</div>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500 to-violet-500 transition-all hover:opacity-80"
                    style={{ height: `${height}px` }}
                  />
                  <div className="text-xs text-white/50">{data.week}</div>
                </div>
              );
            })}
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-300" />
              <p className="text-sm text-white/80">
                <span className="font-bold text-cyan-300">+27% improvement</span> over the last 6 weeks.
                You're on track to complete all modules ahead of schedule!
              </p>
            </div>
          </div>
        </div>

        {/* Mistake Detection */}
        <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-400/5 p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <XCircle className="h-6 w-6 text-red-300" />
            Mistake Detection & Analysis
          </h3>
          <div className="space-y-3">
            {detectedMistakes.map((mistake) => (
              <div
                key={mistake.id}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-bold text-white">{mistake.phase}</span>
                      <span
                        className={`badge ${
                          mistake.severity === "high"
                            ? "badge-error"
                            : mistake.severity === "medium"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {mistake.severity}
                      </span>
                    </div>
                    <p className="text-sm text-red-300">{mistake.mistake}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/50">
                    <Clock className="h-4 w-4" />
                    {mistake.timestamp}
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3">
                  <p className="text-sm text-emerald-200">
                    <span className="font-semibold">💡 Recommendation: </span>
                    {mistake.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Procedure Replay */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <Play className="h-6 w-6 text-violet-300" />
            Procedure Replay
          </h3>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            {/* Video Placeholder */}
            <div className="mb-4 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-violet-900/50 to-cyan-900/50">
              <div className="text-center">
                <Play className="mx-auto mb-2 h-16 w-16 text-white/40" />
                <p className="text-sm text-white/60">Last Training Session Recording</p>
                <p className="text-xs text-white/40">Capsulorhexis Practice - Session 12</p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 hover:bg-violet-600 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 text-white" />
                  )}
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                  <RotateCcw className="h-5 w-5 text-white" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                  <FastForward className="h-5 w-5 text-white" />
                </button>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-1/3 rounded-full bg-violet-500" />
                  </div>
                </div>
                <span className="text-sm text-white/60">{currentTime} / 00:14:32</span>
              </div>

              {/* Mistake Markers */}
              <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                <p className="mb-2 text-sm font-semibold text-white/80">Detected Issues:</p>
                <div className="flex flex-wrap gap-2">
                  {detectedMistakes.map((mistake) => (
                    <button
                      key={mistake.id}
                      className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-1 text-xs text-red-300 hover:bg-red-400/20 transition-colors"
                    >
                      {mistake.timestamp} - {mistake.phase}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Scoring */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <Star className="h-6 w-6 text-amber-300" />
            Session Scoring
          </h3>
          <div className="space-y-4">
            {sessionScores.map((session, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                  selectedSession.session === session.session
                    ? "border-violet-400/50 bg-violet-400/10"
                    : "border-white/10 bg-black/25 hover:bg-black/40"
                }`}
                onClick={() => setSelectedSession(session)}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">{session.session}</h4>
                    <p className="text-xs text-white/50">{session.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-violet-300">{session.overall}</div>
                    <p className="text-xs text-white/40">Overall Score</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-center">
                    <p className="text-xs text-white/50">Technical</p>
                    <p className="mt-1 text-xl font-bold text-cyan-300">{session.technical}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-center">
                    <p className="text-xs text-white/50">Safety</p>
                    <p className="mt-1 text-xl font-bold text-emerald-300">{session.safety}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-center">
                    <p className="text-xs text-white/50">Efficiency</p>
                    <p className="mt-1 text-xl font-bold text-amber-300">{session.efficiency}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/50">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {session.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Coaching Feedback */}
        <div className="mt-8 rounded-3xl border border-violet-400/20 bg-violet-400/5 p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <MessageSquare className="h-6 w-6 text-violet-300" />
            AI Coaching Feedback
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {aiCoachingFeedback.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${item.color}-300/10`}>
                      <Icon className={`h-5 w-5 text-${item.color}-300`} />
                    </div>
                    <h4 className="font-bold text-white">{item.category}</h4>
                  </div>
                  <p className="text-sm text-white/70">{item.feedback}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Training Recommendations */}
        <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <Lightbulb className="h-6 w-6 text-cyan-300" />
            Training Recommendations
          </h3>
          <div className="space-y-3">
            {trainingRecommendations.map((rec, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black/25 p-4 hover:bg-black/40 transition-all cursor-pointer"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`badge ${
                          rec.priority === "high"
                            ? "badge-error"
                            : rec.priority === "medium"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {rec.priority} priority
                      </span>
                      <h4 className="font-bold text-white">{rec.title}</h4>
                    </div>
                    <p className="text-sm text-white/60">{rec.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-white/50">
                    <Clock className="h-4 w-4" />
                    {rec.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    {rec.skillGain} skill gain
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Feedback */}
        <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 backdrop-blur animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            AI-Generated Performance Feedback
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-emerald-300">Strengths</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>
                    Excellent progress in phase recognition with consistent 90%+ accuracy
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>Strong understanding of safety protocols and risk assessment</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>Demonstrates steady improvement across all modules</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-amber-300">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  <span>
                    Focus on capsulorhexis technique - practice circular motion consistency
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Review phacoemulsification power settings for different nucleus types</span>
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
              <p className="font-semibold text-yellow-200">Educational Tool Only</p>
              <p className="mt-1 text-sm text-yellow-200/80">
                This training platform is for educational purposes and skill assessment. It does
                not replace supervised clinical training or certification requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob