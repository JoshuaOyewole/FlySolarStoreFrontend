"use client";

import { useState } from "react";
//import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

// GLOBAL CUSTOM HOOK
import useCart from "../../../hooks/useCart";
import { toast } from "react-toastify";
// CUSTOM DATA MODEL

// ================================================================

// ================================================================

export default function AddToCart({ product }) {
  const { id, price, title, slug, thumbnail } = product;
  //const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { state, dispatch } = useCart();

  const handleAddToCart = () => {
    if (state.cart.find((item) => item.id === id)) {
      toast("Item already in cart!", {
        type: "info",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id,
          slug,
          price,
          title,
          thumbnail,
          qty: 1,
        },
      });
      toast("Item added to cart successfully!", {
        type: "success",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(true);

    //router.push("/cart");
    setLoading(false);
  };
  return (
    <Button
      color="primary"
      variant="contained"
      loading={isLoading}
      onClick={handleAddToCart}
      sx={{
        mb: 4.5,
        px: "1.75rem",
        height: 40,
      }}
    >
      Add to Cart
    </Button>
  );
}
