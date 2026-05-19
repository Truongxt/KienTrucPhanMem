import axios from 'axios';

const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8000';


const createInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add interceptor for auth token
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};

export const userApi = createInstance(API_GATEWAY_URL);
export const foodApi = createInstance(API_GATEWAY_URL);
export const orderApi = createInstance(API_GATEWAY_URL);
export const paymentApi = createInstance(API_GATEWAY_URL);

export default userApi; // default as userApi for backward compatibility if needed
