"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// CUSTOM COMPONENTS
import BlogCard1 from "../components/blog-cards/blog-card-1";
import Search from "../components/icons/Search";

// STYLED COMPONENTS
import {
  // HeroSection,
  CategoryChip,
  SearchSection,
  BlogGrid,
  //FeaturedBlogCard,
} from "./styles";
import { blogCategories } from "../pages-sections/vendor-dashboard/blog/blog-form";
import { blogAPI } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "@mui/material";
import { TablePagination } from "../components/data-table";

export default function BlogPageView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  const query = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => blogAPI.getAll({ limit, page: currentPage }), // Fetch all blogs for now
  });

  if (query.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">Loading articles...</Typography>
      </Box>
    );
  }
  if (query.isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">
          Error loading articles. Please try again later.
        </Typography>
      </Box>
    );
  }

  const blogs = query?.data?.data || [];

  // Filter blogs based on search query and selected category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      {/* HERO SECTION */}
      {/*    <HeroSection>
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
            Blog
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
            Expert insights, tips, and guides on solar energy, sustainable
            living, and renewable power solutions
          </Typography>
        </Container>
      </HeroSection> */}

      {/* SEARCH AND CATEGORIES */}
      <SearchSection>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search articles..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {blogCategories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                clickable
                onClick={() => setSelectedCategory(category)}
                variant={category === selectedCategory ? "filled" : "outlined"}
                color={category === selectedCategory ? "primary" : "default"}
              />
            ))}
          </Box>
        </Container>
      </SearchSection>

      {/* FEATURED BLOG */}
      {/*    <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 24, sm: 28, md: 32 },
              fontWeight: 700,
              mb: 4,
            }}
          >
            Featured Article
          </Typography>

          <FeaturedBlogCard>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 300, md: 400 },
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "grey.200",
                    backgroundImage: `url(${featuredBlog.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Chip
                  label={featuredBlog.category}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: 24, sm: 28, md: 32 },
                    fontWeight: 700,
                    mb: 2,
                    lineHeight: 1.3,
                  }}
                >
                  {featuredBlog.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: 15, sm: 16 },
                    color: "text.secondary",
                    mb: 3,
                    lineHeight: 1.7,
                  }}
                >
                  {featuredBlog.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    color: "text.secondary",
                    fontSize: 14,
                  }}
                >
                  <Typography variant="body2">{featuredBlog.date}</Typography>
                  <Typography variant="body2">•</Typography>
                  <Typography variant="body2">
                    {featuredBlog.readTime}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </FeaturedBlogCard>
        </Container>
      </Box> */}

      {/* BLOG GRID */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "grey.50" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            color="#CC5500"
            sx={{
              fontSize: { xs: 24, sm: 28, md: 32 },
              fontWeight: 700,
              mb: 4,
            }}
          >
            Latest Articles
          </Typography>

          <BlogGrid container spacing={3}>
            {filteredBlogs.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  rowGap: 4,
                  flexWrap: "wrap",
                  flexDirection:{
                    xs:"column",
                    sm:"row",
                    md:"row",
                  },
                 columnGap: {
                  xs:2,
                  sm:2,
                  md:2,
                  lg:3,
                 },
                }}
              >
                {filteredBlogs.map((blog) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog._id}>
                    <BlogCard1
                      image={blog.coverImgUrl}
                      title={blog.title}
                      date={blog.createdAt}
                      href={blog.slug}
                      description={blog.description}
                    />
                  </Grid>
                ))}
              </Box>
            ) : (
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 8,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "text.secondary",
                      mb: 1,
                    }}
                  >
                    No articles found
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </Typography>
                </Box>
              </Grid>
            )}
            <Stack alignItems="center" my={4} width={"100%"}>
              <TablePagination
                page={currentPage}
                onChange={(_, newPage) => setCurrentPage(newPage)}
                count={Math.ceil(filteredBlogs.length / limit)}
              />
            </Stack>
          </BlogGrid>

          {/* LOAD MORE */}
          {/*   <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Load More Articles
            </Typography>
          </Box> */}
        </Container>
      </Box>

      {/* NEWSLETTER SECTION */}
      {/*   <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: 24, sm: 28, md: 32 },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Subscribe to Our Newsletter
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 15, sm: 16 },
                mb: 4,
                opacity: 0.95,
              }}
            >
              Get the latest solar energy tips, product updates, and exclusive
              offers delivered to your inbox
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                maxWidth: 500,
                mx: "auto",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
              <Box
                component="button"
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: "white",
                  color: "primary.main",
                  border: "none",
                  borderRadius: 1,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "grey.100",
                  },
                }}
              >
                Subscribe
              </Box>
            </Box>
          </Box>
        </Container>
      </Box> */}
    </Box>
  );
}
