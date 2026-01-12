import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import Image from "next/image";
import { format } from "date-fns";

export default function ViewBlogModal({ open, onClose, blog }) {
  if (!blog) return null;

  const {
    title,
    description,
    category,
    thumbnailUrl,
    coverImgUrl,
    tags,
    publishedAt,
    author,
  } = blog;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          {thumbnailUrl && (
            <Box
              sx={{ position: "relative", width: "100%", height: 300, mb: 2 }}
            >
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </Box>
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Category
          </Typography>
          <Typography variant="body1">{category || "N/A"}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Author
          </Typography>
          <Typography variant="body1">
            {`${author?.firstname} ${author?.lastname}` || "N/A"}
          </Typography>
        </Box>

        {tags && tags.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Published Date
          </Typography>
          <Typography variant="body1">
            {publishedAt
              ? format(new Date(publishedAt), "MMMM dd, yyyy")
              : "Not published"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
