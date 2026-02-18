const BASE_URL = 'https://fakestoreapi.com';

export const productService = {
    getAllProducts: async () => {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    getProductById: async (id) => {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        return response.json();
    },

    getCategories: async () => {
        const response = await fetch(`${BASE_URL}/products/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },

    getProductsByCategory: async (category) => {
        const response = await fetch(`${BASE_URL}/products/category/${category}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    }
};
