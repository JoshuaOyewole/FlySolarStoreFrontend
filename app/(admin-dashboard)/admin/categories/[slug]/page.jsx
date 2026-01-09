import { cookies } from "next/headers";
//import { EditCategoryPageView } from "../../../../pages-sections/vendor-dashboard/categories/page-view";
import PageWrapper from "../../../../pages-sections/vendor-dashboard/page-wrapper";
import CategoryForm from "../../../../pages-sections/vendor-dashboard/categories/category-form";

export const metadata = {
  title: "Edit Category - FlySolarStore Admin Dashboard",
  description: `FlySolarStore Admin Dashboard Edit Category Page`,
  authors: [
    {
      name: "Orisfina Tech",
      url: "https://orisfinatech.com.ng",
    },
  ],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

const fetchData = async (id) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token?.value || ""}`,
        },
        next: { revalidate: 30 }, // or use next: { revalidate: 300 } for caching
      }
    );

    const res = await response.json();

    const categoryDetails = await res;
    return categoryDetails;
  } catch (error) {
    throw error;
  }
};

export default async function EditCategory({ params }) {
  const { slug } = await params;

  const details = await fetchData(slug);
  const data = details?.data || null;
  return (
    <PageWrapper title="Edit Category" href="/admin/categories">
      <CategoryForm details={data} type="edit" />
    </PageWrapper>
  );
}
