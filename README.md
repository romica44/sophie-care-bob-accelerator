# SophieCare Bob Accelerator

**Turn a complex healthcare AI idea into a demo-ready product faster with IBM Bob.**

SophieCare Bob Accelerator is a hackathon proof of concept that demonstrates how **IBM Bob** can act as an AI-powered development partner for a real software project. The target product is **SophieCare AI Surgical Co-Pilot**, an ophthalmology training prototype that simulates AI-assisted surgical review, phase analysis, safety-aware feedback, and resident education.

The submission is intentionally designed around the hackathon challenge: **Turn idea into impact faster.** Instead of showing only a final app, this repository documents how Bob is intended to be used to understand the codebase, generate onboarding documentation, improve maintainability, suggest tests, and accelerate the transformation of an early product idea into a structured, judge-ready prototype.

> **Important:** This repo is prepared for IBM Bob access. Once credentials are provided, the exported IBM Bob report must be added to `/docs/ibm-bob/exports/` before final submission.

---

## Why this project fits the IBM Bob challenge

Modern builders lose time on repetitive tasks: understanding existing repositories, documenting decisions, generating tests, explaining architecture, and refactoring code safely. In healthcare software, that friction is even higher because the domain is specialized and new developers need context before contributing.

This project uses SophieCare as a realistic case study to show how IBM Bob can help developers at any skill level:

- Understand a complete repository faster.
- Explain architecture and business intent clearly.
- Generate technical documentation and onboarding guides.
- Suggest tests and quality improvements.
- Identify refactoring opportunities.
- Prepare a proof of concept for stakeholders and judges.

---

## Live demo concept

The web app presents a surgical intelligence dashboard for ophthalmology training. Users can run a simulated AI review of a cataract surgery scenario and see:

- Surgical phase analysis
- Safety-aware risk signals
- Resident training feedback
- Clinical guidance placeholders
- Agent reasoning trace
- Responsible AI and technical evidence

The demo uses mocked AI outputs so it runs without paid API keys and is safe to deploy on Vercel.

---

## Core technologies

Free or free-tier friendly stack:

- **IBM Bob** — required AI development partner for repository understanding, documentation, tests, and refactoring workflows.
- **Next.js App Router** — application framework.
- **React** — interactive UI.
- **TypeScript** — safer application logic.
- **Tailwind CSS** — responsive visual system.
- **Zod** — request validation.
- **Vercel** — recommended free hosting.

AI extension points documented for future versions:

- **LangChain-style agent workflow**
- **Hugging Face model integration**
- **Chroma vector database for RAG**
- **YOLO-ready computer vision layer**
- **OpenAI-compatible LLM provider**

---

## Repository structure

```txt
app/
  api/analyze/              Demo API route for the surgical review workflow
  components/               Dashboard and evidence components
  lib/                      Mock data and agent workflow simulation
  types/                    TypeScript types
docs/
  ibm-bob/                  IBM Bob usage plan, prompts, evidence, exports
  submission/               Copy/paste fields for lablab.ai submission
  architecture.md           Technical architecture for judges and developers
  demo-guide.md             Demo steps for video and live judging
  deployment-vercel.md      Vercel deployment guide
public/
  cover-16x9.jpg            Hackathon cover image
  sophiecare-logo.png       Project image/logo
```

---

## IBM Bob integration plan

When IBM Bob credentials become available, use Bob on this exact repository and export the official report.

Required final evidence:

```txt
docs/ibm-bob/exports/ibm-bob-exported-report.pdf
```

If the export is Markdown or another format, place it in the same folder and update:

```txt
docs/ibm-bob/exports/README.md
```

Recommended Bob sessions are documented in:

```txt
docs/ibm-bob/bob-prompt-playbook.md
docs/ibm-bob/bob-task-plan.md
docs/ibm-bob/bob-session-log-template.md
```

---

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Build check

```bash
npm run typecheck
npm run build
```

---

## Environment variables

No paid credentials are required for the demo.

```bash
# Required only if enabling real provider integrations
OPENAI_API_KEY=
IBM_WATSONX_API_KEY=
IBM_WATSONX_PROJECT_ID=
IBM_WATSONX_REGION=
HUGGINGFACE_API_TOKEN=
CHROMA_URL=http://localhost:8000

# Hackathon evidence
IBM_BOB_REPORT_PATH=docs/ibm-bob/exports/ibm-bob-exported-report.pdf
```

---

## Submission materials

Prepared submission content is available in:

```txt
docs/submission/submission-fields.md
docs/submission/video-script-5min.md
docs/submission/slide-presentation-outline.md
docs/submission/final-checklist.md
```

---

## Medical and responsible AI disclaimer

This prototype is for education and hackathon demonstration only. It is not a medical device and must not be used for diagnosis, treatment, or real intraoperative decision-making without clinical validation, regulatory review, and medical supervision.
