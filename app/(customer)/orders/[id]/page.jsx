"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { OrderDetailsPageView } from "../../../pages-sections/customer/orders/page-view";
import { ordersAPI } from "../../../lib/api";

export default function OrderDetails() {
  const params = useParams();
  const id = params.id;
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await ordersAPI.getById(id);
        
        if (!response || !response.data) {
          setError('Order not found');
          return;
        }
        
        const orderData = response.data;
        
        // Transform order data to match expected format
        const transformedOrder = {
          id: orderData._id,
          orderNumber: orderData.orderNumber,
          createdAt: orderData.createdAt,
          status: orderData.status,
          totalPrice: orderData.total,
          isDelivered: orderData.status === 'Delivered',
          deliveredAt: orderData.deliveredAt || null,
          items: orderData.items.map(item => ({
            product_name: item.productSnapshot?.title || item.name,
            product_img: item.productSnapshot?.thumbnail || item.productSnapshot?.images?.[0] || '/assets/images/products/default.png',
            product_price: item.price,
            product_quantity: item.quantity,
            variant: item.variant || null
          })),
          shippingAddress: orderData.shippingAddress,
          billingAddress: orderData.billingAddress,
          subtotal: orderData.subtotal,
          tax: orderData.tax,
          shippingCost: orderData.shippingCost
        };
        
        setOrder(transformedOrder);
      } catch (err) {
        console.error('Error loading order details:', err);
        setError(err.message || 'Unable to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    notFound();
  }

  return <OrderDetailsPageView order={order} />;
}