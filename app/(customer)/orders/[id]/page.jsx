import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "../../../pages-sections/customer/orders/page-view";
import { ordersAPI } from "../../../lib/api";

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    console.log("generateMetadata - Order ID:", id);
    const response = await ordersAPI.getById(id);
    console.log("generateMetadata - Order response:", response);
    if (!response || !response.data) {
      return {
        title: "Order Not Found - FlySolarStore E-Commerce shop",
        description: "Order details not found",
      };
    }
    
    const order = response.data;
    return {
      title: `Order ${order.orderNumber} - FlySolarStore E-Commerce shop`,
      description: "View your order details and status",
      authors: [{
        name: "UI-LIB",
        url: "https://ui-lib.com"
      }],
      keywords: ["e-commerce", "order details", "next.js", "react"]
    };
  } catch (error) {
    return {
      title: "Order - FlySolarStore E-Commerce shop",
      description: "Order details",
    };
  }
}

export default async function OrderDetails({ params }) {
  try {
    const { id } = await params;
    const response = await ordersAPI.getById(id);
    
    console.log("OrderDetails - Order response:", response);
    if (!response || !response.data) {
      notFound();
    }
    
    const order = response.data;
    
    // Transform order data to match expected format
    const transformedOrder = {
      id: order._id,
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      status: order.status,
      totalPrice: order.total,
      isDelivered: order.status === 'Delivered',
      deliveredAt: order.deliveredAt || null,
      items: order.items.map(item => ({
        product_name: item.productSnapshot?.title || item.name,
        product_img: item.productSnapshot?.thumbnail || item.productSnapshot?.images?.[0] || '/assets/images/products/default.png',
        product_price: item.price,
        product_quantity: item.quantity,
        variant: item.variant || null
      })),
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress||null,
      subtotal: order.subtotal,
      tax: order.tax,
      discount: order.discount,
      shippingCost: order.shippingCost
    };
    
    return <OrderDetailsPageView order={transformedOrder} />;
  } catch (error) {
    console.error('Error loading order details:', error);
    notFound();
  }
}