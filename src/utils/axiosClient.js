import axios from 'axios';
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
    setItem,
} from './localStrorageManager';
import { configs } from '../configs';
import store from '../redux/store';
import { setLoading, showToast } from '../redux/slices/appConfigSlice';
import { TOAST_FAILURE } from '../App';

export const axiosClient = axios.create({
    baseURL: `${configs.PORT}`,
    withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers['Authorization'] = `Bearer ${accessToken}`;
    store.dispatch(setLoading(true));

    return request;
});

axiosClient.interceptors.response.use(
    async (response) => {
        store.dispatch(setLoading(false));
        const data = response.data;

        if (data.status === 'ok') {
            return data;
        }

        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.message;

        store.dispatch(
            showToast({
                type: TOAST_FAILURE,
                message: error,
            })
        );

        // The access token may have expired
        if (statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const response = await axios
                .create({ withCredentials: true })
                .get(`${configs.PORT}/auth/refresh`);

            if (response.status === 'ok') {
                //if this does'nt work then use this one //response.data.result.accessToken
                setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
                originalRequest.headers[
                    'Authorization'
                ] = `Bearer ${response.result.accessToken}`;

                return axios(originalRequest);
            } else {
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace('/login', '_self');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
    async (error) => {
        store.dispatch(setLoading(false));
        store.dispatch(
            showToast({
                type: TOAST_FAILURE,
                message: error.message,
            })
        );
        return Promise.reject('error from axiosClient response', error);
    }
);
