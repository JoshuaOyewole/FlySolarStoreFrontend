"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";

// CUSTOM ICONS
import appIcons from "../components/icons";

// STYLED COMPONENTS
import {
  HeroSection,
  StatsCard,
  ValueCard,
  IconWrapper,
  CTASection,
  StatsSection,
  StorySection,
  MissionSection,
  ValuesSection,
  MissionCard,
  VisionCard,
  StoryImageBox,
  SectionHeaderBox,
  CTAContentBox,
  ButtonBox,
} from "./styles";

export default function AboutPageView() {
  const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "5,000+", label: "Products Sold" },
    { value: "50+", label: "Cities Reached" },
    { value: "99%", label: "Customer Satisfaction" },
  ];

  const values = [
    {
      icon: appIcons.Shield,
      title: "Quality Assurance",
      description:
        "We source only premium solar products from trusted manufacturers, ensuring reliability and longevity for every installation.",
    },
    {
      icon: appIcons.CustomerService,
      title: "Expert Support",
      description:
        "Our team of solar energy experts is always ready to guide you through product selection, installation, and maintenance.",
    },
    {
      icon: appIcons.Truck,
      title: "Fast Delivery",
      description:
        "Swift and secure delivery across Nigeria, ensuring your solar products reach you in perfect condition and on time.",
    },
  ];

  return (
    <Box>
      {/* HERO SECTION */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 32, sm: 40, md: 48 },
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Powering Nigeria with Clean Energy
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: 16, sm: 18, md: 20 },
                  mb: 4,
                  opacity: 0.95,
                  maxWidth: 600,
                  lineHeight: 1.6,
                }}
              >
                Nigeria's leading online solar equipment store, committed to
                making renewable energy accessible and affordable for everyone.
              </Typography>
              <Button
                component={Link}
                href="/products/search"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "grey.100",
                  },
                }}
              >
                Shop Solar Products
              </Button>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* STATS SECTION */}
      <StatsSection>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <StatsCard elevation={0}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: 28, sm: 36, md: 42 },
                      fontWeight: 800,
                      color: "primary.main",
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: 13, sm: 15 },
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StatsSection>

      {/* STORY SECTION */}
      <StorySection>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 28, sm: 36 },
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Our Story
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: 15, sm: 16 },
                  lineHeight: 1.8,
                  color: "text.secondary",
                  mb: 2,
                }}
              >
                Founded with a vision to transform Nigeria's energy landscape,
                Fly Solar Store emerged from a simple yet powerful idea: making
                clean, renewable energy accessible to every Nigerian household
                and business.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: 15, sm: 16 },
                  lineHeight: 1.8,
                  color: "text.secondary",
                }}
              >
                Today, we've grown into Nigeria's most trusted online solar
                equipment provider, serving thousands of customers across the
                country. Our commitment remains unchanged - to deliver
                high-quality solar products, expert guidance, and exceptional
                service that empowers our customers to embrace sustainable
                energy solutions.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StoryImageBox>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: 600, zIndex: 1 }}
                >
                  🌞 Solar Excellence
                </Typography>
              </StoryImageBox>
            </Grid>
          </Grid>
        </Container>
      </StorySection>

      {/* MISSION & VISION */}
      <MissionSection>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <MissionCard>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: 24, sm: 28 },
                    fontWeight: 700,
                    mb: 3,
                    color: "primary.main",
                  }}
                >
                  Our Mission
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: 15, sm: 16 },
                    lineHeight: 1.8,
                    color: "text.secondary",
                  }}
                >
                  To make renewable energy accessible and affordable for every
                  Nigerian by providing high-quality solar products, expert
                  guidance, and exceptional customer service. We're committed to
                  promoting sustainable energy practices that benefit both our
                  customers and the environment.
                </Typography>
              </MissionCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <VisionCard>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: 24, sm: 28 },
                    fontWeight: 700,
                    mb: 3,
                    color: "secondary.main",
                  }}
                >
                  Our Vision
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: 15, sm: 16 },
                    lineHeight: 1.8,
                    color: "text.secondary",
                  }}
                >
                  To be Africa's leading solar energy marketplace, empowering
                  millions to transition to clean, reliable, and sustainable
                  energy solutions. We envision a future where every home and
                  business has access to affordable solar technology,
                  contributing to a greener planet.
                </Typography>
              </VisionCard>
            </Grid>
          </Grid>
        </Container>
      </MissionSection>

      {/* VALUES SECTION */}
      <ValuesSection>
        <Container maxWidth="lg">
          <SectionHeaderBox>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 28, sm: 36 },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Why Choose Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 15, sm: 16 },
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              We're committed to delivering excellence in every aspect of our
              service
            </Typography>
          </SectionHeaderBox>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <ValueCard elevation={0}>
                  <IconWrapper>
                    <value.icon />
                  </IconWrapper>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: 18, sm: 20 },
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: 14, sm: 15 },
                      lineHeight: 1.7,
                      color: "text.secondary",
                    }}
                  >
                    {value.description}
                  </Typography>
                </ValueCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ValuesSection>

      {/* CTA SECTION */}
      <CTASection>
        <Container maxWidth="md">
          <CTAContentBox>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 28, sm: 36 },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Ready to Go Solar?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 15, sm: 18 },
                mb: 4,
                opacity: 0.95,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Join thousands of satisfied customers who have made the switch to
              clean, reliable solar energy. Start your sustainable energy
              journey today.
            </Typography>
            <ButtonBox>
              <Button
                component={Link}
                href="/products/search"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "grey.100",
                  },
                }}
              >
                Browse Products
              </Button>
              <Button
                component="a"
                href="https://api.whatsapp.com/send?phone=2347032054367&text=Hi%20Flysolarstore%2C%0APlease%20I%20want%20to%20make%20an%20enquire"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  backgroundColor: "primary.main",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "primary.main",
                  },
                }}
              >
                Contact Us
              </Button>
            </ButtonBox>
          </CTAContentBox>
        </Container>
      </CTASection>
    </Box>
  );
}
