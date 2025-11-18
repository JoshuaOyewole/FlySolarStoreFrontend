"use client";

import { createContext, useMemo, useReducer, useEffect } from "react";

// =================================================================================

// =================================================================================

const INITIAL_CART = [];

// Get initial state from localStorage if available
const getInitialState = () => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("flysolar_cart");
      if (savedCart) {
        return { cart: JSON.parse(savedCart) };
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }
  return { cart: INITIAL_CART };
};


// ==============================================================


// ==============================================================

export const CartContext = createContext({});
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      if (!cartItem) return state;
      let existIndex = cartList.findIndex(item => item.id === cartItem.id);

      
// REMOVE ITEM IF QUANTITY IS LESS THAN 1
      if (cartItem.qty < 1) {
        const updatedCart = cartList.filter(item => item.id !== cartItem.id);
        return {
          ...state,
          cart: updatedCart
        };
      }

      
// IF PRODUCT ALREADY EXITS IN CART
      if (existIndex > -1) {
        const updatedCart = [...cartList];
        updatedCart[existIndex].qty = cartItem.qty;
        return {
          ...state,
          cart: updatedCart
        };
      }
      return {
        ...state,
        cart: [...cartList, cartItem]
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: []
      };
    default:
      {
        return state;
      }
  }
};
export default function CartProvider(props) {
  const { children } = props || {};
  const [state, dispatch] = useReducer(reducer, getInitialState());

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("flysolar_cart", JSON.stringify(state.cart));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [state.cart]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}