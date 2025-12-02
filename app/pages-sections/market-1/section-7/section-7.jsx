import Grid from "@mui/material/Grid";

// GLOBAL CUSTOM COMPONENTS
import Container from "../../../components/Container";
import FlexBox from "../../../components/flex-box/flex-box";
import ProductCard17 from "../../../components/product-cards/product-card-17";
// LOCAL CUSTOM COMPONENTS
//import Sidebar from "./sidebar";

export default async function Section7() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/featured-grid`, {
    next: { revalidate: 300 } // Cache for 5 minutes (300 seconds)
  });
  const res = await response.json();

  const products = res.data;

  if (!products || products.length === 0) return null;
  
  return (
    <Container>
      <FlexBox gap="1.75rem">
        {/* {shops && <Sidebar shops={shops} />} */}
 
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid
              size={{
                lg: 4,
                sm: 6,
                xs: 12,
              }}
              key={product.id || product._id}
            >
              <ProductCard17 product={product} />
            </Grid>
          ))}
        </Grid>
      </FlexBox>
    </Container>
  );
}
