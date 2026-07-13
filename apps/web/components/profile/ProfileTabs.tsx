// apps/web/components/profile/ProfileTabs.tsx
"use client";

import { useState } from "react";
import { User, Shield, Settings, Link2 } from "lucide-react";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import PreferencesTab from "./PreferencesTab";
import ConnectedAccountsTab from "./ConnectedAccountsTab";

type TabId = "profile" | "security" | "preferences" | "accounts";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "profile", label: "Profile", icon: <User size={16} /> },
  { id: "security", label: "Security", icon: <Shield size={16} /> },
  { id: "preferences", label: "Preferences", icon: <Settings size={16} /> },
  { id: "accounts", label: "Connected Accounts", icon: <Link2 size={16} /> },
];

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">👤 My Profile</h1>
        <p className="text-sm text-white/60">Manage your personal information and preferences</p>
      </div>

      <div className="flex flex-wrap gap-1 rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-1 backdrop-blur-xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
                transition-all duration-200
                ${isActive
                  ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,138,0,0.1)]"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "security" && <SecurityTab />}
        {activeTab === "preferences" && <PreferencesTab />}
        {activeTab === "accounts" && <ConnectedAccountsTab />}
      </div>
    </div>
  );
}