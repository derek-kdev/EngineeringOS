"use client";

interface DashboardFooterProps {
  expanded?: boolean;
}

export default function DashboardFooter({ expanded }: DashboardFooterProps) {
  return (
    <footer className="mt-auto border-t border-white/5 px-2 py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/40">
          © 2026 EngineeringOS — Built for engineers, not for show.
        </p>
        <div className="flex flex-wrap items-center gap-5 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </span>
          <a href="/docs" className="transition hover:text-white">
            Documentation
          </a>
          <a href="/status" className="transition hover:text-white">
            API Status
          </a>
          <a href="/support" className="transition hover:text-white">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}