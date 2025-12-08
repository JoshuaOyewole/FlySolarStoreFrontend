"use client";

import { usePathname } from "next/navigation";
import ShopLayout1 from "./layouts/shop-layout-1";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // List of routes that should NOT have the header/footer layout
  const authRoutes = ["/login", "/register", "/reset-password", "/vendor","/admin"];

  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If it's an auth route, render children without ShopLayout1
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Otherwise, wrap with ShopLayout1
  return <ShopLayout1>{children}</ShopLayout1>;
}
