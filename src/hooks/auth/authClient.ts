import axios from "axios";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

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

export const getToken = (): string | null => {
    const token = getCookie('next-token');

    if (token) return token;

    return null;
}

export const login = async (formData: FormData): Promise<Sign | undefined > => {

    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`, formData);

        if (data?.token) setCookie('next-token', data.token, { maxAge: 60 * 60 });
        if (data?.user) setCookie('next-user', JSON.stringify(data.user), { maxAge: 60 * 60 });

        return { data };

    } catch (error) {

        console.log(error);

        return { error: error };
        
    }

}

export const register = async (formData: FormData): Promise<Sign | undefined > => {

    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/register`, formData);

        return { data };

    } catch (error) {

        console.log(error);

        throw new Error("Failed to register");
        
    }
}

export const verifyOtpRegister = async (formData: FormData): Promise<Sign | undefined > => {

    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/verify-otp-email`, formData);

        return { data };

    } catch (error) {

        console.log(error);

        throw new Error("Failed to verify OTP");
        
    }
}

export const logout = async () => {
    deleteCookie('next-token');
    deleteCookie('next-user');
}

