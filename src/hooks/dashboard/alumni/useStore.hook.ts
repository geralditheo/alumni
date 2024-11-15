'use client';

import axios from "axios";
import { getToken } from '@/hooks/auth/authClient';
import { useState } from "react";


type dashboardAlumni = {
    data: {
        dataStatus: {},
        logangs: [],
        lokers: [],
    }
}

export function useDashboardAlumni(){

    const token = getToken();

    const [dataDashboardAlumni, setDataDashboardAlumni] = useState<dashboardAlumni>();
    

    const getDashboardAlumni = async () => {
        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboardAlumni`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setDataDashboardAlumni(response.data);

            return response.data;
    
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error create awards");
        }

    }

    

    return { dataDashboardAlumni, getDashboardAlumni }; 

}