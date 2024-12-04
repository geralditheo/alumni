'use client';

import { HiLocationMarker, HiOfficeBuilding   } from "react-icons/hi";
import { useDashboardAlumni } from '@/hooks/dashboard/alumni/useStore.hook';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from "next/link";
import LogangShow from "@/components/logang/LogangShow";

export default function DashboardLogang(){

    const { dataDashboardLogang, getDashbLogang } = useDashboardAlumni();
    const [ openModalShow, setOpenModalShow ] = useState<boolean>(false);
    const [ selectUuid, setSelectUuid ] = useState<string>();

    const onClickButton = (uuid: string) => {
        setSelectUuid(uuid);
        setOpenModalShow(true);
    }

    const onDone = () => {
        setOpenModalShow(false);
    }

    useEffect(() => {
        getDashbLogang();
    }, [])

    return <main className="mb-5" >

        <section>
            { openModalShow && <LogangShow show={openModalShow} onDone={onDone} uuid={selectUuid} /> }
        </section>

        <div className="sm:flex items-center mb-5" >

            <div className="basis-full" >
                <h2 className="font-semibold" >Find works or you can apply as apprentce too</h2> 
                <p className="text-gray-500" >And there are many more to explore</p>
            </div>

            <div className="shrink-0" >
                <p className='text-right font-semibold text-blue-500' >
                    <Link href="/dashboard/logang"  > Discover More  </Link>
                </p>
            </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 " >

            { dataDashboardLogang?.map((item) => {
                return <div key={item.id} className='flex group ' >

                    <div className="shadow p-5 basis-full" >

                        <div className='flex gap-x-3 items-center mb-1' >
                            <div className='w-10 border border-blue-500 aspect-square relative rounded-full' >
                                <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                            </div>

                            <p className='font-semibold'> {item.NamaPerusahaan} </p>
                        </div>

                        <p className='font-semibold text-gray-400 mb-1' >{item.Posisi}</p>

                        <button className='text-xs bg-yellow-300 py-1 px-2 rounded-full mb-1'> {item.Tags} </button>
                        
                        <div> <span className='flex gap-x-3 text-gray-500 mb-1'> <HiLocationMarker className='shrink-0' /> <p className='text-xs' >{item.Alamat}</p> </span> </div>
                        <div> <span className='flex gap-x-3 text-gray-500 mb-1'> <HiOfficeBuilding className='shrink-0' />  <p className='text-xs'>{item.TipeMagang}</p> </span> </div>

                    </div>

                    <div onClick={() => onClickButton(String(item.id))} className='bg-blue-500 w-full max-w-11  group-hover:bg-blue-400 transition-colors ease-in hover:cursor-pointer' />

                </div>
            })}
            
        </div>

    </main>
}