import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// HERO SECTION
export const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(10, 0, 8),
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(8, 0, 6),
  },
}));

// SEARCH SECTION
export const SearchSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.grey[50],
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 0),
  },
}));

// CATEGORY CHIP
export const CategoryChip = styled(Chip)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  padding: theme.spacing(2, 1),
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[2],
  },
}));

// BLOG GRID
export const BlogGrid = styled(Grid)({
  "& > *": {
    display: "flex",
  },
});

// FEATURED BLOG CARD
export const FeaturedBlogCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  boxShadow: theme.shadows[3],
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[8],
    transform: "translateY(-4px)",
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
}));
