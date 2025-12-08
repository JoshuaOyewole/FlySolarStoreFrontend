import Grid from "@mui/material/Grid";

// LOCAL CUSTOM COMPONENTS
import Sales from "../sales";
import Card1 from "../card-1";
import Analytics from "../analytics";
import WelcomeCard from "../welcome-card";
import RecentPurchase from "../recent-purchase";
import mockData from "../../../../data/market-1/data";

// DATA TYPES

export default async function DashboardPageView() {
  const { cardList } = mockData;
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
          <WelcomeCard />
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
          {cardList.map((item) => (
            <Grid
              size={{
                sm: 6,
                xs: 12,
              }}
              key={item.id}
            >
              <Card1
                title={item.title}
                color={item.color}
                amount1={item.amount1}
                amount2={item.amount2}
                percentage={item.percentage}
                status={item.status === "down" ? "down" : "up"}
              />
            </Grid>
          ))}
          <Sales />
        </Grid>

        {/* SALES AREA */}
        {/*  <Grid size={12}>
          <Sales />
        </Grid> */}

        {/* ANALYTICS AREA */}
        <Grid size={12}>
          <Analytics />
        </Grid>

        {/* RECENT PURCHASE AREA */}
        <Grid size={12}>
          <RecentPurchase />
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
