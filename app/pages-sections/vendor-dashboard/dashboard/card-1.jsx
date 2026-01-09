import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

// MUI ICON COMPONENTS
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "../../../components/flex-box";

// ========================================================

// ========================================================

export default function Card1(props) {
  const {
    title,
    amount1,
    amount2,
    percentage,
    status = "up",
    color = "info.main",
  } = props;


  return (
    <Card className="p-1">
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          color: "text.secondary",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h3"
        sx={{
          mb: 0.3,
        }}
      >
        {amount2 != null && "₦"} {Math.ceil(amount1).toLocaleString()}
      </Typography>

      <FlexBetween>
        {amount2 != null && (
          <Typography variant="h6" color="text.secondary">
            ₦{Math.ceil(amount2).toLocaleString()}
          </Typography>
        )}

        <FlexBox
          alignItems="center"
          color={status === "up" ? "success.main" : "error.main"}
        >
          {amount2 != null && (
            <>
              {status === "up" && <ArrowDropUp />}
              {status === "down" && <ArrowDropDown />}
            </>
          )}
          {amount2 != null && (
            <Typography
              variant="body1"
              sx={{
                fontSize: 12,
                color: status === "up" ? "success.main" : "error.main",
              }}
            >
              {Math.ceil(percentage)}%
            </Typography>
          )}
        </FlexBox>
      </FlexBetween>
    </Card>
  );
}
