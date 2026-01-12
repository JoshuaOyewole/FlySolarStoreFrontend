import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ProductDescription({ productDescription }) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "80%",lg:"70%" },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 2,
          mt: 7,
        }}
      >
        Product Details
      </Typography>

      {productDescription ? (
        <div dangerouslySetInnerHTML={{ __html: productDescription }} />
      ) : (
        <div>
          Brand: Beats <br />
          Model: S450 <br />
          Wireless Bluetooth Headset <br />
          FM Frequency Response: 87.5 – 108 MHz <br />
          Feature: FM Radio, Card Supported (Micro SD / TF) <br />
          Made in China <br />
        </div>
      )}
    </Box>
  );
}
