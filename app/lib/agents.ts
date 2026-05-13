import { demoResult } from "@/app/lib/mockData";
import { AnalysisResult } from "@/app/types/analysis";

export async function runBobAcceleratorWorkflow(query: string): Promise<AnalysisResult> {
  const result: AnalysisResult = {
    ...demoResult,
    query,
    agentTrace: [
      "IBM Bob Repository Understanding: reads the full project context and explains the application architecture.",
      "Documentation Agent: generates onboarding, demo, and technical documentation for judges and new developers.",
      "Testing Agent: suggests unit, integration, accessibility, and edge-case tests for the dashboard workflow.",
      "Refactoring Agent: identifies maintainability improvements and safer component boundaries.",
      "Healthcare Context Agent: preserves the SophieCare surgical training use case and responsible AI constraints.",
      "Submission Agent: prepares evidence, README updates, and the IBM Bob report location required for the final hackathon submission."
    ]
  };

  return result;
}
