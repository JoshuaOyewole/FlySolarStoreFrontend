import Image from "next/image";

// MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
//import TextField from "@mui/material/TextField";
//import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// MUI ICON COMPONENT
import Delete from "@mui/icons-material/Delete";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "../../../components/flex-box";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "../../../lib";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function OrderedProduct({ product: item }) {
  const { product, price, productSnapshot, quantity } = item || {};
  return (
    <Box
      my={2}
      gap={2}
      display="grid"
      gridTemplateColumns={{
        md: "1fr 1fr",
        xs: "1fr",
      }}
    >
      <FlexBox flexShrink={0} gap={1.5} alignItems="center">
        <Avatar
          variant="rounded"
          sx={{
            height: 64,
            width: 64,
          }}
        >
          <Image
            fill
            alt={productSnapshot.title}
            src={productSnapshot.thumbnail}
            sizes="(64px, 64px)"
          />
        </Avatar>

        <div>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
            }}
          >
            {productSnapshot.title}
          </Typography>

          <FlexBox alignItems="center" gap={1}>
            <Typography
              variant="body1"
              sx={{
                color: "grey.600",
              }}
            >
              {currency(price)} x
            </Typography>

            <Box maxWidth={60}>
              <Typography
                variant="body1"
                sx={{
                  color: "grey.600",
                }}
              >
                ({quantity} Qty)
              </Typography>
            </Box>
          </FlexBox>
        </div>
      </FlexBox>

      {/* <FlexBetween flexShrink={0}>
        <Typography
          variant="body1"
          sx={{
            color: "grey.600",
          }}
        >
          Product properties: Black, L
        </Typography>

        <IconButton>
          <Delete
            sx={{
              color: "grey.600",
              fontSize: 22,
            }}
          />
        </IconButton>
      </FlexBetween> */}
    </Box>
  );
}
