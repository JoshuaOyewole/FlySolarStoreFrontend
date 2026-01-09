import Image from "next/image";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
// LOCAL CUSTOM COMPONENTS
import LogoArea from "./logo-area";
import LayoutDrawer from "../../layout-drawer";
import MultiLevelMenu from "./multi-level-menu";

// LOCAL CUSTOM HOOK
import { useLayout } from "../dashboard-layout-context";
import { ListLabel } from "./styles";
// STYLED COMPONENT
import { SidebarWrapper } from "./styles";
import { useAuth } from "../../../../contexts/AuthContext";
import { useState } from "react";
export default function DashboardSidebar() {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const {
    sidebarCompact,
    TOP_HEADER_AREA,
    showMobileSideBar,
    handleSidebarHover,
    handleCloseMobileSidebar,
  } = useLayout();
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  if (downLg) {
    return (
      <LayoutDrawer
        open={showMobileSideBar ? true : false}
        onClose={handleCloseMobileSidebar}
      >
        <Box p={2} maxHeight={TOP_HEADER_AREA}>
          <Image
            alt="Logo"
            width={105}
            height={50}
            src="/assets/images/logo_new.png"
            style={{
              marginLeft: 8,
            }}
          />
        </Box>

        <MultiLevelMenu />
      </LayoutDrawer>
    );
  }
  const handleLogout = async () => {
    await logout();
    setAnchorEl(null);
    router.push("/");
  };
  return (
    <SidebarWrapper
      compact={sidebarCompact ? 1 : 0}
      onMouseEnter={() => handleSidebarHover(true)}
      onMouseLeave={() => sidebarCompact && handleSidebarHover(false)}
    >
      {/* SIDEBAR TOP LOGO SECTION */}
      <LogoArea />

      {/* SIDEBAR NAVIGATION SECTION */}
      <MultiLevelMenu />
      <ListLabel
        sx={{ ml: 4, mt: 5, cursor: "pointer" }}
        onClick={handleLogout}
      >
        <LogoutIcon fontSize="small" /> Logout
      </ListLabel>
    </SidebarWrapper>
  );
}
