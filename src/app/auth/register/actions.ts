'use server';

import { revalidatePath } from "next/cache";

export const login = async (prevState: any, formData: FormData) => {

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(name, email, password);
    
    

    try {
        
        revalidatePath('/');

        return { message: "Added Data" };

    } catch (error) {

        return { message: "Failed" }
        
    }
    
}

