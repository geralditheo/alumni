'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiChevronDoubleRight } from "react-icons/hi";

export default function TracerStudyIndex(){

    const listIndex = [1,2,3,4,5,6,7,8,9];

    return (
        <main className="flex flex-wrap" >
            {
                listIndex.map((item, index) => {
                    return (
                        <div key={index} className='basis-full sm:basis-1/2 p-3' >

                            <div className='border flex group ' >

                                <div className='basis-3/4 p-5 ' >
                                    <h3 className='font-semibold' >Bekerja Full Time</h3>
                                    <p className='text-sm bg-blue-500 w-fit px-3 py-1 rounded-lg text-white' > 1 dari 10 Mahasiswa </p>
                                </div>

                                <div className='basis-1/4 p-5' >
                                    <div className='w-16 aspect-square relative ' >
                                        <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full  ' />
                                    </div>
                                </div>

                                <Link href="#" className='bg-blue-500 shrink-0 p-3 group-hover:bg-blue-400 transition-colors ease-in flex items-center'>
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


{/* <div className="shadow p-5 basis-full" >

<div className='flex gap-x-3 items-center mb-1' >
    

    <p className='font-semibold'> adsa </p>
</div>

<p className='font-semibold text-gray-400 mb-1' >asdad</p>

<button className='text-xs bg-yellow-300 py-1 px-2 rounded-full mb-1'> adasd </button>


</div> */}