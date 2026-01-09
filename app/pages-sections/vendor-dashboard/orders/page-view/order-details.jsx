"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
//import Button from "@mui/material/Button";

// LOCAL CUSTOM COMPONENT
import OrderActions from "../order-actions";
import TotalSummery from "../total-summery";
import PageWrapper from "../../page-wrapper";
import OrderedProduct from "../ordered-product";
import ShippingAddress from "../shipping-address";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function OrderDetailsPageView({ order }) {
  const details = order.data;

  return (
    <PageWrapper title="Order Details" href={"/admin/orders"} >
      <Grid container spacing={3}>
        <Grid size={12}>
          <Card
            sx={{
              p: 3,
            }}
          >
            {/* ADD PRODUCT & CHANGE ORDER STATUS ACTION  */}
            <OrderActions
              id={details._id}
              createdAt={details.createdAt}
              status={details.status}
            />

            {/* ORDERED PRODUCT LIST */}
            {details.items.map((item) => (
              <OrderedProduct product={item} key={item._id} />
            ))}
          </Card>
        </Grid>

        {/* SHIPPING ADDRESS & CUSTOMER NOTES */}
        <Grid
          size={{
            md: 6,
            xs: 12,
          }}
        >
          <ShippingAddress address={details.shippingAddress} />
        </Grid>

        {/* TOTAL SUMMERY OF ORDER */}
        <Grid
          size={{
            md: 6,
            xs: 12,
          }}
        >
          <TotalSummery total={details.total} discount={details.discount} />
        </Grid>

        {/* CHANGE BUTTON */}
        {/*  <Grid size={12}>
          <Button variant="contained" color="info">
            Save Changes
          </Button>
        </Grid> */}
      </Grid>
    </PageWrapper>
  );
}
