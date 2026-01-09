"use client";

import { useSearchParams } from "next/navigation";
import { OrdersPageView } from "../../pages-sections/customer/orders/page-view";
import { ordersAPI } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Orders() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const { data, isPending, error } = useQuery({
    queryKey: ["my-orders", page],
    queryFn: () => ordersAPI.getMyOrders({ page, limit: 10 }),
  });

  const pagination = data?.data?.pagination || {
    totalPages: 1,
    currentPage: 1,
  };

  if (isPending) {
    return (
      <OrdersPageView
        orders={[]}
        totalPages={0}
        currentPage={1}
        loading={true}
      />
    );
  }

  return (
    <OrdersPageView
      orders={data?.data?.orders || []}
      totalPages={pagination.totalPages}
      currentPage={pagination.currentPage}
      error={error}
    />
  );
}
