**User:**

<task>
Also add a “Use Demo Video” button.

When clicked:
- Load /public/demo-surgery.mp4 if available.
- Show it in the same video preview player.
- If the file does not exist, show a clear placeholder message.
- Allow the same simulated analysis flow as uploaded videos.
</task>
<environment_details>
# VSCode Visible Files
..\..\Downloads\bob_task_may-15-2026_4-16-11-pm.md

# VSCode Open Tabs
.env,docs/hackathon-readiness-analysis.md,docs/ui-redesign-plan.md,.env.example,postcss.config.mjs,README.md,app/lib/brightData.ts,app/components/AgentTrace.tsx,app/live-surgery/page.tsx,app/ai-insights/page.tsx,app/bob-evidence/page.tsx,app/settings/page.tsx,docs/multi-page-app-guide.md,app/components/LiveSurgery.tsx,app/types/analysis.ts,app/lib/mockData.ts,app/components/Sidebar.tsx,app/resident-training/page.tsx,app/styles/globals.css,app/components/ScoreCard.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T19:54:45.997Z
User time zone: America/Buenos_Aires, UTC-3:00

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>


# Current Workspace Directory (c:/Users/romic/Documents/sophie-care-bob-accelerator) Files
.env.example
.gitignore
next-env.d.ts
next.config.mjs
package-lock.json
package.json
postcss.config.mjs
README.md
tailwind.config.ts
tsconfig.json
tsconfig.tsbuildinfo
app/
app/layout.tsx
app/page.tsx
app/ai-insights/
app/ai-insights/page.tsx
app/api/
app/api/analyze/
app/api/analyze/route.ts
app/bob-evidence/
app/bob-evidence/page.tsx
app/components/
app/components/AgentTrace.tsx
app/components/LiveSurgery.tsx
app/components/LiveSurgery.tsx.backup
app/components/ResultDashboard.tsx
app/components/ScoreCard.tsx
app/components/Sidebar.tsx
app/components/VideoUpload.tsx
app/lib/
app/lib/agents.ts
app/lib/brightData.ts
app/lib/dashboardStore.ts
app/lib/mockData.ts
app/live-surgery/
app/live-surgery/page.tsx
app/patient-cases/
app/patient-cases/page.tsx
app/resident-training/
app/resident-training/page.tsx
app/settings/
app/settings/page.tsx
app/styles/
app/styles/globals.css
app/types/
app/types/analysis.ts
app/video-analysis/
app/video-analysis/page.tsx
docs/
docs/architecture.md
docs/demo-guide.md
docs/deployment-vercel.md
docs/hackathon-readiness-analysis.md
docs/multi-page-app-guide.md
docs/pitch.md
docs/ui-redesign-plan.md
docs/video-script.md
docs/ibm-bob/
docs/ibm-bob/exports/
docs/submission/
docs/submission/final-checklist.md
docs/submission/slide-presentation-outline.md
docs/submission/submission-fields.md
docs/submission/submission.json
docs/submission/video-script-5min.md
public/
public/cover-16x9.jpg
public/sophiecare-logo.png
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll help you add a "Use Demo Video" button that loads a demo video file. Let me start by examining the current video upload component to understand the structure.

<read_file>
<args>
<file>
<path>app/components/VideoUpload.tsx</path>
</file>
</args>
</read_file>

---

**User:**

[read_file for 'app/components/VideoUpload.tsx'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>app/components/VideoUpload.tsx</path>
<content lines="1-572">
  1 | "use client";
  2 | 
  3 | import { useState, useRef, useCallback } from "react";
  4 | import { Upload, Video, CheckCircle2, AlertTriangle, Loader2, X, FileVideo, TrendingUp, Play } from "lucide-react";
  5 | 
  6 | type UploadStatus = "idle" | "selected" | "analyzing" | "complete" | "error";
  7 | 
  8 | interface VideoFile {
  9 |   file: File;
 10 |   name: string;
 11 |   size: number;
 12 |   type: string;
 13 |   previewUrl: string;
 14 | }
 15 | 
 16 | interface AIResults {
 17 |   procedure: string;
 18 |   phases: Array<{
 19 |     name: string;
 20 |     timestamp: string;
 21 |     confidence: number;
 22 |   }>;
 23 |   overallConfidence: number;
 24 |   riskScore: number;
 25 |   riskAlerts: string[];
 26 |   detectedEvents: string[];
 27 |   residentFeedback: string[];
 28 |   recommendations: string[];
 29 |   fileName?: string;
 30 | }
 31 | 
 32 | // Mock procedure types for random generation
 33 | const procedureTypes = [
 34 |   "Cataract Surgery - Phacoemulsification",
 35 |   "Vitrectomy - Retinal Detachment Repair",
 36 |   "Trabeculectomy - Glaucoma Surgery",
 37 |   "Corneal Transplant - DSAEK",
 38 |   "Pterygium Excision with Graft"
 39 | ];
 40 | 
 41 | const phasesByProcedure: Record<string, string[]> = {
 42 |   "Cataract Surgery - Phacoemulsification": [
 43 |     "Incision", "Capsulorhexis", "Hydrodissection", "Phacoemulsification", "IOL Implantation", "Closure"
 44 |   ],
 45 |   "Vitrectomy - Retinal Detachment Repair": [
 46 |     "Port Placement", "Core Vitrectomy", "Peripheral Vitrectomy", "Membrane Peeling", "Laser Photocoagulation", "Tamponade"
 47 |   ],
 48 |   "Trabeculectomy - Glaucoma Surgery": [
 49 |     "Conjunctival Flap", "Scleral Flap", "Trabeculectomy", "Iridectomy", "Flap Closure", "Conjunctival Closure"
 50 |   ],
 51 |   "Corneal Transplant - DSAEK": [
 52 |     "Recipient Preparation", "Descemetorhexis", "Donor Preparation", "Graft Insertion", "Graft Positioning", "Closure"
 53 |   ],
 54 |   "Pterygium Excision with Graft": [
 55 |     "Pterygium Excision", "Scleral Bed Preparation", "Graft Harvesting", "Graft Placement", "Suturing", "Final Check"
 56 |   ]
 57 | };
 58 | 
 59 | interface VideoUploadProps {
 60 |   onAnalysisComplete?: (results: AIResults) => void;
 61 | }
 62 | 
 63 | export function VideoUpload({ onAnalysisComplete }: VideoUploadProps) {
 64 |   const [status, setStatus] = useState<UploadStatus>("idle");
 65 |   const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
 66 |   const [progress, setProgress] = useState(0);
 67 |   const [aiResults, setAiResults] = useState<AIResults | null>(null);
 68 |   const [isDragging, setIsDragging] = useState(false);
 69 |   const fileInputRef = useRef<HTMLInputElement>(null);
 70 | 
 71 |   const generateMockAIResults = (fileName: string): AIResults => {
 72 |     // Randomly select a procedure type
 73 |     const procedure = procedureTypes[Math.floor(Math.random() * procedureTypes.length)];
 74 |     const phases = phasesByProcedure[procedure];
 75 |     
 76 |     // Generate phases with timestamps
 77 |     let currentTime = 0;
 78 |     const generatedPhases = phases.map((phaseName) => {
 79 |       const duration = Math.floor(Math.random() * 180) + 60; // 60-240 seconds
 80 |       const startTime = currentTime;
 81 |       currentTime += duration;
 82 |       
 83 |       const formatTime = (seconds: number) => {
 84 |         const mins = Math.floor(seconds / 60);
 85 |         const secs = seconds % 60;
 86 |         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
 87 |       };
 88 |       
 89 |       return {
 90 |         name: phaseName,
 91 |         timestamp: `${formatTime(startTime)} - ${formatTime(currentTime)}`,
 92 |         confidence: Math.floor(Math.random() * 10) + 90 // 90-99%
 93 |       };
 94 |     });
 95 | 
 96 |     const overallConfidence = Math.floor(
 97 |       generatedPhases.reduce((sum, p) => sum + p.confidence, 0) / generatedPhases.length * 10
 98 |     ) / 10;
 99 | 
100 |     const riskScore = Math.floor(Math.random() * 30) + 10; // 10-40 risk score
101 | 
102 |     const allRiskAlerts = [
103 |       "Posterior capsule tension detected at 08:32 - resolved safely",
104 |       "Zonular stress indicators at 06:15 - monitored, no intervention needed",
105 |       "Slight corneal edema observed at 12:45 - within normal limits",
106 |       "Iris prolapse risk detected at 04:20 - successfully managed",
107 |       "Elevated IOP during procedure - normalized post-op"
108 |     ];
109 | 
110 |     const allEvents = [
111 |       "Excellent visualization maintained throughout procedure",
112 |       "Smooth instrument transitions observed",
113 |       "Optimal power settings applied consistently",
114 |       "Efficient technique demonstrated",
115 |       "Precise positioning achieved",
116 |       "Minimal tissue trauma observed",
117 |       "Good chamber stability maintained"
118 |     ];
119 | 
120 |     const allFeedback = [
121 |       "Excellent surgical technique with consistent precision",
122 |       "Optimal instrument handling and control demonstrated",
123 |       "Consider slightly slower pace for teaching clarity",
124 |       "Strong understanding of anatomical landmarks shown",
125 |       "Efficient time management throughout procedure",
126 |       "Good communication with surgical team observed",
127 |       "Appropriate response to intraoperative challenges",
128 |       "Overall procedure demonstrates strong technical competency"
129 |     ];
130 | 
131 |     const allRecommendations = [
132 |       "Continue current technique - showing excellent results",
133 |       "Consider documenting this case for teaching purposes",
134 |       "Review advanced techniques for complex cases",
135 |       "Maintain current safety protocols",
136 |       "Share insights with resident training program",
137 |       "Consider peer review for continuous improvement"
138 |     ];
139 | 
140 |     // Randomly select 2-3 items from each array
141 |     const selectRandom = (arr: string[], count: number) => {
142 |       const shuffled = [...arr].sort(() => 0.5 - Math.random());
143 |       return shuffled.slice(0, count);
144 |     };
145 | 
146 |     return {
147 |       procedure,
148 |       phases: generatedPhases,
149 |       overallConfidence,
150 |       riskScore,
151 |       riskAlerts: selectRandom(allRiskAlerts, Math.floor(Math.random() * 2) + 2),
152 |       detectedEvents: selectRandom(allEvents, Math.floor(Math.random() * 3) + 3),
153 |       residentFeedback: selectRandom(allFeedback, Math.floor(Math.random() * 3) + 4),
154 |       recommendations: selectRandom(allRecommendations, Math.floor(Math.random() * 2) + 3)
155 |     };
156 |   };
157 | 
158 |   const handleDragOver = useCallback((e: React.DragEvent) => {
159 |     e.preventDefault();
160 |     setIsDragging(true);
161 |   }, []);
162 | 
163 |   const handleDragLeave = useCallback((e: React.DragEvent) => {
164 |     e.preventDefault();
165 |     setIsDragging(false);
166 |   }, []);
167 | 
168 |   const handleDrop = useCallback((e: React.DragEvent) => {
169 |     e.preventDefault();
170 |     setIsDragging(false);
171 |     
172 |     const files = e.dataTransfer.files;
173 |     if (files.length > 0) {
174 |       processFile(files[0]);
175 |     }
176 |   }, []);
177 | 
178 |   const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
179 |     const files = e.target.files;
180 |     if (files && files.length > 0) {
181 |       processFile(files[0]);
182 |     }
183 |   }, []);
184 | 
185 |   const processFile = (file: File) => {
186 |     // Validate file type - only accept video files
187 |     const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
188 |     if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
189 |       setStatus("error");
190 |       return;
191 |     }
192 | 
193 |     // Create preview URL
194 |     const previewUrl = URL.createObjectURL(file);
195 | 
196 |     const videoFileData: VideoFile = {
197 |       file,
198 |       name: file.name,
199 |       size: file.size,
200 |       type: file.type,
201 |       previewUrl
202 |     };
203 | 
204 |     setVideoFile(videoFileData);
205 |     setStatus("selected");
206 |     setProgress(0);
207 |     setAiResults(null);
208 |   };
209 | 
210 |   const startAnalysis = () => {
211 |     if (!videoFile) return;
212 | 
213 |     setStatus("analyzing");
214 |     setProgress(0);
215 |     
216 |     // Simulate AI analysis progress
217 |     const analysisInterval = setInterval(() => {
218 |       setProgress((prev) => {
219 |         if (prev >= 100) {
220 |           clearInterval(analysisInterval);
221 |           const results = generateMockAIResults(videoFile.name);
222 |           setStatus("complete");
223 |           setAiResults(results);
224 |           
225 |           // Notify parent component with fileName included
226 |           if (onAnalysisComplete) {
227 |             onAnalysisComplete({
228 |               ...results,
229 |               fileName: videoFile.name
230 |             });
231 |           }
232 |           
233 |           return 100;
234 |         }
235 |         return prev + 2;
236 |       });
237 |     }, 100);
238 |   };
239 | 
240 |   const reset = () => {
241 |     if (videoFile?.previewUrl) {
242 |       URL.revokeObjectURL(videoFile.previewUrl);
243 |     }
244 |     setStatus("idle");
245 |     setVideoFile(null);
246 |     setProgress(0);
247 |     setAiResults(null);
248 |     if (fileInputRef.current) {
249 |       fileInputRef.current.value = "";
250 |     }
251 |   };
252 | 
253 |   const formatFileSize = (bytes: number) => {
254 |     if (bytes < 1024) return bytes + " B";
255 |     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
256 |     return (bytes / (1024 * 1024)).toFixed(1) + " MB";
257 |   };
258 | 
259 |   return (
260 |     <div className="space-y-6">
261 |       {/* Upload Area */}
262 |       {status === "idle" && (
263 |         <div
264 |           onDragOver={handleDragOver}
265 |           onDragLeave={handleDragLeave}
266 |           onDrop={handleDrop}
267 |           className={`group relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-500 overflow-hidden ${
268 |             isDragging
269 |               ? "border-cyan-300 bg-cyan-300/10 scale-[1.03] shadow-2xl"
270 |               : "border-white/20 bg-black/25 hover:border-cyan-300/50 hover:bg-black/30 hover:scale-[1.01]"
271 |           }`}
272 |         >
273 |           {/* Animated background gradient */}
274 |           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
275 |           
276 |           {/* Grid pattern */}
277 |           <div className="absolute inset-0 grid-pattern opacity-30" />
278 |           
279 |           <div className="relative z-10">
280 |             <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm transition-all duration-500 ${isDragging ? 'scale-110 rotate-12' : 'group-hover:scale-110'}`}>
281 |               <Video className={`h-10 w-10 text-cyan-300 transition-all duration-500 ${isDragging ? 'animate-bounce-subtle' : 'group-hover:animate-pulse-glow'}`} />
282 |             </div>
283 |             <h3 className="mb-3 text-2xl font-black text-gradient-animate">Upload Surgery Video</h3>
284 |             <p className="mb-6 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
285 |               Drag and drop a video file here, or click to browse
286 |             </p>
287 |             <input
288 |               ref={fileInputRef}
289 |               type="file"
290 |               accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
291 |               onChange={handleFileSelect}
292 |               className="hidden"
293 |             />
294 |             <button
295 |               onClick={() => fileInputRef.current?.click()}
296 |               className="btn-primary inline-flex items-center gap-3 text-base px-8 py-4 shadow-2xl hover:shadow-cyan-500/50"
297 |             >
298 |               <Upload className="h-5 w-5" /> Select Video File
299 |             </button>
300 |             <p className="mt-6 text-xs text-white/50 font-medium">
301 |               Supported formats: MP4, MOV, WEBM
302 |             </p>
303 |             <p className="mt-2 text-xs text-white/40 font-medium">
304 |               Demo uses mock AI processing. No actual video analysis performed.
305 |             </p>
306 |           </div>
307 |         </div>
308 |       )}
309 | 
310 |       {/* Video Selected - Preview and Analyze */}
311 |       {status === "selected" && videoFile && (
312 |         <div className="space-y-4 animate-scale-in-bounce">
313 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-premium shadow-2xl">
314 |             <div className="mb-4 flex items-center justify-between">
315 |               <h3 className="text-xl font-bold">Video Ready for Analysis</h3>
316 |               <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
317 |                 <X className="h-4 w-4" /> Cancel
318 |               </button>
319 |             </div>
320 | 
321 |             {/* Video Preview */}
322 |             <div className="mb-4 rounded-2xl overflow-hidden bg-black/50 border border-white/10">
323 |               <video
324 |                 src={videoFile.previewUrl}
325 |                 controls
326 |                 className="w-full max-h-96 object-contain"
327 |               >
328 |                 Your browser does not support the video tag.
329 |               </video>
330 |             </div>
331 | 
332 |             {/* File Info */}
333 |             <div className="mb-6 grid gap-3 sm:grid-cols-3">
334 |               <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
335 |                 <p className="text-xs text-white/50 mb-1">File Name</p>
336 |                 <p className="font-semibold text-sm truncate">{videoFile.name}</p>
337 |               </div>
338 |               <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
339 |                 <p className="text-xs text-white/50 mb-1">File Size</p>
340 |                 <p className="font-semibold text-sm">{formatFileSize(videoFile.size)}</p>
341 |               </div>
342 |               <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
343 |                 <p className="text-xs text-white/50 mb-1">Format</p>
344 |                 <p className="font-semibold text-sm uppercase">{videoFile.type.split('/')[1] || 'VIDEO'}</p>
345 |               </div>
346 |             </div>
347 | 
348 |             {/* Analyze Button */}
349 |             <button
350 |               onClick={startAnalysis}
351 |               className="btn-primary w-full inline-flex items-center justify-center gap-3 text-lg py-4"
352 |             >
353 |               <Play className="h-5 w-5" /> Analyze Video with AI
354 |             </button>
355 |           </div>
356 |         </div>
357 |       )}
358 | 
359 |       {/* Analysis Progress */}
360 |       {status === "analyzing" && videoFile && (
361 |         <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-cyan-300/10 to-purple-300/10 p-7 animate-scale-in-bounce backdrop-blur-premium shadow-2xl relative overflow-hidden">
362 |           {/* Animated glow effect */}
363 |           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse-glow-strong" />
364 |           
365 |           <div className="relative z-10">
366 |             <div className="mb-5 flex items-center justify-between">
367 |               <div className="flex items-center gap-4">
368 |                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm shadow-lg">
369 |                   <Loader2 className="h-7 w-7 animate-spin text-cyan-300 drop-shadow-glow" />
370 |                 </div>
371 |                 <div>
372 |                   <p className="font-black text-lg text-gradient">AI Processing</p>
373 |                   <p className="text-sm text-white/70 font-medium">Analyzing surgical phases and techniques</p>
374 |                 </div>
375 |               </div>
376 |             </div>
377 |             <div className="progress-bar mb-3">
378 |               <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
379 |             </div>
380 |             <p className="mb-5 text-sm text-white/70 font-semibold">Processing... {progress}%</p>
381 |             <div className="space-y-3 text-sm">
382 |               {progress > 20 && (
383 |                 <p className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300 hover:bg-emerald-500/15 animate-fade-in">
384 |                   <CheckCircle2 className="h-5 w-5 text-emerald-300 animate-scale-in" />
385 |                   <span className="text-white/80 font-medium">Phase detection complete</span>
386 |                 </p>
387 |               )}
388 |               {progress > 50 && (
389 |                 <p className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300 hover:bg-emerald-500/15 animate-fade-in">
390 |                   <CheckCircle2 className="h-5 w-5 text-emerald-300 animate-scale-in" />
391 |                   <span className="text-white/80 font-medium">Risk analysis complete</span>
392 |                 </p>
393 |               )}
394 |               {progress > 75 && (
395 |                 <p className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 transition-all duration-300 hover:bg-cyan-500/15 animate-fade-in">
396 |                   <Loader2 className="h-5 w-5 animate-spin text-cyan-300" />
397 |                   <span className="text-white/80 font-medium">Generating feedback...</span>
398 |                 </p>
399 |               )}
400 |             </div>
401 |           </div>
402 |         </div>
403 |       )}
404 | 
405 |       {/* Complete - AI Results */}
406 |       {status === "complete" && aiResults && videoFile && (
407 |         <div className="space-y-4 animate-fade-in">
408 |           {/* Header */}
409 |           <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">
410 |             <div className="mb-4 flex items-center justify-between">
411 |               <div className="flex items-center gap-3">
412 |                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10">
413 |                   <CheckCircle2 className="h-6 w-6 text-emerald-300" />
414 |                 </div>
415 |                 <div>
416 |                   <p className="font-bold">Analysis Complete</p>
417 |                   <p className="text-sm text-white/60">{videoFile.name}</p>
418 |                 </div>
419 |               </div>
420 |               <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
421 |                 <X className="h-4 w-4" /> Clear
422 |               </button>
423 |             </div>
424 |           </div>
425 | 
426 |           {/* Detected Procedure */}
427 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
428 |             <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
429 |               <Video className="h-5 w-5 text-cyan-300" />
430 |               Detected Procedure
431 |             </h3>
432 |             <p className="text-2xl font-black text-cyan-200">{aiResults.procedure}</p>
433 |             <div className="mt-4 grid grid-cols-2 gap-4">
434 |               <div className="flex items-center gap-2">
435 |                 <TrendingUp className="h-5 w-5 text-emerald-300" />
436 |                 <div>
437 |                   <span className="text-xs text-white/50 block">AI Confidence</span>
438 |                   <span className="text-xl font-bold text-emerald-300">{aiResults.overallConfidence}%</span>
439 |                 </div>
440 |               </div>
441 |               <div className="flex items-center gap-2">
442 |                 <AlertTriangle className="h-5 w-5 text-amber-300" />
443 |                 <div>
444 |                   <span className="text-xs text-white/50 block">Risk Score</span>
445 |                   <span className="text-xl font-bold text-amber-300">{aiResults.riskScore}</span>
446 |                 </div>
447 |               </div>
448 |             </div>
449 |           </div>
450 | 
451 |           {/* Surgical Phases */}
452 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
453 |             <h3 className="mb-4 text-xl font-bold">Detected Surgical Phases</h3>
454 |             <div className="space-y-3">
455 |               {aiResults.phases.map((phase, index) => (
456 |                 <div
457 |                   key={index}
458 |                   className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4 transition-all hover:bg-white/5"
459 |                 >
460 |                   <div className="flex items-center gap-3">
461 |                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-black text-cyan-200">
462 |                       {index + 1}
463 |                     </div>
464 |                     <div>
465 |                       <p className="font-bold">{phase.name}</p>
466 |                       <p className="text-sm text-white/50">{phase.timestamp}</p>
467 |                     </div>
468 |                   </div>
469 |                   <div className="text-right">
470 |                     <p className="text-2xl font-bold text-cyan-200">{phase.confidence}%</p>
471 |                     <p className="text-xs text-white/40">Confidence</p>
472 |                   </div>
473 |                 </div>
474 |               ))}
475 |             </div>
476 |           </div>
477 | 
478 |           {/* Risk Alerts */}
479 |           <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6">
480 |             <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
481 |               <AlertTriangle className="h-5 w-5 text-amber-300" />
482 |               Risk Alerts
483 |             </h3>
484 |             <div className="space-y-3">
485 |               {aiResults.riskAlerts.map((alert, index) => (
486 |                 <div
487 |                   key={index}
488 |                   className="flex gap-3 rounded-2xl border border-amber-400/20 bg-black/25 p-4"
489 |                 >
490 |                   <AlertTriangle className="h-5 w-5 shrink-0 text-amber-300" />
491 |                   <p className="text-sm text-white/70">{alert}</p>
492 |                 </div>
493 |               ))}
494 |             </div>
495 |           </div>
496 | 
497 |           {/* Detected Events */}
498 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
499 |             <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
500 |               <CheckCircle2 className="h-5 w-5 text-emerald-300" />
501 |               Detected Events
502 |             </h3>
503 |             <div className="space-y-3">
504 |               {aiResults.detectedEvents.map((event, index) => (
505 |                 <div
506 |                   key={index}
507 |                   className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
508 |                 >
509 |                   <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
510 |                   <p className="text-sm text-white/70">{event}</p>
511 |                 </div>
512 |               ))}
513 |             </div>
514 |           </div>
515 | 
516 |           {/* Resident Training Feedback */}
517 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
518 |             <h3 className="mb-4 text-xl font-bold">Resident Training Feedback</h3>
519 |             <div className="space-y-3">
520 |               {aiResults.residentFeedback.map((feedback, index) => (
521 |                 <div
522 |                   key={index}
523 |                   className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
524 |                 >
525 |                   <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
526 |                   <p className="text-sm text-white/70">{feedback}</p>
527 |                 </div>
528 |               ))}
529 |             </div>
530 |           </div>
531 | 
532 |           {/* Recommendations */}
533 |           <div className="rounded-3xl border border-violet-400/20 bg-violet-400/5 p-6">
534 |             <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
535 |               <TrendingUp className="h-5 w-5 text-violet-300" />
536 |               Recommendations
537 |             </h3>
538 |             <div className="space-y-3">
539 |               {aiResults.recommendations.map((recommendation, index) => (
540 |                 <div
541 |                   key={index}
542 |                   className="flex gap-3 rounded-2xl border border-violet-400/20 bg-black/25 p-4"
543 |                 >
544 |                   <TrendingUp className="h-5 w-5 shrink-0 text-violet-300" />
545 |                   <p className="text-sm text-white/70">{recommendation}</p>
546 |                 </div>
547 |               ))}
548 |             </div>
549 |           </div>
550 |         </div>
551 |       )}
552 | 
553 |       {/* Error State */}
554 |       {status === "error" && (
555 |         <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-6 animate-fade-in">
556 |           <div className="mb-4 flex items-center gap-3">
557 |             <AlertTriangle className="h-6 w-6 text-red-300" />
558 |             <div>
559 |               <p className="font-bold text-red-200">Upload Error</p>
560 |               <p className="text-sm text-white/60">Please select a valid video file (MP4, MOV, or WEBM)</p>
561 |             </div>
562 |           </div>
563 |           <button onClick={reset} className="btn-secondary">
564 |             Try Again
565 |           </button>
566 |         </div>
567 |       )}
568 |     </div>
569 |   );
570 | }
571 | 
572 | // Made with Bob
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
..\..\Downloads\bob_task_may-15-2026_4-16-11-pm.md

# VSCode Open Tabs
.env,docs/hackathon-readiness-analysis.md,docs/ui-redesign-plan.md,.env.example,postcss.config.mjs,README.md,app/lib/brightData.ts,app/components/AgentTrace.tsx,app/live-surgery/page.tsx,app/ai-insights/page.tsx,app/bob-evidence/page.tsx,app/settings/page.tsx,docs/multi-page-app-guide.md,app/components/LiveSurgery.tsx,app/types/analysis.ts,app/lib/mockData.ts,app/components/Sidebar.tsx,app/resident-training/page.tsx,app/styles/globals.css,app/components/ScoreCard.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T19:54:55.394Z
User time zone: America/Buenos_Aires, UTC-3:00

# Current Cost
$0.01

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll add a "Use Demo Video" button to the VideoUpload component. Let me create a comprehensive solution that handles loading the demo video, showing it in the preview player, and allowing the same analysis flow.

<apply_diff>
<path>app/components/VideoUpload.tsx</path>
<diff>
<<<<<<< SEARCH
:start_line:1
-------
"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Video, CheckCircle2, AlertTriangle, Loader2, X, FileVideo, TrendingUp, Play } from "lucide-react";
=======
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Video, CheckCircle2, AlertTriangle, Loader2, X, FileVideo, TrendingUp, Play, Film } from "lucide-react";
>>>>>>> REPLACE
</diff>
</apply_diff>

<apply_diff>
<path>app/components/VideoUpload.tsx</path>
<diff>
<<<<<<< SEARCH
:start_line:63
-------
export function VideoUpload({ onAnalysisComplete }: VideoUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
=======
export function VideoUpload({ onAnalysisComplete }: VideoUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [demoVideoExists, setDemoVideoExists] = useState<boolean | null>(null);
  const [isDemoVideo, setIsDemoVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if demo video exists
  useEffect(() => {
    const checkDemoVideo = async () => {
      try {
        const response = await fetch('/demo-surgery.mp4', { method: 'HEAD' });
        setDemoVideoExists(response.ok);
      } catch {
        setDemoVideoExists(false);
      }
    };
    checkDemoVideo();
  }, []);
>>>>>>> REPLACE
</diff>
</apply_diff>

<apply_diff>
<path>app/components/VideoUpload.tsx</path>
<diff>
<<<<<<< SEARCH
:start_line:185
-------
  const processFile = (file: File) => {
    // Validate file type - only accept video files
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
      setStatus("error");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    const videoFileData: VideoFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl
    };

    setVideoFile(videoFileData);
    setStatus("selected");
    setProgress(0);
    setAiResults(null);
  };
=======
  const processFile = (file: File, isDemo = false) => {
    // Validate file type - only accept video files
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
      setStatus("error");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    const videoFileData: VideoFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl
    };

    setVideoFile(videoFileData);
    setIsDemoVideo(isDemo);
    setStatus("selected");
    setProgress(0);
    setAiResults(null);
  };

  const loadDemoVideo = async () => {
    try {
      const response = await fetch('/demo-surgery.mp4');
      if (!response.ok) {
        throw new Error('Demo video not found');
      }
      
      const blob = await response.blob();
      const file = new File([blob], 'demo-surgery.mp4', { type: 'video/mp4' });
      processFile(file, true);
    } catch (error) {
      console.error('Failed to load demo video:', error);
      setStatus("error");
    }
  };
>>>>>>> REPLACE
</diff>
</apply_diff>

<apply_diff>
<path>app/components/VideoUpload.tsx</path>
<diff>
<<<<<<< SEARCH
:start_line:240
-------
  const reset = () => {
    if (videoFile?.previewUrl) {
      URL.revokeObjectURL(videoFile.previewUrl);
    }
    setStatus("idle");
    setVideoFile(null);
    setProgress(0);
    setAiResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
=======
  const reset = () => {
    if (videoFile?.previewUrl) {
      URL.revokeObjectURL(videoFile.previewUrl);
    }
    setStatus("idle");
    setVideoFile(null);
    setIsDemoVideo(false);
    setProgress(0);
    setAiResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
>>>>>>> REPLACE
</diff>
</apply_diff>

<apply_diff>
<path>app/components/VideoUpload.tsx</path>
<diff>
<<<<<<< SEARCH
:start_line:259
-------
  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {status === "idle" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-500 overflow-hidden ${
            isDragging
              ? "border-cyan-300 bg-cyan-300/10 scale-[1.03] shadow-2xl"
              : "border-white/20 bg-black/25 hover:border-cyan-300/50 hover:bg-black/30 hover:scale-[1.01]"
          }`}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          
          <div className="relative z-10">
            <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm transition-all duration-500 ${isDragging ? 'scale-110 rotate-12' : 'group-hover:scale-110'}`}>
              <Video className={`h-10 w-10 text-cyan-300 transition-all duration-500 ${isDragging ? 'animate-bounce-subtle' : 'group-hover:animate-pulse-glow'}`} />
            </div>
            <h3 className="mb-3 text-2xl font-black text-gradient-animate">Upload Surgery Video</h3>
            <p className="mb-6 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              Drag and drop a video file here, or click to browse
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary inline-flex items-center gap-3 text-base px-8 py-4 shadow-2xl hover:shadow-cyan-500/50"
            >
              <Upload className="h-5 w-5" /> Select Video File
            </button>
            <p className="mt-6 text-xs text-white/50 font-medium">
              Supported formats: MP4, MOV, WEBM
            </p>
            <p className="mt-2 text-xs text-white/40 font-medium">
              Demo uses mock AI processing. No actual video analysis performed.
            </p>
          </div>
        </div>
      )}
=======
  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {status === "idle" && (
        <div className="space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-500 overflow-hidden ${
              isDragging
                ? "border-cyan-300 bg-cyan-300/10 scale-[1.03] shadow-2xl"
                : "border-white/20 bg-black/25 hover:border-cyan-300/50 hover:bg-black/30 hover:scale-[1.01]"
            }`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            
            <div className="relative z-10">
              <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm transition-all duration-500 ${isDragging ? 'scale-110 rotate-12' : 'group-hover:scale-110'}`}>
                <Video className={`h-10 w-10 text-cyan-300 transition-all duration-500 ${isDragging ? 'animate-bounce-subtle' : 'group-hover:animate-pulse-glow'}`} />
              </div>
              <h3 className="mb-3 text-2xl font-black text-gradient-animate">Upload Surgery Video</h3>
              <p className="mb-6 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                Drag and drop a video file here, or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary inline-flex items-center gap-3 text-base px-8 py-4 shadow-2xl hover:shadow-cyan-500/50"
              >
                <Upload className="h-5 w-5" /> Select Video File
              </button>
              <p className="mt-6 text-xs text-white/50 font-medium">
                Supported formats: MP4, MOV, WEBM
              </p>
              <p className="mt-2 text-xs text-white/40 font-medium">
                Demo uses mock AI processing. No actual video analysis performed.
              </p>
            </div>
          </div>

          {/* Demo Video Button */}
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-premium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-300/20 to-purple-300/20">
                  <Film className="h-6 w-6 text-violet-300" />
                </div>
                <div>
                  <p className="font-bold text-white">Try Demo Video</p>
                  <p className="text-sm text-white/60">Load a sample surgery video for testing</p>
                </div>
              </div>
              {demoVideoExists === null ? (
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking...
                </div>
              ) : demoVideoExists ? (
                <button
                  onClick={loadDemoVideo}
                  className="btn-secondary inline-flex items-center gap-2 px-6 py-3"
                >
                  <Film className="h-4 w-4" /> Use Demo Video
                </button>
              ) : (
                <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-2">
                  <p className="text-xs text-amber-300 font-medium">Demo video not available</p>
                  <p className="text-xs text-white/50 mt-1">Place demo-surgery.mp4 in /public folder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
>>>>>>> REPLACE
</diff>
</apply_diff>

<apply_diff>
<path>app/components/VideoUpload.tsx</path>
<diff>
<<<<<<< SEARCH
:start_line:310
-------
      {/* Video Selected - Preview and Analyze */}
      {status === "selected" && videoFile && (
        <div className="space-y-4 animate-scale-in-bounce">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-premium shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Video Ready for Analysis</h3>
              <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
=======
      {/* Video Selected - Preview and Analyze */}
      {status === "selected" && videoFile && (
        <div className="space-y-4 animate-scale-in-bounce">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-premium shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold">Video Ready for Analysis</h3>
                {isDemoVideo && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-400/10 border border-violet-400/20 px-3 py-1 text-xs font-semibold text-violet-300">
                    <Film className="h-3 w-3" /> Demo Video
                  </span>
                )}
              </div>
              <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
>>>>>>> REPLACE
</diff>
</apply_diff>

Now let me create a placeholder demo video message in the README to guide users:

<read_file>
<args>
<file>
<path>README.md</path>
</file>
</args>
</read_file>

---

**User:**

[apply_diff for 'app/components/VideoUpload.tsx'] Result:
<file_write_result>
<path>app/components/VideoUpload.tsx</path>
<operation>modified</operation>
<notice>
<i>You do not need to re-read the file, as you have seen all changes</i>
<i>Proceed with the task using these changes as the new baseline.</i>
</notice>
</file_write_result>

<notice>Making multiple related changes in a single apply_diff is more efficient. If other changes are needed in this file, please include them as additional SEARCH/REPLACE blocks.</notice>
Tool [apply_diff] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
Tool [apply_diff] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
Tool [apply_diff] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
Tool [apply_diff] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
Tool [apply_diff] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
Tool [read_file] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
<environment_details>
# VSCode Visible Files
app\components\VideoUpload.tsx

# VSCode Open Tabs
.env,docs/hackathon-readiness-analysis.md,docs/ui-redesign-plan.md,.env.example,postcss.config.mjs,README.md,app/lib/brightData.ts,app/components/AgentTrace.tsx,app/live-surgery/page.tsx,app/ai-insights/page.tsx,app/bob-evidence/page.tsx,app/settings/page.tsx,docs/multi-page-app-guide.md,app/components/LiveSurgery.tsx,app/types/analysis.ts,app/lib/mockData.ts,app/components/Sidebar.tsx,app/resident-training/page.tsx,app/styles/globals.css,app/components/ScoreCard.tsx

# Recently Modified Files
These files have been modified since you last accessed them (file was just edited so you may need to re-read it before editing):
app/components/VideoUpload.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T20:10:30.176Z
User time zone: America/Buenos_Aires, UTC-3:00

# Current Cost
$0.05

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I see the file was modified but I need to re-read it to see the current state and continue with the remaining changes.

<read_file>
<args>
<file>
<path>app/components/VideoUpload.tsx</path>
</file>
</args>
</read_file>

---

**User:**

[read_file for 'app/components/VideoUpload.tsx'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>app/components/VideoUpload.tsx</path>
<content lines="1-572">
  1 | "use client";
  2 | 
  3 | import { useState, useRef, useCallback, useEffect } from "react";
  4 | import { Upload, Video, CheckCircle2, AlertTriangle, Loader2, X, FileVideo, TrendingUp, Play, Film } from "lucide-react";
  5 | 
  6 | type UploadStatus = "idle" | "selected" | "analyzing" | "complete" | "error";
  7 | 
  8 | interface VideoFile {
  9 |   file: File;
 10 |   name: string;
 11 |   size: number;
 12 |   type: string;
 13 |   previewUrl: string;
 14 | }
 15 | 
 16 | interface AIResults {
 17 |   procedure: string;
 18 |   phases: Array<{
 19 |     name: string;
 20 |     timestamp: string;
 21 |     confidence: number;
 22 |   }>;
 23 |   overallConfidence: number;
 24 |   riskScore: number;
 25 |   riskAlerts: string[];
 26 |   detectedEvents: string[];
 27 |   residentFeedback: string[];
 28 |   recommendations: string[];
 29 |   fileName?: string;
 30 | }
 31 | 
 32 | // Mock procedure types for random generation
 33 | const procedureTypes = [
 34 |   "Cataract Surgery - Phacoemulsification",
 35 |   "Vitrectomy - Retinal Detachment Repair",
 36 |   "Trabeculectomy - Glaucoma Surgery",
 37 |   "Corneal Transplant - DSAEK",
 38 |   "Pterygium Excision with Graft"
 39 | ];
 40 | 
 41 | const phasesByProcedure: Record<string, string[]> = {
 42 |   "Cataract Surgery - Phacoemulsification": [
 43 |     "Incision", "Capsulorhexis", "Hydrodissection", "Phacoemulsification", "IOL Implantation", "Closure"
 44 |   ],
 45 |   "Vitrectomy - Retinal Detachment Repair": [
 46 |     "Port Placement", "Core Vitrectomy", "Peripheral Vitrectomy", "Membrane Peeling", "Laser Photocoagulation", "Tamponade"
 47 |   ],
 48 |   "Trabeculectomy - Glaucoma Surgery": [
 49 |     "Conjunctival Flap", "Scleral Flap", "Trabeculectomy", "Iridectomy", "Flap Closure", "Conjunctival Closure"
 50 |   ],
 51 |   "Corneal Transplant - DSAEK": [
 52 |     "Recipient Preparation", "Descemetorhexis", "Donor Preparation", "Graft Insertion", "Graft Positioning", "Closure"
 53 |   ],
 54 |   "Pterygium Excision with Graft": [
 55 |     "Pterygium Excision", "Scleral Bed Preparation", "Graft Harvesting", "Graft Placement", "Suturing", "Final Check"
 56 |   ]
 57 | };
 58 | 
 59 | interface VideoUploadProps {
 60 |   onAnalysisComplete?: (results: AIResults) => void;
 61 | }
 62 | 
 63 | export function VideoUpload({ onAnalysisComplete }: VideoUploadProps) {
 64 |   const [status, setStatus] = useState<UploadStatus>("idle");
 65 |   const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
 66 |   const [progress, setProgress] = useState(0);
 67 |   const [aiResults, setAiResults] = useState<AIResults | null>(null);
 68 |   const [isDragging, setIsDragging] = useState(false);
 69 |   const fileInputRef = useRef<HTMLInputElement>(null);
 70 | 
 71 |   const generateMockAIResults = (fileName: string): AIResults => {
 72 |     // Randomly select a procedure type
 73 |     const procedure = procedureTypes[Math.floor(Math.random() * procedureTypes.length)];
 74 |     const phases = phasesByProcedure[procedure];
 75 |     
 76 |     // Generate phases with timestamps
 77 |     let currentTime = 0;
 78 |     const generatedPhases = phases.map((phaseName) => {
 79 |       const duration = Math.floor(Math.random() * 180) + 60; // 60-240 seconds
 80 |       const startTime = currentTime;
 81 |       currentTime += duration;
 82 |       
 83 |       const formatTime = (seconds: number) => {
 84 |         const mins = Math.floor(seconds / 60);
 85 |         const secs = seconds % 60;
 86 |         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
 87 |       };
 88 |       
 89 |       return {
 90 |         name: phaseName,
 91 |         timestamp: `${formatTime(startTime)} - ${formatTime(currentTime)}`,
 92 |         confidence: Math.floor(Math.random() * 10) + 90 // 90-99%
 93 |       };
 94 |     });
 95 | 
 96 |     const overallConfidence = Math.floor(
 97 |       generatedPhases.reduce((sum, p) => sum + p.confidence, 0) / generatedPhases.length * 10
 98 |     ) / 10;
 99 | 
100 |     const riskScore = Math.floor(Math.random() * 30) + 10; // 10-40 risk score
101 | 
102 |     const allRiskAlerts = [
103 |       "Posterior capsule tension detected at 08:32 - resolved safely",
104 |       "Zonular stress indicators at 06:15 - monitored, no intervention needed",
105 |       "Slight corneal edema observed at 12:45 - within normal limits",
106 |       "Iris prolapse risk detected at 04:20 - successfully managed",
107 |       "Elevated IOP during procedure - normalized post-op"
108 |     ];
109 | 
110 |     const allEvents = [
111 |       "Excellent visualization maintained throughout procedure",
112 |       "Smooth instrument transitions observed",
113 |       "Optimal power settings applied consistently",
114 |       "Efficient technique demonstrated",
115 |       "Precise positioning achieved",
116 |       "Minimal tissue trauma observed",
117 |       "Good chamber stability maintained"
118 |     ];
119 | 
120 |     const allFeedback = [
121 |       "Excellent surgical technique with consistent precision",
122 |       "Optimal instrument handling and control demonstrated",
123 |       "Consider slightly slower pace for teaching clarity",
124 |       "Strong understanding of anatomical landmarks shown",
125 |       "Efficient time management throughout procedure",
126 |       "Good communication with surgical team observed",
127 |       "Appropriate response to intraoperative challenges",
128 |       "Overall procedure demonstrates strong technical competency"
129 |     ];
130 | 
131 |     const allRecommendations = [
132 |       "Continue current technique - showing excellent results",
133 |       "Consider documenting this case for teaching purposes",
134 |       "Review advanced techniques for complex cases",
135 |       "Maintain current safety protocols",
136 |       "Share insights with resident training program",
137 |       "Consider peer review for continuous improvement"
138 |     ];
139 | 
140 |     // Randomly select 2-3 items from each array
141 |     const selectRandom = (arr: string[], count: number) => {
142 |       const shuffled = [...arr].sort(() => 0.5 - Math.random());
143 |       return shuffled.slice(0, count);
144 |     };
145 | 
146 |     return {
147 |       procedure,
148 |       phases: generatedPhases,
149 |       overallConfidence,
150 |       riskScore,
151 |       riskAlerts: selectRandom(allRiskAlerts, Math.floor(Math.random() * 2) + 2),
152 |       detectedEvents: selectRandom(allEvents, Math.floor(Math.random() * 3) + 3),
153 |       residentFeedback: selectRandom(allFeedback, Math.floor(Math.random() * 3) + 4),
154 |       recommendations: selectRandom(allRecommendations, Math.floor(Math.random() * 2) + 3)
155 |     };
156 |   };
157 | 
158 |   const handleDragOver = useCallback((e: React.DragEvent) => {
159 |     e.preventDefault();
160 |     setIsDragging(true);
161 |   }, []);
162 | 
163 |   const handleDragLeave = useCallback((e: React.DragEvent) => {
164 |     e.preventDefault();
165 |     setIsDragging(false);
166 |   }, []);
167 | 
168 |   const handleDrop = useCallback((e: React.DragEvent) => {
169 |     e.preventDefault();
170 |     setIsDragging(false);
171 |     
172 |     const files = e.dataTransfer.files;
173 |     if (files.length > 0) {
174 |       processFile(files[0]);
175 |     }
176 |   }, []);
177 | 
178 |   const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
179 |     const files = e.target.files;
180 |     if (files && files.length > 0) {
181 |       processFile(files[0]);
182 |     }
183 |   }, []);
184 | 
185 |   const processFile = (file: File) => {
186 |     // Validate file type - only accept video files
187 |     const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
188 |     if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
189 |       setStatus("error");
190 |       return;
191 |     }
192 | 
193 |     // Create preview URL
194 |     const previewUrl = URL.createObjectURL(file);
195 | 
196 |     const videoFileData: VideoFile = {
197 |       file,
198 |       name: file.name,
199 |       size: file.size,
200 |       type: file.type,
201 |       previewUrl
202 |     };
203 | 
204 |     setVideoFile(videoFileData);
205 |     setStatus("selected");
206 |     setProgress(0);
207 |     setAiResults(null);
208 |   };
209 | 
210 |   const startAnalysis = () => {
211 |     if (!videoFile) return;
212 | 
213 |     setStatus("analyzing");
214 |     setProgress(0);
215 |     
216 |     // Simulate AI analysis progress
217 |     const analysisInterval = setInterval(() => {
218 |       setProgress((prev) => {
219 |         if (prev >= 100) {
220 |           clearInterval(analysisInterval);
221 |           const results = generateMockAIResults(videoFile.name);
222 |           setStatus("complete");
223 |           setAiResults(results);
224 |           
225 |           // Notify parent component with fileName included
226 |           if (onAnalysisComplete) {
227 |             onAnalysisComplete({
228 |               ...results,
229 |               fileName: videoFile.name
230 |             });
231 |           }
232 |           
233 |           return 100;
234 |         }
235 |         return prev + 2;
236 |       });
237 |     }, 100);
238 |   };
239 | 
240 |   const reset = () => {
241 |     if (videoFile?.previewUrl) {
242 |       URL.revokeObjectURL(videoFile.previewUrl);
243 |     }
244 |     setStatus("idle");
245 |     setVideoFile(null);
246 |     setProgress(0);
247 |     setAiResults(null);
248 |     if (fileInputRef.current) {
249 |       fileInputRef.current.value = "";
250 |     }
251 |   };
252 | 
253 |   const formatFileSize = (bytes: number) => {
254 |     if (bytes < 1024) return bytes + " B";
255 |     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
256 |     return (bytes / (1024 * 1024)).toFixed(1) + " MB";
257 |   };
258 | 
259 |   return (
260 |     <div className="space-y-6">
261 |       {/* Upload Area */}
262 |       {status === "idle" && (
263 |         <div
264 |           onDragOver={handleDragOver}
265 |           onDragLeave={handleDragLeave}
266 |           onDrop={handleDrop}
267 |           className={`group relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-500 overflow-hidden ${
268 |             isDragging
269 |               ? "border-cyan-300 bg-cyan-300/10 scale-[1.03] shadow-2xl"
270 |               : "border-white/20 bg-black/25 hover:border-cyan-300/50 hover:bg-black/30 hover:scale-[1.01]"
271 |           }`}
272 |         >
273 |           {/* Animated background gradient */}
274 |           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
275 |           
276 |           {/* Grid pattern */}
277 |           <div className="absolute inset-0 grid-pattern opacity-30" />
278 |           
279 |           <div className="relative z-10">
280 |             <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm transition-all duration-500 ${isDragging ? 'scale-110 rotate-12' : 'group-hover:scale-110'}`}>
281 |               <Video className={`h-10 w-10 text-cyan-300 transition-all duration-500 ${isDragging ? 'animate-bounce-subtle' : 'group-hover:animate-pulse-glow'}`} />
282 |             </div>
283 |             <h3 className="mb-3 text-2xl font-black text-gradient-animate">Upload Surgery Video</h3>
284 |             <p className="mb-6 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
285 |               Drag and drop a video file here, or click to browse
286 |             </p>
287 |             <input
288 |               ref={fileInputRef}
289 |               type="file"
290 |               accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
291 |               onChange={handleFileSelect}
292 |               className="hidden"
293 |             />
294 |             <button
295 |               onClick={() => fileInputRef.current?.click()}
296 |               className="btn-primary inline-flex items-center gap-3 text-base px-8 py-4 shadow-2xl hover:shadow-cyan-500/50"
297 |             >
298 |               <Upload className="h-5 w-5" /> Select Video File
299 |             </button>
300 |             <p className="mt-6 text-xs text-white/50 font-medium">
301 |               Supported formats: MP4, MOV, WEBM
302 |             </p>
303 |             <p className="mt-2 text-xs text-white/40 font-medium">
304 |               Demo uses mock AI processing. No actual video analysis performed.
305 |             </p>
306 |           </div>
307 |         </div>
308 |       )}
309 | 
310 |       {/* Video Selected - Preview and Analyze */}
311 |       {status === "selected" && videoFile && (
312 |         <div className="space-y-4 animate-scale-in-bounce">
313 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-premium shadow-2xl">
314 |             <div className="mb-4 flex items-center justify-between">
315 |               <h3 className="text-xl font-bold">Video Ready for Analysis</h3>
316 |               <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
317 |                 <X className="h-4 w-4" /> Cancel
318 |               </button>
319 |             </div>
320 | 
321 |             {/* Video Preview */}
322 |             <div className="mb-4 rounded-2xl overflow-hidden bg-black/50 border border-white/10">
323 |               <video
324 |                 src={videoFile.previewUrl}
325 |                 controls
326 |                 className="w-full max-h-96 object-contain"
327 |               >
328 |                 Your browser does not support the video tag.
329 |               </video>
330 |             </div>
331 | 
332 |             {/* File Info */}
333 |             <div className="mb-6 grid gap-3 sm:grid-cols-3">
334 |               <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
335 |                 <p className="text-xs text-white/50 mb-1">File Name</p>
336 |                 <p className="font-semibold text-sm truncate">{videoFile.name}</p>
337 |               </div>
338 |               <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
339 |                 <p className="text-xs text-white/50 mb-1">File Size</p>
340 |                 <p className="font-semibold text-sm">{formatFileSize(videoFile.size)}</p>
341 |               </div>
342 |               <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
343 |                 <p className="text-xs text-white/50 mb-1">Format</p>
344 |                 <p className="font-semibold text-sm uppercase">{videoFile.type.split('/')[1] || 'VIDEO'}</p>
345 |               </div>
346 |             </div>
347 | 
348 |             {/* Analyze Button */}
349 |             <button
350 |               onClick={startAnalysis}
351 |               className="btn-primary w-full inline-flex items-center justify-center gap-3 text-lg py-4"
352 |             >
353 |               <Play className="h-5 w-5" /> Analyze Video with AI
354 |             </button>
355 |           </div>
356 |         </div>
357 |       )}
358 | 
359 |       {/* Analysis Progress */}
360 |       {status === "analyzing" && videoFile && (
361 |         <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-cyan-300/10 to-purple-300/10 p-7 animate-scale-in-bounce backdrop-blur-premium shadow-2xl relative overflow-hidden">
362 |           {/* Animated glow effect */}
363 |           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse-glow-strong" />
364 |           
365 |           <div className="relative z-10">
366 |             <div className="mb-5 flex items-center justify-between">
367 |               <div className="flex items-center gap-4">
368 |                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm shadow-lg">
369 |                   <Loader2 className="h-7 w-7 animate-spin text-cyan-300 drop-shadow-glow" />
370 |                 </div>
371 |                 <div>
372 |                   <p className="font-black text-lg text-gradient">AI Processing</p>
373 |                   <p className="text-sm text-white/70 font-medium">Analyzing surgical phases and techniques</p>
374 |                 </div>
375 |               </div>
376 |             </div>
377 |             <div className="progress-bar mb-3">
378 |               <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
379 |             </div>
380 |             <p className="mb-5 text-sm text-white/70 font-semibold">Processing... {progress}%</p>
381 |             <div className="space-y-3 text-sm">
382 |               {progress > 20 && (
383 |                 <p className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300 hover:bg-emerald-500/15 animate-fade-in">
384 |                   <CheckCircle2 className="h-5 w-5 text-emerald-300 animate-scale-in" />
385 |                   <span className="text-white/80 font-medium">Phase detection complete</span>
386 |                 </p>
387 |               )}
388 |               {progress > 50 && (
389 |                 <p className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300 hover:bg-emerald-500/15 animate-fade-in">
390 |                   <CheckCircle2 className="h-5 w-5 text-emerald-300 animate-scale-in" />
391 |                   <span className="text-white/80 font-medium">Risk analysis complete</span>
392 |                 </p>
393 |               )}
394 |               {progress > 75 && (
395 |                 <p className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 transition-all duration-300 hover:bg-cyan-500/15 animate-fade-in">
396 |                   <Loader2 className="h-5 w-5 animate-spin text-cyan-300" />
397 |                   <span className="text-white/80 font-medium">Generating feedback...</span>
398 |                 </p>
399 |               )}
400 |             </div>
401 |           </div>
402 |         </div>
403 |       )}
404 | 
405 |       {/* Complete - AI Results */}
406 |       {status === "complete" && aiResults && videoFile && (
407 |         <div className="space-y-4 animate-fade-in">
408 |           {/* Header */}
409 |           <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">
410 |             <div className="mb-4 flex items-center justify-between">
411 |               <div className="flex items-center gap-3">
412 |                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10">
413 |                   <CheckCircle2 className="h-6 w-6 text-emerald-300" />
414 |                 </div>
415 |                 <div>
416 |                   <p className="font-bold">Analysis Complete</p>
417 |                   <p className="text-sm text-white/60">{videoFile.name}</p>
418 |                 </div>
419 |               </div>
420 |               <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
421 |                 <X className="h-4 w-4" /> Clear
422 |               </button>
423 |             </div>
424 |           </div>
425 | 
426 |           {/* Detected Procedure */}
427 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
428 |             <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
429 |               <Video className="h-5 w-5 text-cyan-300" />
430 |               Detected Procedure
431 |             </h3>
432 |             <p className="text-2xl font-black text-cyan-200">{aiResults.procedure}</p>
433 |             <div className="mt-4 grid grid-cols-2 gap-4">
434 |               <div className="flex items-center gap-2">
435 |                 <TrendingUp className="h-5 w-5 text-emerald-300" />
436 |                 <div>
437 |                   <span className="text-xs text-white/50 block">AI Confidence</span>
438 |                   <span className="text-xl font-bold text-emerald-300">{aiResults.overallConfidence}%</span>
439 |                 </div>
440 |               </div>
441 |               <div className="flex items-center gap-2">
442 |                 <AlertTriangle className="h-5 w-5 text-amber-300" />
443 |                 <div>
444 |                   <span className="text-xs text-white/50 block">Risk Score</span>
445 |                   <span className="text-xl font-bold text-amber-300">{aiResults.riskScore}</span>
446 |                 </div>
447 |               </div>
448 |             </div>
449 |           </div>
450 | 
451 |           {/* Surgical Phases */}
452 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
453 |             <h3 className="mb-4 text-xl font-bold">Detected Surgical Phases</h3>
454 |             <div className="space-y-3">
455 |               {aiResults.phases.map((phase, index) => (
456 |                 <div
457 |                   key={index}
458 |                   className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4 transition-all hover:bg-white/5"
459 |                 >
460 |                   <div className="flex items-center gap-3">
461 |                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-black text-cyan-200">
462 |                       {index + 1}
463 |                     </div>
464 |                     <div>
465 |                       <p className="font-bold">{phase.name}</p>
466 |                       <p className="text-sm text-white/50">{phase.timestamp}</p>
467 |                     </div>
468 |                   </div>
469 |                   <div className="text-right">
470 |                     <p className="text-2xl font-bold text-cyan-200">{phase.confidence}%</p>
471 |                     <p className="text-xs text-white/40">Confidence</p>
472 |                   </div>
473 |                 </div>
474 |               ))}
475 |             </div>
476 |           </div>
477 | 
478 |           {/* Risk Alerts */}
479 |           <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6">
480 |             <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
481 |               <AlertTriangle className="h-5 w-5 text-amber-300" />
482 |               Risk Alerts
483 |             </h3>
484 |             <div className="space-y-3">
485 |               {aiResults.riskAlerts.map((alert, index) => (
486 |                 <div
487 |                   key={index}
488 |                   className="flex gap-3 rounded-2xl border border-amber-400/20 bg-black/25 p-4"
489 |                 >
490 |                   <AlertTriangle className="h-5 w-5 shrink-0 text-amber-300" />
491 |                   <p className="text-sm text-white/70">{alert}</p>
492 |                 </div>
493 |               ))}
494 |             </div>
495 |           </div>
496 | 
497 |           {/* Detected Events */}
498 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
499 |             <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
500 |               <CheckCircle2 className="h-5 w-5 text-emerald-300" />
501 |               Detected Events
502 |             </h3>
503 |             <div className="space-y-3">
504 |               {aiResults.detectedEvents.map((event, index) => (
505 |                 <div
506 |                   key={index}
507 |                   className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
508 |                 >
509 |                   <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
510 |                   <p className="text-sm text-white/70">{event}</p>
511 |                 </div>
512 |               ))}
513 |             </div>
514 |           </div>
515 | 
516 |           {/* Resident Training Feedback */}
517 |           <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
518 |             <h3 className="mb-4 text-xl font-bold">Resident Training Feedback</h3>
519 |             <div className="space-y-3">
520 |               {aiResults.residentFeedback.map((feedback, index) => (
521 |                 <div
522 |                   key={index}
523 |                   className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
524 |                 >
525 |                   <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
526 |                   <p className="text-sm text-white/70">{feedback}</p>
527 |                 </div>
528 |               ))}
529 |             </div>
530 |           </div>
531 | 
532 |           {/* Recommendations */}
533 |           <div className="rounded-3xl border border-violet-400/20 bg-violet-400/5 p-6">
534 |             <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
535 |               <TrendingUp className="h-5 w-5 text-violet-300" />
536 |               Recommendations
537 |             </h3>
538 |             <div className="space-y-3">
539 |               {aiResults.recommendations.map((recommendation, index) => (
540 |                 <div
541 |                   key={index}
542 |                   className="flex gap-3 rounded-2xl border border-violet-400/20 bg-black/25 p-4"
543 |                 >
544 |                   <TrendingUp className="h-5 w-5 shrink-0 text-violet-300" />
545 |                   <p className="text-sm text-white/70">{recommendation}</p>
546 |                 </div>
547 |               ))}
548 |             </div>
549 |           </div>
550 |         </div>
551 |       )}
552 | 
553 |       {/* Error State */}
554 |       {status === "error" && (
555 |         <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-6 animate-fade-in">
556 |           <div className="mb-4 flex items-center gap-3">
557 |             <AlertTriangle className="h-6 w-6 text-red-300" />
558 |             <div>
559 |               <p className="font-bold text-red-200">Upload Error</p>
560 |               <p className="text-sm text-white/60">Please select a valid video file (MP4, MOV, or WEBM)</p>
561 |             </div>
562 |           </div>
563 |           <button onClick={reset} className="btn-secondary">
564 |             Try Again
565 |           </button>
566 |         </div>
567 |       )}
568 |     </div>
569 |   );
570 | }
571 | 
572 | // Made with Bob
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
app\components\VideoUpload.tsx

# VSCode Open Tabs
.env,docs/hackathon-readiness-analysis.md,docs/ui-redesign-plan.md,.env.example,postcss.config.mjs,README.md,app/lib/brightData.ts,app/components/AgentTrace.tsx,app/live-surgery/page.tsx,app/ai-insights/page.tsx,app/bob-evidence/page.tsx,app/settings/page.tsx,docs/multi-page-app-guide.md,app/components/LiveSurgery.tsx,app/types/analysis.ts,app/lib/mockData.ts,app/components/Sidebar.tsx,app/resident-training/page.tsx,app/styles/globals.css,app/components/ScoreCard.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T20:10:35.889Z
User time zone: America/Buenos_Aires, UTC-3:00

# Current Cost
$0.10

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I see the file wasn't fully updated. Let me apply all the necessary changes in a single comprehensive update:

<apply_diff>
<path>app/components/VideoUpload.tsx</path>
<diff>
<<<<<<< SEARCH
:start_line:63
-------
export function VideoUpload({ onAnalysisComplete }: VideoUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
=======
export function VideoUpload({ onAnalysisComplete }: VideoUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [aiResults, setAiResults] = useState<AIResults | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [demoVideoExists, setDemoVideoExists] = useState<boolean | null>(null);
  const [isDemoVideo, setIsDemoVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if demo video exists
  useEffect(() => {
    const checkDemoVideo = async () => {
      try {
        const response = await fetch('/demo-surgery.mp4', { method: 'HEAD' });
        setDemoVideoExists(response.ok);
      } catch {
        setDemoVideoExists(false);
      }
    };
    checkDemoVideo();
  }, []);
>>>>>>> REPLACE
<<<<<<< SEARCH
:start_line:185
-------
  const processFile = (file: File) => {
    // Validate file type - only accept video files
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
      setStatus("error");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    const videoFileData: VideoFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl
    };

    setVideoFile(videoFileData);
    setStatus("selected");
    setProgress(0);
    setAiResults(null);
  };
=======
  const processFile = (file: File, isDemo = false) => {
    // Validate file type - only accept video files
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
      setStatus("error");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    const videoFileData: VideoFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl
    };

    setVideoFile(videoFileData);
    setIsDemoVideo(isDemo);
    setStatus("selected");
    setProgress(0);
    setAiResults(null);
  };

  const loadDemoVideo = async () => {
    try {
      const response = await fetch('/demo-surgery.mp4');
      if (!response.ok) {
        throw new Error('Demo video not found');
      }
      
      const blob = await response.blob();
      const file = new File([blob], 'demo-surgery.mp4', { type: 'video/mp4' });
      processFile(file, true);
    } catch (error) {
      console.error('Failed to load demo video:', error);
      setStatus("error");
    }
  };
>>>>>>> REPLACE
<<<<<<< SEARCH
:start_line:240
-------
  const reset = () => {
    if (videoFile?.previewUrl) {
      URL.revokeObjectURL(videoFile.previewUrl);
    }
    setStatus("idle");
    setVideoFile(null);
    setProgress(0);
    setAiResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
=======
  const reset = () => {
    if (videoFile?.previewUrl) {
      URL.revokeObjectURL(videoFile.previewUrl);
    }
    setStatus("idle");
    setVideoFile(null);
    setIsDemoVideo(false);
    setProgress(0);
    setAiResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
>>>>>>> REPLACE
<<<<<<< SEARCH
:start_line:259
-------
  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {status === "idle" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-500 overflow-hidden ${
            isDragging
              ? "border-cyan-300 bg-cyan-300/10 scale-[1.03] shadow-2xl"
              : "border-white/20 bg-black/25 hover:border-cyan-300/50 hover:bg-black/30 hover:scale-[1.01]"
          }`}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          
          <div className="relative z-10">
            <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm transition-all duration-500 ${isDragging ? 'scale-110 rotate-12' : 'group-hover:scale-110'}`}>
              <Video className={`h-10 w-10 text-cyan-300 transition-all duration-500 ${isDragging ? 'animate-bounce-subtle' : 'group-hover:animate-pulse-glow'}`} />
            </div>
            <h3 className="mb-3 text-2xl font-black text-gradient-animate">Upload Surgery Video</h3>
            <p className="mb-6 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              Drag and drop a video file here, or click to browse
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary inline-flex items-center gap-3 text-base px-8 py-4 shadow-2xl hover:shadow-cyan-500/50"
            >
              <Upload className="h-5 w-5" /> Select Video File
            </button>
            <p className="mt-6 text-xs text-white/50 font-medium">
              Supported formats: MP4, MOV, WEBM
            </p>
            <p className="mt-2 text-xs text-white/40 font-medium">
              Demo uses mock AI processing. No actual video analysis performed.
            </p>
          </div>
        </div>
      )}
=======
  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {status === "idle" && (
        <div className="space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-500 overflow-hidden ${
              isDragging
                ? "border-cyan-300 bg-cyan-300/10 scale-[1.03] shadow-2xl"
                : "border-white/20 bg-black/25 hover:border-cyan-300/50 hover:bg-black/30 hover:scale-[1.01]"
            }`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-30" />
            
            <div className="relative z-10">
              <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm transition-all duration-500 ${isDragging ? 'scale-110 rotate-12' : 'group-hover:scale-110'}`}>
                <Video className={`h-10 w-10 text-cyan-300 transition-all duration-500 ${isDragging ? 'animate-bounce-subtle' : 'group-hover:animate-pulse-glow'}`} />
              </div>
              <h3 className="mb-3 text-2xl font-black text-gradient-animate">Upload Surgery Video</h3>
              <p className="mb-6 text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                Drag and drop a video file here, or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary inline-flex items-center gap-3 text-base px-8 py-4 shadow-2xl hover:shadow-cyan-500/50"
              >
                <Upload className="h-5 w-5" /> Select Video File
              </button>
              <p className="mt-6 text-xs text-white/50 font-medium">
                Supported formats: MP4, MOV, WEBM
              </p>
              <p className="mt-2 text-xs text-white/40 font-medium">
                Demo uses mock AI processing. No actual video analysis performed.
              </p>
            </div>
          </div>

          {/* Demo Video Button */}
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-premium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-300/20 to-purple-300/20">
                  <Film className="h-6 w-6 text-violet-300" />
                </div>
                <div>
                  <p className="font-bold text-white">Try Demo Video</p>
                  <p className="text-sm text-white/60">Load a sample surgery video for testing</p>
                </div>
              </div>
              {demoVideoExists === null ? (
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking...
                </div>
              ) : demoVideoExists ? (
                <button
                  onClick={loadDemoVideo}
                  className="btn-secondary inline-flex items-center gap-2 px-6 py-3"
                >
                  <Film className="h-4 w-4" /> Use Demo Video
                </button>
              ) : (
                <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-2">
                  <p className="text-xs text-amber-300 font-medium">Demo video not available</p>
                  <p className="text-xs text-white/50 mt-1">Place demo-surgery.mp4 in /public folder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
>>>>>>> REPLACE
<<<<<<< SEARCH
:start_line:310
-------
      {/* Video Selected - Preview and Analyze */}
      {status === "selected" && videoFile && (
        <div className="space-y-4 animate-scale-in-bounce">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-premium shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Video Ready for Analysis</h3>
              <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
=======
      {/* Video Selected - Preview and Analyze */}
      {status === "selected" && videoFile && (
        <div className="space-y-4 animate-scale-in-bounce">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-premium shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold">Video Ready for Analysis</h3>
                {isDemoVideo && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-violet-400/10 border border-violet-400/20 px-3 py-1 text-xs font-semibold text-violet-300">
                    <Film className="h-3 w-3" /> Demo Video
                  </span>
                )}
              </div>
              <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
>>>>>>> REPLACE
</diff>
</apply_diff>

---

**User:**

[apply_diff for 'app/components/VideoUpload.tsx'] Result:
<file_write_result>
<path>app/components/VideoUpload.tsx</path>
<operation>modified</operation>
<notice>
<i>You do not need to re-read the file, as you have seen all changes</i>
<i>Proceed with the task using these changes as the new baseline.</i>
</notice>
</file_write_result>

<environment_details>
# VSCode Visible Files
app\components\VideoUpload.tsx

# VSCode Open Tabs
.env,docs/hackathon-readiness-analysis.md,docs/ui-redesign-plan.md,.env.example,postcss.config.mjs,README.md,app/lib/brightData.ts,app/components/AgentTrace.tsx,app/live-surgery/page.tsx,app/ai-insights/page.tsx,app/bob-evidence/page.tsx,app/settings/page.tsx,docs/multi-page-app-guide.md,app/components/LiveSurgery.tsx,app/types/analysis.ts,app/lib/mockData.ts,app/components/Sidebar.tsx,app/resident-training/page.tsx,app/styles/globals.css,app/components/ScoreCard.tsx

# Recently Modified Files
These files have been modified since you last accessed them (file was just edited so you may need to re-read it before editing):
app/components/VideoUpload.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T20:11:23.164Z
User time zone: America/Buenos_Aires, UTC-3:00

# Current Cost
$0.18

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

Perfect! Now let me update the README to document the demo video feature:

<read_file>
<args>
<file>
<path>README.md</path>
</file>
</args>
</read_file>

---

**User:**

[read_file for 'README.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>README.md</path>
<content lines="1-353">
  1 | # SophieCare Bob Accelerator
  2 | 
  3 | **Turn a complex healthcare AI idea into a demo-ready product faster with IBM Bob.**
  4 | 
  5 | SophieCare Bob Accelerator is a hackathon proof of concept that demonstrates how **IBM Bob** can act as an AI-powered development partner for a real software project. The target product is **SophieCare AI Surgical Co-Pilot**, an ophthalmology training prototype that simulates AI-assisted surgical review, phase analysis, safety-aware feedback, and resident education.
  6 | 
  7 | The submission is intentionally designed around the hackathon challenge: **Turn idea into impact faster.** Instead of showing only a final app, this repository documents how Bob is intended to be used to understand the codebase, generate onboarding documentation, improve maintainability, suggest tests, and accelerate the transformation of an early product idea into a structured, judge-ready prototype.
  8 | 
  9 | > **Important:** This repo is prepared for IBM Bob access. Once credentials are provided, the exported IBM Bob report must be added to `/docs/ibm-bob/exports/` before final submission.
 10 | 
 11 | ---
 12 | 
 13 | ## 🎯 Why this project fits the IBM Bob challenge
 14 | 
 15 | Modern builders lose time on repetitive tasks: understanding existing repositories, documenting decisions, generating tests, explaining architecture, and refactoring code safely. In healthcare software, that friction is even higher because the domain is specialized and new developers need context before contributing.
 16 | 
 17 | This project uses SophieCare as a realistic case study to show how IBM Bob can help developers at any skill level:
 18 | 
 19 | - Understand a complete repository faster
 20 | - Explain architecture and business intent clearly
 21 | - Generate technical documentation and onboarding guides
 22 | - Suggest tests and quality improvements
 23 | - Identify refactoring opportunities
 24 | - Prepare a proof of concept for stakeholders and judges
 25 | 
 26 | ---
 27 | 
 28 | ## 🚀 Live demo concept
 29 | 
 30 | The web app presents an **interactive dashboard** with five key sections:
 31 | 
 32 | 1. **Repository Analysis** - IBM Bob's understanding of the codebase structure
 33 | 2. **Documentation Generation** - Auto-generated docs and improvements
 34 | 3. **Test Suggestions** - Comprehensive test strategy and generated test code
 35 | 4. **Refactoring Roadmap** - Code quality improvements with before/after examples
 36 | 5. **Healthcare AI Demo** - SophieCare surgical intelligence dashboard
 37 | 
 38 | Each section demonstrates how Bob accelerates different aspects of the development workflow.
 39 | 
 40 | The demo uses mocked AI outputs so it runs without paid API keys and is safe to deploy on Vercel.
 41 | 
 42 | ---
 43 | 
 44 | ## 🛠️ Core technologies
 45 | 
 46 | Free or free-tier friendly stack:
 47 | 
 48 | - **IBM Bob** — required AI development partner for repository understanding, documentation, tests, and refactoring workflows
 49 | - **Next.js 15 App Router** — application framework with React Server Components
 50 | - **React 19** — interactive UI with modern hooks
 51 | - **TypeScript 5** — safer application logic with type safety
 52 | - **Tailwind CSS 4** — responsive visual system with custom animations
 53 | - **Zod** — request validation and type-safe schemas
 54 | - **Vercel** — recommended free hosting with zero-config deployment
 55 | 
 56 | AI extension points documented for future versions:
 57 | 
 58 | - **LangChain-style agent workflow**
 59 | - **Hugging Face model integration**
 60 | - **Chroma vector database for RAG**
 61 | - **YOLO-ready computer vision layer**
 62 | - **OpenAI-compatible LLM provider**
 63 | 
 64 | ---
 65 | 
 66 | ## 📁 Repository structure
 67 | 
 68 | ```txt
 69 | app/
 70 |   api/analyze/              Demo API route for the analysis workflow
 71 |   components/               Dashboard and UI components
 72 |     AgentTrace.tsx          Bob agent workflow visualization
 73 |     ResultDashboard.tsx     Main dashboard with 5 sections
 74 |     ScoreCard.tsx           Metric display cards
 75 |   lib/                      Mock data and agent workflow simulation
 76 |     agents.ts               Bob workflow orchestration
 77 |     mockData.ts             Comprehensive demo data
 78 |   styles/
 79 |     globals.css             Custom animations and utilities
 80 |   types/                    TypeScript type definitions
 81 | docs/
 82 |   ibm-bob/                  IBM Bob usage plan, prompts, evidence, exports
 83 |   submission/               Copy/paste fields for lablab.ai submission
 84 |   architecture.md           Technical architecture for judges and developers
 85 |   demo-guide.md             Demo steps for video and live judging
 86 |   deployment-vercel.md      Vercel deployment guide
 87 |   hackathon-readiness-analysis.md  Comprehensive readiness assessment
 88 |   ui-redesign-plan.md       Dashboard UI architecture plan
 89 | public/
 90 |   cover-16x9.jpg            Hackathon cover image
 91 |   sophiecare-logo.png       Project logo
 92 | ```
 93 | 
 94 | ---
 95 | 
 96 | ## 🎨 New Features
 97 | 
 98 | ### Interactive Dashboard
 99 | - **Progressive demo flow** with 5 distinct sections
100 | - **Tab navigation** for easy section switching
101 | - **Progress indicator** showing completion status
102 | - **Smooth animations** and transitions between sections
103 | 
104 | ### Enhanced UX
105 | - **Loading states** with skeleton loaders
106 | - **Error handling** with user-friendly messages
107 | - **Empty states** for better guidance
108 | - **Mobile-responsive** design for all screen sizes
109 | 
110 | ### Visual Polish
111 | - **Custom animations** (fade-in, slide-in, shimmer effects)
112 | - **Card hover effects** for interactive feedback
113 | - **Color-coded metrics** based on score values
114 | - **Professional gradients** and backdrop blur effects
115 | 
116 | ### Accessibility
117 | - **ARIA labels** for screen readers
118 | - **Keyboard navigation** support
119 | - **Focus indicators** for better visibility
120 | - **Semantic HTML** structure
121 | 
122 | ---
123 | 
124 | ## 🚀 Setup
125 | 
126 | ```bash
127 | npm install
128 | cp .env.example .env.local
129 | npm run dev
130 | ```
131 | 
132 | Open:
133 | 
134 | ```txt
135 | http://localhost:3000
136 | ```
137 | 
138 | ---
139 | 
140 | ## ✅ Build check
141 | 
142 | ```bash
143 | npm run typecheck
144 | npm run build
145 | ```
146 | 
147 | ---
148 | 
149 | ## 🔐 Environment variables
150 | 
151 | No paid credentials are required for the demo.
152 | 
153 | ```bash
154 | # Optional AI providers (not needed for demo)
155 | OPENAI_API_KEY=
156 | IBM_WATSONX_API_KEY=
157 | IBM_WATSONX_PROJECT_ID=
158 | IBM_WATSONX_REGION=
159 | HUGGINGFACE_API_TOKEN=
160 | CHROMA_URL=http://localhost:8000
161 | 
162 | # Hackathon evidence
163 | IBM_BOB_REPORT_PATH=docs/ibm-bob/exports/ibm-bob-exported-report.pdf
164 | ```
165 | 
166 | ---
167 | 
168 | ## 📊 IBM Bob integration plan
169 | 
170 | When IBM Bob credentials become available, use Bob on this exact repository and export the official report.
171 | 
172 | Required final evidence:
173 | 
174 | ```txt
175 | docs/ibm-bob/exports/ibm-bob-exported-report.pdf
176 | ```
177 | 
178 | If the export is Markdown or another format, place it in the same folder and update:
179 | 
180 | ```txt
181 | docs/ibm-bob/exports/README.md
182 | ```
183 | 
184 | Recommended Bob sessions are documented in:
185 | 
186 | ```txt
187 | docs/ibm-bob/bob-prompt-playbook.md
188 | docs/ibm-bob/bob-task-plan.md
189 | docs/ibm-bob/bob-session-log-template.md
190 | ```
191 | 
192 | ---
193 | 
194 | ## 📝 Submission materials
195 | 
196 | Prepared submission content is available in:
197 | 
198 | ```txt
199 | docs/submission/submission-fields.md
200 | docs/submission/video-script-5min.md
201 | docs/submission/slide-presentation-outline.md
202 | docs/submission/final-checklist.md
203 | ```
204 | 
205 | ---
206 | 
207 | ## 🎯 Demo Flow
208 | 
209 | 1. **Landing Page** - Value proposition and demo launcher
210 | 2. **Run Analysis** - Click "Run Bob Analysis" button
211 | 3. **Repository Section** - View codebase structure and insights
212 | 4. **Documentation Section** - See generated documentation improvements
213 | 5. **Tests Section** - Review test strategy and generated test code
214 | 6. **Refactor Section** - Explore code quality improvements
215 | 7. **Healthcare Section** - Experience the SophieCare surgical AI demo
216 | 
217 | ---
218 | 
219 | ## 🏗️ Architecture Highlights
220 | 
221 | ### Frontend
222 | - Next.js App Router with React Server Components
223 | - Client-side state management with React hooks
224 | - Tailwind CSS 4 with custom animations
225 | - Responsive design with mobile-first approach
226 | 
227 | ### API Layer
228 | - Type-safe API routes with Zod validation
229 | - Error handling with structured responses
230 | - Mock data for demo purposes
231 | 
232 | ### Component Architecture
233 | - Reusable UI components (MetricCard, CodeBlock, etc.)
234 | - Section-based dashboard layout
235 | - Loading and error states
236 | - Accessibility-first design
237 | 
238 | ---
239 | 
240 | ## 🚢 Deployment
241 | 
242 | ### Vercel (Recommended)
243 | 
244 | 1. Push repository to GitHub
245 | 2. Import project into Vercel
246 | 3. Deploy with default Next.js settings
247 | 4. No environment variables needed for demo
248 | 
249 | See `docs/deployment-vercel.md` for detailed instructions.
250 | 
251 | ---
252 | 
253 | ## 🧪 Testing
254 | 
255 | Currently, the project includes mock data for demonstration purposes. Future versions will include:
256 | 
257 | - Component tests with Vitest/Jest
258 | - API route tests
259 | - Accessibility tests with Testing Library
260 | - E2E tests with Playwright
261 | 
262 | See `docs/hackathon-readiness-analysis.md` for the complete testing strategy.
263 | 
264 | ---
265 | 
266 | ## 🎨 Customization
267 | 
268 | ### Adding New Sections
269 | 
270 | 1. Add section data to `app/lib/mockData.ts`
271 | 2. Create section component in `app/components/ResultDashboard.tsx`
272 | 3. Add tab to navigation in `app/page.tsx`
273 | 4. Update progress indicator logic
274 | 
275 | ### Styling
276 | 
277 | - Global styles: `app/styles/globals.css`
278 | - Tailwind config: `tailwind.config.ts`
279 | - Custom animations defined in globals.css
280 | 
281 | ---
282 | 
283 | ## 🐛 Troubleshooting
284 | 
285 | ### Build fails with Tailwind errors
286 | 
287 | Ensure you're using Tailwind CSS v4 with the correct PostCSS configuration:
288 | 
289 | ```js
290 | // postcss.config.mjs
291 | const config = {
292 |   plugins: {
293 |     '@tailwindcss/postcss': {},
294 |   },
295 | };
296 | ```
297 | 
298 | ### TypeScript errors
299 | 
300 | Run type checking:
301 | 
302 | ```bash
303 | npm run typecheck
304 | ```
305 | 
306 | ### Port already in use
307 | 
308 | Change the port:
309 | 
310 | ```bash
311 | npm run dev -- -p 3001
312 | ```
313 | 
314 | ---
315 | 
316 | ## 📚 Documentation
317 | 
318 | - [Architecture](docs/architecture.md) - Technical architecture overview
319 | - [Demo Guide](docs/demo-guide.md) - How to present the demo
320 | - [Deployment](docs/deployment-vercel.md) - Vercel deployment instructions
321 | - [Readiness Analysis](docs/hackathon-readiness-analysis.md) - Comprehensive assessment
322 | - [UI Redesign Plan](docs/ui-redesign-plan.md) - Dashboard architecture
323 | 
324 | ---
325 | 
326 | ## ⚠️ Medical and responsible AI disclaimer
327 | 
328 | This prototype is for education and hackathon demonstration only. It is not a medical device and must not be used for diagnosis, treatment, or real intraoperative decision-making without clinical validation, regulatory review, and medical supervision.
329 | 
330 | ---
331 | 
332 | ## 📄 License
333 | 
334 | This project is created for the IBM Bob Hackathon. See individual dependencies for their respective licenses.
335 | 
336 | ---
337 | 
338 | ## 🤝 Contributing
339 | 
340 | This is a hackathon project. For questions or suggestions, please open an issue on GitHub.
341 | 
342 | ---
343 | 
344 | ## 🏆 Hackathon Submission
345 | 
346 | **Event:** IBM Bob Hackathon  
347 | **Platform:** lablab.ai  
348 | **Category:** Developer Productivity / AI Development Tools  
349 | **Team:** SophieCare Labs
350 | 
351 | ---
352 | 
353 | **Built with ❤️ using IBM Bob**
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
app\components\VideoUpload.tsx

# VSCode Open Tabs
.env,docs/hackathon-readiness-analysis.md,docs/ui-redesign-plan.md,.env.example,postcss.config.mjs,README.md,app/lib/brightData.ts,app/components/AgentTrace.tsx,app/live-surgery/page.tsx,app/ai-insights/page.tsx,app/bob-evidence/page.tsx,app/settings/page.tsx,docs/multi-page-app-guide.md,app/components/LiveSurgery.tsx,app/types/analysis.ts,app/lib/mockData.ts,app/components/Sidebar.tsx,app/resident-training/page.tsx,app/styles/globals.css,app/components/ScoreCard.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T20:12:09.120Z
User time zone: America/Buenos_Aires, UTC-3:00

# Current Cost
$0.26

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<apply_diff>
<path>README.md</path>
<diff>
<<<<<<< SEARCH
:start_line:123
-------
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
=======
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
>>>>>>> REPLACE
</diff>
</apply_diff>

---

**User:**

[apply_diff for 'README.md'] Result:
<file_write_result>
<path>README.md</path>
<operation>modified</operation>
<notice>
<i>You do not need to re-read the file, as you have seen all changes</i>
<i>Proceed with the task using these changes as the new baseline.</i>
</notice>
</file_write_result>

<notice>Making multiple related changes in a single apply_diff is more efficient. If other changes are needed in this file, please include them as additional SEARCH/REPLACE blocks.</notice>
<environment_details>
# VSCode Visible Files
README.md

# VSCode Open Tabs
.env,docs/hackathon-readiness-analysis.md,docs/ui-redesign-plan.md,.env.example,postcss.config.mjs,app/lib/brightData.ts,app/components/AgentTrace.tsx,app/live-surgery/page.tsx,app/ai-insights/page.tsx,app/bob-evidence/page.tsx,app/settings/page.tsx,docs/multi-page-app-guide.md,app/components/LiveSurgery.tsx,app/types/analysis.ts,app/lib/mockData.ts,app/components/Sidebar.tsx,app/resident-training/page.tsx,app/styles/globals.css,app/components/ScoreCard.tsx,app/components/ResultDashboard.tsx

# Recently Modified Files
These files have been modified since you last accessed them (file was just edited so you may need to re-read it before editing):
README.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-15T20:12:23.419Z
User time zone: America/Buenos_Aires, UTC-3:00

# Current Cost
$0.35

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
Successfully added "Use Demo Video" button to the VideoUpload component with the following features:

✅ **Demo Video Button**
- Added a new section below the upload area with a "Use Demo Video" button
- Button styled with Film icon and secondary button styling
- Automatically checks if `/public/demo-surgery.mp4` exists on component mount

✅ **Smart Detection**
- Shows loading state while checking for demo video
- If demo video exists: displays "Use Demo Video" button
- If demo video doesn't exist: shows clear placeholder message with instructions

✅ **Video Loading**
- Fetches demo video from `/public/demo-surgery.mp4` when button is clicked
- Converts blob to File object for consistent handling
- Shows video in the same preview player as uploaded videos

✅ **Demo Video Badge**
- Added "Demo Video" badge next to title when demo video is loaded
- Styled with violet gradient to distinguish from uploaded videos

✅ **Full Analysis Flow**
- Demo video supports the same simulated AI analysis as uploaded videos
- All phases, risk alerts, and feedback work identically
- Reset button clears demo video state properly

✅ **Documentation**
- Updated README.md with Demo Video Setup section
- Explains how to add demo video file
- Notes that file is not included due to size constraints

**To use the feature:**
1. Place a video file named `demo-surgery.mp4` in the `/public` folder
2. The app will automatically detect it and enable the button
3. Users can click "Use Demo Video" to load it instantly
4. The same analysis workflow applies as with uploaded videos
</result>
</attempt_completion>

