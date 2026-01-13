import { Fragment, useState } from "react";
import Card from "@mui/material/Card";

// LOCAL CUSTOM COMPONENT
import ProfileEditForm from "../edit-form";
import ProfilePicUpload from "../profile-pic-upload";
import DashboardHeader from "../../dashboard-header";

// CUSTOM DATA MODEL


// ===========================================================


// ===========================================================

export function ProfileEditPageView({
  user
}) {
  const [avatarFile, setAvatarFile] = useState(null);

  const handleImageChange = (file) => {
    setAvatarFile(file);
  };

  return <Fragment>
      <DashboardHeader href="/profile" title="Edit Profile" />

      <Card sx={{
      padding: {
        xs: 3,
        sm: 4
      }
    }}>
        <ProfilePicUpload image={user.avatar} onImageChange={handleImageChange} />
        {user && <ProfileEditForm user={user} avatarFile={avatarFile} />}
      </Card>
    </Fragment>;
}