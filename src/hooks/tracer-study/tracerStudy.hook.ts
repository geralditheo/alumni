'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

type CheckTracerStudy = {
    statusCounts: StatusCounts[]
    totalAlumni: number;
}

type StatusCounts = {
    name: string;
    count: number;
}

type StatusTracerStudy = {
    id: number;
    biaya_studi: string;
    bidang_job: string;
    created_at: Date;
    email: string;
    foto_profil: string;
    jabatan_job: string;
    jenjang_pendidikan: string;
    jns_job: string;
    jns_kelamin: string;
    lingkup_job: string;
    nama_job: string;
    name: string;
    nim: string;
    no_hp: string;
    program_studi: string;
    status: string;
    tahun_lulus: string;
    tahun_masuk: string;
    universitas: string;
    updated_at: string;
    user_id: number;

}

export function useTracerStudy(){
    const token = getToken();
    const [data, setData] = useState<CheckTracerStudy>();
    const [statusData, setStatusData] = useState<StatusTracerStudy[]>();

    const check = async (): Promise< CheckTracerStudy | undefined> => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cekTracerstudy` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            
            const statusCounts = Object.entries(data.statusCounts).map((entry) => ({ name: entry[0], count: entry[1] })) as StatusCounts[] ;

            setData({
                statusCounts: statusCounts,
                totalAlumni: data.totalAlumni
            })
            
            return data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error check tracer study");
        }

    }

    const status = async (status: string): Promise< StatusTracerStudy[] | undefined> => {
        try {
            
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tracerstudy?status=${status}` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (data.data) setStatusData(data.data);
           
            return data;
            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error status tracer study");
        }

    }

    
    

    return { data, statusData, check, status };
}