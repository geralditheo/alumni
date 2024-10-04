'use server'
 
export async function login(formData: FormData) {
  
    const data = Object.fromEntries(formData.entries());

    console.log(data);


}