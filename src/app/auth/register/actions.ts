'use server'
 
export async function register(formData: FormData) {
  
    const data = Object.fromEntries(formData.entries());

    console.log(data);


}