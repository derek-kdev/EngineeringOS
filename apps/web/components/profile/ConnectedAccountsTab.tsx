// apps/web/components/profile/ConnectedAccountsTab.tsx
"use client";

import { useState } from "react";
import { Globe, GitBranch, Link2, Key, Trash2 } from "lucide-react";

// Inline GitHub SVG (same as footer)
const GitHubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

interface Connection {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  description: string;
}

export default function ConnectedAccountsTab() {
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "github",
      name: "GitHub",
      icon: <GitHubIcon size={18} />,
      connected: true,
      description: "Connect your repositories",
    },
    {
      id: "google",
      name: "Google",
      icon: <Globe size={18} />,
      connected: false,
      description: "Google OAuth integration",
    },
    {
      id: "slack",
      name: "Slack",
      icon: <GitBranch size={18} />,
      connected: false,
      description: "Receive notifications in Slack",
    },
    {
      id: "figma",
      name: "Figma",
      icon: <Link2 size={18} />,
      connected: false,
      description: "Import design files",
    },
  ]);

  const toggleConnection = (id: string) => {
    setConnections(
      connections.map((conn) =>
        conn.id === id ? { ...conn, connected: !conn.connected } : conn
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <h3 className="text-sm font-semibold text-white">🔌 Connected Services</h3>
        <p className="text-xs text-white/40">Manage your OAuth integrations</p>
        <div className="mt-4 space-y-3">
          {connections.map((conn) => (
            <div
              key={conn.id}
              className="flex items-center justify-between rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  conn.connected ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"
                }`}>
                  {conn.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{conn.name}</p>
                  <p className="text-xs text-white/40">{conn.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleConnection(conn.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  conn.connected
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                    : "bg-[#FF6200]/20 text-[#FFB300] hover:bg-[#FF6200]/30"
                }`}
              >
                {conn.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key size={20} className="text-[#FFB300]" />
            <div>
              <h3 className="text-sm font-semibold text-white">🔑 API Keys</h3>
              <p className="text-xs text-white/40">Manage your personal access tokens</p>
            </div>
          </div>
          <button className="rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-1.5 text-xs font-semibold text-black transition hover:scale-[1.02]">
            + Generate New
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-3">
            <div>
              <p className="text-sm text-white">eng-api-001</p>
              <p className="text-xs text-white/40">Created: Jul 2026 • Last used: 2 days ago</p>
            </div>
            <button className="text-red-400 hover:bg-red-500/10 p-1 rounded transition">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-3">
            <div>
              <p className="text-sm text-white">simulation-cli</p>
              <p className="text-xs text-white/40">Created: Jun 2026 • Last used: 1 week ago</p>
            </div>
            <button className="text-red-400 hover:bg-red-500/10 p-1 rounded transition">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}