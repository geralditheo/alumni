'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Skill {
    id: number;

    kerjasama_skill: string;
    ahli_skill: string;
    inggris_skill : string;
    komunikasi_skill : string;
    pengembangan_skill : string;
    kepemimpinan_skill : string;
    etoskerja_skill : string;
   
    created_at: string;
    updated_at: string;
}

interface Filter {
    limit?: number;
    currentPage?: number;
}

interface Pagination {
    currentPage: number;
    lastPage: number;
}


export function useSkill() {

    const token = getToken();

    const [data, setData] = useState<Skill[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getSkills = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/skills`, {
                params: {
                    page: filter?.currentPage ? filter.currentPage : pagination.currentPage,
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.data) {

                const value = response.data;

                if (value.data) setData(value.data);
                if (value.last_page) setPagination({ ...pagination, lastPage: value.last_page });
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error fetching skills");
            
        }
    }

    const deleteSkill = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/skills/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete skills");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete skills");
            
        }

    }

    const detailSkill = async (uuid: string): Promise<Skill | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/skills/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show skills");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show skills");
            
        }

    }

    const updateSkill = async (data: Skill | FormData | any, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/skills/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update skills");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update skills");
            
        }
    }

    const postSkill = async(data: Skill | FormData | any): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/skills`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success create skills");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create skills");
        }

    }

    return { data, error, success, pagination, getSkills, postSkill, updateSkill, detailSkill, deleteSkill }

}