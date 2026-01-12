"use client";

import { useState, useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

// MUI ICON COMPONENTS
import Apps from "@mui/icons-material/Apps";
import ViewList from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "../../components/flex-box";
import ProductCard17 from "../../components/product-cards/product-card-17";

// STYLED COMPONENTS
import {
  HeroSection,
  SearchSection,
  StatsBox,
  FilterChip,
  EmptyState,
} from "./styles";

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Most Popular", value: "popular" },
];

const ITEMS_PER_PAGE = 12;

export default function ProductSearchPageView({
  initialProducts,
  totalProducts: initialTotal,
  categories,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("q") || ""
  );
  const [page, setPage] = useState(1);

  const query = searchParams.get("q");
  const view = searchParams.get("view") || "grid";
  const sort = searchParams.get("sort") || "relevance";
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const handleChangeSearchParams = useCallback((key, value) => {
    if (!key) return;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 when filters change
    if (key !== "page" && key !== "view") {
      setPage(1);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleChangeSearchParams("q", searchInput.trim());
      setPage(1);
    }
  }, [searchInput, handleChangeSearchParams]);

  const clearSearch = useCallback(() => {
    setSearchInput("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    setPage(1);
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...(initialProducts || [])];

    // Filter by category
    if (category) {
      filtered = filtered.filter((product) =>
        product.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    // Sort products
    switch (sort) {
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
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "relevance":
      default:
        // Keep original order (already sorted by relevance from backend)
        break;
    }

    return filtered;
  }, [initialProducts, category, minPrice, maxPrice, sort]);

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [filteredProducts, page]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (category) count++;
    if (minPrice || maxPrice) count++;
    return count;
  }, [category, minPrice, maxPrice]);

  return (
    <Box>
      {/* HERO SECTION */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 32, sm: 40, md: 48 },
              fontWeight: 800,
              mb: 2,
              textAlign: "center",
            }}
          >
            {query ? `Search Results for "${query}"` : "Product Search"}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: 16, sm: 18 },
              textAlign: "center",
              maxWidth: 700,
              mx: "auto",
              opacity: 0.9,
            }}
          >
            Find the perfect solar products for your energy needs
          </Typography>
        </Container>
      </HeroSection>

      {/* SEARCH SECTION */}
      <SearchSection>
        <Container maxWidth="lg">
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            <TextField
              fullWidth
              placeholder="Search for solar panels, inverters, batteries..."
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchInput && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={clearSearch}
                      edge="end"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: 3,
                  fontSize: { xs: 14, sm: 16 },
                },
              }}
            />
          </Box>

          {/* STATS AND QUICK FILTERS */}
          <FlexBetween
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 3,
            }}
          >
            <StatsBox>
              <Typography variant="h6" sx={{ fontSize: { xs: 18, sm: 20 } }}>
                {filteredProducts.length} Products Found
              </Typography>
              {activeFiltersCount > 0 && (
                <Chip
                  label={`${activeFiltersCount} filter${
                    activeFiltersCount > 1 ? "s" : ""
                  } active`}
                  size="small"
                  color="primary"
                  sx={{ ml: 2 }}
                />
              )}
            </StatsBox>

            <FlexBox gap={1} flexWrap="wrap">
              {categories?.map((cat) => (
                <FilterChip
                  key={cat}
                  label={cat}
                  clickable
                  onClick={() =>
                    handleChangeSearchParams("category", category === cat ? "" : cat)
                  }
                  color={category === cat ? "primary" : "default"}
                  variant={category === cat ? "filled" : "outlined"}
                />
              ))}
            </FlexBox>
          </FlexBetween>
        </Container>
      </SearchSection>

      {/* MAIN CONTENT */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "grey.50" }}>
        <Container maxWidth="lg">
          {/* FILTER AND VIEW OPTIONS */}
          <FlexBetween
            sx={{
              mb: 4,
              p: 2,
              backgroundColor: "white",
              borderRadius: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <FlexBox alignItems="center" gap={2} flexWrap="wrap">
              <Typography
                variant="body2"
                sx={{ color: "grey.600", fontWeight: 500 }}
              >
                Sort by:
              </Typography>
              <TextField
                select
                size="small"
                value={sort}
                variant="outlined"
                onChange={(e) => handleChangeSearchParams("sort", e.target.value)}
                sx={{ minWidth: 180 }}
              >
                {SORT_OPTIONS.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" gap={1}>
              <Typography
                variant="body2"
                sx={{ color: "grey.600", fontWeight: 500 }}
              >
                View:
              </Typography>
              <IconButton
                onClick={() => handleChangeSearchParams("view", "grid")}
                size="small"
                sx={{
                  backgroundColor:
                    view === "grid" ? "primary.main" : "transparent",
                  color: view === "grid" ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      view === "grid" ? "primary.dark" : "grey.100",
                  },
                }}
              >
                <Apps fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => handleChangeSearchParams("view", "list")}
                size="small"
                sx={{
                  backgroundColor:
                    view === "list" ? "primary.main" : "transparent",
                  color: view === "list" ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      view === "list" ? "primary.dark" : "grey.100",
                  },
                }}
              >
                <ViewList fontSize="small" />
              </IconButton>
            </FlexBox>
          </FlexBetween>

          {/* PRODUCTS GRID */}
          {paginatedProducts.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {paginatedProducts.map((product) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={product._id}
                  >
                    <ProductCard17 product={product} />
                  </Grid>
                ))}
              </Grid>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <FlexBetween
                  sx={{
                    mt: 6,
                    p: 3,
                    backgroundColor: "white",
                    borderRadius: 2,
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "grey.600" }}>
                    Showing {((page - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(page * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                  </Typography>
                  <Pagination
                    color="primary"
                    variant="outlined"
                    page={page}
                    count={totalPages}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontWeight: 600,
                      },
                    }}
                  />
                </FlexBetween>
              )}
            </>
          ) : (
            <EmptyState>
              <SearchIcon sx={{ fontSize: 80, color: "grey.300", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                No products found
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                {query
                  ? `No results for "${query}". Try adjusting your search or filters.`
                  : "Start searching to find products"}
              </Typography>
              {(category || minPrice || maxPrice) && (
                <Chip
                  label="Clear all filters"
                  clickable
                  color="primary"
                  onClick={() => {
                    router.push(`${pathname}?q=${query || ""}`);
                  }}
                />
              )}
            </EmptyState>
          )}
        </Container>
      </Box>
    </Box>
  );
}
