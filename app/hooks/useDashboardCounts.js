"use client";

import { useState, useEffect } from 'react';
import { ordersAPI } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook to fetch dashboard counts (orders, wishlist)
 */
export function useDashboardCounts() {
  const { user, isAuthenticated } = useAuth();
  const [counts, setCounts] = useState({
    orders: 0,
    wishlist: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      if (!isAuthenticated || !user) {
        setCounts({ orders: 0, wishlist: 0, loading: false });
        return;
      }

      try {
        // Fetch orders count
        const ordersResponse = await ordersAPI.getMyOrders({ page: 1, limit: 1 });
        const ordersCount = ordersResponse?.data?.pagination?.totalOrders || 0;

        // Get wishlist count from user data
        const wishlistCount = user?.wishlist?.length || 0;

        setCounts({
          orders: ordersCount,
          wishlist: wishlistCount,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
        setCounts({
          orders: 0,
          wishlist: 0,
          loading: false,
        });
      }
    };

    fetchCounts();
  }, [isAuthenticated, user]);

  return counts;
}
