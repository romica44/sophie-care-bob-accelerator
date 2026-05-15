"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  FileText,
  TrendingUp,
  Eye,
  Stethoscope,
  Brain,
  Shield,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { mockPatientCases, riskIndicators } from "@/app/lib/mockData";
import { PatientCase } from "@/app/types/analysis";

type FilterStatus = "All" | "Scheduled" | "In Progress" | "Completed";
type FilterRisk = "All" | "Low" | "Medium" | "High";

export default function PatientCasesPage() {
  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(
    mockPatientCases[0]
  );
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All");
  const [filterRisk, setFilterRisk] = useState<FilterRisk>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter cases
  const filteredCases = mockPatientCases.filter((patientCase) => {
    const matchesStatus =
      filterStatus === "All" || patientCase.surgeryStatus === filterStatus;
    const matchesRisk =
      filterRisk === "All" || patientCase.riskLevel === filterRisk;
    const matchesSearch =
      searchQuery === "" ||
      patientCase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patientCase.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesRisk && matchesSearch;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "High":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      case "Critical":
        return "text-red-500 bg-red-500/10 border-red-500/30";
      default:
        return "text-white/60 bg-white/5 border-white/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "text-cyan-400 bg-cyan-400/10 border-cyan-400/30";
      case "In Progress":
        return "text-violet-400 bg-violet-400/10 border-violet-400/30";
      case "Completed":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
      case "Cancelled":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      default:
        return "text-white/60 bg-white/5 border-white/10";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "text-red-400";
      case "High":
        return "text-orange-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-emerald-400";
      default:
        return "text-white/60";
    }
  };

  return (
    <div className="min-h-screen text-white">
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
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Patient Case Management
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Comprehensive surgical planning and patient tracking
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-cyan-300/10 px-4 py-2">
                <span className="text-sm font-semibold text-cyan-300">
                  {filteredCases.length} Cases
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-8">
        <div className="grid gap-6 md:grid-cols-12">
          {/* Patient List Sidebar */}
          <div className="md:col-span-12 lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <Users className="h-5 w-5 text-cyan-300" />
                  Patient List
                </h2>
              </div>

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/25 py-2 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/20"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="mb-4 space-y-3">
                <div>
                  <p className="mb-2 text-xs font-semibold text-white/50 uppercase tracking-wide">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(["All", "Scheduled", "In Progress", "Completed"] as FilterStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                            filterStatus === status
                              ? "bg-cyan-300 text-slate-950"
                              : "bg-white/5 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          {status}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-white/50 uppercase tracking-wide">Risk Level</p>
                  <div className="flex flex-wrap gap-2">
                    {(["All", "Low", "Medium", "High"] as FilterRisk[]).map((risk) => (
                      <button
                        key={risk}
                        onClick={() => setFilterRisk(risk)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                          filterRisk === risk
                            ? "bg-cyan-300 text-slate-950"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Patient Cards */}
              <div className="space-y-2">
                {filteredCases.map((patientCase) => (
                  <button
                    key={patientCase.id}
                    onClick={() => setSelectedCase(patientCase)}
                    className={`w-full rounded-xl border p-3 text-left transition-all ${
                      selectedCase?.id === patientCase.id
                        ? "border-cyan-300/50 bg-cyan-300/10"
                        : "border-white/10 bg-black/25 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          {patientCase.name}
                        </p>
                        <p className="text-xs text-white/50">
                          {patientCase.patientId}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold ${getPriorityColor(
                          patientCase.priority
                        )}`}
                      >
                        {patientCase.priority}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getRiskColor(
                          patientCase.riskLevel
                        )}`}
                      >
                        {patientCase.riskLevel} Risk
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusColor(
                          patientCase.surgeryStatus
                        )}`}
                      >
                        {patientCase.surgeryStatus}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="md:col-span-12 lg:col-span-8">
            {selectedCase ? (
              <div className="space-y-6">
                {/* Patient Header */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-black">{selectedCase.name}</h2>
                      <p className="mt-1 text-sm text-white/60">
                        {selectedCase.patientId} • {selectedCase.age}y {selectedCase.gender}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-sm font-semibold ${getRiskColor(
                          selectedCase.riskLevel
                        )}`}
                      >
                        {selectedCase.riskLevel} Risk
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 text-sm font-semibold ${getStatusColor(
                          selectedCase.surgeryStatus
                        )}`}
                      >
                        {selectedCase.surgeryStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                      <p className="text-xs text-white/55">Diagnosis</p>
                      <p className="mt-1 text-sm font-semibold">
                        {selectedCase.diagnosis}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                      <p className="text-xs text-white/55">Eye</p>
                      <p className="mt-1 text-sm font-semibold flex items-center gap-1">
                        <Eye className="h-4 w-4 text-cyan-300" />
                        {selectedCase.eye}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                      <p className="text-xs text-white/55">Surgeon</p>
                      <p className="mt-1 text-sm font-semibold flex items-center gap-1">
                        <Stethoscope className="h-4 w-4 text-violet-300" />
                        {selectedCase.assignedSurgeon}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                      <p className="text-xs text-white/55">
                        {selectedCase.surgeryStatus === "Completed"
                          ? "Completed"
                          : "Scheduled"}
                      </p>
                      <p className="mt-1 text-sm font-semibold flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-emerald-300" />
                        {selectedCase.completedDate || selectedCase.scheduledDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Indicators */}
                {selectedCase.comorbidities.length > 0 && (
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      Risk Indicators
                    </h3>
                    <div className="space-y-3">
                      {selectedCase.comorbidities.map((comorbidity, index) => {
                        const indicator = riskIndicators.find((r) =>
                          comorbidity.toLowerCase().includes(r.category.toLowerCase())
                        );
                        return (
                          <div
                            key={index}
                            className="rounded-xl border border-white/10 bg-black/25 p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-white">
                                  {comorbidity}
                                </p>
                                {indicator && (
                                  <>
                                    <p className="mt-1 text-sm text-white/70">
                                      {indicator.description}
                                    </p>
                                    <p className="mt-2 text-xs text-cyan-300">
                                      <strong>Mitigation:</strong>{" "}
                                      {indicator.mitigationStrategy}
                                    </p>
                                  </>
                                )}
                              </div>
                              {indicator && (
                                <span
                                  className={`ml-3 rounded-full border px-2 py-0.5 text-xs font-medium ${getRiskColor(
                                    indicator.level
                                  )}`}
                                >
                                  {indicator.level}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* AI Recommendations */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                    <Brain className="h-5 w-5 text-violet-400" />
                    AI-Generated Recommendations
                  </h3>
                  <div className="space-y-2">
                    {selectedCase.aiRecommendations.map((recommendation, index) => (
                      <div
                        key={index}
                        className={`rounded-xl border p-3 ${
                          recommendation.includes("HIGH")
                            ? "border-red-400/30 bg-red-400/5"
                            : recommendation.includes("URGENT")
                            ? "border-orange-400/30 bg-orange-400/5"
                            : "border-white/10 bg-black/25"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {recommendation.includes("HIGH") ||
                          recommendation.includes("URGENT") ? (
                            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-400 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-400 mt-0.5" />
                          )}
                          <p className="text-sm text-white/90">{recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Procedure History */}
                {selectedCase.procedureHistory.length > 0 && (
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <Activity className="h-5 w-5 text-emerald-400" />
                      Procedure History
                    </h3>
                    <div className="space-y-3">
                      {selectedCase.procedureHistory.map((procedure) => (
                        <div
                          key={procedure.id}
                          className="rounded-xl border border-white/10 bg-black/25 p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-white">
                                {procedure.type}
                              </p>
                              <p className="mt-1 text-xs text-white/50">
                                {procedure.date} • {procedure.eye} Eye •{" "}
                                {Math.floor(procedure.duration / 60)} minutes
                              </p>
                              <p className="mt-2 text-sm text-white/70">
                                {procedure.notes}
                              </p>
                              {procedure.complications.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs font-semibold text-yellow-400">
                                    Complications:
                                  </p>
                                  <ul className="mt-1 list-inside list-disc text-xs text-white/60">
                                    {procedure.complications.map((comp, idx) => (
                                      <li key={idx}>{comp}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            <div className="ml-4 text-right">
                              <span
                                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                                  procedure.outcome === "Excellent"
                                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                                    : procedure.outcome === "Good"
                                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
                                    : "border-yellow-400/30 bg-yellow-400/10 text-yellow-400"
                                }`}
                              >
                                {procedure.outcome}
                              </span>
                              <p className="mt-1 text-xs text-white/50">
                                {procedure.surgeon}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clinical Notes */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur animate-fade-in">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                    <FileText className="h-5 w-5 text-cyan-300" />
                    Clinical Notes
                  </h3>
                  <div className="space-y-2">
                    {selectedCase.notes.map((note, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-white/10 bg-black/25 p-3"
                      >
                        <p className="text-sm text-white/90">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] p-12 shadow-2xl backdrop-blur">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-white/30" />
                  <p className="mt-4 text-lg font-semibold text-white/60">
                    Select a patient to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob