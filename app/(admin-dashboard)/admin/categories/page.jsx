import { CategoriesPageView } from "../../../pages-sections/vendor-dashboard/categories/page-view";
//import mockData from "../../../data/market-1/data";

export const metadata = {
  title: "Categories - FlySolarStore Admin Dashboard",
  description:
    "Admin dashboard for managing Flysolarstore e-commerce platform.",
  authors: [
    {
      name: "Flysolarstore Admin",
      url: "https://flysolarstore.com",
    },
  ],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};
export default async function Categories() {
  //const { categories } = mockData;
  return <CategoriesPageView />;
}
