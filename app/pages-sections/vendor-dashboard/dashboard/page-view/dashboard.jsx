import Grid from "@mui/material/Grid";
import { cookies } from "next/headers";
/* import { Box, Paper, Alert, AlertTitle, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh"; */

// LOCAL CUSTOM COMPONENTS
//import Sales from "../sales";
import Card1 from "../card-1";
import Analytics from "../analytics";
import WelcomeCard from "../welcome-card";
import RecentPurchase from "../recent-purchase";
//import Typography from "@mui/material/Typography";

const fetchData = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-dashboard-analytics`,
    {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
      next: { revalidate: 30 }, // or use next: { revalidate: 300 } for caching
    }
  );

  const res = await response.json();

  const analytics = await res;
  return analytics;
};

export default async function DashboardPageView() {
  const cardList = await fetchData();

  let salesPerMonth = Array(12).fill(0);
  let ordersPerMonth = Array(12).fill(0);


  cardList?.data?.totalYearlySales.forEach((item) => {
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
          <WelcomeCard todayTotalSales={cardList?.data?.todaysTotalSales} />
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
          {cardList?.data?.analytics.map((item, index) => {
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
              amount1={cardList?.data?.totalSoldItems}
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
              amount1={cardList?.data?.totalProducts}
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
          <RecentPurchase recentPurchases={cardList?.data?.recentPurchases} />
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
