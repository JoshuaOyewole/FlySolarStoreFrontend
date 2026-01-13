"use server";
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
import Image from "next/image";
import { formatDate, isValid } from "date-fns";

/* interface PageProps {
  params: Promise<{
    slug: string;
  }>;
} */

const fetchArticleBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetchArticleBySlug(slug);

  if (!res) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  return {
    title: res.title,
    description: res.description,
  };
} 

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const res = await fetchArticleBySlug(slug);

  if (!res) {
    return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
        <Container maxWidth="md">
          <Link href="/blog" passHref style={{ textDecoration: "none" }}>
            <Button
              startIcon={<ArrowBack />}
              sx={{ mb: 4, color: "text.secondary" }}
            >
              Back to Blog
            </Button>
          </Link>
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
            No Article Available
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="md">
        {/* Back Button */}
        <Link href="/blog" passHref style={{ textDecoration: "none" }}>
          <Button
            startIcon={<ArrowBack />}
            sx={{ mb: 4, color: "text.secondary" }}
          >
            Back to Blog
          </Button>
        </Link>

        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label={res?.category}
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
              lineHeight: 1.2,
            }}
          >
            {res?.title}
          </Typography>

          {/*   <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}
          >
            {res?.subtitle}
          </Typography> */}

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
                src={res?.author?.avatar}
                alt={res?.author.firstName}
                sx={{ width: 56, height: 56, bgcolor: "primary.main" }}
              >
                {res?.author.firstName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {res?.author.firstName} {res?.author.lastName}
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
                    {isValid(new Date(res?.createdAt)) &&
                      formatDate(new Date(res?.createdAt), "MMMM dd, yyyy")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • {res?.readTime} Mins Read
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
            <Image
              src={res?.coverImgUrl}
              alt={res?.title}
              fill
              style={{ objectFit: "cover" }}
            />
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
                <Box dangerouslySetInnerHTML={{ __html: res?.content }} sx={{
                  display:"flex",
                  flexDirection:"column",
                  rowGap:1,
                  fontSize:{
                    xs:"14px",
                    md:"16px",
                    lg:"18px"
                  },
                  lineHeight:1.8
                }}  />

                <Divider sx={{ my: 4 }} />

                {/* Tags */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Tags:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {res?.tags.map((tag, index) => (
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
       {/*      <Card
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
                  src={res?.author?.avatar}
                  alt={res?.author?.firstName}
                  sx={{ width: 50, height: 50, bgcolor: "primary.main" }}
                >
                  {res?.author?.firstName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    About {res?.author?.firstName} {res?.author?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {res?.author?.bio}
                  </Typography>
                   <Button variant="outlined" size="small">
                    View Profile
                  </Button> 
                </Box>
              </Stack>
            </Card> */}
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
            {/*    <Card
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
            </Card> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
