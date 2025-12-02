"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

// MUI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "../../../components/form-hook";

// CONTEXTS AND API
import { useAuth } from "../../../contexts/AuthContext";
import { authAPI } from "../../../lib/api";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  contact: yup.string(),
  birthOfDate: yup.date()
});


// ==============================================================


// ==============================================================

export default function ProfileEditForm({
  user
}) {
  const router = useRouter();
  const { updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  
  const initialValues = {
    email: user?.email || "",
    contact: user?.phone || "",
    lastName: user?.name?.lastName || "",
    firstName: user?.name?.firstName || "",
    birthOfDate: user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date()
  };
  
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });
  
  const {
    control,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = methods;
  
  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      setError("");
      
      // Transform data to match backend API
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.contact,
        dateOfBirth: values.birthOfDate?.toISOString()
      };
      
      const response = await authAPI.updateProfile(updateData);
      
      if (response.success) {
        // Update the user in auth context
        updateUserProfile(response.data.user);
        toast.success("Profile updated successfully!");
        router.push("/profile");
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to update profile. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  });
  return <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && (
        <div style={{ 
          padding: "12px", 
          marginBottom: "16px", 
          backgroundColor: "#ffebee", 
          color: "#c62828",
          borderRadius: "4px",
          fontSize: "14px"
        }}>
          {error}
        </div>
      )}
      
      <Grid container spacing={3}>
        <Grid size={{
        md: 6,
        xs: 12
      }}>
          <TextField size="medium" fullWidth name="firstName" label="First Name" />
        </Grid>

        <Grid size={{
        md: 6,
        xs: 12
      }}>
          <TextField size="medium" fullWidth name="lastName" label="Last Name" />
        </Grid>

        <Grid size={{
        md: 6,
        xs: 12
      }}>
          <TextField size="medium" fullWidth name="email" type="email" label="Email" />
        </Grid>

        <Grid size={{
        md: 6,
        xs: 12
      }}>
          <TextField size="medium" fullWidth label="Phone" name="contact" />
        </Grid>

        <Grid size={{
        md: 6,
        xs: 12
      }}>
          <Controller name="birthOfDate" control={control} render={({
          field,
          fieldState: {
            error
          }
        }) => <DatePicker {...field} label="Birth Date" enableAccessibleFieldDOMStructure={false} slots={{
          textField: MuiTextField
        }} slotProps={{
          textField: {
            sx: {
              mb: 1
            },
            size: "medium",
            fullWidth: true,
            error: Boolean(error),
            helperText: error?.message || ""
          }
        }} />} />
        </Grid>

        <Grid size={12}>
          <Button disableElevation size="large" type="submit" color="primary" variant="contained" loading={isSubmitting}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </FormProvider>;
}