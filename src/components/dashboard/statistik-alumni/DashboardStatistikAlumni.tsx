'use client';

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from 'react';

const PieChart = dynamic(() => import('@/components/chart/chartjs/PieChart'), { ssr: false });
const DoughnutChart = dynamic(() => import('@/components/chart/chartjs/DoughnoutChart'), { ssr: false });
const LineChart = dynamic(() => import('@/components/chart/chartjs/LineChart'), { ssr: false });

import { useDashboardAdmin } from '@/hooks/dashboard/admin/useDashboardAdmin.hook';
import { DataDiagram } from '@/components/chart/chartjs/DoughnoutChart';

export default function DsahboardStatistikAlumni(){

    const { data, getDashboardAdmin } = useDashboardAdmin();
    const [ dataStatusCount, setDataStatusCount ] = useState<DataDiagram[]>([]);
    const [ dataLinkupJob, setDataLingkupJob ] = useState<DataDiagram[]>([]);

    useEffect(() => {
        getDashboardAdmin()
    }, [])

    useEffect(() => {
        if (data?.statusCounts){
            const temp = [];
            for (const [key, value] of Object.entries(data.statusCounts)) {
                temp.push({ label: key, data: value });
            }
            setDataStatusCount(temp);
        }
    }, [data?.statusCounts])

    useEffect(() => {
        if (data?.lingkupJob) {
            const temp = [];
            for (const [key, value] of Object.entries(data.lingkupJob)) {
                temp.push({ label: key, data: value });
            }
            setDataLingkupJob(temp);
        }
    } ,[data?.lingkupJob])

    console.log("Data", data);
    

    return (
        <div>

            <section></section>

            <main>

                <div className="flex gap-3 sm:flex-row flex-col mb-3" >
                    <div className="text-xs sm:text-base basis-full flex gap-3 flex-col" >

                        <div className=" basis-full flex gap-3" >
                            <div className="basis-full bg-blue-500 shadow rounded-md p-3 " >
                                <h3 className="font-semibold text-white mb-1" >Alumni 3TH</h3>
                                <div className=" mb-3" />
                                <p className="text-white" >Jumlah Alumni Dalam 3 Tahun: <span className="font-semibold text-yellow-300 text-xl" >{data?.totalAlumni3Years}</span> </p>
                            </div>

                            <div className="basis-full bg-cyan-500 shadow rounded-md p-3 " >
                                <h3 className="font-semibold text-white mb-1" >Alumni Terdeteksi</h3>
                                <div className=" mb-3" />
                                <p className="text-white" >Jumlah Alumni yang Terdeteksi Dalam 3 Tahun: <span className="font-semibold text-yellow-300 text-xl" >{data?.detectedAlumni3Years}</span> </p>
                            </div>
                        </div>

                        <div className="basis-full bg-sky-500 shadow rounded-md p-3 " >
                            <h3 className="font-semibold text-white mb-1" >Jumlah Keseluruhan Alumni</h3>
                            <div className=" mb-3" />
                            <p className="text-white" >Jumlah Keseluruhan Alumni dari Berbagai Tahun: <span className="font-semibold text-yellow-300 text-xl " >{data?.totalAlumniAllYears}</span> </p>
                        </div>
                    </div>

                    <div className="basis-full h-full sm:h-64 flex justify-center  grow-0 " >
                        <Suspense fallback={<div>Loading...</div>} >
                            <DoughnutChart title="Status Users" lable="Counted" dataDiagram={dataStatusCount} isShowLable   />
                        </Suspense>
                    </div>
                </div>

                <div className="flex gap-3 sm:flex-row flex-col" >
                    <div className="basis-full flex justify-center  grow-0 border" >
                        <Suspense fallback={<div>Loading...</div>} >
                            <PieChart key={"dlj"} dataDiagram={dataLinkupJob} lable=" #" title="Lingkup Pekerjaan" isShowLable />
                        </Suspense>
                    </div>

                    <div className="basis-full border" >
                        <LineChart />
                    </div>
                </div>

            </main>
        </div>
    ) 
}