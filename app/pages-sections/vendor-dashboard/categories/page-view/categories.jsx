"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { categoriesAPI } from "../../../../lib/api";
// GLOBAL CUSTOM COMPONENTS
import OverlayScrollbar from "../../../../components/overlay-scrollbar";
import {
  TableHeader,
  TablePagination,
} from "../../../../components/data-table";
import { useQuery } from "@tanstack/react-query";
// GLOBAL CUSTOM HOOK
import useMuiTable from "../../../../hooks/useMuiTable";

// LOCAL CUSTOM COMPONENT
import CategoryRow from "../category-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";

// CUSTOM DATA MODEL

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../styles";

// =============================================================================

// =============================================================================

const CategoriesPageView = () => {
  const [page, setPage] = useState(1);
  const limitsPerPage = 20;

  const { data, isPending, error } = useQuery({
    queryKey: ["categories", page],
    queryFn: () => categoriesAPI.getAll({ page, limit: limitsPerPage }),
  });

  const categories = data?.data || [];

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredCategories = categories.map((item) => ({
    id: item._id,
    name: item.name,
    // slug: item.slug,
    //image: item.image,
    featured: item.isFeatured,
    //level: Math.ceil(Math.random() * 1),
  }));

  const {
    order,
    orderBy,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredCategories,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories: {error.message}</div>;
  }
  return (
    <PageWrapper title="Product Categories">
      <SearchArea
        buttonText="Add Category"
        url="/admin/categories/create"
        searchPlaceholder="Search Category..."
      />

      <Card>
        <OverlayScrollbar>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                orderBy={orderBy}
                heading={tableHeading}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {categories.length > 0 ? (
                  filteredList.map((category) => (
                    <CategoryRow key={category.id} category={category} />
                  ))
                ) : (
                  <StyledTableRow tabIndex={-1} role="checkbox">
                    <StyledTableCell align="center" colSpan={6}>
                      No categories found
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </OverlayScrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(categories.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
};
export default CategoriesPageView;
