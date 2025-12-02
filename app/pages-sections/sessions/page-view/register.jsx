"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// GLOBAL CUSTOM COMPONENTS
import { Checkbox, TextField, FormProvider } from "../../../components/form-hook";

// LOCAL CUSTOM COMPONENTS
import EyeToggleButton from "../components/eye-toggle-button";

// LOCAL CUSTOM HOOK
import Label from "../components/label";
import BoxLink from "../components/box-link";
import usePasswordVisible from "../use-password-visible";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "../../../components/flex-box/flex-box";

// AUTH CONTEXT
import { useAuth } from "../../../contexts/AuthContext";


// REGISTER FORM FIELD VALIDATION SCHEMA
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
  lastName: yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
  email: yup.string().email("Invalid Email Address").required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one lowercase letter, one uppercase letter, and one number"),
  re_password: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Please re-type password"),
  agreement: yup.bool().test("agreement", "You have to agree with our Terms and Conditions!", value => value === true).required("You have to agree with our Terms and Conditions!")
});

export default function RegisterPageView() {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState("");
  
  const {
    visiblePassword,
    togglePasswordVisible
  } = usePasswordVisible();
  
  const inputProps = {
    endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
  };
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    re_password: "",
    agreement: false
  };
  
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });
  
  const {
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = methods;
  
  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      setError("");
      const { firstName, lastName, email, password } = values;
      await register({ firstName, lastName, email, password });
      // Redirect to home page or dashboard after successful registration
      router.push("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
      
      <div className="mb-1">
        <Label>First Name</Label>
        <TextField fullWidth name="firstName" size="medium" placeholder="John" />
      </div>

      <div className="mb-1">
        <Label>Last Name</Label>
        <TextField fullWidth name="lastName" size="medium" placeholder="Doe" />
      </div>

      <div className="mb-1">
        <Label>Email</Label>
        <TextField fullWidth name="email" size="medium" type="email" placeholder="example@mail.com" />
      </div>

      <div className="mb-1">
        <Label>Password</Label>
        <TextField fullWidth size="medium" name="password" placeholder="*********" type={visiblePassword ? "text" : "password"} slotProps={{
        input: inputProps
      }} />
      </div>

      <div className="mb-1">
        <Label>Retype Password</Label>
        <TextField fullWidth size="medium" name="re_password" placeholder="*********" type={visiblePassword ? "text" : "password"} slotProps={{
        input: inputProps
      }} />
      </div>

      <div className="agreement">
        <Checkbox name="agreement" size="small" color="secondary" label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={1}>
              <Box display={{
          sm: "inline-block",
          xs: "none"
        }}>By signing up, you agree to</Box>
              <Box display={{
          sm: "none",
          xs: "inline-block"
        }}>Accept Our</Box>
              <BoxLink title="Terms & Condition" href="/terms-and-conditions" />
            </FlexBox>} />
      </div>

      <Button fullWidth size="large" type="submit" style={{backgroundColor:"#CC5500"}} color="primary" variant="contained" loading={isSubmitting} disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create an Account"}
      </Button>
    </FormProvider>;
}