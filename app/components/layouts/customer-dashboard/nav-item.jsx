"use client";

import { usePathname } from "next/navigation";
import Typography from "@mui/material/Typography";

// CUSTOM ICON COMPONENTS
import User3 from "../../../components/icons/User3";
import Headset from "../../../components/icons/Headset";
import Packages from "../../../components/icons/Packages";
import Location from "../../../components/icons/Location";
import HeartLine from "../../../components/icons/HeartLine";
import CreditCard from "../../../components/icons/CreditCard";

// STYLED COMPONENTS
import { StyledLink } from "./styles";
const icons = {
  Packages,
  HeartLine,
  Headset,
  User3,
  Location,
  CreditCard
};


// ==============================================================


// ==============================================================

export default function NavItem({
  item
}) {
  const {
    href,
    icon,
    title,
    count
  } = item;
  const pathname = usePathname();
  const Icon = icons[icon];

  return <StyledLink href={href} key={title} isActive={pathname === href}>
      <div className="title">
        <Icon color="inherit" fontSize="small" className="nav-icon" />
        <Typography variant="body2">{title}</Typography>
      </div>

      {Number(count) ? <span>{count}</span> : null}
    </StyledLink>;
}