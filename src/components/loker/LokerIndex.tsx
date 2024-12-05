'use client';

import Image from 'next/image';
import LokerShow from '@/components/loker/LokerShow';
import LokerForm from './LokerForm';
import { getPengalamanKerja } from "@/constant/job/pengalamanKerja";
import { getTipeKerja } from "@/constant/job/tipeKerja";
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form';
import { Accordion } from "flowbite-react";
import { HiPlus, HiCog, HiLocationMarker, HiBriefcase, HiDesktopComputer,HiCurrencyDollar   } from 'react-icons/hi';
import { useRouter } from 'next/navigation' 
import { useLokerAlumni, useLokerAdmin, Filter } from '@/hooks/loker/useStore.hook';
import { rupiahFormat } from '@/helper/formatRupiah';
import { getUser, User } from '@/hooks/auth/authClient';

type Inputs = {
    jobExperience: string;
    jobType: string;
};

export default function LokerIndex(){

    const router = useRouter();

    const { register, handleSubmit,} = useForm<Inputs>();
    const [ user, setUser] = useState<User>();
    const [ role, setRole ] = useState< "alumni" | "admin" | "mahasiswa" >();
    const { data: dataPengalamanKerja } = getPengalamanKerja();
    const { data: dataTipeKerja } = getTipeKerja();
    const [ refresh, setRefresh ] = useState<boolean>(true);
    const [ filter, setFilter ] = useState<Filter | undefined>({});
    const { data: dataLokerAlumni, index: indexAlumni } = useLokerAlumni();
    const { data: dataLokerAdmin, index: indexAdmin } = useLokerAdmin();
    const [ openModalShow, setOpenModalShow ] = useState<boolean>(false);
    const [ openModalForm, setOpenModalForm ] = useState(false);
    const [ selectUuid, setSelectUuid ] = useState<string>();

    const onSubmit: SubmitHandler<Inputs> =  async (data) => {
        setFilter({Pengalaman: data.jobExperience[0] ,TipeKerja: data.jobType[0]});
        setRefresh(!refresh);
    }

    const onClickButton = (uuid: string) => {
        setSelectUuid(uuid);
        setOpenModalShow(true);
    }

    const onDone = () => {
        setOpenModalShow(false);
        setOpenModalForm(false);
        setRefresh(!refresh);
    }

    useEffect(() => {
        if (user){
            if (role === 'alumni') indexAlumni(filter);
            if (role === 'admin') indexAdmin(filter);
        }
    },[refresh, user])

    useEffect(() => {
        const result = getUser();
        if (result) {

            const roleAlumni: boolean | undefined = result?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = result?.roles?.includes('admin');
            const roleMahasiswa: boolean | undefined = result?.roles?.includes('mahasiswa');

            if (roleAlumni) setRole('alumni');
            if (roleAdmin) setRole('admin');
            if (roleMahasiswa) setRole('mahasiswa');

            setUser(result);
        } 
    }, [])

    return (
       <div className='container mx-auto' >

            <section>
                { openModalShow && <LokerShow show={openModalShow}  uuid={selectUuid} onDone={onDone} /> }
                { openModalForm && <LokerForm show={openModalForm}  hide={onDone} /> }
            </section>
       
            <main className="flex flex-col md:flex-row gap-5 " >

                <div className="basis-1/4 shrink-0" >
                    <div className="bg-gray-100 rounded-md p-3 border border-blue-500" >
                        <p className="mb-3" >Filter By</p>

                        <form onSubmit={handleSubmit(onSubmit)} >

                            <Accordion collapseAll >
                                <Accordion.Panel >
                                    <Accordion.Title className="text-sm" >Pengalaman Kerja</Accordion.Title>
                                    <Accordion.Content className="text-sm" >
                                        { dataPengalamanKerja?.map((item) => {
                                            return <div key={item.key} className="flex items-center gap-1 mb-1">
                                                <input { ...register("jobExperience") } type="checkbox" value={item.value} name="jobExperience" id="jobExperience" /> 
                                                <label htmlFor="jobExperience" className="text-sm" >{item.label}</label>
                                            </div>
                                        })}
                                    </Accordion.Content>
                                </Accordion.Panel>

                                <Accordion.Panel >
                                    <Accordion.Title className="text-sm" >Tipe Kerja</Accordion.Title>
                                    <Accordion.Content className="text-sm" >
                                        { dataTipeKerja?.map((item) => {
                                            return <div key={item.key} className="flex items-center gap-1 mb-1">
                                                <input { ...register("jobType") } type="checkbox" value={item.value} name="jobType" id="jobType" /> 
                                                <label htmlFor="jobType" className="text-sm" >{item.label}</label>
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
                        <button onClick={() => setOpenModalForm(true)} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 px-5 py-2 text-white font-semibold text-xs sm:text-sm  rounded-md flex items-center justify-center gap-x-2 w-full sm:w-auto" > <HiPlus /> Post Lowongan</button>
                        <button onClick={() => router.push("/dashboard/loker/manage")} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 px-5 py-2 text-white font-semibold text-xs sm:text-sm rounded-md flex items-center justify-center gap-x-2 w-full sm:w-auto" > <HiCog /> Manage Lowongan</button>
                    </div>

                    {/* Data */}
                    <div>
                    {dataLokerAlumni?.map((item) => {
                            const tags = item.Tags.split(',');

                            return (
                                <div onClick={() => onClickButton(String(item.id))} key={item.id} className="bg-white hover:shadow-lg transition-shadow ease-in flex flex-col sm:flex-row gap-3 p-3 border border-blue-500 rounded-md mb-3 w-full hover:cursor-pointer" >
                                    <div className="flex justify-center"  >
                                        <div className='w-52 aspect-square relative border' >
                                            <Image 
                                                src={item?.Logo ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/${item.Logo}` : '/default_logo.png'}
                                                alt={`${item?.NamaPerusahaan} Logo`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-semibold" >{item.Posisi ?? "~"}</p>
                                        <p>{item.NamaPerusahaan ?? "~"}</p>

                                        <div className="flex gap-3 my-3" >
                                            { tags.map((e, index) => {
                                                return <div key={index} className="text-xs bg-blue-800 py-1 px-3 rounded-full text-white text-center" >{e}</div>
                                            })}
                                        </div>

                                        <p className="flex items-center gap-3"> <HiLocationMarker />{item.Alamat}</p>  
                                        <p className="flex items-center gap-3"> <HiDesktopComputer />{item.Pengalaman}</p>
                                        <p className="flex items-center gap-3"> <HiBriefcase /> {item.TipeKerja}</p>
                                        <p className="flex items-center gap-3"> <HiCurrencyDollar /> {item.Gaji ? rupiahFormat(Number(item.Gaji)) : "~"}</p>
                                    </div>
                                </div>
                            )
                        })}

                        { dataLokerAdmin.map((item) => {
                            const tags = item.Tags.split(',');

                            return (
                                <div onClick={() => onClickButton(String(item.id))} key={item.id} className="bg-white hover:shadow-lg transition-shadow ease-in flex flex-col sm:flex-row gap-3 p-3 border border-blue-500 rounded-md mb-3 w-full hover:cursor-pointer" >
                                    <div className="flex justify-center"  >
                                        <div className='w-52 aspect-square relative border ' >
                                            <Image 
                                                src={item?.Logo ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/${item.Logo}` : '/default_logo.png'}
                                                alt={`${item?.NamaPerusahaan} Logo`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-semibold" >{item.Posisi ?? "~"}</p>
                                        <p>{item.NamaPerusahaan ?? "~"}</p>

                                        <div className="flex gap-3 my-3" >
                                            { tags.map((e, index) => {
                                                return <div key={index} className="text-xs bg-blue-800 py-1 px-3 rounded-full text-white text-center" >{e}</div>
                                            })}
                                        </div>

                                        <p className="flex items-center gap-3"> <HiLocationMarker />{item.Alamat}</p>  
                                        <p className="flex items-center gap-3"> <HiDesktopComputer />{item.Pengalaman}</p>
                                        <p className="flex items-center gap-3"> <HiBriefcase /> {item.TipeKerja}</p>
                                        <p className="flex items-center gap-3"> <HiCurrencyDollar /> {item.Gaji ? rupiahFormat(Number(item.Gaji)) : "~"}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </main>
        </div> 
    ) 
}