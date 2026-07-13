// apps/web/components/profile/SecurityTab.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff, Shield, Smartphone, LogOut } from "lucide-react";

export default function SecurityTab() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password changed");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <h3 className="text-sm font-semibold text-white">🔐 Change Password</h3>
        <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
              required
            />
            <div className="mt-1 h-1 w-full rounded-full bg-[#1F1F1F]">
              <div className="h-full w-0 rounded-full bg-emerald-400" />
            </div>
            <p className="mt-1 text-xs text-white/40">Password strength: Weak</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
              required
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
          >
            Update Password
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-[#FFB300]" />
            <div>
              <h3 className="text-sm font-semibold text-white">Two-Factor Authentication</h3>
              <p className="text-xs text-white/40">Add an extra layer of security</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative h-6 w-11 rounded-full transition ${twoFactorEnabled ? "bg-[#FF6200]" : "bg-white/20"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${twoFactorEnabled ? "right-0.5" : "left-0.5"}`} />
          </button>
        </div>
        {twoFactorEnabled && (
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
            <p className="text-sm text-emerald-400">✅ 2FA is enabled</p>
            <p className="text-xs text-white/40 mt-1">Backup codes: 8 remaining</p>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone size={20} className="text-[#FFB300]" />
            <div>
              <h3 className="text-sm font-semibold text-white">Active Sessions</h3>
              <p className="text-xs text-white/40">2 active devices</p>
            </div>
          </div>
          <button className="text-xs text-red-400 hover:underline">
            <LogOut size={14} className="inline mr-1" /> Logout All
          </button>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-[#1F1F1F]/50 p-3">
            <div>
              <p className="text-sm text-white">Chrome on MacBook Pro</p>
              <p className="text-xs text-white/40">London, UK • Active now</p>
            </div>
            <button className="text-xs text-red-400 hover:underline">Logout</button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#1F1F1F]/50 p-3">
            <div>
              <p className="text-sm text-white">Safari on iPhone</p>
              <p className="text-xs text-white/40">London, UK • 2 hours ago</p>
            </div>
            <button className="text-xs text-red-400 hover:underline">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}