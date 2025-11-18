// PAGE VIEW COMPONENT
import ProductSearchPageView from "./ProductSearchPageView";
import { getFilters, getProducts } from "../../utils/project-search";



export const metadata = {
  title: "Product Search - No 1 for Solar Products Online Store",
  description:
    "Flysolarstore is your go-to online store for high-quality solar products. Explore our wide range of solar panels, inverters, batteries, and accessories designed to meet all your renewable energy needs. Shop now and embrace sustainable living with Flysolarstore!",
  authors: [
    {
      name: "Orisfina Tech",

      url: "https://orisfinatech.com.ng",
    },
  ],
  keywords: [
    "solar",
    "solar panels",
    "inverters",
    "batteries",
    "solar accessories",
    "renewable energy",
    "sustainable living",
    "Flysolarstore",
  ],
};

export default async function ProductSearch({ searchParams }) {
  const { q, page, sort, sale, prices, colors, brands, rating, category } =
    await searchParams;
  const [filters, data] = await Promise.all([
    getFilters(),
    getProducts({
      q,
      page,
      sort,
      sale,
      prices,
      colors,
      brands,
      rating,
      category,
    }),
  ]);
  return (
    <ProductSearchPageView
      filters={filters}
      products={data.products}
      pageCount={data.pageCount}
      totalProducts={data.totalProducts}
      lastIndex={data.lastIndex}
      firstIndex={data.firstIndex}
    />
  );
}
