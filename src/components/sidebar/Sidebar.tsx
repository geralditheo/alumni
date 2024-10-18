'use client';

import { getMenu, MenuItem } from '@/constant/sidebar/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight  } from "react-icons/hi";

export default function SidebarComponent(){
    const pathname = usePathname()

    const [menu, setMenu] = useState<MenuItem[]>([]); 
    const [isCollapse, setIsCollapse] = useState(false);

    const onCollapseSidebar = () => setIsCollapse(!isCollapse);

    const fetchMenu = async () => {
        const menuItems = await getMenu();
        setMenu(menuItems);
    };

    useEffect(() => {
        fetchMenu();
    }, [])

    return <main className='hidden shrink-0 sm:flex' >

        <div className='sm:h-screen sm:bg-blue-500 py-3 shrink-0 bg-white transition-all ease-in' >

            <div className='hidden  mb-5 py-5 sm:flex items-center gap-x-3 justify-center px-4' >
                <Image  src={"/logo/logo-udinus.png"} width={40} height={40} alt='Logo' />    
                <p className={`text-xl font-semibold text-white ${ isCollapse ? 'hidden' : 'block'}`} >Alumni</p>
            </div>

            <div className=' hidden sm:flex flex-col px-3 transition-all ease-in' >
                { menu.map((item) => {
                    return <Link href={item.path} key={item.key} className={`text-white flex gap-x-2 items-center px-4 py-2 mb-2 transition-all ease-in h-10 ${ pathname === item.path ? 'rounded-md bg-yellow-400 ' : 'hover:bg-blue-700 hover:rounded-md' }`} >
                        <item.icon /> 
                        <p className={`${isCollapse ? 'hidden' : 'block'}`} >{item.title} </p> 

                    </Link>
                })}
            </div>

        </div>

        <div className='bg-yellow-300 p-1 relative' >
                <button className='bg-white p-3 rounded-full absolute -inset-x-4 top-16 shadow' onClick={onCollapseSidebar} > {isCollapse ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft /> } </button>
        </div>

    </main>

    
}