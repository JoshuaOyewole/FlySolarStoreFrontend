"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OrdersPageView } from "../../pages-sections/customer/orders/page-view";
import { ordersAPI } from "../../lib/api";

export default function Orders() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const page = searchParams.get("page") || 1;
        
        const response = await ordersAPI.getMyOrders({ page, limit: 10 });
        
        if (response && response.data) {
          setOrders(response.data.orders || []);
          setPagination(response.data.pagination || { totalPages: 1, currentPage: 1 });
        } else {
          setError("Unable to load orders. Please try again later.");
        }
      } catch (err) {
        console.error('Error loading orders:', err);
        setError("Unable to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [searchParams]);

  if (loading) {
    return <OrdersPageView orders={[]} totalPages={0} currentPage={1} loading={true} />;
  }

  return (
    <OrdersPageView 
      orders={orders} 
      totalPages={pagination.totalPages}
      currentPage={pagination.currentPage}
      error={error}
    />
  );
}
