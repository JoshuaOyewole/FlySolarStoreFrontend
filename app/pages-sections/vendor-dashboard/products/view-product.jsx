import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { currency } from "../../../lib";

export default function ViewProductModal({ open, onClose, product }) {
  if (!product) return null;

  const {
    name,
    price,
    thumbnail,
    images,
    category,
    brand,
    id,
    published,
  // slug,
    description,
    summary,
    size,
    colors,
  } = product;


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="view-product-dialog-title"
    >
      <DialogTitle id="view-product-dialog-title" style={{fontWeight:"bolder"}}>
        Product Details
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Product Thumbnail */}
          <Grid item xs={12} md={6} sx={{width:"300px"}}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Thumbnail
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 300,
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "grey.100",
                mb: 2,
              }}
            >
              {thumbnail ? (
                <Image
                  fill
                  src={thumbnail}
                  alt={name}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Typography color="text.secondary">No thumbnail</Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {name}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              SKU: #{id?.split("-")[0]}
            </Typography>

            <Typography variant="h6" color="primary.main" my={2}>
              {currency(price)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box mb={2}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Category
              </Typography>
              <Chip label={category || "N/A"} size="small" color="primary" />
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Status
              </Typography>
              <Chip
                label={published ? "Published" : "Draft"}
                size="small"
                color={published ? "success" : "default"}
              />
            </Box>

            {brand && (
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Brand
                </Typography>
                <Typography variant="body2">{brand}</Typography>
              </Box>
            )}

            {size && (
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Available Sizes
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                    <Chip  label={size} size="small" variant="outlined" />
                </Box>
              </Box>
            )}

            {colors && colors.length > 0 && (
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Available Colors
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {colors.map((color, index) => (
                    <Chip key={index} label={color} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>

          {/* Summary */}
          {summary && (
            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Summary
              </Typography>
              <Typography variant="body2" paragraph>
                {summary}
              </Typography>
            </Grid>
          )}

          {/* Description */}
          {description && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Grid>
          )}

          {/* Product Images */}
          {images && images.length > 0 && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Product Images ({images.length})
              </Typography>
              <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                mt={2}
              >
                {images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: 150,
                      height: 150,
                      borderRadius: 1,
                      overflow: "hidden",
                      bgcolor: "grey.100",
                      border: "1px solid",
                      borderColor: "grey.300",
                    }}
                  >
                    <Image
                      fill
                      src={img}
                      alt={`${name} - ${index + 1}`}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
