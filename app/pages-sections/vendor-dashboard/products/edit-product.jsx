"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoriesAPI } from "../../../lib/api";

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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// CUSTOM DATA MODEL

// FORM FIELDS VALIDATION SCHEMA
const validationSchema = yup.object({
  title: yup.string().required("Title is required!"),
  description: yup.string().required("Description is required!"),
  summary: yup.string().required("Summary is required!"),
  price: yup
    .number()
    .required("Price is required!")
    .positive("Price must be positive"),
  category: yup.string().required("Category is required!"),
  catalogue: yup.string().required("Catalogue is required!"),
  sizes: yup.string().optional(),
  colors: yup.string().optional(),
});

// ================================================================

const updateData = async (id, formData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/admin/products/${id}`,
    {
      method: "PUT",
      credentials: "include",
      body: formData,
    }
  );
  if (!response.ok) {
    console.error("Error updating product:", response);
    throw new Error(response.statusText);
  }
  return response.json();
};

// ================================================================

export default function EditProductForm({ product }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const router = useRouter();
  // Initialize images from product data
  useEffect(() => {
    if (product?.thumbnail) {
      setThumbnail({ preview: product.thumbnail, existing: true });
    }
    if (product?.images && Array.isArray(product.images)) {
      setProductImages(
        product.images.map((img) => ({ preview: img, existing: true }))
      );
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: (formData) => updateData(product._id, formData),
    onError: (error) => {
      toast.error("Error updating product", error);
    },
    onSuccess: (data) => {
      toast.success("Product updated successfully");
      router.push("/admin/products");
    },
  });
  // Fetch categories for dropdown
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesAPI.getAll({ limit: 100 }),
  });

  const categories = categoriesData?.data || [];

  const initialValues = {
    title: product?.title || "",
    description: product?.description || "",
    summary: product?.summary || "",
    price: product?.price || "",
    category: product?.category || "",
    catalogue: product?.catelogue || "",
    sizes: product?.sizes?.join(", ") || "",
    colors: product?.colors?.join(", ") || "",
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
    if (thumbnail && !thumbnail.existing) {
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
      // Only revoke URL if it's a newly uploaded file (not an existing URL)
      if (
        image &&
        !image.existing &&
        image.preview &&
        image.preview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit((values) => {
    // Separate existing URLs from new uploads
    const existingImages = productImages
      .filter((img) => img.existing)
      .map((img) => img.preview);
    const newImages = productImages.filter((img) => !img.existing);

    // Create FormData for multipart upload
    const formData = new FormData();

    // Add form fields
    Object.keys(values).forEach((key) => {
      if (values[key] !== null && values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    });

    // Add thumbnail (either keep existing URL or upload new file)
    if (thumbnail) {
      if (thumbnail.existing) {
        formData.append("existingThumbnail", thumbnail.preview);
      } else {
        formData.append("thumbnail", thumbnail);
      }
    }

    // Add existing image URLs to keep
    formData.append("existingImages", JSON.stringify(existingImages));

    // Add new images to upload
    newImages.forEach((image) => {
      formData.append("images", image);
    });

    // TODO: Send formData to API
    mutation.mutate(formData);
  });
  return (
    <Card className="p-3">
      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        <Grid container spacing={3}>
          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
            <TextField
              fullWidth
              name="title"
              label="Title"
              color="info"
              size="medium"
              placeholder="Product Title"
            />
          </Grid>

          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
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
          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
            <TextField
              select
              fullWidth
              color="info"
              size="medium"
              name="category"
              label="Category"
              placeholder="Select Category"
              SelectProps={{
                displayEmpty: true,
              }}
            >
              <MenuItem value="">
                <em>Select a category</em>
              </MenuItem>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <em>Loading categories...</em>
                </MenuItem>
              )}
            </TextField>
          </Grid>

          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
            <TextField
              fullWidth
              name="catalogue"
              label="Catalogue"
              color="info"
              size="medium"
              placeholder="Catalogue"
            />
          </Grid>

          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
            <TextField
              fullWidth
              name="sizes"
              color="info"
              size="medium"
              label="Sizes (optional)"
              placeholder="e.g., S, M, L, XL"
              helperText="Separate multiple sizes with commas"
            />
          </Grid>

          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
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
              Product Thumbnail
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
              Product Images (Max 5)
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

          <Grid
            size={{
              sm: 6,
              xs: 12,
            }}
          >
            <Button
              loading={mutation.isPending}
              variant="contained"
              color="info"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update Product"}
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
