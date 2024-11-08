'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { login as submitLogin } from '@/hooks/auth/authClient';
import { useRouter, useSearchParams  } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HiAdjustments } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";

type Inputs = {
    email: string;
    password: string;   
}

enum LoginType {
    student,
    alumni,
    coordinator
}

export default function Login(){

    const router = useRouter();
    const searchParams = useSearchParams()
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const [isDisabled, setIsDisabled] = useState(false);

    const loginType = searchParams.get('type') as keyof typeof LoginType | null ;

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData();
        setIsDisabled(true);
        
        if (data.email) formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);

        await submitLogin(formData)
            .then(() => {
                toast.success("Log in successfully");
                router.replace("/dashboard");
            }).catch((err: Error) => {
                toast.error( err.message ? err.message : "Login Failed");
            });

        setIsDisabled(false);
        reset();        
    }    

    useEffect(() => {
        if (!loginType || !(loginType in LoginType)) router.push('/');
    }, [loginType, router]);

    return <main className='py-5 px-3 sm:px-8 rounded-lg shadow flex w-full max-w-2xl mx-10 gap-x-3 ' >

        <div className='w-full flex-initial p-3' >

            <div className='flex gap-3 items-center mb-5' >
                <Link href={"/auth"} ><HiAdjustments className='text-2xl hover:text-blue-500' /></Link>
                <h2 className="text-2xl font-semibold " >Login</h2>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 ">Your email</label>
                    <input {...register('email')} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="alumni@mhs.co.id" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 ">Your password</label>
                    <input {...register('password')} type="password" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='xxxxxxxxx' required />
                </div>

                <p className='text-xs my-3 text-center sm:text-left text-blue-800 ' > <Link  href={"/auth/forgot-password"} >Forgot your password ?</Link></p>
                
                <button disabled={isDisabled} type="submit" className=" disabled:bg-gray-400 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-3"  >Submit</button>

                {
                    (loginType === 'student') && (
                        <button disabled={isDisabled} type="button" className=" disabled:bg-gray-400  hover:bg-gray-100 focus:ring-1 border focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center flex items-center justify-center gap-3"  >
                            <FaGoogle/>
                            Login By Google
                        </button>
                    ) 
                }
                
                {
                    (loginType === 'alumni') && (
                        <p className='text-xs my-5 text-center' >Dont have an account ? you can <span className='text-blue-800' > <Link  href={"/auth/register"} >register</Link> </span>  first</p>
                    )
                }


            </form>

        </div>

        <div className='hidden w-full flex-initial justify-center h-auto md:flex items-center  ' >

            <div  >
                <Image priority src="/draw/undraw_Beach_day_cser.png" alt="Beach day illustration" width={400} height={400} style={{ maxWidth: '100%', height: 'auto' }} />

                <p className="font-semibold mb-5 text-gray-400 text-center " >Welcome back, </p>

            </div>

        </div>

    </main>


    
}