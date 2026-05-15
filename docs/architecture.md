# Technical Architecture

## Purpose

SophieCare Bob Accelerator is designed to demonstrate IBM Bob's value as a contextual AI development partner. The application is a fully functional healthcare AI prototype showcasing surgical intelligence capabilities, built entirely with IBM Bob's assistance.

## Application Overview

SophieCare is an AI-powered surgical co-pilot for ophthalmology teams, featuring:
- Real-time surgical phase detection and monitoring
- Video analysis with AI-powered insights
- Patient case management
- Resident training modules
- Comprehensive AI insights and recommendations

## Application Layers

### 1. User Interface Layer

Built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, and lucide-react icons.

**Core Layout:**
```txt
app/layout.tsx              # Root layout with sidebar navigation
app/page.tsx                # Main dashboard with metrics and activity
app/components/Sidebar.tsx  # Navigation sidebar with 8 sections
```

**Feature Pages:**
```txt
app/patient-cases/page.tsx      # Patient case management
app/live-surgery/page.tsx       # Real-time surgery monitoring
app/video-analysis/page.tsx     # Video upload and analysis
app/resident-training/page.tsx  # Educational modules
app/ai-insights/page.tsx        # AI intelligence reports
app/bob-evidence/page.tsx       # IBM Bob development log
app/settings/page.tsx           # Configuration panel
```

**Reusable Components:**
```txt
app/components/LiveSurgery.tsx      # Live surgery simulation
app/components/VideoUpload.tsx      # Video upload interface
app/components/ResultDashboard.tsx  # Analysis results display
app/components/ScoreCard.tsx        # Metric cards
app/components/AgentTrace.tsx       # AI agent workflow trace
```

### 2. State Management

**Dashboard Store:**
```txt
app/lib/dashboardStore.ts   # Centralized state for metrics
```

Features:
- Real-time metric updates across pages
- Analysis count tracking
- Confidence score averaging
- Recent activity feed
- Subscriber pattern for reactive updates

### 3. Data Layer

**Mock Data & Types:**
```txt
app/lib/mockData.ts         # Comprehensive mock data
app/types/analysis.ts       # TypeScript type definitions
```

Includes:
- Patient cases with full medical history
- Surgical procedures and phases
- AI recommendations and insights
- Risk indicators and safety metrics
- Training modules and assessments

### 4. API Routes

**Analysis Endpoint:**
```txt
app/api/analyze/route.ts    # Video analysis API
```

Features:
- Zod validation for request data
- Simulated AI analysis workflow
- Structured JSON responses
- Error handling

### 5. Styling System

**Global Styles:**
```txt
app/styles/globals.css      # Custom animations and utilities
tailwind.config.ts          # Tailwind configuration
```

Custom features:
- Animated gradient backgrounds
- Glassmorphism effects
- Smooth transitions
- Responsive breakpoints
- Dark theme optimized

### 6. IBM Bob Evidence Layer

**Documentation:**
```txt
docs/architecture.md        # Technical architecture
docs/ui-redesign-plan.md    # UI design specifications
docs/ibm-bob/exports/       # Bob task exports (14 sessions)
docs/submission/            # Hackathon submission materials
```

## Data Flow

### Video Analysis Flow
1. User uploads video via VideoUpload component
2. File is validated (type, size)
3. POST request to `/api/analyze` with video metadata
4. API simulates AI analysis (phase detection, safety checks)
5. Results returned with confidence scores and recommendations
6. Dashboard store updated with new analysis
7. Results displayed in ResultDashboard component
8. Main dashboard metrics automatically update

### Live Surgery Flow
1. User starts surgery simulation
2. LiveSurgery component initializes with patient data
3. Phases progress automatically with realistic timing
4. Real-time metrics update (ultrasound, vacuum, etc.)
5. AI recommendations generated based on phase
6. Anomalies detected and logged
7. Event log tracks all activities
8. Procedure summary generated on completion

### Patient Case Flow
1. Cases loaded from mockData
2. Filters applied (status, risk, search)
3. Case selection updates detail view
4. Risk indicators calculated
5. AI recommendations displayed
6. Procedure history shown
7. Notes and comorbidities listed

## Architecture Decisions

### Why Mock Data?

The hackathon requirement is to demonstrate IBM Bob usage, not to require paid model APIs or real medical data. Mock data provides:

1. **Reproducibility** - Consistent demo experience
2. **Safety** - No PHI or real patient data
3. **Deployability** - Works on Vercel free tier
4. **Testability** - Predictable outcomes
5. **Compliance** - No regulatory concerns

Real integrations can be added behind environment variables without changing the user experience.

### Why Client-Side State?

For this prototype, client-side state management is sufficient:

1. **Simplicity** - No database setup required
2. **Performance** - Instant updates
3. **Demo Focus** - Showcases UI/UX capabilities
4. **Scalability Path** - Easy to migrate to server state

### Why App Router?

Next.js 14 App Router provides:

1. **Server Components** - Better performance
2. **Layouts** - Shared UI patterns
3. **Loading States** - Built-in suspense
4. **Metadata API** - SEO optimization
5. **Modern Patterns** - Future-proof architecture

## Performance Optimizations

1. **Code Splitting** - Dynamic imports for heavy components
2. **Image Optimization** - Next.js Image component
3. **CSS Optimization** - Tailwind JIT compiler
4. **Bundle Analysis** - Tree-shaking unused code
5. **Lazy Loading** - Components loaded on demand

## Accessibility Features

1. **ARIA Labels** - Semantic HTML throughout
2. **Keyboard Navigation** - Full keyboard support
3. **Focus Management** - Visible focus indicators
4. **Color Contrast** - WCAG AA compliant
5. **Screen Reader** - Descriptive labels

## Security Considerations

1. **Input Validation** - Zod schemas for all inputs
2. **File Upload Limits** - Size and type restrictions
3. **No PHI Storage** - Mock data only
4. **HTTPS Only** - Secure connections
5. **CSP Headers** - Content security policy

## Deployment Architecture

**Platform:** Vercel
**Build:** Next.js static export
**CDN:** Vercel Edge Network
**Domain:** sophiecare-bob-accelerator.vercel.app

**Environment Variables:**
```txt
NEXT_PUBLIC_APP_URL         # Application URL
BRIGHT_DATA_API_KEY         # (Optional) For future integrations
```

## Technology Stack

**Frontend:**
- Next.js 14.2.3
- React 18
- TypeScript 5
- Tailwind CSS 3.4.1
- Lucide React (icons)

**Development:**
- ESLint
- PostCSS
- Autoprefixer

**Deployment:**
- Vercel
- Git (version control)

## Future Enhancements

1. **Real AI Integration** - Connect to actual ML models
2. **Database Layer** - PostgreSQL for persistence
3. **Authentication** - User accounts and roles
4. **Real-time Updates** - WebSocket connections
5. **Video Processing** - Actual video analysis pipeline
6. **DICOM Support** - Medical imaging standards
7. **HL7 Integration** - Healthcare data exchange
8. **Audit Logging** - Compliance tracking
9. **Multi-language** - Internationalization
10. **Mobile Apps** - Native iOS/Android

## IBM Bob's Role

This entire application was built with IBM Bob's assistance:

1. **Architecture Design** - System design and planning
2. **Component Development** - React components and pages
3. **State Management** - Dashboard store implementation
4. **Type Safety** - TypeScript definitions
5. **Styling** - Tailwind CSS and animations
6. **Documentation** - Technical and user docs
7. **Testing Strategy** - Test planning
8. **Deployment** - Vercel configuration
9. **Optimization** - Performance improvements
10. **Debugging** - Issue resolution

See `docs/ibm-bob/exports/` for detailed development logs.
