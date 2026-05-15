"use client";

import { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Eye,
  Moon,
  Sun,
  Globe,
  Save,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    surgeryAlerts: true,
    riskWarnings: true,
    trainingUpdates: false,
    systemUpdates: true,
  });

  const [privacy, setPrivacy] = useState({
    dataCollection: true,
    analytics: false,
    shareWithTeam: true,
  });

  const [display, setDisplay] = useState({
    theme: "dark",
    language: "en",
    animations: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen overflow-hidden text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-96 w-96 rounded-full bg-violet-700/40 blur-3xl animate-pulse-glow" />
        <div
          className="absolute right-[-8%] top-[8%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Settings</h1>
              <p className="mt-1 text-sm text-white/60">
                Configure your SophieCare experience
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Save Success Banner */}
        {saved && (
          <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4 backdrop-blur animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <p className="font-semibold text-emerald-200">Settings saved successfully!</p>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10">
              <Bell className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-sm text-white/60">Manage your alert preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-semibold">Surgery Alerts</p>
                <p className="text-sm text-white/60">Real-time notifications during procedures</p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, surgeryAlerts: !notifications.surgeryAlerts })
                }
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notifications.surgeryAlerts ? "bg-cyan-400" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    notifications.surgeryAlerts ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-semibold">Risk Warnings</p>
                <p className="text-sm text-white/60">Critical safety alerts and warnings</p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, riskWarnings: !notifications.riskWarnings })
                }
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notifications.riskWarnings ? "bg-cyan-400" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    notifications.riskWarnings ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-semibold">Training Updates</p>
                <p className="text-sm text-white/60">New modules and progress notifications</p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, trainingUpdates: !notifications.trainingUpdates })
                }
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notifications.trainingUpdates ? "bg-cyan-400" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    notifications.trainingUpdates ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-semibold">System Updates</p>
                <p className="text-sm text-white/60">Platform updates and maintenance notices</p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, systemUpdates: !notifications.systemUpdates })
                }
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notifications.systemUpdates ? "bg-cyan-400" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    notifications.systemUpdates ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-300/10">
              <Shield className="h-5 w-5 text-violet-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Privacy & Security</h2>
              <p className="text-sm text-white/60">Control your data and privacy settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-semibold">Data Collection</p>
                <p className="text-sm text-white/60">Allow anonymous usage data collection</p>
              </div>
              <button
                onClick={() => setPrivacy({ ...privacy, dataCollection: !privacy.dataCollection })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  privacy.dataCollection ? "bg-cyan-400" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    privacy.dataCollection ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-semibold">Analytics</p>
                <p className="text-sm text-white/60">Help improve the platform with analytics</p>
              </div>
              <button
                onClick={() => setPrivacy({ ...privacy, analytics: !privacy.analytics })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  privacy.analytics ? "bg-cyan-400" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    privacy.analytics ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-semibold">Share with Team</p>
                <p className="text-sm text-white/60">Allow team members to view your progress</p>
              </div>
              <button
                onClick={() => setPrivacy({ ...privacy, shareWithTeam: !privacy.shareWithTeam })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  privacy.shareWithTeam ? "bg-cyan-400" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    privacy.shareWithTeam ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur animate-fade-in">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10">
              <Eye className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Display Preferences</h2>
              <p className="text-sm text-white/60">Customize your visual experience</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 font-semibold">Theme</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDisplay({ ...display, theme: "dark" })}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                    display.theme === "dark"
                      ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200"
                      : "border-white/10 bg-black/20 text-white/60 hover:bg-white/10"
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  <span className="text-sm font-semibold">Dark</span>
                </button>
                <button
                  onClick={() => setDisplay({ ...display, theme: "light" })}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-3 transition-all ${
                    display.theme === "light"
                      ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200"
                      : "border-white/10 bg-black/20 text-white/60 hover:bg-white/10"
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  <span className="text-sm font-semibold">Light</span>
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="mb-3 font-semibold">Language</p>
              <select
                value={display.language}
                onChange={(e) => setDisplay({ ...display, language: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-300/40 focus:bg-black/40"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
              <div>
                <p className="font-semibold">Animations</p>
                <p className="text-sm text-white/60">Enable smooth transitions and effects</p>
              </div>
              <button
                onClick={() => setDisplay({ ...display, animations: !display.animations })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  display.animations ? "bg-cyan-400" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    display.animations ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 p-4 backdrop-blur animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-400" />
            <div>
              <p className="font-semibold text-yellow-200">Demo Settings</p>
              <p className="mt-1 text-sm text-yellow-200/80">
                These settings are for demonstration purposes only. In a production environment,
                settings would be persisted to a secure backend and synchronized across devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob