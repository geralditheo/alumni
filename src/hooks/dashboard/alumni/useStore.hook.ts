'use client';

import axios from "axios";
import { getToken } from '@/hooks/auth/authClient';
import { useState } from "react";
import { Logang } from '@/hooks/logang/useStore.hook';
import { Loker } from '@/hooks/loker/useStore.hook';

type TypeDashboardAlumni = {
    academic: TypePoint
    award: TypePoint
    course: TypePoint
    internship: TypePoint
    organization: TypePoint
    skill: TypePoint
    work: TypePoint   
}

type TypePoint = {
    count: number
    exists: boolean
    updated_at: Date
}

export function useDashboardAlumni(){

    const token = getToken();

    const [tCount, setTCount] = useState<number>(0)
    const [dataDashboardAlumni, setDataDashboardAlumni] = useState<TypeDashboardAlumni>();
    const [dataDashboardLogang, setDataDashboardLogang] = useState<Logang[]>([]);
    const [dataDashboardLoker, setDataDashboardLoker] = useState<Loker[]>([]);
    

    const getDashboardAlumni = async () => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboardAlumni-dataAlumni`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (data.status){
                setDataDashboardAlumni(data.dataStatus);
                const statuses = data.dataStatus;
                const temp = [];
                for (const key in statuses) {
                    if (statuses.hasOwnProperty(key)) {
                        if (statuses[key]?.['count'] > 0) temp.push(key);
                    }
                }
                setTCount(temp.length);
                return data.dataStatus;
            }


    
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error create awards");
        }

    }

    const getDashbLogang = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboardAlumni-logang`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (data.data){
                setDataDashboardLogang(data.data);
                return data.data;
            }
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error create awards");
        }
    }

    const getDashbLoker = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboardAlumni-loker`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (data.data){
                setDataDashboardLoker(data.data);
                return data.data;
            }
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error create awards");
        }
    }

    

    return { tCount, dataDashboardAlumni, dataDashboardLogang, dataDashboardLoker, getDashboardAlumni, getDashbLogang, getDashbLoker }; 

}