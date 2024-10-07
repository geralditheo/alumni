'use client';

import { useCheckDataAlumni } from '@/hooks/dashboard/useStore.hook';
import { formatDate } from '@/helper/formatDate';
import { HiStar, HiPencilAlt   } from 'react-icons/hi';

import Image from 'next/image';

export default function DashboardAlumni(){

    const getData = useCheckDataAlumni();

    return <section>

        <div className="p-3  rounded-md bg-blue-500 h-[200px] mb-3 flex items-center justify-center" ><p className='font-semibold text-5xl text-center text-white' >Portal Alumni</p>  </div>

        <div className="md:flex gap-x-5" >

            <div className="basis-full " >

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
                        return <div key={item.key} className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  ' >
                            { item.isFilled && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                            { !item.isFilled && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                            <div className='basis-full' >  
                                <p className='font-semibold' >{item.name}</p>
                                { item.lastUpdted && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(item.lastUpdted)  } </p> } 
                            </div>
                            <button className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </button>
                        </div>
                    }) }
                </div>
                
            </div>

            <div className="basis-full bg-white shadow  " >

            </div>

        </div>
    </section>
}