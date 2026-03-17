import axios from 'axios';

export const apiProducts = axios.create({
    baseURL: 'https://devsapihub.com/api-ecommerce'// Esta es la ruta mientras desarrollamos local 'http://localhost:5001/api'
    // withCredentials:true
});

export const apiUsers = axios.create({
    baseURL: 'https://devsapihub.com/api-users' // Esta es la ruta mientras desarrollamos local 'http://localhost:5001/api'
    // withCredentials:true
});

const injectToken = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        const cleanToken = token.replace(/['"]+/g, '');
        config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
};

apiProducts.interceptors.request.use(injectToken, (error) => Promise.reject(error));
apiUsers.interceptors.request.use(injectToken, (error) => Promise.reject(error));

export const setupInterceptors = (logout) => {
    apiProducts.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                logout()
            }
            return Promise.reject(error);
        }
    );

    apiUsers.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                logout();
            }
            return Promise.reject(error);
        }
    );
};