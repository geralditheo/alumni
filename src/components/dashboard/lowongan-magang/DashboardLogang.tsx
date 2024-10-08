'use client';

import { useGetLowonganMagang } from '@/hooks/dashboard/lowongan-magang/useStore.hook';
import { HiLocationMarker, HiOfficeBuilding   } from "react-icons/hi";
import Image from 'next/image';

import Link from "next/link";

export default function DashboardLogang(){

    const { data } = useGetLowonganMagang();

    return <section className="mb-5" >

        <div className="sm:flex items-center mb-5" >

            <div className="basis-full" >
                <h2 className="font-semibold" >Find works or you can apply as apprentce too</h2> 
                <p className="text-gray-500" >And there are many more to explore</p>
            </div>

            <div className="shrink-0" >
                <p className='text-right font-semibold text-blue-500' >
                    <Link href="#"  > Discover More  </Link>
                </p>
            </div>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 " >

            { data?.map((item) => {
                return <div key={item.key} className='flex group ' >

                    <div className="shadow p-5 basis-full" >

                        <div className='flex gap-x-3 items-center mb-1' >
                            <div className='w-10 border border-blue-500 aspect-square relative rounded-full' >
                                <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                            </div>

                            <p className='font-semibold'> {item.NamaPerusahaan} </p>
                        </div>

                        <p className='font-semibold text-gray-400 mb-1' >{item.Posisi}</p>

                        <button className='text-xs bg-yellow-300 py-1 px-2 rounded-full mb-1'> {item.Tags} </button>
                        
                        <div> <span className='flex gap-x-3 text-gray-500'> <HiLocationMarker /> <p className='text-xs' >{item.Alamat}</p> </span> </div>
                        <div> <span className='flex gap-x-3 text-gray-500'> <HiOfficeBuilding />  <p className='text-xs'>{item.TipeMagang}</p> </span> </div>

                    </div>

                    <div className='bg-blue-500 w-full max-w-11  group-hover:bg-blue-400 transition-colors ease-in' />

                </div>
            })}
            
        </div>

    </section>
}