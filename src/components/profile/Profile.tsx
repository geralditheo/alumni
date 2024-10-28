'use client';

import Image from "next/image"
import ModalProfile from "@/components/profile/ModalProfile";
import ModalChangePassword from "./ModalChangePassword";
import { useEffect, useState } from "react";
import { useProfile } from '@/hooks/profile/alumni/useStore.hook';
import { getUser } from '@/hooks/auth/authClient';

export default function Profile({}: { uuid?: string }){

    const { data, getData } = useProfile();
    const user = getUser();

    const [openModalPhoto ,setOpenModalPhoto] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);

    const hide = () => {
        setOpenModalPhoto(false);
        setOpenModalPassword(false);
    }

    useEffect(() => {
        getData();
    }, [])

    console.log("Profile", data);
    

    return <main>
        <aside>
            { openModalPhoto && <ModalProfile show={openModalPhoto} hide={hide} uuid="ansda" /> } 

            { openModalPassword && <ModalChangePassword show={openModalPassword} hide={hide} uuid="ansda"/> }

        </aside>

        <section className="max-w-fit shadow-md mx-auto sm:mx-0  bg-white" >
            <div 
                className="w-full bg-blue-500 p-5 h-24  rounded-md" 
                style={{
                    backgroundColor: '#ffffff',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%235fbaff' fill-opacity='1'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                }}
            />

            <div className="flex flex-col sm:flex-row p-3 gap-3 " >

                <div className=" w-56 aspect-square relative basis-full mx-auto" >
                    <Image  src="/draw/undraw_Experience_design_re_dmqq.png" alt="Photo Profile" fill className="border  rounded-2xl"  />
                </div>
                

                <div className="basis-full" >
                    <h3 className="font-semibold text-gray-500 mb-3" >Personal Information</h3>

                    { user?.roles.map((item) => {
                            return (
                                <div key={item} className="w-fit px-3 py-1 bg-orange-300  text-xs shadow -left-14 mb-3" >{item}</div>
                            )
                        })
                    }

                    <div className="font-semibold" >{ data?.name ?? "" }</div>

                    <div className="mb-3" >{ data?.email ?? "" }</div>

                    <div className="flex gap-3">
                        <button onClick={() => setOpenModalPhoto(true)} className="bg-blue-500 shadow-sm px-3 py-1 text-sm rounded-md text-white hover:bg-blue-600 active:bg-blue-700 w-full" >Update Photo Profile</button>
                        <button onClick={() => setOpenModalPassword(true)} className="bg-blue-500 shadow-sm px-3 py-1 text-sm rounded-md text-white hover:bg-blue-600 active:bg-blue-700 w-full" >Change Password</button>
                    </div>

                </div>
            </div>
        </section>
    </main>
}