import axios, { AxiosInstance } from 'axios';

// Создаем экземпляр axios
export const http: AxiosInstance = axios.create({
    baseURL:  "http://localhost:3001/",
    withCredentials: true,
    timeout: 15000,
});

// Настройка interceptor для обработки ошибок
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

export async function loginDiscord(code: string, userData: object) {
    console.log(code, userData);
    try {
        const response = await http.post(`auth/discord/login`, {code, user: userData})
        return {ok: true, ...response.data};
    } catch (e: any) {
        return {ok: false, ...e};
    }
}