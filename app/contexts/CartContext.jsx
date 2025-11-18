"use client";

import { createContext, useMemo, useReducer, useEffect, useState } from "react";

// =================================================================================

// =================================================================================

const INITIAL_CART = [];
const INITIAL_STATE = { cart: INITIAL_CART };


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
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage after hydration
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("flysolar_cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart && parsedCart.length > 0) {
          // Restore each item to the cart
          parsedCart.forEach((item) => {
            dispatch({
              type: "CHANGE_CART_AMOUNT",
              payload: item,
            });
          });
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("flysolar_cart", JSON.stringify(state.cart));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [state.cart, isHydrated]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}