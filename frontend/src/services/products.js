import {apiProducts} from './api.js';

export const getAllProducts = () => {
    return apiProducts.get('/libros/all').then(res => res.data);
}

export const getProducts = (params) => {
    // Enviar directamente los params que vienen del componente
    return apiProducts.get('/libros', { params }).then(res => res.data);
};

export const getProduct = (id) =>
    apiProducts.get(`/libros/libro/${id}`).then(res => res.data);

export const getProductsByRating =() =>
    apiProducts.get(`/libros/destacados`).then(res => res.data);

export const createProduct = (product) =>
    apiProducts.post('/libros', product).then(res => res.data);

export const updateProduct = (id, product) =>
    apiProducts.put(`/libros/${id}`, product).then(res => res.data);

export const deleteProduct = (id) =>
    apiProducts.delete(`/libros/${id}`).then(res => res.data);

//se incorpora lo de los comentarios que no lo teníamos
export const addReview = (id, reviewData) =>
    apiProducts.post(`/libros/comentarios/${id}`, reviewData).then(res => res.data);