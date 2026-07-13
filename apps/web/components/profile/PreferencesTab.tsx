// apps/web/components/profile/PreferencesTab.tsx
"use client";

import { useState } from "react";
import { Sun, Moon, Monitor, Bell, Keyboard } from "lucide-react";

export default function PreferencesTab() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <h3 className="text-sm font-semibold text-white">🎨 Theme</h3>
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition ${
              theme === "dark" ? "border-[#FF8A00] bg-[#FF6200]/10" : "border-[#FF6200]/20 hover:bg-[#FF6200]/5"
            }`}
          >
            <Moon size={20} className="text-white" />
            <span className="text-xs text-white">Dark</span>
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition ${
              theme === "light" ? "border-[#FF8A00] bg-[#FF6200]/10" : "border-[#FF6200]/20 hover:bg-[#FF6200]/5"
            }`}
          >
            <Sun size={20} className="text-white" />
            <span className="text-xs text-white">Light</span>
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition ${
              theme === "system" ? "border-[#FF8A00] bg-[#FF6200]/10" : "border-[#FF6200]/20 hover:bg-[#FF6200]/5"
            }`}
          >
            <Monitor size={20} className="text-white" />
            <span className="text-xs text-white">System</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
          <h3 className="text-sm font-semibold text-white">🌐 Language</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-2 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
          <h3 className="text-sm font-semibold text-white">📅 Date Format</h3>
          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            className="mt-2 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-[#FFB300]" />
          <h3 className="text-sm font-semibold text-white">🔔 Notifications</h3>
        </div>
        <div className="mt-3 space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm text-white/80">Email Notifications</span>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative h-5 w-9 rounded-full transition ${emailNotifications ? "bg-[#FF6200]" : "bg-white/20"}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${emailNotifications ? "right-0.5" : "left-0.5"}`} />
            </button>
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-white/80">In-App Notifications</span>
            <button
              onClick={() => setInAppNotifications(!inAppNotifications)}
              className={`relative h-5 w-9 rounded-full transition ${inAppNotifications ? "bg-[#FF6200]" : "bg-white/20"}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${inAppNotifications ? "right-0.5" : "left-0.5"}`} />
            </button>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Keyboard size={20} className="text-[#FFB300]" />
            <div>
              <h3 className="text-sm font-semibold text-white">⌨️ Keyboard Shortcuts</h3>
              <p className="text-xs text-white/40">Enable global shortcuts (⌘K, ⌘N, etc.)</p>
            </div>
          </div>
          <button
            onClick={() => setKeyboardShortcuts(!keyboardShortcuts)}
            className={`relative h-6 w-11 rounded-full transition ${keyboardShortcuts ? "bg-[#FF6200]" : "bg-white/20"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${keyboardShortcuts ? "right-0.5" : "left-0.5"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}