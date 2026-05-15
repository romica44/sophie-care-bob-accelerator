"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play, Pause, Square, Clock, Activity, AlertTriangle, CheckCircle2,
  TrendingUp, Eye, FileText, Zap, Droplets, Gauge, ThermometerSun,
  Brain, Shield, Award, History, User, Calendar, BarChart3, Target
} from "lucide-react";
import {
  SurgeryStatus,
  SurgeryPhase,
  EventLogEntry,
  SurgicalMetrics,
  AIRecommendation,
  SurgicalAnomaly,
  ProcedureScore,
  PatientInfo
} from "@/app/types/analysis";
import {
  enhancedSurgeryPhases,
  baselineMetrics,
  mockPatients,
  historicalProcedures
} from "@/app/lib/mockData";

export function LiveSurgery() {
  const [status, setStatus] = useState<SurgeryStatus>("idle");
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [phaseTime, setPhaseTime] = useState(0);
  const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
  const [metrics, setMetrics] = useState<SurgicalMetrics>(baselineMetrics);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [anomalies, setAnomalies] = useState<SurgicalAnomaly[]>([]);
  const [dynamicConfidence, setDynamicConfidence] = useState(98);
  const [patient] = useState<PatientInfo>(mockPatients[0]);
  const [procedureScore, setProcedureScore] = useState<ProcedureScore | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const metricsRef = useRef<NodeJS.Timeout | null>(null);

  const currentPhase = enhancedSurgeryPhases[currentPhaseIndex];
  const totalDuration = enhancedSurgeryPhases.reduce((sum, phase) => sum + phase.duration, 0);
  const overallProgress = (elapsedTime / totalDuration) * 100;
  const phaseProgress = (phaseTime / currentPhase.duration) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const addRecommendation = (message: string, priority: AIRecommendation["priority"], category: AIRecommendation["category"]) => {
    const rec: AIRecommendation = {
      id: `rec-${Date.now()}-${Math.random()}`,
      timestamp: elapsedTime,
      priority,
      category,
      message,
      confidence: 85 + Math.random() * 15
    };
    setRecommendations((prev) => [rec, ...prev].slice(0, 10));
    addLogEntry(message, "recommendation", priority === "high" ? "warning" : "info");
  };

  const addAnomaly = (type: string, description: string, severity: SurgicalAnomaly["severity"]) => {
    const anomaly: SurgicalAnomaly = {
      id: `anom-${Date.now()}-${Math.random()}`,
      timestamp: elapsedTime,
      severity,
      type,
      description,
      resolved: false
    };
    setAnomalies((prev) => [anomaly, ...prev]);
    addLogEntry(`⚠️ ${type}: ${description}`, "anomaly", severity === "critical" ? "critical" : "warning");
  };

  const resolveAnomaly = (id: string) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true, resolvedAt: elapsedTime } : a))
    );
  };

  const updateMetrics = () => {
    if (status !== "running") return;

    const phase = currentPhase.name;
    let newMetrics = { ...metrics };

    // Update metrics based on phase
    if (phase === "Phacoemulsification") {
      newMetrics.ultrasoundPower = 35 + Math.random() * 20;
      newMetrics.vacuumPressure = 350 + Math.random() * 60;
      newMetrics.irrigationFlow = 26 + Math.random() * 4;
      newMetrics.chamberDepth = 3.0 + Math.random() * 0.4;
      newMetrics.totalFluidUsed += 0.5;
    } else if (phase === "IOL Implantation") {
      newMetrics.ultrasoundPower = 0;
      newMetrics.vacuumPressure = 0;
      newMetrics.irrigationFlow = 20 + Math.random() * 3;
      newMetrics.chamberDepth = 3.1 + Math.random() * 0.3;
      newMetrics.totalFluidUsed += 0.2;
    } else if (phase === "Incision" || phase === "Capsulorhexis") {
      newMetrics.ultrasoundPower = 0;
      newMetrics.vacuumPressure = 0;
      newMetrics.irrigationFlow = 22 + Math.random() * 2;
      newMetrics.chamberDepth = 3.2 + Math.random() * 0.2;
      newMetrics.totalFluidUsed += 0.1;
    } else {
      newMetrics.ultrasoundPower = 0;
      newMetrics.vacuumPressure = 0;
      newMetrics.irrigationFlow = 18 + Math.random() * 2;
      newMetrics.chamberDepth = 3.3 + Math.random() * 0.1;
      newMetrics.totalFluidUsed += 0.05;
    }

    newMetrics.temperature = 21 + Math.random() * 1.5;

    // Dynamic confidence based on metrics
    let confidence = currentPhase.confidence;
    if (newMetrics.chamberDepth < 2.8) confidence -= 5;
    if (newMetrics.ultrasoundPower > 50) confidence -= 3;
    if (newMetrics.vacuumPressure > 400) confidence -= 2;
    
    setDynamicConfidence(Math.max(85, Math.min(99, confidence + (Math.random() - 0.5) * 2)));
    setMetrics(newMetrics);

    // Trigger anomalies occasionally
    if (Math.random() < 0.02 && phase === "Phacoemulsification") {
      if (anomalies.filter(a => !a.resolved).length === 0) {
        addAnomaly(
          "Posterior Capsule Stress",
          "Increased tension detected on posterior capsule",
          "warning"
        );
        // Auto-resolve after 15 seconds
        setTimeout(() => {
          setAnomalies(prev => {
            const latest = prev[0];
            if (latest && !latest.resolved) {
              resolveAnomaly(latest.id);
              addLogEntry("✓ Anomaly resolved: Posterior capsule tension normalized", "status", "success");
            }
            return prev;
          });
        }, 15000);
      }
    }
  };

  const calculateProcedureScore = (): ProcedureScore => {
    const techniqueScore = 92 + Math.random() * 6;
    const efficiencyScore = 88 + Math.random() * 8;
    const safetyScore = 94 + Math.random() * 5;
    const teachingScore = 90 + Math.random() * 7;

    const overall = (techniqueScore * 0.3 + efficiencyScore * 0.25 + safetyScore * 0.35 + teachingScore * 0.1);

    return {
      overall: Math.round(overall),
      technique: Math.round(techniqueScore),
      efficiency: Math.round(efficiencyScore),
      safety: Math.round(safetyScore),
      teaching: Math.round(teachingScore),
      breakdown: [
        {
          category: "Surgical Technique",
          score: Math.round(techniqueScore),
          weight: 30,
          feedback: "Excellent instrument handling and tissue manipulation throughout procedure"
        },
        {
          category: "Efficiency",
          score: Math.round(efficiencyScore),
          weight: 25,
          feedback: "Good time management with minimal unnecessary movements"
        },
        {
          category: "Safety",
          score: Math.round(safetyScore),
          weight: 35,
          feedback: "Outstanding safety awareness and complication prevention"
        },
        {
          category: "Teaching Value",
          score: Math.round(teachingScore),
          weight: 10,
          feedback: "Clear demonstration of key techniques suitable for resident education"
        }
      ]
    };
  };


  const addLogEntry = (
    message: string,
    type: EventLogEntry["type"],
    severity: EventLogEntry["severity"] = "info",
    metadata?: Record<string, any>
  ) => {
    const entry: EventLogEntry = {
      timestamp: formatTime(elapsedTime),
      type,
      message,
      severity,
      metadata
    };
    setEventLog((prev) => [entry, ...prev].slice(0, 50));
  };

  const startSurgery = () => {
    setStatus("running");
    if (currentPhaseIndex === 0 && elapsedTime === 0) {
      addLogEntry("Live surgery simulation started", "status", "success");
      addLogEntry(`Patient: ${patient.id} - ${patient.condition}`, "status", "info");
      addLogEntry(`Phase 1: ${currentPhase.name} - ${currentPhase.tip}`, "phase", "info");
      addRecommendation("Verify all instruments and settings before proceeding", "high", "safety");
    } else {
      addLogEntry("Surgery resumed", "status", "success");
    }
  };

  const pauseSurgery = () => {
    setStatus("paused");
    addLogEntry("Surgery paused", "status", "warning");
  };

  const stopSurgery = () => {
    setStatus("completed");
    const score = calculateProcedureScore();
    setProcedureScore(score);
    addLogEntry("Surgery completed successfully", "status", "success");
    addLogEntry(`Total duration: ${formatTime(elapsedTime)}`, "status", "info");
    addLogEntry(`Overall procedure score: ${score.overall}/100`, "status", "success");
    if (timerRef.current) clearInterval(timerRef.current);
    if (metricsRef.current) clearInterval(metricsRef.current);
  };

  const resetSurgery = () => {
    setStatus("idle");
    setCurrentPhaseIndex(0);
    setElapsedTime(0);
    setPhaseTime(0);
    setEventLog([]);
    setMetrics(baselineMetrics);
    setRecommendations([]);
    setAnomalies([]);
    setDynamicConfidence(98);
    setProcedureScore(null);
    if (timerRef.current) clearInterval(timerRef.current);
    if (metricsRef.current) clearInterval(metricsRef.current);
  };

  // Timer effect
  useEffect(() => {
    if (status === "running") {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        setPhaseTime((prev) => {
          const newPhaseTime = prev + 1;
          
          // Check if phase is complete
          if (newPhaseTime >= currentPhase.duration) {
            // Move to next phase
            if (currentPhaseIndex < enhancedSurgeryPhases.length - 1) {
              const nextPhaseIndex = currentPhaseIndex + 1;
              const nextPhase = enhancedSurgeryPhases[nextPhaseIndex];
              
              addLogEntry(`Phase ${currentPhaseIndex + 1} completed: ${currentPhase.name}`, "phase", "success");
              addLogEntry(`Phase ${nextPhaseIndex + 1} started: ${nextPhase.name}`, "phase", "info");
              addLogEntry(nextPhase.tip, "recommendation", "info");
              
              setCurrentPhaseIndex(nextPhaseIndex);
              return 0;
            } else {
              // Surgery complete
              stopSurgery();
              return prev;
            }
          }
          
          // Add periodic alerts and recommendations
          if (newPhaseTime % 30 === 0 && newPhaseTime > 0) {
            const alertIndex = Math.floor(newPhaseTime / 30) % currentPhase.alerts.length;
            addLogEntry(currentPhase.alerts[alertIndex], "alert", "info");
          }
          
          if (newPhaseTime % 45 === 0 && newPhaseTime > 0) {
            const recIndex = Math.floor(newPhaseTime / 45) % currentPhase.recommendations.length;
            const priority = Math.random() > 0.7 ? "high" : "medium";
            addRecommendation(currentPhase.recommendations[recIndex], priority as any, "technique");
          }
          
          return newPhaseTime;
        });
      }, 1000);

      metricsRef.current = setInterval(updateMetrics, 2000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (metricsRef.current) clearInterval(metricsRef.current);
      };
    }
  }, [status, currentPhaseIndex, currentPhase]);

  const riskClasses = (risk: string) => {
    if (risk === "Low") return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
    if (risk === "Medium") return "border-amber-400/30 bg-amber-400/10 text-amber-200";
    if (risk === "High") return "border-orange-400/30 bg-orange-400/10 text-orange-200";
    return "border-red-400/30 bg-red-400/10 text-red-200";
  };

  const unresolvedAnomalies = anomalies.filter(a => !a.resolved);

  return (
    <div className="space-y-6">
      {/* Patient Info Banner */}
      <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-4 backdrop-blur animate-fade-in">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 flex-shrink-0 text-cyan-300" />
          <div className="flex-1">
            <p className="font-semibold text-cyan-200">Patient Information</p>
            <div className="mt-2 grid gap-2 text-sm text-cyan-200/80 sm:grid-cols-2 lg:grid-cols-4">
              <div><span className="text-cyan-300">ID:</span> {patient.id}</div>
              <div><span className="text-cyan-300">Age:</span> {patient.age} years, {patient.gender}</div>
              <div><span className="text-cyan-300">Eye:</span> {patient.eye}</div>
              <div><span className="text-cyan-300">Complexity:</span> {patient.complexity}</div>
            </div>
            <p className="mt-2 text-sm text-cyan-200/70">{patient.condition}</p>
          </div>
        </div>
      </div>

      {/* Main Console */}
      <div className="rounded-3xl border border-white/10 bg-black/35 p-6 shadow-2xl backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-bold">Live Surgical Console</p>
            <p className="text-sm text-white/50">Real-time cataract surgery simulation</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`status-dot ${status === "running" ? "active" : "inactive"}`}></span>
            <span className={`rounded-full border px-3 py-1 text-xs font-bold ${
              status === "running" 
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" 
                : status === "paused"
                ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
                : status === "completed"
                ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                : "border-white/15 bg-white/10 text-white/60"
            }`}>
              {status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Visual Display */}
        <div className="relative min-h-[330px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-950 via-indigo-950 to-black p-5">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at center, rgba(34,211,238,.8) 0 1px, transparent 2px)", backgroundSize: "26px 26px" }} />
          <div className="relative flex h-full min-h-[290px] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 animate-bounce-subtle">
                <Eye className="h-10 w-10 text-cyan-200" />
              </div>
              <div className="grid gap-3 text-right">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 glass">
                  <p className="text-xs text-white/50">AI Confidence</p>
                  <p className="text-3xl font-black text-cyan-200">{Math.round(dynamicConfidence)}%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 glass">
                  <p className="text-xs text-white/50">Elapsed Time</p>
                  <p className="text-2xl font-black text-white">{formatTime(elapsedTime)}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-4 progress-bar">
                <div className="progress-bar-fill" style={{ width: `${overallProgress}%` }} />
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4 glass">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">Current Phase {currentPhaseIndex + 1}/{enhancedSurgeryPhases.length}</p>
                  <p className="mt-1 text-3xl font-black">{currentPhase.name}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{currentPhase.tip}</p>
                  <div className="mt-3 progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${phaseProgress}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-white/40">Phase progress: {Math.round(phaseProgress)}%</p>
                </div>
                <div className={`rounded-2xl border p-4 ${riskClasses(currentPhase.risk)}`}>
                  <AlertTriangle className="mb-2 h-6 w-6" />
                  <p className="text-xs uppercase tracking-[0.2em] opacity-70">Risk</p>
                  <p className="text-2xl font-black">{currentPhase.risk}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex flex-wrap gap-3">
          {status === "idle" && (
            <button onClick={startSurgery} className="btn-primary inline-flex items-center gap-2">
              <Play className="h-4 w-4" /> Start Live Surgery
            </button>
          )}
          {status === "running" && (
            <button onClick={pauseSurgery} className="btn-primary inline-flex items-center gap-2">
              <Pause className="h-4 w-4" /> Pause
            </button>
          )}
          {status === "paused" && (
            <button onClick={startSurgery} className="btn-primary inline-flex items-center gap-2">
              <Play className="h-4 w-4" /> Resume
            </button>
          )}
          {(status === "running" || status === "paused") && (
            <button onClick={stopSurgery} className="btn-secondary inline-flex items-center gap-2">
              <Square className="h-4 w-4" /> End Surgery
            </button>
          )}
          {(status === "completed" || status === "paused") && (
            <button onClick={resetSurgery} className="btn-secondary">
              Reset
            </button>
          )}
        </div>
      </div>
      {/* Surgical Metrics Dashboard */}
      {status !== "idle" && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <BarChart3 className="h-5 w-5 text-violet-300" />
            Surgical Metrics Dashboard
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-amber-300" />
                <p className="text-xs text-white/50">Ultrasound Power</p>
              </div>
              <p className="text-2xl font-black text-white">{metrics.ultrasoundPower.toFixed(1)}%</p>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${metrics.ultrasoundPower}%` }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="h-5 w-5 text-cyan-300" />
                <p className="text-xs text-white/50">Vacuum Pressure</p>
              </div>
              <p className="text-2xl font-black text-white">{Math.round(metrics.vacuumPressure)} mmHg</p>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${(metrics.vacuumPressure / 500) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-blue-300" />
                <p className="text-xs text-white/50">Irrigation Flow</p>
              </div>
              <p className="text-2xl font-black text-white">{metrics.irrigationFlow.toFixed(1)} ml/min</p>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${(metrics.irrigationFlow / 35) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-emerald-300" />
                <p className="text-xs text-white/50">Chamber Depth</p>
              </div>
              <p className="text-2xl font-black text-white">{metrics.chamberDepth.toFixed(2)} mm</p>
              <p className="mt-1 text-xs text-emerald-300">Optimal range: 2.8-3.5mm</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 mb-2">
                <ThermometerSun className="h-5 w-5 text-orange-300" />
                <p className="text-xs text-white/50">Temperature</p>
              </div>
              <p className="text-2xl font-black text-white">{metrics.temperature.toFixed(1)}°C</p>
              <p className="mt-1 text-xs text-white/40">Room temperature stable</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-violet-300" />
                <p className="text-xs text-white/50">Total Fluid Used</p>
              </div>
              <p className="text-2xl font-black text-white">{metrics.totalFluidUsed.toFixed(1)} ml</p>
              <p className="mt-1 text-xs text-white/40">Within normal limits</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div className="rounded-3xl border border-violet-300/20 bg-violet-300/5 p-6 animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Brain className="h-5 w-5 text-violet-300" />
            AI Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.slice(0, 5).map((rec) => (
              <div
                key={rec.id}
                className={`flex gap-3 rounded-2xl border p-4 transition-all hover:bg-white/5 ${
                  rec.priority === "high"
                    ? "border-amber-400/30 bg-amber-400/5"
                    : rec.priority === "medium"
                    ? "border-violet-400/30 bg-violet-400/5"
                    : "border-white/10 bg-black/25"
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`rounded-xl p-2 ${
                    rec.priority === "high" ? "bg-amber-400/20" :
                    rec.priority === "medium" ? "bg-violet-400/20" :
                    "bg-white/10"
                  }`}>
                    <TrendingUp className={`h-5 w-5 ${
                      rec.priority === "high" ? "text-amber-300" :
                      rec.priority === "medium" ? "text-violet-300" :
                      "text-white/60"
                    }`} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      rec.priority === "high" ? "text-amber-300" :
                      rec.priority === "medium" ? "text-violet-300" :
                      "text-white/60"
                    }`}>
                      {rec.priority} priority
                    </span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/40">{rec.category}</span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/40">{Math.round(rec.confidence)}% confidence</span>
                  </div>
                  <p className="text-sm text-white/80">{rec.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Surgical Anomaly Alerts */}
      {unresolvedAnomalies.length > 0 && (
        <div className="rounded-3xl border border-red-400/30 bg-red-400/5 p-6 animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Shield className="h-5 w-5 text-red-300" />
            Active Anomaly Alerts
          </h3>
          <div className="space-y-3">
            {unresolvedAnomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className={`flex gap-3 rounded-2xl border p-4 ${
                  anomaly.severity === "critical"
                    ? "border-red-400/40 bg-red-400/10"
                    : "border-amber-400/40 bg-amber-400/10"
                }`}
              >
                <AlertTriangle className={`h-6 w-6 flex-shrink-0 ${
                  anomaly.severity === "critical" ? "text-red-300" : "text-amber-300"
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      anomaly.severity === "critical" ? "text-red-300" : "text-amber-300"
                    }`}>
                      {anomaly.severity}
                    </span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/40">{anomaly.type}</span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/40">{formatTime(anomaly.timestamp)}</span>
                  </div>
                  <p className="text-sm text-white/80">{anomaly.description}</p>
                  <p className="mt-2 text-xs text-white/50">AI monitoring for resolution...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Event Timeline */}
      {eventLog.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Activity className="h-5 w-5 text-cyan-300" />
            Event Timeline
          </h3>
          <div className="max-h-[400px] space-y-2 overflow-y-auto pr-2">
            {eventLog.map((entry, index) => (
              <div
                key={index}
                className={`flex gap-3 rounded-2xl border p-3 text-sm transition-all hover:bg-white/5 ${
                  entry.severity === "success"
                    ? "border-emerald-400/20 bg-emerald-400/5"
                    : entry.severity === "warning"
                    ? "border-amber-400/20 bg-amber-400/5"
                    : entry.severity === "critical"
                    ? "border-red-400/20 bg-red-400/5"
                    : "border-white/10 bg-black/25"
                }`}
              >
                <span className="shrink-0 font-mono text-xs text-white/40">{entry.timestamp}</span>
                <div className="flex-1">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider ${
                    entry.type === "phase" ? "text-cyan-300" :
                    entry.type === "alert" ? "text-amber-300" :
                    entry.type === "recommendation" ? "text-violet-300" :
                    entry.type === "anomaly" ? "text-red-300" :
                    entry.type === "metric" ? "text-blue-300" :
                    "text-white/60"
                  }`}>
                    {entry.type === "phase" && <Activity className="h-3 w-3" />}
                    {entry.type === "alert" && <AlertTriangle className="h-3 w-3" />}
                    {entry.type === "recommendation" && <TrendingUp className="h-3 w-3" />}
                    {entry.type === "status" && <CheckCircle2 className="h-3 w-3" />}
                    {entry.type === "anomaly" && <Shield className="h-3 w-3" />}
                    {entry.type === "metric" && <BarChart3 className="h-3 w-3" />}
                    {entry.type}
                  </span>
                  <p className="mt-1 text-white/70">{entry.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Procedure Completion Score */}
      {status === "completed" && procedureScore && (
        <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/5 p-6 animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Award className="h-5 w-5 text-emerald-300" />
            Procedure Completion Score
          </h3>
          
          {/* Overall Score */}
          <div className="mb-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center">
            <p className="text-sm text-emerald-200/70 uppercase tracking-wider">Overall Score</p>
            <p className="text-6xl font-black text-emerald-200 my-2">{procedureScore.overall}</p>
            <p className="text-sm text-emerald-200/70">out of 100</p>
            <div className="mt-4 h-3 rounded-full bg-white/10">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                style={{ width: `${procedureScore.overall}%` }}
              />
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs text-white/50 mb-2">Technique</p>
              <p className="text-3xl font-black text-cyan-200">{procedureScore.technique}</p>
              <p className="text-xs text-white/40 mt-1">Weight: 30%</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs text-white/50 mb-2">Efficiency</p>
              <p className="text-3xl font-black text-violet-200">{procedureScore.efficiency}</p>
              <p className="text-xs text-white/40 mt-1">Weight: 25%</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs text-white/50 mb-2">Safety</p>
              <p className="text-3xl font-black text-emerald-200">{procedureScore.safety}</p>
              <p className="text-xs text-white/40 mt-1">Weight: 35%</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs text-white/50 mb-2">Teaching</p>
              <p className="text-3xl font-black text-amber-200">{procedureScore.teaching}</p>
              <p className="text-xs text-white/40 mt-1">Weight: 10%</p>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="space-y-3">
            {procedureScore.breakdown.map((item, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{item.category}</span>
                  <span className="text-lg font-bold text-cyan-200">{item.score}/100</span>
                </div>
                <p className="text-sm text-white/60">{item.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Procedures Summary */}
      {status === "completed" && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <History className="h-5 w-5 text-cyan-300" />
            Recent Procedure History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/50">Date</th>
                  <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/50">ID</th>
                  <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/50">Age</th>
                  <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/50">Complexity</th>
                  <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/50">Duration</th>
                  <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/50">Score</th>
                  <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/50">Surgeon</th>
                  <th className="pb-3 text-left text-xs uppercase tracking-wider text-white/50">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {historicalProcedures.map((proc) => (
                  <tr key={proc.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 text-white/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-white/40" />
                        {new Date(proc.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 font-mono text-xs text-white/60">{proc.id}</td>
                    <td className="py-3 text-white/70">{proc.patientAge}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        proc.complexity === "Simple" ? "bg-emerald-400/20 text-emerald-200" :
                        proc.complexity === "Moderate" ? "bg-amber-400/20 text-amber-200" :
                        "bg-red-400/20 text-red-200"
                      }`}>
                        {proc.complexity}
                      </span>
                    </td>
                    <td className="py-3 text-white/70">{formatTime(proc.duration)}</td>
                    <td className="py-3">
                      <span className="font-bold text-cyan-200">{proc.overallScore}</span>
                    </td>
                    <td className="py-3 text-white/70">{proc.surgeon}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        proc.outcome === "Excellent" ? "bg-emerald-400/20 text-emerald-200" :
                        proc.outcome === "Good" ? "bg-cyan-400/20 text-cyan-200" :
                        "bg-amber-400/20 text-amber-200"
                      }`}>
                        {proc.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Procedure Summary */}
      {status === "completed" && (
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-6 animate-fade-in">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <FileText className="h-5 w-5 text-cyan-300" />
            Procedure Summary
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Clock className="mb-2 h-6 w-6 text-cyan-300" />
              <p className="text-xs text-white/50">Total Duration</p>
              <p className="text-2xl font-black text-white">{formatTime(elapsedTime)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <Activity className="mb-2 h-6 w-6 text-cyan-300" />
              <p className="text-xs text-white/50">Phases Completed</p>
              <p className="text-2xl font-black text-white">{enhancedSurgeryPhases.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <TrendingUp className="mb-2 h-6 w-6 text-emerald-300" />
              <p className="text-xs text-white/50">Avg Confidence</p>
              <p className="text-2xl font-black text-emerald-300">
                {Math.round(enhancedSurgeryPhases.reduce((sum, p) => sum + p.confidence, 0) / enhancedSurgeryPhases.length)}%
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <CheckCircle2 className="mb-2 h-6 w-6 text-emerald-300" />
              <p className="text-xs text-white/50">Status</p>
              <p className="text-2xl font-black text-emerald-300">Success</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
            <h4 className="mb-3 font-bold">Phase Breakdown</h4>
            <div className="space-y-2">
              {enhancedSurgeryPhases.map((phase, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{phase.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white/50">{formatTime(phase.duration)}</span>
                    <span className={`badge ${riskClasses(phase.risk)}`}>{phase.risk}</span>
                    <span className="font-bold text-cyan-200">{phase.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
