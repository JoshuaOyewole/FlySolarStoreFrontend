import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import Container from "../../../components/Container";
import ProductCard17 from "../../../components/product-cards/product-card-17";
import products from "../../../data/market-1/data";
// LOCAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";

export default async function Section6() {

  const product = products.products.filter(item => item.for.type === "just-for-you");
  
  if (!product || product.length === 0) return null;
  return <Container>
      <Typography variant="h2" fontWeight={700} fontSize={{
      sm: 32,
      xs: 27
    }}>
        New Arrivals
      </Typography>

      <ProductsCarousel>
        {product.map(product => <ProductCard17 key={product.id} product={product} />)}
      </ProductsCarousel>
    </Container>;
}