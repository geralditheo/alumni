'use client';

import { useGetLowonganMagang } from '@/hooks/dashboard/lowongan-magang/useStore.hook';
import { HiLocationMarker, HiOfficeBuilding   } from "react-icons/hi";

import Image from 'next/image';
import Link from "next/link";

export default function DashboardLoker(){

    const { data } = useGetLowonganMagang();

    return <section className="mb-5" >

        <div className="mb-5" >

            <div className="basis-full" >
                <h2 className="font-semibold mb-3" >Explore a World of Job Opportunities</h2> 

                <p className="text-gray-500 text-justify mb-3" >
                    In today's dynamic job market, opportunities are abundant for those seeking to embark on a new career path or advance in their current one. Whether you're a seasoned professional or just starting out, there are numerous fields and industries actively looking for talented individuals like you. From tech startups to established corporations, the demand for innovative minds is growing.
                </p>

                <p className='text-right font-semibold text-blue-500 mb-3' >
                    <Link href="#"  > Discover More  </Link>
                </p>
            </div>


        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 " >

            { data?.map((item) => {
                return <div key={item.key} className='flex group ' >

                    <div className='bg-blue-500 w-full max-w-11  group-hover:bg-blue-400 transition-colors ease-in' />


                    <div className="shadow p-5 basis-full " >

                        <div className='flex justify-end' >
                            <div className='flex gap-x-3 items-center mb-1' >
                                <div className='w-10 border border-blue-500 aspect-square relative rounded-full' >
                                    <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                                </div>

                                <p className='font-semibold'> {item.NamaPerusahaan} </p>
                            </div>
                        </div>

                        
                        <p className='font-semibold text-gray-400 mb-1 text-end ' >{item.Posisi}</p>
                        
                        <div className='flex justify-end' >
                            <button className='text-xs bg-yellow-300 py-1 px-2 rounded-full mb-1'> {item.Tags} </button>
                        </div>

                        
                        <div className='flex justify-end'  > <span className='flex gap-x-3 text-gray-500'>  <p className='text-xs' >{item.Alamat}</p><HiLocationMarker />  </span> </div>
                        <div className='flex justify-end'  > <span className='flex gap-x-3 text-gray-500'> <p className='text-xs'>{item.TipeMagang}</p> <HiOfficeBuilding />   </span> </div>

                    </div>


                </div>
            })}
            
        </div>

    </section>
}