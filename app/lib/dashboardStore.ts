// Simple state management for dashboard updates
// This allows components to update dashboard metrics

interface AnalysisData {
  procedure: string;
  overallConfidence: number;
  timestamp: string;
  fileName: string;
}

class DashboardStore {
  private listeners: Set<() => void> = new Set();
  private analysisCount: number = 47; // Starting value from dashboard
  private totalConfidence: number = 94.2 * 47; // Calculate total from average
  private recentAnalyses: AnalysisData[] = [];

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  addAnalysis(data: Omit<AnalysisData, 'timestamp'>) {
    this.analysisCount++;
    this.totalConfidence += data.overallConfidence;
    
    const analysis: AnalysisData = {
      ...data,
      timestamp: new Date().toISOString()
    };
    
    this.recentAnalyses.unshift(analysis);
    if (this.recentAnalyses.length > 10) {
      this.recentAnalyses.pop();
    }
    
    this.notify();
  }

  getAnalysisCount(): number {
    return this.analysisCount;
  }

  getAverageConfidence(): number {
    if (this.analysisCount === 0) return 0;
    return Math.round((this.totalConfidence / this.analysisCount) * 10) / 10;
  }

  getRecentAnalyses(): AnalysisData[] {
    return this.recentAnalyses;
  }

  reset() {
    this.analysisCount = 47;
    this.totalConfidence = 94.2 * 47;
    this.recentAnalyses = [];
    this.notify();
  }
}

export const dashboardStore = new DashboardStore();

// Made with Bob
