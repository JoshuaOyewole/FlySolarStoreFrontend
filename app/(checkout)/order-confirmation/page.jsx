"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";
import { currency } from "../../lib";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Get order ID from URL params
        const orderId = searchParams.get("id");

        if (!orderId) {
          setError("Order ID not found");
          setTimeout(() => router.push("/products"), 3000);
          return;
        }

        // TODO: Fetch from database via API
        // Example:
        // const response = await fetch(`/api/orders/${orderId}`);
        // if (!response.ok) throw new Error('Order not found');
        // const data = await response.json();
        // setOrderData(data);

        // For demo: Fetch from localStorage (replace with API call)
        const existingOrders = JSON.parse(localStorage.getItem("orders") || "{}");
        const order = existingOrders[orderId];

        if (!order) {
          setError("Order not found");
          setTimeout(() => router.push("/products"), 3000);
          return;
        }

        setOrderData(order);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
        setTimeout(() => router.push("/products"), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [router, searchParams]);

  // Error State
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <Card sx={{ p: 6, textAlign: "center", maxWidth: 500 }}>
            <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {error}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We couldn't find your order. Redirecting you to continue shopping...
            </Typography>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Go to Products
            </Button>
          </Card>
        </Box>
      </Container>
    );
  }

  // Loading State
  if (loading || !orderData) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <Box textAlign="center">
            <Box
              sx={{
                width: 60,
                height: 60,
                border: "4px solid",
                borderColor: "primary.light",
                borderTopColor: "primary.main",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                mx: "auto",
                mb: 3,
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
            <Typography variant="h6" color="text.secondary">
              Loading order details...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  // Use cart items from orderData (saved before clearing)
  const cartItems = orderData.cartItems || [];

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  // const shippingCost = 4000; // Fixed shipping cost
  const shippingCost = 0; // Fixed shipping cost
  const total = subtotal + shippingCost;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Success Message */}
      <Card
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "success.50",
          border: "1px solid",
          borderColor: "success.200",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 32 }} />
          <Typography variant="h6" color="success.dark">
            Thank you. Your order has been received.
          </Typography>
        </Box>
      </Card>
      <Card>
        <Typography sx={{ mb: 2 }} variant="h6" color="success.primary">
          An invoice has been generated and sent to your email address (
          <span style={{ display: "inline" }}>
            {orderData.customerInfo.shipping_email}
          </span>
          ). Kindly proceed to make your payment to the account details provided
        </Typography>
      </Card>

      {/* Order Info Summary */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3, sm: 6 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              ORDER NUMBER:
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {orderData.orderNumber}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3, sm: 6 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              DATE:
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {orderData.date}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3, sm: 6 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              TOTAL:
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {currency(total, 2)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3, sm: 6 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              PAYMENT METHOD:
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              Direct bank transfer
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Bank Transfer Instructions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          Kindly Send the receipt of the bank transfer to 08071444456
        </Typography>

        <Card sx={{ p: 4, backgroundColor: "grey.50" }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Our bank details
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ mt: 3, mb: 2, textTransform: "uppercase" }}
          >
            ORISFINA LIMITED
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 3, sm: 6 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                BANK:
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                Sterling Bank
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 3, sm: 6 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ACCOUNT NUMBER:
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                0128219824
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Order Details */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Order details
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Product Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          <Typography variant="body1" fontWeight={600}>
            Product
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            Total
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Cart Items */}
        {cartItems.map((item) => (
          <Box
            key={item.id}
            display="flex"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="body2" color="error">
              {item.title} (× {item.qty})
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {currency(item.price * item.qty, 2)}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Subtotal */}
        <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1" fontWeight={600}>
            {currency(subtotal, 2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Shipping */}
        <Box sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body1">Shipping:</Typography>
            <Typography variant="body1" fontWeight={600}>
              Collection from LAGOS:
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Typography variant="body2" color="text.secondary">
              Alaba International Market, Lagos
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Total:
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {currency(total, 2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Payment Method */}
        <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="body1">Payment method:</Typography>
          <Typography variant="body1" fontWeight={600}>
            Direct bank transfer
          </Typography>
        </Box>
      </Card>

      {/* Billing Address */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Billing address
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" fontWeight={600}>
            {orderData.customerInfo.shipping_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {orderData.customerInfo.shipping_address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {orderData.customerInfo.shipping_state}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {orderData.customerInfo.shipping_country?.label || "Nigeria"}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={2}>
            <PhoneIcon fontSize="small" color="action" />
            <Typography variant="body2">
              {orderData.customerInfo.shipping_contact}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <EmailIcon fontSize="small" color="action" />
            <Typography
              variant="body2"
              component={Link}
              href={`mailto:${orderData.customerInfo.shipping_email}`}
              sx={{ color: "text.main", textDecoration: "none" }}
            >
              {orderData.customerInfo.shipping_email}
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Action Button */}
      <Box display="flex" justifyContent="center">
        <Button
          component={Link}
          href="/products"
          variant="contained"
          style={{backgroundColor:"#ea580c"}}
          color="primary"
          size="large"
          sx={{ px: 6 }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}
