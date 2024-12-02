import axios from 'axios';
import { getToken } from '@/hooks/auth/authClient';
import { useState } from 'react';

type DataAlumni = {
    id: number;
    email: string;
    name: string;
}

export function useDataAlumni(){
    const token = getToken();
    const [data, setData] = useState<DataAlumni[]>([]);

    const getDataAlumni = async ({ search }: { search?: string }): Promise< DataAlumni[] | undefined > => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dataAlumniAdmin` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    search: search
                }
            });

            if (Array.isArray(data)) setData(data);

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error get data alumni");
        }

    }

    const showDataCvAlumni = async (uuid: number) => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dataAlumniAdmin/${uuid}/cv`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })

            console.log("D", data);

            return data;
            
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error show data cv alumni");
        }
    }

    return { data, getDataAlumni, showDataCvAlumni };
}