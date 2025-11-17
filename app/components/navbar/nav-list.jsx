"use client";

import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// GLOBAL CUSTOM COMPONENTS
import { NavLink } from "../nav-link";
import FlexBox from "../flex-box/flex-box";

// LOCAL CUSTOM COMPONENTS
import MegaMenu from "./mega-menu";
import NavItemChild from "./nav-item-child";
import { CategoryBasedMenu } from "./category-based-menu";

// STYLED COMPONENTS
import { NAV_LINK_STYLES, ChildNavListWrapper, StyledNavLink } from "./styles";

// DATA TYPES

// ==============================================================

// ==============================================================

export function NavigationList({ navigation }) {
  const renderNestLevel = (children) => {
    return children.map((nav) => {
      if (nav.child) {
        return (
          <NavItemChild nav={nav} key={nav.title}>
            {renderNestLevel(nav.child)}
          </NavItemChild>
        );
      }
      return (
        <NavLink href={nav.url} key={nav.title}>
          <MenuItem>{nav.title}</MenuItem>
        </NavLink>
      );
    });
  };
  //RENDER THOSE WITHOUT CHILDREN OR MEGA MENU
  const renderNoChildLevel = (list) => {
    return list.map((nav, i) => {
      if (!nav.child && !nav.megaMenu && !nav.megaMenuWithSub) {
        return (
          <NavLink href={nav.url} key={nav.title + i} className="font-medium">
            {nav.title}
          </NavLink>
        );
      }
    });
  };

  // RENDER THE ROOT LEVEL OF NAVIGATION
  const renderRootLevel = (list) => {

    return list.map((nav) => {
      // SHOW GRID MEGA MENU
      if (nav.megaMenu) {
        return (
          <MegaMenu key={nav.title} title={nav.title} menuList={nav.child} />
        );
      }

      // SHOW CATEGORY BASED MEGA MENU WITH SUB ITEMS
      if (nav.megaMenuWithSub) {
        return (
          <CategoryBasedMenu
            key={nav.title}
            title={nav.title}
            menuList={nav.child}
          />
        );
      }

      // SHOW LIST MENU WITH CHILD
      if (
        nav.child &&
        nav.megaMenu === false &&
        nav.megaMenuWithSub === false
      ) {
        return (
          <FlexBox
            key={nav.title}
            alignItems="center"
            position="relative"
            flexDirection="column"
            sx={{
              "&:hover": {
                "& > .child-nav-item": {
                  display: "block",
                },
              },
            }}
          >
            <FlexBox alignItems="flex-end" gap={0.3} sx={NAV_LINK_STYLES}>
              {nav.title}{" "}
              <KeyboardArrowDown
                sx={{
                  color: "grey.500",
                  fontSize: "1.1rem",
                }}
              />
            </FlexBox>

            <ChildNavListWrapper className="child-nav-item">
              <Card
                elevation={5}
                sx={{
                  mt: 2.5,
                  py: 1,
                  minWidth: 100,
                  overflow: "unset",
                }}
              >
                {renderNestLevel(nav.child)}
              </Card>
            </ChildNavListWrapper>
          </FlexBox>
        );
      }
      // SHOW ITEMS WITHOUT CHILDREN OR MEGA MENU
      return renderNoChildLevel([nav]);
    });
  };
  return <FlexBox gap={4}>{renderRootLevel(navigation)}</FlexBox>;
}
