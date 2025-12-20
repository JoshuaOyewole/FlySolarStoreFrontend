"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authAPI } from "../lib/api";
import { toast } from "react-toastify";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // No need to check localStorage, rely on backend cookie
      const response = await authAPI.getProfile();
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.success && response.token) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      const errorMessage = error.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success && response.token) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success("Registration successful!");
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      const errorMessage = error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      toast.info("You have been logged out");
    }
  }, []);

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserProfile,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
