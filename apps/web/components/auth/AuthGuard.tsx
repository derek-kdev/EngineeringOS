"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/services/auth.service";
import { EngineeringLoader } from "@/components/loading";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const hydrated = useAuthStore((state) => state.hydrated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    async function validateSession() {
      if (!accessToken) {
        clearAuth();
        router.replace("/signin");
        return;
      }

      // Already authenticated – skip revalidation on every render
      if (user?.id) return;

      try {
        setChecking(true);
        setLoading(true);

        const profile = await authService.getMe();
        setUser(profile);

        if (!profile.emailVerifiedAt) {
          router.replace(
            `/verify-email/sent?email=${encodeURIComponent(profile.email)}`
          );
          return;
        }
      } catch (error) {
        console.error("AUTH VALIDATION FAILED", error);
        clearAuth();
        router.replace("/signin");
      } finally {
        setChecking(false);
        setLoading(false);
      }
    }

    validateSession();
  }, [hydrated, accessToken, user]);

  if (!hydrated || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EngineeringLoader />
      </div>
    );
  }

  return <>{children}</>;
}
