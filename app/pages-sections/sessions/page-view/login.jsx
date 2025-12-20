"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// GLOBAL CUSTOM COMPONENTS
import { TextField, FormProvider } from "../../../components/form-hook";

// LOCAL CUSTOM COMPONENTS
import Label from "../components/label";
import EyeToggleButton from "../components/eye-toggle-button";

// LOCAL CUSTOM HOOK
import usePasswordVisible from "../use-password-visible";

// AUTH CONTEXT
import { useAuth } from "../../../contexts/AuthContext";

// LOGIN FORM FIELD VALIDATION SCHEMA
const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is required"),
});
export default function LoginPageView() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();

  const initialValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      setError("");
      const res = await login(values);
      if (res?.user?.role.toLowerCase() === "admin") {
        router.push("/admin/dashboard");
        return;
      }
      console.log("Login response:", res);
      // Redirect to home page or dashboard after successful login
      router.push("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "16px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <div className="mb-1">
        <Label>Email or Phone Number</Label>
        <TextField
          fullWidth
          name="email"
          type="email"
          size="medium"
          placeholder="exmple@mail.com"
        />
      </div>

      <div className="mb-2">
        <Label>Password</Label>
        <TextField
          fullWidth
          size="medium"
          name="password"
          autoComplete="on"
          placeholder="*********"
          type={visiblePassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <EyeToggleButton
                  show={visiblePassword}
                  click={togglePasswordVisible}
                />
              ),
            },
          }}
        />
      </div>

      <Button
        fullWidth
        size="large"
        style={{ backgroundColor: "#CC5500" }}
        type="submit"
        color="primary"
        variant="contained"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </FormProvider>
  );
}
