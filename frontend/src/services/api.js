import axios from 'axios';

export const apiProducts = axios.create({
    baseUrl: 'https://devsapihub.com/api-ecommerce'
    // withCredentials:true
});

export const apiUsers = axios.create({
    baseUrl: 'https://devsapihub.com/api-users'
    // withCredentials:true
});

export const setupInterceptors = (logout) =>
    apiProducts.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                logout()
            }
            return Promise.reject(error);
        }
    )