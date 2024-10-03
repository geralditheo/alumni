'use client';

import { getMenu } from '@/constant/sidebar/sidebar';
import Image from 'next/image';
import Link from 'next/link';

export default function SidebarComponent(){

    const menu = getMenu();

    return <main className='h-screen bg-blue-500 py-3 border ' >

        <div className=' mb-5 py-5 flex items-center gap-x-3 justify-center' >
            <Image  src={"/logo/logo-udinus.png"} width={40} height={40} alt='Logo' />    
            <p className='text-xl font-semibold text-white' >Udinus</p>
        </div>

        

        <div className='flex flex-col' >
            { menu.map((item) => {
                return <Link href={item.path} key={item.key} className='text-white flex gap-x-2 items-center px-4 py-2 hover:bg-blue-700 transition-all ease-in ' >
                    <item.icon /> {item.title} 
                </Link>
            })}
        </div>

    </main>

    
}