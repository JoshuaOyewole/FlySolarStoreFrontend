"use client";

import { useQuery } from "@tanstack/react-query";
// @ts-ignore
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { carouselAPI } from "../../../../lib/api";
import EditCarouselForm from "../../../../pages-sections/vendor-dashboard/carousel/edit-carousel";

export default function EditCarouselPage() {
  const params = useParams();
  const carouselId = params.slug;

  const { data, isLoading, error } = useQuery({
    queryKey: ["carousels"],
    queryFn: async () => {
      const response = await carouselAPI.getAll();
      return response.data || [];
    },
    staleTime: 30000,
  });

  const carousel = data?.find((c) => c._id === carouselId);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !carousel) {
    return (
      <Box py={4}>
        <div>Carousel not found</div>
      </Box>
    );
  }

  return <EditCarouselForm carousel={carousel} />;
}