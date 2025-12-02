"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

/**
 * Higher-Order Component to protect routes
 * Redirects to login if user is not authenticated
 */
export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, loading, router]);

    // Show loading state while checking authentication
    if (loading) {
      return (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "400px" 
        }}>
          <p>Loading...</p>
        </div>
      );
    }

    // Don't render the component if not authenticated
    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
