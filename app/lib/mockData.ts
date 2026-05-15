import { AnalysisResult } from "@/app/types/analysis";

export const demoResult: AnalysisResult = {
  query: "Use IBM Bob to explain this repository, generate onboarding documentation, suggest tests, and accelerate the SophieCare surgical AI prototype.",
  executiveSummary:
    "IBM Bob successfully analyzed the SophieCare repository and identified key opportunities to accelerate development. The analysis covered repository structure, documentation gaps, testing strategy, refactoring opportunities, and healthcare AI implementation. Bob generated actionable recommendations across all areas, reducing typical onboarding time from days to hours.",
  competitors: ["Manual code review", "Ad-hoc documentation", "Slow refactoring cycles"],
  insights: [
    "Repository contains 42 files across 8 components with clear separation of concerns",
    "Next.js App Router architecture enables fast iteration and deployment",
    "TypeScript provides type safety but strict mode is not enabled",
    "Tailwind CSS v4 configuration needs adjustment for proper compilation",
    "Mock data strategy allows demo without paid API dependencies",
    "Healthcare AI use case demonstrates real-world complexity",
    "IBM Bob evidence folder structure is well-organized and submission-ready"
  ],
  risks: [
    "Missing .env.example file blocks local setup for new developers",
    "No error boundaries could cause poor user experience during failures",
    "Zero test coverage reduces confidence in code changes",
    "Limited mobile responsiveness testing may affect demo on smaller screens"
  ],
  opportunities: [
    "Generate comprehensive test suite with Bob assistance",
    "Create developer onboarding guide from repository analysis",
    "Implement error handling and loading states for production readiness",
    "Add accessibility improvements for WCAG AA compliance",
    "Optimize bundle size with code splitting and lazy loading"
  ],
  scores: [
    { 
      label: "Bob Alignment", 
      value: 96, 
      explanation: "Repository structure explicitly designed for IBM Bob integration with dedicated evidence folder and prompt playbook." 
    },
    { 
      label: "Code Quality", 
      value: 82, 
      explanation: "Clean TypeScript codebase with good separation of concerns, but missing tests and strict mode configuration." 
    },
    { 
      label: "Demo Readiness", 
      value: 89, 
      explanation: "App runs without paid APIs and includes comprehensive submission documentation. Needs error handling improvements." 
    },
    { 
      label: "Documentation", 
      value: 94, 
      explanation: "Excellent README, architecture docs, and submission materials. Could benefit from API documentation and troubleshooting guide." 
    }
  ],
  sources: [
    { 
      title: "Repository Structure Analysis", 
      url: "/docs/architecture.md", 
      type: "other", 
      signal: "42 files, 8 components, 1 API route" 
    },
    { 
      title: "IBM Bob Evidence Folder", 
      url: "/docs/ibm-bob/", 
      type: "other", 
      signal: "Prompt playbook, task plan, export templates" 
    },
    { 
      title: "Submission Documentation", 
      url: "/docs/submission/", 
      type: "other", 
      signal: "Complete lablab.ai submission materials" 
    },
    { 
      title: "Healthcare AI Disclaimer", 
      url: "/README.md#medical-and-responsible-ai-disclaimer", 
      type: "safety", 
      signal: "Educational prototype only, not for clinical use" 
    }
  ],
  agentTrace: [
    "🔍 Repository Scanner: Analyzed 42 files across app/, docs/, and public/ directories",
    "📊 Architecture Analyzer: Identified Next.js App Router pattern with TypeScript and Tailwind CSS",
    "📝 Documentation Generator: Found comprehensive README and 15 documentation files",
    "🧪 Test Strategist: Detected zero test coverage, recommended Vitest setup with 12 test files",
    "♻️ Refactoring Agent: Identified 8 improvement opportunities including error handling and TypeScript strict mode",
    "🏥 Healthcare Context Validator: Confirmed responsible AI framing and educational disclaimers",
    "✅ Submission Validator: Verified IBM Bob evidence structure and deployment readiness"
  ]
};

// Extended mock data for detailed sections
export const repositoryAnalysis = {
  totalFiles: 42,
  components: 8,
  apiRoutes: 1,
  documentationFiles: 15,
  complexity: "Medium",
  techStack: ["Next.js 15", "React 19", "TypeScript 5", "Tailwind CSS 4", "Zod"],
  keyFiles: [
    { path: "app/page.tsx", type: "Main UI", lines: 717 },
    { path: "app/api/analyze/route.ts", type: "API Route", lines: 21 },
    { path: "app/lib/agents.ts", type: "Business Logic", lines: 19 },
    { path: "app/components/ResultDashboard.tsx", type: "Component", lines: 425 },
    { path: "docs/ibm-bob/bob-prompt-playbook.md", type: "Documentation", lines: 72 }
  ],
  architecture: {
    frontend: "Next.js App Router with React Server Components",
    styling: "Tailwind CSS with custom gradient backgrounds",
    validation: "Zod schema validation for API requests",
    deployment: "Vercel-optimized with zero-config setup"
  }
};

export const documentationSuggestions = [
  {
    file: "README.md",
    type: "Enhancement",
    priority: "Medium",
    description: "Add troubleshooting section for common setup issues",
    preview: "## Troubleshooting\n\n### Build fails with Tailwind errors\nEnsure you're using Tailwind CSS v4 with the correct PostCSS configuration..."
  },
  {
    file: "docs/api-reference.md",
    type: "New",
    priority: "High",
    description: "Generate API documentation for /api/analyze endpoint",
    preview: "# API Reference\n\n## POST /api/analyze\n\nAnalyzes repository and returns Bob-assisted insights.\n\n**Request Body:**\n```json\n{\n  \"query\": \"string (5-500 chars)\"\n}\n```"
  },
  {
    file: "docs/developer-onboarding.md",
    type: "New",
    priority: "High",
    description: "Create step-by-step onboarding guide for new developers",
    preview: "# Developer Onboarding\n\n## Prerequisites\n- Node.js 18+\n- npm or pnpm\n- Git\n\n## Setup Steps\n1. Clone repository\n2. Install dependencies..."
  },
  {
    file: "CONTRIBUTING.md",
    type: "New",
    priority: "Low",
    description: "Add contribution guidelines for open source collaboration",
    preview: "# Contributing to SophieCare\n\nThank you for your interest! This guide will help you get started..."
  }
];

export const testSuggestions = [
  {
    file: "app/components/__tests__/ResultDashboard.test.tsx",
    type: "Component Test",
    priority: "High",
    testCases: 8,
    coverage: "Component rendering, props handling, accessibility",
    code: `import { render, screen } from '@testing-library/react';
import { ResultDashboard } from '../ResultDashboard';
import { demoResult } from '@/app/lib/mockData';

describe('ResultDashboard', () => {
  it('renders executive summary', () => {
    render(<ResultDashboard result={demoResult} />);
    expect(screen.getByText(/IBM Bob Development Intelligence/i)).toBeInTheDocument();
  });

  it('displays all score cards', () => {
    render(<ResultDashboard result={demoResult} />);
    expect(screen.getByText('Bob Alignment')).toBeInTheDocument();
    expect(screen.getByText('96')).toBeInTheDocument();
  });
});`
  },
  {
    file: "app/api/analyze/__tests__/route.test.ts",
    type: "API Test",
    priority: "High",
    testCases: 6,
    coverage: "Request validation, error handling, response format",
    code: `import { POST } from '../route';

describe('POST /api/analyze', () => {
  it('validates request body with Zod', async () => {
    const request = new Request('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ query: 'test' })
    });
    
    const response = await POST(request);
    expect(response.status).toBe(200);
  });

  it('rejects invalid queries', async () => {
    const request = new Request('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ query: 'abc' }) // too short
    });
    
    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});`
  },
  {
    file: "app/lib/__tests__/agents.test.ts",
    type: "Unit Test",
    priority: "Medium",
    testCases: 4,
    coverage: "Agent workflow logic, data transformation",
    code: `import { runBobAcceleratorWorkflow } from '../agents';

describe('runBobAcceleratorWorkflow', () => {
  it('returns structured analysis result', async () => {
    const result = await runBobAcceleratorWorkflow('test query');
    
    expect(result).toHaveProperty('query');
    expect(result).toHaveProperty('executiveSummary');
    expect(result).toHaveProperty('scores');
    expect(result.scores).toHaveLength(4);
  });
});`
  }
];

export const refactorOpportunities = [
  {
    file: "app/page.tsx",
    issue: "Extract custom hook for analysis state",
    impact: "High",
    effort: "Medium",
    category: "Maintainability",
    before: `const [query, setQuery] = useState(defaultPrompt);
const [loading, setLoading] = useState(false);
const [result, setResult] = useState<AnalysisResult | null>(null);

async function analyze() {
  setLoading(true);
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const data = await response.json();
  setResult(data);
  setLoading(false);
}`,
    after: `// Create app/hooks/useAnalysis.ts
const { query, setQuery, loading, result, error, analyze } = useAnalysis();

// Cleaner component with separated concerns
// Better error handling and loading states
// Reusable across multiple components`
  },
  {
    file: "tsconfig.json",
    issue: "Enable TypeScript strict mode",
    impact: "High",
    effort: "Low",
    category: "Type Safety",
    before: `{
  "compilerOptions": {
    "strict": false
  }
}`,
    after: `{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}`
  },
  {
    file: "app/api/analyze/route.ts",
    issue: "Add error handling and logging",
    impact: "High",
    effort: "Low",
    category: "Reliability",
    before: `export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = schema.parse(body);
    const result = await runBobAcceleratorWorkflow(query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 400 }
    );
  }
}`,
    after: `export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = schema.parse(body);
    
    console.log('[API] Analysis request:', { query, timestamp: new Date().toISOString() });
    
    const result = await runBobAcceleratorWorkflow(query);
    
    return NextResponse.json(result, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('[API] Analysis error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`
  },
  {
    file: "app/components/ResultDashboard.tsx",
    issue: "Add loading skeleton states",
    impact: "Medium",
    effort: "Medium",
    category: "User Experience",
    before: `export function ResultDashboard({ result }: { result: AnalysisResult }) {
  return (
    <div className="mt-10 grid gap-6">
      {/* Content */}
    </div>
  );
}`,
    after: `export function ResultDashboard({ result, loading }: { result: AnalysisResult | null; loading: boolean }) {
  if (loading) {
    return <DashboardSkeleton />;
  }
  
  if (!result) {
    return <EmptyState />;
  }
  
  return (
    <div className="mt-10 grid gap-6 animate-fade-in">
      {/* Content */}
    </div>
  );
}`
  }
];

export const healthcareCaseStudy = {
  surgeryType: "Cataract Surgery - Phacoemulsification",
  patient: {
    age: 68,
    condition: "Age-related cataract, right eye",
    complexity: "Moderate"
  },
  phases: [
    { 
      name: "Incision", 
      duration: "2:15", 
      status: "completed",
      safetyScore: 98,
      notes: "Clean corneal incision, proper wound construction"
    },
    { 
      name: "Capsulorhexis", 
      duration: "3:42", 
      status: "completed",
      safetyScore: 95,
      notes: "Continuous curvilinear capsulorhexis, well-centered"
    },
    { 
      name: "Phacoemulsification", 
      duration: "8:20", 
      status: "completed",
      safetyScore: 92,
      notes: "Efficient nucleus removal, minimal ultrasound energy"
    },
    { 
      name: "IOL Implantation", 
      duration: "4:10", 
      status: "completed",
      safetyScore: 97,
      notes: "Smooth IOL insertion, proper positioning in capsular bag"
    },
    { 
      name: "Wound Closure", 
      duration: "1:30", 
      status: "completed",
      safetyScore: 99,
      notes: "Self-sealing incision, no leakage"
    }
  ],
  overallSafetyScore: 96,
  risks: [
    { level: "Low", description: "Posterior capsule tension during phaco", resolved: true },
    { level: "Low", description: "Zonular weakness indicators", resolved: true }
  ],
  recommendations: [
    "Excellent surgical technique demonstrated throughout procedure",
    "Phaco power settings were optimal for nucleus density",
    "Consider slightly slower capsulorhexis for teaching purposes",
    "IOL positioning is ideal for optimal visual outcomes"
  ],
  residentFeedback: {
    strengths: [
      "Smooth, controlled movements throughout",
      "Excellent visualization maintenance",
      "Appropriate instrument handling"
    ],
    improvements: [
      "Could optimize phaco tip positioning in early stages",
      "Consider alternative chopping technique for denser nuclei"
    ]
  }
};

export const bobEvidenceData = {
  promptsUsed: 47,
  filesImproved: 23,
  docsGenerated: 15,
  hoursSaved: 18,
  decisionsAccelerated: 34,
  beforeAfter: {
    before: [
      "No documentation",
      "Zero test coverage",
      "Unclear architecture",
      "Manual refactoring"
    ],
    after: [
      "15+ documentation files",
      "Comprehensive test plan",
      "Clear architecture docs",
      "Automated suggestions"
    ]
  }
};

export const vercelDeploymentData = {
  frontendOnly: true,
  mockDataIncluded: true,
  noSecretsRequired: true,
  githubReady: true,
  oneClickDeploy: true,
  features: [
    {
      title: "Frontend-Only",
      description: "No backend required, runs entirely in browser",
      status: "ready"
    },
    {
      title: "Mock Data Included",
      description: "Realistic demo data without external APIs",
      status: "ready"
    },
    {
      title: "No Secrets Required",
      description: "Zero API keys or environment variables needed",
      status: "ready"
    }
  ]
};

// Enhanced Live Surgery Mock Data
import {
  PatientInfo,
  HistoricalProcedure,
  SurgeryPhase
} from "@/app/types/analysis";

export const mockPatients: PatientInfo[] = [
  {
    id: "PT-2026-0847",
    age: 68,
    gender: "F",
    condition: "Age-related cataract with posterior subcapsular opacity",
    eye: "Right",
    complexity: "Moderate",
    comorbidities: ["Type 2 Diabetes (controlled)", "Hypertension"]
  },
  {
    id: "PT-2026-0848",
    age: 72,
    gender: "M",
    condition: "Dense nuclear sclerotic cataract",
    eye: "Left",
    complexity: "Complex",
    comorbidities: ["Pseudoexfoliation syndrome", "Narrow angle"]
  },
  {
    id: "PT-2026-0849",
    age: 55,
    gender: "F",
    condition: "Traumatic cataract",
    eye: "Right",
    complexity: "Simple",
    comorbidities: []
  }
];

export const enhancedSurgeryPhases: SurgeryPhase[] = [
  {
    name: "Incision",
    duration: 135, // 2:15
    confidence: 98,
    risk: "Low",
    tip: "Confirm wound architecture and stabilize the anterior chamber before capsulorhexis.",
    alerts: [
      "Chamber depth optimal at 3.2mm",
      "Incision architecture confirmed - clear corneal",
      "Wound seal integrity verified",
      "Anterior chamber stable"
    ],
    recommendations: [
      "Maintain steady hand position",
      "Verify wound seal integrity",
      "Consider paracentesis placement for optimal access"
    ],
    metrics: {
      avgUltrasoundPower: 0,
      avgVacuum: 0,
      fluidUsed: 12
    }
  },
  {
    name: "Capsulorhexis",
    duration: 222, // 3:42
    confidence: 94,
    risk: "Medium",
    tip: "Maintain centered circular movement. Critical phase for resident training.",
    alerts: [
      "Capsule tension within normal range",
      "Circular continuity maintained",
      "Centration optimal - 5.5mm diameter",
      "No radial tears detected"
    ],
    recommendations: [
      "Keep consistent circular motion",
      "Monitor capsule edge carefully",
      "Adjust viscoelastic if needed for better visualization",
      "Consider Utrata forceps for better control"
    ],
    metrics: {
      avgUltrasoundPower: 0,
      avgVacuum: 0,
      fluidUsed: 8
    }
  },
  {
    name: "Phacoemulsification",
    duration: 500, // 8:20
    confidence: 91,
    risk: "Medium",
    tip: "Monitor ultrasound energy and chamber stability. Flag rising posterior capsule risk.",
    alerts: [
      "Ultrasound power optimal at 45%",
      "Posterior capsule tension detected - monitoring",
      "Vacuum pressure stable at 380mmHg",
      "Chamber depth maintained",
      "Nucleus density: Grade 3 (moderate)",
      "Cortical cleanup 85% complete"
    ],
    recommendations: [
      "Adjust phaco power as needed",
      "Maintain chamber stability",
      "Consider divide-and-conquer technique",
      "Monitor posterior capsule closely",
      "Optimize irrigation/aspiration balance"
    ],
    metrics: {
      avgUltrasoundPower: 42,
      avgVacuum: 375,
      fluidUsed: 145
    }
  },
  {
    name: "IOL Implantation",
    duration: 250, // 4:10
    confidence: 96,
    risk: "Low",
    tip: "Validate lens orientation and confirm complete unfolding before final hydration.",
    alerts: [
      "IOL positioning optimal",
      "Lens unfolding complete",
      "Haptics properly positioned in capsular bag",
      "No iris capture detected",
      "Centration verified"
    ],
    recommendations: [
      "Verify lens centration",
      "Check haptic position",
      "Rotate IOL if needed for toric alignment",
      "Remove all viscoelastic material"
    ],
    metrics: {
      avgUltrasoundPower: 0,
      avgVacuum: 0,
      fluidUsed: 25
    }
  },
  {
    name: "Closure",
    duration: 90, // 1:30
    confidence: 99,
    risk: "Low",
    tip: "Check wound seal, pressure stability, and final safety checklist.",
    alerts: [
      "Wound seal confirmed - self-sealing",
      "Intraocular pressure stable at 16mmHg",
      "No wound leakage detected",
      "Anterior chamber well-formed"
    ],
    recommendations: [
      "Final safety checklist complete",
      "Post-op instructions ready",
      "Verify patient comfort",
      "Document procedure completion"
    ],
    metrics: {
      avgUltrasoundPower: 0,
      avgVacuum: 0,
      fluidUsed: 5
    }
  }
];

export const historicalProcedures: HistoricalProcedure[] = [
  {
    id: "PROC-2026-0842",
    date: "2026-05-14",
    patientAge: 71,
    complexity: "Simple",
    duration: 1140, // 19 minutes
    overallScore: 94,
    surgeon: "Dr. Sarah Chen",
    complications: 0,
    outcome: "Excellent"
  },
  {
    id: "PROC-2026-0841",
    date: "2026-05-14",
    patientAge: 65,
    complexity: "Moderate",
    duration: 1380, // 23 minutes
    overallScore: 91,
    surgeon: "Dr. Michael Rodriguez",
    complications: 0,
    outcome: "Excellent"
  },
  {
    id: "PROC-2026-0840",
    date: "2026-05-13",
    patientAge: 78,
    complexity: "Complex",
    duration: 1920, // 32 minutes
    overallScore: 87,
    surgeon: "Dr. Sarah Chen",
    complications: 1,
    outcome: "Good"
  },
  {
    id: "PROC-2026-0839",
    date: "2026-05-13",
    patientAge: 62,
    complexity: "Simple",
    duration: 1020, // 17 minutes
    overallScore: 96,
    surgeon: "Dr. James Park",
    complications: 0,
    outcome: "Excellent"
  },
  {
    id: "PROC-2026-0838",
    date: "2026-05-12",
    patientAge: 69,
    complexity: "Moderate",
    duration: 1260, // 21 minutes
    overallScore: 93,
    surgeon: "Dr. Michael Rodriguez",
    complications: 0,
    outcome: "Excellent"
  },
  {
    id: "PROC-2026-0837",
    date: "2026-05-12",
    patientAge: 74,
    complexity: "Complex",
    duration: 2100, // 35 minutes
    overallScore: 85,
    surgeon: "Dr. Sarah Chen",
    complications: 1,
    outcome: "Good"
  },
  {
    id: "PROC-2026-0836",
    date: "2026-05-11",
    patientAge: 58,
    complexity: "Simple",
    duration: 1080, // 18 minutes
    overallScore: 95,
    surgeon: "Dr. James Park",
    complications: 0,
    outcome: "Excellent"
  },
  {
    id: "PROC-2026-0835",
    date: "2026-05-11",
    patientAge: 81,
    complexity: "Moderate",
    duration: 1440, // 24 minutes
    overallScore: 89,
    surgeon: "Dr. Michael Rodriguez",
    complications: 0,
    outcome: "Good"
  }
];

export const baselineMetrics = {
  ultrasoundPower: 0,
  irrigationFlow: 28,
  vacuumPressure: 0,
  chamberDepth: 3.2,
  temperature: 21.5,
  totalFluidUsed: 0
};

export const surgeonProfiles = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Cataract & Refractive Surgery",
    experience: "15 years",
    procedures: 8500,
    avgScore: 93,
    certifications: ["Board Certified Ophthalmologist", "Fellowship Trained"]
  },
  {
    name: "Dr. Michael Rodriguez",
    specialty: "Anterior Segment Surgery",
    experience: "12 years",
    procedures: 6200,
    avgScore: 91,
    certifications: ["Board Certified Ophthalmologist", "ASCRS Member"]
  },
  {
    name: "Dr. James Park",
    specialty: "Comprehensive Ophthalmology",
    experience: "8 years",
    procedures: 3800,
    avgScore: 94,
    certifications: ["Board Certified Ophthalmologist"]
  }
];

// Patient Case Management Mock Data
import { PatientCase, PatientProcedure, RiskIndicator } from "@/app/types/analysis";

export const mockPatientCases: PatientCase[] = [
  {
    id: "CASE-2026-001",
    patientId: "PT-2026-0847",
    name: "Margaret Thompson",
    age: 68,
    gender: "F",
    diagnosis: "Age-related cataract with posterior subcapsular opacity",
    eye: "Right",
    surgeryStatus: "Scheduled",
    scheduledDate: "2026-05-16",
    assignedSurgeon: "Dr. Sarah Chen",
    riskLevel: "Medium",
    priority: "Medium",
    comorbidities: ["Type 2 Diabetes (controlled)", "Hypertension"],
    procedureHistory: [
      {
        id: "PROC-2025-1203",
        date: "2025-12-10",
        type: "Cataract Surgery - Phacoemulsification",
        eye: "Left",
        surgeon: "Dr. Sarah Chen",
        duration: 1140,
        outcome: "Excellent",
        complications: [],
        notes: "Uncomplicated left eye cataract surgery. Patient tolerated procedure well. IOL positioned correctly."
      }
    ],
    notes: [
      "Patient has well-controlled diabetes with HbA1c of 6.8%",
      "Previous left eye surgery was successful with 20/25 vision achieved",
      "Patient is motivated and compliant with pre-op instructions",
      "Discussed realistic expectations for visual outcomes"
    ],
    aiRecommendations: [
      "Monitor blood glucose levels closely pre and post-operatively",
      "Consider extended antibiotic prophylaxis due to diabetes",
      "Plan for slightly longer surgical time given posterior subcapsular component",
      "Excellent candidate based on successful contralateral eye outcome"
    ]
  },
  {
    id: "CASE-2026-002",
    patientId: "PT-2026-0848",
    name: "Robert Martinez",
    age: 72,
    gender: "M",
    diagnosis: "Dense nuclear sclerotic cataract with pseudoexfoliation syndrome",
    eye: "Left",
    surgeryStatus: "In Progress",
    scheduledDate: "2026-05-15",
    assignedSurgeon: "Dr. Michael Rodriguez",
    riskLevel: "High",
    priority: "High",
    comorbidities: ["Pseudoexfoliation syndrome", "Narrow angle", "Zonular weakness"],
    procedureHistory: [],
    notes: [
      "First cataract surgery for this patient",
      "Pseudoexfoliation noted on exam - increased risk of complications",
      "Zonular weakness observed during pre-op assessment",
      "Patient counseled on increased surgical complexity and risks",
      "Capsular tension ring may be required"
    ],
    aiRecommendations: [
      "HIGH PRIORITY: Prepare capsular tension ring for potential zonular dialysis",
      "Use lower phaco power settings to minimize zonular stress",
      "Consider femtosecond laser-assisted capsulotomy for better control",
      "Extended post-op monitoring recommended due to pseudoexfoliation",
      "Increased risk of posterior capsule rupture - have vitrectomy equipment ready"
    ]
  },
  {
    id: "CASE-2026-003",
    patientId: "PT-2026-0849",
    name: "Jennifer Park",
    age: 55,
    gender: "F",
    diagnosis: "Traumatic cataract secondary to blunt ocular trauma",
    eye: "Right",
    surgeryStatus: "Scheduled",
    scheduledDate: "2026-05-17",
    assignedSurgeon: "Dr. James Park",
    riskLevel: "Low",
    priority: "Medium",
    comorbidities: [],
    procedureHistory: [],
    notes: [
      "Trauma occurred 3 months ago - cataract has matured",
      "No other ocular injuries noted on examination",
      "Cornea clear, anterior chamber deep and quiet",
      "Patient is otherwise healthy with no systemic conditions"
    ],
    aiRecommendations: [
      "Straightforward case with good prognosis",
      "Standard phacoemulsification technique appropriate",
      "Expect normal surgical duration and uncomplicated course",
      "Good candidate for premium IOL if patient desires"
    ]
  },
  {
    id: "CASE-2026-004",
    patientId: "PT-2026-0850",
    name: "William Chen",
    age: 81,
    gender: "M",
    diagnosis: "Hypermature cataract with phacolytic glaucoma",
    eye: "Right",
    surgeryStatus: "Scheduled",
    scheduledDate: "2026-05-15",
    assignedSurgeon: "Dr. Sarah Chen",
    riskLevel: "High",
    priority: "Urgent",
    comorbidities: ["Glaucoma (secondary)", "Hypertension", "Atrial fibrillation"],
    procedureHistory: [
      {
        id: "PROC-2024-0892",
        date: "2024-08-15",
        type: "Trabeculectomy",
        eye: "Left",
        surgeon: "Dr. Emily Watson",
        duration: 2400,
        outcome: "Good",
        complications: ["Post-op hypotony (resolved)"],
        notes: "Glaucoma surgery on left eye. IOP now controlled on minimal medications."
      }
    ],
    notes: [
      "URGENT: IOP elevated to 38mmHg due to phacolytic glaucoma",
      "Patient on anticoagulation for atrial fibrillation",
      "Coordinated with cardiology - continue anticoagulation",
      "Plan for immediate cataract extraction to relieve IOP",
      "May require combined cataract-glaucoma procedure"
    ],
    aiRecommendations: [
      "URGENT CASE: Expedite surgery to prevent optic nerve damage",
      "Coordinate with anesthesia regarding anticoagulation management",
      "Prepare for potential combined cataract-trabeculectomy if IOP remains elevated",
      "Extended post-op monitoring for IOP control",
      "Consider prophylactic measures for bleeding risk"
    ]
  },
  {
    id: "CASE-2026-005",
    patientId: "PT-2026-0851",
    name: "Patricia Johnson",
    age: 63,
    gender: "F",
    diagnosis: "Bilateral cataracts - moderate nuclear sclerosis",
    eye: "Both",
    surgeryStatus: "Completed",
    completedDate: "2026-05-10",
    assignedSurgeon: "Dr. Michael Rodriguez",
    riskLevel: "Low",
    priority: "Low",
    comorbidities: [],
    procedureHistory: [
      {
        id: "PROC-2026-0823",
        date: "2026-05-10",
        type: "Cataract Surgery - Phacoemulsification",
        eye: "Right",
        surgeon: "Dr. Michael Rodriguez",
        duration: 1080,
        outcome: "Excellent",
        complications: [],
        notes: "Uncomplicated right eye cataract surgery. Patient achieved 20/20 vision at 1-week follow-up."
      },
      {
        id: "PROC-2026-0824",
        date: "2026-05-03",
        type: "Cataract Surgery - Phacoemulsification",
        eye: "Left",
        surgeon: "Dr. Michael Rodriguez",
        duration: 1020,
        outcome: "Excellent",
        complications: [],
        notes: "Uncomplicated left eye cataract surgery. Excellent visual outcome with 20/20 vision."
      }
    ],
    notes: [
      "Sequential bilateral cataract surgery completed successfully",
      "Both eyes achieved excellent visual outcomes",
      "Patient very satisfied with results",
      "No complications during either procedure",
      "Discharged to routine follow-up care"
    ],
    aiRecommendations: [
      "Case completed successfully - excellent outcomes both eyes",
      "Standard post-operative care protocol",
      "Patient is ideal candidate for future teaching demonstrations",
      "Consider for patient testimonial/satisfaction survey"
    ]
  },
  {
    id: "CASE-2026-006",
    patientId: "PT-2026-0852",
    name: "David Anderson",
    age: 76,
    gender: "M",
    diagnosis: "Cataract with corneal endothelial dysfunction",
    eye: "Left",
    surgeryStatus: "Scheduled",
    scheduledDate: "2026-05-18",
    assignedSurgeon: "Dr. Sarah Chen",
    riskLevel: "High",
    priority: "Medium",
    comorbidities: ["Fuchs endothelial dystrophy", "Corneal guttata"],
    procedureHistory: [],
    notes: [
      "Endothelial cell count: 1200 cells/mm² (borderline)",
      "Significant corneal guttata present",
      "Risk of corneal decompensation post-operatively",
      "Patient counseled on potential need for future corneal transplant",
      "Consider combined cataract-DMEK procedure"
    ],
    aiRecommendations: [
      "HIGH RISK: Minimize surgical trauma to preserve endothelium",
      "Use dispersive viscoelastic to protect cornea",
      "Consider lower phaco power and shorter surgical time",
      "Discuss combined cataract-DMEK procedure with patient",
      "Close post-operative monitoring for corneal edema"
    ]
  }
];

export const riskIndicators: RiskIndicator[] = [
  {
    category: "Zonular Weakness",
    level: "High",
    description: "Increased risk of lens dislocation or capsular complications",
    mitigationStrategy: "Prepare capsular tension ring, use gentle techniques, consider femtosecond laser assistance"
  },
  {
    category: "Dense Cataract",
    level: "Medium",
    description: "May require higher phaco power and longer surgical time",
    mitigationStrategy: "Optimize phaco settings, use efficient chopping techniques, ensure adequate hydration"
  },
  {
    category: "Pseudoexfoliation",
    level: "High",
    description: "Weak zonules, increased risk of complications",
    mitigationStrategy: "Capsular tension ring, gentle manipulation, extended monitoring"
  },
  {
    category: "Corneal Endothelial Dysfunction",
    level: "High",
    description: "Risk of post-operative corneal decompensation",
    mitigationStrategy: "Minimize surgical trauma, use protective viscoelastic, consider combined procedure"
  },
  {
    category: "Glaucoma",
    level: "Medium",
    description: "May require combined cataract-glaucoma procedure",
    mitigationStrategy: "Coordinate with glaucoma specialist, plan combined approach if indicated"
  },
  {
    category: "Diabetes",
    level: "Low",
    description: "Increased infection risk, potential for macular edema",
    mitigationStrategy: "Optimize glucose control, extended antibiotic prophylaxis, monitor for CME"
  },
  {
    category: "Anticoagulation",
    level: "Medium",
    description: "Increased bleeding risk during surgery",
    mitigationStrategy: "Coordinate with primary care, continue anticoagulation if possible, prepare for bleeding"
  }
];

// Made with Bob
