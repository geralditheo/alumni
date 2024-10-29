import axios from "axios";
import { getToken } from '@/hooks/auth/authClient';

export async function generateCV(){

    const token = getToken();

    try {
        const { data } = await axios.get('/api/generate-cv/pdf', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}