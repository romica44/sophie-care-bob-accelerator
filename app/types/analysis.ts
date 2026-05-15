export type Source = {
  title: string;
  url: string;
  type: "clinical" | "model" | "training" | "safety" | "other";
  signal: string;
};

export type Score = {
  label: string;
  value: number;
  explanation: string;
};

export type AnalysisResult = {
  query: string;
  executiveSummary: string;
  competitors: string[];
  insights: string[];
  risks: string[];
  opportunities: string[];
  scores: Score[];
  sources: Source[];
  agentTrace: string[];
};

// Live Surgery Enhanced Types
export type SurgeryStatus = "idle" | "running" | "paused" | "completed";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export interface PatientInfo {
  id: string;
  age: number;
  gender: "M" | "F";
  condition: string;
  eye: "Left" | "Right";
  complexity: "Simple" | "Moderate" | "Complex";
  comorbidities: string[];
}

export interface SurgicalMetrics {
  ultrasoundPower: number; // 0-100%
  irrigationFlow: number; // ml/min
  vacuumPressure: number; // mmHg
  chamberDepth: number; // mm
  temperature: number; // celsius
  totalFluidUsed: number; // ml
}

export interface AIRecommendation {
  id: string;
  timestamp: number;
  priority: "low" | "medium" | "high";
  category: "technique" | "safety" | "efficiency" | "teaching";
  message: string;
  confidence: number;
}

export interface SurgicalAnomaly {
  id: string;
  timestamp: number;
  severity: "info" | "warning" | "critical";
  type: string;
  description: string;
  resolved: boolean;
  resolvedAt?: number;
}

export interface SurgeryPhase {
  name: string;
  duration: number; // seconds
  confidence: number;
  risk: RiskLevel;
  tip: string;
  alerts: string[];
  recommendations: string[];
  metrics?: {
    avgUltrasoundPower?: number;
    avgVacuum?: number;
    fluidUsed?: number;
  };
}

export interface EventLogEntry {
  timestamp: string;
  type: "phase" | "alert" | "recommendation" | "status" | "anomaly" | "metric";
  message: string;
  severity?: "info" | "warning" | "success" | "critical";
  metadata?: Record<string, any>;
}

export interface ProcedureScore {
  overall: number;
  technique: number;
  efficiency: number;
  safety: number;
  teaching: number;
  breakdown: {
    category: string;
    score: number;
    weight: number;
    feedback: string;
  }[];
}

export interface HistoricalProcedure {
  id: string;
  date: string;
  patientAge: number;
  complexity: string;
  duration: number;
  overallScore: number;
  surgeon: string;
  complications: number;
  outcome: "Excellent" | "Good" | "Fair" | "Poor";
}

// Patient Case Management Types
export interface PatientCase {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: "M" | "F";
  diagnosis: string;
  eye: "Left" | "Right" | "Both";
  surgeryStatus: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  scheduledDate?: string;
  completedDate?: string;
  assignedSurgeon: string;
  riskLevel: RiskLevel;
  priority: "Low" | "Medium" | "High" | "Urgent";
  comorbidities: string[];
  procedureHistory: PatientProcedure[];
  notes: string[];
  aiRecommendations: string[];
}

export interface PatientProcedure {
  id: string;
  date: string;
  type: string;
  eye: "Left" | "Right";
  surgeon: string;
  duration: number;
  outcome: "Excellent" | "Good" | "Fair" | "Poor";
  complications: string[];
  notes: string;
}

export interface RiskIndicator {
  category: string;
  level: RiskLevel;
  description: string;
  mitigationStrategy: string;
}
