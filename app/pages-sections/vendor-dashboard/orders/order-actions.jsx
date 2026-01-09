//import MenuItem from "@mui/material/MenuItem";
//import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { format } from "date-fns/format";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "../../../components/flex-box/flex-box";

// ==============================================================

// ==============================================================

export default function OrderActions({ id, createdAt, status }) {
  return (
    <div>
      <FlexBox
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="body1"
          sx={{
            span: {
              color: "grey.600",
            },
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <span style={{ fontWeight: "600" }}>Order ID:</span> {id}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            span: {
              color: "grey.600",
            },
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <span style={{ fontWeight: "600" }}>Placed on:</span>{" "}
          {format(new Date(createdAt), "dd MMM, yyyy")}
        </Typography>
      </FlexBox>

      {/*       <FlexBox
       // gap={3}
        my={3}
        flexDirection={{
          sm: "row",
          xs: "column",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            span: {
              color: "grey.600",
            },
           width: '50%',
          }}
        >
          <span>Product Name:</span>{" "}
          {format(new Date(createdAt), "dd MMM, yyyy")}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            span: {
              color: "grey.600",
            },
            width: '50%',
          }}
        >
          <span>Product Category:</span>{" "}
          {format(new Date(createdAt), "dd MMM, yyyy")}
        </Typography>
      </FlexBox> */}
    </div>
  );
}
