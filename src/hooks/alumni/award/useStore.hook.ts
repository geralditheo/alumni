'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Award {
    id: number;
    user_id: number;
    nama_award: string;
    institusi_award: string;
    tingkat_award: string;
    tahun_award: number;
    deskripsi_award: string;
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


export function useAward(){

    const token = getToken();

    const [data, setData] = useState<Award[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getAwards = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awards`, {
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

            setError("Error fetching awards");
            
        }


    }

    const deleteAward = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awards/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete award");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete award");
            
        }

    }

    const detailAward = async (uuid: string): Promise<Award | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awards/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show award");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show award");
            
        }

    }

    const updateAward = async (data: Award | FormData | any, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awards/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update award");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update award");
            
        }
    }

    const postAward = async(data: Award | FormData | any): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/awards`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update award");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create award");
        }

    }

    return { data, error, success, pagination, getAwards, deleteAward, detailAward, updateAward, postAward }; 
}