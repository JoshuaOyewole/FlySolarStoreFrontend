import Typography from "@mui/material/Typography";

// LOCAL CUSTOM COMPONENTS
import IconLink from "../icon-link";
import { FlexBetween } from "../flex-box";


// ===================================================


// ===================================================

export function SectionHeader({
  title,
  seeMoreLink,
  color = "text.primary",
  linkText = "Show More"
}) {
  return <FlexBetween mb={3} gap={1} flexWrap="wrap">
      <Typography variant="h2" color={color} fontWeight={700} fontSize={{
      sm: 32,
      xs: 27
    }}>
        {title}
      </Typography>

      {seeMoreLink && <IconLink url={seeMoreLink} title={linkText} />}
    </FlexBetween>;
}