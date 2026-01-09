import Typography from "@mui/material/Typography";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ArrowBack";
// ==============================================================

// ==============================================================

export default function PageWrapper({ children, title, href }) {

  return (
    <div className="pt-2 pb-2">
      {href && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "26px",
          }}
        >
          <Link href={href}>
            <ChevronLeftIcon /> Go Back
          </Link>
        </div>
      )}
      <Typography
        variant="h3"
        sx={{
          mb: 2,
        }}
      >
        {title}
      </Typography>

      {children}
    </div>
  );
}
