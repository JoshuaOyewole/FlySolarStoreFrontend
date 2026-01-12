"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { blogAPI } from "../../../lib/api";
import { Box, Typography, MenuItem, CircularProgress } from "@mui/material";
import Image from "next/image";
import DropZone from "../../../components/DropZone";
import RichTextEditor from "../../../components/RichTextEditor";

// VALIDATION SCHEMA
const validationSchema = yup.object({
  title: yup.string().required("Title is required!"),
  description: yup.string().required("Description is required!"),
  content: yup.string().required("Content is required!"),
  category: yup.string().required("Category is required!"),
  tags: yup.string().optional(),
});

// BLOG CATEGORIES
const blogCategories = [
  "Solar Energy",
  "Renewable Energy",
  "Technology",
  "Installation Guides",
  "Product Reviews",
  "News & Updates",
  "Tips & Tricks",
  "Case Studies",
];

export default function EditBlogForm({ blog }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const router = useRouter();

  const initialValues = {
    title: blog?.title || "",
    description: blog?.description || "",
    content: blog?.content || "",
    category: blog?.category || "",
    author: blog?.author || "",
    tags: blog?.tags?.join(", ") || "",
  };

  const updateMutation = useMutation({
    mutationFn: (formData) => blogAPI.edit(blog._id, formData),
    onError: (error) => {
      toast.error(error?.message || "Error updating blog");
    },
    onSuccess: () => {
      toast.success("Blog updated successfully");
      router.push("/admin/blogs");
    },
  });

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", values.content);
    formData.append("category", values.category);
    formData.append("author", values.author._id);
    formData.append("tags", values.tags);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    if (coverImage) {
      formData.append("coverImg", coverImage);
    }
    updateMutation.mutate(formData);
  };

  return (
    <Card sx={{ p: 6 }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid size={{ sm: 12, xs: 12 }}>
                <TextField
                  fullWidth
                  name="title"
                  label="Blog Title"
                  color="info"
                  size="medium"
                  placeholder="Enter blog title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Grid>

              {/* Description */}
              <Grid size={{ sm: 12, xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="description"
                  label="Short Description"
                  color="info"
                  size="medium"
                  placeholder="Brief description for blog preview"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              {/* Content */}
              <Grid size={{ sm: 12, xs: 12 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
                  Blog Content *
                </Typography>
                <RichTextEditor
                  value={values.content}
                  onChange={(html) => {
                    values.content = html;
                  }}
                  error={Boolean(touched.content && errors.content)}
                  helperText={touched.content && errors.content}
                  placeholder="Write your blog content here..."
                />
              </Grid>

              {/* Category and Author */}
              <Grid size={{ sm: 6, xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  label="Category"
                  placeholder="Select Category"
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.category && errors.category)}
                  helperText={touched.category && errors.category}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {blogCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  name="authorName"
                  label="Author Name"
                  color="info"
                  size="medium"
                  disabled
                  placeholder="Enter author name"
                  value={`${blog?.author.firstName} ${blog?.author.lastName}`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.author && errors.author)}
                  helperText={touched.author && errors.author}
                />
              </Grid>

              {/* Tags */}
              <Grid size={{ sm: 12, xs: 12 }}>
                <TextField
                  fullWidth
                  name="tags"
                  label="Tags"
                  color="info"
                  size="medium"
                  placeholder="Enter tags separated by commas"
                  value={values.tags}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.tags && errors.tags)}
                  helperText={
                    (touched.tags && errors.tags) ||
                    "Separate multiple tags with commas"
                  }
                />
              </Grid>

              {/* Thumbnail Upload */}
              <Grid size={{ sm: 6, xs: 12 }}>
                <Typography variant="h6" mb={2}>
                  Thumbnail Image
                </Typography>
                <DropZone
                  onChange={(files) => setThumbnail(files[0])}
                  title="Drag & drop new thumbnail (optional)"
                />
                <Box sx={{ mt: 2, position: "relative", height: 200 }}>
                  <Image
                    src={
                      thumbnail
                        ? URL.createObjectURL(thumbnail)
                        : blog?.thumbnailUrl || "/placeholder.png"
                    }
                    alt="Thumbnail"
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                </Box>
              </Grid>

              {/* Cover Image Upload */}
              <Grid size={{ sm: 6, xs: 12 }}>
                <Typography variant="h6" mb={2}>
                  Cover Image
                </Typography>
                <DropZone
                  onChange={(files) => setCoverImage(files[0])}
                  title="Drag & drop new cover image (optional)"
                />
                <Box sx={{ mt: 2, position: "relative", height: 200 }}>
                  <Image
                    src={
                      coverImage
                        ? URL.createObjectURL(coverImage)
                        : blog?.coverImgUrl || "/placeholder.png"
                    }
                    alt="Cover"
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid size={{ sm: 12, xs: 12 }}>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  disabled={updateMutation.isPending}
                  sx={{ minWidth: 200 }}
                >
                  {updateMutation.isPending ? "Updating..." : "Update Blog"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
