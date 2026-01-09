import { notFound } from "next/navigation";
import PageWrapper from "../../../../pages-sections/vendor-dashboard/page-wrapper";
import EditProductForm from "../../../../pages-sections/vendor-dashboard/products/edit-product";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) return notFound();

    const res = await response.json();
    const product = res.data;

    return {
      title: product.title + " - Flysolarstore",
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
  } catch (error) {
    return notFound();
  }
}

export const fetchProductBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) return null;

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default async function ProductEdit({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <PageWrapper title="Edit Product" href={"/admin/products"}>
      <EditProductForm product={product} />
    </PageWrapper>
  );
}
