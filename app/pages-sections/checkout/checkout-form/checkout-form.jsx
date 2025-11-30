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
import useCart  from "../../../hooks/useCart";

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
  same_as_shipping: yup.boolean().optional(),
  billing_name: yup.string().optional(),
  billing_email: yup.string().optional(),
  billing_contact: yup.string().optional(),
  billing_country: yup.mixed().optional(),
  billing_state: yup.string().optional(),
  billing_address: yup.string().optional(),
});
export default function CheckoutForm() {
  const router = useRouter();
  const { dispatch } = useCart();

  const initialValues = {
    shipping_name: "",
    shipping_email: "",
    shipping_contact: "",
    shipping_state: "",
    shipping_address: "",
    billing_state: "",
    shipping_country: {
      label: "Nigeria",
      value: "NG",
    },
    same_as_shipping: false,
    billing_name: "",
    billing_email: "",
    billing_contact: "",
    billing_address: "",
    billing_country: {
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
  
  const handleSubmitForm = handleSubmit(
    async (values) => {
      console.log("Form submitted successfully:", values);
      
      // Get cart data before clearing
      const cartData = JSON.parse(localStorage.getItem("flysolar_cart") || "[]");
      
      // Generate unique order ID
      const orderId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      
      // Prepare order data
      const orderData = {
        id: orderId,
        orderNumber: Math.floor(Math.random() * 10000),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        customerInfo: values,
        cartItems: cartData,
        createdAt: new Date().toISOString(),
      };
      
      // TODO: Save to database via API
      // Example:
      // try {
      //   const response = await fetch('/api/orders', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(orderData)
      //   });
      //   const result = await response.json();
      //   orderId = result.id;
      // } catch (error) {
      //   console.error('Error saving order:', error);
      //   alert('Failed to place order. Please try again.');
      //   return;
      // }
      
      // Store in localStorage as backup (for demo without database)
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "{}");
      existingOrders[orderId] = orderData;
      localStorage.setItem("orders", JSON.stringify(existingOrders));
      
      // Clear the cart after successful order
      dispatch({ type: "CLEAR_CART" });
      
      // Redirect with order ID as query parameter
      router.push(`/order-confirmation?id=${orderId}`);
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

      <CardRoot elevation={0}>
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
      </CardRoot>

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
          style={{backgroundColor:"#ea580c"}}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </ButtonWrapper>
    </FormProvider>
  );
}
