"use client";

import { useState, useMemo } from "react";
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
import FilterList from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

// GLOBAL CUSTOM COMPONENTS
import Sidenav from "../../components/side-nav";
import { FlexBetween, FlexBox } from "../../components/flex-box";
import ProductFilters from "../../components/products-view/filters";
import ProductsGridView from "../../components/products-view/products-grid-view";
import ProductsListView from "../../components/products-view/products-list-view";

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
  { label: "Newest First", value: "date" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

export default function ProductSearchPageView({
  filters,
  products,
  pageCount,
  lastIndex,
  firstIndex,
  totalProducts,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("q") || ""
  );

  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";
  const view = searchParams.get("view") || "grid";
  const sort = searchParams.get("sort") || "relevance";
  const category = searchParams.get("category");
  const sale = searchParams.get("sale");

  const handleChangeSearchParams = (key, value) => {
    if (!key) return;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 when filters change
    if (key !== "page" && key !== "view") {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleChangeSearchParams("q", searchInput.trim());
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (category) count++;
    if (sale) count++;
    return count;
  }, [category, sale]);

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
                {totalProducts} Products Found
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
              <FilterChip
                label="On Sale"
                clickable
                onClick={() =>
                  handleChangeSearchParams("sale", sale ? "" : "true")
                }
                color={sale ? "primary" : "default"}
                variant={sale ? "filled" : "outlined"}
              />
              <FilterChip
                label="Featured"
                clickable
                variant="outlined"
              />
              <FilterChip
                label="New Arrivals"
                clickable
                variant="outlined"
              />
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

              {/* MOBILE FILTER BUTTON */}
              <Box display={{ md: "none", xs: "block" }} ml={1}>
                <Sidenav
                  handler={(close) => (
                    <IconButton
                      onClick={close}
                      size="small"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": { backgroundColor: "primary.dark" },
                      }}
                    >
                      <FilterList fontSize="small" />
                    </IconButton>
                  )}
                >
                  <Box px={3} py={2}>
                    <Typography variant="h6" mb={2}>
                      Filters
                    </Typography>
                    <ProductFilters filters={filters} />
                  </Box>
                </Sidenav>
              </Box>
            </FlexBox>
          </FlexBetween>

          <Grid container spacing={3}>
            {/* SIDEBAR FILTERS */}
            <Grid
              size={{ xl: 2.5, md: 3 }}
              sx={{ display: { md: "block", xs: "none" } }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  p: 3,
                  position: "sticky",
                  top: 100,
                }}
              >
                <Typography variant="h6" mb={2} fontWeight={600}>
                  Filters
                </Typography>
                <ProductFilters filters={filters} />
              </Box>
            </Grid>

            {/* PRODUCTS GRID/LIST */}
            <Grid size={{ xl: 9.5, md: 9, xs: 12 }}>
              {products.length > 0 ? (
                <>
                  {view === "grid" ? (
                    <ProductsGridView products={products} />
                  ) : (
                    <ProductsListView products={products} />
                  )}

                  {/* PAGINATION */}
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
                      Showing {firstIndex + 1}-{lastIndex} of {totalProducts}{" "}
                      products
                    </Typography>
                    <Pagination
                      color="primary"
                      variant="outlined"
                      page={+page}
                      count={pageCount}
                      onChange={(_, page) =>
                        handleChangeSearchParams("page", page.toString())
                      }
                      sx={{
                        "& .MuiPaginationItem-root": {
                          fontWeight: 500,
                        },
                      }}
                    />
                  </FlexBetween>
                </>
              ) : (
                <EmptyState>
                  <SearchIcon sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, mb: 1, color: "grey.700" }}
                  >
                    No products found
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "grey.600", mb: 3, maxWidth: 400 }}
                  >
                    Try adjusting your search or filters to find what you're
                    looking for
                  </Typography>
                  <Box
                    component="button"
                    onClick={() => router.push("/products/search")}
                    sx={{
                      px: 3,
                      py: 1.5,
                      backgroundColor: "primary.main",
                      color: "white",
                      border: "none",
                      borderRadius: 2,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                  >
                    Clear All Filters
                  </Box>
                </EmptyState>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
