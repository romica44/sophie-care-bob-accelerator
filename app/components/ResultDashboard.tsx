import { AnalysisResult } from "@/app/types/analysis";
import { ScoreCard } from "./ScoreCard";
import { AgentTrace } from "./AgentTrace";
import { FileCode2, BookOpen, TestTube2, RefreshCw, Activity, CheckCircle2, AlertTriangle, TrendingUp, Code2, ExternalLink, ChevronRight } from "lucide-react";
import { repositoryAnalysis, documentationSuggestions, testSuggestions, refactorOpportunities, healthcareCaseStudy } from "@/app/lib/mockData";

type DemoSection = "overview" | "repository" | "documentation" | "tests" | "refactor" | "healthcare";

export function ResultDashboard({ result, activeSection }: { result: AnalysisResult; activeSection: DemoSection }) {
  return (
    <div className="grid gap-6">
      {activeSection === "repository" && <RepositorySection result={result} />}
      {activeSection === "documentation" && <DocumentationSection result={result} />}
      {activeSection === "tests" && <TestsSection result={result} />}
      {activeSection === "refactor" && <RefactorSection result={result} />}
      {activeSection === "healthcare" && <HealthcareSection result={result} />}
    </div>
  );
}

function RepositorySection({ result }: { result: AnalysisResult }) {
  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-premium animate-fade-in-up glass-strong relative overflow-hidden group">
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 p-3 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FileCode2 className="h-7 w-7 text-cyan-300 animate-glow-pulse" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 font-bold mb-1">IBM Bob Repository Analysis</p>
              <h2 className="text-3xl font-black text-gradient">Codebase Understanding</h2>
            </div>
          </div>
          <p className="text-white/80 leading-relaxed text-base">{result.executiveSummary}</p>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Files", value: repositoryAnalysis.totalFiles, icon: <FileCode2 className="h-6 w-6" /> },
          { label: "Components", value: repositoryAnalysis.components, icon: <Code2 className="h-6 w-6" /> },
          { label: "API Routes", value: repositoryAnalysis.apiRoutes, icon: <Activity className="h-6 w-6" /> },
          { label: "Documentation", value: repositoryAnalysis.documentationFiles, icon: <BookOpen className="h-6 w-6" /> }
        ].map((metric, index) => (
          <MetricCard key={metric.label} {...metric} delay={index * 100} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-premium card-glow animate-fade-in-up relative overflow-hidden group" style={{ animationDelay: "200ms" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-emerald-300 animate-bounce-subtle" />
              <span className="text-gradient">Key Insights</span>
            </h3>
            <ul className="space-y-4 text-sm">
              {result.insights.map((item, i) => (
                <li key={i} className="flex gap-4 group/item p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300" />
                  <span className="text-white/70 group-hover/item:text-white/95 transition-colors leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-premium card-glow animate-fade-in-up relative overflow-hidden group" style={{ animationDelay: "300ms" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6 text-gradient">Technology Stack</h3>
            <div className="flex flex-wrap gap-2 mb-7">
              {repositoryAnalysis.techStack.map((tech, index) => (
                <span
                  key={tech}
                  className="badge badge-info animate-scale-in-bounce hover:scale-110"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div>
              <h4 className="font-bold text-white/90 mb-4 flex items-center gap-3 text-lg">
                <FileCode2 className="h-5 w-5 text-cyan-300 animate-pulse-glow" />
                Key Files Analyzed
              </h4>
              <div className="space-y-3">
                {repositoryAnalysis.keyFiles.map((file, index) => (
                  <div
                    key={file.path}
                    className="flex items-center justify-between p-4 rounded-2xl bg-black/30 text-sm hover:bg-black/40 transition-all duration-300 card-hover group/file border border-white/5 hover:border-cyan-300/30"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileCode2 className="h-5 w-5 text-cyan-300 flex-shrink-0 group-hover/file:scale-110 transition-transform" />
                      <span className="font-mono text-white/80 truncate group-hover/file:text-cyan-300 transition-colors font-medium">{file.path}</span>
                    </div>
                    <span className="text-white/50 text-xs whitespace-nowrap ml-3 font-semibold">{file.lines} lines</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <AgentTrace steps={result.agentTrace} />
    </>
  );
}

function DocumentationSection({ result }: { result: AnalysisResult }) {
  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur animate-fade-in glass-strong">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl bg-cyan-300/10 p-2">
            <BookOpen className="h-6 w-6 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-bold">Documentation Generation</p>
            <h2 className="text-2xl font-bold mt-1">Bob-Generated Documentation</h2>
          </div>
        </div>
        <p className="text-white/70 leading-relaxed">
          IBM Bob analyzed the repository and identified {documentationSuggestions.length} documentation improvements. 
          These suggestions enhance onboarding, API clarity, and contribution workflows.
        </p>
      </section>

      <div className="grid gap-4">
        {documentationSuggestions.map((doc, i) => (
          <div 
            key={i} 
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur card-hover animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4 gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="rounded-lg bg-cyan-300/10 p-2 flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg truncate">{doc.file}</h3>
                  <p className="text-sm text-white/60 mt-1">{doc.description}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <span className={`badge ${doc.type === "New" ? "badge-success" : "badge-info"}`}>
                  {doc.type}
                </span>
                <span className={`badge ${
                  doc.priority === "High" ? "badge-error" : 
                  doc.priority === "Medium" ? "badge-warning" : "badge-info"
                }`}>
                  {doc.priority}
                </span>
              </div>
            </div>
            <div className="code-block group-hover:border-cyan-300/20 transition-colors">
              <code>{doc.preview}</code>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TestsSection({ result }: { result: AnalysisResult }) {
  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur animate-fade-in glass-strong">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl bg-cyan-300/10 p-2">
            <TestTube2 className="h-6 w-6 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-bold">Test Strategy</p>
            <h2 className="text-2xl font-bold mt-1">Bob-Generated Test Plan</h2>
          </div>
        </div>
        <p className="text-white/70 leading-relaxed">
          IBM Bob identified zero test coverage and generated a comprehensive testing strategy with {testSuggestions.length} test files 
          covering components, API routes, and business logic.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 animate-fade-in">
        <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-6 shadow-2xl backdrop-blur card-hover">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Current Coverage
          </h3>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-6xl font-black text-red-400 animate-pulse">0%</div>
              <p className="text-sm text-white/60 mt-2">No tests found</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-red-300 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                <AlertTriangle className="h-3 w-3" />
                Critical Priority
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 shadow-2xl backdrop-blur card-hover">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            Target Coverage
          </h3>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-6xl font-black text-emerald-400">75%</div>
              <p className="text-sm text-white/60 mt-2">Recommended target</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                <TrendingUp className="h-3 w-3" />
                Industry Standard
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {testSuggestions.map((test, i) => (
          <div 
            key={i} 
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur card-hover animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4 gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="rounded-lg bg-cyan-300/10 p-2 flex-shrink-0">
                  <TestTube2 className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg truncate">{test.file}</h3>
                  <p className="text-sm text-white/60 mt-1">{test.coverage}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                <span className="badge badge-info">{test.type}</span>
                <span className={`badge ${test.priority === "High" ? "badge-error" : "badge-warning"}`}>
                  {test.priority}
                </span>
                <span className="badge badge-success">{test.testCases} tests</span>
              </div>
            </div>
            <div className="code-block">
              <code>{test.code}</code>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RefactorSection({ result }: { result: AnalysisResult }) {
  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur animate-fade-in glass-strong">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl bg-cyan-300/10 p-2">
            <RefreshCw className="h-6 w-6 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-bold">Refactoring Roadmap</p>
            <h2 className="text-2xl font-bold mt-1">Code Quality Improvements</h2>
          </div>
        </div>
        <p className="text-white/70 leading-relaxed">
          IBM Bob analyzed code quality and identified {refactorOpportunities.length} refactoring opportunities 
          to improve maintainability, type safety, and user experience.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Quality Score", value: "78", icon: <TrendingUp className="h-5 w-5" />, suffix: "/100" },
          { label: "Opportunities", value: refactorOpportunities.length.toString(), icon: <RefreshCw className="h-5 w-5" /> },
          { label: "High Impact", value: refactorOpportunities.filter(r => r.impact === "High").length.toString(), icon: <AlertTriangle className="h-5 w-5" /> }
        ].map((metric, index) => (
          <MetricCard key={metric.label} {...metric} delay={index * 100} />
        ))}
      </div>

      <div className="grid gap-4">
        {refactorOpportunities.map((refactor, i) => (
          <div 
            key={i} 
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur card-hover animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4 gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="rounded-lg bg-cyan-300/10 p-2 flex-shrink-0">
                  <RefreshCw className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg">{refactor.issue}</h3>
                  <p className="text-sm text-white/60 mt-1 truncate">{refactor.file}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                <span className="badge badge-info">{refactor.category}</span>
                <span className={`badge ${
                  refactor.impact === "High" ? "badge-error" : "badge-warning"
                }`}>
                  {refactor.impact} Impact
                </span>
                <span className="badge badge-success">{refactor.effort} Effort</span>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-red-300 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Before
                </h4>
                <div className="code-block border-red-400/20">
                  <code>{refactor.before}</code>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-300 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  After
                </h4>
                <div className="code-block border-emerald-400/20">
                  <code>{refactor.after}</code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function HealthcareSection({ result }: { result: AnalysisResult }) {
  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur animate-fade-in glass-strong">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl bg-cyan-300/10 p-2">
            <Activity className="h-6 w-6 text-cyan-300" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-bold">SophieCare Healthcare AI</p>
            <h2 className="text-2xl font-bold mt-1">Surgical Intelligence Demo</h2>
          </div>
        </div>
        <p className="text-white/70 leading-relaxed">
          This section demonstrates the SophieCare AI Surgical Co-Pilot prototype: an ophthalmology training assistant 
          that provides phase analysis, safety monitoring, and resident feedback for cataract surgery procedures.
        </p>
      </section>

      <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-sm text-yellow-200 animate-fade-in backdrop-blur">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Educational Prototype Only</p>
            <p className="text-yellow-200/80">
              This is a demonstration prototype for hackathon purposes. It is not a medical device and must not be used 
              for diagnosis, treatment, or real intraoperative decisions without clinical validation and regulatory approval.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Surgery Type", value: healthcareCaseStudy.surgeryType, icon: <Activity className="h-5 w-5" /> },
          { label: "Patient Age", value: healthcareCaseStudy.patient.age, icon: <Activity className="h-5 w-5" /> },
          { label: "Complexity", value: healthcareCaseStudy.patient.complexity, icon: <Activity className="h-5 w-5" /> },
          { label: "Safety Score", value: healthcareCaseStudy.overallSafetyScore.toString(), icon: <CheckCircle2 className="h-5 w-5" />, suffix: "/100" }
        ].map((metric, index) => (
          <MetricCard key={metric.label} {...metric} delay={index * 100} />
        ))}
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur animate-fade-in card-hover">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-300" />
          Surgical Phases
        </h3>
        <div className="space-y-3">
          {healthcareCaseStudy.phases.map((phase, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all card-hover group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <h4 className="font-semibold truncate">{phase.name}</h4>
                  <span className="text-sm text-white/60 whitespace-nowrap">{phase.duration}</span>
                </div>
                <p className="text-sm text-white/70">{phase.notes}</p>
              </div>
              <div className="flex-shrink-0">
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">{phase.safetyScore}</div>
                  <div className="text-xs text-white/50">Safety</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur card-hover animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            Clinical Recommendations
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            {healthcareCaseStudy.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 group">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white/90 transition-colors">{rec}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur card-hover animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="text-xl font-bold mb-4">Resident Feedback</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-emerald-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Strengths
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                {healthcareCaseStudy.residentFeedback.strengths.map((item, i) => (
                  <li key={i} className="flex gap-2 hover:text-white/90 transition-colors">
                    <span className="text-emerald-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Areas for Improvement
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                {healthcareCaseStudy.residentFeedback.improvements.map((item, i) => (
                  <li key={i} className="flex gap-2 hover:text-white/90 transition-colors">
                    <span className="text-yellow-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur animate-fade-in card-hover">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-cyan-300" />
          Evidence Sources
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {result.sources.map((source, i) => (
            <a 
              key={i} 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-white/10 hover:border-cyan-300/30 transition-all card-hover"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold group-hover:text-cyan-300 transition-colors">{source.title}</p>
                <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-cyan-300 flex-shrink-0 transition-colors" />
              </div>
              <p className="mt-1 text-sm text-cyan-300">{source.signal}</p>
              <p className="mt-2 truncate text-xs text-white/40 group-hover:text-white/60 transition-colors">{source.url}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function MetricCard({
  label,
  value,
  icon,
  suffix = "",
  delay = 0
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  suffix?: string;
  delay?: number;
}) {
  return (
    <div
      className="metric-card animate-fade-in-up relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-cyan-300 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 animate-glow-pulse">
            {icon}
          </span>
          <span className="text-4xl font-black text-gradient group-hover:scale-125 transition-all duration-300">
            {value}{suffix}
          </span>
        </div>
        <h3 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors uppercase tracking-wider">{label}</h3>
      </div>
    </div>
  );
}

// Made with Bob
