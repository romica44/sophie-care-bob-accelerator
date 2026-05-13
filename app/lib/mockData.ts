import { AnalysisResult } from "@/app/types/analysis";

export const demoResult: AnalysisResult = {
  query: "Use IBM Bob to explain this repository, generate onboarding documentation, suggest tests, and accelerate the SophieCare surgical AI prototype.",
  executiveSummary:
    "SophieCare Bob Accelerator demonstrates how IBM Bob can reduce the time required to understand, document, test, and improve a complex software prototype. The project uses an AI surgical co-pilot concept as a realistic codebase, then shows how Bob supports repository understanding, onboarding, documentation generation, test planning, maintainability review, and final submission preparation. The goal is not only to present a healthcare AI demo, but to prove how Bob helps builders move from idea to impact faster.",
  competitors: ["Manual onboarding", "Ad-hoc documentation", "Slow refactoring"],
  insights: [
    "IBM Bob is positioned as the development partner that understands repository context instead of answering in isolation.",
    "The healthcare AI case study creates real product complexity, making Bob's codebase understanding and documentation assistance meaningful.",
    "Prepared Bob prompts and evidence templates make the final exported report easy to complete once credentials are available.",
    "The project reduces repetitive engineering effort by packaging architecture, onboarding, testing, refactoring, and demo preparation into a repeatable workflow."
  ],
  risks: [
    "The official IBM Bob report still needs to be generated after event credentials are provided.",
    "Any Bob-assisted changes must be committed publicly so judges can inspect the development trail.",
    "The surgical AI layer is a demonstration prototype and must not be represented as clinically validated software."
  ],
  opportunities: [
    "Use Bob to generate a developer onboarding guide from the real repository context.",
    "Use Bob to identify missing tests and create a prioritized test plan.",
    "Use Bob to review component structure and propose safe refactoring tasks.",
    "Use Bob's exported report as direct evidence of meaningful AI-assisted development."
  ],
  scores: [
    { label: "Bob Alignment", value: 96, explanation: "The repository is structured around IBM Bob usage, prompts, evidence, and exported report requirements." },
    { label: "Developer Value", value: 92, explanation: "The workflow targets high-friction daily developer tasks: repo understanding, docs, tests, refactor, and onboarding." },
    { label: "Demo Readiness", value: 89, explanation: "The app runs without paid API keys and includes submission-ready documentation." },
    { label: "Business Impact", value: 87, explanation: "The concept can scale to healthcare teams, software consultancies, training programs, and regulated product teams." }
  ],
  sources: [
    { title: "IBM Bob evidence folder", url: "/docs/ibm-bob/", type: "other", signal: "Required hackathon proof path" },
    { title: "Submission fields", url: "/docs/submission/submission-fields.md", type: "other", signal: "Copy/paste lablab.ai content" },
    { title: "Vercel deployment guide", url: "/docs/deployment-vercel.md", type: "other", signal: "Free hosting path" },
    { title: "Responsible AI disclaimer", url: "/README.md", type: "safety", signal: "Safe healthcare prototype framing" }
  ],
  agentTrace: [
    "IBM Bob Repository Understanding: reads the full project context and explains the application architecture.",
    "Documentation Agent: generates onboarding, demo, and technical documentation for judges and new developers.",
    "Testing Agent: suggests unit, integration, accessibility, and edge-case tests for the dashboard workflow.",
    "Refactoring Agent: identifies maintainability improvements and safer component boundaries.",
    "Healthcare Context Agent: preserves the SophieCare surgical training use case and responsible AI constraints.",
    "Submission Agent: prepares evidence, README updates, and the IBM Bob report location required for the final hackathon submission."
  ]
};
