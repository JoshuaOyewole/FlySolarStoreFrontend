"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { productsAPI, categoriesAPI } from "../../../lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import DropZone from "../../../components/DropZone";
import FlexBox from "../../../components/flex-box/flex-box";
import { FormProvider, TextField } from "../../../components/form-hook";

// STYLED COMPONENTS
import { UploadImageBox, StyledClear } from "../styles";

// CUSTOM DATA MODEL

// FORM FIELDS VALIDATION SCHEMA
const validationSchema = yup.object({
  title: yup.string().required("Title is required!"),
  price: yup
    .number()
    .required("Price is required!")
    .positive("Price must be positive"),
  summary: yup.string().required("Summary is required!"),
  description: yup.string().required("Description is required!"),
  size: yup.string().optional(),
  colors: yup.string().optional(),
  discount: yup.number().min(0).max(100).optional(),
  category: yup.string().required("Category is required!"),
  catalogue: yup.string().required("Catalogue is required!"),
});

// ================================================================

// ================================================================

export default function ProductForm() {
  const [thumbnail, setThumbnail] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const router = useRouter();

  // Fetch categories for dropdown
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesAPI.getAll({ limit: 100 }),
  });
  
  // Fetch catalogues for dropdown
  const catalogue = [
    {
      _id: 1,
      label: "Flash Deals",
      value: "flash-deals",
    },
    {
      _id: 2,
      label: "Just for you",
      value: "just-for-you",
    },
    {
      _id: 3,
      label: "New Arrivals",
      value: "new-arrivals",
    },
  ];
  const categories =
    categoriesData?.data?.filter((cat) => cat.isFeatured === true) || [];

  const initialValues = {
    title: "",
    price: "",
    summary: "",
    description: "",
    size: "",
    colors: "",
    discount: "",
    category: "",
    catalogue: "",
  };
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  // HANDLE THUMBNAIL UPLOAD
  const handleThumbnailChange = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setThumbnail(file);
    }
  };

  // HANDLE DELETE THUMBNAIL
  const handleDeleteThumbnail = () => {
    if (thumbnail && thumbnail.preview) {
      URL.revokeObjectURL(thumbnail.preview);
    }
    setThumbnail(null);
  };

  // HANDLE PRODUCT IMAGES UPLOAD
  const handleProductImagesChange = (files) => {
    const currentCount = productImages.length;
    const availableSlots = 5 - currentCount;

    if (availableSlots <= 0) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const filesToAdd = files.slice(0, availableSlots);
    filesToAdd.forEach((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setProductImages((prev) => [...prev, ...filesToAdd]);
  };

  // HANDLE DELETE PRODUCT IMAGE
  const handleDeleteProductImage = (index) => () => {
    setProductImages((prev) => {
      const image = prev[index];
      if (image && image.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // CREATE PRODUCT MUTATION
  const createMutation = useMutation({
    mutationFn: (formData) => productsAPI.create(formData),
    onError: (error) => {
      console.error("Create product error:", error);
      toast.error(error?.message || "Failed to create product");
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Product created successfully");
      router.push("/admin/products");
    },
  });

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    // Validate thumbnail and images
    if (!thumbnail) {
      toast.error("Product thumbnail is required");
      return;
    }

    if (productImages.length === 0) {
      toast.error("At least one product image is required");
      return;
    }

    // Create FormData for multipart upload
    const formData = new FormData();

    // Add form fields
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("summary", values.summary);
    formData.append("description", values.description);
    formData.append("size", values.size || "");
    formData.append("colors", values.colors || "");
    formData.append("discount", values.discount || 0);
    formData.append("category", values.category);
    formData.append("catelogue", values.catalogue);

    // Add thumbnail
    formData.append("thumbnail", thumbnail);

    // Add product images
    productImages.forEach((image) => {
      formData.append("images", image);
    });

    // Submit the form
    createMutation.mutate(formData);
  });
  return (
    <Card className="p-3">
      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        <Grid container spacing={3}>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              color="info"
              size="medium"
              placeholder="Product Title"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              name="price"
              color="info"
              size="medium"
              type="number"
              label="Price"
              placeholder="Product Price"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              name="category"
              label="Category"
              placeholder="Select Category"
            >
              <MenuItem value="">
                <em>Select a category</em>
              </MenuItem>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <em>No categories... Kindly add a category</em>
                </MenuItem>
              )}
            </TextField>
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              name="catalogue"
              label="Catalogue"
              placeholder="Select Catalogue"
            >
              <MenuItem value="">
                <em>Select a catalogue</em>
              </MenuItem>
              {catalogue.length > 0 ? (
                catalogue.map((cat) => (
                  <MenuItem key={cat._id} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <em>No catalogues... Kindly add a catalogue</em>
                </MenuItem>
              )}
            </TextField>
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              name="size"
              color="info"
              size="medium"
              label="Sizes (optional)"
              placeholder="e.g., S, M, L, XL"
              helperText="Separate multiple sizes with commas"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              color="info"
              size="medium"
              name="colors"
              label="Colors (optional)"
              placeholder="e.g., Red, Blue, Green"
              helperText="Separate multiple colors with commas"
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              fullWidth
              color="info"
              size="medium"
              type="number"
              name="discount"
              label="Discount (%)"
              placeholder="e.g., 10"
              helperText="Optional discount percentage"
            />
          </Grid>

          <Grid size={12}>
            <TextField
              rows={3}
              multiline
              fullWidth
              color="info"
              size="medium"
              name="summary"
              label="Summary"
              placeholder="Product Summary"
            />
          </Grid>

          <Grid size={12}>
            <TextField
              rows={6}
              multiline
              fullWidth
              color="info"
              size="medium"
              name="description"
              label="Description"
              placeholder="Full Product Description"
            />
          </Grid>

          {/* Thumbnail Upload */}
          <Grid size={12}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Product Thumbnail *
            </Typography>
            <DropZone
              onChange={handleThumbnailChange}
              title="Drop thumbnail image here"
            />
            {thumbnail && (
              <FlexBox flexDirection="row" mt={2} gap={1}>
                <UploadImageBox>
                  <Box
                    component="img"
                    src={thumbnail.preview}
                    width="100%"
                    sx={{ objectFit: "cover" }}
                  />
                  <StyledClear onClick={handleDeleteThumbnail} />
                </UploadImageBox>
              </FlexBox>
            )}
          </Grid>

          {/* Product Images Upload */}
          <Grid size={12}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Product Images (Max 5) *
            </Typography>
            {productImages.length < 5 && (
              <DropZone
                onChange={handleProductImagesChange}
                title={`Drop images here (${productImages.length}/5)`}
              />
            )}
            <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
              {productImages.map((image, index) => (
                <UploadImageBox key={index}>
                  <Box
                    component="img"
                    src={image.preview}
                    width="100%"
                    sx={{ objectFit: "cover" }}
                  />
                  <StyledClear onClick={handleDeleteProductImage(index)} />
                </UploadImageBox>
              ))}
            </FlexBox>
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <Button
              loading={isSubmitting || createMutation.isPending}
              variant="contained"
              color="info"
              type="submit"
              disabled={isSubmitting || createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create Product"}
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
