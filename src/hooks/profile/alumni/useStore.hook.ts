import axios from "axios";
import { useState } from "react"
import { getToken } from '@/hooks/auth/authClient';

type Alumni = {
    'name': string;
    'email': string;
    'foto_profil': string;
    'jns_kelamin': string;
    'nim': string;
    'tahun_masuk': string;
    'tahun_lulus': string;
    'no_hp': string;
    'status': string;
    'bidang_job': string;
    'jns_job': string;
    'nama_job': string;
    'jabatan_job': string;
    'lingkup_job': string;
    'biaya_studi': string;
    'jenjang_pendidikan': string;
    'universitas': string;
    'program_studi': string;
}

export function useProfile(){
    const token = getToken();

    const [data, setData] = useState<Alumni | undefined>();
    const [error, setError] = useState<string | undefined>();

    const getData = async (): Promise<void> => {
        setError("");

        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profilealumni`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response?.data?.data) setData(response?.data?.data);
            
        } catch (error) {
            console.log(error);
            
            setError("Failed to get profile");
        }
    }

    return { data, error, getData };

}