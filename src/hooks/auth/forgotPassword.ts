import axios from "axios";
import { useState } from "react";
import { toast } from 'sonner';

export const forgotPassword = () => {

    const [otp, setOtp] = useState<string>('123456');
    const [verified, setVeried] = useState<boolean>(true);

    const sendOtp  = async (formData: FormData): Promise< void | undefined > => {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/forgot-password`, formData);

            console.log(data);
            
            toast.success("Success to send email!");
            
        } catch (error) {
            console.log("Error", error);
            toast.error("Failed to send email!");
        }
    
    }

    const verifyOtp  = async (formData: FormData): Promise< void | undefined > => {
    
    }

    const resetPassword  = async (formData: FormData): Promise< void | undefined > => {
    
    }

    return { sendOtp, verifyOtp, resetPassword, otp, verified };
}


