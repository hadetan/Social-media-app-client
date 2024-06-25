import axios from 'axios';
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
    setItem,
} from './localStrorageManager';
import { configs } from '../configs';

export const axiosClient = axios.create({
    baseURL: `${configs.PORT}`,
    withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers['Authorization'] = `Bearer ${accessToken}`;

    return request;
});

axiosClient.interceptors.response.use(async (response) => {
    const data = response.data;

    if (data.status === 'ok') {
        return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.error;

    // When refresh token expires, send user to login page
    if (
        statusCode === 401 &&
        originalRequest.url === `${configs.PORT}/auth/refresh`
    ) {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace('/login', '_self');
        return Promise.reject(error);
    }

    // The access token may have expired
    if (statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const response = await axios.create({withCredentials: true}).get(`${configs.PORT}/auth/refresh`)

        if (response.status === 'ok') {
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            originalRequest.headers[
                'Authorization'
            ] = `Bearer ${response.result.accessToken}`;

            return axios(originalRequest);
        }
    }

    return Promise.reject(error);
});
