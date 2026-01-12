import { notFound } from "next/navigation";
import PageWrapper from "../../../../pages-sections/vendor-dashboard/page-wrapper";
import EditBlogForm from "../../../../pages-sections/vendor-dashboard/blog/edit-blog";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Edit Blog - ${slug}`,
    description: "Edit blog post for FlySolarStore",
  };
}

const fetchBlogBySlug = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${slug}`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) return null;

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export default async function EditBlogPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return notFound();
  }

  return (
    <PageWrapper title="Edit Blog Post" href="/admin/blogs">
      <EditBlogForm blog={blog} />
    </PageWrapper>
  );
}
