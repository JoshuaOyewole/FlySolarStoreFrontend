import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import IconComponent from "../../../components/IconComponent";
import services from "../../../data/market-1/data"

export default async function Section9() {
const servicesList = services.services;

  if (!servicesList || servicesList.length === 0) return null;
  return <Box bgcolor="grey.50" py={5}>
      <Container>
        <Grid container spacing={{
        xs: 4,
        sm: 3
      }}>
          {servicesList.map(({
          icon,
          title,
          id
        }) => <Grid size={{
          lg: 3,
          sm: 3,
          xs: 12
        }} key={id}>
              <Box sx={{
            gap: "1rem",
            height: "100%",
            display: "flex",
            borderRadius: 3,
            alignItems: "center",
            justifyContent: {
              lg: "center",
              xs: "flex-start"
            }
          }}>
                <IconComponent icon={icon} sx={{
              fontSize: "1.75rem"
            }} />

                <Typography noWrap variant="h4" fontSize={{
              md: 20,
              xs: 18
            }}>
                  {title}
                </Typography>
              </Box>
            </Grid>)}
        </Grid>
      </Container>
    </Box>;
}