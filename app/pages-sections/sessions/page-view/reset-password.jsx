"use client";

import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

// API
import { authAPI } from "../../../lib/api";
// MUI
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// GLOBAL CUSTOM COMPONENTS
import { TextField, FormProvider } from "../../../components/form-hook";
import FlexRowCenter from "../../../components/flex-box/flex-row-center";

// LOCAL CUSTOM COMPONENT
import BoxLink from "../components/box-link";

// FORM FIELD VALIDATION SCHEMAS
const emailValidationSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
});

const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [emailSent, setEmailSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form for requesting password reset (email)
  const emailMethods = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(emailValidationSchema),
  });

  // Form for resetting password with token
  const passwordMethods = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(passwordValidationSchema),
  });

  // Mutation for sending reset email
  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => {
      return authAPI.forgotPassword(data);
    },
    onSuccess: (data, variables) => {
      toast.success(data.message || "Password reset link sent to your email.");
      setSentToEmail(variables.email);
      setEmailSent(true);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send password reset link.");
    },
  });

  // Mutation for resetting password with token
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }) => {
      return authAPI.resetPassword(token, password);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password. Link may be expired.");
    },
  });

  const handleEmailSubmit = emailMethods.handleSubmit((values) => {
    forgotPasswordMutation.mutate(values);
  });

  const handlePasswordSubmit = passwordMethods.handleSubmit((values) => {
    resetPasswordMutation.mutate({ token, password: values.password });
  });

  // If there's a token in URL, show the reset password form
  if (token) {
    return (
      <Fragment>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mb: 2,
            textAlign: "center",
          }}
        >
          Set New Password
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          Enter your new password below
        </Typography>

        <FormProvider methods={passwordMethods} onSubmit={handlePasswordSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              label="New Password"
              size="medium"
              placeholder="Enter new password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              size="medium"
              placeholder="Confirm new password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              size="large"
              type="submit"
              color="primary"
              variant="contained"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </Stack>
        </FormProvider>

        <FlexRowCenter mt={3} justifyContent="center" gap={1}>
          <Typography variant="body1" color="text.secondary">
            Remember your password?
          </Typography>
          <BoxLink title="Login" href="/login" />
        </FlexRowCenter>
      </Fragment>
    );
  }
  
  // Show success message after email is sent
  if (emailSent) {
    return (
      <Fragment>
        <Box textAlign="center">
          <EmailIcon 
            sx={{ 
              fontSize: 80, 
              color: "primary.main",
              mb: 3
            }} 
          />
          
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ mb: 2 }}
          >
            Check Your Email
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            We've sent a password reset link to:
          </Typography>

          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ mb: 3 }}
          >
            {sentToEmail}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Click the link in the email to reset your password. The link will expire in 1 hour.
          </Typography>

          <Button
            fullWidth
            size="large"
            color="primary"
            variant="outlined"
            onClick={() => setEmailSent(false)}
            sx={{ mb: 2 }}
          >
            Didn't receive the email? Try again
          </Button>
        </Box>

        <FlexRowCenter mt={3} justifyContent="center" gap={1}>
          <Typography variant="body1" color="text.secondary">
            Remember your password?
          </Typography>
          <BoxLink title="Login" href="/login" />
        </FlexRowCenter>
      </Fragment>
    );
  }
  
  return (
    <Fragment>
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{
          mb: 2,
          textAlign: "center",
        }}
      >
        Reset your password
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 4,
          textAlign: "center",
        }}
      >
        Enter your email and we'll send you a reset link
      </Typography>

      <FormProvider methods={emailMethods} onSubmit={handleEmailSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name="email"
            type="email"
            label="Email"
            size="medium"
            placeholder="example@mail.com"
          />

          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
          </Button>
        </Stack>
      </FormProvider>

      <FlexRowCenter mt={3} justifyContent="center" gap={1}>
        <Typography variant="body1" color="text.secondary">
          Don&apos;t have an account?
        </Typography>

        <BoxLink title="Register" href="/register" />
      </FlexRowCenter>
    </Fragment>
  );
}
