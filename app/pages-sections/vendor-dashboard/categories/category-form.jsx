"use client";
import { categoriesAPI } from "../../../lib/api";
//import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// MUI
//import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
//import MenuItem from "@mui/material/MenuItem";

// GLOBAL CUSTOM COMPONENTS
/* import DropZone from "../../../components/DropZone";
import FlexBox from "../../../components/flex-box/flex-box"; */
import {
  Checkbox,
  FormProvider,
  TextField,
} from "../../../components/form-hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// STYLED COMPONENTS
//import { UploadImageBox, StyledClear } from "../styles";

// CUSTOM DATA MODEL

// FORM FIELDS VALIDATION
const validationSchema = yup.object().shape({
  name: yup.string().required("Name required"),
});

// ================================================================

// ================================================================

export default function CategoryForm({ details = null, type = "create" }) {
  // const [files, setFiles] = useState([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const initialValues = {
    name: details?.name || "",
    featured: details?.isFeatured || false,
  };
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const editMutation = useMutation({
    mutationFn: ({ name, isFeatured }) =>
      categoriesAPI.edit(details._id, { name, isFeatured }),
    onError: (error) => {
      console.log("edit category error", error);
      toast.error("Error updating category", error);
    },
    onSuccess: async (data) => {
      /*  await queryClient.invalidateQueries({ queryKey: ["categories", 1] }); */
      methods.reset(initialValues);
      toast.success(data?.message);
      router.push("/admin/categories");
    },
  });
  const mutation = useMutation({
    mutationFn: ({ name, isFeatured }) =>
      categoriesAPI.create({ name, isFeatured }),
    onError: (error) => {
      toast.error("Category created successfully", error);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["categories", 1] });
      methods.reset(initialValues);
      toast.success(data?.message);
      router.push("/admin/categories");
    },
  });
  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit((values) => {
    if (type === "edit") {
      // Edit category logic to be implemented
      editMutation.mutate({ name: values.name, isFeatured: values.featured });
      return;
    }
    mutation.mutate({ name: values.name, isFeatured: values.featured });
  });

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  /*  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  }; */

  // HANDLE DELETE UPLOAD IMAGE
  /*  const handleFileDelete = file => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  }; */
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
              name="name"
              label="Name"
              color="info"
              size="medium"
              placeholder="Name"
            />
          </Grid>
          {/* 
          <Grid size={{
          sm: 6,
          xs: 12
        }}>
            <TextField select fullWidth color="info" size="medium" name="parent" placeholder="Parent Category" label="Select Parent Category">
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
            </TextField>
          </Grid> 

          <Grid size={12}>
            <DropZone onChange={(files) => handleChangeDropZone(files)} />

            <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
              {files.map((file, index) => {
                return (
                  <UploadImageBox key={index}>
                    <Box
                      component="img"
                      alt="product"
                      src={file.preview}
                      width="100%"
                    />
                    <StyledClear onClick={handleFileDelete(file)} />
                  </UploadImageBox>
                );
              })}
            </FlexBox>
          </Grid>
          */}
          <Grid
            size={{
              sm: 12,
              xs: 12,
            }}
          >
            <Checkbox color="info" name="featured" label="Featured Category" />
          </Grid>

          <Grid size={12}>
            <Button
              loading={isSubmitting}
              variant="contained"
              color="info"
              type="submit"
            >
              {type === "edit" ? "Edit category" : "Save category"}
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
