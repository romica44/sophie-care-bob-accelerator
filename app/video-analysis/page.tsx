"use client";

import { VideoUpload } from "../components/VideoUpload";
import { FileVideo, AlertTriangle } from "lucide-react";
import { dashboardStore } from "../lib/dashboardStore";

export default function VideoAnalysisPage() {
  const handleAnalysisComplete = (results: any) => {
    // Update dashboard metrics
    dashboardStore.addAnalysis({
      procedure: results.procedure,
      overallConfidence: results.overallConfidence,
      fileName: results.fileName || "video.mp4"
    });
  };

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
              <FileVideo className="h-6 w-6 text-violet-300" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Video Analysis</h1>
              <p className="mt-1 text-sm text-white/60">
                Upload and analyze surgical videos with AI-powered insights
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Info Banner */}
        <div className="mb-6 rounded-3xl border border-violet-300/20 bg-violet-300/5 p-4 backdrop-blur animate-fade-in">
          <div className="flex items-start gap-3">
            <FileVideo className="h-5 w-5 flex-shrink-0 text-violet-300" />
            <div>
              <p className="font-semibold text-violet-200">AI-Powered Video Analysis</p>
              <p className="mt-1 text-sm text-violet-200/80">
                Upload surgical videos to receive comprehensive AI analysis including phase
                detection, risk assessment, and resident training feedback. The system uses mock
                processing for demonstration purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Video Upload Component */}
        <VideoUpload onAnalysisComplete={handleAnalysisComplete} />

        {/* Features Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10">
              <FileVideo className="h-5 w-5 text-cyan-300" />
            </div>
            <h3 className="mb-2 font-bold">Phase Detection</h3>
            <p className="text-sm text-white/60">
              Automatic identification of all surgical phases with timestamps
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10">
              <AlertTriangle className="h-5 w-5 text-amber-300" />
            </div>
            <h3 className="mb-2 font-bold">Risk Analysis</h3>
            <p className="text-sm text-white/60">
              Detection of potential complications and safety concerns
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10">
              <svg
                className="h-5 w-5 text-emerald-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold">Quality Metrics</h3>
            <p className="text-sm text-white/60">
              Confidence scores and performance indicators for each phase
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-300/10">
              <svg
                className="h-5 w-5 text-violet-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold">Training Feedback</h3>
            <p className="text-sm text-white/60">
              Detailed recommendations for resident education and improvement
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
          <h2 className="mb-4 text-xl font-bold">How It Works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-300/20 text-sm font-bold text-cyan-300">
                1
              </div>
              <div>
                <h3 className="font-semibold">Upload Video</h3>
                <p className="mt-1 text-sm text-white/60">
                  Drag and drop or select a surgical video file from your device
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-300/20 text-sm font-bold text-cyan-300">
                2
              </div>
              <div>
                <h3 className="font-semibold">AI Processing</h3>
                <p className="mt-1 text-sm text-white/60">
                  Our AI analyzes the video for phases, risks, and quality metrics
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-300/20 text-sm font-bold text-cyan-300">
                3
              </div>
              <div>
                <h3 className="font-semibold">Review Results</h3>
                <p className="mt-1 text-sm text-white/60">
                  Get comprehensive insights, feedback, and training recommendations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-4 backdrop-blur animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-400" />
            <div>
              <p className="font-semibold text-yellow-200">Educational Prototype Only</p>
              <p className="mt-1 text-sm text-yellow-200/80">
                This is a demonstration prototype using mock AI processing. It is not a medical
                device and must not be used for clinical decision-making without proper validation
                and regulatory approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob