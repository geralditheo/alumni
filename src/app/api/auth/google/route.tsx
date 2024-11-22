import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest){

    console.log("R", request);
    

    return NextResponse.json({ message: "Google" });
}