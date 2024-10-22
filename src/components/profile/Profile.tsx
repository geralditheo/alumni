'use client';

import Image from "next/image"
import ModalProfile from "@/components/profile/ModalProfile";
import ModalChangePassword from "./ModalChangePassword";
import { useEffect, useState } from "react";
import { useProfile } from '@/hooks/profile/alumni/useStore.hook';

export default function Profile({}: { uuid?: string }){

    const { data, getData } = useProfile();

    const [openModalPhoto ,setOpenModalPhoto] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);

    const hide = () => {
        setOpenModalPhoto(false);
        setOpenModalPassword(false);
    }

    useEffect(() => {
        getData();
    }, [])


    return <main>
        <aside>
            { openModalPhoto && <ModalProfile show={openModalPhoto} hide={hide} uuid="ansda" /> } 

            { openModalPassword && <ModalChangePassword show={openModalPassword} hide={hide} uuid="ansda"/> }

        </aside>

        <section className="max-w-fit shadow mx-auto sm:mx-0 " >
            <div className="w-full bg-blue-500 rounded-md p-5 h-24" />

            <div className="flex flex-col sm:flex-row p-3 gap-3 " >

                <div className=" w-56 aspect-square relative basis-full mx-auto" >
                    <Image  src="/draw/undraw_Experience_design_re_dmqq.png" alt="Photo Profile" fill className="border border-blue-500 rounded-2xl"  />
                </div>
                

                <div className="basis-full" >
                    <h3 className="font-semibold text-gray-500 mb-3" >Personal Information</h3>

                    <div className="w-fit px-3 py-1 bg-orange-300  text-xs shadow -left-14 mb-3" >Alumni</div>

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