import Box from "@mui/material/Box";

// GLOBAL CUSTOM COMPONENTS
import Container from "../../../components/Container";
import ProductCard17 from "../../../components/product-cards/product-card-17";

// LOCAL CUSTOM COMPONENTS
import ProductsCarousel from "./products-carousel";
import products from "../../../data/market-1/data";
// API FUNCTIONS
//import api from "utils/__api__/market-1";


export default async function Section2() {
const flashDeals = products.products.filter(item => item.for.type === "flash-deals");

  if (!flashDeals || flashDeals.length === 0) return null;
  return <Container>
      <ProductsCarousel>
        {flashDeals.map(product => <Box pb={0.6} key={product.id}>
            <ProductCard17 product={product} />
          </Box>)}
      </ProductsCarousel>
    </Container>;
}