import { OrdersPageView } from "../../../pages-sections/vendor-dashboard/orders/page-view";

export const metadata = {
  title: "Product Orders - Flysolarstore Admin",
  description:
    "Admin dashboard for managing Flysolarstore e-commerce platform.",
  authors: [
    {
      name: "Flysolarstore Admin",
      url: "https://flysolarstore.com",
    },
  ],
  keywords: ["e-commerce", "admin dashboard", "next.js", "react"],
};
export default async function Orders() {
  return <OrdersPageView />;
}
