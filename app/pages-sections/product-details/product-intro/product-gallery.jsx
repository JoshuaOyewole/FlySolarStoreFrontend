"use client";

import Image from "next/image";
import { useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

// STYLED COMPONENTS
import { PreviewImage, ProductImageWrapper, GalleryContainer, ThumbnailsWrapper } from "./styles";

export default function ProductGallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [openZoom, setOpenZoom] = useState(false);


  const handleOpenZoom = () => setOpenZoom(true);
  const handleCloseZoom = () => setOpenZoom(false);

  return (
    <GalleryContainer>
      {/* THUMBNAILS - Left side on desktop */}
      <ThumbnailsWrapper>
        {images.map((url, ind) => (
          <PreviewImage
            key={ind}
            onClick={() => setCurrentImage(ind)}
            selected={currentImage === ind}
          >
            <Image fill alt="product" src={url} sizes="80px" style={{ objectFit: "cover" }} />
          </PreviewImage>
        ))}
      </ThumbnailsWrapper>

      {/* MAIN IMAGE */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <ProductImageWrapper onClick={handleOpenZoom} sx={{ cursor: "zoom-in" }}>
          <Image
            fill
            alt="product"
            src={images[currentImage]}
            sizes="(max-width: 768px) 100vw, 600px"
            style={{ objectFit: "contain" }}
            priority
          />
          
          {/* Zoom Icon Overlay */}
          <IconButton
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <ZoomInIcon />
          </IconButton>
        </ProductImageWrapper>
      </Box>

      {/* ZOOM DIALOG */}
      <Dialog
        open={openZoom}
        onClose={handleCloseZoom}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            maxHeight: "90vh",
          },
        }}
      >
        <IconButton
          onClick={handleCloseZoom}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            zIndex: 1,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            fill
            alt="product zoomed"
            src={images[currentImage]}
            sizes="100vw"
            style={{ objectFit: "contain" }}
            quality={100}
          />
        </Box>

        {/* Thumbnail Navigation in Zoom */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            p: 2,
            overflowX: "auto",
          }}
        >
          {images.map((url, ind) => (
            <Box
              key={ind}
              onClick={() => setCurrentImage(ind)}
              sx={{
                width: 60,
                height: 60,
                position: "relative",
                cursor: "pointer",
                borderRadius: 1,
                overflow: "hidden",
                border: currentImage === ind ? "2px solid white" : "2px solid transparent",
                opacity: currentImage === ind ? 1 : 0.5,
                transition: "all 0.2s",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <Image
                fill
                alt="thumbnail"
                src={url}
                sizes="60px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>
      </Dialog>
    </GalleryContainer>
  );
}