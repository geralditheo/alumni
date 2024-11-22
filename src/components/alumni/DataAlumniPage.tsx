'use client';
import Image from "next/image"
import { useCheckDataAlumni } from '@/hooks/dashboard/data-alumni/useStore.hook';
import { useAcademic } from '@/hooks/alumni/academic/useStore.hook';
import { HiPencilAlt } from 'react-icons/hi';

import Link from 'next/link';
import { useEffect, useState } from "react";

export default function DataAlumniPage(){

    const getDataAlumni = useCheckDataAlumni();
    const { academics, getAcademics } = useAcademic();
    const [ filter ] = useState({ currentPage: 1, limit: 10 });

    useEffect(() => {
        getAcademics(filter);
    }, [])

    return <section className="" >
        <div className='bg-white shadow-md p-6 mx-auto mb-5'>
            <div className='relative'>
                <div className='bg-gray-300 h-32 '>
                    <div className='absolute -bottom-10 left-6 w-[125px] h-[125px] bg-white border-4 border-white rounded-full flex items-center justify-center'>
                        <Image  src="/draw/undraw_Experience_design_re_dmqq.png" alt="Photo Profile" fill className="border size-24 rounded-full"/>
                    </div>
                </div>
            </div>

            <div className='pt-12'>
                <h2 className="text-xl font-bold">Nama</h2>
                <p className="text-sm text-gray-500">Email</p>
                <p className="mt-2 text-sm text-gray-600">Role</p>
            </div>
        </div>

        <div className='flex flex-wrap gap-5 sm:justify-start justify-center' >
            { getDataAlumni.data?.map((item) => {

                if (item.name === "Academic") {                    

                    return <div key={item.key} className='border bg-white shadow-md w-full' >
                        <div className='bg-blue-500 flex justify-between items-center p-3'>
                            <div className='flex items-center gap-3 text-white'>
                                {item.name}
                            </div>
                            <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                                <HiPencilAlt />
                            </Link>
                        </div>

                        {
                            academics.map((element) => {
                                return (
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <img
                                                    src="https://via.placeholder.com/40"
                                                    alt="Kominfo Logo"
                                                    className="w-10 h-10 mr-4 rounded-full"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">{element.prodi}</h3>
                                                    <p className="text-sm text-gray-600">{element.nama_studi}</p>
                                                    <p className="text-sm text-gray-500">{element.tahun_masuk} - {element.tahun_lulus} &middot; { (element.tahun_lulus && element.tahun_masuk) ? element.tahun_lulus - element.tahun_masuk  : '~' } tahun</p>
                                                    <p className="text-sm text-gray-500">{element.kota}, {element.negara} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                }

                return <div key={item.key} className='border bg-white shadow-md w-full' >
                    <div className='bg-blue-500 flex justify-between items-center p-3'>
                        <div className='flex items-center gap-3 text-white'>
                            {item.name}
                        </div>
                        <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white hover:text-gray-400'>
                            <HiPencilAlt />
                        </Link>
                    </div>

                    <div className='p-3 flex justify-between'>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="Kominfo Logo"
                                    className="w-10 h-10 mr-4 rounded-full"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Jabatan</h3>
                                    <p className="text-sm text-gray-600">Nama Instansi</p>
                                    <p className="text-sm text-gray-500">Sep 2024 - Saat ini &middot; 3 bln</p>
                                    <p className="text-sm text-gray-500">Kota, Negara </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}

            
        </div>
    </section>
}