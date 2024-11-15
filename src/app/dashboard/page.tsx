'use client';

import { useState, useEffect } from "react";
import { getUser, User } from '@/hooks/auth/authClient';

import DashboardAlumni from "@/components/dashboard/dash-alumni/DashboardAlumni";
import DashboardLoker from "@/components/dashboard/lowongan-kerja/DashboardLoker";
import DashboardLogang from "@/components/dashboard/lowongan-magang/DashboardLogang";
import DashboardStatistikAlumni from '@/components/dashboard/statistik-alumni/DashboardStatistikAlumni';


export default function Dashboard(){

    const [user, setUser] = useState<User>();

    const roleAlumni: boolean | undefined = user?.roles?.includes('alumni');
    const roleAdmin: boolean | undefined = user?.roles?.includes('admin');
    const roleMahasiswa: boolean | undefined = user?.roles?.includes('mahasiswa');

    useEffect(() => {
        const result = getUser();
        if (result) setUser(result);
    }, [])

    return <main className="container mx-auto lg:px-32 " >

        <h2 className="font-semibold text-gray-500 text-2xl mb-3" >Welcome, {user?.name ?? "Username" }</h2>

        <div className="p-3  rounded-md bg-blue-500 h-[200px] mb-3 flex items-center justify-center" ><p className='font-semibold text-5xl text-center text-white' >Portal Alumni</p>  </div>

        { ( roleAdmin ) && <DashboardStatistikAlumni /> }
        { ( roleAlumni  ) && <DashboardAlumni /> }
        { ( roleAlumni || roleMahasiswa ) && <DashboardLogang /> }
        { ( roleAlumni ) && <DashboardLoker /> }

    </main>
}