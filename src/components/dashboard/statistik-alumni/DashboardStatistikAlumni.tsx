'use client';

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from 'react';

const DoughnutChart = dynamic(() => import('@/components/chart/chartjs/DoughnoutChart'), { ssr: false });
const LineChart = dynamic(() => import('@/components/chart/chartjs/LineChart'), { ssr: false });

import { useDashboardAdmin } from '@/hooks/dashboard/admin/useDashboardAdmin.hook';
import { DataDiagram } from '@/components/chart/chartjs/DoughnoutChart';

export default function DsahboardStatistikAlumni(){

    const { data, getDashboardAdmin } = useDashboardAdmin();
    const [ dataStatusCount, setDataStatusCount ] = useState<DataDiagram[]>([]);
    const [ dataLinkupJob, setDataLingkupJob ] = useState<DataDiagram[]>([]);
    const [ dataKerja, setDataKerja ] = useState<DataDiagram[]>([]);
    const [ dataBidangKerja, setDataBidangKerja ] = useState<DataDiagram[]>([]);
    const [ dataStatistik, setDataStatistik ] = useState<DataDiagram[]>([]);

    useEffect(() => {
        getDashboardAdmin()
    }, [])

    useEffect(() => {
        if (data?.jumlahStatus){
            const temp = [];
            for (const [key, value] of Object.entries(data.jumlahStatus)) {
                temp.push({ label: key, data: value });
            }
            setDataStatusCount(temp);
        }
    }, [data?.jumlahStatus])

    useEffect(() => {
        if (data?.lingkupJob) {
            const temp = [];
            for (const [key, value] of Object.entries(data.lingkupJob)) {
                temp.push({ label: key, data: value });
            }
            setDataLingkupJob(temp);
        }
    } ,[data?.lingkupJob])

    useEffect(() => {
        if (data?.bekerja || data?.tidakBekerja){
            const temp = [];
            temp.push({ label: 'Bekerja', data: data.bekerja });
            temp.push({ label: 'Tidak Bekerja', data: data.tidakBekerja });
            setDataKerja(temp);
        }
    }, [data?.bekerja, data?.tidakBekerja])

    useEffect(() => {
        if (data?.bidangJob) {
            const temp = [];
            for (const [key, value] of Object.entries(data.bidangJob)) {
                temp.push({ label: key, data: value });
            }
            setDataBidangKerja(temp);
        }
    } ,[data?.bidangJob])

    useEffect(() => {
        if (data?.statistiks) if (data.statistiks.data) if (data.statistiks.data.length > 0) {
            const temp = data.statistiks.data.map((item) => ({ label: String(item.tahun_lulus), data: item.alumni_terlacak }))
            setDataStatistik(temp);
        }
    } ,[data?.statistiks])        

    return (
        <main>
            <div className="flex flex-col sm:flex-row gap-3 mb-3" >
                <div className="basis-full  bg-blue-500 shadow rounded-md p-3 " >
                    <h3 className="font-semibold text-white mb-1" >Alumni 3TH</h3>
                    <div className=" mb-3" />
                    <p className="text-white" >Jumlah Alumni Dalam 3 Tahun: <span className="font-semibold text-yellow-300 text-xl" >{data?.totalAlumni3Tahun}</span> </p>
                </div>

                <div className="basis-full bg-cyan-500 shadow rounded-md p-3 " >
                    <h3 className="font-semibold text-white mb-1" >Alumni Terdeteksi</h3>
                    <div className=" mb-3" />
                    <p className="text-white" >Jumlah Alumni yang Terdeteksi Dalam 3 Tahun: <span className="font-semibold text-yellow-300 text-xl" >{data?.terlacakAlumni3Tahun}</span> </p>
                </div>

                <div className="basis-full bg-sky-500 shadow rounded-md p-3 " >
                    <h3 className="font-semibold text-white mb-1" >Jumlah Keseluruhan Alumni</h3>
                    <div className=" mb-3" />
                    <p className="text-white" >Jumlah Keseluruhan Alumni dari Berbagai Tahun: <span className="font-semibold text-yellow-300 text-xl" >{data?.totalAlumniSemuaTahun}</span> </p>
                </div>
            </div>

            <div className="flex gap-3 mb-3 flex-col md:flex-row overflow-x-auto" >
                <div className="basis-full flex justify-center h-96 grow-0 " >
                    <Suspense fallback={<div>Loading...</div>} >
                        <DoughnutChart key={"su"} title="Status Users" lable="Counted" dataDiagram={dataStatusCount} isShowLable   />
                    </Suspense>
                </div>
                <div className="basis-full flex justify-center h-96 grow-0" >
                    <Suspense fallback={<div>Loading...</div>} >
                        <DoughnutChart key={"dk"} dataDiagram={dataKerja} lable=" #" title="Kerja" isShowLable />
                    </Suspense>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-3 overflow-x-auto" >
                <div className="basis-full flex justify-center h-96 grow-0" >
                    <Suspense fallback={<div>Loading...</div>} >
                        <DoughnutChart key={"dlj"} dataDiagram={dataLinkupJob} lable=" #" title="Lingkup Pekerjaan" isShowLable />
                    </Suspense>
                </div>
                <div className="basis-full flex justify-center h-96 grow-0" >
                    <Suspense fallback={<div>Loading...</div>} >
                        <DoughnutChart key={"bj"} title="Bidang Kerja" lable="#" dataDiagram={dataBidangKerja} isShowLable   />
                    </Suspense>
                </div>
            </div>

            <div className="flex justify-center md:h-96 grow-0 overflow-x-auto" >
                <LineChart key={"ds"} title="Statistik" lable="Jumlah Alumni" dataDiagram={dataStatistik} isShowLable />
            </div>

        </main>
    ) 
}