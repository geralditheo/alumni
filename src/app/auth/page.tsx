import Link from "next/link"
import Image from 'next/image';

export default function Auth(){
    return (
        <main className="mx-3" >

            <div className='w-full justify-center h-auto mb-5 ' >
                <Image priority src="/logo/logo-sti.png" alt="STI Udinus Logo" width={400} height={400} style={{ maxWidth: '100%', height: 'auto' }} />
            </div>

            <h2 className="font-semibold text-gray-500 text-center mb-5 text-2xl text-sm sm:text-base" >Portal Alumni Udinus</h2>

            <div className="rounded-lg group hover:shadow-md transition-all ease-in-out w-full max-w-4xl border p-5" >

                <p className="font-semibold mb-5 text-gray-400 text-center text-sm sm:text-base" >Here come, you can choose you role.</p>

                <div className="flex flex-col gap-y-3" >
                    <Link href={"/auth/login?type=student"} className=" text-sm sm:text-base border py-2 px-4 rounded-md text-center transition-colors ease-in-out duration-300 font-semibold text-gray-500 group-hover:bg-blue-500 group-hover:text-white" >Mahasiswa</Link>
                    <Link href={"/auth/login?type=alumni"} className="text-sm sm:text-base border py-2 px-4 rounded-md text-center transition-colors ease-in-out duration-400 font-semibold text-gray-500 group-hover:bg-orange-400 group-hover:text-white" >Alumni</Link>
                    <Link href={"/auth/login?type=coordinator"} className="text-sm sm:text-base border py-2 px-4 rounded-md text-center transition-colors ease-in-out duration-500 font-semibold text-gray-500 group-hover:bg-rose-500 group-hover:text-white" >Koordinator</Link>
                </div>

            </div>

        </main>
    )
}