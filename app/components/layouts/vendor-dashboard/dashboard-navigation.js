import duotone from "../../icons/duotone";
export const navigation = [
  {
    type: "label",
    label: "Admin",
  },
  {
    name: "Dashboard",
    icon: duotone.Dashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Products",
    icon: duotone.Products,
    children: [
      {
        name: "Product List",
        path: "/admin/products",
      },
      {
        name: "Create Product",
        path: "/admin/products/create",
      },
      {
        name: "Product Reviews",
        path: "/admin/products/reviews",
      },
    ],
  },
  {
    name: "Categories",
    icon: duotone.Accounts,
    children: [
      {
        name: "Category List",
        path: "/admin/categories",
      },
      {
        name: "Create Category",
        path: "/admin/categories/create",
      },
    ],
  },
  {
    name: "Orders",
    icon: duotone.Order,
    children: [
      {
        name: "Order List",
        path: "/admin/orders",
      },
    ],
  },
  {
    name: "Blog",
    icon: duotone.Blog,
    children: [
      {
        name: "Blog List",
        path: "/admin/blogs",
      },
      {
        name: "Create Blog",
        path: "/admin/blogs/create",
      },
    ],
  },
  {
    name: "Carousels",
    icon: duotone.Products,
    children: [
      {
        name: "Carousel List",
        path: "/admin/carousel",
      },
      {
        name: "Create Carousel",
        path: "/admin/carousel/create",
      },
    ],
  },
  /* {
  name: "Customers",
  icon: duotone.Customers,
  path: "/admin/customers"
} */
  ,
];
