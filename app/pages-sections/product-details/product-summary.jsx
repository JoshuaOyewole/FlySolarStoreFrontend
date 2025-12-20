import Typography from "@mui/material/Typography";
export default function ProductSummary() {
  return (
    <div>
      {/* <Typography
        variant="h3"
        sx={{
          mb: 2,
        }}
      >
        Product Summary
      </Typography> */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        This stylish and functional backpack is perfect for everyday use. Made
        from durable materials, it features multiple compartments to keep your
        belongings organized. The padded straps ensure comfort during extended
        wear, making it ideal for students, professionals, or travelers. With
        its sleek design and practical features, this backpack is a must-have
        accessory for anyone on the go.
      </Typography>
    </div>
  );
}
