"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// GLOBAL CUSTOM HOOK
import useCart from "../../../hooks/useCart";

// CUSTOM COMPONENTS
import Trash from "../../../components/icons/Trash";
import CartItem from "../cart-item";
import EmptyCart from "../empty-cart";
import CheckoutForm from "../checkout-form";
import Typography from "@mui/material/Typography";

export default function CartPageView() {
  const { state, dispatch } = useCart();
  if (state.cart.length === 0) {
    return <EmptyCart />;
  }
const totalItems = state.cart.reduce((total, item) => total + item.qty, 0);
 
  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          md: 8,
          xs: 12,
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: { xs: "2rem" }, textTransform: "uppercase" }}
        >
          Cart Summary
        </Typography>
        <Box
          size={{
            md: 8,
            xs: 12,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Total items in your Cart: {totalItems}
          </Typography>

          {state.cart.map((item) => (
            <CartItem key={item.slug} item={item} />
          ))}

          <Box textAlign="end">
            <Button
              disableElevation
              color="error"
              variant="outlined"
              startIcon={<Trash fontSize="small" />}
              onClick={() =>
                dispatch({
                  type: "CLEAR_CART",
                })
              }
            >
              Clear Cart
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid
        size={{
          md: 4,
          xs: 12,
        }}
        sx={{
          mt: { lg: "5.7rem" },
        }}
      >
        <CheckoutForm />
      </Grid>
    </Grid>
  );
}
