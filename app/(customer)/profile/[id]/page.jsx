import { notFound } from "next/navigation";
import { ProfileEditPageView } from "../../../pages-sections/customer/profile/page-view";
import users from "../../../data/market-1/data";

export function generateMetadata() {
  const user = users.users[0];
  if (!user) {
    return notFound();
  }
  const name = `${user.name.firstName} ${user.name.lastName}`;
  return {
    title: name + " - No 1 for Solar Products Online Store",
    description: "FlySolarStore is a React Next.js E-commerce template.",
    authors: [
      {
        name: "Orisfina Tech",

        url: "https://orisfinatech.com.ng",
      },
    ],
    keywords: [
      "solar",
      "solar panels",
      "inverters",
      "batteries",
      "solar accessories",
      "renewable energy",
      "sustainable living",
      "Flysolarstore",
    ],
  };
}
export default function ProfileEdit() {
  const user = users.users[0];
 
  if (!user) {
    return notFound();
  }
  return <ProfileEditPageView user={user} />;
}
