import {apiProducts} from './api.js';

export const getProducts = () => apiProducts.get('/');

export const getProduct = (id) => apiProducts.get(`/product/${id}`);

export const getProductsByStyle = (style) => apiProducts.get(`/style/${style}`);

export const createProduct = (product) => apiProducts.post('/product', product);

export const updateProduct = (id, product) => apiProducts.put(`/product/${id}`, product);

export const deleteProduct = (id) => apiProducts.delete(`/product/${id}`);