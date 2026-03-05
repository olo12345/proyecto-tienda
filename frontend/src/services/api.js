import axios from 'axios';

export const apiProducts = axios.create( {
    baseUrl: 'https://devsapihub.com/api-ecommerce'
});

export const apiUsers = axios.create( {
    baseUrl: 'https://devsapihub.com/api-users'
});

export const setupInterceptors = () =>
    apiProducts.interceptors.response.use(
        (response) => response
        (error) => {
            if (error.response) logout()
        }
    )