import { notFound } from "next/navigation";
import { ProfileEditPageView } from "pages-sections/customer-dashboard/profile/page-view";

// API FUNCTIONS
import api from "utils/__api__/users";
export async function generateMetadata() {
  const user = await api.getUser();
  if (!user) {
    return notFound();
  }
  const name = `${user.name.firstName} ${user.name.lastName}`;
  return {
    title: name + " - No 1 for Solar Products Online Store",
    description: "FlySolarStore is a React Next.js E-commerce template.",
    authors: [{
      name: "Orisfina Tech",
      
      url: "https://orisfinatech.com.ng"
    }],
    keywords: ["solar", "solar panels", "inverters", "batteries", "solar accessories", "renewable energy", "sustainable living", "Flysolarstore"],
  };
}
export default async function ProfileEdit() {
  const user = await api.getUser();
  if (!user) {
    return notFound();
  }
  return <ProfileEditPageView user={user} />;
}