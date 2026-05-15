"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  FileVideo,
  GraduationCap,
  BrainCircuit,
  Bot,
  Settings,
  Menu,
  X,
  Eye,
  ChevronRight,
  Users,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview & metrics",
  },
  {
    name: "Patient Cases",
    href: "/patient-cases",
    icon: Users,
    description: "Case management",
  },
  {
    name: "Live Surgery",
    href: "/live-surgery",
    icon: Video,
    description: "Real-time monitoring",
  },
  {
    name: "Video Analysis",
    href: "/video-analysis",
    icon: FileVideo,
    description: "Upload & analyze",
  },
  {
    name: "Resident Training",
    href: "/resident-training",
    icon: GraduationCap,
    description: "Education mode",
  },
  {
    name: "AI Insights",
    href: "/ai-insights",
    icon: BrainCircuit,
    description: "Intelligence reports",
  },
  {
    name: "IBM Bob Evidence",
    href: "/bob-evidence",
    icon: Bot,
    description: "Development log",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Configuration",
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 flex items-center justify-center rounded-xl bg-white/10 p-2 backdrop-blur-xl lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 border-r border-white/10 bg-[#050816]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-white/10 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-300 shadow-lg shadow-cyan-500/20">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-black">SophieCare</p>
              <p className="text-xs text-white/50">Surgical Co-Pilot</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-lg shadow-cyan-500/40"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 ${
                        isActive ? "text-white" : "text-cyan-300"
                      }`}
                    />
                    <div className="flex-1">
                      <p className={`font-semibold transition-colors duration-300 ${
                        isActive ? "text-white" : ""
                      }`}>{item.name}</p>
                      <p
                        className={`text-xs transition-colors duration-300 ${
                          isActive ? "text-white/80" : "text-white/40"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 text-white" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Bot className="h-4 w-4 text-cyan-300" />
                <p className="text-xs font-bold text-cyan-300">
                  Built with IBM Bob
                </p>
              </div>
              <p className="text-xs text-white/50">
                AI-accelerated development for healthcare innovation
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Made with Bob
