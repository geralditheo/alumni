import axios from "axios";
import { setCookie, getCookie } from 'cookies-next';

type Sign = {
    error?: any, 
    data?: { 
        expires_in?: number, 
        message?: string, 
        token?: string, 
        user?: User
    }
}

type User = {
    id?:string, 
    email?: string, 
    name?: string, 
    roles: Array<string>
}


export const getUser = (): User | null => {
    const user = getCookie('next-user');

    if (user) {
        const parsedUser = JSON.parse(String(user));
        return parsedUser;
    }

    return null;
}

export const getTokenServer = (): string | null => {
    const token = getCookie('next-token');

    if (token) return token;

    return null;
}

export const login = async (formData: FormData): Promise<Sign | undefined > => {

    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`, formData);

        if (data?.token) setCookie('next-token', data.token);
        if (data?.user) setCookie('next-user', JSON.stringify(data.user));

        return { data };

    } catch (error) {

        console.log(error);

        return { error: error };
        
    }

}

export const register = async (formData: FormData): Promise<Sign | undefined > => {

    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/register`, formData);

        if (data?.token) localStorage.setItem('next-token', data.token);
        if (data?.user) localStorage.setItem('next-user', JSON.stringify(data.user));

        return data;

    } catch (error) {

        console.log(error);

        return {  error: error };
        
    }
}

export const logout = async () => {
    localStorage.removeItem("next-token");
    localStorage.removeItem("next-user");
}

