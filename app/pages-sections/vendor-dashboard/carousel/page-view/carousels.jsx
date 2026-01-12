"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { carouselAPI } from "../../../../lib/api";
import OverlayScrollbar from "../../../../components/overlay-scrollbar";
import { TableHeader, TablePagination } from "../../../../components/data-table";
import useMuiTable from "../../../../hooks/useMuiTable";
import PageWrapper from "../../page-wrapper";
import SearchArea from "../../search-box";
import CarouselRow from "../carousel-row";
import { toast } from "react-toastify";

// TABLE HEAD CELLS
const tableHeading = [
  { id: "image", label: "Image", align: "left" },
  { id: "title", label: "Title", align: "left" },
  { id: "buttonText", label: "Button Text", align: "left" },
  { id: "type", label: "Type", align: "left" },
  { id: "action", label: "Action", align: "center" },
];

export default function CarouselsPageView() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // FETCH CAROUSELS
  const { data, isLoading } = useQuery({
    queryKey: ["carousels"],
    queryFn: async () => {
      const response = await carouselAPI.getAll();
      return response.data || [];
    },
    staleTime: 30000,
    gcTime: 300000,
  });

  const carousels = data || [];

  // DELETE MUTATION
  const deleteMutation = useMutation({
    mutationFn: (id) => carouselAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carousels"] });
      toast.success("Carousel deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete carousel");
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this carousel?")) {
      deleteMutation.mutate(id);
    }
  };

  // PAGINATION
  const { order, orderBy, selected, rowsPerPage, filteredList, handleChangePage, handleRequestSort } =
    useMuiTable({
      listData: carousels,
      defaultSort: "createdAt",
      defaultOrder: "desc",
    });

  return (
    <PageWrapper title="Carousels">
      <Card>
        <SearchArea
          buttonText="Add Carousel"
          url="/admin/carousel/create"
        />

        <OverlayScrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={carousels.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                      Loading...
                    </td>
                  </tr>
                ) : filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                      No carousels found
                    </td>
                  </tr>
                ) : (
                  filteredList.map((carousel) => (
                    <CarouselRow
                      key={carousel._id}
                      carousel={carousel}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </OverlayScrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(carousels.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
