"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DropZone from "../../../components/DropZone";
import { carouselAPI } from "../../../lib/api";

// VALIDATION SCHEMA
const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required").max(100, "Title must be less than 100 characters"),
  description: yup.string(),
  buttonText: yup.string(),
  buttonLink: yup.string(),
  type: yup.string().required("Type is required"),
});

const CAROUSEL_TYPES = [
  { value: "hero", label: "Hero Banner" },
  { value: "promo", label: "Promo Banner" },
  { value: "category", label: "Category Banner" },
];

export default function EditCarouselForm({ carousel }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadedImage, setUploadedImage] = useState(null);

  // UPDATE MUTATION
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => carouselAPI.edit(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carousels"] });
      toast.success("Carousel updated successfully");
      router.push("/admin/carousel");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update carousel");
    },
  });

  const INITIAL_VALUES = {
    title: carousel?.title || "",
    description: carousel?.description || "",
    buttonText: carousel?.buttonText || "",
    buttonLink: carousel?.buttonLink || "",
    type: carousel?.type || "hero",
  };

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.buttonText) formData.append("buttonText", values.buttonText);
    if (values.buttonLink) formData.append("buttonLink", values.buttonLink);
    formData.append("type", values.type);
    
    // Only append image if a new one was uploaded
    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }

    updateMutation.mutate({ id: carousel._id, formData });
  };

  return (
    <Box py={4}>
      <Card sx={{ p: 6 }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          validateOnChange={false}
          validateOnBlur={true}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    name="title"
                    label="Title"
                    color="info"
                    size="medium"
                    placeholder="Enter carousel title"
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    name="description"
                    label="Description"
                    color="info"
                    size="medium"
                    placeholder="Enter carousel description"
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    name="buttonText"
                    label="Button Text"
                    color="info"
                    size="medium"
                    placeholder="Shop Now"
                    value={values.buttonText}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.buttonText && errors.buttonText)}
                    helperText={touched.buttonText && errors.buttonText}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    name="buttonLink"
                    label="Button Link"
                    color="info"
                    size="medium"
                    placeholder="https://example.com"
                    value={values.buttonLink}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.buttonLink && errors.buttonLink)}
                    helperText={touched.buttonLink && errors.buttonLink}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    select
                    fullWidth
                    name="type"
                    label="Type"
                    color="info"
                    size="medium"
                    value={values.type}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.type && errors.type)}
                    helperText={touched.type && errors.type}
                  >
                    {CAROUSEL_TYPES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  {carousel?.imgUrl && !uploadedImage && (
                    <Box mb={2}>
                      <Avatar
                        src={carousel.imgUrl}
                        alt={carousel.title}
                        variant="rounded"
                        sx={{ width: "100%", height: 200, objectFit: "cover" }}
                      />
                    </Box>
                  )}
                  <DropZone
                    onChange={(files) => {
                      if (files && files.length > 0) {
                        setUploadedImage(files[0]);
                      }
                    }}
                    title={uploadedImage ? "New image selected" : "Drop new image to replace current"}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? "Updating..." : "Update Carousel"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
