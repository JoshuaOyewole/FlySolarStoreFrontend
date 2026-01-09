"use client";

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";

// CUSTOM COMPONENTS
import ProductCard17 from "../../components/product-cards/product-card-17";

// STYLED COMPONENTS
import {
  HeroSection,
  FilterSection,
  CategoryChip,
  StatsBox,
} from "../../products/styles";

export default function ProductsPageView({ products: initialProducts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const categories = [
    "All Products",
    "Solar Panels",
    "Inverters",
    "Batteries",
    "Accessories",
    "On Sale",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...(initialProducts || [])];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categories?.some((cat) =>
            cat.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "All Products") {
      if (selectedCategory === "On Sale") {
        filtered = filtered.filter((product) => product.discount > 0);
      } else {
        filtered = filtered.filter((product) =>
          product.categories?.includes(selectedCategory)
        );
      }
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, initialProducts]);

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      {/* HERO SECTION */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 36, sm: 48, md: 56 },
              fontWeight: 800,
              mb: 2,
              textAlign: "center",
            }}
          >
            All Products
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: 16, sm: 18, md: 20 },
              textAlign: "center",
              maxWidth: 700,
              mx: "auto",
              opacity: 0.9,
            }}
          >
            Discover our complete collection of premium solar products
          </Typography>
        </Container>
      </HeroSection>

      {/* FILTER SECTION */}
      <FilterSection>
        <Container maxWidth="lg">
          {/* SEARCH BAR */}
          <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search products..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: 3,
                },
              }}
            />
          </Box>

          {/* CATEGORY FILTERS */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
              justifyContent: "center",
              mb: 4,
            }}
          >
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                clickable
                onClick={() => {
                  setSelectedCategory(category);
                  setPage(1);
                }}
                variant={
                  category === selectedCategory ? "filled" : "outlined"
                }
                color={category === selectedCategory ? "primary" : "default"}
              />
            ))}
          </Box>

          {/* STATS AND SORT */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <StatsBox>
              <Typography variant="h6" sx={{ fontSize: { xs: 16, sm: 18 } }}>
                {filteredProducts.length} Product
                {filteredProducts.length !== 1 ? "s" : ""} Found
              </Typography>
              {selectedCategory !== "All Products" && (
                <Chip
                  label={selectedCategory}
                  size="small"
                  color="primary"
                  onDelete={() => setSelectedCategory("All Products")}
                  sx={{ ml: 2 }}
                />
              )}
            </StatsBox>

            <TextField
              select
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Container>
      </FilterSection>

      {/* PRODUCTS GRID */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "grey.50" }}>
        <Container maxWidth="lg">
          {paginatedProducts.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {paginatedProducts.map((product) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
                    <ProductCard17 product={product} />
                  </Grid>
                ))}
              </Grid>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 6,
                    pt: 4,
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontWeight: 600,
                      },
                    }}
                  />
                </Box>
              )}
            </>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 10,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            >
              <SearchIcon
                sx={{ fontSize: 80, color: "grey.400", mb: 2 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                No Products Found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search or filter criteria
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" color="primary.main">
                    🚚
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Free Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  On orders over ₦50,000,000
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "success.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4">✓</Typography>
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Quality Guarantee
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Premium certified products
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "warning.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4">💬</Typography>
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expert assistance anytime
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "info.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4">🔒</Typography>
                </Box>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Secure Payment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100% secure transactions
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
