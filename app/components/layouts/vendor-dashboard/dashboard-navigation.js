import duotone from "../../icons/duotone";
export const navigation = [{
  type: "label",
  label: "Admin"
}, {
  name: "Dashboard",
  icon: duotone.Dashboard,
  path: "/admin/dashboard"
}, {
  name: "Products",
  icon: duotone.Products,
  children: [{
    name: "Product List",
    path: "/admin/products"
  }, {
    name: "Create Product",
    path: "/admin/products/create"
  }, {
    name: "Product Reviews",
    path: "/admin/products/reviews"
  }]
}, {
  name: "Categories",
  icon: duotone.Accounts,
  children: [{
    name: "Category List",
    path: "/admin/categories"
  }, {
    name: "Create Category",
    path: "/admin/categories/create"
  }]
}, {
  name: "Orders",
  icon: duotone.Order,
  children: [{
    name: "Order List",
    path: "/admin/orders"
  }, {
    name: "Order Details",
    path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
  }]
}, {
  name: "Customers",
  icon: duotone.Customers,
  path: "/admin/customers"
}, {
  name: "Logout",
  icon: duotone.Session,
  path: "/"
}];