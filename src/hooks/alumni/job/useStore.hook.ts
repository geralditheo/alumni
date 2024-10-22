'use client';

import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Job {
    id: number;

    nama_job: string;
    periode_masuk_job: number;
    periode_keluar_job: number;
    jabatan_job: string;
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


export function useJob() {

    const token = getToken();

    const [data, setData] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    const getJobs = async (filter?: Filter) => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/jobs`, {
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

            setError("Error fetching jobs");
            
        }
    }

    const deleteJob = async (uuid: string) => {

        try {

            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/jobs/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success delete job");

            
        } catch (error) {

            console.log("Error", error);

            setError("Error delete job");
            
        }

    }

    const detailJob = async (uuid: string): Promise<Job | undefined> => {

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/jobs/${uuid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {

                setSuccess("Success show jobs");

                return response.data;
            }

            
        } catch (error) {

            console.log("Error", error);

            setError("Error show jobs");
            
        }

    }

    const updateJob = async (data: Job | FormData | any, uuid: string): Promise<void> => {


        try {

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/jobs/${uuid}`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success update job");
            
        } catch (error) {

            console.log("Error", error);

            setError("Error update job");
            
        }
    }

    const postJob = async(data: Job | FormData | any): Promise<void> => {

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/jobs`, data , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) setSuccess("Success create jobs");
            
            
        } catch (error) {

            console.log("Error", error);

            setError("Error create jobs");
        }

    }

    return { data, error, success, pagination, getJobs, detailJob, postJob, updateJob, deleteJob }

}