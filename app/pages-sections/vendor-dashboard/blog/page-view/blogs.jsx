"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Box, CircularProgress } from "@mui/material";

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
import BlogRow from "../blog-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../styles";
import { blogAPI } from "../../../../lib/api";

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "title",
    label: "Title",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    align: "left",
  },
  {
    id: "publishedAt",
    label: "Published Date",
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

export default function BlogsPageView() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const query = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => blogAPI.getAllBlogs({ limit, page: currentPage }), // Fetch all blogs for now
  });
  // RESHAPE THE BLOG LIST BASED ON TABLE HEAD CELL ID
  const reshapedBlogs =
    query.data?.data?.map((item) => ({
      ...item,
      id: item._id,
    })) || [];

  const { order, orderBy, handleRequestSort } = useMuiTable({
    listData: reshapedBlogs,
  });

  // Sort the blogs
  const sortedBlogs = reshapedBlogs
    ? stableSort(reshapedBlogs, getComparator(order, orderBy))
    : [];

  return (
    <PageWrapper title="Blog List">
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <div>Error loading blogs: {query.error?.message}</div>
        </Box>
      ) : (
        <>
          <SearchArea
            buttonText="Create Blog"
            url="/admin/blogs/create"
            searchPlaceholder="Search Blog..."
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
                    {sortedBlogs.length <= 0 ? (
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={5}>
                          No blogs found. Create your first blog post!
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : (
                      sortedBlogs.map((blog) => (
                        <BlogRow key={blog.id} blog={blog} />
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </OverlayScrollbar>
            {sortedBlogs.length > 0 && (
              <Stack alignItems="center" my={4}>
                <TablePagination
                  page={currentPage}
                  onChange={(_, newPage) => setCurrentPage(newPage)}
                  count={Math.ceil(sortedBlogs.length / limit)}
                />
              </Stack>
            )}
          </Card>
        </>
      )}
    </PageWrapper>
  );
}
