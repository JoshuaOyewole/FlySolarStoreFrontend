"use client";

import Link from "next/link";
import Box from "@mui/material/Box";

import LazyImage from "../LazyImage";
import { HeaderCategoryDropdown } from "./header-category-dropdown";
import { HeaderWrapper, StyledContainer } from "./styles";

export function Header({ children, mobileHeader, ...props }) {
  return (
    <HeaderWrapper {...props}>
      <StyledContainer>
        <div className="main-header">{children}</div>
        <div className="mobile-header">{mobileHeader}</div>
      </StyledContainer>
    </HeaderWrapper>
  );
}

function HeaderLeft({ children, ...props }) {
  return (
    <Box display="flex" minWidth={100} alignItems="center" {...props}>
      {children}
    </Box>
  );
}

function HeaderLogo({ url, alt = "logo" }) {
  return (
    <Link href="/">
      <LazyImage
        priority
        src={url}
        alt={alt}
        width={105}
        height={50}
        sizes="(max-width: 768px) 80px, 105px"
        sx={{ objectFit: "contain" }}
      />
    </Link>
  );
}

function HeaderCategory({ children }) {
  return <HeaderCategoryDropdown>{children}</HeaderCategoryDropdown>;
}

function HeaderMid({ children }) {
  return <>{children}</>;
}

function HeaderRight({ children, ...props }) {
  return (
    <Box display="flex" alignItems="center" {...props}>
      {children}
    </Box>
  );
}


export default {
HeaderLeft,
HeaderLogo,
HeaderCategory,
HeaderMid,
HeaderRight
}
/* 
Header.Left = HeaderLeft;
Header.Logo = HeaderLogo;
Header.CategoryDropdown = HeaderCategory;
Header.Mid = HeaderMid;
Header.Right = HeaderRight; */