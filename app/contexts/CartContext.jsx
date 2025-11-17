"use client";

import { createContext, useMemo, useReducer } from "react";


// =================================================================================


// =================================================================================

const INITIAL_CART = [/* {
  qty: 1,
  price: 210,
  slug: "silver-high-neck-sweater",
  title: "Silver High Neck Sweater",
  id: "6e8f151b-277b-4465-97b6-547f6a72e5c9",
  thumbnail: "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
}, {
  qty: 1,
  price: 110,
  slug: "yellow-casual-sweater",
  title: "Yellow Casual Sweater",
  id: "76d14d65-21d0-4b41-8ee1-eef4c2232793",
  thumbnail: "/assets/images/products/Fashion/Clothes/21.YellowCasualSweater.png"
}, {
  qty: 1,
  price: 140,
  slug: "denim-blue-jeans",
  title: "Denim Blue Jeans",
  id: "0fffb188-98d8-47f7-8189-254f06cad488",
  thumbnail: "/assets/images/products/Fashion/Clothes/4.DenimBlueJeans.png"
} */];
const INITIAL_STATE = {
  cart: INITIAL_CART
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
export default function CartProvider({
  children
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}