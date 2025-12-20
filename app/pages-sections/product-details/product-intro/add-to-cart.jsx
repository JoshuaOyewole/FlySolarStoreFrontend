"use client";

import { useState } from "react";
//import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

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

  // Check if product is in cart
  const cartItem = state.cart.find((item) => item.id === id);
  const currentQty = cartItem ? cartItem.qty : 0;

  const handleAddToCart = () => {
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
    setLoading(true);
    //router.push("/cart");
    setLoading(false);
  };

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id,
          slug,
          price,
          title,
          thumbnail,
          qty: 0,
        },
      });
      toast("Item removed from cart", {
        type: "info",
        position: "top-right",
        autoClose: 2000,
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
          qty: newQty,
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      handleQuantityChange(value);
    }
  };

  // If product is not in cart, show "Add to Cart" button
  if (!cartItem) {
    return (
      <Button
        color="primary"
        variant="contained"
        style={{backgroundColor:"#CC5500", color:"#fff"}}
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

  // If product is in cart, show quantity controls
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 4.5,
      }}
    >
      <IconButton
        color="primary"
        onClick={() => handleQuantityChange(currentQty - 1)}
        sx={{
          backgroundColor: "#CC5500",
          borderRadius: "0.35rem",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#b34900",
          },
          width: 40,
          height: 40,
        }}
      >
        <Remove />
      </IconButton>

      <TextField
        type="number"
        value={currentQty}
        onChange={handleInputChange}
        inputProps={{
          min: 1,
          style: { textAlign: "center" },
        }}
        sx={{
          width: "60px",
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
      />

      <IconButton
        color="primary"
        onClick={() => handleQuantityChange(currentQty + 1)}
        sx={{
          backgroundColor: "#CC5500",
          color: "#fff",
          borderRadius: "0.35rem",
          "&:hover": {
            backgroundColor: "#b34900",
          },
          width: 40,
          height: 40,
        }}
      >
        <Add />
      </IconButton>
    </Box>
  );
}
