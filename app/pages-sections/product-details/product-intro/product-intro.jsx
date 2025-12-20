//import Link from "next/link";

// MUI
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import ProductGallery from "./product-gallery";
//import ProductVariantSelector from "./product-variant-selector";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "../../../lib";

// STYLED COMPONENTS
import { StyledRoot } from "./styles";
import ProductSummary from "../product-summary";
import { fontSize } from "../../../theme/core";

// CUSTOM DATA MODEL

// ================================================================

// ================================================================

export default function ProductIntro({ product }) {
  return (
    <StyledRoot>
      <Grid container spacing={3} justifyContent="space-around">
        {/* IMAGE GALLERY AREA */}
        <Grid
          size={{
            lg: 6,
            md: 7,
            xs: 12,
          }}
        >
          <ProductGallery images={product.images} />
        </Grid>
        {/* 7066285394 Folashade Shakira OPAY */}
        <Grid
          size={{
            lg: 5,
            md: 5,
            xs: 12,
          }}
        >
          <Typography variant="h1" sx={{ fontSize: { sx: 20, lg: 35 } }}>
            {product.title}
          </Typography>

          <Typography variant="body1">
            Category:{" "}
            <strong>{product.category || product.categories.join(", ")}</strong>
          </Typography>

          {/*  <Typography variant="body1">
            Product Code: <strong>ERE238</strong>
          </Typography> */}

          {/*     <Typography variant="body1" fontSize={30} fontWeight={700} sx={{
          my: 1
        }}>
            $484.00{" "}
            <Typography component="span" sx={{
            fontSize: 20,
            fontWeight: 600,
            color: "text.secondary",
            textDecoration: "line-through"
          }}>
              $550.00
            </Typography>
          </Typography> */}

          {/* PRODUCT BRAND */}
          {/* {product.brand && <p className="brand">
              Brand: <strong>{product.brand}</strong>
            </p>} */}

          {/* PRODUCT RATING */}
          <div className="rating">
            <span>Rated:</span>
            <Rating readOnly color="warn" size="small" value={product.rating} />
            {/* <Typography variant="h6">
              ({product.reviews?.length || 5})
            </Typography> */}
          </div>

          {/* PRODUCT VARIANTS */}
          {/*  <ProductVariantSelector /> */}
          <ProductSummary />
          {/* PRICE & STOCK */}
          <div className="price">
            <Typography
              variant="h2"
              sx={{
                color: "primary.main",
                mb: 0.5,
                lineHeight: 1,
              }}
            >
              {currency(product.price)}
            </Typography>

            <p>Stock Available</p>
          </div>

          {/* ADD TO CART BUTTON */}
          <AddToCart product={product} />

          {/* SHOP NAME */}
          {/*  {product.shop && <p className="shop">
              Sold By:
              <Link href={`/shops/${product.shop.slug}`}>
                <strong>{product.shop.name}</strong>
              </Link>
            </p>} */}
        </Grid>
      </Grid>
    </StyledRoot>
  );
}
