import { notFound } from "next/navigation";

// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "../../pages-sections/product-details/page-view";
import  relatedProducts from "../../data/market-1/data";
import  products from "../../data/market-1/data";

// CUSTOM DATA MODEL

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.products.find((item) => item.slug === slug);
  if (!product) notFound();

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
}
export default async function ProductDetails({ params }) {
  const { slug } = await params;

  const product = products.products.find((item) => item.slug === slug);
  const relatedProductss = relatedProducts.relatedProducts;
  //const frequentlyBought = getFrequentlyBought(4, slug);

  if (!product) notFound();

  return (
    <ProductDetailsPageView
      product={product}
      relatedProducts={relatedProductss}
      //frequentlyBought={frequentlyBought}
    />
  );
}
