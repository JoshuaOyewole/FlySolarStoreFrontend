import Box from "@mui/material/Box";

// GLOBAL CUSTOM COMPONENTS
import Container from "../../../components/Container";
import ProductCard17 from "../../../components/product-cards/product-card-17";

// LOCAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";

export default async function Section2() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/flash-deals`, {
    next: { revalidate: 300 } // Cache for 5 minutes (300 seconds)
  });
  const res = await response.json();

  const flashDeals = res.data;

  if (!flashDeals || flashDeals.length === 0) return null;
  
  return (
    <Container>
      <ProductsCarousel>
        {flashDeals.map(product => (
          <Box pb={0.6} key={product.id || product._id}>
            <ProductCard17 product={product} />
          </Box>
        ))}
      </ProductsCarousel>
    </Container>
  );
}