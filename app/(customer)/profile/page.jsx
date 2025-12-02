"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfilePageView } from "../../pages-sections/customer/profile/page-view";
import { useAuth } from "../../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Profile() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Transform user data to match the expected format
  const transformedUser = {
    id: user._id,
    name: {
      firstName: user.firstName,
      lastName: user.lastName
    },
    email: user.email,
    phone: user.phone || "N/A",
    dateOfBirth: user.dateOfBirth || new Date().toISOString(),
    avatar: user.avatar?.url || "/assets/images/avatars/default-avatar.png"
  };

  return <ProfilePageView user={transformedUser} />;
}