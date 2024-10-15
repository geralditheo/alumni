'use client';

import { getPengalamanMagang } from "@/constant/internship/pengalamanMagang";
import { getTipeMagang } from "@/constant/internship/tipeMagang";
import { useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form';
import { Accordion } from "flowbite-react";
import { HiPlus, HiCog, HiLocationMarker, HiBriefcase, HiDesktopComputer,HiCurrencyDollar   } from 'react-icons/hi';
import { useRouter } from 'next/navigation'
import Image from 'next/image';


type Inputs = {
    internshipExperience: string;
    internshipType: string;
};

export default function LogangIndex(){

    const router = useRouter()
    const many = [1,2,3,4,5,6,7,8,9];

    const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
    const { data: dataPengalamanMagang } = getPengalamanMagang();
    const { data: dataTipeMagang } = getTipeMagang();
    const [ filter, setFilter ] = useState({});
    

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {

        console.log("Data", data);
        
    }

    return <main className="flex flex-col sm:flex-row gap-5 container" >

        <div className="basis-1/4 shrink-0" >
            <div className="bg-gray-100 rounded-md p-3 border border-blue-500" >
                <p className="mb-3" >Filter By</p>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <Accordion collapseAll >
                        <Accordion.Panel >
                            <Accordion.Title className="text-sm" >Pengalaman Magang</Accordion.Title>
                            <Accordion.Content className="text-sm" >
                                { dataPengalamanMagang?.map((item) => {
                                    return <div key={item.key} className="flex items-center gap-1 mb-1">
                                        <input { ...register("internshipExperience") } type="checkbox" value={item.value} name="internshipExperience" id="internshipExperience" /> 
                                        <label htmlFor="internshipExperience" className="text-sm" >{item.label}</label>
                                    </div>
                                })}
                            </Accordion.Content>
                        </Accordion.Panel>

                        <Accordion.Panel >
                            <Accordion.Title className="text-sm" >Pengalaman Magang</Accordion.Title>
                            <Accordion.Content className="text-sm" >
                                { dataTipeMagang?.map((item) => {
                                    return <div key={item.key} className="flex items-center gap-1 mb-1">
                                        <input { ...register("internshipType") } type="checkbox" value={item.value} name="internshipType" id="internshipType" /> 
                                        <label htmlFor="internshipType" className="text-sm" >{item.label}</label>
                                    </div>
                                })}
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                    
                    <button type="submit" className="mt-3 px-5 py-1 bg-blue-500 text-white rounded-md w-full sm:w-auto"  >Filter</button>

                </form>
            </div>
        </div>

        <div className="basis-full" >
            <div className="flex gap-3 mb-3" >
                <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 px-5 py-2 text-white font-semibold text-xs sm:text-sm  rounded-md flex items-center justify-center gap-x-2 w-full sm:w-auto" > <HiPlus /> Post Internship</button>
                <button onClick={() => router.push("/dashboard/logang/manage")} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 px-5 py-2 text-white font-semibold text-xs sm:text-sm rounded-md flex items-center justify-center gap-x-2 w-full sm:w-auto" > <HiCog /> Manage Internship</button>
            </div>

            {/* Data */}
            <div>
                { many.map((item, index) => {
                    return (

                    <div key={index} className="bg-white shadow flex flex-col sm:flex-row gap-3 p-3 border border-blue-500 rounded-md mb-3" >
                        <div className="flex justify-center"  >
                            <div className='w-52 aspect-square relative border' >
                                <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt='dashboard-image' fill className='object-cover m-auto w-full h-full ' />
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold" >Developer</p>
                            <p>Udinus</p>

                            <div className="flex gap-3 my-3" >
                                <div className="text-xs bg-blue-800 py-1 px-3 rounded-full text-white text-center" >nodejs</div>
                                <div className="text-xs bg-blue-800 py-1 px-3 rounded-full text-white text-center" >web</div>
                            </div>

                            <p className="flex items-center gap-3"> <HiLocationMarker />   Semarang  </p>  
                            <p className="flex items-center gap-3"> <HiDesktopComputer /> Fresh Graduate</p>
                            <p className="flex items-center gap-3"> <HiBriefcase /> Fulltime</p>
                            <p className="flex items-center gap-3"> <HiCurrencyDollar /> Rp, 3.000.000</p>
                        </div>
                    </div>

                    )
                })}

            </div>
        </div>

    </main>
}