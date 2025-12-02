import Grid from "@mui/material/Grid";

// GLOBAL CUSTOM COMPONENTS
import Container from "../../../components/Container";
import { SectionHeader } from "../../../components/section-header";
import ProductCard17 from "../../../components/product-cards/product-card-17";

export default async function Section4() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/just-for-you`, {
    next: { revalidate: 300 } // Cache for 5 minutes (300 seconds)
  });
  const res = await response.json();

  const products = res.data;

  if (!products || products.length === 0) return null;
  
  return (
    <Container>
      <SectionHeader title="Just for you" seeMoreLink="/products" color="#CC5500"/>

      <Grid container spacing={3}>
        {products.map(product => (
          <Grid 
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3
            }} 
            key={product.id || product._id}
          >
            <ProductCard17 product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}