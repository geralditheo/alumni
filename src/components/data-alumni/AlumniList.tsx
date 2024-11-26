'use client';

import Image from 'next/image';

import { useDataAlumni } from '@/hooks/data/dataAlumni.hooks';
import { useEffect } from 'react';

export default function AlumniList(){

    const { data, getDataAlumni } = useDataAlumni();

    const onClickButton = (id: string) => {
        console.log("ID", id);
        
    }

    useEffect(() => {
        getDataAlumni();
    }, [])

    return (
        <main>
            <div className="flex gap-y-1 flex-wrap" >
            {
                data.map((item, index) => {
                    return (
                        <button key={`${index}-alumnus`} className="basis-full sm:basis-1/4 p-3" onClick={() => onClickButton(item.email)} >
                            <div className='bg-white shadow hover:shadow-lg transition-shadow ease-linear p-3 rounded-md gap-3 flex divide-x-2 border border-blue-500 hover:border-blue-900' >
                                <div className='w-20 aspect-square relative rounded-full' >
                                    <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                                </div>

                                <div className='px-3 text-sm items-center' >
                                    <p>{item.name ? item.name : "" }</p>
                                    <p>{item.email ? item.email : ""}</p>
                                </div>
                            </div>
                        </button>
                    )
                })
            }
            </div>
        </main>
    )
}