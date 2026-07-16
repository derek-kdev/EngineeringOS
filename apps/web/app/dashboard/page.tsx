"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    loading,
    setLoading,
    setUser,
    logout,
  } = useAuth();

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);

      try {
        const response = await api.get("/auth/me");

        setUser(response.data);
      } catch (error) {
        console.error("Failed to load authenticated user", error);

        logout();

        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [logout, router, setLoading, setUser]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B132B] text-white">
        <p className="text-lg">Loading dashboard...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0B132B] text-white p-10">
      <h1 className="text-4xl font-bold">
        Welcome, {user.firstName}
      </h1>

      <p className="mt-2 text-white/70">
        {user.email}
      </p>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>

        <p className="mt-2 text-white/60">
          Authentication is working successfully.
        </p>
      </div>
    </main>
  );
}