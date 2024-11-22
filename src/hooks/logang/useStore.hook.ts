import axios from 'axios';
import { getToken } from '@/hooks/auth/authClient';
import { useState } from 'react';

type Logang = {
    id: number;
    user_id: number;
    Alamat: string;
    Deskripsi: string;
    Email: string;
    Gaji: string;
    Logo: string;
    MasaBerlaku: string;
    NamaPerusahaan: string;
    Pengalaman: string;
    Posisi: string;
    Tags: string;
    TipeMagang: string;
    Verify: string;
    Website: string;
    created_at: string;
    updated_at: string;
}

export function useLogangAlumni(){
    const token = getToken();
    const [data, setData] = useState<Logang[]>([]);
    const [manageData, setManageDta] = useState<Logang[]>([]);

    const manage = async (): Promise< Logang[] | void> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/manageLogang` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data)) setManageDta(data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error manage logang");
        }

    }

    const index = async (): Promise< Logang[] | void> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logang` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data)) setData(data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error index logang");
        }

    }

    const show = async (uuid: string): Promise<Logang | undefined> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logang/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error show logang");
        }

    }

    const post = async (formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logang`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error post logang");
        }

    }

    const update = async (uuid: string, formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logang/${uuid}`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error update logang");
        }

    }

    const remove = async (uuid: string): Promise<void> => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logang/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error delete logang");
        }

    }

    return { data, manageData, index, show, post, manage, update, remove };
}

export function useLogangAdmin(){
    const token = getToken();
    const [data, setData] = useState<Logang[]>([]);
    const [manageData, setManageDta] = useState<Logang[]>([]);

    const manage = async (): Promise< Logang[] | void> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/manageLogangAdmin` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data.data)) setManageDta(data.data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error manage logang");
        }

    }

    const index = async (): Promise< Logang[] | void> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logangAdmin` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data.data)) setData(data.data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error index logang");
        }

    }

    const show = async (uuid: string): Promise<Logang | undefined> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logangAdmin/${uuid}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data.data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error show logang");
        }

    }

    const post = async (formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logangAdmin`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error post logang");
        }

    }

    const update = async (uuid: string, formData : FormData | URLSearchParams): Promise<void> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logangAdmin/${uuid}`, formData , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error update logang");
        }

    }

    const remove = async (uuid: string): Promise<void> => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logangAdmin/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error delete logang");
        }

    }

    const verify = async (uuid: string, formData: FormData): Promise<Logang | undefined> => {
        try {

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/logangAdmin/${uuid}/verify`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error show loker");
        }

    }

    return { data, manageData, index, show, post, manage, update, remove, verify };
}