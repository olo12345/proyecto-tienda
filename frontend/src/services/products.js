import apiProducts from './api.js';

export const getProducts = () => apiProducts.get('/');

export const getProduct = (id) => apiProducts.get(`/product/${id}`);

export const getProductByCategory = () => apiProducts.get(`/category/${category}`);

export const createProduct = () => apiProducts.get('/');

export const updateProduct = () => apiProducts.get('/');

export const deleteProduct = () => apiProducts.get('/');