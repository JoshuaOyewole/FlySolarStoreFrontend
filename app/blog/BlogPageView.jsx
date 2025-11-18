"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// CUSTOM COMPONENTS
import BlogCard1 from "../components/blog-cards/blog-card-1";
import Search  from "../components/icons/Search";

// STYLED COMPONENTS
import {
  HeroSection,
  CategoryChip,
  SearchSection,
  BlogGrid,
  FeaturedBlogCard,
} from "./styles";

export default function BlogPageView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Solar Tips",
    "Product Reviews",
    "Installation Guides",
    "Sustainability",
    "Energy Savings",
    "News & Updates",
  ];

  const featuredBlog = {
    id: "featured-1",
    title: "Complete Guide to Solar Panel Installation in Nigeria",
    description:
      "Everything you need to know about installing solar panels in your home or business. From choosing the right equipment to understanding installation costs and government incentives.",
    image: "/assets/images/blogs/blog-1.jpg",
    date: "15 NOV 2025",
    category: "Installation Guides",
    readTime: "8 min read",
  };

  const blogs = [
    {
      id: "1",
      title: "Top 10 Solar Products for Nigerian Homes in 2025",
      description:
        "Discover the most efficient and affordable solar products perfect for Nigerian households. From panels to inverters, we've got you covered.",
      image: "/assets/images/blogs/blog-2.jpg",
      date: "12 NOV 2025",
      category: "Product Reviews",
    },
    {
      id: "2",
      title: "How to Calculate Your Solar Energy Needs",
      description:
        "Learn how to accurately determine your energy requirements and choose the right solar system size for your home or business.",
      image: "/assets/images/blogs/blog-3.jpg",
      date: "10 NOV 2025",
      category: "Solar Tips",
    },
    {
      id: "3",
      title: "Solar Panel Maintenance: Best Practices",
      description:
        "Keep your solar panels performing at peak efficiency with these essential maintenance tips and cleaning techniques.",
      image: "/assets/images/blogs/blog-1.jpg",
      date: "08 NOV 2025",
      category: "Solar Tips",
    },
    {
      id: "4",
      title: "Understanding Solar Battery Storage Systems",
      description:
        "A comprehensive guide to solar battery storage, helping you choose the best battery solution for your energy storage needs.",
      image: "/assets/images/blogs/blog-2.jpg",
      date: "05 NOV 2025",
      category: "Product Reviews",
    },
    {
      id: "5",
      title: "Government Incentives for Solar Energy in Nigeria",
      description:
        "Explore available government programs, tax benefits, and incentives for adopting solar energy in Nigeria.",
      image: "/assets/images/blogs/blog-3.jpg",
      date: "03 NOV 2025",
      category: "News & Updates",
    },
    {
      id: "6",
      title: "Solar vs Generator: Cost Comparison 2025",
      description:
        "Detailed cost analysis comparing solar power systems with traditional generators. Find out which option saves you more money long-term.",
      image: "/assets/images/blogs/blog-1.jpg",
      date: "01 NOV 2025",
      category: "Energy Savings",
    },
  ];

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
      </HeroSection>

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
            {categories.map((category) => (
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
      <Box sx={{ py: { xs: 4, md: 6 } }}>
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
      </Box>

      {/* BLOG GRID */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "grey.50" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
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
              filteredBlogs.map((blog) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog.id}>
                  <BlogCard1
                    image={blog.image}
                    title={blog.title}
                    date={blog.date}
                    description={blog.description}
                  />
                </Grid>
              ))
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
          </BlogGrid>

          {/* LOAD MORE */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
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
          </Box>
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
