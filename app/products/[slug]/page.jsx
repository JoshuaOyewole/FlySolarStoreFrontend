import { notFound } from "next/navigation";

// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "../../pages-sections/product-details/page-view";
import Link from "next/link";

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
    return {
      title: "Product Not Found - Flysolarstore",
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
    //return a page displaying product not found
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg">
          The product you are looking for does not exist or has been removed.
        </p>
        {/* Go back to products listing button */}
        <Link
          href="/products"
          className="px-4 py-2 bg-blue-600 text-white! mt-1 h-10 flex justify-center items-center w-20 rounded hover:bg-blue-700"
        >
          Go Back
        </Link>
      </div>
    );
  }
}
