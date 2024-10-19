import axios, { AxiosInstance } from "axios";
import { getTokenServer } from '@/hooks/auth/authServer';

const guardIntance = (token: string | null): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL
    });

    if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return instance;
}

const setAuthToken = (token: string | null): void => {

    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    else delete axios.defaults.headers.common['Authorization'];

}

export const axiosConfig = {
    guardIntance,
    setAuthToken,
}