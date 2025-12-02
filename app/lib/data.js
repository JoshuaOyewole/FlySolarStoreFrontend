const categories = [
  { title: "All Categories", value: "" },
  { title: "Car", value: "car" },
  { title: "Clothes", value: "clothes" },
  { title: "Electronics", value: "electronics" },
  { title: "Laptop", value: "laptop" },
  { title: "Desktop", value: "desktop" },
  { title: "Camera", value: "camera" },
  { title: "Toys", value: "toys" },
];
const footerContact = {
  phone: "08167360193",
  email: "contact@flysolarstore.com",
  address: "Shop B427 Upstairs, Alaba International Market, Lagos.",
};
const footerAboutLinks = [

  {
    title: "Terms & Conditions",
    url: "terms-and-conditions",
  },
  {
    title: "Privacy Policy",
    url: "privacy-policy",
  },
];
const footerSocialLinks = {
  facebook: "https://www.facebook.com/flysolarstore/",
  twitter: "https://twitter.com/flysolarstore/",
  instagram: "https://www.instagram.com/flysolarstore/",
  youtube: "https://www.instagram.com/flysolarstore/",
  // google: "https://www.instagram.com/flysolarstore/",
};
const footerDescription =
  "Fly Solar Store is Nigeria's leading online solar equipment store, providing high-quality solar products and solutions to customers across the country. We are committed to promoting sustainable energy practices and making solar technology accessible to all.";

  const footerCustomerCareLinks = [
  {
    title: "Help Center",
    url: "https://api.whatsapp.com/send?phone=2347032054367&text=Hi%20Flysolarstore%2C%0APlease%20I%20want%20to%20make%20an%20enquire",
  },
  {
    title: "Track Your Order",
    url: "https://api.whatsapp.com/send?phone=2347032054367&text=Hi%20Flysolarstore%2C%0APlease%20I%20want%20to%20track%20my%20order",
  },
  {
    title: "Returns & Refunds",
    url: "https://api.whatsapp.com/send?phone=2347032054367&text=Hi%20Flysolarstore%2C%0APlease%20I%20want%20to%20make%20an%20enquire%20about%20returns%20and%20refunds",
  },
];
const topbarSocialLinks = {
  facebook: "https://www.facebook.com/flysolarstore",
  twitter: "https://twitter.com/flysolarstore",
  instagram: "https://www.instagram.com/flysolarstore",
};
const categoryMenus = [
  {
    icon: "ShirtLine",
    title: "Fashion",
    href: "/fashion",
    component: "Grid",
    offer: {
      url: "/assets/images/promotion/offer-1.png",
      href: "/sales-1",
      position: "right",
    },
    children: [
      {
        title: "Man Clothes",
        href: "#",
        children: [
          {
            title: "Shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "T- shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Pant",
            href: "/products/search?category=clothes",
          },
          {
            title: "Underwear",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Accessories",
        href: "#",
        children: [
          {
            title: "Belt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Hat",
            href: "/products/search?category=clothes",
          },
          {
            title: "Watches",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sunglasses",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Shoes",
        href: "#",
        children: [
          {
            title: "Sneakers",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sandals",
            href: "/products/search?category=clothes",
          },
          {
            title: "Formal",
            href: "/products/search?category=clothes",
          },
          {
            title: "Casual",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Bags",
        href: "#",
        children: [
          {
            title: "Backpack",
            href: "/products/search?category=clothes",
          },
          {
            title: "Crossbody Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Side Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Slides",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Woman Clothes",
        href: "#",
        children: [
          {
            title: "Shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "T- shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Pant",
            href: "/products/search?category=clothes",
          },
          {
            title: "Underwear",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Accessories",
        href: "#",
        children: [
          {
            title: "Belt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Hat",
            href: "/products/search?category=clothes",
          },
          {
            title: "Watches",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sunglasses",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Shoes",
        href: "#",
        children: [
          {
            title: "Sneakers",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sandals",
            href: "/products/search?category=clothes",
          },
          {
            title: "Formal",
            href: "/products/search?category=clothes",
          },
          {
            title: "Casual",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Bags",
        href: "#",
        children: [
          {
            title: "Backpack",
            href: "/products/search?category=clothes",
          },
          {
            title: "Crossbody Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Side Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Slides",
            href: "/products/search?category=clothes",
          },
        ],
      },
    ],
  },
  {
    icon: "LaptopMobile",
    title: "Electronics",
    component: "Grid",
    href: "/electronics",
    offer: {
      url: "/assets/images/promotion/offer-5.png",
      href: "/",
      position: "bottom",
    },
    children: [
      {
        title: "Man Clothes",
        href: "#",
        children: [
          {
            title: "Shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "T- shirt",
            href: "/products/search?category=t-clothes",
          },
          {
            title: "Pant",
            href: "/products/search?category=clothes",
          },
          {
            title: "Underwear",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Accessories",
        href: "#",
        children: [
          {
            title: "Belt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Hat",
            href: "/products/search?category=clothes",
          },
          {
            title: "Watches",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sunglasses",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Shoes",
        href: "#",
        children: [
          {
            title: "Sneakers",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sandals",
            href: "/products/search?category=clothes",
          },
          {
            title: "Formal",
            href: "/products/search?category=clothes",
          },
          {
            title: "Casual",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Bags",
        href: "#",
        children: [
          {
            title: "Backpack",
            href: "/products/search?category=clothes",
          },
          {
            title: "Crossbody Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Side Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Slides",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Woman Clothes",
        href: "#",
        children: [
          {
            title: "Shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "T- shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Pant",
            href: "/products/search?category=clothes",
          },
          {
            title: "Underwear",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Accessories",
        href: "#",
        children: [
          {
            title: "Belt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Hat",
            href: "/products/search?category=clothes",
          },
          {
            title: "Watches",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sunglasses",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Shoes",
        href: "#",
        children: [
          {
            title: "Sneakers",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sandals",
            href: "/products/search?category=clothes",
          },
          {
            title: "Formal",
            href: "/products/search?category=clothes",
          },
          {
            title: "Casual",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Bags",
        href: "#",
        children: [
          {
            title: "Backpack",
            href: "/products/search?category=clothes",
          },
          {
            title: "Crossbody Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Side Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Slides",
            href: "/products/search?category=clothes",
          },
        ],
      },
    ],
  },
  {
    icon: "PersonBiking",
    title: "Bikes",
    href: "/bikes",
    component: "List",
    children: [
      {
        icon: "ShirtLine",
        title: "Man",
        href: "#",
        component: "Grid",
        children: [
          {
            title: "Man Clothes",
            href: "#",
            children: [
              {
                title: "Shirt",
                href: "/products/search?category=clothes",
              },
              {
                title: "T- shirt",
                href: "/products/search?category=clothes",
              },
              {
                title: "Pant",
                href: "/products/search?category=clothes",
              },
              {
                title: "Underwear",
                href: "/products/search?category=clothes",
              },
            ],
          },
          {
            title: "Accessories",
            href: "#",
            children: [
              {
                title: "Belt",
                href: "/products/search?category=clothes",
              },
              {
                title: "Hat",
                href: "/products/search?category=clothes",
              },
              {
                title: "Watches",
                href: "/products/search?category=clothes",
              },
              {
                title: "Sunglasses",
                href: "/products/search?category=clothes",
              },
            ],
          },
          {
            title: "Shoes",
            href: "#",
            children: [
              {
                title: "Sneakers",
                href: "/products/search?category=clothes",
              },
              {
                title: "Sandals",
                href: "/products/search?category=clothes",
              },
              {
                title: "Formal",
                href: "/products/search?category=clothes",
              },
              {
                title: "Casual",
                href: "/products/search?category=clothes",
              },
            ],
          },
          {
            title: "Bags",
            href: "#",
            children: [
              {
                title: "Backpack",
                href: "/products/search?category=clothes",
              },
              {
                title: "Crossbody Bags",
                href: "/products/search?category=clothes",
              },
              {
                title: "Side Bags",
                href: "/products/search?category=clothes",
              },
              {
                title: "Slides",
                href: "/products/search?category=clothes",
              },
            ],
          },
        ],
      },
      {
        icon: "Woman",
        title: "Woman",
        href: "/products/search?category=clothes",
      },
      {
        icon: "BabyBoy",
        title: "Baby Boy",
        href: "/products/search?category=clothes",
      },
      {
        icon: "BabyGirl",
        title: "Baby Girl",
        href: "/products/search?category=clothes",
      },
    ],
  },
  {
    icon: "Trees",
    title: "Home & Garden",
    href: "/home-garden",
    component: "Grid",
    children: [
      {
        title: "Man Clothes",
        href: "#",
        children: [
          {
            title: "Shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "T- shirt",
            href: "/products/search?category=t-clothes",
          },
          {
            title: "Pant",
            href: "/products/search?category=clothes",
          },
          {
            title: "Underwear",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Accessories",
        href: "#",
        children: [
          {
            title: "Belt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Hat",
            href: "/products/search?category=clothes",
          },
          {
            title: "Watches",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sunglasses",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Shoes",
        href: "#",
        children: [
          {
            title: "Sneakers",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sandals",
            href: "/products/search?category=clothes",
          },
          {
            title: "Formal",
            href: "/products/search?category=clothes",
          },
          {
            title: "Casual",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Bags",
        href: "#",
        children: [
          {
            title: "Backpack",
            href: "/products/search?category=clothes",
          },
          {
            title: "Crossbody Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Side Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Slides",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Woman Clothes",
        href: "#",
        children: [
          {
            title: "Shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "T- shirt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Pant",
            href: "/products/search?category=clothes",
          },
          {
            title: "Underwear",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Accessories",
        href: "#",
        children: [
          {
            title: "Belt",
            href: "/products/search?category=clothes",
          },
          {
            title: "Hat",
            href: "/products/search?category=clothes",
          },
          {
            title: "Watches",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sunglasses",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Shoes",
        href: "#",
        children: [
          {
            title: "Sneakers",
            href: "/products/search?category=clothes",
          },
          {
            title: "Sandals",
            href: "/products/search?category=clothes",
          },
          {
            title: "Formal",
            href: "/products/search?category=clothes",
          },
          {
            title: "Casual",
            href: "/products/search?category=clothes",
          },
        ],
      },
      {
        title: "Bags",
        href: "#",
        children: [
          {
            title: "Backpack",
            href: "/products/search?category=clothes",
          },
          {
            title: "Crossbody Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Side Bags",
            href: "/products/search?category=clothes",
          },
          {
            title: "Slides",
            href: "/products/search?category=clothes",
          },
        ],
      },
    ],
  },
  {
    icon: "GiftLine",
    title: "Gifts",
    href: "/gifts",
    component: "List",
    children: [
      {
        icon: "LaptopMobile",
        title: "Electronics & Gadget",
        href: "/products/search?category=clothes",
      },
      {
        icon: "MicrophoneLines",
        title: "Music Instruments",
        href: "/products/search?category=clothes",
      },
      {
        icon: "ShirtLine",
        title: "Fashion",
        href: "/products/search?category=clothes",
      },
      {
        icon: "Trees",
        title: "Home & Garden",
        href: "/products/search?category=clothes",
      },
      {
        icon: "PersonBiking",
        title: "Bikes",
        href: "/products/search?category=clothes",
      },
      {
        icon: "GiftLine",
        title: "Gifts",
        href: "/products/search?category=clothes",
      },
      {
        icon: "MakeUp",
        title: "Beauty Care",
        href: "/products/search?category=clothes",
      },
      {
        icon: "PawSimple",
        title: "Dog Food",
        href: "/products/search?category=clothes",
      },
    ],
  },
  {
    icon: "MicrophoneLines",
    title: "Music",
    href: "/products/search?category=clothes",
  },
  {
    icon: "MakeUp",
    title: "Health & Beauty",
    href: "/products/search?category=clothes",
  },
  {
    icon: "PawSimple",
    title: "Pets",
    href: "/products/search?category=clothes",
  },
  {
    icon: "TeddyBearLight",
    title: "Baby Toys",
    href: "/products/search?category=clothes",
  },
  {
    icon: "BasketShopping",
    title: "Groceries",
    href: "/products/search?category=clothes",
  },
  {
    icon: "TireRuggedLight",
    title: "Automotive",
    href: "/products/search?category=clothes",
  },
];
export const header = {
  logo: "/assets/images/logo_new.png",
  navigation: [
    {
      title: "Home",
      url: "/",
    },
    /*  {
      title: "Shop",
      megaMenu: false,
      megaMenuWithSub: false,
      child: [
          {
            title: "Market",
            child: [
              {
                title: "Market 1",
                url: "/market-1",
              },
              {
                title: "Market 2",
                url: "/market-2",
              },
              {
                title: "Market 3",
                url: "/market-3",
              },
            ],
          },
          {
            title: "Medical",
            url: "/medical",
          },
          {
            title: "Gift Store",
            url: "/gift-shop",
          },
          
      ],
    },
    {
      megaMenu: true,
      megaMenuWithSub: false,
      title: "Mega Menu",
      child: megaMenus,
    },  
    {
      megaMenu: false,
      megaMenuWithSub: true,
      title: "Full Screen Menu",
      child: categoriesMegaMenu,
    },
    {
      megaMenu: false,
      megaMenuWithSub: false,
      title: "Pages",
      child: [
        {
          title: "Sale Page",
          child: [
            {
              title: "Version 1",
              url: "/sales-1",
            },
            {
              title: "Version 2",
              url: "/sales-2",
            },
          ],
        },
        {
          title: "Vendor",
          child: [
            {
              title: "All vendors",
              url: "/shops",
            },
            {
              title: "Vendor store",
              url: "/shops/scarlett-beauty",
            },
          ],
        },
        {
          title: "Shop",
          child: [
            {
              title: "Search product",
              url: "/products/search?category=clothes",
            },
            {
              title: "Single product",
              url: "/products/lord-2019",
            },
            {
              title: "Cart",
              url: "/cart",
            },
            {
              title: "Checkout",
              url: "/checkout",
            },
            {
              title: "Alternative Checkout",
              url: "/checkout-alternative",
            },
            {
              title: "Order confirmation",
              url: "/order-confirmation",
            },
          ],
        },
        {
          title: "Auth",
          child: [
            {
              title: "Login",
              url: "/login",
            },
            {
              title: "Register",
              url: "/register",
            },
          ],
        },
      ],
    }, */

    //BRING THIS BACK LATER
    /* {
      megaMenu: false,
      megaMenuWithSub: false,
      title: "Shop",
      child: [
        {
          title: "Inverters",
          child: [
            {
              title: "Pure Sine Wave Inverters",
              url: "/orders",
            },
            {
              title: "Hybrid Inverters",
              url: "/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8",
            },
            {
              title: "Others",
              url: "/orders",
            },
          ],
        },
        {
          title: "Batteries",
          child: [
            {
              title: "Lithium Battery",
              url: "/profile",
            },
            {
              title: "Gel Battery",
              url: "/profile/e42e28ea-528f-4bc8-81fb-97f658d67d75",
            },
          ],
        },
        {
          title: "Solar Panels",
          child: [
            {
              title: "Monocrystalline",
              url: "/address",
            },
            {
              title: "Polycrystalline",
              url: "/address/d27d0e28-c35e-4085-af1e-f9f1b1bd9c34",
            },
          ],
        },

        {
          title: "Charge Controllers",
          url: "/wish-list",
        },
      ],
    }, */
    {
      title: "Products",
      url: "/products",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Blog",
      url: "/blog",
    },
    {
      title: "Support",
      url: "/support",
    },
    /*   {
      megaMenu: false,
      megaMenuWithSub: false,
      title: "Vendor Account",
      child: [
        {
          title: "Dashboard",
          url: "/vendor/dashboard",
        },
        {
          title: "Products",
          child: [
            {
              title: "All products",
              url: "/admin/products",
            },
            {
              title: "Add/Edit product",
              url: "/admin/products/lord-2019",
            },
          ],
        },
        {
          title: "Orders",
          child: [
            {
              title: "All orders",
              url: "/admin/orders",
            },
            {
              title: "Order details",
              url: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8",
            },
          ],
        },
        {
          title: "Profile",
          url: "/vendor/account-settings",
        },
      ],
    },  */
  ],
  categoryMenus: categoryMenus,
  categories,
};
const languageOptions = {
  en: {
    title: "EN",
    value: "en",
  },
  es: {
    title: "DE",
    value: "de",
  },
};
export const footer = {
  appStoreUrl: "#",
  playStoreUrl: "#",
  logo: "/assets/images/logo_new.png",
  contact: footerContact,
  about: footerAboutLinks,
  socials: footerSocialLinks,
  description: footerDescription,
  customers: footerCustomerCareLinks,
};

export const topbar = {
  label: "HOT",
  title: "Fast / Express Shipping",
  socials: topbarSocialLinks,
  languageOptions: languageOptions,
};


const mobileNavigationData = [
  {
    title: "Home",
    icon: "Home",
    href: "/",
    badge: false,
  },
  {
    title: "Products",
    icon: "CategoryOutlined",
    href: "/products",
    badge: false,
  },
  {
    title: "Cart",
    icon: "ShoppingBagOutlined",
    href: "/cart",
    badge: true,
  },
  {
    title: "Account",
    icon: "User2",
    href: "/profile",
    badge: false,
  },
];
const mobileNavigationTwoData = [
  {
    title: "Home",
    icon: "Home",
    href: "/",
    badge: false,
  },
  {
    title: "Category",
    icon: "CategoryOutlined",
    href: "/categories",
    badge: false,
  },
  {
    title: "Cart",
    icon: "ShoppingBagOutlined",
    href: "/cart",
    badge: true,
  },
  {
    title: "Account",
    icon: "User2",
    href: "/profile",
    badge: false,
  },
];

export const mobileNavigation = {
  version1: mobileNavigationData,
  version2: mobileNavigationTwoData,
  logo: "/assets/images/FlySolarStore-black-sm.svg",
};