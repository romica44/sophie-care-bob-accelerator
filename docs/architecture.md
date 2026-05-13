# Technical Architecture

## Purpose

SophieCare Bob Accelerator is designed to demonstrate IBM Bob's value as a contextual AI development partner. The application uses a healthcare AI prototype as the realistic codebase and shows how Bob can accelerate everyday software delivery tasks.

## Application layers

### 1. User interface

Built with Next.js, React, TypeScript, Tailwind CSS, and lucide-react icons.

Main files:

```txt
app/page.tsx
app/components/ResultDashboard.tsx
app/components/ScoreCard.tsx
app/components/AgentTrace.tsx
```

### 2. API route

The demo API receives a user request, validates it with Zod, and returns a simulated productivity review.

```txt
app/api/analyze/route.ts
```

### 3. Agent workflow simulation

The workflow is intentionally mocked to avoid paid API requirements and to keep the hackathon demo deployable on Vercel.

```txt
app/lib/agents.ts
app/lib/mockData.ts
```

### 4. IBM Bob evidence layer

The repository contains a dedicated evidence center that prepares the project for Bob usage and the required exported report.

```txt
docs/ibm-bob/
```

## Data flow

1. User enters or accepts the default prompt.
2. Frontend calls `/api/analyze`.
3. API validates the request.
4. Mock Bob accelerator workflow returns structured results.
5. Dashboard renders scores, insights, risks, opportunities, sources, and agent trace.

## Why mocked outputs are intentional

The hackathon requirement is to demonstrate IBM Bob usage, not to require paid model APIs. Mocked outputs make the project reproducible, safe, and easy for judges to run.

Real integrations can later be added behind environment variables without changing the demo user experience.
