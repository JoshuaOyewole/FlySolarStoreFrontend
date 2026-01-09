/**
 * API Service for FlySolarStore
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const isFormData = options.body instanceof FormData;

  /*  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }; */

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...options.headers,
  };

  // ✅ If running on the server, forward cookies manually
  if (typeof window === "undefined") {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (cookieHeader) {
      headers.Cookie = cookieHeader;
    }
  }

  const config = {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || "An error occurred",
        errors: data?.errors || [],
      };
    }

    return data;
  } catch (error) {
    if (error.status) throw error;

    throw {
      status: 500,
      message: error.message || "Network error occurred",
      errors: [],
    };
  }
}

/**
 * Authentication API
 */
export const authAPI = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
    });
  },

  /**
   * Login user
   */
  login: async (credentials) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      credentials: "include",
    });
  },

  /**
   * Logout user
   */
  logout: async () => {
    return apiRequest("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    return apiRequest("/auth/me", {
      method: "GET",
      credentials: "include",
    });
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData) => {
    return apiRequest("/auth/update-profile", {
      method: "PUT",
      body: JSON.stringify(userData),
      credentials: "include",
    });
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token) => {
    return apiRequest(`/auth/verify-email?token=${token}`, {
      method: "GET",
      credentials: "include",
    });
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email) => {
    return apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Reset password
   */
  resetPassword: async (token, password) => {
    return apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
      credentials: "include",
    });
  },

  /**
   * Update password
   */
  updatePassword: async (currentPassword, newPassword) => {
    return apiRequest("/auth/update-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
      credentials: "include",
    });
  },
};

/**
 * Products API
 */
export const productsAPI = {
  /**
   * Get all products
   */
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products${queryString ? `?${queryString}` : ""}`, {
      method: "GET",
    });
  },

  /**
   * Get single product
   */
  getById: async (id) => {
    return apiRequest(`/products/${id}`, {
      method: "GET",
    });
  },

  create: async (productData) => {
    return apiRequest("/products/admin/products", {
      method: "POST",
      body: productData,
      credentials: "include",
    });
  },

  edit: async (id, productData) => {
    return apiRequest(`/products/admin/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
      credentials: "include",
    });
  },

  delete: async (id) => {
    return apiRequest(`/products/admin/product/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  },
};

/**
 * Orders API
 */
export const ordersAPI = {
  /**
   * Create new order
   */
  create: async (orderData) => {
    return apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
      credentials: "include",
    });
  },

  /**
   * Get user orders with pagination
   */
  getMyOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(
      `/orders/my-orders${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
  },

  /**
   * Get order by ID or order number
   */
  getById: async (id) => {
    return apiRequest(`/orders/${id}`, {
      method: "GET",
      credentials: "include",
    });
  },

  /**
   * Get all orders (admin)
   */
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/orders${queryString ? `?${queryString}` : ""}`, {
      method: "GET",
      credentials: "include",
    });
  },
};

/* Categories API */

export const categoriesAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(
      `/admin/categories${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
  },
  create: async (categoryData) => {
    return apiRequest("/admin/categories/create", {
      method: "POST",
      body: JSON.stringify(categoryData),
      credentials: "include",
    });
  },
  edit: async (id, categoryData) => {
    return apiRequest(`/admin/categories/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
      credentials: "include",
    });
  },
  delete: async (id) => {
    return apiRequest(`/admin/categories/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  },
};
/**
 * Blog API
 */
export const blogAPI = {
  /**
   * Get all blogs
   */
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/blogs${queryString ? `?${queryString}` : ""}`, {
      method: "GET",
    });
  },

  /**
   * Get single blog
   */
  getById: async (id) => {
    return apiRequest(`/blogs/${id}`, {
      method: "GET",
    });
  },
};

export default {
  authAPI,
  productsAPI,
  ordersAPI,
  blogAPI,
};
