'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useMasaTunggu } from '@/hooks/masa-tunggu/masaTunggu.hook';
import { DataDiagram } from '@/components/chart/chartjs/PieChart';

const PieChart = dynamic(() => import('@/components/chart/chartjs/PieChart'), { ssr: false });

export default function MasaTungguComponent(){

    const { data, check: checkMasaTunggu } = useMasaTunggu();
    const [ dataDiagram, setDataDiagram ] = useState<DataDiagram[]>([]);

    useEffect(() => {
        checkMasaTunggu();
    }, [])

    useEffect(() => {
        if(data?.masaTungguCounts) if (data.masaTungguCounts.length){
            const temp = data.masaTungguCounts.map((item) => ({ label: item.name, data: item.count }));
            setDataDiagram(temp);
        }
    }, [data])
    

    return (
        <div>
            {/* Diagram */}
            
            <div className="mb-5 grow-0 flex justify-center " >
                <div className="aspect-square h-96 " >
                    <Suspense fallback={<div>Loading...</div>} >
                        <PieChart dataDiagram={dataDiagram} title="Masa Tunggu Diagram" isShowLable lable='item' />
                    </Suspense>
                </div>
            </div>

            {/* Link List */}
            <div className='flex flex-wrap' >
                {
                    data?.masaTungguCounts.map((item, index) => {
                        return (
                            <div key={index} className='flex-grow basis-full sm:basis-1/2 md:basis-1/3 max-w-[500px]' >
                                <div className='border flex group m-1' >

                                    <div className='basis-3/4 p-5 ' >
                                        <h3 className='font-semibold' >{item.name}</h3>
                                        <p className='text-sm bg-blue-500 w-fit px-3 py-1 rounded-lg text-white' >{item.count} dari {data.totalAlumni} mahasiswa</p>
                                    </div>

                                    <div className='basis-1/4 p-5' >
                                        <div className='w-16 aspect-square relative ' >
                                            <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full  ' />
                                        </div>
                                    </div>

                                    <Link href={`/dashboard/masa-tunggu-alumni/status?status=${item.name}`} className='bg-blue-500 shrink-0 p-3 group-hover:bg-blue-400 transition-colors ease-in flex items-center'>
                                        <HiChevronDoubleRight className='text-white'/>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}