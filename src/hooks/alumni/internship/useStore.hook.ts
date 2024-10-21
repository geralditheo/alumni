'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Internship {
    id: number;

    nama_intern: string;
    periode_masuk_intern: number;
    periode_keluar_intern: number;
    jabatan_intern: string;
    kota: string;
    negara: string;
    catatan: string;
   
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


export function useInternship() {

    const token = getToken();

    const [data, setData] = useState<Internship[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getInternship = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internships`, {
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

            setError("Error fetching internships");
            
        }
    }

    const deleteInternship = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internships/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete internships");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete internships");
            
        }

    }

    const detailInternship = async (uuid: string): Promise<Internship | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internships/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show internships");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show internships");
            
        }

    }

    const updateInternship = async (data: Internship | FormData | any, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internships/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update internships");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update internships");
            
        }
    }

    const postInternship = async(data: Internship | FormData | any): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/internships`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success create internships");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create internships");
        }

    }

    return { data, error, success, pagination, getInternship, detailInternship, updateInternship, postInternship, deleteInternship }

}