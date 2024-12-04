'use client';

import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/helper/formatDate';
import { HiStar, HiPencilAlt, HiChip } from 'react-icons/hi';
import { useEffect } from 'react';
import { useDashboardAlumni } from '@/hooks/dashboard/alumni/useStore.hook';
import { useCvAlumni } from '@/hooks/cv/cvAlumni.hook';


export default function DashboardAlumni(){

    const { tCount, dataDashboardAlumni, getDashboardAlumni } = useDashboardAlumni();
    const { getDataCvAlumni } = useCvAlumni();

    useEffect(() => {
        getDashboardAlumni();
        getDataCvAlumni();
    }, [])    

    return <section className='mb-5' >

        <div className="flex flex-col md:flex-row gap-5  " >

            <div className="basis-full mb-5" >

                <div className="p-3 flex gap-3 items-center bg-white shadow flex-col md:flex-row-reverse mb-1 border border-blue-300  rounded-md">

                    <div className='basis-44 aspect-square relative rounded-full' >
                        <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full rounded-full ' />
                    </div>

                    <div className="basis-full text-center md:text-left " >

                        <h3 className="font-semibold" > Improve your data alumni</h3>

                        <p>You are now level <span className='font-semibold text-blue-500' >{tCount}</span>, you can still improve it! Keep the work up!  </p>

                    </div>

                </div>

                <div>
                    {
                        dataDashboardAlumni?.academic && (
                            <div className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  hover:bg-gray-50' >
                                { dataDashboardAlumni.academic.exists && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                                { !dataDashboardAlumni.academic.exists && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                                <div className='basis-full' >  
                                    <p className='font-semibold' >Academic</p>
                                    { dataDashboardAlumni.academic.updated_at && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(dataDashboardAlumni.academic.updated_at)  } </p> } 
                                </div>
                                <Link href={`/dashboard/alumni/academic`} className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </Link>
                            </div>
                        )
                    }
                    {
                        dataDashboardAlumni?.award && (
                            <div className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  hover:bg-gray-50' >
                                { dataDashboardAlumni.award.exists && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                                { !dataDashboardAlumni.award.exists && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                                <div className='basis-full' >  
                                    <p className='font-semibold' >Award</p>
                                    { dataDashboardAlumni.award.updated_at && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(dataDashboardAlumni.award.updated_at)  } </p> } 
                                </div>
                                <Link href={`/dashboard/alumni/award`} className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </Link>
                            </div>
                        )
                    }
                    {
                        dataDashboardAlumni?.course && (
                            <div className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  hover:bg-gray-50' >
                                { dataDashboardAlumni.course.exists && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                                { !dataDashboardAlumni.course.exists && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                                <div className='basis-full' >  
                                    <p className='font-semibold' >Course</p>
                                    { dataDashboardAlumni.course.updated_at && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(dataDashboardAlumni.course.updated_at)  } </p> } 
                                </div>
                                <Link href={`/dashboard/alumni/course`} className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </Link>
                            </div>
                        )
                    }
                    {
                        dataDashboardAlumni?.internship && (
                            <div className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  hover:bg-gray-50' >
                                { dataDashboardAlumni.internship.exists && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                                { !dataDashboardAlumni.internship.exists && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                                <div className='basis-full' >  
                                    <p className='font-semibold' >Internship</p>
                                    { dataDashboardAlumni.internship.updated_at && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(dataDashboardAlumni.internship.updated_at)  } </p> } 
                                </div>
                                <Link href={`/dashboard/alumni/internship`} className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </Link>
                            </div>
                        )
                    }
                    {
                        dataDashboardAlumni?.organization && (
                            <div className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  hover:bg-gray-50' >
                                { dataDashboardAlumni.organization.exists && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                                { !dataDashboardAlumni.organization.exists && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                                <div className='basis-full' >  
                                    <p className='font-semibold' >Organization</p>
                                    { dataDashboardAlumni.organization.updated_at && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(dataDashboardAlumni.organization.updated_at)  } </p> } 
                                </div>
                                <Link href={`/dashboard/alumni/organization`} className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </Link>
                            </div>
                        )
                    }
                    {
                        dataDashboardAlumni?.skill && (
                            <div className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  hover:bg-gray-50' >
                                { dataDashboardAlumni.skill.exists && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                                { !dataDashboardAlumni.skill.exists && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                                <div className='basis-full' >  
                                    <p className='font-semibold' >Skill</p>
                                    { dataDashboardAlumni.skill.updated_at && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(dataDashboardAlumni.skill.updated_at)  } </p> } 
                                </div>
                                <Link href={`/dashboard/alumni/skill`} className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </Link>
                            </div>
                        )
                    }
                    {
                        dataDashboardAlumni?.work && (
                            <div className='w-full p-3 shadow bg-white mb-1 flex gap-x-3 items-center rounded-md  hover:bg-gray-50' >
                                { dataDashboardAlumni.work.exists && <HiStar className='text-4xl shrink-0 text-yellow-300 ' />  }
                                { !dataDashboardAlumni.work.exists && <HiStar className='text-4xl shrink-0 text-gray-300 ' />  }
                                <div className='basis-full' >  
                                    <p className='font-semibold' >Work</p>
                                    { dataDashboardAlumni.work.updated_at && <p className='text-xs font-semibold text-gray-400' > Last updated { formatDate(dataDashboardAlumni.work.updated_at)  } </p> } 
                                </div>
                                <Link href={`/dashboard/alumni/job`} className='shrink-0  hover:text-blue-500 ' ><HiPencilAlt />  </Link>
                            </div>
                        )
                    }
                </div>
                
            </div>

            <div className="basis-full mb-5">

                <div className='p-3 shadow mb-3' >
                    <div className='flex items-center' >

                        <div className='basis-full' >
                            <p className='font-semibold mb-3 text-justify' >You can create your own Curriculum Vitae by just clicking button.</p>
                            <a target='_blank' href={"/api/generate-cv/pdf"} rel='noopener noreferrer'  className='transition-colors ease-in hover:bg-blue-600 px-5 py-2 shadow rounded-md bg-blue-500 text-white flex items-center gap-x-3 w-fit' > <HiChip /> Generate CV</a>
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
                            <Link href={"/dashboard/profile"} className='transition-colors ease-in hover:bg-gray-300 px-5 py-2 w-fit shadow rounded-md flex items-center gap-x-3' > <HiPencilAlt /> Profile</Link>
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