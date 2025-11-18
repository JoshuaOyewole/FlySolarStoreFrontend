import { CartPageView } from "../../pages-sections/cart/page-view";

export const metadata = {
  title: "Cart - No 1 for Solar Products Online Store",
  description: "Flysolarstore is your go-to online store for high-quality solar products. Explore our wide range of solar panels, inverters, batteries, and accessories designed to meet all your renewable energy needs. Shop now and embrace sustainable living with Flysolarstore!",
  authors: [{
    name: "Orisfina Tech",
    
      url: "https://orisfinatech.com.ng"
  }],
  keywords: ["solar", "solar panels", "inverters", "batteries", "solar accessories", "renewable energy", "sustainable living", "Flysolarstore"],
};
export default function Cart() {
  return <CartPageView />;
}