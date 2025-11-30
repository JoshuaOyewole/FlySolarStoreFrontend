import Grid from "@mui/material/Grid";

// GLOBAL CUSTOM COMPONENTS
import Container from "../../../components/Container";
import { SectionHeader } from "../../../components/section-header";
import ProductCard17 from "../../../components/product-cards/product-card-17";
import products from "../../../data/market-1/data";

export default async function Section4() {
const product = products.products.filter(item => item.for.type === "just-for-you");

  if (!product || product.length === 0) return null;
  return <Container>
      <SectionHeader title="Just for you" seeMoreLink="/products" color="#CC5500"/>

      <Grid container spacing={3}>
        {product.map(product => <Grid size={{
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3
      }} key={product.id}>
            <ProductCard17 product={product} />
          </Grid>)}
      </Grid>
    </Container>;
}