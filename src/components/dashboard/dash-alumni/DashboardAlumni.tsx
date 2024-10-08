'use client';

import { useCheckDataAlumni } from '@/hooks/dashboard/data-alumni/useStore.hook';
import { formatDate } from '@/helper/formatDate';
import { HiStar, HiPencilAlt, HiChip } from 'react-icons/hi';

import Image from 'next/image';
import Link from 'next/link';

export default function DashboardAlumni(){

    const getData = useCheckDataAlumni();

    return <section className='mb-5' >

        <div className="p-3  rounded-md bg-blue-500 h-[200px] mb-3 flex items-center justify-center" ><p className='font-semibold text-5xl text-center text-white' >Portal Alumni</p>  </div>

        <div className="flex flex-col md:flex-row gap-5  " >

            <div className="basis-full mb-5" >

                <div className="p-3 flex gap-3 items-center bg-white shadow flex-col md:flex-row-reverse mb-1 border border-blue-300  rounded-md">

                    <div className='basis-44 aspect-square relative rounded-full' >
                        <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                    </div>

                    <div className="basis-full text-center md:text-left " >

                        <h3 className="font-semibold" > Improve your data alumni</h3>

                        <p>You are now level <span className='font-semibold text-blue-500' >{getData.level}</span>, you can still improve it! Keep the work up!  </p>

                    </div>

                </div>

                <div>
                    { getData.data?.map((item) => {
                        return <div key={item.key} className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  hover:bg-gray-50' >
                            { item.isFilled && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                            { !item.isFilled && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                            <div className='basis-full' >  
                                <p className='font-semibold' >{item.name}</p>
                                { item.lastUpdted && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(item.lastUpdted)  } </p> } 
                            </div>
                            <Link href="#" className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </Link>
                        </div>
                    }) }
                </div>
                
            </div>

            <div className="basis-full mb-5">

                <div className='p-3 shadow mb-3' >
                    <div className='flex items-center' >

                        <div className='basis-full' >
                            <p className='font-semibold mb-3 text-justify' >You can create your own Curriculum Vitae by just clicking button.</p>
                            <button className='transition-colors ease-in hover:bg-blue-600 px-5 py-2 shadow rounded-md bg-blue-500 text-white flex items-center gap-x-3' > <HiChip /> Generate CV</button>
                        </div>

                        <div className='basis-28 aspect-square relative rounded-full' >
                            <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                        </div>
                        
                    </div>
                </div>

                <div className='p-3 shadow mb-3' >
                    <div className='flex items-center' >

                        <div className='basis-full' >
                            <p className='font-semibold text-justify' >Improve your profile here.</p>
                            <p className='mb-3' >Every profile has its own story.</p>
                            <button className='transition-colors ease-in hover:bg-gray-300 px-5 py-2 shadow rounded-md flex items-center gap-x-3' > <HiPencilAlt /> Profile</button>
                        </div>

                        <div className='basis-28 aspect-square relative rounded-full' >
                            <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                        </div>

                        </div>
                        
                    </div>

            </div>

        </div>
    </section>
}