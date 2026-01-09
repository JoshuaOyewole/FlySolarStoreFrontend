"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

// GLOBAL CUSTOM COMPONENTS
import OverlayScrollbar from "../../../../components/overlay-scrollbar";
import {
  TableHeader,
  TablePagination,
} from "../../../../components/data-table";

// GLOBAL CUSTOM HOOK
import useMuiTable from "../../../../hooks/useMuiTable";

// LOCAL CUSTOM COMPONENT
import OrderRow from "../order-row";
//import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";

// CUSTOM DATA MODEL

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchData = async ({ currentPage, limit }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/admin/all-orders?page=${currentPage}&limit=${limit}`,
      {
        credentials: "include",
        next: { revalidate: 30 },
      }
    );

    const res = await response.json();

    return res;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export default function OrdersPageView() {
  const [currentPage, setCurrentPage] = useState(1);

  // Handle server-side pagination
  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  const limit = 10;
  const { isSuccess, isPending, isError, data } = useQuery({
    queryKey: ["customer-orders", currentPage],
    queryFn: () => fetchData({ currentPage, limit }),
  });

  const allOrders = data?.data?.orders || [];
  const pagination = data?.data?.pagination || {
    totalPages: 1,
    currentPage: 1,
    total_rows: 0,
  };
  
  // RESHAPE THE ORDER LIST BASED TABLE HEAD CELL ID
  const filteredOrders = allOrders?.map((item) => ({
    id: item._id,
    status: item.status,
    qty: item.items?.length,
    amount: item.total,
    purchaseDate: item.createdAt,
    billingAddress: item.shippingAddress,
  })) || [];

  const {
    order,
    orderBy,
    filteredList,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredOrders,
    defaultSort: "purchaseDate",
    defaultOrder: "desc",
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  
  if (isError) {
    return <div>Error loading orders.</div>;
  }

  return (
    <PageWrapper title="Orders">
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
                {filteredList.map((order) => (
                  <OrderRow order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </OverlayScrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            page={currentPage}
            onChange={handlePageChange}
            count={Math.ceil((pagination?.total_rows || 0) / limit) || 1}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
