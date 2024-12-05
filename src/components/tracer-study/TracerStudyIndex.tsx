'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from "next/dynamic";

import { useState, useEffect, Suspense } from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useTracerStudy } from '@/hooks/tracer-study/tracerStudy.hook';
import { DataDiagram } from '@/components/chart/chartjs/PieChart';

const PieChart = dynamic(() => import('@/components/chart/chartjs/PieChart'), { ssr: false });

export default function TracerStudyIndex(){

    const { data, tahunLulusData, check: checkTracerStudy, tahunLulus: getTahunLulus } = useTracerStudy();
    const [ dataDiagram, setDataDiagram ] = useState<DataDiagram[]>([]);
    const [ filter, setFilter ] = useState({ tahunLulus: "" });
    const [ refresh, setRefresh ] = useState<boolean>();

    const onTahunLulusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setFilter({ ...filter, tahunLulus: value})
        setRefresh(!refresh);
    }

    useEffect(() => {
        checkTracerStudy({ tahunLulus: filter.tahunLulus });
        getTahunLulus()
    }, [refresh])

    useEffect(() => {
        if(data?.statusCounts) if (data.statusCounts.length){
            const temp = data.statusCounts.map((item) => ({ label: item.name, data: item.count }));
            setDataDiagram(temp);
        }
    }, [data])

    return (
        <section>
            {
                tahunLulusData.length > 0 && 
                <div className="my-3 ">
                    <select defaultValue="none" name="tahunLulus" id="tahunLulus" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={onTahunLulusChange}  >
                        <option key="none" value="none" >Pilih Tahun Kelulusan</option>
                        {
                            tahunLulusData.map((item, index) => {
                                return <option key={`tahun-${index}`} value={item} >{item}</option>

                            })
                        }
                    </select>
                </div>
            }

            {/* Diagram */}
            <div className="mb-5 grow-0 flex justify-center " >
                <div className="aspect-square h-96 " >
                    <Suspense fallback={<div>Loading...</div>} >
                        <PieChart dataDiagram={dataDiagram} title="Masa Tunggu Diagram" isShowLable lable='item' />
                    </Suspense>
                </div>
            </div>

            {/* Link List */}
            <div className="flex flex-wrap" >
                {
                    data?.statusCounts.map((item, index) => {
                        return (
                            <div key={index} className='flex-grow basis-full sm:basis-1/2  ' >
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

                                    <Link href={`/dashboard/tracer-study/status?status=${item.name}`} className='bg-blue-500 shrink-0 p-3 group-hover:bg-blue-400 transition-colors ease-in flex items-center'>
                                        <HiChevronDoubleRight className='text-white'/>
                                    </Link>

                                </div>

                            </div>

                        )
                    })
                }
            </div>
        </section>
    )
}