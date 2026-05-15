"use client";

import { LiveSurgery } from "../components/LiveSurgery";
import { Video, AlertTriangle } from "lucide-react";

export default function LiveSurgeryPage() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10">
              <Video className="h-6 w-6 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Live Surgery</h1>
              <p className="mt-1 text-sm text-white/60">
                Real-time surgical phase detection and safety monitoring
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Info Banner */}
        <div className="mb-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-4 backdrop-blur animate-fade-in">
          <div className="flex items-start gap-3">
            <Video className="h-5 w-5 flex-shrink-0 text-cyan-300" />
            <div>
              <p className="font-semibold text-cyan-200">Live Surgery Simulation</p>
              <p className="mt-1 text-sm text-cyan-200/80">
                This interactive simulation demonstrates real-time surgical phase detection with
                automatic progression, event logging, and comprehensive procedure summaries. Start
                the simulation to see AI-powered surgical intelligence in action.
              </p>
            </div>
          </div>
        </div>

        {/* Live Surgery Component */}
        <LiveSurgery />

        {/* Features Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <h3 className="mb-2 font-bold">Phase Detection</h3>
            <p className="text-sm text-white/60">
              AI automatically identifies surgical phases with high confidence scores
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <h3 className="mb-2 font-bold">Safety Monitoring</h3>
            <p className="text-sm text-white/60">
              Real-time risk assessment and alerts for potential complications
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur card-hover">
            <h3 className="mb-2 font-bold">Event Logging</h3>
            <p className="text-sm text-white/60">
              Complete audit trail of all phases, alerts, and recommendations
            </p>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-4 backdrop-blur animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-400" />
            <div>
              <p className="font-semibold text-yellow-200">Educational Prototype Only</p>
              <p className="mt-1 text-sm text-yellow-200/80">
                This is a demonstration prototype for hackathon purposes. It is not a medical
                device and must not be used for real intraoperative decisions without clinical
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