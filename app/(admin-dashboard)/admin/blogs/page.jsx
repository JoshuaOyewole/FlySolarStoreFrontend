import { BlogsPageView } from "../../../pages-sections/vendor-dashboard/blog/page-view";

export const metadata = {
  title: "Blog Posts - FlySolarStore Admin Dashboard",
  description: "Manage blog posts for FlySolarStore.",
  authors: [
    {
      name: "FlySolarStore Admin",
      url: "https://flysolarstore.com",
    },
  ],
  keywords: ["blog", "admin dashboard", "next.js", "react"],
};

export default function BlogPage() {
  return <BlogsPageView />;
}
