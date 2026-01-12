// PAGE VIEW COMPONENT
import ProductSearchPageView from "./ProductSearchPageView";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Fetch products based on search query
async function searchProducts(searchParams) {
  const { q, category, minPrice, maxPrice, sort, page = 1 } = searchParams;
  
  if (!q) {
    return { products: [], totalProducts: 0 };
  }

  try {
    const params = new URLSearchParams();
    params.append('q', q);
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    params.append('limit', '100'); // Get all matching products for client-side pagination

    const response = await fetch(
      `${API_BASE_URL}/products/search?${params.toString()}`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return {
      products: data.data || [],
      totalProducts: data.count || 0,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], totalProducts: 0 };
  }
}

// Fetch categories for filters
async function getCategories() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/categories?limit=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.data?.map(cat => cat.name) || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export const metadata = {
  title: "Product Search - No 1 for Solar Products Online Store",
  description:
    "Flysolarstore is your go-to online store for high-quality solar products. Explore our wide range of solar panels, inverters, batteries, and accessories designed to meet all your renewable energy needs. Shop now and embrace sustainable living with Flysolarstore!",
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

export default async function ProductSearch({ searchParams }) {
  const params = await searchParams;
  
  const [{ products, totalProducts }, categories] = await Promise.all([
    searchProducts(params),
    getCategories(),
  ]);

  return (
    <ProductSearchPageView
      initialProducts={products}
      totalProducts={totalProducts}
      categories={categories}
    />
  );
}
