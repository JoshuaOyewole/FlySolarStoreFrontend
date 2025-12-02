"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SvgIcon from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../contexts/AuthContext";

export function HeaderLogin() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      router.push("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    router.push("/");
  };

  const handleProfile = () => {
    router.push("/profile");
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <SvgIcon fontSize="small">
          <svg viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="9" r="3" />
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5" />
            </g>
          </svg>
        </SvgIcon>
      </IconButton>

      {isAuthenticated && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem disabled>
            <ListItemText 
              primary={user?.firstName ? `${user.firstName} ${user.lastName}` : "User"}
              secondary={user?.email}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <svg viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="9" r="3" />
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5" />
                  </g>
                </svg>
              </SvgIcon>
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem component={Link} href="/orders">
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </SvgIcon>
            </ListItemIcon>
            <ListItemText>My Orders</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
              </SvgIcon>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}