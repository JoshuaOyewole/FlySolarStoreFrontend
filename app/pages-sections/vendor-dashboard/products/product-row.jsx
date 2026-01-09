import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "../../../components/flex-box/flex-box";
import BazaarSwitch from "../../../components/BazaarSwitch";
import DeleteProductModal from "./delete-product";
import ViewProductModal from "./view-product";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "../../../lib";

// STYLED COMPONENTS
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import { productsAPI } from "../../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// ========================================================================

// ========================================================================

export default function ProductRow({ product }) {
  const { category, name, price, thumbnail, brand, id, published, slug } = product;
  const queryClient = useQueryClient();
  const [productPublish, setProductPublish] = useState(published);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const editMutation = useMutation({
    mutationFn: ({ isActive }) => productsAPI.edit(id, { isActive }),
    onError: (error) => {
      toast.error("Error updating category", error);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["products", 1] });
      toast.success(data?.message);
    },
  });

  function handleChange() {
    setProductPublish((state) => !state);
    editMutation.mutate({ isActive: !productPublish });
  }

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar variant="rounded">
            <Image fill src={thumbnail} alt={name} sizes="(100%, 100%)" />
          </Avatar>

          <div>
            <Typography variant="h6">{name}</Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: 13,
                color: "grey.600",
              }}
            >
              #{id.split("-")[0]}
            </Typography>
          </div>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Box
          sx={{
            width: 55,
            height: 25,
            position: "relative",
            img: {
              objectFit: "contain",
            },
          }}
        >
          {brand ? (
            <Image fill src={brand} alt={name} sizes="(55px, 25px)" />
          ) : (
            "N/A"
          )}
        </Box>
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPublish}
          onChange={handleChange}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <Link href={`/admin/products/${slug}`}>
          <StyledIconButton>
            <Edit />
          </StyledIconButton>
        </Link>

        <StyledIconButton onClick={() => setOpenViewModal(true)}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton onClick={() => setOpenDeleteModal(true)}>
          <Delete />
        </StyledIconButton>

        <DeleteProductModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          id={id}
          itemName={name}
        />

        <ViewProductModal
          open={openViewModal}
          onClose={() => setOpenViewModal(false)}
          product={product}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}
