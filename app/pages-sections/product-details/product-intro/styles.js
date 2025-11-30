"use client";

import { styled } from "@mui/material/styles";
export const StyledRoot = styled("div")(({
  theme
}) => ({
  width: "100%",
  padding: "1.5rem",
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  "& strong": {
    fontWeight: 600
  },
  "& .rating": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  "& .price": {
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  "& .shop": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1)
  },
  "& .variant-group": {
    gap: "0.5rem",
    display: "flex",
    alignItems: "center",
    "& .MuiChip-root": {
      height: 28,
      cursor: "pointer",
      borderRadius: "6px"
    }
  }
}));
// GALLERY CONTAINER
export const GalleryContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexDirection: "column",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
  },
}));

// THUMBNAILS WRAPPER
export const ThumbnailsWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  justifyContent: "center",
  overflowX: "auto",
  padding: theme.spacing(1, 0),
  [theme.breakpoints.up("lg")]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    overflowY: "auto",
    overflowX: "visible",
    maxHeight: 500,
    width: 100,
    padding: 0,
  },
}));

export const ProductImageWrapper = styled("div")(({
  theme
}) => ({
  height: 500,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  justifyContent: "center",
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
  "& img": {
    objectFit: "contain"
  },
  [theme.breakpoints.down("sm")]: {
    height: 350
  },
}));

export const PreviewImage = styled("div", {
  shouldForwardProp: prop => prop !== "selected"
})(({
  theme,
  selected
}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  overflow: "hidden",
  width: 80,
  height: 80,
  cursor: "pointer",
  position: "relative",
  backgroundColor: "white",
  opacity: selected ? 1 : 0.6,
  transition: "all 0.2s ease-in-out",
  border: `2px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
  flexShrink: 0,
  "&:hover": {
    opacity: 1,
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down("lg")]: {
    width: 64,
    height: 64,
  },
}));