'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';

import { forgotPassword } from '@/hooks/auth/forgotPassword';

type Inputs = {
    // * Main
    email: string;
    password: string;
    rePassword: string;
    formOtp: string;
}

export default function ForgotPassword(){

    // * Initialization
    const { sendOtp, verifyOtp, resetPassword, otp, verified } = forgotPassword();
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const [ status, setStatus ] = useState<'sendOtp' | 'verifyOtp' | 'resetPassword'>('sendOtp');

    // * Function
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        
        const formData = new FormData();
        if (data.email) formData.append('email', data.email);
        if (data.password) formData.append('password', data.password);
        if (otp) formData.append('otp', otp);

        if (status === 'sendOtp') {

            // await sendOtp(formData);

            return setStatus('verifyOtp');
        }

        if (status === 'verifyOtp' && otp) {

            // await verifyOtp(formData);

            return setStatus('resetPassword');
        }

        if (status === 'resetPassword' && verified ) {

            // await resetPassword(formData);

            if (data.password !== data.rePassword) return toast.error("Your password doesnt match");

            return setStatus('sendOtp');

        }
        
    }

    return (
        <main className='py-5 sm:px-8 rounded-lg shadow w-full max-w-lg mx-10 ' >
            <h3 className='font-semibold text-center text-blue-500 my-8' >Alumni Udinus</h3>
            <p className='mb-8' >Enter the email associated with your account and we will send you a code to reset your password</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">

                {status === 'sendOtp' && (
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 ">Your email</label>
                        <input {...register('email')} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="alumni@mhs.co.id" required />
                    </div>
                )}

                {status === 'verifyOtp' && (
                    <div className="mb-5">
                        <label htmlFor="formOtp" className="block mb-1 text-sm font-medium text-gray-900 ">Your OTP</label>
                        <input {...register('formOtp')} type="text" id="formOtp" name='formOtp' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " maxLength={6} placeholder="135246" required />
                    </div>
                )}

                {status === 'resetPassword' && (
                    <div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 ">Your New Password</label>
                            <input {...register('password')} type="password" id="password" name='password' minLength={8} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="some secret password" required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="rePassword" className="block mb-1 text-sm font-medium text-gray-900 ">Confirm Your Password</label>
                            <input {...register('rePassword')} type="password" id="rePassword" name='rePassword' minLength={8} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="some secret password" required />
                        </div>

                    </div>
                )}


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">
                    { status === 'sendOtp' ? "Send Email" : status === 'verifyOtp' ? "Verify OTP" : status === 'resetPassword' ? "Reset Password" : "" }
                </button>

            </form>

        </main>
    )
}