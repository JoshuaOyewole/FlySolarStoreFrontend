import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { blogAPI } from "../../../lib/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DeleteBlogModal({ open, onClose, id, itemName }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => blogAPI.delete(id),
    onError: (error) => {
      toast.error(error?.message || "Error deleting blog");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully");
      onClose();
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Blog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete "{itemName}"? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
