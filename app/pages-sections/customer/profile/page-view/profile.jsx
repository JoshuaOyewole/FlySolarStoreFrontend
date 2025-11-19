import { Fragment } from "react";

// CUSTOM COMPONENTS
import User3 from "../../../../components/icons/User3";
import UserInfo from "../user-info";
//import UserAnalytics from "../user-analytics";
import DashboardHeader from "../../dashboard-header";


export function ProfilePageView({
  user
}) {
  return <Fragment>
      <DashboardHeader title="My Profile" Icon={User3} />
     {/*  <UserAnalytics user={user} /> */}
      <UserInfo user={user} />
    </Fragment>;
}