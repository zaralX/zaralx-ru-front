import axios from 'axios';
import {config} from "../../config/config.js";

export const http = axios.create({
    baseURL: config.api,
    withCredentials: true,
    timeout: 15000,
});

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) return Promise.reject(error);
        const originalRequest = error.config;

        if (error.response.status === 401) {
            try {
                await http.post('/users/@me/refresh');
                return http(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export async function loginDiscord(code, userData) {
    console.log(code, userData);
    try {
        const response = await http.post(`auth/discord/login`, {code, user: userData})
        return {ok: true, ...response.data};
    } catch (e) {
        return {ok: false, ...e};
    }
}

export async function loginTelegram(hash, userData) {
    console.log(hash, userData);
    try {
        const data = JSON.parse(atob(hash));
        data.user = userData;
        const response = await http.post(`auth/telegram/login`, data)
        return {ok: true, ...response.data};
    } catch (e) {
        return {ok: false, ...e};
    }
}