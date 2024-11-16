'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useTracerStudy } from '@/hooks/tracer-study/tracerStudy.hook';
import { useEffect } from 'react';

export default function TracerStudyIndex(){

    const listIndex = [1,2,3,4,5,6,7];
    const { data, check: checkTracerStudy } = useTracerStudy();

    useEffect(() => {
        checkTracerStudy()
    }, [])

    return (
        <main className="flex flex-wrap" >
            {
                data?.statusCounts.map((item, index) => {
                    return (
                        <div key={index} className='basis-full sm:basis-1/2 p-3' >

                            <div className='border flex group ' >

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
        </main>
    )
}