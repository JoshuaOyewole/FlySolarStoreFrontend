"use client";

import { useState } from "react";
import Image from "next/image";

// MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CameraEnhance from "@mui/icons-material/CameraEnhance";
import CircularProgress from "@mui/material/CircularProgress";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "../../../components/flex-box/flex-box";

export default function ProfilePicUpload({
  image,
  onImageChange
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(image);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should not exceed 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Pass file to parent component
      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  return <FlexBox alignItems="flex-end" mb={4}>
      <Avatar sx={{
      height: 60,
      width: 60
    }}>
        {preview && <Image fill alt="user" src={preview} sizes="(60px, 60px)" />}
      </Avatar>

      <IconButton 
        size="small" 
        component="label" 
        color="secondary" 
        htmlFor="profile-image" 
        disabled={uploading}
        sx={{
          bgcolor: "grey.300",
          ml: -2.5
        }}
      >
        {uploading ? <CircularProgress size={16} /> : <CameraEnhance fontSize="small" />}
      </IconButton>

      <Box 
        type="file" 
        display="none" 
        accept="image/*" 
        component="input" 
        id="profile-image" 
        onChange={handleImageChange} 
      />
    </FlexBox>;
}