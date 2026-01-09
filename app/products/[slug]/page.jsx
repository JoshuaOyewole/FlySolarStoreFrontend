import { notFound } from "next/navigation";

// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "../../pages-sections/product-details/page-view";

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

export default async function ProductDetails({ params }) {
  const { slug } = await params;
 
  try {
    // Fetch product details
    const productResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!productResponse.ok) return notFound();

    const productRes = await productResponse.json();
    const product = productRes.data;

    // Fetch related products
    const relatedResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}/related?limit=8`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    let relatedProducts = [];
    if (relatedResponse.ok) {
      const relatedRes = await relatedResponse.json();
      relatedProducts = relatedRes.data;
    }

    return (
      <ProductDetailsPageView
        product={product}
        relatedProducts={relatedProducts}
      />
    );
  } catch (error) {
    return notFound();
  }
}
