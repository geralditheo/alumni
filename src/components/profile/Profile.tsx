'use client';

import Image from "next/image"
import ModalProfile from "@/components/profile/ModalProfile";
import ModalChangePassword from "./ModalChangePassword";
import QuestionerForm from '@/components/kuesioner/questionerForm';
import { useEffect, useState } from "react";
import { useProfile } from '@/hooks/profile/alumni/useStore.hook';
import { getUser, User } from '@/hooks/auth/authClient';
import { HiPencilAlt, HiAcademicCap } from 'react-icons/hi';
import { Accordion } from "flowbite-react";

export default function Profile({}: { uuid?: string }){

    const { data, getDataAlumni, getDataAdmin } = useProfile();

    const [user, setUser] = useState<User | null>(null);
    const [openModalPhoto ,setOpenModalPhoto] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);

    const hide = () => {
        setOpenModalPhoto(false);
        setOpenModalPassword(false);
    }

    useEffect(() => {
        const fetchedUser = getUser();
        setUser(fetchedUser);

        if (fetchedUser?.roles.includes('alumni')) getDataAlumni();
        if (fetchedUser?.roles.includes('admin')) getDataAdmin();

    }, [])    

    return <main className="container " >
        <aside>
            { openModalPhoto && <ModalProfile show={openModalPhoto} hide={hide} /> } 

            { openModalPassword && <ModalChangePassword show={openModalPassword} hide={hide} /> }

        </aside>

        <section className="shadow-md  sm:mx-0  bg-white " >
            <div 
                className="w-full bg-blue-500 h-24 sm:h-56 relative rounded-md border mb-10 sm:mb-20" 
                style={{
                    backgroundColor: '#ffffff',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%235fbaff' fill-opacity='1'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="w-24 sm:w-44 aspect-square absolute rounded-full mb-5 border -bottom-16 left-4 sm:-bottom-20 sm:left-16" >
                    <Image src="/draw/undraw_Experience_design_re_dmqq.png" alt="Photo Profile" fill className="border rounded-full object-cover"  />
                </div>

            </div>

            <div className="px-4 sm:px-16 py-5" >

                <div className="flex justify-between items-center" >
                    <div>
                        <h3 className="font-semibold text-gray-500 mb-3" >Personal Information</h3>
                    </div>
                    <div className="flex gap-1" >
                        <button className="text-xs sm:text-lg p-3 shadow-sm rounded-md border border-blue-300 border-dashed" onClick={() => setOpenModalPhoto(true)} ><HiAcademicCap /></button>
                        <button className="text-xs sm:text-lg p-3 shadow-sm rounded-md border border-blue-300 border-dashed" onClick={() => setOpenModalPassword(true)} ><HiPencilAlt /></button>
                    </div>

                </div>


                { user?.roles?.map((item) => {
                        return (
                            <div key={item} className="w-fit px-3 py-1 bg-orange-300  text-xs shadow -left-14 mb-3" >{item}</div>
                        )
                    })
                }

                <div className="font-semibold" >{ data?.name ?? "" }</div>

                <div className="mb-3" >{ data?.email ?? "" }</div>

            </div>

            <Accordion collapseAll >
                <Accordion.Panel>
                    <Accordion.Title>Edit Something</Accordion.Title>
                    <Accordion.Content className="" >
                        Subject to edit something
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

        </section>
    </main>
}