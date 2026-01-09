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

export default async function ProductsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );

  const res = await response.json();
  const products = res.data || [];

  return <ProductsPageView products={products} />;
}
