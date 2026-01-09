"use client";

import {
  Container,
  Box,
  Typography,
  Chip,
  Avatar,
  Divider,
  Card,
  CardContent,
  IconButton,
  Stack,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";
import {
  CalendarToday,
  Share,
  Bookmark,
  Facebook,
  Twitter,
  LinkedIn,
  ArrowBack,
} from "@mui/icons-material";
import Link from "next/link";
import React from "react";

/* interface PageProps {
  params: Promise<{
    slug: string;
  }>;
} */

// Mock data - replace with actual API call
const mockBlogPost = {
  title: "The Future of Web Development: Trends to Watch in 2025",
  subtitle:
    "Exploring the latest technologies and practices shaping modern web development",
  author: {
    name: "John Doe",
    avatar: "/avatar.jpg",
    bio: "Senior Full-Stack Developer with 10+ years of experience",
  },
  publishedDate: "December 24, 2025",
  readTime: "8 min read",
  category: "Technology",
  tags: ["Web Development", "React", "Next.js", "TypeScript"],
  coverImage: "/blog-cover.jpg",
  content: [
    {
      type: "paragraph",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      type: "heading",
      text: "Introduction to Modern Web Development",
    },
    {
      type: "paragraph",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    },
    {
      type: "heading",
      text: "Key Trends for 2025",
    },
    {
      type: "paragraph",
      text: "The web development landscape is constantly evolving. Here are some key trends that are shaping the future of how we build applications. Understanding these trends will help you stay ahead in your development career.",
    },
    {
      type: "subheading",
      text: "1. Server Components and RSC",
    },
    {
      type: "paragraph",
      text: "React Server Components represent a paradigm shift in how we think about building web applications. By moving rendering to the server, we can significantly reduce bundle sizes and improve performance. This approach allows us to fetch data directly on the server without exposing API keys or making additional network requests from the client.",
    },
    {
      type: "subheading",
      text: "2. Edge Computing",
    },
    {
      type: "paragraph",
      text: "Edge computing brings computation and data storage closer to users, reducing latency and improving response times. Platforms like Vercel Edge Functions and Cloudflare Workers are making it easier than ever to deploy code to the edge, enabling faster global applications.",
    },
    {
      type: "subheading",
      text: "3. AI Integration",
    },
    {
      type: "paragraph",
      text: "Artificial Intelligence is becoming an integral part of modern web applications. From chatbots to content generation, AI-powered features are enhancing user experiences and automating complex tasks. Tools like OpenAI's API and various AI libraries are making integration more accessible.",
    },
    {
      type: "heading",
      text: "Conclusion",
    },
    {
      type: "paragraph",
      text: "The future of web development is exciting and full of opportunities. By staying informed about these trends and continuously learning, developers can build better, faster, and more user-friendly applications. Keep experimenting, keep learning, and embrace the changes ahead.",
    },
  ],
  relatedPosts: [
    {
      id: 1,
      slug: "getting-started-nextjs",
      title: "Getting Started with Next.js 14",
      image: "/related1.jpg",
      category: "Tutorial",
      readTime: "5 min read",
    },
    {
      id: 2,
      slug: "typescript-best-practices",
      title: "TypeScript Best Practices for Large Applications",
      image: "/related2.jpg",
      category: "Guide",
      readTime: "7 min read",
    },
    {
      id: 3,
      slug: "scalable-architecture",
      title: "Building Scalable Web Applications",
      image: "/related3.jpg",
      category: "Architecture",
      readTime: "10 min read",
    },
  ],
};

export default function BlogDetailPage({ params }) {
  const { slug } = React.use(params);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="md">
        {/* Back Button */}
        <Button
          component={Link}
          href="/blog"
          startIcon={<ArrowBack />}
          sx={{ mb: 4, color: "text.secondary" }}
        >
          Back to Blog
        </Button>

        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label={mockBlogPost.category}
            color="primary"
            sx={{ mb: 2, fontWeight: 600 }}
          />

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              color: "text.primary",
              mb: 2,
            }}
          >
            {mockBlogPost.title}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}
          >
            {mockBlogPost.subtitle}
          </Typography>

          {/* Author and Meta Info */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 4 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={mockBlogPost.author.avatar}
                alt={mockBlogPost.author.name}
                sx={{ width: 56, height: 56, bgcolor: "primary.main" }}
              >
                {mockBlogPost.author.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {mockBlogPost.author.name}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <CalendarToday sx={{ fontSize: 16 }} />
                    {mockBlogPost.publishedDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • {mockBlogPost.readTime}
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Social Share Buttons */}
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <Share fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "#1877F2",
                  color: "white",
                  "&:hover": { bgcolor: "#145dbf" },
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "#1DA1F2",
                  color: "white",
                  "&:hover": { bgcolor: "#1a8cd8" },
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "#0A66C2",
                  color: "white",
                  "&:hover": { bgcolor: "#084e96" },
                }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Bookmark fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          {/* Cover Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 200, md: 350 },
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "grey.200",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" color="white" fontWeight={700}>
                Blog Cover Image
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={6}>
          {/* Main Content */}
          <Grid
            sx={{
              xs: 12,
              md: 4,
            }}
          >
            <Card
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
              }}
            >
              <CardContent>
                {mockBlogPost.content.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <Typography
                        key={index}
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          mt: index > 0 ? 4 : 0,
                          mb: 2,
                          color: "text.primary",
                        }}
                      >
                        {block.text}
                      </Typography>
                    );
                  }

                  if (block.type === "subheading") {
                    return (
                      <Typography
                        key={index}
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          mt: 3,
                          mb: 2,
                          color: "text.primary",
                        }}
                      >
                        {block.text}
                      </Typography>
                    );
                  }

                  return (
                    <Typography
                      key={index}
                      variant="body1"
                      paragraph
                      sx={{
                        lineHeight: 1.8,
                        color: "text.secondary",
                        fontSize: "1.1rem",
                        mb: 3,
                      }}
                    >
                      {block.text}
                    </Typography>
                  );
                })}

                <Divider sx={{ my: 4 }} />

                {/* Tags */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Tags:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {mockBlogPost.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            {/* Author Bio */}
            <Card
              elevation={0}
              sx={{
                mt: 4,
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
              }}
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  src={mockBlogPost.author.avatar}
                  alt={mockBlogPost.author.name}
                  sx={{ width: 50, height: 50, bgcolor: "primary.main" }}
                >
                  {mockBlogPost.author.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    About {mockBlogPost.author.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {mockBlogPost.author.bio}
                  </Typography>
                  {/*   <Button variant="outlined" size="small">
                    View Profile
                  </Button> */}
                </Box>
              </Stack>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid
            sx={{
              xs: 12,
              md: 4,
              width: "100%",
            }}
          >
            {/* Related Posts */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                position: "sticky",
                top: 24,
              }}
            >
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Related Articles
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                }}
              >
                {mockBlogPost.relatedPosts.map((post) => (
                  <Card
                    key={post.id}
                    component={Link}
                    href={`/blog/${post.slug}`}
                    sx={{
                      textDecoration: "none",
                      width: "100%",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 120,
                        bgcolor: "grey.200",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body2" color="white">
                        Image
                      </Typography>
                    </Box>
                    <CardContent>
                      <Chip
                        label={post.category}
                        size="small"
                        color="primary"
                        sx={{ mb: 1, fontSize: "0.7rem" }}
                      />
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        gutterBottom
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {post.readTime}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
