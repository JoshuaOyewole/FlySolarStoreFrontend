import { ProductsPageView } from "../../../pages-sections/vendor-dashboard/products/page-view";

export const metadata = {
  title: "Products - Flysolarstore Admin",
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
export default async function Products() {


  return <ProductsPageView  />;
}