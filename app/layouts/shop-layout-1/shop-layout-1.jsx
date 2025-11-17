import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import {
  Footer1,
  //FooterApps,
  FooterContact,
  FooterLinksWidget,
  FooterSocialLinks,
} from "../../components/footer";
import Sticky from "../../components/sticky";
import { NavigationList } from "../../components/navbar";
//import { CategoryList } from "../../components/categories";
//import { MobileMenu } from ".././components/mobile-navbar";
//import { SecondaryHeader } from "../../components/secondary-header";
import { MobileNavigationBar } from "../../components/mobile-navigation";
//import { SearchInput1, SearchInput2 } from "../../components/search-box";
import {
  Topbar,
  //TopbarLanguageSelector,
  TopbarSocialLinks,
} from "../../components/topbar";
import {
  Header,
/*   HeaderCart,
  HeaderLogin,
  MobileHeader,
  HeaderSearch, */
} from "../../components/header";
import { header, footer, topbar, mobileNavigation } from "../../lib/data";
import LazyImage from "../../components/LazyImage";
import Box from "@mui/material/Box";

export default function ShopLayout1({ children }) {
  const MOBILE_VERSION_HEADER = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      {/* <MobileHeader.Left>
          <MobileMenu navigation={header.navigation} />
        </MobileHeader.Left> */}

      <Link href="/">
        <Image width={60} height={44} src={mobileNavigation.logo} alt="logo" />
      </Link>
      {/* <Box display="flex" justifyContent="end" flex={1}>
        <HeaderSearch>
          <SearchInput2 />
        </HeaderSearch>

        <HeaderLogin />
        <HeaderCart />
      </Box> */}
    </Box>
  );
  return (
    <Fragment>
      <Topbar>
        <Topbar.Left label={topbar.label} title={topbar.title} />

        <Topbar.Right>
          {/* <TopbarLanguageSelector languages={topbar.languageOptions} /> */}
          <TopbarSocialLinks links={topbar.socials} />
        </Topbar.Right>
      </Topbar>

      <Sticky fixedOn={0} scrollDistance={300}>
        <Header mobileHeader={MOBILE_VERSION_HEADER}>
          <Box display="flex" minWidth={100} alignItems="center">
            <Link href="/">
              <LazyImage
                priority
                src={"../../assets/images/logo.svg"}
                alt={"logo"}
                width={105}
                height={50}
                sizes="(max-width: 768px) 80px, 105px"
                sx={{ objectFit: "contain" }}
              />
            </Link>
          </Box>
          <Box display="flex" minWidth={100} alignItems="center">
            <Link href="/">
              <LazyImage
                priority
                src={header.logo}
                alt={"logo"}
                width={105}
                height={50}
                sizes="(max-width: 768px) 80px, 105px"
                sx={{ objectFit: "contain" }}
              />
            </Link>
          </Box>

          <NavigationList navigation={header.navigation} />

          <div className="flex items-center">
            {/* <HeaderLogin />
            <HeaderCart /> */}
          </div>
        </Header>
      </Sticky>
      {/* 
        <SecondaryHeader elevation={0}>
          <SecondaryHeader.Left>
            <CategoryList categories={header.categoryMenus} />
          </SecondaryHeader.Left> 

          <SecondaryHeader.Right>
            <SearchInput1 categories={header.categories} />
          </SecondaryHeader.Right>
        </SecondaryHeader>  */}

      {children}

      <MobileNavigationBar navigation={mobileNavigation.version1} />

      <Footer1>
        <Footer1.Brand>
          <Link href="/">
            <Image src={footer.logo} alt="logo" width={105} height={50} />
          </Link>

          <Typography
            variant="body1"
            sx={{
              mt: 1,
              mb: 3,
              maxWidth: 370,
              color: "white",
              lineHeight: 1.7,
            }}
          >
            {footer.description}
          </Typography>

          {/*  <FooterApps
              playStoreUrl={footer.playStoreUrl}
              appleStoreUrl={footer.appStoreUrl}
            /> */}
        </Footer1.Brand>

        <Footer1.Widget1>
          <FooterLinksWidget title="About Us" links={footer.about} />
        </Footer1.Widget1>

        <Footer1.Widget2>
          <FooterLinksWidget title="Customer Care" links={footer.customers} />
        </Footer1.Widget2>

        <Footer1.Contact>
          <FooterContact
            phone={footer.contact.phone}
            email={footer.contact.email}
            address={footer.contact.address}
          />

          <FooterSocialLinks links={footer.socials} />
        </Footer1.Contact>

        <Footer1.Copyright>
          <Divider
            sx={{
              borderColor: "grey.800",
            }}
          />

          <Typography
            variant="body2"
            sx={{
              py: 3,
              textAlign: "center",
              span: {
                fontWeight: 500,
              },
            }}
          >
            &copy; Copyright {new Date().getFullYear()} ||{" "}
            <span>Flysolarstore</span>, All rights reserved.
          </Typography>
        </Footer1.Copyright>
      </Footer1>
    </Fragment>
  );
}
