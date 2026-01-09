import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesAPI } from "../../../lib/api";
import { toast } from "react-toastify";

export default function DeleteConfirmModal({
  open,
  onClose,
  itemName = "this item",
  id,
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => categoriesAPI.delete(id),
    onError: (error) => {
      console.error("delete category error", error);
      toast.error("Error deleting category", error);
      onClose(); // Close the modal after confirming
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["categories", 1] });
      toast.success(data?.message);
      onClose(); // Close the modal after confirming
    },
  });

  function onConfirm() {
    mutation.mutate();
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      disableRestoreFocus
    >
      <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>

      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete {itemName}?
          <br /> This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          color="error"
          disabled={mutation.isPending}
          onClick={onConfirm}
          variant="contained"
          autoFocus
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
