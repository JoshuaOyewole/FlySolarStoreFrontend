"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Box, CircularProgress, colors } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import OverlayScrollbar from "../../../../components/overlay-scrollbar";
import {
  TableHeader,
  TablePagination,
} from "../../../../components/data-table";

// GLOBAL CUSTOM HOOK
import useMuiTable from "../../../../hooks/useMuiTable";
import { stableSort, getComparator } from "../../../../hooks/useMuiTable";

//  LOCAL CUSTOM COMPONENT
import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../styles";

// CUSTOM DATA MODEL

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    align: "left",
  },
  {
    id: "brand",
    label: "Brand",
    align: "left",
  },
  {
    id: "price",
    label: "Price",
    align: "left",
  },
  {
    id: "published",
    label: "Published",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

const fetchData = async ({ currentPage, limit }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/admin/products?page=${currentPage}&limit=${limit}`,
      {
        credentials: "include", // ✅ correct place
        next: { revalidate: 30 },
      }
    );

    const res = await response.json();

    return res;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export default function ProductsPageView() {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;
  const query = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => fetchData({ currentPage, limit }),
  });

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const reshapedProducts = query.data?.data.map((item) => ({
    id: item._id,
    slug: item.slug,
    name: item.title,
    brand: item.brand,
    price: item.price,
    thumbnail: item.thumbnail,
    published: item.isActive,
    category: item.category,
    published: item.isActive,
    size: item.size,
    colors: item.colors,
    summary: item.summary,
    description: item.description,
  }));

  const { order, orderBy, handleRequestSort } = useMuiTable({
    listData: reshapedProducts,
  });

  // Handle server-side pagination
  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  // Sort the current page's data
  const sortedProducts = reshapedProducts
    ? stableSort(reshapedProducts, getComparator(order, orderBy))
    : [];

  return (
    <PageWrapper title="Product List">
      {query.isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : query.isError ? (
        <div>Error loading products.</div>
      ) : (
        <>
          <SearchArea
            buttonText="Add Product"
            url="/admin/products/create"
            searchPlaceholder="Search Product..."
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
                    {sortedProducts.length <= 0 ? (
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={6}>
                          Oooops! No products found.
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : (
                      sortedProducts.map((product, index) => (
                        <ProductRow key={index} product={product} />
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </OverlayScrollbar>
            {sortedProducts.length > 0 && (
              <Stack alignItems="center" my={4}>
                <TablePagination
                  page={currentPage}
                  onChange={handlePageChange}
                  count={Math.ceil(query?.data?.pagination.total_rows / limit)}
                />
              </Stack>
            )}
          </Card>
        </>
      )}
    </PageWrapper>
  );
}
