import { cache } from "react";
import products from "../data/market-1/data";


// FILTER OPTIONS
const CATEGORIES = [{
  title: "Solar Panels",
  children: ["Monocrystalline", "Polycrystalline", "Thin Film"]
}, {
  title: "Inverters",
  children: ["String Inverters", "Micro Inverters", "Hybrid Inverters"]
}, {
  title: "Batteries",
  children: ["Lithium-ion", "Lead-acid", "Gel Batteries"]
}, {
  title: "Solar Accessories",
  children: ["Mounting Systems", "Cables", "Charge Controllers"]
}];
const BRANDS = [{
  label: "SunPower",
  value: "sunpower"
}, {
  label: "Tesla",
  value: "tesla"
}, {
  label: "LG Solar",
  value: "lg"
}, {
  label: "Canadian Solar",
  value: "canadian"
}, {
  label: "Jinko Solar",
  value: "jinko"
}];
const OTHERS = [{
  label: "On Sale",
  value: "sale"
}, {
  label: "In Stock",
  value: "stock"
}, {
  label: "Featured",
  value: "featured"
}, {
  label: "New Arrivals",
  value: "new"
}];
const COLORS = ["#1C1C1C", "#FF7A7A", "#FFC672", "#84FFB5", "#70F6FF", "#6B7AFF"];
export const getFilters = cache(async () => {
  return {
    brands: BRANDS,
    others: OTHERS,
    colors: COLORS,
    categories: CATEGORIES
  };
});
export const getProducts = cache(async ({
  q,
  page = 1,
  sort,
  sale,
  prices,
  colors,
  brands,
  rating,
  category
}) => {
  let filteredProducts = [...products.products];
  
  // Search by query
  if (q) {
    const searchQuery = q.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(searchQuery) ||
      (product.categories && product.categories.some(cat => 
        cat.toLowerCase().includes(searchQuery)
      ))
    );
  }
  
  // Filter by sale
  if (sale === "true") {
    filteredProducts = filteredProducts.filter(product => product.discount > 0);
  }
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.categories && product.categories.includes(category)
    );
  }
  
  // Filter by brands
  if (brands) {
    const brandArray = brands.split(',');
    filteredProducts = filteredProducts.filter(product => 
      product.brand && brandArray.includes(product.brand.toLowerCase())
    );
  }
  
  // Filter by rating
  if (rating) {
    const minRating = parseFloat(rating);
    filteredProducts = filteredProducts.filter(product => 
      product.rating >= minRating
    );
  }
  
  // Sort products
  if (sort) {
    switch (sort) {
      case "asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "desc":
        filteredProducts.sort((a, b) => b.price - b.price);
        break;
      case "date":
        filteredProducts.reverse();
        break;
      default:
        // relevance - keep as is
        break;
    }
  }
  
  // Pagination
  const perPage = 9;
  const totalProducts = filteredProducts.length;
  const pageCount = Math.ceil(totalProducts / perPage);
  const currentPage = parseInt(page) || 1;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    pageCount: pageCount || 1,
    totalProducts,
    firstIndex: startIndex,
    lastIndex: Math.min(endIndex, totalProducts)
  };
});