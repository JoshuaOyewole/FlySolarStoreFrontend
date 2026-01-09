import Link from "next/link";
//import Image from "next/image";
import { useState } from "react";
//import Avatar from "@mui/material/Avatar";

// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

// GLOBAL CUSTOM COMPONENT
import BazaarSwitch from "../../../components/BazaarSwitch";

// STYLED COMPONENTS
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesAPI } from "../../../lib/api";
import { toast } from "react-toastify";
import DeleteConfirmModal from "./delete-category";

// ========================================================================

// ========================================================================

export default function CategoryRow({ category }) {
  const {
    // image,
    name,
    //level,
    featured,
    id,
    //slug
  } = category;
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const editMutation = useMutation({
    mutationFn: ({ name, featured }) =>
      categoriesAPI.edit(id, { name, isFeatured: featured }),
    onError: (error) => {
      console.log("edit category error", error);
      toast.error("Error updating category", error);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["categories", 1] });
      toast.success(data?.message);
    },
  });

  function handleChange() {
    setFeaturedCategory((state) => !state);
    editMutation.mutate({ name, featured: !featuredCategory });
  }

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{name}</CategoryWrapper>
      </StyledTableCell>

      {/*  <StyledTableCell align="left">
        <Avatar variant="rounded">
          <Image fill alt={name} src={image} sizes="(100%, 100%)" style={{
          objectFit: "contain"
        }} />
        </Avatar>
      </StyledTableCell> 

      <StyledTableCell align="left">{level}</StyledTableCell>
*/}
      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={featuredCategory}
          onChange={handleChange}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <Link href={`/admin/categories/${id}`}>
          <StyledIconButton>
            <Edit />
          </StyledIconButton>
        </Link>

        <StyledIconButton onClick={() => setOpen(true)}>
          <Delete />
        </StyledIconButton>
        
        <DeleteConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          id={id}
          itemName={name}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}
