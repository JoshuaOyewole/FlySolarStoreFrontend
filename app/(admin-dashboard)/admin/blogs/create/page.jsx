import PageWrapper from "../../../../pages-sections/vendor-dashboard/page-wrapper";
import BlogForm from "../../../../pages-sections/vendor-dashboard/blog/blog-form";

export const metadata = {
  title: "Create Blog Post - FlySolarStore Admin",
  description: "Create a new blog post for FlySolarStore.",
  authors: [
    {
      name: "FlySolarStore Admin",
      url: "https://flysolarstore.com",
    },
  ],
  keywords: ["blog", "create", "admin", "next.js"],
};

export default function CreateBlogPage() {
  return (
    <PageWrapper title="Create Blog Post" href="/admin/blogs">
      <BlogForm />
    </PageWrapper>
  );
}
