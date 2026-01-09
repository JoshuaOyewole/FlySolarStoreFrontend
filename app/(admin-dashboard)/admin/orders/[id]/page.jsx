import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "../../../../pages-sections/vendor-dashboard/orders/page-view";
//import mockData from "../../../../data/market-1/data";
import { cookies } from "next/headers";
// CUSTOM DATA MODEL

export const metadata = {
  title: "Order Details - Flysolarstore Admin",
  description: `Flysolarstore is an e-commerce website that offers a wide range of solar products including solar panels, inverters, batteries, and complete solar power systems for residential and commercial use. Manage your orders efficiently with our admin dashboard.`,
  authors: [
    {
      name: "Orisfina Tech",
      url: "https://orisfinatech.com.ng",
    },
  ],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

const fetchData = async (id) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/admin/all-orders/detail?orderId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token?.value || ""}`,
        },
        next: { revalidate: 30 }, // or use next: { revalidate: 300 } for caching
      }
    );

    const res = await response.json();

    const orderDetails = await res;
    return orderDetails;
  } catch (error) {
    throw error;
  }
};
export default async function OrderDetails({ params }) {
  const { id } = await params;

  const order = await fetchData(id);
  if (!order) notFound();


  return <OrderDetailsPageView order={order} />;
}
