"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { carouselAPI } from "../../../lib/api";
import DropZone from "../../../components/DropZone";

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

export default function CarouselForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // CREATE MUTATION
  const createMutation = useMutation({
    mutationFn: (formData) => carouselAPI.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carousels"] });
      toast.success("Carousel created successfully");
      router.push("/admin/carousel");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create carousel");
    },
  });

  const INITIAL_VALUES = {
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    type: "hero",
  };

  const handleFormSubmit = async (values) => {
    if (!uploadedImage) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.buttonText) formData.append("buttonText", values.buttonText);
    if (values.buttonLink) formData.append("buttonLink", values.buttonLink);
    formData.append("type", values.type);
    formData.append("image", uploadedImage);

    // Log FormData contents for debugging

    createMutation.mutate(formData);
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
                  <DropZone
                    onChange={(files) => {
                      if (files && files.length > 0) {
                        const file = files[0];
                        setUploadedImage(file);
                        
                        // Create preview URL
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    title="Drop carousel image here"
                  />
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <Box mt={2} sx={{ position: 'relative', display: 'inline-block' }}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '300px',
                          borderRadius: '8px',
                          border: '1px solid #ddd'
                        }} 
                      />
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          setUploadedImage(null);
                          setImagePreview(null);
                        }}
                        sx={{ mt: 1 }}
                      >
                        Remove Image
                      </Button>
                    </Box>
                  )}
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? "Creating..." : "Create Carousel"}
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
