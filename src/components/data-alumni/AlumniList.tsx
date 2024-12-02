'use client';

import Image from 'next/image';
import AlumniDetail from './AlumniDetail';

import { useDataAlumni } from '@/hooks/data/dataAlumni.hooks';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    search: string
}


export default function AlumniList(){

    const { register, handleSubmit } = useForm<Inputs>();
    const { data, getDataAlumni } = useDataAlumni();

    const [ refresh, setRefresh ] = useState<boolean>(true);
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const [ selectedUuid, setSelectedUuid ] = useState<number | undefined>(undefined);
    const [ filter, setFilter ] = useState({ search: "" });

    const onClickButton = (id: number) => {
        setSelectedUuid(id)
        setOpenModal(true);
    }

    const onSearch: SubmitHandler<Inputs> = (data) => {
        setFilter({
            ...filter,
            search: data.search
        })
        setRefresh(!refresh);
    }

    const onClose = () => {
        setOpenModal(false);
        setSelectedUuid(undefined);
    }

    useEffect(() => {
        getDataAlumni(filter);
    }, [refresh])

    return (
        <div>

            <section>
                { openModal && <AlumniDetail show={openModal} done={onClose} uuid={selectedUuid} /> }
            </section>

            <main>
                <form onSubmit={handleSubmit(onSearch)}>
                    <div className='flex gap-1 ' >
                        <input {...register('search')} type='search' className='border basis-full px-3 py-2 rounded-md text-sm focus:border-blue-500 outline-none' placeholder='Cari nama' />
                        <button type='submit' className='bg-blue-500 text-white px-3 py-2 rounded-md shrink-0' >Search</button>
                    </div>
                </form>

                <div className="flex gap-y-1 flex-wrap sm:justify-center" >
                {
                    data.map((item, index) => {
                        return (
                            <div key={`${index}-alumnus`} className="basis-full sm:basis-1/4 p-3 hover:cursor-pointer " onClick={() => onClickButton(item.id)} >
                                <div className='bg-white shadow hover:shadow-lg transition-shadow ease-linear p-3 rounded-md gap-3 flex divide-x-2 border border-blue-500 hover:border-blue-900' >
                                    <div className='w-10 sm:w-20 aspect-square relative rounded-full' >
                                        <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                                    </div>

                                    <div className='px-3 text-xs sm:text-sm items-center' >
                                        <p className='font-semibold' >{item.name ? item.name : "" }</p>
                                        <p>{item.email ? item.email : ""}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </main>

        </div>
    )
}