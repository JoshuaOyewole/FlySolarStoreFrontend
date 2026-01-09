import { ProductReviewsPageView } from "../../../../pages-sections/vendor-dashboard/products/page-view";
import mockData from "../../../../data/market-1/data";

export const metadata = {
  title: "Product Reviews - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function ProductReviews() {
  const { reviews } = mockData;
  return <ProductReviewsPageView reviews={reviews} />;
}