import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenServer } from '@/hooks/auth/authServer';
import { DocumentCV } from '@/components/cv/DocumentCV';

import { renderToStream } from '@react-pdf/renderer';


export async function GET(request: NextRequest) {

    const token = await getTokenServer();    

    const data = {
        profile: {},
        academic: [],
    }

    try {

        const { data: profile } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/profilealumni`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (profile.data) data.profile = profile.data;
             
    } catch (error) {
        console.log(error);
        throw new Error("Failed fetch profile");
    }

    try {
        const { data: academic } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/academics`, {
            params: {
                page: 1,
            },  
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (academic.data) data.academic = academic.data; 
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed fetch academic");
    }

    console.log("Data", data);

    const stream = await renderToStream(
        <DocumentCV 
            profile={data.profile as any} 
        />
    )

    return new NextResponse(stream as unknown as ReadableStream );
}