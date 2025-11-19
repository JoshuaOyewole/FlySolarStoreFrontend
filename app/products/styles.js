import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

// HERO SECTION
export const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0, 8),
  },
}));

// FILTER SECTION
export const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5, 0),
  },
}));

// CATEGORY CHIP
export const CategoryChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  padding: theme.spacing(2, 1),
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
  },
}));

// STATS BOX
export const StatsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));
