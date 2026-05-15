# SophieCare Bob Accelerator

**Turn a complex healthcare AI idea into a demo-ready product faster with IBM Bob.**

SophieCare Bob Accelerator is a hackathon proof of concept that demonstrates how **IBM Bob** can act as an AI-powered development partner for a real software project. The target product is **SophieCare AI Surgical Co-Pilot**, an ophthalmology training prototype that simulates AI-assisted surgical review, phase analysis, safety-aware feedback, and resident education.

The submission is intentionally designed around the hackathon challenge: **Turn idea into impact faster.** Instead of showing only a final app, this repository documents how Bob is intended to be used to understand the codebase, generate onboarding documentation, improve maintainability, suggest tests, and accelerate the transformation of an early product idea into a structured, judge-ready prototype.

> **Important:** This repo is prepared for IBM Bob access. Once credentials are provided, the exported IBM Bob report must be added to `/docs/ibm-bob/exports/` before final submission.

---

## 🎯 Why this project fits the IBM Bob challenge

Modern builders lose time on repetitive tasks: understanding existing repositories, documenting decisions, generating tests, explaining architecture, and refactoring code safely. In healthcare software, that friction is even higher because the domain is specialized and new developers need context before contributing.

This project uses SophieCare as a realistic case study to show how IBM Bob can help developers at any skill level:

- Understand a complete repository faster
- Explain architecture and business intent clearly
- Generate technical documentation and onboarding guides
- Suggest tests and quality improvements
- Identify refactoring opportunities
- Prepare a proof of concept for stakeholders and judges

---

## 🚀 Live demo concept

The web app presents an **interactive dashboard** with five key sections:

1. **Repository Analysis** - IBM Bob's understanding of the codebase structure
2. **Documentation Generation** - Auto-generated docs and improvements
3. **Test Suggestions** - Comprehensive test strategy and generated test code
4. **Refactoring Roadmap** - Code quality improvements with before/after examples
5. **Healthcare AI Demo** - SophieCare surgical intelligence dashboard

Each section demonstrates how Bob accelerates different aspects of the development workflow.

The demo uses mocked AI outputs so it runs without paid API keys and is safe to deploy on Vercel.

---

## 🛠️ Core technologies

Free or free-tier friendly stack:

- **IBM Bob** — required AI development partner for repository understanding, documentation, tests, and refactoring workflows
- **Next.js 15 App Router** — application framework with React Server Components
- **React 19** — interactive UI with modern hooks
- **TypeScript 5** — safer application logic with type safety
- **Tailwind CSS 4** — responsive visual system with custom animations
- **Zod** — request validation and type-safe schemas
- **Vercel** — recommended free hosting with zero-config deployment

AI extension points documented for future versions:

- **LangChain-style agent workflow**
- **Hugging Face model integration**
- **Chroma vector database for RAG**
- **YOLO-ready computer vision layer**
- **OpenAI-compatible LLM provider**

---

## 📁 Repository structure

```txt
app/
  api/analyze/              Demo API route for the analysis workflow
  components/               Dashboard and UI components
    AgentTrace.tsx          Bob agent workflow visualization
    ResultDashboard.tsx     Main dashboard with 5 sections
    ScoreCard.tsx           Metric display cards
  lib/                      Mock data and agent workflow simulation
    agents.ts               Bob workflow orchestration
    mockData.ts             Comprehensive demo data
  styles/
    globals.css             Custom animations and utilities
  types/                    TypeScript type definitions
docs/
  ibm-bob/                  IBM Bob usage plan, prompts, evidence, exports
  submission/               Copy/paste fields for lablab.ai submission
  architecture.md           Technical architecture for judges and developers
  demo-guide.md             Demo steps for video and live judging
  deployment-vercel.md      Vercel deployment guide
  hackathon-readiness-analysis.md  Comprehensive readiness assessment
  ui-redesign-plan.md       Dashboard UI architecture plan
public/
  cover-16x9.jpg            Hackathon cover image
  sophiecare-logo.png       Project logo
```

---

## 🎨 New Features

### Interactive Dashboard
- **Progressive demo flow** with 5 distinct sections
- **Tab navigation** for easy section switching
- **Progress indicator** showing completion status
- **Smooth animations** and transitions between sections

### Enhanced UX
- **Loading states** with skeleton loaders
- **Error handling** with user-friendly messages
- **Empty states** for better guidance
- **Mobile-responsive** design for all screen sizes

### Visual Polish
- **Custom animations** (fade-in, slide-in, shimmer effects)
- **Card hover effects** for interactive feedback
- **Color-coded metrics** based on score values
- **Professional gradients** and backdrop blur effects

### Accessibility
- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus indicators** for better visibility
- **Semantic HTML** structure

---

## 🚀 Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```txt
http://localhost:3000
```

### Demo Video Setup (Optional)

To enable the "Use Demo Video" feature in the Video Analysis page:

1. Place a demo surgery video file named `demo-surgery.mp4` in the `/public` folder
2. The app will automatically detect it and show the "Use Demo Video" button
3. If the file is not present, users will see a clear message indicating the demo video is unavailable

The demo video feature allows users to:
- Quickly test the video analysis workflow without uploading their own files
- See the same simulated AI analysis as uploaded videos
- Experience the full video preview and analysis flow

**Note:** The demo video file is not included in the repository due to size constraints. You can use any MP4 video file for testing purposes.

---

## ✅ Build check

```bash
npm run typecheck
npm run build
```

---

## 🔐 Environment variables

No paid credentials are required for the demo.

```bash
# Optional AI providers (not needed for demo)
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

## 📊 IBM Bob integration plan

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

## 📝 Submission materials

Prepared submission content is available in:

```txt
docs/submission/submission-fields.md
docs/submission/video-script-5min.md
docs/submission/slide-presentation-outline.md
docs/submission/final-checklist.md
```

---

## 🎯 Demo Flow

1. **Landing Page** - Value proposition and demo launcher
2. **Run Analysis** - Click "Run Bob Analysis" button
3. **Repository Section** - View codebase structure and insights
4. **Documentation Section** - See generated documentation improvements
5. **Tests Section** - Review test strategy and generated test code
6. **Refactor Section** - Explore code quality improvements
7. **Healthcare Section** - Experience the SophieCare surgical AI demo

---

## 🏗️ Architecture Highlights

### Frontend
- Next.js App Router with React Server Components
- Client-side state management with React hooks
- Tailwind CSS 4 with custom animations
- Responsive design with mobile-first approach

### API Layer
- Type-safe API routes with Zod validation
- Error handling with structured responses
- Mock data for demo purposes

### Component Architecture
- Reusable UI components (MetricCard, CodeBlock, etc.)
- Section-based dashboard layout
- Loading and error states
- Accessibility-first design

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push repository to GitHub
2. Import project into Vercel
3. Deploy with default Next.js settings
4. No environment variables needed for demo

See `docs/deployment-vercel.md` for detailed instructions.

---

## 🧪 Testing

Currently, the project includes mock data for demonstration purposes. Future versions will include:

- Component tests with Vitest/Jest
- API route tests
- Accessibility tests with Testing Library
- E2E tests with Playwright

See `docs/hackathon-readiness-analysis.md` for the complete testing strategy.

---

## 🎨 Customization

### Adding New Sections

1. Add section data to `app/lib/mockData.ts`
2. Create section component in `app/components/ResultDashboard.tsx`
3. Add tab to navigation in `app/page.tsx`
4. Update progress indicator logic

### Styling

- Global styles: `app/styles/globals.css`
- Tailwind config: `tailwind.config.ts`
- Custom animations defined in globals.css

---

## 🐛 Troubleshooting

### Build fails with Tailwind errors

Ensure you're using Tailwind CSS v4 with the correct PostCSS configuration:

```js
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### TypeScript errors

Run type checking:

```bash
npm run typecheck
```

### Port already in use

Change the port:

```bash
npm run dev -- -p 3001
```

---

## 📚 Documentation

- [Architecture](docs/architecture.md) - Technical architecture overview
- [Demo Guide](docs/demo-guide.md) - How to present the demo
- [Deployment](docs/deployment-vercel.md) - Vercel deployment instructions
- [Readiness Analysis](docs/hackathon-readiness-analysis.md) - Comprehensive assessment
- [UI Redesign Plan](docs/ui-redesign-plan.md) - Dashboard architecture

---

## ⚠️ Medical and responsible AI disclaimer

This prototype is for education and hackathon demonstration only. It is not a medical device and must not be used for diagnosis, treatment, or real intraoperative decision-making without clinical validation, regulatory review, and medical supervision.

---

## 📄 License

This project is created for the IBM Bob Hackathon. See individual dependencies for their respective licenses.

---

## 🤝 Contributing

This is a hackathon project. For questions or suggestions, please open an issue on GitHub.

---

## 🏆 Hackathon Submission

**Event:** IBM Bob Hackathon  
**Platform:** lablab.ai  
**Category:** Developer Productivity / AI Development Tools  
**Team:** SophieCare Labs

---

**Built with ❤️ using IBM Bob**
