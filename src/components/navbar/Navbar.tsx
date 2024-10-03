"use client";

import { Avatar, Dropdown } from "flowbite-react";
import { getMenu } from '@/constant/sidebar/sidebar';
import Image from 'next/image';
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";

export default function Navigationbar(){

    const menu = getMenu();

    return <main className="border w-full p-5  flex justify-between bg-white shadow-md items-center" >

        <div className='hidden sm:block' >
            <Image  src={"/logo/logo-sti.png"} height={100} width={200}  alt='Logo'    />    
        </div>

        <div className="sm:hidden" >
            <Dropdown
                arrowIcon={false}
                inline
                label={ <HiMenuAlt3 size={30} /> }
                
            >
                
                { menu.map((item) => (<Dropdown.Item key={item.key} className="active:bg-blue-700 active:text-white" > <Link href={item.path} >{item.title}</Link> </Dropdown.Item>)) }
            </Dropdown>

        </div>

        <div>
            <Dropdown
                arrowIcon={false}
                inline
                label={ <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
            >
                <Dropdown.Header>
                    <span className="block text-sm">Bonnie Green</span>
                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </Dropdown.Header>

                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>

        </div>
        
    </main>
}