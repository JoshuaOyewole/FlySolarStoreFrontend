import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

// ==============================================================

// ==============================================================

export default function ShippingAddress({ address }) {
  const addressDetails =
    address.address + ", " + address.state + ", " + address.country.label;

  return (
    <Card
      sx={{
        px: 3,
        py: 4,
      }}
    >
      <TextField
        rows={5}
        multiline
        fullWidth
        color="info"
        variant="outlined"
        label="Shipping Address"
        defaultValue={addressDetails}
        sx={{
          mb: 4,
        }}
        slotProps={{ input: { readOnly: true } }}
      />
      <Typography
        variant="h6"
        sx={{
          mb: 1,
        }}
      >
        Customer's Details:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          color: "text.secondary",
        }}
      >
        <span style={{ fontWeight: "600" }}>Full Names: </span>{" "}
        {`${address.name}`}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          color: "text.secondary",
        }}
      >
        <span style={{ fontWeight: "600" }}>Email: </span> {`${address.email}`}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 4,
          color: "text.secondary",
        }}
      >
        <span style={{ fontWeight: "600" }}>Phone: </span>{" "}
        {`${address.contact}`}
      </Typography>

     {/*  <TextField
        rows={5}
        multiline
        fullWidth
        color="info"
        variant="outlined"
        label="Customer's Note"
        defaultValue="Please deliver ASAP."
        slotProps={{ input: { readOnly: true } }}
      /> */}
    </Card>
  );
}
