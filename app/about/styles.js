import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// HERO SECTION
export const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(12, 0, 8),
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(8, 0, 6),
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%",
    height: "100%",
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
}));

// STATS CARD
export const StatsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  textAlign: "center",
  height: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

// VALUE CARD
export const ValueCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "all 0.3s ease",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    borderColor: theme.palette.primary.main,
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
}));

// ICON WRAPPER
export const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(2),
  "& svg": {
    fontSize: 40,
  },
}));

// CTA SECTION
export const CTASection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 10),
  color: theme.palette.primary.dark,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(10, 0),
  },
}));

// STATS SECTION WRAPPER
export const StatsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.grey[50],
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(10, 0),
  },
}));

// STORY SECTION WRAPPER
export const StorySection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0),
  },
}));

// MISSION SECTION WRAPPER
export const MissionSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.grey[50],
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0),
  },
}));

// VALUES SECTION WRAPPER
export const ValuesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0),
  },
}));

// MISSION CARD
export const MissionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  borderLeft: `6px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5),
  },
}));

// VISION CARD
export const VisionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  borderLeft: `6px solid ${theme.palette.secondary.main}`,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5),
  },
}));

// STORY IMAGE PLACEHOLDER
export const StoryImageBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 300,
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    height: 400,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
  },
}));

// SECTION HEADER BOX
export const SectionHeaderBox = styled(Box)({
  textAlign: "center",
  marginBottom: 48,
});

// CTA CONTENT BOX
export const CTAContentBox = styled(Box)({
  textAlign: "center",
});

// BUTTON BOX
export const ButtonBox = styled(Box)({
  display: "flex",
  gap: 16,
  justifyContent: "center",
  flexWrap: "wrap",
});
