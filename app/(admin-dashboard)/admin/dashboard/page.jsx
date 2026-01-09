import { DashboardPageView } from "../../../pages-sections/vendor-dashboard/dashboard/page-view";
export const metadata = {
  title: "Admin Dashboard - Flysolarstore Admin",
  description:
    "Admin dashboard for managing Flysolarstore e-commerce platform.",
  authors: [
    {
      name: "Flysolarstore Admin",
      url: "https://flysolarstore.com",
    },
  ],
  keywords: ["e-commerce", "admin dashboard", "next.js", "react"],
};
export default function VendorDashboard() {

  return <DashboardPageView  />;
}
