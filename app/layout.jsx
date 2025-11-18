
import { Geist } from "next/font/google";
/* import { GoogleAnalytics } from "@next/third-parties/google"; */
/* export const geist = Geist({
  subsets: ["latin"],
}); */

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import "overlayscrollbars/overlayscrollbars.css";

// THEME PROVIDER
import ThemeProvider from "./theme/theme-provider";

// PRODUCT CART PROVIDER
import CartProvider from "./contexts/CartContext";
//IMPORT GLOBAL CSS STYLES
import "./globals.css";

import ProgressBar from "./components/progress";
import QueryProvider from "./components/Providers/QueryProvider";
// IMPORT i18n SUPPORT FILE
//import "i18n";
import { ToastContainer } from "react-toastify";
import ShopLayout1 from "./layouts/shop-layout-1";

// ==============================================================

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body id="body" className={geistSans.className}>
        <CartProvider>
          <ThemeProvider>
            <ShopLayout1>
              <QueryProvider>
                {modal}
                {children}
              </QueryProvider>
              <ProgressBar />
            </ShopLayout1>
          </ThemeProvider>
        </CartProvider>
        <ToastContainer />
        {/* <GoogleAnalytics gaId="" /> */}
      </body>
    </html>
  );
}
