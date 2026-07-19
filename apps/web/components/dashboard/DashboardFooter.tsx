"use client";

import Link from "next/link";

interface DashboardFooterProps {
  expanded?: boolean;
}

export default function DashboardFooter({
  expanded = true,
}: DashboardFooterProps) {
  return (
    <footer
      className={`
        mt-auto
        border-t
        border-white/5
        bg-[#0B132B]/40
        backdrop-blur-xl
        transition-all
        duration-300
        ${expanded ? "px-6 py-4" : "px-4 py-4"}
      `}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-1">
          <p className="text-sm font-medium text-white">
            EngineeringOS
          </p>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} EngineeringOS.
            Built for engineers, not for show.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-wrap items-center gap-5 text-xs text-white/40">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

            All systems operational

            {/*
              TODO (Backend)
              Replace with:
              GET /system/status
              Display API health and websocket status.
            */}
          </span>

          <Link
            href="/docs"
            className="transition hover:text-[#00D2FF]"
          >
            Documentation
          </Link>

          <Link
            href="/status"
            className="transition hover:text-[#00D2FF]"
          >
            API Status
          </Link>

          <Link
            href="/support"
            className="transition hover:text-[#00D2FF]"
          >
            Support
          </Link>

          {/*
            TODO (Backend)

            Future additions:

            • Connected Workspace
            • Build Version
            • API Latency
            • Queue Status
            • Active Simulations
            • Logged-in Organization
            • Notifications Health
          */}
        </div>
      </div>
    </footer>
  );
}