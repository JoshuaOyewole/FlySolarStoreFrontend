"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

// MUI
import MuiPagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const StyledPagination = styled(MuiPagination)({
  display: "flex",
  marginTop: "2.5rem",
  justifyContent: "center",
});

// ========================================================

// ==============================================================

export default function Pagination({ count, page }) {
  const router = useRouter();
  const pathname = usePathname();
  const handlePageChange = useCallback(
    (event, newPage) => {
      // Prevent navigation if already on the target page
      if (newPage === page) return;
      
      const searchParams = new URLSearchParams();
      if (newPage === 1) {
        searchParams.delete("page");
      } else {
        searchParams.set("page", newPage.toString());
      }
      router.push(`${pathname}?${searchParams.toString()}`);
    },
    [router, pathname, page]
  );
  if (count <= 1) return null;
  return (
    <StyledPagination
      color="primary"
      count={count}
      page={page}
      onChange={handlePageChange}
    />
  );
}
