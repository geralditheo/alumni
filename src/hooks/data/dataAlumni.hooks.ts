import axios from 'axios';
import { getToken } from '@/hooks/auth/authClient';
import { useState } from 'react';

type DataAlumni = {
    email: string;
    name: string;
}

export function useDataAlumni(){
    const token = getToken();
    const [data, setData] = useState<DataAlumni[]>([]);

    const getDataAlumni = async (): Promise< DataAlumni[] | undefined > => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dataAlumniAdmin` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (Array.isArray(data)) setData(data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error get data alumni");
        }

    }

    return { data, getDataAlumni };
}