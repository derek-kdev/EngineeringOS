"use client";

import { useState, useEffect } from "react";
import { DashboardData } from "@/types/dashboard";

// Mock data – replace with real API calls
const mockData: DashboardData = {
  user: {
    name: "Kingsley",
    role: "Lead Engineer",
  },
  projects: 6,
  researchPapers: 24,
  prototypeProgress: 72,
  prototypes: 18,
  dueToday: 5,
  recentActivity: [
    { id: "1", user: "Kingsley", action: "updated", target: "Mars Rover v2", time: "2 min ago" },
    { id: "2", user: "Sarah", action: "published", target: "Thermal Analysis Paper", time: "15 min ago" },
    { id: "3", user: "Michael", action: "created", target: "New Prototype: Sensor Array", time: "1 hour ago" },
  ],
};

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 🔄 Replace with real API call:
        // const response = await api.get('/dashboard');
        // setData(response.data);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { stats: data, loading, error };
}