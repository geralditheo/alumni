import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenServer } from '@/hooks/auth/authServer';
import { DocumentCV } from '@/components/cv/DocumentCV';
import { renderToStream } from '@react-pdf/renderer';

export type cvAlumni = {
    profile: {
        name?: string;
        email?: string;
        no_hp?: string;
    },
    academics: [],
    jobs: [],
    internships: [],
}

export async function GET(request: NextRequest) {

    const token = await getTokenServer();    

    const temp: cvAlumni = {
        profile: {},
        academics: [],
        jobs: [],
        internships: [],
    }

    try {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cetakCvAlumni` , {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (data.alumni) temp.profile = data.alumni;
        if (data.academics) temp.academics = data.academics;
        if (data.jobs) temp.academics = data.jobs;
        if (data.internships) temp.academics = data.internships;
        
    } catch (error) {

        console.log("Error", error);
        
        throw new Error("Error get announecement");
    }

    const stream = await renderToStream(
        <DocumentCV profile={temp.profile as any } />
    )

    return new NextResponse(stream as unknown as ReadableStream );
}