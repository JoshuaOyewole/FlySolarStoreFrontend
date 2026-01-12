import Grid from "@mui/material/Grid";

// GLOBAL CUSTOM COMPONENTS
import Container from "../../../components/Container";
import BlogCard1 from "../../../components/blog-cards/blog-card-1";
import { SectionHeader } from "../../../components/section-header";

const fetchArticles = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/latest`,
      {
        revalidate: 1440, // Revalidate every 24 hours
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error("Error fetching articles: " + error.message);
  }
};
export default async function Section8() {
  let blogs = await fetchArticles();

  if (!blogs || blogs.length === 0) return null;
  return (
    <Container>
      <SectionHeader
        title="Read our blogs"
        seeMoreLink="/blog"
        color="#CC5500"
      />

      <Grid container spacing={3}>
        {blogs.map((item) => (
          <Grid
            size={{
              md: 4,
              xs: 12,
            }}
            key={item._id}
          >
            <BlogCard1
              title={item.title}
              date={item.createdAt}
              image={item.thumbnailUrl}
              description={item.description}
              href={item.slug}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
