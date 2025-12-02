import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import Container from "../../../components/Container";
import ProductCard17 from "../../../components/product-cards/product-card-17";
// LOCAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";

export default async function Section6() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/new-arrivals`, {
    next: { revalidate: 300 } // Cache for 5 minutes (300 seconds)
  });
  const res = await response.json();

  const products = res.data;
  
  if (!products || products.length === 0) return null;
  
  return (
    <Container>
      <Typography 
        variant="h2" 
        color="#CC5500" 
        fontWeight={700} 
        fontSize={{
          sm: 32,
          xs: 27
        }}
      >
        New Arrivals
      </Typography>

      <ProductsCarousel>
        {products.map(product => (
          <ProductCard17 key={product.id || product._id} product={product} />
        ))}
      </ProductsCarousel>
    </Container>
  );
}