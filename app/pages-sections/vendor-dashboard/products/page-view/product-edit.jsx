
// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
export default function EditProductPageView() {
  return <PageWrapper title="Edit Product" href={"/admin/products"}>
      <ProductForm />
    </PageWrapper>;
}