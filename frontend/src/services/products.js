import {apiProducts} from './api.js';

export const getProducts = (params) => 
    apiProducts.get('/libros', { params }).then(res => res.data);

export const getProduct = (id) => 
    apiProducts.get(`/libros/${id}`).then(res => res.data);

export const getProductsByStyle = (style) => 
    apiProducts.get(`/libros/categoria/${style}`).then(res => res.data);

export const createProduct = (product) => 
    apiProducts.post('/libros', product).then(res => res.data);

export const updateProduct = (id, product) => 
    apiProducts.put(`/libros/${id}`, product).then(res => res.data);

export const deleteProduct = (id) => 
    apiProducts.delete(`/libros/${id}`).then(res => res.data);

//se incorpora lo de los comentarios que no lo teníamos
export const addComment = (commentData) =>
    apiProducts.post('/comentarios', commentData).then(res => res.data);