"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

// MUI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import {
  FormProvider,
  TextField,
  Autocomplete,
  Checkbox,
} from "../../../components/form-hook";
import useCart from "../../../hooks/useCart";

// DUMMY CUSTOM DATA
import countryList from "../../../data/countryList";

// STYLED COMPONENT
import { ButtonWrapper, CardRoot, FormWrapper } from "./styles";

// uncomment these fields below for from validation
const validationSchema = yup.object().shape({
  shipping_name: yup.string().required("Name is required"),
  shipping_email: yup
    .string()
    .email("invalid email")
    .required("Email is required"),
  shipping_contact: yup.string().required("Phone is required"),
  shipping_country: yup.mixed().required("Country is required"),
  shipping_state: yup.string().required("State is required"),
  shipping_address: yup.string().required("Address is required"),
});
export default function CheckoutForm() {
  const router = useRouter();
  const { dispatch, state } = useCart();

  const initialValues = {
    shipping_name: "",
    shipping_email: "",
    shipping_contact: "",
    shipping_state: "",
    shipping_address: "",
    shipping_country: {
      label: "Nigeria",
      value: "NG",
    },
  };
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  /*   const handleSubmitForm2 = handleSubmit(
    async (values) => {
      console.log("Form submitted successfully:", values);

      try {
        // Get cart data before clearing
        const cartData = JSON.parse(
          localStorage.getItem("flysolar_cart") || "[]"
        );

        if (cartData.length === 0) {
          alert("Your cart is empty. Please add items before checkout.");
          router.push("/cart");
          return;
        }

        // Prepare order data for API
        const orderData = {
          items: cartData.map((item) => ({
            productId: item.id,
            qty: item.qty,
          })),
          shippingAddress: {
            name: values.shipping_name,
            email: values.shipping_email,
            contact: values.shipping_contact,
            address: values.shipping_address,
            state: values.shipping_state,
            country: values.shipping_country,
          },
          billingAddress: values.same_as_shipping
            ? null
            : {
                name: values.billing_name,
                email: values.billing_email,
                contact: values.billing_contact,
                address: values.billing_address,
                state: values.billing_state,
                country: values.billing_country,
              },
          sameAsShipping: values.same_as_shipping,
        };

        // Save order to database via API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Failed to create order");
        }

        const result = await response.json();
        const order = result.data;

        console.log("Order created successfully:", order);

        // Clear the cart after successful order
        dispatch({ type: "CLEAR_CART" });
        localStorage.removeItem("flysolar_cart");

        // Redirect to order confirmation with order number
        router.push(`/order-confirmation?orderNumber=${order.orderNumber}`);
      } catch (error) {
        console.error("Error creating order:", error);
        alert(`Failed to place order: ${error.message}. Please try again.`);
      }
    },
    (errors) => {
      console.log("Form validation errors:", errors);
      alert("Please fill in all required fields correctly!");
    }
  ); */

  const handleSubmitForm = handleSubmit(
    async (values) => {
      console.log("Submitting order...");

      try {
        const { cart: cartData } = state;

        if (cartData.length === 0) {
          alert("Your cart is empty!");
          return;
        }

        // Calculate totals
        const subtotal = cartData.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        );
        const shippingCost = subtotal > 500000 ? 0 : 6000;
        //const tax = 0.075; // 7.5% tax
        const tax = subtotal * 0; // Not charging tax for now
        const total = subtotal + tax + shippingCost;

        // Prepare order data matching backend expectations
        const orderData = {
          items: cartData.map((item) => ({
            productId: item.id,
            qty: item.qty,
          })),
          shippingAddress: {
            name: values.shipping_name,
            email: values.shipping_email,
            contact: values.shipping_contact,
            address: values.shipping_address,
            state: values.shipping_state,
            country: values.shipping_country,
          },
        };

        // Submit to backend - backend generates order number
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create order");
        }

        const result = await response.json();

        // Backend returns the order with generated order number
        const createdOrder = result.data;

        // Store order details in sessionStorage using BACKEND order number
        sessionStorage.setItem(
          "orderData",
          JSON.stringify({
            orderNumber: createdOrder.orderNumber, // Backend-generated
            date: createdOrder.createdAt,
            total: createdOrder.total,
            paymentMethod: createdOrder.paymentMethod,
            items: createdOrder.items,
            shippingAddress: createdOrder.shippingAddress,
            billingAddress: createdOrder.billingAddress,
            subtotal: createdOrder.subtotal,
            tax: createdOrder.tax,
            shippingCost: createdOrder.shippingCost,
          })
        );

        // Clear cart
        dispatch({ type: "CLEAR_CART" });

        // Redirect to order confirmation with backend order number
        router.push(
          `/order-confirmation?orderNumber=${createdOrder.orderNumber}`
        );
      } catch (error) {
        console.error("Error submitting order:", error);
        alert(error.message || "Failed to submit order. Please try again.");
      }
    },
    (errors) => {
      console.log("Form validation errors:", errors);
      alert("Please fill in all required fields!");
    }
  );

  const sameAsShipping = watch("same_as_shipping");
  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <CardRoot elevation={0}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
          }}
        >
          Shipping Address
        </Typography>

        <FormWrapper>
          <TextField
            size="medium"
            fullWidth
            label="Full Name"
            name="shipping_name"
          />
          <TextField
            size="medium"
            fullWidth
            label="Phone Number"
            name="shipping_contact"
          />
          <TextField
            fullWidth
            type="email"
            size="medium"
            label="Email Address"
            name="shipping_email"
          />
          <Autocomplete
            fullWidth
            size="medium"
            label="Country"
            options={countryList}
            name="shipping_country"
            placeholder="Select Country"
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
          />

          <TextField
            size="medium"
            fullWidth
            label="State"
            name="shipping_state"
          />
          <TextField
            size="medium"
            fullWidth
            label="Address"
            name="shipping_address"
            multiline
            rows={2}
          />
        </FormWrapper>
      </CardRoot>

     {/*  <CardRoot elevation={0}>
         <Typography variant="h5">Billing Address</Typography>

        <Checkbox
          size="small"
          color="secondary"
          name="same_as_shipping"
          label="Same as shipping address"
          className={clsx({
            "mb-1": !sameAsShipping,
          })}
        />
 
        {!sameAsShipping && (
          <FormWrapper>
            <TextField
              size="medium"
              fullWidth
              label="Full Name"
              name="billing_name"
            />
            <TextField
              size="medium"
              fullWidth
              label="Phone Number"
              name="billing_contact"
            />
            <TextField
              size="medium"
              fullWidth
              type="email"
              name="billing_email"
              label="Email Address"
            />

            <Autocomplete
              size="medium"
              fullWidth
              label="Country"
              options={countryList}
              name="billing_country"
              placeholder="Select Country"
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.label
              }
            />
            <TextField
              size="medium"
              fullWidth
              label="State"
              name="billing_state"
            />
            <TextField
              size="medium"
              fullWidth
              label="Address"
              name="billing_address"
              multiline
              rows={2}
            />
          </FormWrapper>
        )} 
      </CardRoot>*/}

      <ButtonWrapper>
        <Button
          size="large"
          fullWidth
          component={Link}
          href="/cart"
          color="primary"
          variant="outlined"
        >
          Back to Cart
        </Button>

        <Button
          size="large"
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          style={{ backgroundColor: "#ea580c" }}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </ButtonWrapper>
    </FormProvider>
  );
}
