import Link from "next/link";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "../../../components/flex-box/flex-box";
import BazaarSwitch from "../../../components/BazaarSwitch";

// STYLED COMPONENTS
import { StyledTableRow, StyledTableCell, StyledIconButton } from "../styles";
import { blogAPI } from "../../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DeleteBlogModal from "./delete-blog";
import ViewBlogModal from "./view-blog";

export default function BlogRow({ blog }) {
  const { _id, title, category, thumbnailUrl, isPublished, createdAt, slug } =
    blog;

  const queryClient = useQueryClient();
  const [blogPublish, setBlogPublish] = useState(isPublished);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [openViewModal, setOpenViewModal] = useState(false);

  const editMutation = useMutation({
    mutationFn: (blogData) => blogAPI.edit(_id, blogData),
    onError: (error) => {
      console.error("Error updating blog:", error.message);
      toast.error("Error updating blog", error.message);
      setBlogPublish(!blogPublish);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog updated successfully");
    },
  });

  function handleChange() {
    const newPublishState = !blogPublish;
    setBlogPublish(newPublishState);
    const blogData = new FormData();
    blogData.append("isPublished", newPublishState);
    editMutation.mutate(blogData);
  }

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar
            variant="rounded"
            src={thumbnailUrl}
            sx={{ width: 50, height: 50 }}
          />
          <Typography fontSize={14} fontWeight={600}>
            {title}
          </Typography>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">{category || "N/A"}</StyledTableCell>

      <StyledTableCell align="left">
        {createdAt ? format(new Date(createdAt), "MMM dd, yyyy") : "Draft"}
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={blogPublish}
          onChange={handleChange}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <Link href={`/admin/blogs/${slug}`}>
          <StyledIconButton>
            <Edit />
          </StyledIconButton>
        </Link>

       {/*  <StyledIconButton onClick={() => setOpenViewModal(true)}>
          <RemoveRedEye />
        </StyledIconButton> */}

        <StyledIconButton onClick={() => setOpenDeleteModal(true)}>
          <Delete />
        </StyledIconButton>

        <DeleteBlogModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          id={_id}
          itemName={title}
        />

        {/* <ViewBlogModal
          open={openViewModal}
          onClose={() => setOpenViewModal(false)}
          blog={blog}
        /> */}
      </StyledTableCell>
    </StyledTableRow>
  );
}
