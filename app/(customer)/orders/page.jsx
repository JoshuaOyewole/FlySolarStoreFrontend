import { OrdersPageView } from "../../pages-sections/customer/orders/page-view";
import { ordersAPI } from "../../lib/api";

export const metadata = {
  title: "Orders - FlySolarStore E-Commerce shop",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [
    {
      name: "UI-LIB",
      url: "https://ui-lib.com",
    },
  ],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

// ==============================================================

// ==============================================================

export default async function Orders({ searchParams }) {
  try {
    const { page = 1 } = await searchParams || {};
    
    // Fetch orders from API
    const response = await ordersAPI.getMyOrders({ page, limit: 10 });
    
    if (!response || !response.data) {
      return (
        <OrdersPageView 
          orders={[]} 
          totalPages={0}
          error="Unable to load orders. Please try again later." 
        />
      );
    }
    
    const { orders, pagination } = response.data;
    
    return (
      <OrdersPageView 
        orders={orders || []} 
        totalPages={pagination?.totalPages || 1}
        currentPage={pagination?.currentPage || 1}
      />
    );
  } catch (error) {
    console.error('Error loading orders:', error);
    return (
      <OrdersPageView 
        orders={[]} 
        totalPages={0}
        error="Unable to load orders. Please try again later." 
      />
    );
  }
}
