import Typography from "@mui/material/Typography";
export default function ProductSummary({ summary }) {
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
       {summary}
      </Typography>
    </div>
  );
}
