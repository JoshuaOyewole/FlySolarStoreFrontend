import ProductsPageView from "../pages-sections/products/ProductsPageView";

export const metadata = {
  title: "All Products | Fly Solar Store",
  description:
    "Discover our complete collection of premium solar products - panels, inverters, batteries, and accessories. Shop with confidence and expert support.",
  keywords: [
    "solar products",
    "solar panels",
    "inverters",
    "batteries",
    "solar accessories",
    "renewable energy products",
  ],
};

export default function ProductsPage() {
  return <ProductsPageView />;
}