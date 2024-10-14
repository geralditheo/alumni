'use client';
import { useCheckDataAlumni } from '@/hooks/dashboard/data-alumni/useStore.hook';
import { HiStar, HiPencilAlt } from 'react-icons/hi';

import Link from 'next/link';

export default function DataAlumniPage(){

    const getDataAlumni = useCheckDataAlumni();

    return <section className="" >
        <div className='flex flex-wrap gap-5 sm:justify-start justify-center ' >

            { getDataAlumni.data?.map((item) => {
                return <div key={item.key} className='border bg-white shadow-md w-full sm:w-60' >
                    <div className='bg-blue-500 flex justify-end p-3' >
                        <Link href={`/dashboard/alumni/${item.path}`} className='shrink-0 text-white  hover:text-gray-400 ' ><HiPencilAlt />  </Link>
                    </div>

                    <div className='p-3 flex justify-between' >
                        <div className='flex items-center gap-3 ' >
                            { item.isFilled ? <HiStar className='text-2xl shrink-0 text-yellow-300 ' /> : <HiStar className='text-2xl shrink-0 text-gray-300 ' /> }
                            {item.name}
                        </div>

                        <div>
                            <p className='aspect-square w-6 flex font-semibold text-white justify-center items-center h-auto bg-blue-500 rounded-full ' >{item.count}</p>
                        </div>
                    </div>
                </div>
            })}

            
        </div>
    </section>
}