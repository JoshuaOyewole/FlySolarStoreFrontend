"use client";

import { useRouter } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import MiniCart from "../pages-sections/mini-cart/mini-cart";

export default function MiniCartPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={handleClose}
      sx={{
        zIndex: 9999,
      }}
      disableScrollLock
    >
      <MiniCart />
    </Drawer>
  );
}