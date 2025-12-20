"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function CustomerLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.replace("/");
    }
  }, [isAuthenticated, loading, router]);

  // Don't render anything while loading or if not authenticated
  if (loading || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
