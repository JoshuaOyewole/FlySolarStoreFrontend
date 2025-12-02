import { Fragment, Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// GLOBAL COMPONENTS
//import Setting from "components/settings";
//import Newsletter from "components/newsletter";
import { SecondaryHeader } from "../../../components/secondary-header";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
//import Section3 from "../section-3";
import Section4 from "../section-4";
//import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
import { SearchInput1 } from "../../../components/search-box";
import { header } from "../../../lib/data";

export default function MarketOnePageView() {
  return (
    <Fragment>
      <SecondaryHeader elevation={0}>
        {/*   <SecondaryHeader.Left>
          <CategoryList categories={header.categoryMenus} />
        </SecondaryHeader.Left> 
         */}

        <SecondaryHeader.Right>
          <SearchInput1 categories={header.categories} />
        </SecondaryHeader.Right>
      </SecondaryHeader>

      {/* HERO SLIDER SECTION */}
      <Suspense
        fallback={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="400px"
          >
            <CircularProgress size={40} />
          </Box>
        }
      >
        <Section1 />
      </Suspense>

      {/* FLASH DEALS SECTION */}
      <Suspense
        fallback={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="400px"
          >
            <CircularProgress size={40} />
          </Box>
        }
      >
        <Section2 />
      </Suspense>

      {/* CUSTOM SOLUTIONS SECTION */}
      {/*     <Section3 /> */}

      {/* JUST FOR YOU SECTION */}
      <Suspense
        fallback={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="400px"
          >
            <CircularProgress size={40} />
          </Box>
        }
      >
        <Section4 />
      </Suspense>

      {/* PROMO BANNERS SECTION */}
      {/*  <Section5 /> */}

      {/* NEW ARRIVALS SECTION */}
      <Suspense
        fallback={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="400px"
          >
            <CircularProgress size={40} />
          </Box>
        }
      >
        <Section6 />
      </Suspense>

      {/* GRID PRODUCTS SECTION */}
      <Suspense
        fallback={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="400px"
          >
            <CircularProgress size={40} />
          </Box>
        }
      >
        <Section7 />
      </Suspense>

      {/* BLOG SECTION */}
      <Suspense
        fallback={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="400px"
          >
            <CircularProgress size={40} />
          </Box>
        }
      >
        <Section8 />
      </Suspense>

      {/* SERVICES SECTION */}
      <Suspense
        fallback={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="400px"
          >
            <CircularProgress size={40} />
          </Box>
        }
      >
        <Section9 />
      </Suspense>
      {/* POPUP NEWSLETTER FORM */}
      {/* <Newsletter /> */}

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      {/*  <Setting /> */}
    </Fragment>
  );
}
