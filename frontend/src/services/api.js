import axios from 'axios';

// export const apiProducts = axios.create({
//     baseURL: 'https://devsapihub.com/api-ecommerce'// Esta es la ruta mientras desarrollamos local 'http://localhost:5001/api'
//     // withCredentials:true
// });

// export const apiUsers = axios.create({
//     baseURL: 'https://devsapihub.com/api-users' // Esta es la ruta mientras desarrollamos local 'http://localhost:5001/api'
//     // withCredentials:true
// });

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Dejamos ambos apuntando al mismo sitio, pero mantenemos los nombres por
// convención de lo que veniamos usando y así no cambiamos el resto del código
export const apiProducts = axios.create({ baseURL: BASE_URL });
export const apiUsers = axios.create({ baseURL: BASE_URL });

const injectToken = (config) => {
    let token = localStorage.getItem('token');
    if (token) {
        const cleanToken = token.replace(/^"|"$/g, '');
        config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
};

apiProducts.interceptors.request.use(injectToken, (error) => Promise.reject(error));
apiUsers.interceptors.request.use(injectToken, (error) => Promise.reject(error));

export const setupInterceptors = (logout) => {
    const handleResponseError = (error) => {
        if (error.response?.status === 401) {
            logout();
        }
        return Promise.reject(error);
    };

    apiProducts.interceptors.response.use((response) => response, handleResponseError);
    apiUsers.interceptors.response.use((response) => response, handleResponseError);
};