"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Video, CheckCircle2, AlertTriangle, Loader2, X, FileVideo, TrendingUp, Play, Film } from "lucide-react";

type UploadStatus = "idle" | "selected" | "analyzing" | "complete" | "error";

interface VideoFile {
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
}

interface AIResults {
  procedure: string;
  phases: Array<{
    name: string;
    timestamp: string;
    confidence: number;
  }>;
  overallConfidence: number;
  riskScore: number;
  riskAlerts: string[];
  detectedEvents: string[];
  residentFeedback: string[];
  recommendations: string[];
  fileName?: string;
}

// Mock procedure types for random generation
const procedureTypes = [
  "Cataract Surgery - Phacoemulsification",
  "Vitrectomy - Retinal Detachment Repair",
  "Trabeculectomy - Glaucoma Surgery",
  "Corneal Transplant - DSAEK",
  "Pterygium Excision with Graft"
];

const phasesByProcedure: Record<string, string[]> = {
  "Cataract Surgery - Phacoemulsification": [
    "Incision", "Capsulorhexis", "Hydrodissection", "Phacoemulsification", "IOL Implantation", "Closure"
  ],
  "Vitrectomy - Retinal Detachment Repair": [
    "Port Placement", "Core Vitrectomy", "Peripheral Vitrectomy", "Membrane Peeling", "Laser Photocoagulation", "Tamponade"
  ],
  "Trabeculectomy - Glaucoma Surgery": [
    "Conjunctival Flap", "Scleral Flap", "Trabeculectomy", "Iridectomy", "Flap Closure", "Conjunctival Closure"
  ],
  "Corneal Transplant - DSAEK": [
    "Recipient Preparation", "Descemetorhexis", "Donor Preparation", "Graft Insertion", "Graft Positioning", "Closure"
  ],
  "Pterygium Excision with Graft": [
    "Pterygium Excision", "Scleral Bed Preparation", "Graft Harvesting", "Graft Placement", "Suturing", "Final Check"
  ]
};

interface VideoUploadProps {
  onAnalysisComplete?: (results: AIResults) => void;
}

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

  const generateMockAIResults = (fileName: string): AIResults => {
    // Randomly select a procedure type
    const procedure = procedureTypes[Math.floor(Math.random() * procedureTypes.length)];
    const phases = phasesByProcedure[procedure];
    
    // Generate phases with timestamps
    let currentTime = 0;
    const generatedPhases = phases.map((phaseName) => {
      const duration = Math.floor(Math.random() * 180) + 60; // 60-240 seconds
      const startTime = currentTime;
      currentTime += duration;
      
      const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };
      
      return {
        name: phaseName,
        timestamp: `${formatTime(startTime)} - ${formatTime(currentTime)}`,
        confidence: Math.floor(Math.random() * 10) + 90 // 90-99%
      };
    });

    const overallConfidence = Math.floor(
      generatedPhases.reduce((sum, p) => sum + p.confidence, 0) / generatedPhases.length * 10
    ) / 10;

    const riskScore = Math.floor(Math.random() * 30) + 10; // 10-40 risk score

    const allRiskAlerts = [
      "Posterior capsule tension detected at 08:32 - resolved safely",
      "Zonular stress indicators at 06:15 - monitored, no intervention needed",
      "Slight corneal edema observed at 12:45 - within normal limits",
      "Iris prolapse risk detected at 04:20 - successfully managed",
      "Elevated IOP during procedure - normalized post-op"
    ];

    const allEvents = [
      "Excellent visualization maintained throughout procedure",
      "Smooth instrument transitions observed",
      "Optimal power settings applied consistently",
      "Efficient technique demonstrated",
      "Precise positioning achieved",
      "Minimal tissue trauma observed",
      "Good chamber stability maintained"
    ];

    const allFeedback = [
      "Excellent surgical technique with consistent precision",
      "Optimal instrument handling and control demonstrated",
      "Consider slightly slower pace for teaching clarity",
      "Strong understanding of anatomical landmarks shown",
      "Efficient time management throughout procedure",
      "Good communication with surgical team observed",
      "Appropriate response to intraoperative challenges",
      "Overall procedure demonstrates strong technical competency"
    ];

    const allRecommendations = [
      "Continue current technique - showing excellent results",
      "Consider documenting this case for teaching purposes",
      "Review advanced techniques for complex cases",
      "Maintain current safety protocols",
      "Share insights with resident training program",
      "Consider peer review for continuous improvement"
    ];

    // Randomly select 2-3 items from each array
    const selectRandom = (arr: string[], count: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    return {
      procedure,
      phases: generatedPhases,
      overallConfidence,
      riskScore,
      riskAlerts: selectRandom(allRiskAlerts, Math.floor(Math.random() * 2) + 2),
      detectedEvents: selectRandom(allEvents, Math.floor(Math.random() * 3) + 3),
      residentFeedback: selectRandom(allFeedback, Math.floor(Math.random() * 3) + 4),
      recommendations: selectRandom(allRecommendations, Math.floor(Math.random() * 2) + 3)
    };
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);

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

  const startAnalysis = () => {
    if (!videoFile) return;

    setStatus("analyzing");
    setProgress(0);
    
    // Simulate AI analysis progress
    const analysisInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(analysisInterval);
          const results = generateMockAIResults(videoFile.name);
          setStatus("complete");
          setAiResults(results);
          
          // Notify parent component with fileName included
          if (onAnalysisComplete) {
            onAnalysisComplete({
              ...results,
              fileName: videoFile.name
            });
          }
          
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

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

            {/* Video Preview */}
            <div className="mb-4 rounded-2xl overflow-hidden bg-black/50 border border-white/10">
              <video
                src={videoFile.previewUrl}
                controls
                className="w-full max-h-96 object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* File Info */}
            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs text-white/50 mb-1">File Name</p>
                <p className="font-semibold text-sm truncate">{videoFile.name}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs text-white/50 mb-1">File Size</p>
                <p className="font-semibold text-sm">{formatFileSize(videoFile.size)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs text-white/50 mb-1">Format</p>
                <p className="font-semibold text-sm uppercase">{videoFile.type.split('/')[1] || 'VIDEO'}</p>
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={startAnalysis}
              className="btn-primary w-full inline-flex items-center justify-center gap-3 text-lg py-4"
            >
              <Play className="h-5 w-5" /> Analyze Video with AI
            </button>
          </div>
        </div>
      )}

      {/* Analysis Progress */}
      {status === "analyzing" && videoFile && (
        <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-cyan-300/10 to-purple-300/10 p-7 animate-scale-in-bounce backdrop-blur-premium shadow-2xl relative overflow-hidden">
          {/* Animated glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse-glow-strong" />
          
          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/20 to-purple-300/20 backdrop-blur-sm shadow-lg">
                  <Loader2 className="h-7 w-7 animate-spin text-cyan-300 drop-shadow-glow" />
                </div>
                <div>
                  <p className="font-black text-lg text-gradient">AI Processing</p>
                  <p className="text-sm text-white/70 font-medium">Analyzing surgical phases and techniques</p>
                </div>
              </div>
            </div>
            <div className="progress-bar mb-3">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="mb-5 text-sm text-white/70 font-semibold">Processing... {progress}%</p>
            <div className="space-y-3 text-sm">
              {progress > 20 && (
                <p className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300 hover:bg-emerald-500/15 animate-fade-in">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300 animate-scale-in" />
                  <span className="text-white/80 font-medium">Phase detection complete</span>
                </p>
              )}
              {progress > 50 && (
                <p className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 transition-all duration-300 hover:bg-emerald-500/15 animate-fade-in">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300 animate-scale-in" />
                  <span className="text-white/80 font-medium">Risk analysis complete</span>
                </p>
              )}
              {progress > 75 && (
                <p className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 transition-all duration-300 hover:bg-cyan-500/15 animate-fade-in">
                  <Loader2 className="h-5 w-5 animate-spin text-cyan-300" />
                  <span className="text-white/80 font-medium">Generating feedback...</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Complete - AI Results */}
      {status === "complete" && aiResults && videoFile && (
        <div className="space-y-4 animate-fade-in">
          {/* Header */}
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10">
                  <CheckCircle2 className="h-6 w-6 text-emerald-300" />
                </div>
                <div>
                  <p className="font-bold">Analysis Complete</p>
                  <p className="text-sm text-white/60">{videoFile.name}</p>
                </div>
              </div>
              <button onClick={reset} className="btn-secondary inline-flex items-center gap-2">
                <X className="h-4 w-4" /> Clear
              </button>
            </div>
          </div>

          {/* Detected Procedure */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Video className="h-5 w-5 text-cyan-300" />
              Detected Procedure
            </h3>
            <p className="text-2xl font-black text-cyan-200">{aiResults.procedure}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-300" />
                <div>
                  <span className="text-xs text-white/50 block">AI Confidence</span>
                  <span className="text-xl font-bold text-emerald-300">{aiResults.overallConfidence}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-300" />
                <div>
                  <span className="text-xs text-white/50 block">Risk Score</span>
                  <span className="text-xl font-bold text-amber-300">{aiResults.riskScore}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Surgical Phases */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <h3 className="mb-4 text-xl font-bold">Detected Surgical Phases</h3>
            <div className="space-y-3">
              {aiResults.phases.map((phase, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4 transition-all hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-black text-cyan-200">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold">{phase.name}</p>
                      <p className="text-sm text-white/50">{phase.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-cyan-200">{phase.confidence}%</p>
                    <p className="text-xs text-white/40">Confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <AlertTriangle className="h-5 w-5 text-amber-300" />
              Risk Alerts
            </h3>
            <div className="space-y-3">
              {aiResults.riskAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-2xl border border-amber-400/20 bg-black/25 p-4"
                >
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-300" />
                  <p className="text-sm text-white/70">{alert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detected Events */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              Detected Events
            </h3>
            <div className="space-y-3">
              {aiResults.detectedEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                  <p className="text-sm text-white/70">{event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resident Training Feedback */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <h3 className="mb-4 text-xl font-bold">Resident Training Feedback</h3>
            <div className="space-y-3">
              {aiResults.residentFeedback.map((feedback, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
                  <p className="text-sm text-white/70">{feedback}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="rounded-3xl border border-violet-400/20 bg-violet-400/5 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <TrendingUp className="h-5 w-5 text-violet-300" />
              Recommendations
            </h3>
            <div className="space-y-3">
              {aiResults.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-2xl border border-violet-400/20 bg-black/25 p-4"
                >
                  <TrendingUp className="h-5 w-5 shrink-0 text-violet-300" />
                  <p className="text-sm text-white/70">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-6 animate-fade-in">
          <div className="mb-4 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-300" />
            <div>
              <p className="font-bold text-red-200">Upload Error</p>
              <p className="text-sm text-white/60">Please select a valid video file (MP4, MOV, or WEBM)</p>
            </div>
          </div>
          <button onClick={reset} className="btn-secondary">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

// Made with Bob
