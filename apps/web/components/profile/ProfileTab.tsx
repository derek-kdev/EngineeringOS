// apps/web/components/profile/ProfileTab.tsx
"use client";

import { useState } from "react";
import { Camera, Check, X, Save } from "lucide-react";

export default function ProfileTab() {
  const [formData, setFormData] = useState({
    fullName: "Kingsley",
    displayName: "Kingsley",
    email: "kingsley@engineering.com",
    jobTitle: "Lead Engineer",
    department: "R&D",
    bio: "Experienced engineer with a passion for space robotics and AI-driven design optimization.",
    location: "London, UK",
    timezone: "GMT+1",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving profile:", formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <div className="relative group">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-3xl font-bold text-black shadow-lg shadow-[#FF6200]/25">
            {formData.fullName.charAt(0)}
          </div>
          <button className="absolute bottom-0 right-0 rounded-full bg-[#FF6200] p-1.5 text-black shadow-lg hover:scale-110 transition">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{formData.fullName}</h2>
          <p className="text-sm text-white/60">{formData.jobTitle}</p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            {formData.email} <Check size={12} className="text-emerald-400" />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-zinc-300">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Display Name</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Job Title</label>
          <select
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          >
            <option>Lead Engineer</option>
            <option>Senior Engineer</option>
            <option>Research Scientist</option>
            <option>CAD Specialist</option>
            <option>Data Analyst</option>
            <option>Product Manager</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          >
            <option>R&D</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Software</option>
            <option>QA</option>
            <option>Operations</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-zinc-300">Bio</label>
          <textarea
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Timezone</label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          >
            <option>GMT+0</option>
            <option>GMT+1</option>
            <option>GMT+2</option>
            <option>GMT-5</option>
            <option>GMT-8</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[#FF6200]/10 pt-4">
        <button
          onClick={handleCancel}
          className="rounded-lg border border-[#FF6200]/20 px-4 py-2 text-sm text-zinc-400 hover:bg-[#FF6200]/10 hover:text-white transition"
        >
          <X size={16} className="inline mr-1" /> Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/30 p-4">
        <h3 className="text-sm font-medium text-white">📊 Account Statistics</h3>
        <div className="mt-2 flex flex-wrap gap-6 text-sm text-white/60">
          <span>Member since: <span className="text-white">Jan 2026</span></span>
          <span>Projects: <span className="text-white">12</span></span>
          <span>Ideas: <span className="text-white">8</span></span>
          <span>Simulations: <span className="text-white">45</span></span>
        </div>
      </div>
    </div>
  );
}