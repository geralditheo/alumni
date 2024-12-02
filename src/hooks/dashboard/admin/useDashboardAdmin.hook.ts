'use client';

import axios from "axios";
import { getToken } from '@/hooks/auth/authClient';
import { useState } from "react";

type DashboardAlumni = {
    bekerja: number;
    bidangJob: DABidangJob;
    terlacakAlumni3Tahun: string;
    lingkupJob: DALingkupJob;
    skills: DASkill;
    statistiks: DAStatistik;
    jumlahStatus: DAStatusCount;
    tidakBekerja: number;
    totalAlumni3Tahun: number;
    totalAlumniSemuaTahun: number;
}

type DABidangJob = {
    infokomCount: number;
    nonInfokomCount: number;
}

type DALingkupJob = {
    internasional: number;
    lokalBerbadanHukum: number;
    lokalTidakBerbadanHukum: number;
    multinasional: number;
    nasional: number;
}

type DASkill = {
    ahli_skill: { "Sangat Baik" : 0, "Baik" :0, "Cukup" : 0, "Kurang" : 0 },
    etoskerja_skill: { "Sangat Baik" : 0, "Baik" :0, "Cukup" : 0, "Kurang" : 0 },
    inggris_skill: { "Sangat Baik" : 0, "Baik" :0, "Cukup" : 0, "Kurang" : 0 },
    kepemimpinan_skill: { "Sangat Baik" : 0, "Baik" :0, "Cukup" : 0, "Kurang" : 0 },
    kerjasama_skill: { "Sangat Baik" : 0, "Baik" :0, "Cukup" : 0, "Kurang" : 0 },
    komunikasi_skill: { "Sangat Baik" : 0, "Baik" :0, "Cukup" : 0, "Kurang" : 0 },
    pengembangan_skill: { "Sangat Baik" : 0, "Baik" :0, "Cukup" : 0, "Kurang" : 0 },
}

type DAStatistik = {
    data: DAStatistikData[];
}

type DAStatistikData = {
    id: number;
    tahun_lulus: number;
    alumni_total: number;
    alumni_terlacak: number;
    created_at: Date;
    updated_at: Date;
}

type DAStatusCount = {
    ["Bekerja Full Time"]: number;
    ["Bekerja Part Time"]: number;
    ["Belum Memungkinkan Bekerja"]: number;
    ["Melanjutkan Pendidikan"]: number;
    ["Menikah/Mengurus Keluarga"]: number;
    ["Tidak Bekerja Tetapi Sedang Mencari Pekerjaan"]: number;
    ["Wirausaha"]: number;
}

export function useDashboardAdmin(){

    const [ data, setData ]= useState<DashboardAlumni>();

    const getDashboardAdmin = async () => {
        const token = getToken();

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboardAdmin`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (data) setData(data);

            
        } catch (error) {
            console.log("Error", error);
            throw new Error("Error get data");
        }
    }

    return { data, getDashboardAdmin }
}