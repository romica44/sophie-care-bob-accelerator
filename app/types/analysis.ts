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
