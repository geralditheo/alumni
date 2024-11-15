"use client";

import { Avatar, Dropdown } from "flowbite-react";
import { getMenu } from '@/constant/sidebar/sidebar';
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from 'next/navigation'
import { logout, getUser } from '@/hooks/auth/authClient';
import Image from 'next/image';
import Link from "next/link";


export default function Navigationbar(){

    const menu = getMenu();
    const router = useRouter()
    const user = getUser();

    const onLogOut = async () => {
        await logout();
        router.replace("/");

        return
    }

    return <main className="border w-full p-5  flex justify-between bg-white shadow-md items-center" >

        <div className="sm:hidden" >
            <Dropdown
                arrowIcon={false}
                inline
                label={ <HiMenuAlt3 size={30} /> }
                
            >
                
                { menu.map((item) => (<Dropdown.Item key={item.key} className="active:bg-blue-700 active:text-white" > <Link href={item.path} >{item.title}</Link> </Dropdown.Item>)) }
            </Dropdown>

        </div>

        <div className="mx-3" >
            <Image  src={"/logo/logo-sti.png"} height={100} width={200}  alt='Logo'    />    
        </div>

        <div>
            <Dropdown
                arrowIcon={false}
                inline
                label={ <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
            >
                <Dropdown.Header>
                    <span className="block text-sm">{ user?.name ? user.name : "~" }</span>
                    <span className="block truncate text-sm font-medium">{ user?.email ? user.email : "~" }</span>
                </Dropdown.Header>

                <Dropdown.Item onClick={() => router.push("/dashboard/profile")} > Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogOut} >Sign out</Dropdown.Item>
            </Dropdown>

        </div>
        
    </main>
}