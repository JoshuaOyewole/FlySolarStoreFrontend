"use client";
import Grid from "@mui/material/Grid";
//import { cookies } from "next/headers";
/* import { Box, Paper, Alert, AlertTitle, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh"; */

// LOCAL CUSTOM COMPONENTS
//import Sales from "../sales";
import Card1 from "../card-1";
import Analytics from "../analytics";
import WelcomeCard from "../welcome-card";
import RecentPurchase from "../recent-purchase";
import { useAuth } from "../../../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
//import Typography from "@mui/material/Typography";


export default function DashboardPageView() {
  const { user } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vendor-dashboard-data"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-dashboard-analytics`,
        {
          credentials: "include",
          next: { revalidate: 120 }, // caching for 2mins
        }
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const cardList = data?.data || {};
  const totalYearlySales = data?.data?.totalYearlySales || [];
  const analytics = data?.data?.analytics || [];
  const todaysTotalSales = data?.data?.todaysTotalSales || 0;
  const totalSoldItems = data?.data?.totalSoldItems || 0;

  let salesPerMonth = Array(12).fill(0);
  let ordersPerMonth = Array(12).fill(0);

  totalYearlySales.forEach((item) => {
    const index = item.month - 1; // months are 1–12, array is 0–11
    salesPerMonth[index] += item.totalSales;
    ordersPerMonth[index] += item.totalOrders;
  });

  return (
    <div className="pt-2 pb-2">
      <Grid container spacing={3}>
        {/* WELCOME CARD SECTION */}
        <Grid
          size={{
            md: 6,
            xs: 12,
          }}
        >
          <WelcomeCard
            todayTotalSales={todaysTotalSales}
            user={user}
          />
        </Grid>

        {/* ALL TRACKING CARDS */}
        <Grid
          container
          spacing={3}
          size={{
            md: 6,
            xs: 12,
          }}
        >
          {analytics.map((item, index) => {
            return (
              <Grid
                size={{
                  sm: 6,
                  xs: 12,
                }}
                key={index}
              >
                <Card1
                  title={item.title}
                  color={"info.main"}
                  amount1={item.current}
                  amount2={item.previous}
                  percentage={item.percentageDifference}
                  status={item.status === "down" ? "down" : "up"}
                />
              </Grid>
            );
          })}
          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
            <Card1
              title={"Total Items Sold"}
              color={"error.main"}
              amount1={totalSoldItems}
              //amount2={1350}
              // percentage={"2.65%"}
              //status={"down" === "down" ? "down" : "up"}
            />
          </Grid>
          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
            <Card1
              title={"Total Products"}
              color={"error.main"}
              amount1={cardList?.totalProducts}
              //amount2={1350}
              // percentage={"2.65%"}
              //status={"down" === "down" ? "down" : "up"}
            />
          </Grid>
        </Grid>

        {/* ANALYTICS AREA */}
        <Grid size={12}>
          <Analytics
            salesPerMonth={salesPerMonth}
            ordersPerMonth={ordersPerMonth}
          />
        </Grid>

        {/* RECENT PURCHASE AREA */}
        <Grid size={12}>
          <RecentPurchase recentPurchases={cardList?.recentPurchases} />
        </Grid>

        {/* STOCK OUT PRODUCTS */}
        <Grid
          size={{
            md: 5,
            xs: 12,
          }}
        ></Grid>
      </Grid>
    </div>
  );
}
