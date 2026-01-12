"use client";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useRouter } from "next/navigation";
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

export default function CarouselRow({ carousel, onDelete }) {
  const router = useRouter();
  const { _id, title, imgUrl, buttonText, type } = carousel;

  return (
    <TableRow hover>
      <TableCell>
        <Avatar
          src={imgUrl}
          alt={title}
          variant="rounded"
          sx={{ width: 80, height: 50 }}
        />
      </TableCell>

      <TableCell sx={{ fontWeight: 600 }}>{title}</TableCell>

      <TableCell>{buttonText || "-"}</TableCell>

      <TableCell>
        <Chip
          size="small"
          label={type}
          color={type === "hero" ? "primary" : "secondary"}
        />
      </TableCell>

      <TableCell align="center">
        <IconButton
          onClick={() => router.push(`/admin/carousel/${_id}`)}
          color="info"
        >
          <Edit fontSize="small" />
        </IconButton>

        <IconButton onClick={() => onDelete(_id)} color="error">
          <Delete fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
